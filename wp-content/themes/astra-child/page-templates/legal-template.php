<?php
/**
 * Template Name: Legal Document Template
 * The master reusable template for legal and compliance documents (Privacy Policy, Terms & Conditions).
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$theme_dir = get_stylesheet_directory();
$theme_uri = get_stylesheet_directory_uri();

// Enqueue Legal Document Master Stylesheet
$legal_css = $theme_dir . '/assets/css/legal-pages.css';
if ( ! wp_style_is( 'bi-legal-pages', 'enqueued' ) ) {
	wp_enqueue_style(
		'bi-legal-pages',
		$theme_uri . '/assets/css/legal-pages.css',
		array( 'astra-child-style', 'bi-cta-style' ),
		file_exists( $legal_css ) ? (string) filemtime( $legal_css ) : wp_get_theme()->get( 'Version' )
	);
}

get_header();
?>

<main class="bi-legal-page" id="primary">
	<!-- Legal Hero Banner Header -->
	<header class="bi-legal-hero">
		<div class="bi-container">
			<div class="bi-legal-hero__inner">
				<nav class="bi-case-breadcrumbs" aria-label="<?php esc_attr_e( 'Breadcrumb', 'astra-child' ); ?>">
					<ol class="bi-case-breadcrumbs__list">
						<li class="bi-case-breadcrumbs__item"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'astra-child' ); ?></a></li>
						<li class="bi-case-breadcrumbs__sep" aria-hidden="true">/</li>
						<li class="bi-case-breadcrumbs__item"><a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>"><?php esc_html_e( 'Legal', 'astra-child' ); ?></a></li>
						<li class="bi-case-breadcrumbs__sep" aria-hidden="true">/</li>
						<li class="bi-case-breadcrumbs__item bi-case-breadcrumbs__item--active" aria-current="page"><?php the_title(); ?></li>
					</ol>
				</nav>

				<div class="bi-legal-hero__meta">
					<span class="bi-legal-hero__eyebrow"><?php esc_html_e( 'LEGAL & COMPLIANCE', 'astra-child' ); ?></span>
					<span class="bi-legal-hero__date-badge">
						<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<circle cx="12" cy="12" r="10"></circle>
							<polyline points="12 6 12 12 16 14"></polyline>
						</svg>
						<?php printf( esc_html__( 'Last Updated: %s', 'astra-child' ), esc_html( get_the_modified_date( 'F j, Y' ) ) ); ?>
					</span>
				</div>

				<h1 class="bi-legal-hero__title"><?php the_title(); ?></h1>

				<?php if ( has_excerpt() ) : ?>
					<p class="bi-legal-hero__lead"><?php echo esc_html( get_the_excerpt() ); ?></p>
				<?php endif; ?>
			</div>
		</div>
	</header>

	<!-- Editorial Legal Content Body -->
	<div class="bi-legal-body">
		<div class="bi-container">
			<div class="bi-legal-content entry-content">
				<?php
				while ( have_posts() ) :
					the_post();
					the_content();
				endwhile;
				?>
			</div>
		</div>
	</div>
</main>

<?php
get_footer();
