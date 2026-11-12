<?php
/**
 * Better Insights — Feel the Atmosphere Culture Section
 * Inspired by MadeByShape's scrapbook animated culture section.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$theme_uri = get_stylesheet_directory_uri();
$culture_img_base = $theme_uri . '/assets/images/culture/';
?>

<section class="bi-culture-section" aria-labelledby="bi-culture-title">
	<div class="bi-culture-container">
		<!-- Section Header (.bi-culture-intro) -->
		<header class="bi-culture-intro">
			<div class="bi-culture-intro__heading-wrap">
				<span class="bi-culture-intro__eyebrow"><?php esc_html_e( 'Our Culture & People', 'astra-child' ); ?></span>
				<h2 id="bi-culture-title" class="bi-culture-intro__title"><?php esc_html_e( 'Feel the atmosphere.', 'astra-child' ); ?></h2>
			</div>

			<div class="bi-culture-intro__desc-wrap">
				<p class="bi-culture-intro__desc">
					<?php esc_html_e( 'Behind every great digital experience is a team of curious minds, creative thinkers and problem solvers. At Better Insights, we bring strategy, design and technology together to create meaningful digital experiences and build things that make a difference.', 'astra-child' ); ?>
				</p>

				<!-- Touch Navigation Controls for Mobile/Tablet -->
				<div class="bi-culture-controls" aria-label="<?php esc_attr_e( 'Culture Gallery Controls', 'astra-child' ); ?>">
					<button type="button" class="bi-culture-nav-btn bi-culture-nav-btn--prev" aria-label="<?php esc_attr_e( 'Previous images', 'astra-child' ); ?>">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
					</button>
					<button type="button" class="bi-culture-nav-btn bi-culture-nav-btn--next" aria-label="<?php esc_attr_e( 'Next images', 'astra-child' ); ?>">
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
					</button>
				</div>
			</div>
		</header>
	</div>

	<!-- Scrapbook Collage Wrap (.bi-culture-collage) -->
	<div class="bi-culture-collage-wrap" tabindex="0" role="region" aria-label="<?php esc_attr_e( 'Team Atmosphere Photo Collage', 'astra-child' ); ?>">
		<div class="bi-culture-collage">

			<!-- Cluster 1: Ideas & Design -->
			<div class="bi-culture-cluster bi-culture-cluster--1">
				<!-- Item 1: Ideas in motion -->
				<div class="bi-culture-item bi-culture-item--1">
					<div class="bi-culture-caption bi-culture-caption--top-left">
						<span class="bi-culture-caption__emoji" role="img" aria-label="Finger pointing up">☝️</span>
						<span class="bi-culture-caption__badge"><?php esc_html_e( 'Ideas in motion', 'astra-child' ); ?></span>
					</div>
					<div class="bi-culture-item__media-box">
						<img
							src="<?php echo esc_url( $culture_img_base . 'hero-marketing-team.jpg' ); ?>"
							alt="<?php esc_attr_e( 'Better Insights team collaborating on digital strategy', 'astra-child' ); ?>"
							class="bi-culture-item__img"
							loading="lazy"
							width="480"
							height="360"
						/>
					</div>
				</div>

				<!-- Item 2: Design meets technology -->
				<div class="bi-culture-item bi-culture-item--2">
					<div class="bi-culture-caption bi-culture-caption--bottom-right">
						<span class="bi-culture-caption__badge"><?php esc_html_e( 'Design meets technology', 'astra-child' ); ?></span>
						<span class="bi-culture-caption__emoji" role="img" aria-label="Finger pointing down">👇</span>
					</div>
					<div class="bi-culture-item__media-box">
						<img
							src="<?php echo esc_url( $culture_img_base . 'photo-1531403009284-440f080d1e12.jpg' ); ?>"
							alt="<?php esc_attr_e( 'User experience design and wireframe mapping', 'astra-child' ); ?>"
							class="bi-culture-item__img"
							loading="lazy"
							width="380"
							height="480"
						/>
					</div>
				</div>
			</div>

			<!-- Cluster 2: Collaboration & Focus -->
			<div class="bi-culture-cluster bi-culture-cluster--2">
				<!-- Item 3: Built together -->
				<div class="bi-culture-item bi-culture-item--3">
					<div class="bi-culture-caption bi-culture-caption--top-right">
						<span class="bi-culture-caption__emoji" role="img" aria-label="Sparkles">✨</span>
						<span class="bi-culture-caption__badge"><?php esc_html_e( 'Built together', 'astra-child' ); ?></span>
					</div>
					<div class="bi-culture-item__media-box">
						<img
							src="<?php echo esc_url( $culture_img_base . 'photo-1556761175-4b46a572b786.jpg' ); ?>"
							alt="<?php esc_attr_e( 'Cross-functional engineering and design sprint', 'astra-child' ); ?>"
							class="bi-culture-item__img"
							loading="lazy"
							width="420"
							height="380"
						/>
					</div>
				</div>

				<!-- Item 4: Creative minds at work -->
				<div class="bi-culture-item bi-culture-item--4">
					<div class="bi-culture-caption bi-culture-caption--bottom-left">
						<span class="bi-culture-caption__badge"><?php esc_html_e( 'Creative minds at work', 'astra-child' ); ?></span>
						<span class="bi-culture-caption__emoji" role="img" aria-label="Finger pointing up">☝️</span>
					</div>
					<div class="bi-culture-item__media-box">
						<img
							src="<?php echo esc_url( $culture_img_base . 'photo-1551836022-d5d88e9218df.jpg' ); ?>"
							alt="<?php esc_attr_e( 'Creative specialist developing brand concepts', 'astra-child' ); ?>"
							class="bi-culture-item__img"
							loading="lazy"
							width="360"
							height="440"
						/>
					</div>
				</div>
			</div>

			<!-- Cluster 3: Innovation & Brainstorming -->
			<div class="bi-culture-cluster bi-culture-cluster--3">
				<!-- Item 5: Brainstorming something big -->
				<div class="bi-culture-item bi-culture-item--5">
					<div class="bi-culture-caption bi-culture-caption--bottom-right">
						<span class="bi-culture-caption__badge"><?php esc_html_e( 'Brainstorming something big', 'astra-child' ); ?></span>
						<span class="bi-culture-caption__emoji" role="img" aria-label="Finger pointing down">👇</span>
					</div>
					<div class="bi-culture-item__media-box">
						<img
							src="<?php echo esc_url( $culture_img_base . 'photo-1552664730-d307ca884978.jpg' ); ?>"
							alt="<?php esc_attr_e( 'Strategic whiteboard planning workshop', 'astra-child' ); ?>"
							class="bi-culture-item__img"
							loading="lazy"
							width="480"
							height="370"
						/>
					</div>
				</div>

				<!-- Item 6: Behind the pixels -->
				<div class="bi-culture-item bi-culture-item--6">
					<div class="bi-culture-caption bi-culture-caption--top-left">
						<span class="bi-culture-caption__emoji" role="img" aria-label="Finger pointing up">☝️</span>
						<span class="bi-culture-caption__badge"><?php esc_html_e( 'Behind the pixels', 'astra-child' ); ?></span>
					</div>
					<div class="bi-culture-item__media-box">
						<img
							src="<?php echo esc_url( $culture_img_base . 'photo-1553877522-43269d4ea984.jpg' ); ?>"
							alt="<?php esc_attr_e( 'Deep focus engineering and interface precision', 'astra-child' ); ?>"
							class="bi-culture-item__img"
							loading="lazy"
							width="350"
							height="460"
						/>
					</div>
				</div>
			</div>

			<!-- Cluster 4: Culture & Team Spirit -->
			<div class="bi-culture-cluster bi-culture-cluster--4">
				<!-- Item 7: Team moments -->
				<div class="bi-culture-item bi-culture-item--7">
					<div class="bi-culture-caption bi-culture-caption--bottom-right">
						<span class="bi-culture-caption__badge"><?php esc_html_e( 'Team moments', 'astra-child' ); ?></span>
						<span class="bi-culture-caption__emoji" role="img" aria-label="Finger pointing down">👇</span>
					</div>
					<div class="bi-culture-item__media-box">
						<img
							src="<?php echo esc_url( $culture_img_base . 'photo-1515187029135-18ee286d815b.jpg' ); ?>"
							alt="<?php esc_attr_e( 'Celebrating team milestones and camaraderie', 'astra-child' ); ?>"
							class="bi-culture-item__img"
							loading="lazy"
							width="440"
							height="360"
						/>
					</div>
				</div>

				<!-- Item 8: Always exploring -->
				<div class="bi-culture-item bi-culture-item--8">
					<div class="bi-culture-caption bi-culture-caption--top-right">
						<span class="bi-culture-caption__emoji" role="img" aria-label="Finger pointing up">☝️</span>
						<span class="bi-culture-caption__badge"><?php esc_html_e( 'Always exploring', 'astra-child' ); ?></span>
					</div>
					<div class="bi-culture-item__media-box">
						<img
							src="<?php echo esc_url( $culture_img_base . 'photo-1559136555-9303baea8ebd.jpg' ); ?>"
							alt="<?php esc_attr_e( 'Researching emerging technology patterns', 'astra-child' ); ?>"
							class="bi-culture-item__img"
							loading="lazy"
							width="380"
							height="440"
						/>
					</div>
				</div>
			</div>

			<!-- Cluster 5: Impact & Reality -->
			<div class="bi-culture-cluster bi-culture-cluster--5">
				<!-- Item 9: Turning ideas into reality -->
				<div class="bi-culture-item bi-culture-item--9">
					<div class="bi-culture-caption bi-culture-caption--top-left">
						<span class="bi-culture-caption__emoji" role="img" aria-label="Rocket">🚀</span>
						<span class="bi-culture-caption__badge"><?php esc_html_e( 'Turning ideas into reality', 'astra-child' ); ?></span>
					</div>
					<div class="bi-culture-item__media-box">
						<img
							src="<?php echo esc_url( $culture_img_base . 'photo-1573164713988-8665fc963095.jpg' ); ?>"
							alt="<?php esc_attr_e( 'Delivering business impact and measurable client ROI', 'astra-child' ); ?>"
							class="bi-culture-item__img"
							loading="lazy"
							width="480"
							height="380"
						/>
					</div>
				</div>
			</div>

		</div>
	</div>
</section>

