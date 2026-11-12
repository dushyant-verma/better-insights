# Omaxe Jankipuram – WordPress Landing Theme

## Install
1. Copy `omaxe-hero-desktop.png` and `omaxe-hero-mobile.png` into `assets/images/`.
2. Zip the `omaxe-jankipuram` folder (folder at the root of the zip).
3. WordPress → Appearance → Themes → Add New → Upload Theme → Activate.

## Show the landing page
- Option A: Settings → Reading → "Your homepage displays" → *Your latest posts* (uses `front-page.php`), OR
- Option B: Create a Page → Template → **Omaxe Landing Page**, then set it as the static homepage.

## Leads
- Every submission is stored under **Leads** in wp-admin (with UTM / gclid data) and emailed to the notification address.
- Set the notification email: Appearance → Customize → Lead Notifications (defaults to Site admin email).
- Export all leads: Leads → *Export all leads (CSV)*.
- CRM/webhook hook: `add_action( 'omaxe_lead_created', function( $post_id, $meta ) { /* send to CRM */ }, 10, 2 );`

## Spam protection included
Nonce, hidden honeypot, server-side validation, 5 submissions/hour/IP limit.
If you use a full-page cache (WP Rocket, LiteSpeed, etc.), exclude this page from caching or the nonce may expire.

## Before going live
- Replace the text logo with the authorised brand logo.
- Replace the floor-plan placeholder with approved plans.
- Verify project details, pricing, amenities, RERA/approvals and the "12% P.A." offer wording.
- Add privacy policy link, analytics/CRM tags.
