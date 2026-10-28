<?php
/**
 * Desktop navigation walker with mega menu support.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class BI_Nav_Walker extends Walker_Nav_Menu {

	/**
	 * Whether the current top-level item uses the mega menu.
	 *
	 * @var bool
	 */
	protected $in_mega = false;

	/**
	 * @param WP_Post $element           Menu item.
	 * @param array   $children_elements Children map.
	 * @param int     $max_depth         Max depth.
	 * @param int     $depth             Current depth.
	 * @param array   $args              Walker args.
	 * @param string  $output            Markup.
	 */
	public function display_element( $element, &$children_elements, $max_depth, $depth, $args, &$output ) {
		if ( ! $element ) {
			return;
		}

		$id_field = $this->db_fields['id'];
		$this->has_children = ! empty( $children_elements[ $element->$id_field ] );

		parent::display_element( $element, $children_elements, $max_depth, $depth, $args, $output );
	}

	/**
	 * @param string   $output Markup.
	 * @param int      $depth  Depth.
	 * @param stdClass $args   Args.
	 */
	public function start_lvl( &$output, $depth = 0, $args = null ) {
		if ( 0 === $depth && $this->in_mega ) {
			$output .= '<div class="bi-mega" role="region" hidden><div class="bi-mega__panel"><ul class="bi-mega__grid">';
			return;
		}

		$output .= '<ul class="bi-sub">';
	}

	/**
	 * @param string   $output Markup.
	 * @param int      $depth  Depth.
	 * @param stdClass $args   Args.
	 */
	public function end_lvl( &$output, $depth = 0, $args = null ) {
		if ( 0 === $depth && $this->in_mega ) {
			$output .= '</ul></div></div>';
			$this->in_mega = false;
			return;
		}

		$output .= '</ul>';
	}

	/**
	 * @param string   $output Markup.
	 * @param WP_Post  $item   Item.
	 * @param int      $depth  Depth.
	 * @param stdClass $args   Args.
	 * @param int      $id     Current ID.
	 */
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$classes         = empty( $item->classes ) ? array() : (array) $item->classes;
		$has_kids        = ! empty( $this->has_children );
		$title_check     = strtolower( trim( wp_strip_all_tags( $item->title ) ) );
		$is_custom_panel = ( 0 === $depth && (
			false !== strpos( $title_check, 'what we do' ) ||
			false !== strpos( $title_check, 'insights' ) ||
			false !== strpos( $title_check, 'about' ) ||
			false !== strpos( $title_check, 'contact' )
		) );
		$is_mega   = 0 === $depth && ( ( $has_kids && bi_is_mega_item( $item ) ) || $is_custom_panel );
		$is_ai     = bi_is_ai_item( $item );

		if ( 0 === $depth ) {
			$this->in_mega = $is_mega && $has_kids;
		}

		$li_classes = array( 'bi-nav__item' );
		if ( $has_kids || $is_custom_panel ) {
			$li_classes[] = 'bi-nav__item--parent';
		}
		if ( $is_mega ) {
			$li_classes[] = 'bi-nav__item--mega';
		}
		if ( $is_ai ) {
			$li_classes[] = 'bi-nav__item--ai';
		}
		if ( in_array( 'current-menu-item', $classes, true ) || in_array( 'current-menu-ancestor', $classes, true ) ) {
			$li_classes[] = 'is-active';
		}

		$output .= '<li class="' . esc_attr( implode( ' ', $li_classes ) ) . '">';

		$title = apply_filters( 'the_title', $item->title, $item->ID );
		$title = apply_filters( 'nav_menu_item_title', $title, $item, $args, $depth );
		$url   = ! empty( $item->url ) ? $item->url : '';

		if ( 1 === $depth && $this->in_mega ) {
			$desc = trim( (string) $item->description );
			if ( '' === $desc ) {
				$desc = bi_service_description( $title );
			}

			$output .= '<a class="bi-mega__card" href="' . esc_url( $url ) . '">';
			$output .= '<span class="bi-mega__icon" aria-hidden="true">' . bi_service_icon( $title ) . '</span>';
			$output .= '<span class="bi-mega__body">';
			$output .= '<span class="bi-mega__title">' . esc_html( $title ) . '</span>';
			if ( $desc ) {
				$output .= '<span class="bi-mega__desc">' . esc_html( $desc ) . '</span>';
			}
			$output .= '</span></a>';
			return;
		}

		$atts = array(
			'class' => 'bi-nav__link',
			'href'  => $url,
		);

		$is_lead_modal = ( false !== strpos( $title_check, 'marketing plan' ) || '#bi-lead-modal' === $url || '#bi-footer-lead-form' === $url );
		if ( $is_lead_modal ) {
			$atts['data-bi-modal-trigger'] = 'lead-modal';
			$atts['role']                  = 'button';
			$atts['aria-haspopup']         = 'dialog';
			$atts['aria-expanded']         = 'false';
			$atts['aria-controls']         = 'bi-lead-modal';
			$atts['href']                  = '#bi-lead-modal';
		}

		$mega_key = '';
		if ( 0 === $depth && ! $is_lead_modal ) {
			$title_lower = strtolower( trim( wp_strip_all_tags( $title ) ) );
			if ( false !== strpos( $title_lower, 'what we do' ) ) {
				$mega_key = 'what-we-do';
			} elseif ( false !== strpos( $title_lower, 'insights' ) ) {
				$mega_key = 'insights';
			} elseif ( false !== strpos( $title_lower, 'about' ) ) {
				$mega_key = 'about';
			} elseif ( false !== strpos( $title_lower, 'contact' ) ) {
				$mega_key = 'contact';
			}

			if ( $mega_key ) {
				$atts['data-bi-mega-trigger'] = $mega_key;
				$atts['data-mega-menu']       = $mega_key;
				$atts['aria-expanded']        = 'false';
				$atts['aria-haspopup']        = 'true';
				$atts['aria-controls']        = 'bi-shared-mega-menu';
				if ( false === strpos( $atts['class'], 'bi-nav__link--parent' ) ) {
					$atts['class'] .= ' bi-nav__link--parent';
				}
			}
		}

		if ( $has_kids && 0 === $depth ) {
			$atts['aria-expanded'] = 'false';
			$atts['aria-haspopup'] = 'true';
			if ( false === strpos( $atts['class'], 'bi-nav__link--parent' ) ) {
				$atts['class'] .= ' bi-nav__link--parent';
			}
		}

		if ( $is_ai ) {
			$atts['class'] .= ' bi-nav__link--ai';
		}

		$attributes = '';
		foreach ( $atts as $attr => $value ) {
			if ( '' === $value ) {
				continue;
			}
			$value       = 'href' === $attr ? esc_url( $value ) : esc_attr( $value );
			$attributes .= ' ' . $attr . '="' . $value . '"';
		}

		$output .= '<a' . $attributes . '>';
		$output .= '<span class="bi-nav__label">' . esc_html( $title ) . '</span>';
		if ( ( $has_kids || ! empty( $mega_key ) ) && 0 === $depth ) {
			$output .= '<span class="bi-nav__caret" aria-hidden="true"></span>';
		}
		$output .= '</a>';
	}

	/**
	 * @param string   $output Markup.
	 * @param WP_Post  $item   Item.
	 * @param int      $depth  Depth.
	 * @param stdClass $args   Args.
	 */
	public function end_el( &$output, $item, $depth = 0, $args = null ) {
		$output .= '</li>';
	}
}

