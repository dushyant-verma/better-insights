<?php
/**
 * Must-Use Plugin: WebP Image Editor Support
 *
 * Ensures WordPress can generate sub-sizes and responsive images for WebP files.
 *
 * @package BetterInsights
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$class_file = WP_CONTENT_DIR . '/themes/astra-child/inc/class-wp-image-editor-gd-cli.php';
if ( file_exists( $class_file ) ) {
	require_once $class_file;
}

add_filter( 'wp_image_editors', function( $editors ) {
	if ( class_exists( 'WP_Image_Editor_GD_CLI' ) ) {
		if ( ! in_array( 'WP_Image_Editor_GD_CLI', $editors, true ) ) {
			array_unshift( $editors, 'WP_Image_Editor_GD_CLI' );
		}
	}
	return $editors;
} );
