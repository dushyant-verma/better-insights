<?php
/**
 * Template Name: Better Insights Clientele
 * The template for displaying the comprehensive Clientele & Partner directory.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$upload_base = content_url( '/uploads/2026/10/' );

$clients = array(
	// Healthcare & Life Sciences
	array( 'name' => 'Pooja Hospital', 'industry' => 'Healthcare', 'image' => $upload_base . 'Pooja-Hospital.webp' ),
	array( 'name' => 'GT Diagnostics', 'industry' => 'Healthcare', 'image' => $upload_base . 'gt-diagnostics-logo-e1747472463202.png.webp' ),
	array( 'name' => 'Dr. Pet', 'industry' => 'Healthcare', 'image' => $upload_base . 'Dr.-Pet.webp' ),
	array( 'name' => 'Dentwin', 'industry' => 'Healthcare', 'image' => $upload_base . 'Dentwin-1-e1757342321293.png.webp' ),
	array( 'name' => 'Dant Suraksha', 'industry' => 'Healthcare', 'image' => $upload_base . 'dant-suraksha-logo-2.png.webp' ),
	array( 'name' => 'JP Hospital Solan', 'industry' => 'Healthcare', 'image' => $upload_base . 'JP-Hospital-Solan-logo.png' ),
	array( 'name' => 'Afecto', 'industry' => 'Healthcare', 'image' => $upload_base . 'afecto-logo-e1747472495525.png.webp' ),
	array( 'name' => 'Biotopics', 'industry' => 'Healthcare', 'image' => $upload_base . 'Biotopics-Logo.png.webp' ),
	array( 'name' => 'HMH', 'industry' => 'Healthcare', 'image' => $upload_base . 'hmh-logo.png.webp' ),

	// Education & EdTech
	array( 'name' => 'Veda Edu', 'industry' => 'Education', 'image' => $upload_base . 'Veda-Edu-logo.png.webp' ),
	array( 'name' => 'Course Proxy', 'industry' => 'Education', 'image' => $upload_base . 'courseproxy-logo.png.webp' ),
	array( 'name' => 'RK College', 'industry' => 'Education', 'image' => $upload_base . 'RK-College.webp' ),

	// E-Commerce & Retail
	array( 'name' => 'Voyya', 'industry' => 'E-Commerce', 'image' => $upload_base . 'Voyya.webp' ),
	array( 'name' => 'Stylebar Ireland', 'industry' => 'E-Commerce', 'image' => $upload_base . 'stylebar-ireland.png.webp' ),
	array( 'name' => 'Sanction Store', 'industry' => 'E-Commerce', 'image' => $upload_base . 'Sanction-Store-2.png.webp' ),
	array( 'name' => 'Label16', 'industry' => 'E-Commerce', 'image' => $upload_base . 'Label16-Logo.png.webp' ),
	array( 'name' => 'Miracle Rug', 'industry' => 'E-Commerce', 'image' => $upload_base . 'miracle-rug-logo.png' ),
	array( 'name' => 'Almoda', 'industry' => 'E-Commerce', 'image' => $upload_base . 'almoda-logo.png.webp' ),
	array( 'name' => 'Bernela', 'industry' => 'E-Commerce', 'image' => $upload_base . 'Bernela.webp' ),

	// Enterprise, Legal, Manufacturing & Services
	array( 'name' => 'The Ly', 'industry' => 'Enterprise', 'image' => $upload_base . 'thely-logo.png' ),
	array( 'name' => 'Khare Legal Chambers', 'industry' => 'Enterprise', 'image' => $upload_base . 'khare-legal-chambers-logo-1.png.webp' ),
	array( 'name' => 'Old Fort Quarter', 'industry' => 'Enterprise', 'image' => $upload_base . 'oldfortquater-logo.png.webp' ),
	array( 'name' => 'TJC', 'industry' => 'Enterprise', 'image' => $upload_base . 'tjc-logo.png.webp' ),
	array( 'name' => 'Skydec', 'industry' => 'Enterprise', 'image' => $upload_base . 'skydec-logo.png.webp' ),
	array( 'name' => 'Perfect Frame Studios', 'industry' => 'Enterprise', 'image' => $upload_base . 'Perfect-Frame-Studios-Logo.png.webp' ),
	array( 'name' => 'Nirmala Enterprises', 'industry' => 'Enterprise', 'image' => $upload_base . 'Nirmala-Ent.png' ),
	array( 'name' => 'MPF', 'industry' => 'Enterprise', 'image' => $upload_base . 'mpf-logo.png' ),
	array( 'name' => 'Lieber Earth', 'industry' => 'Enterprise', 'image' => $upload_base . 'lieberearth-logo.png.webp' ),
	array( 'name' => 'LED CN', 'industry' => 'Enterprise', 'image' => $upload_base . 'ledcn-logo.png.webp' ),
	array( 'name' => 'La Maison', 'industry' => 'Enterprise', 'image' => $upload_base . 'La-masion.png.webp' ),
	array( 'name' => 'Hidup', 'industry' => 'Enterprise', 'image' => $upload_base . 'hidup-logo.png' ),
	array( 'name' => 'Deshyoga', 'industry' => 'Enterprise', 'image' => $upload_base . 'deshyoga-logo.png.webp' ),
	array( 'name' => 'Classic Daiquiris', 'industry' => 'Enterprise', 'image' => $upload_base . 'Classic-Daiquiris-logo-1.png' ),
	array( 'name' => 'Baraza', 'industry' => 'Enterprise', 'image' => $upload_base . 'baraza-logo.png.webp' ),
	array( 'name' => 'Ashtang', 'industry' => 'Enterprise', 'image' => $upload_base . 'ashtang-logo-e1747472538329.png' ),
	array( 'name' => 'Apki Return', 'industry' => 'Enterprise', 'image' => $upload_base . 'apki-return-logo-e1747472274482.png.webp' ),
	array( 'name' => '2C Consulting', 'industry' => 'Enterprise', 'image' => $upload_base . '2cconsulting-logo.png' ),
);
?>

<main class="bi-utility-page bi-clientele-page" id="primary">
	<div class="bi-utility-hero">
		<div class="bi-container">
			<nav class="bi-case-breadcrumbs" aria-label="<?php esc_attr_e( 'Breadcrumb', 'astra-child' ); ?>">
				<ol class="bi-case-breadcrumbs__list">
					<li class="bi-case-breadcrumbs__item"><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'astra-child' ); ?></a></li>
					<li class="bi-case-breadcrumbs__sep" aria-hidden="true">/</li>
					<li class="bi-case-breadcrumbs__item bi-case-breadcrumbs__item--active" aria-current="page"><?php esc_html_e( 'Our Clientele', 'astra-child' ); ?></li>
				</ol>
			</nav>

			<div class="bi-utility-hero__content">
				<span class="bi-utility-hero__eyebrow"><?php esc_html_e( 'TRUSTED BY GLOBAL BRANDS', 'astra-child' ); ?></span>
				<h1 class="bi-utility-hero__title"><?php esc_html_e( 'Our Clientele & Partners', 'astra-child' ); ?></h1>
				<p class="bi-utility-hero__desc">
					<?php esc_html_e( 'From ambitious startups to multinational enterprises, we partner with visionary leaders across healthcare, e-commerce, education, and technology.', 'astra-child' ); ?>
				</p>
			</div>

			<!-- Filter Tabs -->
			<div class="bi-clientele-filters" role="tablist">
				<button type="button" class="bi-clientele-tab is-active" data-filter="all" role="tab" aria-selected="true"><?php esc_html_e( 'All Sectors (35+)', 'astra-child' ); ?></button>
				<button type="button" class="bi-clientele-tab" data-filter="Healthcare" role="tab" aria-selected="false"><?php esc_html_e( 'Healthcare & Medical', 'astra-child' ); ?></button>
				<button type="button" class="bi-clientele-tab" data-filter="Education" role="tab" aria-selected="false"><?php esc_html_e( 'EdTech & Education', 'astra-child' ); ?></button>
				<button type="button" class="bi-clientele-tab" data-filter="E-Commerce" role="tab" aria-selected="false"><?php esc_html_e( 'E-Commerce & Retail', 'astra-child' ); ?></button>
				<button type="button" class="bi-clientele-tab" data-filter="Enterprise" role="tab" aria-selected="false"><?php esc_html_e( 'Enterprise & B2B', 'astra-child' ); ?></button>
			</div>
		</div>
	</div>

	<div class="bi-utility-body">
		<div class="bi-container">
			<div class="bi-clientele-grid" id="clienteleGrid">
				<?php foreach ( $clients as $client ) : ?>
					<div class="bi-client-card" data-industry="<?php echo esc_attr( $client['industry'] ); ?>">
						<div class="bi-client-card__inner">
							<img
								src="<?php echo esc_url( $client['image'] ); ?>"
								alt="<?php echo esc_attr( $client['name'] . ' Logo' ); ?>"
								class="bi-client-card__img"
								loading="lazy"
								decoding="async"
							/>
						</div>
						<div class="bi-client-card__footer">
							<span class="bi-client-card__name"><?php echo esc_html( $client['name'] ); ?></span>
							<span class="bi-client-card__sector"><?php echo esc_html( $client['industry'] ); ?></span>
						</div>
					</div>
				<?php endforeach; ?>
			</div>

			<!-- Client Trust Metrics Banner -->
			<div class="bi-clientele-metrics-banner">
				<div class="bi-metric-col">
					<span class="bi-metric-num">50+</span>
					<span class="bi-metric-txt"><?php esc_html_e( 'Projects Delivered', 'astra-child' ); ?></span>
				</div>
				<div class="bi-metric-col">
					<span class="bi-metric-num">36+</span>
					<span class="bi-metric-txt"><?php esc_html_e( 'Enterprise Partners', 'astra-child' ); ?></span>
				</div>
				<div class="bi-metric-col">
					<span class="bi-metric-num">98%</span>
					<span class="bi-metric-txt"><?php esc_html_e( 'Client Retention Rate', 'astra-child' ); ?></span>
				</div>
				<div class="bi-metric-col">
					<span class="bi-metric-num">100%</span>
					<span class="bi-metric-txt"><?php esc_html_e( 'Outcome Driven', 'astra-child' ); ?></span>
				</div>
			</div>
		</div>
	</div>
</main>

<script>
document.addEventListener("DOMContentLoaded", function () {
	const tabs = document.querySelectorAll(".bi-clientele-tab");
	const cards = document.querySelectorAll(".bi-client-card");

	tabs.forEach(tab => {
		tab.addEventListener("click", function () {
			tabs.forEach(t => {
				t.classList.remove("is-active");
				t.setAttribute("aria-selected", "false");
			});
			this.classList.add("is-active");
			this.setAttribute("aria-selected", "true");

			const filter = this.getAttribute("data-filter");

			cards.forEach(card => {
				if (filter === "all" || card.getAttribute("data-industry") === filter) {
					card.style.display = "flex";
				} else {
					card.style.display = "none";
				}
			});
		});
	});
});
</script>

<?php
get_footer();