/**
 * Mobile accordion walker.
 */
class BI_Mobile_Nav_Walker extends Walker_Nav_Menu {

	/**
	 * @param WP_Post $element           Menu item.
	 * @param array   $children_elements Children map.
	 * @param int     $max_depth         Max depth.
	 * @param int     $depth             Current depth.
	 * @param array   $args              Walker args.
	 * @param string  $output            Markup.
	 */
	public function display_element( $element, &$children_elements, $max_depth, $depth, $args, &$output ) {
		if ( ! $element ) {
			return;
		}

		$id_field = $this->db_fields['id'];
		$this->has_children = ! empty( $children_elements[ $element->$id_field ] );

		parent::display_element( $element, $children_elements, $max_depth, $depth, $args, $output );
	}

	/**
	 * @param string   $output Markup.
	 * @param int      $depth  Depth.
	 * @param stdClass $args   Args.
	 */
	public function start_lvl( &$output, $depth = 0, $args = null ) {
		$output .= '<ul class="bi-drawer__sub" hidden>';
	}

	/**
	 * @param string   $output Markup.
	 * @param int      $depth  Depth.
	 * @param stdClass $args   Args.
	 */
	public function end_lvl( &$output, $depth = 0, $args = null ) {
		$output .= '</ul>';
	}

