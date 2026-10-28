<?php
/**
 * Better Insights - Client Logo Wall Section (Two Opposing Moving Rows)
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$upload_base = content_url( '/uploads/2026/10/' );

$all_logos = array(
	// Row 1 (18 logos)
	array( 'name' => 'Voyya', 'image' => $upload_base . 'Voyya.webp' ),
	array( 'name' => 'Veda Edu', 'image' => $upload_base . 'Veda-Edu-logo.png.webp' ),
	array( 'name' => 'TJC', 'image' => $upload_base . 'tjc-logo.png.webp' ),
	array( 'name' => 'Stylebar Ireland', 'image' => $upload_base . 'stylebar-ireland.png.webp' ),
	array( 'name' => 'Skydec', 'image' => $upload_base . 'skydec-logo.png.webp' ),
	array( 'name' => 'Sanction Store', 'image' => $upload_base . 'Sanction-Store-2.png.webp' ),
	array( 'name' => 'RK College', 'image' => $upload_base . 'RK-College.webp' ),
	array( 'name' => 'Pooja Hospital', 'image' => $upload_base . 'Pooja-Hospital.webp' ),
	array( 'name' => 'Perfect Frame Studios', 'image' => $upload_base . 'Perfect-Frame-Studios-Logo.png.webp' ),
	array( 'name' => 'Old Fort Quarter', 'image' => $upload_base . 'oldfortquater-logo.png.webp' ),
	array( 'name' => 'Nirmala Enterprises', 'image' => $upload_base . 'Nirmala-Ent.png' ),
	array( 'name' => 'MPF', 'image' => $upload_base . 'mpf-logo.png' ),
	array( 'name' => 'Miracle Rug', 'image' => $upload_base . 'miracle-rug-logo.png' ),
	array( 'name' => 'Lieber Earth', 'image' => $upload_base . 'lieberearth-logo.png.webp' ),
	array( 'name' => 'LED CN', 'image' => $upload_base . 'ledcn-logo.png.webp' ),
	array( 'name' => 'Label16', 'image' => $upload_base . 'Label16-Logo.png.webp' ),
	array( 'name' => 'La Maison', 'image' => $upload_base . 'La-masion.png.webp' ),
	array( 'name' => 'Khare Legal Chambers', 'image' => $upload_base . 'khare-legal-chambers-logo-1.png.webp' ),

	// Row 2 (18 logos)
	array( 'name' => 'JP Hospital Solan', 'image' => $upload_base . 'JP-Hospital-Solan-logo.png' ),
	array( 'name' => 'HMH', 'image' => $upload_base . 'hmh-logo.png.webp' ),
	array( 'name' => 'Hidup', 'image' => $upload_base . 'hidup-logo.png' ),
	array( 'name' => 'GT Diagnostics', 'image' => $upload_base . 'gt-diagnostics-logo-e1747472463202.png.webp' ),
	array( 'name' => 'Dr. Pet', 'image' => $upload_base . 'Dr.-Pet.webp' ),
	array( 'name' => 'Deshyoga', 'image' => $upload_base . 'deshyoga-logo.png.webp' ),
	array( 'name' => 'Dentwin', 'image' => $upload_base . 'Dentwin-1-e1757342321293.png.webp' ),
	array( 'name' => 'Dant Suraksha', 'image' => $upload_base . 'dant-suraksha-logo-2.png.webp' ),
	array( 'name' => 'Course Proxy', 'image' => $upload_base . 'courseproxy-logo.png.webp' ),
	array( 'name' => 'Classic Daiquiris', 'image' => $upload_base . 'Classic-Daiquiris-logo-1.png' ),
	array( 'name' => 'Biotopics', 'image' => $upload_base . 'Biotopics-Logo.png.webp' ),
	array( 'name' => 'Bernela', 'image' => $upload_base . 'Bernela.webp' ),
	array( 'name' => 'Baraza', 'image' => $upload_base . 'baraza-logo.png.webp' ),
	array( 'name' => 'Ashtang', 'image' => $upload_base . 'ashtang-logo-e1747472538329.png' ),
	array( 'name' => 'Apki Return', 'image' => $upload_base . 'apki-return-logo-e1747472274482.png.webp' ),
	array( 'name' => 'Almoda', 'image' => $upload_base . 'almoda-logo.png.webp' ),
	array( 'name' => 'Afecto', 'image' => $upload_base . 'afecto-logo-e1747472495525.png.webp' ),
	array( 'name' => '2C Consulting', 'image' => $upload_base . '2cconsulting-logo.png' ),
);

$row1_logos = array_slice( $all_logos, 0, 18 );
$row2_logos = array_slice( $all_logos, 18, 18 );
?>

<section class="bi-client-logo-wall bi-theme--stone" data-theme="stone" aria-label="<?php esc_attr_e( 'Trusted Clients & Partners', 'astra-child' ); ?>">
	<div class="bi-client-logo-wall__container bi-container">
		
		<!-- Header Area -->
		<header class="bi-client-logo-wall__header">
			<span class="bi-client-logo-wall__eyebrow"><?php esc_html_e( 'TRUSTED BY BUSINESSES THAT MOVE FORWARD', 'astra-child' ); ?></span>
			<h2 class="bi-client-logo-wall__heading">
				Building Digital experiences<br>
				<span class="bi-client-logo-wall__heading-accent">That Create Impact.</span>
			</h2>
		</header>

		<!-- Two Opposing Rows Wrapper -->
		<div class="bi-client-logo-wall__rows-wrapper">

			<!-- ROW 1 (Moves LEFT) -->
			<div class="bi-logo-row bi-logo-row--left" data-logo-row="1">
				<div class="bi-logo-track" data-logo-track="1">
					<!-- Set 1 (18 logos) -->
					<div class="bi-logo-track__set">
						<?php foreach ( $row1_logos as $index => $logo ) : ?>
							<div class="bi-client-logo-wall__cell">
								<div class="bi-client-logo-wall__item" tabindex="0" role="img" aria-label="<?php echo esc_attr( sprintf( __( '%s Client Logo', 'astra-child' ), $logo['name'] ) ); ?>">
									<img
										class="bi-client-logo-wall__img"
										src="<?php echo esc_url( $logo['image'] ); ?>"
										alt="<?php echo esc_attr( $logo['name'] ); ?>"
										loading="lazy"
										decoding="async"
									/>
								</div>
								<div class="bi-client-logo-wall__cell-accent" aria-hidden="true"></div>
							</div>
						<?php endforeach; ?>
					</div>
					<!-- Duplicate Set for Seamless Infinite Loop -->
					<div class="bi-logo-track__set" aria-hidden="true">
						<?php foreach ( $row1_logos as $index => $logo ) : ?>
							<div class="bi-client-logo-wall__cell">
								<div class="bi-client-logo-wall__item" tabindex="-1">
									<img
										class="bi-client-logo-wall__img"
										src="<?php echo esc_url( $logo['image'] ); ?>"
										alt=""
										loading="lazy"
										decoding="async"
									/>
								</div>
								<div class="bi-client-logo-wall__cell-accent" aria-hidden="true"></div>
							</div>
						<?php endforeach; ?>
					</div>
				</div>
			</div>

			<!-- ROW 2 (Moves RIGHT) -->
			<div class="bi-logo-row bi-logo-row--right" data-logo-row="2">
				<div class="bi-logo-track" data-logo-track="2">
					<!-- Set 1 (18 logos) -->
					<div class="bi-logo-track__set">
						<?php foreach ( $row2_logos as $index => $logo ) : ?>
							<div class="bi-client-logo-wall__cell">
								<div class="bi-client-logo-wall__item" tabindex="0" role="img" aria-label="<?php echo esc_attr( sprintf( __( '%s Client Logo', 'astra-child' ), $logo['name'] ) ); ?>">
									<img
										class="bi-client-logo-wall__img"
										src="<?php echo esc_url( $logo['image'] ); ?>"
										alt="<?php echo esc_attr( $logo['name'] ); ?>"
										loading="lazy"
										decoding="async"
									/>
								</div>
								<div class="bi-client-logo-wall__cell-accent" aria-hidden="true"></div>
							</div>
						<?php endforeach; ?>
					</div>
					<!-- Duplicate Set for Seamless Infinite Loop -->
					<div class="bi-logo-track__set" aria-hidden="true">
						<?php foreach ( $row2_logos as $index => $logo ) : ?>
							<div class="bi-client-logo-wall__cell">
								<div class="bi-client-logo-wall__item" tabindex="-1">
									<img
										class="bi-client-logo-wall__img"
										src="<?php echo esc_url( $logo['image'] ); ?>"
										alt=""
										loading="lazy"
										decoding="async"
									/>
								</div>
								<div class="bi-client-logo-wall__cell-accent" aria-hidden="true"></div>
							</div>
						<?php endforeach; ?>
					</div>
				</div>
			</div>

		</div>

	</div>
</section>
