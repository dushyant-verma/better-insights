<?php
/**
 * Custom WordPress Image Editor extending GD with CLI fallback for WebP support.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once ABSPATH . WPINC . '/class-wp-image-editor.php';
require_once ABSPATH . WPINC . '/class-wp-image-editor-gd.php';

/**
 * Image Editor GD with CLI WebP fallback.
 */
class WP_Image_Editor_GD_CLI extends WP_Image_Editor_GD {

	/**
	 * Checks to see if current environment supports GD with WebP CLI fallback.
	 *
	 * @param array $args Array of arguments.
	 * @return bool
	 */
	public static function test( $args = array() ) {
		if ( ! parent::test( $args ) ) {
			return false;
		}

		return self::has_webp_support();
	}

	/**
	 * Checks to see if editor supports the specified mime type.
	 *
	 * @param string $mime_type MIME type.
	 * @return bool
	 */
	public static function supports_mime_type( $mime_type ) {
		if ( 'image/webp' === $mime_type ) {
			return self::has_webp_support();
		}

		return parent::supports_mime_type( $mime_type );
	}

	/**
	 * Check whether WebP processing is available via GD or CLI tools.
	 *
	 * @return bool
	 */
	public static function has_webp_support() {
		if ( ( imagetypes() & IMG_WEBP ) !== 0 && function_exists( 'imagecreatefromwebp' ) && function_exists( 'imagewebp' ) ) {
			return true;
		}

		$cwebp = self::get_binary( 'cwebp' );
		$dwebp = self::get_binary( 'dwebp' );
		if ( $cwebp && $dwebp ) {
			return true;
		}

		$convert = self::get_binary( 'convert' );
		if ( $convert ) {
			return true;
		}

		return false;
	}

	/**
	 * Get binary executable path if available.
	 *
	 * @param string $name Binary name.
	 * @return string|false
	 */
	protected static function get_binary( $name ) {
		$paths = array(
			'/opt/homebrew/bin/' . $name,
			'/usr/local/bin/' . $name,
			'/usr/bin/' . $name,
		);

		foreach ( $paths as $path ) {
			if ( @is_executable( $path ) ) {
				return $path;
			}
		}

		$which = trim( (string) @shell_exec( 'which ' . escapeshellcmd( $name ) . ' 2>/dev/null' ) );
		if ( ! empty( $which ) && @is_executable( $which ) ) {
			return $which;
		}

		return false;
	}

	/**
	 * Loads image from file into GD Resource.
	 *
	 * @return true|WP_Error
	 */
	public function load() {
		if ( $this->image ) {
			return true;
		}

		if ( ! is_file( $this->file ) && ! preg_match( '|^https?://|', $this->file ) ) {
			return new WP_Error( 'error_loading_image', __( 'File does not exist?' ), $this->file );
		}

		wp_raise_memory_limit( 'image' );

		$mime = wp_get_image_mime( $this->file );

		if ( 'image/webp' === $mime ) {
			if ( function_exists( 'imagecreatefromwebp' ) ) {
				$this->image = @imagecreatefromwebp( $this->file );
			}

			if ( ! is_gd_image( $this->image ) ) {
				$tmp_dir = get_temp_dir();
				$tmp_png = tempnam( $tmp_dir, 'webp_load_' );
				$loaded  = false;

				$dwebp = self::get_binary( 'dwebp' );
				if ( $dwebp ) {
					exec( sprintf( '%s %s -o %s 2>&1', escapeshellcmd( $dwebp ), escapeshellarg( $this->file ), escapeshellarg( $tmp_png ) ), $out, $ret );
					if ( 0 === $ret && file_exists( $tmp_png ) && filesize( $tmp_png ) > 0 ) {
						$this->image = @imagecreatefrompng( $tmp_png );
						$loaded      = is_gd_image( $this->image );
					}
				}

				if ( ! $loaded ) {
					$convert = self::get_binary( 'convert' );
					if ( $convert ) {
						exec( sprintf( '%s %s %s 2>&1', escapeshellcmd( $convert ), escapeshellarg( $this->file ), escapeshellarg( $tmp_png ) ), $out, $ret );
						if ( 0 === $ret && file_exists( $tmp_png ) && filesize( $tmp_png ) > 0 ) {
							$this->image = @imagecreatefrompng( $tmp_png );
							$loaded      = is_gd_image( $this->image );
						}
					}
				}

				if ( file_exists( $tmp_png ) ) {
					@unlink( $tmp_png );
				}
			}

			if ( is_gd_image( $this->image ) ) {
				$size = wp_getimagesize( $this->file );
				if ( $size ) {
					if ( function_exists( 'imagealphablending' ) && function_exists( 'imagesavealpha' ) ) {
						imagealphablending( $this->image, false );
						imagesavealpha( $this->image, true );
					}
					$this->update_size( $size[0], $size[1] );
					$this->mime_type = 'image/webp';
					return $this->set_quality();
				}
			}
		}

		return parent::load();
	}