	/**
	 * @param string   $output Markup.
	 * @param WP_Post  $item   Item.
	 * @param int      $depth  Depth.
	 * @param stdClass $args   Args.
	 * @param int      $id     Current ID.
	 */
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$classes  = empty( $item->classes ) ? array() : (array) $item->classes;
		$has_kids = ! empty( $this->has_children );
		$is_ai    = bi_is_ai_item( $item );
		$title    = apply_filters( 'the_title', $item->title, $item->ID );
		$url      = ! empty( $item->url ) ? $item->url : '';

		$li_class = 'bi-drawer__item';
		if ( $has_kids ) {
			$li_class .= ' bi-drawer__item--parent';
		}
		if ( $is_ai ) {
			$li_class .= ' bi-drawer__item--ai';
		}
		if ( in_array( 'current-menu-item', $classes, true ) ) {
			$li_class .= ' is-active';
		}

		$output .= '<li class="' . esc_attr( $li_class ) . '">';

		if ( $has_kids && 0 === $depth ) {
			$output .= '<div class="bi-drawer__row">';
			$output .= '<a class="bi-drawer__link" href="' . esc_url( $url ) . '">' . esc_html( $title ) . '</a>';
			$output .= '<button class="bi-drawer__accordion" type="button" aria-expanded="false" aria-label="' . esc_attr( sprintf( __( 'Expand %s', 'astra-child' ), $title ) ) . '">';
			$output .= '<span aria-hidden="true"></span>';
			$output .= '</button></div>';
			return;
		}

		$desc = '';
		if ( 1 === $depth ) {
			$desc = trim( (string) $item->description );
			if ( '' === $desc ) {
				$desc = bi_service_description( $title );
			}
		}

		$title_check   = strtolower( trim( wp_strip_all_tags( $title ) ) );
		$is_lead_modal = ( false !== strpos( $title_check, 'marketing plan' ) || '#bi-lead-modal' === $url || '#bi-footer-lead-form' === $url );
		$modal_atts    = $is_lead_modal ? ' data-bi-modal-trigger="lead-modal" role="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="bi-lead-modal"' : '';
		$href          = $is_lead_modal ? '#bi-lead-modal' : esc_url( $url );

		$output .= '<a class="bi-drawer__link' . ( $is_ai ? ' bi-drawer__link--ai' : '' ) . '" href="' . $href . '"' . $modal_atts . '>';
		$output .= '<span>' . esc_html( $title ) . '</span>';
		if ( $desc ) {
			$output .= '<small>' . esc_html( $desc ) . '</small>';
		}
		$output .= '</a>';
	}

	/**
	 * @param string   $output Markup.
	 * @param WP_Post  $item   Item.
	 * @param int      $depth  Depth.
	 * @param stdClass $args   Args.
	 */
	public function end_el( &$output, $item, $depth = 0, $args = null ) {
		$output .= '</li>';
	}
}
