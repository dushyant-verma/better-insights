<?php
/**
 * Better Insights custom header.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once get_stylesheet_directory() . '/inc/class-bi-nav-walker.php';

/**
 * Register the primary menu location.
 */
function bi_register_menus() {
	register_nav_menus(
		array(
			'primary' => __( 'Primary', 'astra-child' ),
		)
	);
}
add_action( 'after_setup_theme', 'bi_register_menus' );

/**
 * Remove Astra's default dropdown icon filter to prevent duplicate carets.
 */
function bi_remove_astra_dropdown_icon_filter() {
	remove_filter( 'nav_menu_item_title', 'astra_dropdown_icon_to_menu_link', 10 );
}
add_action( 'init', 'bi_remove_astra_dropdown_icon_filter', 20 );
add_action( 'wp_head', 'bi_remove_astra_dropdown_icon_filter', 1 );

/**
 * Enqueue header assets.
 */
function bi_enqueue_header_assets() {
	$theme_dir = get_stylesheet_directory();
	$theme_uri = get_stylesheet_directory_uri();

	$header_css = $theme_dir . '/assets/css/header.css';
	$search_css = $theme_dir . '/assets/css/search.css';
	$mega_css   = $theme_dir . '/assets/css/mega-menu.css';
	$header_js  = $theme_dir . '/assets/js/header.js';
	$search_js  = $theme_dir . '/assets/js/search.js';
	$mega_js    = $theme_dir . '/assets/js/mega-menu.js';

	if ( ! wp_script_is( 'gsap', 'registered' ) ) {
		wp_register_script( 'gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', array(), '3.12.5', true );
	}
	wp_enqueue_script( 'gsap' );

	wp_enqueue_style(
		'bi-header',
		$theme_uri . '/assets/css/header.css',
		array( 'astra-child-style' ),
		file_exists( $header_css ) ? (string) filemtime( $header_css ) : wp_get_theme()->get( 'Version' )
	);

	wp_enqueue_style(
		'bi-search',
		$theme_uri . '/assets/css/search.css',
		array( 'bi-header' ),
		file_exists( $search_css ) ? (string) filemtime( $search_css ) : wp_get_theme()->get( 'Version' )
	);

	wp_enqueue_style(
		'bi-mega-menu',
		$theme_uri . '/assets/css/mega-menu.css',
		array( 'bi-header' ),
		file_exists( $mega_css ) ? (string) filemtime( $mega_css ) : wp_get_theme()->get( 'Version' )
	);

	wp_enqueue_script(
		'bi-header',
		$theme_uri . '/assets/js/header.js',
		array(),
		file_exists( $header_js ) ? (string) filemtime( $header_js ) : wp_get_theme()->get( 'Version' ),
		true
	);

	wp_enqueue_script(
		'bi-search',
		$theme_uri . '/assets/js/search.js',
		array( 'bi-header' ),
		file_exists( $search_js ) ? (string) filemtime( $search_js ) : wp_get_theme()->get( 'Version' ),
		true
	);

	wp_enqueue_script(
		'bi-mega-menu',
		$theme_uri . '/assets/js/mega-menu.js',
		array( 'bi-header', 'gsap' ),
		file_exists( $mega_js ) ? (string) filemtime( $mega_js ) : wp_get_theme()->get( 'Version' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'bi_enqueue_header_assets', 20 );

/**
 * Replace Astra's header with the custom header.
 */
function bi_replace_astra_header() {
	remove_all_actions( 'astra_header' );
	add_action( 'astra_header', 'bi_render_header', 10 );
}
add_action( 'wp', 'bi_replace_astra_header', 20 );

/**
 * Prevent Astra from printing its default header markup.
 *
 * @param mixed $display Current display value.
 * @return string
 */
function bi_disable_astra_header_display( $display ) {
	return 'disabled';
}
add_filter( 'astra_header_display', 'bi_disable_astra_header_display' );

/**
 * Body class for custom header styles.
 *
 * @param array $classes Body classes.
 * @return array
 */
function bi_body_class( $classes ) {
	$classes[] = 'bi-has-custom-header';
	return $classes;
}
add_filter( 'body_class', 'bi_body_class' );

/**
 * Whether a menu item should use the mega menu.
 *
 * @param WP_Post $item Menu item.
 * @return bool
 */
function bi_is_mega_item( $item ) {
	$classes = empty( $item->classes ) ? array() : (array) $item->classes;
	if ( in_array( 'bi-mega', $classes, true ) || in_array( 'mega', $classes, true ) ) {
		return true;
	}

	$title = strtolower( trim( wp_strip_all_tags( $item->title ) ) );
	return (
		false !== strpos( $title, 'what we do' ) ||
		false !== strpos( $title, 'insights' ) ||
		false !== strpos( $title, 'about' ) ||
		false !== strpos( $title, 'contact' )
	);
}

/**
 * Whether a menu item is the AI item.
 *
 * @param WP_Post $item Menu item.
 * @return bool
 */
function bi_is_ai_item( $item ) {
	$classes = empty( $item->classes ) ? array() : (array) $item->classes;
	if ( in_array( 'bi-ai', $classes, true ) ) {
		return true;
	}

	$title = trim( wp_strip_all_tags( $item->title ) );
	return (bool) preg_match( '/^AI( Solutions)?$/i', $title );
}

/**
 * Default service descriptions for mega menu cards.
 *
 * @param string $title Item title.
 * @return string
 */
function bi_service_description( $title ) {
	$map = array(
		'Website Development'   => 'Fast, scalable digital experiences designed for growth.',
		'WordPress Development' => 'Custom WordPress builds tailored for SEO, performance, and scalability.',
		'WooCommerce'           => 'High-converting e-commerce experiences engineered for revenue.',
		'CRM Development'       => 'Connect sales, marketing, and customer operations seamlessly.',
		'AI Solutions'          => 'Practical AI tools and intelligent automation to boost productivity.',
		'API Integrations'      => 'Reliable connections between the platforms your business depends on.',
	);

	return isset( $map[ $title ] ) ? $map[ $title ] : '';
}

/**
 * Inline SVG icon for a service card.
 *
 * @param string $title Item title.
 * @return string
 */
function bi_service_icon( $title ) {
	$key = strtolower( $title );
	$icon = 'grid';

	if ( false !== strpos( $key, 'wordpress' ) ) {
		$icon = 'wp';
	} elseif ( false !== strpos( $key, 'woo' ) ) {
		$icon = 'cart';
	} elseif ( false !== strpos( $key, 'crm' ) ) {
		$icon = 'nodes';
	} elseif ( false !== strpos( $key, 'ai' ) ) {
		$icon = 'spark';
	} elseif ( false !== strpos( $key, 'api' ) ) {
		$icon = 'link';
	}

	$icons = array(
		'grid'  => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="4" width="6.5" height="6.5" rx="1.4"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.4"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.4"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.4"/></svg>',
		'wp'    => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="8"/><path d="M8 12.5l2.2 4.2L16.5 8"/></svg>',
		'cart'  => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 7h14l-1.2 8.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.7L5 7z"/><path d="M8 7V6.2A3.2 3.2 0 0 1 11.2 3h1.6A3.2 3.2 0 0 1 16 6.2V7"/></svg>',
		'nodes' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6.5" cy="7" r="2.2"/><circle cx="17.5" cy="7" r="2.2"/><circle cx="12" cy="17" r="2.2"/><path d="M8.3 8.3l2.6 6.2M15.7 8.3l-2.6 6.2M8.8 7h6.4"/></svg>',
		'spark' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 4l1.4 5.2L18.5 12 13.4 14.8 12 20l-1.4-5.2L5.5 12l5.1-2.8L12 4z"/></svg>',
		'link'  => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M10 14a4 4 0 0 1 0-5.6l2.1-2.1a4 4 0 0 1 5.6 5.6L16.4 13"/><path d="M14 10a4 4 0 0 1 0 5.6l-2.1 2.1a4 4 0 1 1-5.6-5.6L7.6 11"/></svg>',
	);

	return $icons[ $icon ];
}

/**
 * Header logo markup. Uses the updated Better Insights logo.
 */
function bi_the_logo() {
	$logo_url = home_url( '/wp-content/uploads/2026/10/better-insights-logo-6.png' );
	?>
	<a class="custom-logo-link bi-header__logo-link" href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" aria-current="page">
		<img
			class="custom-logo bi-header__logo"
			src="<?php echo esc_url( $logo_url ); ?>"
			alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>"
			decoding="async"
		/>
	</a>
	<?php
}

/**
 * Filter get_custom_logo to ensure WordPress custom logo output uses better-insights-logo-6.png.
 *
 * @param string $html Custom logo HTML markup.
 * @return string
 */
function bi_filter_custom_logo_markup( $html ) {
	$logo_url = home_url( '/wp-content/uploads/2026/10/better-insights-logo-6.png' );
	return sprintf(
		'<a href="%1$s" class="custom-logo-link bi-header__logo-link" rel="home" aria-current="page"><img src="%2$s" class="custom-logo bi-header__logo" alt="%3$s" decoding="async" /></a>',
		esc_url( home_url( '/' ) ),
		esc_url( $logo_url ),
		esc_attr( get_bloginfo( 'name' ) )
	);
}
add_filter( 'get_custom_logo', 'bi_filter_custom_logo_markup', 999 );

/**
 * Branch / Company WebP logo markup.
 */
function bi_the_branch_logo() {
	$branch_logo = get_option( 'bi_branch_logo_url' );

	if ( empty( $branch_logo ) ) {
		// Fallback: Query Media Library for latest WebP attachment
		$attachments = get_posts( array(
			'post_type'      => 'attachment',
			'post_mime_type' => 'image/webp',
			'post_status'    => 'inherit',
			'posts_per_page' => 1,
			'orderby'        => 'date',
			'order'          => 'DESC',
		) );
		if ( ! empty( $attachments ) ) {
			$branch_logo = wp_get_attachment_url( $attachments[0]->ID );
		}
	}

	if ( empty( $branch_logo ) ) {
		$fallback_file = ABSPATH . 'wp-content/uploads/2026/10/branch-logo.webp';
		if ( file_exists( $fallback_file ) ) {
			$branch_logo = content_url( '/uploads/2026/10/branch-logo.webp' );
		}
	}

	if ( empty( $branch_logo ) ) {
		return;
	}

	$branch_alt = get_option( 'bi_branch_logo_alt', 'Better Insights Branch' );
	$branch_url = get_option( 'bi_branch_logo_link', home_url( '/' ) );

	?>
	<!-- <a class="bi-header__branch" href="<?php echo esc_url( $branch_url ); ?>" rel="home">
		<img
			class="bi-header__branch-img"
			src="<?php echo esc_url( $branch_logo ); ?>"
			alt="<?php echo esc_attr( $branch_alt ); ?>"
			decoding="async"
		/>
	</a> -->
	<?php
}

/**
 * Fallback navigation when no menu is assigned to Primary.
 *
 * @param array $args wp_nav_menu args.
 */
function bi_fallback_menu( $args = array() ) {
	$is_mobile = ! empty( $args['bi_mobile'] );

	$services = array(
		array(
			'title' => __( 'Website Development', 'astra-child' ),
			'url'   => home_url( '/website-development/' ),
			'desc'  => __( 'High-performance web apps, CMS platforms, and digital experiences.', 'astra-child' ),
		),
		array(
			'title' => __( 'CRM & Integrations', 'astra-child' ),
			'url'   => home_url( '/crm-integrations/' ),
			'desc'  => __( 'Seamless CRM implementations, API middleware, and workflow automation.', 'astra-child' ),
		),
		array(
			'title' => __( 'AI Solutions', 'astra-child' ),
			'url'   => home_url( '/ai-solutions/' ),
			'desc'  => __( 'Intelligent AI models, workflow automation, and custom AI agents.', 'astra-child' ),
		),
		array(
			'title' => __( 'Digital Growth', 'astra-child' ),
			'url'   => home_url( '/digital-growth/' ),
			'desc'  => __( 'Data-backed SEO, performance marketing, and conversion optimization.', 'astra-child' ),
		),
		array(
			'title' => __( 'Technology & Engineering', 'astra-child' ),
			'url'   => home_url( '/technology-engineering/' ),
			'desc'  => __( 'Enterprise architecture, cloud solutions, and full-stack development.', 'astra-child' ),
		),
		array(
			'title' => __( 'Digital Transformation', 'astra-child' ),
			'url'   => home_url( '/digital-transformation/' ),
			'desc'  => __( 'Modernizing operational workflows, legacy systems, and customer journeys.', 'astra-child' ),
		),
		array(
			'title' => __( 'CPR Calculator Tool', 'astra-child' ),
			'url'   => home_url( '/cpr-tool/' ),
			'desc'  => __( 'Calculate your customer acquisition cost, conversion rate, and marketing ROI.', 'astra-child' ),
		),
	);

	$about_sub = array(
		array(
			'title' => __( 'About Better Insights', 'astra-child' ),
			'url'   => home_url( '/about/' ),
			'desc'  => __( 'Our story, mission, and technology-first culture.', 'astra-child' ),
		),
		array(
			'title' => __( 'Who We Are', 'astra-child' ),
			'url'   => home_url( '/about/#who-we-are' ),
			'desc'  => __( 'Meet the leadership and business principles driving our work.', 'astra-child' ),
		),
		array(
			'title' => __( 'Our Team', 'astra-child' ),
			'url'   => home_url( '/about/#our-team' ),
			'desc'  => __( 'The strategists, engineers, and digital innovators behind Better Insights.', 'astra-child' ),
		),
		array(
			'title' => __( 'Our Clientele', 'astra-child' ),
			'url'   => home_url( '/clientele/' ),
			'desc'  => __( 'Enterprises and high-growth brands we have partnered with.', 'astra-child' ),
		),
		array(
			'title' => __( 'Careers', 'astra-child' ),
			'url'   => home_url( '/careers/' ),
			'desc'  => __( 'Join our rapidly growing engineering and digital marketing teams.', 'astra-child' ),
		),
	);

	$current_path = '/' . trim( (string) parse_url( $_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH ), '/' ) . '/';

	if ( $is_mobile ) {
		$mobile_items = array(
			array(
				'title' => __( 'Home', 'astra-child' ),
				'url'   => home_url( '/' ),
			),
			array(
				'title'    => __( 'What We Do', 'astra-child' ),
				'url'      => home_url( '/what-we-do/' ),
				'children' => $services,
			),
			array(
				'title' => __( 'Our Work', 'astra-child' ),
				'url'   => home_url( '/our-work/' ),
			),
			array(
				'title' => __( 'AI Solutions', 'astra-child' ),
				'url'   => home_url( '/ai-solutions/' ),
				'ai'    => true,
			),
			array(
				'title' => __( 'Insights', 'astra-child' ),
				'url'   => home_url( '/insights/' ),
			),
			array(
				'title'    => __( 'About', 'astra-child' ),
				'url'      => home_url( '/about/' ),
				'children' => $about_sub,
			),
			array(
				'title' => __( 'CPR Tool', 'astra-child' ),
				'url'   => home_url( '/cpr-tool/' ),
			),
			array(
				'title' => __( 'Clientele', 'astra-child' ),
				'url'   => home_url( '/clientele/' ),
			),
			array(
				'title' => __( 'Careers', 'astra-child' ),
				'url'   => home_url( '/careers/' ),
			),
			array(
				'title' => __( 'Contact Us', 'astra-child' ),
				'url'   => home_url( '/contact/' ),
			),
			array(
				'title' => __( 'Get Marketing Plan', 'astra-child' ),
				'url'   => '#bi-lead-modal',
				'modal' => true,
			),
		);

		echo '<ul class="bi-drawer__list">';
		foreach ( $mobile_items as $item ) {
			if ( ! empty( $item['modal'] ) ) {
				echo '<li class="bi-drawer__item">';
				echo '<a class="bi-drawer__link" href="#bi-lead-modal" role="button" data-bi-modal-trigger="lead-modal" aria-haspopup="dialog" aria-controls="bi-lead-modal"><span>' . esc_html( $item['title'] ) . '</span></a>';
				echo '</li>';
				continue;
			}
			$item_path  = '/' . trim( (string) parse_url( $item['url'], PHP_URL_PATH ), '/' ) . '/';
			$is_current = ( '/' !== $item_path && 0 === strpos( $current_path, $item_path ) );
			$ai_class   = ! empty( $item['ai'] ) ? ' bi-drawer__item--ai' : '';
			$active_cls = $is_current ? ' is-active' : '';

			if ( ! empty( $item['children'] ) ) {
				echo '<li class="bi-drawer__item bi-drawer__item--parent' . esc_attr( $ai_class . $active_cls ) . '">';
				echo '<div class="bi-drawer__row">';
				echo '<a class="bi-drawer__link" href="' . esc_url( $item['url'] ) . '"><span>' . esc_html( $item['title'] ) . '</span></a>';
				echo '<button class="bi-drawer__accordion" type="button" aria-expanded="false" aria-label="' . esc_attr( sprintf( __( 'Expand %s', 'astra-child' ), $item['title'] ) ) . '"><span aria-hidden="true"></span></button>';
				echo '</div><ul class="bi-drawer__sub" hidden>';
				foreach ( $item['children'] as $child ) {
					$desc = ! empty( $child['desc'] ) ? $child['desc'] : bi_service_description( $child['title'] );
					echo '<li class="bi-drawer__item">';
					echo '<a class="bi-drawer__link" href="' . esc_url( $child['url'] ) . '"><span>' . esc_html( $child['title'] ) . '</span>';
					if ( $desc ) {
						echo '<small>' . esc_html( $desc ) . '</small>';
					}
					echo '</a></li>';
				}
				echo '</ul></li>';
				continue;
			}

			$link_class = ! empty( $item['ai'] ) ? ' bi-drawer__link--ai' : '';
			echo '<li class="bi-drawer__item' . esc_attr( $ai_class . $active_cls ) . '">';
			echo '<a class="bi-drawer__link' . esc_attr( $link_class ) . '" href="' . esc_url( $item['url'] ) . '"><span>' . esc_html( $item['title'] ) . '</span></a>';
			echo '</li>';
		}
		echo '</ul>';
		return;
	}

	$desktop_items = array(
		array(
			'title'    => __( 'What We Do', 'astra-child' ),
			'url'      => home_url( '/what-we-do/' ),
			'mega'     => true,
		),
		array(
			'title' => __( 'Our Work', 'astra-child' ),
			'url'   => home_url( '/our-work/' ),
		),
		array(
			'title' => __( 'AI Solutions', 'astra-child' ),
			'url'   => home_url( '/ai-solutions/' ),
			'ai'    => true,
		),
		array(
			'title'    => __( 'Insights', 'astra-child' ),
			'url'      => home_url( '/insights/' ),
			'insights' => true,
		),
		array(
			'title'    => __( 'About', 'astra-child' ),
			'url'      => home_url( '/about/' ),
			'about'    => true,
		),
		array(
			'title'   => __( 'Contact Us', 'astra-child' ),
			'url'     => home_url( '/contact/' ),
			'contact' => true,
		),
	);

	echo '<ul class="bi-nav__list">';
	foreach ( $desktop_items as $item ) {
		$item_path  = '/' . trim( (string) parse_url( $item['url'], PHP_URL_PATH ), '/' ) . '/';
		$is_current = ( '/' !== $item_path && 0 === strpos( $current_path, $item_path ) );

		$li_class = 'bi-nav__item';
		if ( ! empty( $item['mega'] ) || ! empty( $item['insights'] ) || ! empty( $item['about'] ) || ! empty( $item['contact'] ) ) {
			$li_class .= ' bi-nav__item--parent bi-nav__item--mega';
		}
		if ( ! empty( $item['ai'] ) ) {
			$li_class .= ' bi-nav__item--ai';
		}
		if ( $is_current ) {
			$li_class .= ' is-active';
		}

		echo '<li class="' . esc_attr( $li_class ) . '">';
		$link_class = 'bi-nav__link';
		$extra_atts = '';
		if ( ! empty( $item['mega'] ) ) {
			$link_class .= ' bi-nav__link--parent';
			$extra_atts  = ' data-bi-mega-trigger="what-we-do" data-mega-menu="what-we-do" aria-expanded="false" aria-haspopup="true" aria-controls="bi-shared-mega-menu"';
		} elseif ( ! empty( $item['insights'] ) ) {
			$link_class .= ' bi-nav__link--parent';
			$extra_atts  = ' data-bi-mega-trigger="insights" data-mega-menu="insights" aria-expanded="false" aria-haspopup="true" aria-controls="bi-shared-mega-menu"';
		} elseif ( ! empty( $item['about'] ) ) {
			$link_class .= ' bi-nav__link--parent';
			$extra_atts  = ' data-bi-mega-trigger="about" data-mega-menu="about" aria-expanded="false" aria-haspopup="true" aria-controls="bi-shared-mega-menu"';
		} elseif ( ! empty( $item['contact'] ) ) {
			$link_class .= ' bi-nav__link--parent';
			$extra_atts  = ' data-bi-mega-trigger="contact" data-mega-menu="contact" aria-expanded="false" aria-haspopup="true" aria-controls="bi-shared-mega-menu"';
		}
		if ( ! empty( $item['ai'] ) ) {
			$link_class .= ' bi-nav__link--ai';
		}

		echo '<a class="' . esc_attr( $link_class ) . '" href="' . esc_url( $item['url'] ) . '"' . $extra_atts . '>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo '<span class="bi-nav__label">' . esc_html( $item['title'] ) . '</span>';
		if ( ! empty( $item['mega'] ) || ! empty( $item['insights'] ) || ! empty( $item['about'] ) || ! empty( $item['contact'] ) ) {
			echo '<span class="bi-nav__caret" aria-hidden="true"></span>';
		}
		echo '</a>';
		echo '</li>';
	}
	echo '</ul>';
}

/**
 * Render the "What We Do" mega menu panel.
 */
function bi_render_what_we_do_mega_menu() {
	$left_items = array(
		array(
			'title' => 'AI & Automation',
			'desc'  => 'Practical AI tools, intelligent agents, and workflow automation.',
			'url'   => home_url( '/ai-solutions/' ),
		),
		array(
			'title' => 'Digital Growth',
			'desc'  => 'SEO, performance marketing, and conversion optimization to scale revenue.',
			'url'   => home_url( '/digital-growth/' ),
		),
		array(
			'title' => 'Technology & Engineering',
			'desc'  => 'Custom web development, CRM systems, and seamless API integrations.',
			'url'   => home_url( '/technology-engineering/' ),
		),
		array(
			'title' => 'Digital Transformation',
			'desc'  => 'End-to-end digital solutions connecting strategy, tech, and marketing.',
			'url'   => home_url( '/digital-transformation/' ),
		),
	);

	$col1 = array(
		array( 'title' => 'SEO & search strategy', 'url' => home_url( '/category/search-engine-optimization/' ) ),
		array( 'title' => 'performance marketing', 'url' => home_url( '/category/digital-marketing/' ) ),
		array( 'title' => 'conversion optimization', 'url' => home_url( '/category/conversion-rate-optimization/' ) ),
		array( 'title' => 'content strategy', 'url' => home_url( '/category/content-marketing/' ) ),
		array( 'title' => 'paid media & search', 'url' => home_url( '/category/marketing-growth/' ) ),
		array( 'title' => 'growth analytics & ROI', 'url' => home_url( '/cpr-tool/' ) ),
	);

	$col2 = array(
		array( 'title' => 'web development', 'url' => home_url( '/website-development/' ) ),
		array( 'title' => 'wordpress development', 'url' => home_url( '/website-development/' ) ),
		array( 'title' => 'crm development', 'url' => home_url( '/crm-integrations/' ) ),
		array( 'title' => 'api & integrations', 'url' => home_url( '/technology-engineering/' ) ),
		array( 'title' => 'technology engineering', 'url' => home_url( '/technology-engineering/' ) ),
		array( 'title' => 'digital transformation', 'url' => home_url( '/digital-transformation/' ) ),
	);

	$col3 = array(
		array( 'title' => 'ai solutions & strategy', 'url' => home_url( '/ai-solutions/' ) ),
		array( 'title' => 'ai agents & workflows', 'url' => home_url( '/ai-solutions/' ) ),
		array( 'title' => 'marketing automation', 'url' => home_url( '/category/ai-automation/' ) ),
		array( 'title' => 'data & analytics', 'url' => home_url( '/category/crm-integrations/' ) ),
		array( 'title' => 'client success stories', 'url' => home_url( '/our-work/' ) ),
	);
	?>
	<div class="bi-what-we-do-menu__container bi-mega-panel__container">
		<div class="bi-what-we-do-menu__left bi-mega-panel__left">
			<?php foreach ( $left_items as $item ) : ?>
				<div class="bi-what-we-do-menu__item bi-mega-panel__left-item">
					<a href="<?php echo esc_url( $item['url'] ); ?>" class="bi-what-we-do-menu__title bi-mega-panel__left-title">
						<?php echo esc_html( $item['title'] ); ?>
					</a>
					<p class="bi-what-we-do-menu__description bi-mega-panel__left-desc">
						<?php echo esc_html( $item['desc'] ); ?>
					</p>
				</div>
			<?php endforeach; ?>
		</div>

		<div class="bi-what-we-do-menu__divider bi-mega-panel__divider" aria-hidden="true"></div>

		<div class="bi-what-we-do-menu__right bi-mega-panel__right">
			<h2 class="bi-what-we-do-menu__heading bi-mega-panel__right-heading">capabilities</h2>

			<div class="bi-what-we-do-menu__industries bi-mega-panel__grid">
				<div class="bi-what-we-do-menu__col bi-mega-panel__col">
					<?php foreach ( $col1 as $ind ) : ?>
						<a href="<?php echo esc_url( $ind['url'] ); ?>" class="bi-what-we-do-menu__industry bi-mega-panel__industry-link">
							<?php echo esc_html( $ind['title'] ); ?>
						</a>
					<?php endforeach; ?>
				</div>

				<div class="bi-what-we-do-menu__col bi-mega-panel__col">
					<?php foreach ( $col2 as $ind ) : ?>
						<a href="<?php echo esc_url( $ind['url'] ); ?>" class="bi-what-we-do-menu__industry bi-mega-panel__industry-link">
							<?php echo esc_html( $ind['title'] ); ?>
						</a>
					<?php endforeach; ?>
				</div>

				<div class="bi-what-we-do-menu__col bi-mega-panel__col">
					<?php foreach ( $col3 as $ind ) : ?>
						<a href="<?php echo esc_url( $ind['url'] ); ?>" class="bi-what-we-do-menu__industry bi-mega-panel__industry-link">
							<?php echo esc_html( $ind['title'] ); ?>
						</a>
					<?php endforeach; ?>
				</div>
			</div>

			<div class="bi-what-we-do-menu__view-all-wrap bi-mega-panel__view-all-wrap">
				<a href="<?php echo esc_url( home_url( '/what-we-do/' ) ); ?>" class="bi-what-we-do-menu__view-all bi-mega-panel__view-all">
					<span class="bi-what-we-do-menu__view-all-text">view all capabilities</span>
					<span class="bi-what-we-do-menu__view-all-arrow bi-mega-panel__arrow-wrap" aria-hidden="true">
						<svg viewBox="0 0 180 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<line x1="0" y1="8" x2="168" y2="8" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round"/>
							<path d="M162 2L172 8L162 14" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</span>
				</a>
			</div>
		</div>
	</div>
	<?php
}

/**
 * Render the "Insights" mega menu panel.
 */
function bi_render_insights_mega_menu() {
	$goals = array(
		array( 'title' => 'ai automation', 'url' => home_url( '/category/ai-automation/' ) ),
		array( 'title' => 'digital growth', 'url' => home_url( '/category/marketing-growth/' ) ),
		array( 'title' => 'web technology', 'url' => home_url( '/category/web-technology/' ) ),
		array( 'title' => 'crm & data', 'url' => home_url( '/category/crm-integrations/' ) ),
		array( 'title' => 'digital transformation', 'url' => home_url( '/category/digital-transformation/' ) ),
	);

	$leadership = array(
		array(
			'tag'   => 'growth strategy:',
			'title' => 'powering business growth with modern marketing & AI',
			'url'   => home_url( '/digital-growth/' ),
		),
		array(
			'tag'   => 'technology:',
			'title' => 'engineering scalable web platforms and seamless integrations',
			'url'   => home_url( '/technology-engineering/' ),
		),
		array(
			'tag'   => 'automation:',
			'title' => 'practical AI workflows and intelligent automation solutions',
			'url'   => home_url( '/ai-solutions/' ),
		),
	);

	$topics = array(
		array( 'title' => 'ai & automation', 'url' => home_url( '/category/ai-automation/' ) ),
		array( 'title' => 'digital marketing', 'url' => home_url( '/category/digital-marketing/' ) ),
		array( 'title' => 'web development', 'url' => home_url( '/category/web-technology/' ) ),
		array( 'title' => 'crm development', 'url' => home_url( '/category/crm-integrations/' ) ),
		array( 'title' => 'seo & search strategy', 'url' => home_url( '/category/search-engine-optimization/' ) ),
		array( 'title' => 'content marketing', 'url' => home_url( '/category/content-marketing/' ) ),
		array( 'title' => 'conversion optimization', 'url' => home_url( '/category/conversion-rate-optimization/' ) ),
		array( 'title' => 'marketing growth', 'url' => home_url( '/category/marketing-growth/' ) ),
		array( 'title' => 'digital transformation', 'url' => home_url( '/category/digital-transformation/' ) ),
	);
	?>
	<div class="bi-insights-mega__container">
		<div class="bi-insights-mega__top">
			<h2 class="bi-insights-mega__title">
				<a href="<?php echo esc_url( home_url( '/insights/' ) ); ?>">Better Insights</a>
			</h2>
			<a href="<?php echo esc_url( home_url( '/insights/' ) ); ?>" class="bi-insights-mega__cta">
				Explore Insights &rarr;
			</a>
		</div>

		<div class="bi-insights-mega__divider" aria-hidden="true"></div>

		<div class="bi-insights-mega__columns">
			<!-- Column 1: Filter by goal -->
			<div class="bi-insights-mega__col bi-insights-mega__col--1">
				<h3 class="bi-insights-mega__heading">filter by goal</h3>
				<div class="bi-insights-mega__goals">
					<?php foreach ( $goals as $goal ) : ?>
						<a href="<?php echo esc_url( $goal['url'] ); ?>" class="bi-insights-mega__goal-link">
							<?php echo esc_html( $goal['title'] ); ?>
						</a>
					<?php endforeach; ?>
				</div>
			</div>

			<div class="bi-insights-mega__vdivider" aria-hidden="true"></div>

			<!-- Column 2: The Leadership Suite -->
			<div class="bi-insights-mega__col bi-insights-mega__col--2">
				<h3 class="bi-insights-mega__heading">the leadership suite</h3>
				<div class="bi-insights-mega__leadership">
					<?php foreach ( $leadership as $suite ) : ?>
						<a href="<?php echo esc_url( $suite['url'] ); ?>" class="bi-insights-mega__suite-item">
							<span class="bi-insights-mega__suite-tag"><?php echo esc_html( $suite['tag'] ); ?></span>
							<span class="bi-insights-mega__suite-text"><?php echo esc_html( $suite['title'] ); ?></span>
						</a>
					<?php endforeach; ?>
				</div>
			</div>

			<div class="bi-insights-mega__vdivider" aria-hidden="true"></div>

			<!-- Column 3: Topics -->
			<div class="bi-insights-mega__col bi-insights-mega__col--3">
				<h3 class="bi-insights-mega__heading">topics</h3>
				<div class="bi-insights-mega__industries">
					<?php foreach ( $topics as $topic ) : ?>
						<a href="<?php echo esc_url( $topic['url'] ); ?>" class="bi-insights-mega__industry-link">
							<?php echo esc_html( $topic['title'] ); ?>
						</a>
					<?php endforeach; ?>
				</div>
			</div>
		</div>
	</div>
	<?php
}

/**
 * Render the "About" mega menu panel.
 */
function bi_render_about_mega_menu() {
	?>
	<div class="bi-about-menu__container">
		<div class="bi-about-menu__columns">
			<!-- Column 1: Our Company -->
			<div class="bi-about-menu__column bi-about-menu__column--1">
				<h2 class="bi-about-menu__heading">Our<br>company</h2>
				<div class="bi-about-menu__links">
					<a href="<?php echo esc_url( home_url( '/about/' ) ); ?>" class="bi-about-menu__link">About Better Insights</a>
					<a href="<?php echo esc_url( home_url( '/about/#who-we-are' ) ); ?>" class="bi-about-menu__link">Who We Are</a>
					<a href="<?php echo esc_url( home_url( '/about/#our-values' ) ); ?>" class="bi-about-menu__link">Our Approach</a>
					<a href="<?php echo esc_url( home_url( '/about/#our-team' ) ); ?>" class="bi-about-menu__link">Executive Team</a>
					<a href="<?php echo esc_url( home_url( '/clientele/' ) ); ?>" class="bi-about-menu__link">Our Clientele</a>
					<a href="<?php echo esc_url( home_url( '/careers/' ) ); ?>" class="bi-about-menu__link">Careers</a>
				</div>
			</div>

			<div class="bi-about-menu__vdivider" aria-hidden="true"></div>

			<!-- Column 2: Why Better Insights -->
			<div class="bi-about-menu__column bi-about-menu__column--2">
				<h2 class="bi-about-menu__heading">Why Better<br>Insights</h2>
				<p class="bi-about-menu__description">
					We combine technology,<br>
					AI and growth marketing<br>
					to help businesses build,<br>
					optimize and scale.
				</p>
				<div class="bi-about-menu__cta-wrap">
					<a href="<?php echo esc_url( home_url( '/about/#our-values' ) ); ?>" class="bi-about-menu__cta">
						<span class="bi-about-menu__cta-text">Our Approach</span>
						<span class="bi-about-menu__arrow" aria-hidden="true">
							<svg viewBox="0 0 160 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<line x1="0" y1="8" x2="148" y2="8" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round"/>
								<path d="M142 2L152 8L142 14" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
					</a>
				</div>
			</div>

			<!-- Column 3: Our Expertise -->
			<div class="bi-about-menu__column bi-about-menu__column--3">
				<h2 class="bi-about-menu__heading">Our<br>Expertise</h2>
				<p class="bi-about-menu__description">
					Strategy-first thinking,<br>
					technology-driven execution<br>
					and measurable growth outcomes<br>
					across AI, Tech & Marketing.
				</p>
				<div class="bi-about-menu__cta-wrap">
					<a href="<?php echo esc_url( home_url( '/what-we-do/' ) ); ?>" class="bi-about-menu__cta">
						<span class="bi-about-menu__cta-text">Explore</span>
						<span class="bi-about-menu__arrow" aria-hidden="true">
							<svg viewBox="0 0 120 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<line x1="0" y1="8" x2="108" y2="8" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round"/>
								<path d="M102 2L112 8L102 14" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
					</a>
				</div>
			</div>

			<!-- Column 4: Impact & Growth -->
			<div class="bi-about-menu__column bi-about-menu__column--4">
				<h2 class="bi-about-menu__heading">Impact &<br>Growth</h2>
				<p class="bi-about-menu__description">
					Empowering businesses<br>
					with practical AI,<br>
					automation systems, and<br>
					digital transformation.
				</p>
				<div class="bi-about-menu__cta-wrap">
					<a href="<?php echo esc_url( home_url( '/about/' ) ); ?>" class="bi-about-menu__cta">
						<span class="bi-about-menu__cta-text">Learn more</span>
						<span class="bi-about-menu__arrow" aria-hidden="true">
							<svg viewBox="0 0 160 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<line x1="0" y1="8" x2="148" y2="8" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round"/>
								<path d="M142 2L152 8L142 14" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
					</a>
				</div>
			</div>
		</div>
	</div>
	<?php
}

/**
 * Render the "Contact Us" mega menu panel.
 */
function bi_render_contact_mega_menu() {
	?>
	<div class="bi-contact-menu__container">
		<div class="bi-contact-menu__grid">
			<!-- Column 1: Talk to us -->
			<div class="bi-contact-menu__column bi-contact-menu__column--1">
				<h2 class="bi-contact-menu__heading">talk to us</h2>
				<p class="bi-contact-menu__description">
					Tell us what you're building. We'll help you find the right strategy, technology and growth path.
				</p>
				<div class="bi-contact-menu__cta-wrap" style="display:flex; flex-direction:column; gap:12px;">
					<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="bi-contact-menu__cta">
						<span class="bi-contact-menu__cta-text">Let's Build Something Better</span>
						<span class="bi-contact-menu__arrow" aria-hidden="true">
							<svg viewBox="0 0 160 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<line x1="0" y1="8" x2="148" y2="8" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round"/>
								<path d="M142 2L152 8L142 14" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
					</a>
					<a href="#bi-lead-modal" class="bi-contact-menu__cta bi-contact-menu__cta--modal" role="button" data-bi-modal-trigger="lead-modal" aria-haspopup="dialog" aria-controls="bi-lead-modal" style="opacity:0.9;">
						<span class="bi-contact-menu__cta-text">Get Marketing Plan</span>
						<span class="bi-contact-menu__arrow" aria-hidden="true">
							<svg viewBox="0 0 160 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<line x1="0" y1="8" x2="148" y2="8" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round"/>
								<path d="M142 2L152 8L142 14" stroke="#6A6A6A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</span>
					</a>
				</div>
			</div>

			<!-- Column 2: Contacts -->
			<div class="bi-contact-menu__column bi-contact-menu__column--2">
				<h2 class="bi-contact-menu__heading">contacts</h2>
				<div class="bi-contact-menu__links">
					<a href="mailto:contact@betterinsights.in" class="bi-contact-menu__link">
						<span class="bi-contact-menu__icon" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
						</span>
						<span>contact@betterinsights.in</span>
					</a>
					<a href="tel:+919509996730" class="bi-contact-menu__link">
						<span class="bi-contact-menu__icon" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
						</span>
						<span>+91 950 999 6730</span>
					</a>
					<a href="https://api.whatsapp.com/send?phone=919509996730" target="_blank" rel="noopener noreferrer" class="bi-contact-menu__link">
						<span class="bi-contact-menu__icon" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
						</span>
						<span>WhatsApp Us</span>
					</a>
				</div>
			</div>

			<!-- Column 3: Location -->
			<div class="bi-contact-menu__column bi-contact-menu__column--3">
				<h2 class="bi-contact-menu__heading">location</h2>
				<div class="bi-contact-menu__address">
					Office No. 828,<br>
					Clover Hills Plaza,<br>
					Undri Pisoli Rd, Kondhwa,<br>
					Pune - 411048,<br>
					Maharashtra
				</div>
			</div>

			<!-- Column 4: Follow us -->
			<div class="bi-contact-menu__column bi-contact-menu__column--4">
				<h2 class="bi-contact-menu__heading">follow us</h2>
				<div class="bi-contact-menu__socials">
					<a href="https://www.linkedin.com/company/better-insights-bi/" target="_blank" rel="noopener noreferrer" class="bi-contact-menu__social">
						<span class="bi-contact-menu__social-icon" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
						</span>
						<span>linkedin</span>
					</a>
					<a href="https://www.facebook.com/better.insights.bi#" target="_blank" rel="noopener noreferrer" class="bi-contact-menu__social">
						<span class="bi-contact-menu__social-icon" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
						</span>
						<span>facebook</span>
					</a>
					<a href="https://www.instagram.com/better.insights/" target="_blank" rel="noopener noreferrer" class="bi-contact-menu__social">
						<span class="bi-contact-menu__social-icon" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
						</span>
						<span>instagram</span>
					</a>
					<a href="https://www.behance.net/betterinsights" target="_blank" rel="noopener noreferrer" class="bi-contact-menu__social">
						<span class="bi-contact-menu__social-icon" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7v-2h7v2zm-1.708 3.791c-2.468 0-4.067 1.493-4.067 3.882 0 2.531 1.758 4.027 4.256 4.027 1.85 0 3.324-.803 3.82-2.316h-1.921c-.24.512-.962.883-1.782.883-1.298 0-2.18-.756-2.298-1.977h6.155c.036-.237.054-.51.054-.784 0-2.348-1.49-3.715-3.717-3.715zm-2.029 3.011c.149-1.026.962-1.733 2.012-1.733 1.056 0 1.76.689 1.879 1.733h-3.891zm-9.743-4.802h-5.52v12h5.797c2.932 0 4.688-1.494 4.688-3.74 0-1.579-.909-2.735-2.285-3.239 1.157-.5 1.889-1.545 1.889-2.85 0-1.989-1.602-3.171-4.569-3.171zm-3.242 2.115h2.804c1.29 0 2.043.497 2.043 1.411 0 .963-.789 1.488-2.116 1.488h-2.731v-2.899zm0 4.757h3.045c1.424 0 2.227.568 2.227 1.621 0 1.107-.847 1.674-2.312 1.674h-2.96v-3.295z"/></svg>
						</span>
						<span>behance</span>
					</a>
				</div>
			</div>
		</div>
	</div>
	<?php
}

/**
 * Render the "Search" mega menu panel.
 */
function bi_render_search_mega_menu() {
	$search_url = home_url( '/' );
	$items      = array(
		array(
			'num'   => '01',
			'title' => 'AI solutions & automation',
			'url'   => home_url( '/ai-solutions/' ),
		),
		array(
			'num'   => '02',
			'title' => 'digital transformation',
			'url'   => home_url( '/digital-transformation/' ),
		),
		array(
			'num'   => '03',
			'title' => 'digital growth & marketing',
			'url'   => home_url( '/digital-growth/' ),
		),
		array(
			'num'   => '04',
			'title' => 'CPR calculator tool',
			'url'   => home_url( '/cpr-tool/' ),
		),
	);
	?>
	<div class="bi-search-menu__container">
		<form class="bi-search-menu__form" role="search" method="get" action="<?php echo esc_url( $search_url ); ?>">
			<div class="bi-search-menu__input-wrapper">
				<span class="bi-search-menu__icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="11" cy="11" r="7.5"/>
						<line x1="21" y1="21" x2="16.5" y2="16.5"/>
					</svg>
				</span>
				<input
					class="bi-search-menu__input"
					type="search"
					name="s"
					value="<?php echo esc_attr( get_search_query() ); ?>"
					placeholder="<?php esc_attr_e( 'Search Better Insights...', 'astra-child' ); ?>"
					aria-label="<?php esc_attr_e( 'Search Better Insights', 'astra-child' ); ?>"
					autocomplete="off"
				/>
			</div>

			<button class="bi-search-menu__submit" type="submit">
				<?php esc_html_e( 'Go', 'astra-child' ); ?>
			</button>
		</form>

		<div class="bi-search-menu__trending">
			<div class="bi-search-menu__trending-header">
				<span class="bi-search-menu__trending-icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none" stroke="#6A6A6A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<line x1="7" y1="17" x2="17" y2="7"/>
						<polyline points="7 7 17 7 17 17"/>
					</svg>
				</span>
				<h3 class="bi-search-menu__trending-title">
					Trending<br>pages:
				</h3>
			</div>

			<?php foreach ( $items as $item ) : ?>
				<div class="bi-search-menu__item">
					<span class="bi-search-menu__number"><?php echo esc_html( $item['num'] ); ?></span>
					<a href="<?php echo esc_url( $item['url'] ); ?>" class="bi-search-menu__link">
						<?php echo esc_html( $item['title'] ); ?>
					</a>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
	<?php
}

/**
 * Render the single shared mega menu container.
 */
function bi_render_shared_mega_menu() {
	?>
	<div class="bi-shared-mega-menu" id="bi-shared-mega-menu" role="region" aria-label="<?php esc_attr_e( 'Mega Menu', 'astra-child' ); ?>" hidden data-bi-mega-container>
		<!-- View 1: What We Do -->
		<div class="bi-mega-view bi-what-we-do-menu bi-mega-panel" id="bi-mega-panel" data-bi-mega-view="what-we-do" hidden>
			<?php bi_render_what_we_do_mega_menu(); ?>
		</div>

		<!-- View 2: Insights -->
		<div class="bi-mega-view bi-insights-mega" id="bi-insights-mega-panel" data-bi-insights-panel data-bi-mega-view="insights" hidden>
			<?php bi_render_insights_mega_menu(); ?>
		</div>

		<!-- View 3: About -->
		<div class="bi-mega-view bi-about-menu" id="bi-about-mega-panel" data-bi-about-panel data-bi-mega-view="about" hidden>
			<?php bi_render_about_mega_menu(); ?>
		</div>

		<!-- View 4: Contact Us -->
		<div class="bi-mega-view bi-contact-menu" id="bi-contact-mega-panel" data-bi-contact-panel data-bi-mega-view="contact" hidden>
			<?php bi_render_contact_mega_menu(); ?>
		</div>

		<!-- View 5: Search -->
		<div class="bi-mega-view bi-search-menu" id="bi-search-mega-panel" data-bi-search-panel data-bi-mega-view="search" hidden>
			<?php bi_render_search_mega_menu(); ?>
		</div>
	</div>
	<?php
}

/**
 * Search icon SVG.
 *
 * @return string
 */
function bi_icon_search() {
	return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16.2 16.2L20 20" stroke-linecap="round"/></svg>';
}

/**
 * Close icon SVG.
 *
 * @return string
 */
function bi_icon_close() {
	return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>';
}

/**
 * Render the custom header.
 */
function bi_render_header() {
	$contact_url = home_url( '/contact/' );
	?>
	<header class="bi-header" id="bi-header" data-bi-header>
		<div class="bi-header__glow" aria-hidden="true"></div>
		<div class="bi-header__inner bi-container">
			<div class="bi-header__brand-wrap">
				<div class="bi-header__brand">
					<?php bi_the_logo(); ?>
				</div>
				<!-- <span class="bi-header__rule" aria-hidden="true"></span> -->

			</div>

			<nav class="bi-header__nav" aria-label="<?php esc_attr_e( 'Primary', 'astra-child' ); ?>">
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'primary',
						'container'      => false,
						'menu_class'     => 'bi-nav__list',
						'depth'          => 2,
						'fallback_cb'    => 'bi_fallback_menu',
						'walker'         => new BI_Nav_Walker(),
						'item_spacing'   => 'discard',
					)
				);
				?>
			</nav>

			<div class="bi-header__actions">
				<button class="bi-icon-btn bi-header__search-btn" type="button" data-bi-search-open data-bi-mega-trigger="search" data-mega-menu="search" aria-expanded="false" aria-controls="bi-shared-mega-menu" aria-label="<?php esc_attr_e( 'Toggle search menu', 'astra-child' ); ?>">
					<span class="bi-icon-search-wrap"><?php echo bi_icon_search(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
					<span class="bi-icon-close-wrap" hidden><?php echo bi_icon_close(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
				</button>
				<a class="bi-cta" href="<?php echo esc_url( $contact_url ); ?>">
					<span><?php esc_html_e( "Let's Talk", 'astra-child' ); ?></span>
					<span class="bi-cta__icon" aria-hidden="true">
						<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
							<line x1="7" y1="17" x2="17" y2="7"></line>
							<polyline points="7 7 17 7 17 17"></polyline>
						</svg>
					</span>
				</a>
				<button class="bi-burger" type="button" data-bi-menu-open aria-expanded="false" aria-controls="bi-drawer" aria-label="<?php esc_attr_e( 'Open menu', 'astra-child' ); ?>">
					<span class="bi-burger__line"></span>
					<span class="bi-burger__line"></span>
					<span class="bi-burger__line"></span>
				</button>
			</div>
		</div>
		<?php bi_render_shared_mega_menu(); ?>
	</header>

	<div class="bi-drawer" id="bi-drawer" hidden data-bi-drawer>
		<div class="bi-drawer__backdrop" data-bi-menu-close></div>
		<div class="bi-drawer__panel" role="dialog" aria-modal="true" aria-label="<?php esc_attr_e( 'Mobile navigation', 'astra-child' ); ?>">
			<div class="bi-drawer__head">
				<div class="bi-header__brand-wrap">
					<div class="bi-header__brand">
						<?php bi_the_logo(); ?>
					</div>
					<?php bi_the_branch_logo(); ?>
				</div>
				<button class="bi-icon-btn" type="button" data-bi-menu-close aria-label="<?php esc_attr_e( 'Close menu', 'astra-child' ); ?>">
					<?php echo bi_icon_close(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</button>
			</div>
			<nav class="bi-drawer__nav" aria-label="<?php esc_attr_e( 'Mobile primary', 'astra-child' ); ?>">
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'primary',
						'container'      => false,
						'menu_class'     => 'bi-drawer__list',
						'depth'          => 2,
						'fallback_cb'    => 'bi_fallback_menu',
						'walker'         => new BI_Mobile_Nav_Walker(),
						'bi_mobile'      => true,
						'item_spacing'   => 'discard',
					)
				);
				?>
			</nav>
			<div class="bi-drawer__foot">
				<a class="bi-cta bi-cta--block bi-cta--marketing-plan" href="#bi-lead-modal" role="button" data-bi-modal-trigger="lead-modal" aria-haspopup="dialog" aria-controls="bi-lead-modal">
					<?php esc_html_e( "Get Marketing Plan", 'astra-child' ); ?>
				</a>
				<a class="bi-cta bi-cta--block" href="<?php echo esc_url( $contact_url ); ?>">
					<?php esc_html_e( "Let's Talk", 'astra-child' ); ?>
				</a>
			</div>
		</div>
	</div>
	<?php
}

/**
 * Render custom footer for Better Insights.
 */
function bi_render_footer() {
	?>
	<footer class="bi-footer" id="bi-footer" role="contentinfo">
		<div class="bi-footer__container">
			<div class="bi-footer__grid">
				<!-- Column 1: Brand & Overview -->
				<div class="bi-footer__col bi-footer__col--brand">
					<h3 class="bi-footer__brand-title">Better Insights</h3>
					<p class="bi-footer__text">
						We combine AI, technology and growth marketing to help businesses attract customers, automate operations and scale with confidence.
					</p>
					<p class="bi-footer__copyright">
						&copy; <?php echo esc_html( date( 'Y' ) ); ?> Better Insights. All rights reserved.
					</p>
				</div>

				<!-- Column 2: Company -->
				<div class="bi-footer__col">
					<h4 class="bi-footer__heading">Company</h4>
					<ul class="bi-footer__list">
						<li><a href="<?php echo esc_url( home_url( '/about/' ) ); ?>" class="bi-footer__link">About Better Insights</a></li>
						<li><a href="<?php echo esc_url( home_url( '/about/#who-we-are' ) ); ?>" class="bi-footer__link">Who We Are</a></li>
						<li><a href="<?php echo esc_url( home_url( '/about/#our-values' ) ); ?>" class="bi-footer__link">Our Approach</a></li>
						<li><a href="<?php echo esc_url( home_url( '/our-work/' ) ); ?>" class="bi-footer__link">Our Work</a></li>
						<li><a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="bi-footer__link">Contact Us</a></li>
					</ul>
				</div>

				<!-- Column 3: What We Do -->
				<div class="bi-footer__col">
					<h4 class="bi-footer__heading">What We Do</h4>
					<ul class="bi-footer__list">
						<li><a href="<?php echo esc_url( home_url( '/ai-solutions/' ) ); ?>" class="bi-footer__link">AI & Automation</a></li>
						<li><a href="<?php echo esc_url( home_url( '/digital-growth/' ) ); ?>" class="bi-footer__link">Digital Marketing</a></li>
						<li><a href="<?php echo esc_url( home_url( '/website-development/' ) ); ?>" class="bi-footer__link">Web Development</a></li>
						<li><a href="<?php echo esc_url( home_url( '/crm-integrations/' ) ); ?>" class="bi-footer__link">CRM Development</a></li>
						<li><a href="<?php echo esc_url( home_url( '/technology-engineering/' ) ); ?>" class="bi-footer__link">Technology & Engineering</a></li>
						<li><a href="<?php echo esc_url( home_url( '/digital-transformation/' ) ); ?>" class="bi-footer__link">Digital Transformation</a></li>
					</ul>
				</div>

				<!-- Column 4: Connect & CTA -->
				<div class="bi-footer__col bi-footer__col--cta">
					<h4 class="bi-footer__heading">Connect</h4>
					<p class="bi-footer__text">Ready to accelerate your digital growth?</p>
					<div class="bi-footer__cta-wrap">
						<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="bi-footer__cta">
							<span>Let's Build Something Better </span>
						</a>
					</div>
					<div class="bi-footer__socials">
						<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="bi-footer__social-link">LinkedIn</a>
						<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="bi-footer__social-link">Instagram</a>
						<a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="bi-footer__social-link">YouTube</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
	<?php
}

/**
 * Replace Astra footer with custom Better Insights footer.
 */
function bi_replace_astra_footer() {
	remove_all_actions( 'astra_footer' );
	add_action( 'astra_footer', 'bi_render_footer', 10 );
}
add_action( 'wp', 'bi_replace_astra_footer', 20 );