	/**
	 * Saves current image to file.
	 *
	 * @param resource|GdImage $image GD Image resource.
	 * @param string|null      $filename Destination filename.
	 * @param string|null      $mime_type MIME type.
	 * @return array|WP_Error
	 */
	public function _save( $image, $filename = null, $mime_type = null ) {
		list( $filename, $extension, $mime_type ) = $this->get_output_format( $filename, $mime_type );

		if ( ! $filename ) {
			$filename = $this->generate_filename( null, null, $extension );
		}

		if ( 'image/webp' === $mime_type ) {
			if ( function_exists( 'imagewebp' ) ) {
				$saved = @imagewebp( $image, $filename, $this->get_quality() );
				if ( $saved ) {
					chmod( $filename, 0666 & ~ umask() );
					return array(
						'path'      => $filename,
						'file'      => wp_basename( $filename ),
						'width'     => imagesx( $image ),
						'height'    => imagesy( $image ),
						'mime-type' => 'image/webp',
						'filesize'  => wp_filesize( $filename ),
					);
				}
			}

			$tmp_dir   = get_temp_dir();
			$tmp_png   = tempnam( $tmp_dir, 'webp_save_' );
			imagealphablending( $image, false );
			imagesavealpha( $image, true );
			$png_saved = @imagepng( $image, $tmp_png );

			if ( $png_saved && file_exists( $tmp_png ) ) {
				$quality   = $this->get_quality();
				$cwebp     = self::get_binary( 'cwebp' );
				$converted = false;

				if ( $cwebp ) {
					exec( sprintf( '%s -q %d %s -o %s 2>&1', escapeshellcmd( $cwebp ), (int) $quality, escapeshellarg( $tmp_png ), escapeshellarg( $filename ) ), $out, $ret );
					if ( 0 === $ret && file_exists( $filename ) && filesize( $filename ) > 0 ) {
						$converted = true;
					}
				}

				if ( ! $converted ) {
					$convert = self::get_binary( 'convert' );
					if ( $convert ) {
						exec( sprintf( '%s %s -quality %d %s 2>&1', escapeshellcmd( $convert ), escapeshellarg( $tmp_png ), (int) $quality, escapeshellarg( $filename ) ), $out, $ret );
						if ( 0 === $ret && file_exists( $filename ) && filesize( $filename ) > 0 ) {
							$converted = true;
						}
					}
				}

				if ( file_exists( $tmp_png ) ) {
					@unlink( $tmp_png );
				}

				if ( $converted ) {
					chmod( $filename, 0666 & ~ umask() );
					return array(
						'path'      => $filename,
						'file'      => wp_basename( $filename ),
						'width'     => imagesx( $image ),
						'height'    => imagesy( $image ),
						'mime-type' => 'image/webp',
						'filesize'  => wp_filesize( $filename ),
					);
				}
			}
		}

		return parent::_save( $image, $filename, $mime_type );
	}
}
