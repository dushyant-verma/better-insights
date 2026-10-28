<?php
/**
 * Homepage Template Part: Platforms & Technologies Section
 *
 * Structural Reference: Valtech India (https://www.valtech.com/en-in/)
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$solutions_url = home_url( '/solutions/' );

$partners = array(
	array(
		'id'   => 'adobe',
		'name' => 'Adobe',
		'url'  => $solutions_url,
		'svg'  => '<svg viewBox="0 0 160 36" height="32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Adobe"><path d="M0 0h24.8v36H0V0zm9.4 6.7L2.9 29.3h5.4l2.1-5.7h6.4l1.3 5.7h5.1L15.5 6.7H9.4zm1.5 5.5l2.2 9.5h-4.3l2.1-9.5z"/><path d="M38.8 14.8c0-4.6 3.4-8.3 8.3-8.3s8.3 3.7 8.3 8.3v14.5h-4.6v-2.8c-1.3 2.1-3.6 3.3-6.1 3.3-4.3 0-7.6-3.2-7.6-7.5 0-4.5 3.5-7.3 9.4-7.3h4.3v-.6c0-2.4-1.7-4.1-4.2-4.1-2.3 0-3.9 1.2-4.4 3.1l-4.3-0.9zm12.3 8.1v-2.8h-3.7c-3.4 0-5.2 1.4-5.2 3.8 0 2 1.6 3.6 3.9 3.6 3 0 5-2 5-4.6zm8.8-16.2h4.6v9.4c1.2-1.9 3.4-3.1 5.9-3.1 4.5 0 7.8 3.6 7.8 8.1 0 4.6-3.3 8.2-7.8 8.2-2.5 0-4.7-1.2-5.9-3.1v2.7h-4.6V6.7zm4.6 14.5c0 2.8 2.1 4.9 4.9 4.9 2.8 0 4.9-2.1 4.9-4.9s-2.1-4.9-4.9-4.9c-2.8 0-4.9 2.1-4.9 4.9zm18.3-6.4c0-4.7 3.5-8.3 8.2-8.3 4.7 0 8.2 3.6 8.2 8.3 0 4.7-3.5 8.3-8.2 8.3-4.7 0-8.2-3.6-8.2-8.3zm11.8 0c0-2.5-1.6-4.5-3.6-4.5s-3.6 2-3.6 4.5 1.6 4.5 3.6 4.5 3.6-2 3.6-4.5zm8.4 6.4c0-4.7 3.4-8.3 8.1-8.3 2.5 0 4.6 1.1 5.8 3.1V6.7h4.6v22.6h-4.6v-2.8c-1.2 1.9-3.3 3.1-5.8 3.1-4.7 0-8.1-3.6-8.1-8.3zm4.6 0c0 2.8 2 4.9 4.8 4.9s4.8-2.1 4.8-4.9-2-4.9-4.8-4.9-4.8 2.1-4.8 4.9zm21.4-1.2c.4 3 2.8 4.8 6.1 4.8 2.6 0 4.6-1.1 5.3-2.9l4.1 1.2c-1.4 3.6-5.1 5.6-9.5 5.6-6.1 0-10.2-4.1-10.2-9.8 0-5.7 4.1-9.7 10-9.7 6.1 0 9.7 4.2 9.4 10.8h-15.2zm10.7-3.4c-.3-2.5-2.2-4.1-4.9-4.1-2.7 0-4.7 1.6-5.2 4.1h10.1z"/></svg>',
	),
	array(
		'id'   => 'google-cloud',
		'name' => 'Google Cloud',
		'url'  => $solutions_url,
		'svg'  => '<svg viewBox="0 0 200 36" height="32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Google Cloud"><path d="M19.4 14.1c0-.9-.1-1.7-.2-2.5H10v4.7h5.3c-.2 1.3-1 2.4-2.1 3.1v2.6h3.4c2-1.8 3.2-4.6 3.2-7.9z"/><path d="M10 23.7c3.7 0 6.8-1.2 9-3.3l-3.4-2.6c-1.2.8-2.8 1.3-5.6 1.3-3.3 0-6.1-2.2-7.1-5.2H.4v2.7C2.6 20.9 6 23.7 10 23.7z"/><path d="M2.9 13.9c-.3-.8-.4-1.6-.4-2.5s.1-1.7.4-2.5V6.2H.4C-.4 7.9-.8 9.9-.8 11.4s.4 3.5 1.2 5.2l2.3-2.7z"/><path d="M10 3.8c2 0 3.8.7 5.2 2l3.9-3.9C16.8.6 13.7-.6 10-.6 6-.6 2.6 2.2.4 6.2l3.5 2.7c1-3 3.8-5.1 7.1-5.1z"/><text x="32" y="24" font-family="\'Noto Sans\', \'Google Sans\', sans-serif" font-weight="600" font-size="20" fill="currentColor" letter-spacing="-0.02em">Google Cloud</text></svg>',
	),
	array(
		'id'   => 'microsoft',
		'name' => 'Microsoft',
		'url'  => $solutions_url,
		'svg'  => '<svg viewBox="0 0 170 36" height="32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Microsoft"><rect x="0" y="4" width="12" height="12" fill="currentColor"/><rect x="14" y="4" width="12" height="12" fill="currentColor"/><rect x="0" y="18" width="12" height="12" fill="currentColor"/><rect x="14" y="18" width="12" height="12" fill="currentColor"/><text x="36" y="24" font-family="\'Noto Sans\', \'Segoe UI\', sans-serif" font-weight="600" font-size="21" fill="currentColor" letter-spacing="-0.02em">Microsoft</text></svg>',
	),
	array(
		'id'   => 'hubspot',
		'name' => 'HubSpot',
		'url'  => $solutions_url,
		'svg'  => '<svg viewBox="0 0 160 36" height="32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="HubSpot"><g fill="currentColor"><path d="M17.8 11.5v3.4c1.2-.7 2.6-1.1 4.1-1.1 4.6 0 8.3 3.7 8.3 8.3s-3.7 8.3-8.3 8.3c-2.9 0-5.5-1.5-6.9-3.8l-8.4 5.3c.4 1 1 1.9 1.7 2.6 3.1 3.1 8.2 3.1 11.3 0 3.1-3.1 3.1-8.2 0-11.3-.8-.8-1.7-1.4-2.7-1.8v-3.7c3.9.7 7 3.8 7.5 7.8 3.5 1.1 6 4.3 6 8.2 0 4.7-3.8 8.5-8.5 8.5-2.8 0-5.3-1.4-6.8-3.5-3.3 2.1-7.7 1.8-10.7-1.2-3.6-3.6-3.6-9.4 0-13 1.9-1.9 4.4-2.7 6.9-2.5v-3.5h3.4zM21.9 17c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"/><text x="40" y="24" font-family="\'Noto Sans\', sans-serif" font-weight="700" font-size="22" letter-spacing="-0.03em">HubSpot</text></g></svg>',
	),
	array(
		'id'   => 'salesforce',
		'name' => 'Salesforce',
		'url'  => $solutions_url,
		'svg'  => '<svg viewBox="0 0 170 36" height="32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Salesforce"><g fill="currentColor"><path d="M18.8 8.6c1.6-2.1 4.1-3.4 6.9-3.4 3.7 0 6.8 2.3 8 5.6 1.2-.6 2.6-.9 4.1-.9 4.8 0 8.7 3.9 8.7 8.7 0 .5-.1 1-.2 1.5 2.1 1.3 3.5 3.7 3.5 6.4 0 4.1-3.3 7.5-7.5 7.5h-29C5.9 34 0 28.1 0 20.8c0-6.6 4.9-12.1 11.3-13 1.9-4.8 6.5-8.2 12-8.2 4.1 0 7.8 1.9 10.1 4.9-1.5 1.1-2.7 2.6-3.6 4.1h-1z"/><text x="52" y="24" font-family="\'Noto Sans\', sans-serif" font-weight="700" font-size="19" letter-spacing="-0.02em">salesforce</text></g></svg>',
	),
	array(
		'id'   => 'shopify',
		'name' => 'Shopify',
		'url'  => $solutions_url,
		'svg'  => '<svg viewBox="0 0 150 36" height="32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Shopify"><g fill="currentColor"><path d="M22.5 3.5c-.3 0-.6.2-.7.5l-2.4 5.9h-5.8c-1.2 0-2.1.8-2.3 2L8 29.5c-.2 1.3.8 2.5 2.1 2.5h16.8c1.3 0 2.3-1.2 2.1-2.5L25.8 12c-.2-1.2-1.1-2-2.3-2h-2.1l-1.3-3.2c-.2-.4-.5-.6-.9-.6zm-1.8 6.4l1.3-3.3 1.3 3.3h-2.6z"/><text x="36" y="24" font-family="\'Noto Sans\', sans-serif" font-weight="700" font-size="22" letter-spacing="-0.03em">shopify</text></g></svg>',
	),
	array(
		'id'   => 'zoho',
		'name' => 'Zoho',
		'url'  => $solutions_url,
		'svg'  => '<svg viewBox="0 0 140 36" height="32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Zoho"><g fill="currentColor"><rect x="0" y="6" width="22" height="22" rx="3" stroke="currentColor" stroke-width="3" fill="none"/><text x="5" y="23" font-family="\'Noto Sans\', sans-serif" font-weight="800" font-size="17">Z</text><rect x="26" y="6" width="22" height="22" rx="3" stroke="currentColor" stroke-width="3" fill="none"/><text x="31" y="23" font-family="\'Noto Sans\', sans-serif" font-weight="800" font-size="17">O</text><rect x="52" y="6" width="22" height="22" rx="3" stroke="currentColor" stroke-width="3" fill="none"/><text x="57" y="23" font-family="\'Noto Sans\', sans-serif" font-weight="800" font-size="17">H</text><rect x="78" y="6" width="22" height="22" rx="3" stroke="currentColor" stroke-width="3" fill="none"/><text x="83" y="23" font-family="\'Noto Sans\', sans-serif" font-weight="800" font-size="17">O</text></g></svg>',
	),
	array(
		'id'   => 'openai',
		'name' => 'OpenAI',
		'url'  => $solutions_url,
		'svg'  => '<svg viewBox="0 0 160 36" height="32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="OpenAI"><g fill="currentColor"><path d="M28.5 16.5c-.4-2.8-2.2-5.1-4.8-6.1l-6.2-2.5c-.8-.3-1.7-.5-2.6-.5-3.6 0-6.8 2.2-8 5.6L5.3 17c-2.4 1.4-3.7 4.1-3.2 6.9.5 2.8 2.6 5 5.4 5.6l6.2 1.3c.9.2 1.8.2 2.7 0 3.6-.6 6.5-3.3 7.2-6.9l.6-3.1c1.5 1.5 3.8 2.1 5.9 1.4 2.8-.9 4.7-3.5 4.5-6.5zm-14.7 9.8c-1.9.4-3.8-.7-4.3-2.6-.4-1.9.7-3.8 2.6-4.3l5.3-1.1c.4 1.9-.7 3.8-2.6 4.3l-1 3.7z"/><text x="36" y="24" font-family="\'Noto Sans\', sans-serif" font-weight="600" font-size="21" letter-spacing="-0.02em">OpenAI</text></g></svg>',
	),
);
?>

<section class="bi-partners-section bi-theme--dark" data-theme="dark" aria-label="<?php esc_attr_e( 'Platforms & Technologies', 'astra-child' ); ?>">
	<div class="bi-partners-container bi-container">
		
		<!-- Section Header & Intro -->
		<div class="bi-partners-header">
			<div class="bi-partners-header__left">
				<span class="bi-partners-header__label"><?php esc_html_e( 'PLATFORMS & TECHNOLOGIES', 'astra-child' ); ?></span>
				<h2 class="bi-partners-header__title"><?php esc_html_e( 'Platforms & technologies', 'astra-child' ); ?></h2>
				<p class="bi-partners-header__desc">
					<?php esc_html_e( 'We leverage leading enterprise platforms and modern technologies to build smarter, scalable digital experiences.', 'astra-child' ); ?>
				</p>
			</div>
			<div class="bi-partners-header__right">
				<a href="<?php echo esc_url( $solutions_url ); ?>" class="bi-partners-header__link">
					<span><?php esc_html_e( 'View All Platforms', 'astra-child' ); ?></span>
					<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<line x1="7" y1="17" x2="17" y2="7"></line>
						<polyline points="7 7 17 7 17 17"></polyline>
					</svg>
				</a>
			</div>
		</div>

		<!-- Partner / Technology Logos Grid -->
		<div class="bi-partners-grid">
			<?php foreach ( $partners as $partner ) : ?>
				<a
					href="<?php echo esc_url( $partner['url'] ); ?>"
					class="bi-partner-item"
					aria-label="<?php echo esc_attr( sprintf( __( 'Learn more about our %s technology integrations', 'astra-child' ), $partner['name'] ) ); ?>"
				>
					<div class="bi-partner-item__logo-wrap">
						<?php echo $partner['svg']; ?>
					</div>
					<!-- Better Insights Blue Underline Accent -->
					<span class="bi-partner-item__underline" aria-hidden="true"></span>
				</a>
			<?php endforeach; ?>
		</div>

	</div>
</section>
