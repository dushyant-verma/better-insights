<?php
/**
 * Template Name: CPR Calculator Tool
 * The template for displaying the Cost Per Result (CPR) Calculator Tool.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>

<main class="bi-utility-page bi-cpr-page" id="primary">
	<div class="bi-utility-hero">
		<div class="bi-container">
			<nav class="bi-case-breadcrumbs" aria-label="<?php esc_attr_e( 'Breadcrumb', 'astra-child' ); ?>">
				<ol class="bi-case-breadcrumbs__list">
					<li class="bi-case-breadcrumbs__item"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'astra-child' ); ?></a></li>
					<li class="bi-case-breadcrumbs__sep" aria-hidden="true">/</li>
					<li class="bi-case-breadcrumbs__item bi-case-breadcrumbs__item--active" aria-current="page"><?php esc_html_e( 'CPR Tool', 'astra-child' ); ?></li>
				</ol>
			</nav>

			<div class="bi-utility-hero__content">
				<span class="bi-utility-hero__eyebrow"><?php esc_html_e( 'RESOURCES & CALCULATORS', 'astra-child' ); ?></span>
				<h1 class="bi-utility-hero__title"><?php esc_html_e( 'Cost Per Result (CPR) Calculator', 'astra-child' ); ?></h1>
				<p class="bi-utility-hero__desc">
					<?php esc_html_e( 'Benchmark and evaluate the efficiency of your marketing campaigns. Calculate your true Cost Per Result across paid media, search ads, and conversion funnels.', 'astra-child' ); ?>
				</p>
			</div>
		</div>
	</div>

	<div class="bi-utility-body">
		<div class="bi-container">
			<div class="bi-cpr-frame-card">
				<div class="bi-cpr-frame-wrapper">
					<iframe
						id="cprCalculator"
						src="https://cpr-calculator.netlify.app/"
						title="<?php esc_attr_e( 'Cost Per Result (CPR) Calculator', 'astra-child' ); ?>"
						width="100%"
						height="750"
						frameborder="0"
						scrolling="no"
						loading="lazy"
						allow="clipboard-write"
					></iframe>
				</div>
			</div>
		</div>
	</div>
</main>

<script>
window.addEventListener("message", function (event) {
	if (event.data && event.data.iframeHeight) {
		var frame = document.getElementById("cprCalculator");
		if (frame) {
			frame.style.height = event.data.iframeHeight + "px";
		}
	}
});
</script>

<?php
get_footer();
