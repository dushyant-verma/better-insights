<?php
/**
 * Template Name: Omaxe Jankipuram Landing Page
 * Description: High-conversion lead-generation landing page (HTML + CSS + JS in one file).
 *
 * INSTALL
 * 1. Upload this file to  /wp-content/themes/YOUR-THEME/  (child theme recommended).
 * 2. Create a folder  /wp-content/themes/YOUR-THEME/omaxe-assets/  and add:
 *    logo.png, hero.jpg, about.jpg, floor-1.jpg, floor-2.jpg, cost-sheet.jpg
 * 3. WordPress > Pages > Add New > Page Attributes > Template > "Omaxe Jankipuram Landing Page" > Publish.
 * 4. Edit the CONFIG block below (phone, WhatsApp, lead e-mail, brochure link).
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

/* ------------------------------------------------------------------ */
/* CONFIG - edit these values                                          */
/* ------------------------------------------------------------------ */
$cfg = array(
	'project'      => 'Omaxe Jankipuram',
	'city'         => 'Lucknow',
	'phone'        => '+91 90000 00000',          // shown on page
	'phone_raw'    => '+919000000000',            // used in tel: link
	'whatsapp'     => '919000000000',             // country code + number, no +
	'lead_email'   => get_option( 'admin_email' ),// where enquiries are sent
	'brochure_url' => '#enquire',                 // paste PDF URL here to link directly
	'assets'       => get_stylesheet_directory_uri() . '/omaxe-assets/',
	'thankyou_url' => '',                         // optional: redirect after submit
);

/* ------------------------------------------------------------------ */
/* LEAD FORM HANDLER (posts back to this same page, returns JSON)       */
/* ------------------------------------------------------------------ */
if ( 'POST' === $_SERVER['REQUEST_METHOD'] && isset( $_POST['omx_lead'] ) ) {
	header( 'Content-Type: application/json; charset=utf-8' );

	// Honeypot: bots fill the hidden field.
	if ( ! empty( $_POST['company_site'] ) ) {
		echo wp_json_encode( array( 'ok' => true ) );
		exit;
	}

	// Simple rate limit: 5 submissions / hour / IP.
	$ip_key = 'omx_rl_' . md5( isset( $_SERVER['REMOTE_ADDR'] ) ? $_SERVER['REMOTE_ADDR'] : 'x' );
	$count  = (int) get_transient( $ip_key );
	if ( $count >= 5 ) {
		echo wp_json_encode( array( 'ok' => false, 'msg' => 'Too many requests. Please call us instead.' ) );
		exit;
	}

	$name     = sanitize_text_field( wp_unslash( $_POST['name'] ?? '' ) );
	$phone    = preg_replace( '/[^0-9]/', '', wp_unslash( $_POST['phone'] ?? '' ) );
	$email    = sanitize_email( wp_unslash( $_POST['email'] ?? '' ) );
	$interest = sanitize_text_field( wp_unslash( $_POST['interest'] ?? '' ) );
	$source   = sanitize_text_field( wp_unslash( $_POST['source'] ?? '' ) );
	$utm      = array();
	foreach ( array( 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid' ) as $k ) {
		$utm[ $k ] = sanitize_text_field( wp_unslash( $_POST[ $k ] ?? '' ) );
	}

	// Accept +91 / 0 prefixes, require valid Indian mobile.
	$phone = preg_replace( '/^(91|0)/', '', $phone );
	if ( strlen( $name ) < 2 ) {
		echo wp_json_encode( array( 'ok' => false, 'msg' => 'Please enter your full name.' ) );
		exit;
	}
	if ( ! preg_match( '/^[6-9][0-9]{9}$/', $phone ) ) {
		echo wp_json_encode( array( 'ok' => false, 'msg' => 'Enter a valid 10-digit mobile number.' ) );
		exit;
	}
	if ( $email && ! is_email( $email ) ) {
		echo wp_json_encode( array( 'ok' => false, 'msg' => 'Enter a valid email address or leave it blank.' ) );
		exit;
	}

	set_transient( $ip_key, $count + 1, HOUR_IN_SECONDS );

	$body  = "New enquiry - {$cfg['project']}\n\n";
	$body .= "Name: {$name}\nMobile: +91 {$phone}\nEmail: " . ( $email ? $email : '-' ) . "\n";
	$body .= "Interested in: " . ( $interest ? $interest : '-' ) . "\nForm: {$source}\n\n";
	foreach ( $utm as $k => $v ) {
		if ( $v ) { $body .= "{$k}: {$v}\n"; }
	}
	$body .= "\nTime: " . current_time( 'mysql' ) . "\n";

	$headers = array( 'Content-Type: text/plain; charset=UTF-8' );
	if ( $email ) { $headers[] = 'Reply-To: ' . $name . ' <' . $email . '>'; }

	$sent = wp_mail( $cfg['lead_email'], "New lead: {$name} ({$cfg['project']})", $body, $headers );

	// Hook for CRM / Google Sheets / webhook integrations.
	do_action( 'omx_lead_received', compact( 'name', 'phone', 'email', 'interest', 'source', 'utm' ) );

	echo wp_json_encode( array(
		'ok'       => (bool) $sent,
		'msg'      => $sent ? '' : 'Could not send. Please call us directly.',
		'redirect' => $cfg['thankyou_url'],
	) );
	exit;
}

$a = $cfg['assets'];
$tel = 'tel:' . $cfg['phone_raw'];
$wa  = 'https://wa.me/' . $cfg['whatsapp'] . '?text=' . rawurlencode( 'Hi, I am interested in ' . $cfg['project'] . ', ' . $cfg['city'] . '. Please share details.' );

/* Reusable lead form */
function omx_form( $id, $source, $btn = 'Get Price & Brochure', $compact = false ) { ?>
	<form class="lead-form" data-source="<?php echo esc_attr( $source ); ?>" novalidate id="<?php echo esc_attr( $id ); ?>">
		<input type="hidden" name="omx_lead" value="1">
		<input type="hidden" name="source" value="<?php echo esc_attr( $source ); ?>">
		<input type="text" name="company_site" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
		<?php foreach ( array( 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid' ) as $k ) : ?>
			<input type="hidden" name="<?php echo esc_attr( $k ); ?>" value="">
		<?php endforeach; ?>
		<label>Full name
			<input type="text" name="name" autocomplete="name" required placeholder="Your name">
		</label>
		<label>Mobile number
			<input type="tel" name="phone" inputmode="numeric" autocomplete="tel-national" maxlength="14" required placeholder="10-digit mobile">
		</label>
		<?php if ( ! $compact ) : ?>
		<label>Email <span class="opt">(optional)</span>
			<input type="email" name="email" autocomplete="email" placeholder="you@example.com">
		</label>
		<?php endif; ?>
		<label>I am looking for
			<select name="interest">
				<option>Retail shop</option>
				<option>Studio apartment</option>
				<option>Showroom</option>
				<option>Office space</option>
				<option>Food outlet</option>
			</select>
		</label>
		<p class="form-msg" role="alert" aria-live="polite"></p>
		<button type="submit" class="btn btn-primary btn-block"><?php echo esc_html( $btn ); ?></button>
		<p class="fine">By submitting, you agree to be contacted by call, WhatsApp or e-mail about this project.</p>
	</form>
<?php }

$connect = array(
	array( 'Jankipuram Metro Station', '5 min' ),
	array( 'Lucknow Ring Road', '5 min' ),
	array( 'Kanpur-Lucknow Highway', '2 min' ),
	array( 'KGMU Lucknow', '10 min' ),
	array( 'Phoenix United Mall', '10 min' ),
	array( 'Charbagh Railway Station', '12 min' ),
	array( 'SGPGI Hospital', '20 min' ),
	array( 'Shaheed Path', '20 min' ),
);
$amen = array( 'Star Gazing Area', 'Anchor Place', 'Restaurants', 'High Speed Elevators', 'Business Centre', 'Car Parking', 'Food Courts', 'CCTV Surveillance' );
$faqs = array(
	array( 'Where is the Omaxe Jankipuram commercial project located?', 'Omaxe Jankipuram is in Jankipuram, Lucknow, about 2 minutes from the Kanpur-Lucknow Highway and 5 minutes from Jankipuram Metro Station and the Lucknow Ring Road.' ),
	array( 'What is the price of a commercial shop in Omaxe Jankipuram?', 'Pricing depends on floor, size and payment plan. Submit the enquiry form and our team will share the current price list and payment schedule.' ),
	array( 'Is Omaxe Jankipuram a good investment option?', 'The project sits within an established residential catchment with metro, ring road and highway access, which supports footfall for retail and services. Please evaluate it against your own goals and speak to our team for the full picture.' ),
	array( 'Can I download the Omaxe Jankipuram brochure?', 'Yes. Use any "Download Brochure" button, share your name and mobile number, and we will send it to you.' ),
	array( 'How can I book a commercial space in Omaxe Jankipuram?', 'Send an enquiry, our executive will call you to shortlist units, explain the payment plan and arrange a site visit.' ),
	array( 'What are the advantages of investing in Omaxe Jankipuram?', 'Metro and highway connectivity, a surrounding residential catchment, anchor and food-court spaces, and a mix of retail shops and studio apartments in one development.' ),
	array( 'What are the core amenities of Omaxe Centre Point Jankipuram?', 'Star gazing area, anchor place, restaurants, high-speed elevators, business centre, car parking, food courts and CCTV surveillance.' ),
	array( 'Is the project commercial or residential?', 'It is a commercial project offering retail shops, with studio apartments also available. Ask our team for current availability.' ),
);
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Omaxe Jankipuram Lucknow | Retail Shops &amp; Studio Apartments | Price &amp; Brochure</title>
<meta name="description" content="Omaxe Jankipuram, Lucknow: commercial shops and studio apartments 5 minutes from Jankipuram Metro and the Ring Road. Get price list, floor plans and brochure.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
:root{
	--ink:#14162b; --indigo:#1d2160; --violet:#6a2c91; --blue:#2447b8;
	--gold:#c9a24b; --mist:#f4f5fa; --line:#dfe2ee; --white:#fff; --ok:#14804a; --err:#b3261e;
	--grad:linear-gradient(100deg,var(--violet),var(--blue));
	--head:'Bricolage Grotesque',system-ui,sans-serif; --body:'Instrument Sans',system-ui,sans-serif;
	--wrap:1180px;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:76px}
body{margin:0;font:400 17px/1.6 var(--body);color:var(--ink);background:var(--white);-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}
a{color:inherit}
h1,h2,h3{font-family:var(--head);line-height:1.12;margin:0 0 .5em;letter-spacing:-.01em}
h1{font-size:clamp(2.1rem,5vw,3.6rem);font-weight:800}
h2{font-size:clamp(1.65rem,3.2vw,2.5rem);font-weight:700}
h3{font-size:1.2rem;font-weight:700}
p{margin:0 0 1em}
.wrap{max-width:var(--wrap);margin:0 auto;padding:0 20px}
section{padding:72px 0}
.sec-head{max-width:640px;margin-bottom:36px}
.sec-head p{color:#4b4f6b}
:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
.hp{position:absolute!important;left:-9999px;opacity:0;height:0;width:0}

/* Buttons */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font:600 1rem var(--body);padding:13px 24px;border-radius:8px;border:2px solid transparent;cursor:pointer;text-decoration:none;transition:transform .15s,box-shadow .15s,background .15s}
.btn:hover{transform:translateY(-1px)}
.btn-primary{background:var(--grad);color:#fff;box-shadow:0 6px 18px rgba(60,40,150,.28)}
.btn-ghost{border-color:currentColor;background:transparent}
.btn-gold{background:var(--gold);color:var(--ink)}
.btn-sm{padding:9px 16px;font-size:.92rem}
.btn-block{width:100%}

/* Header */
.site-head{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.96);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.site-head .wrap{display:flex;align-items:center;gap:24px;height:68px}
.logo{display:flex;align-items:center;gap:10px;font:800 1.3rem var(--head);text-decoration:none;color:var(--indigo)}
.logo img{height:40px;width:auto}
.nav{margin-left:auto;display:flex;gap:26px}
.nav a{text-decoration:none;font-weight:500;font-size:.95rem}
.nav a:hover{color:var(--violet)}
.head-cta{display:flex;gap:10px;align-items:center}
.head-phone{font-weight:600;text-decoration:none;white-space:nowrap}
.burger{display:none;background:none;border:0;font-size:1.7rem;cursor:pointer;margin-left:auto}

/* Hero */
.hero{padding:0;background:var(--indigo);color:#fff;position:relative;overflow:hidden}
.hero-bg{position:absolute;inset:0;background:var(--indigo) center/cover no-repeat}
.hero-bg img{width:100%;height:100%;object-fit:cover;opacity:.42}
.hero::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(20,22,60,.92) 25%,rgba(20,22,60,.35))}
.hero .wrap{position:relative;z-index:2;display:grid;grid-template-columns:1.15fr .85fr;gap:48px;align-items:center;padding-top:64px;padding-bottom:64px}
.hero p.lead{font-size:1.15rem;max-width:520px;color:#e6e8f8}
.hero-points{list-style:none;padding:0;margin:24px 0 30px;display:grid;gap:10px}
.hero-points li{padding-left:28px;position:relative}
.hero-points li::before{content:"";position:absolute;left:0;top:.45em;width:14px;height:8px;border-left:3px solid var(--gold);border-bottom:3px solid var(--gold);transform:rotate(-45deg)}
.hero-actions{display:flex;flex-wrap:wrap;gap:12px}
.hero-actions .btn-ghost{color:#fff}
.form-card{background:#fff;color:var(--ink);border-radius:14px;padding:28px;box-shadow:0 24px 60px rgba(0,0,0,.35);border-top:5px solid var(--gold)}
.form-card h2{font-size:1.5rem;margin-bottom:4px}
.form-card .sub{color:#555a78;font-size:.95rem;margin-bottom:16px}

/* Form */
.lead-form{display:grid;gap:12px}
.lead-form label{display:grid;gap:5px;font-weight:600;font-size:.88rem}
.lead-form .opt{font-weight:400;color:#7a7f9c}
.lead-form input,.lead-form select{font:400 1rem var(--body);padding:12px 13px;border:1.5px solid var(--line);border-radius:8px;background:#fff;color:var(--ink);width:100%}
.lead-form input:focus,.lead-form select:focus{border-color:var(--violet);outline:none;box-shadow:0 0 0 3px rgba(106,44,145,.18)}
.lead-form .invalid{border-color:var(--err)}
.form-msg{min-height:1.2em;margin:0;font-size:.9rem;color:var(--err)}
.form-msg.ok{color:var(--ok);font-weight:600}
.fine{font-size:.76rem;color:#767b97;margin:0}
.lead-form button[disabled]{opacity:.6;cursor:wait}

/* Trust bar */
.trust{padding:0;background:var(--mist);border-bottom:1px solid var(--line)}
.trust .wrap{display:grid;grid-template-columns:repeat(4,1fr)}
.trust div{padding:22px 16px;border-left:1px solid var(--line);text-align:center}
.trust div:first-child{border-left:0}
.trust strong{display:block;font:800 1.7rem var(--head);color:var(--indigo)}
.trust span{font-size:.9rem;color:#4b4f6b}

/* About */
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.about-img{border-radius:14px;overflow:hidden;background:var(--mist);aspect-ratio:4/3}
.about-img img{width:100%;height:100%;object-fit:cover}
.about-more{display:none}
.about-more.open{display:block}
.link-btn{background:none;border:0;padding:0;font:600 1rem var(--body);color:var(--violet);cursor:pointer;text-decoration:underline}

/* Connectivity */
.band{background:var(--mist)}
.conn{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid var(--line);background:#fff;border-radius:12px;overflow:hidden}
.conn div{padding:24px 18px;border-right:1px solid var(--line);border-bottom:1px solid var(--line)}
.conn div:nth-child(4n){border-right:0}
.conn div:nth-last-child(-n+4){border-bottom:0}
.conn b{display:block;font:800 1.9rem var(--head);color:var(--violet);line-height:1}
.conn span{display:block;margin-top:6px;font-size:.95rem;font-weight:500}
.note{margin-top:18px;color:#4b4f6b}

/* Amenities */
.amen{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.amen li{padding:20px;border-radius:12px;background:var(--mist);border-left:4px solid var(--gold);font-weight:600}

/* Location */
.loc-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:40px;align-items:stretch}
.loc-list{list-style:none;padding:0;margin:0 0 24px}
.loc-list li{display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-bottom:1px solid var(--line)}
.loc-list b{color:var(--violet)}
.map{min-height:360px;border-radius:14px;overflow:hidden;border:1px solid var(--line)}
.map iframe{width:100%;height:100%;min-height:360px;border:0}

/* Floor plans */
.plans{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.plan{border:1px solid var(--line);border-radius:14px;padding:16px;background:#fff;text-align:center}
.plan .ph{aspect-ratio:4/3;background:var(--mist);border-radius:8px;overflow:hidden;display:grid;place-items:center}
.plan img{width:100%;height:100%;object-fit:contain;filter:blur(5px);transition:filter .3s}
.plan:hover img{filter:blur(3px)}
.plan p{margin:12px 0 10px;font-weight:600}
.center{text-align:center;margin-top:30px}

/* Price */
.price-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:36px;align-items:start}
.cost{border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--mist)}
.cost img{width:100%;filter:blur(3px)}
.cost figcaption{padding:12px;text-align:center;font-weight:600;background:#fff}
table.price{width:100%;border-collapse:collapse;border:1px solid var(--line);border-radius:12px;overflow:hidden}
table.price th,table.price td{padding:16px 14px;text-align:center;border-bottom:1px solid var(--line)}
table.price th{background:var(--indigo);color:#fff;font-weight:600}
table.price td:first-child{text-align:left;font-weight:600}
table.price tr:last-child td{border-bottom:0}

/* FAQ */
.faq{max-width:820px}
.faq details{border-bottom:1px solid var(--line)}
.faq summary{cursor:pointer;padding:18px 36px 18px 0;font-weight:600;list-style:none;position:relative}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";position:absolute;right:6px;top:50%;transform:translateY(-50%);font-size:1.5rem;color:var(--violet);transition:transform .2s}
.faq details[open] summary::after{transform:translateY(-50%) rotate(45deg)}
.faq details p{padding:0 36px 18px 0;color:#4b4f6b;margin:0}

/* Developer + CTA */
.dev p{max-width:820px}
.cta{background:var(--indigo);color:#fff}
.cta .wrap{display:grid;grid-template-columns:1fr 420px;gap:48px;align-items:center}
.cta p{color:#dfe2f6}

/* Footer */
.foot{background:#0d0f26;color:#aeb2d1;font-size:.82rem;padding:28px 0 96px}
.foot p{margin:0 0 10px;max-width:980px}

/* Floating actions */
.float{position:fixed;right:18px;bottom:92px;z-index:60;display:grid;gap:10px}
.float a{width:52px;height:52px;border-radius:50%;display:grid;place-items:center;color:#fff;font-weight:700;text-decoration:none;box-shadow:0 8px 20px rgba(0,0,0,.28)}
.float .wa{background:#1fa855}
.mbar{display:none}

/* Modal */
.modal{position:fixed;inset:0;z-index:100;background:rgba(10,12,35,.7);display:none;align-items:center;justify-content:center;padding:18px}
.modal.open{display:flex}
.modal-box{background:#fff;color:var(--ink);border-radius:14px;padding:28px;width:100%;max-width:420px;position:relative;max-height:92vh;overflow:auto;border-top:5px solid var(--gold)}
.modal-close{position:absolute;right:12px;top:8px;background:none;border:0;font-size:2rem;cursor:pointer;line-height:1}

/* Responsive */
@media(max-width:960px){
	.hero .wrap,.about-grid,.loc-grid,.price-grid,.cta .wrap{grid-template-columns:1fr}
	.hero::after{background:rgba(20,22,60,.8)}
	.conn,.amen{grid-template-columns:repeat(2,1fr)}
	.conn div{border-right:1px solid var(--line)!important;border-bottom:1px solid var(--line)!important}
	.conn div:nth-child(2n){border-right:0!important}
	.trust .wrap{grid-template-columns:repeat(2,1fr)}
	.trust div:nth-child(3){border-left:0}
	.nav{position:absolute;top:68px;left:0;right:0;background:#fff;flex-direction:column;gap:0;padding:8px 20px 16px;border-bottom:1px solid var(--line);display:none}
	.nav.open{display:flex}
	.nav a{padding:12px 0;border-bottom:1px solid var(--line)}
	.burger{display:block}
	.head-cta{display:none}
}
@media(max-width:640px){
	body{font-size:16px}
	section{padding:52px 0}
	.plans{grid-template-columns:1fr}
	.form-card{padding:22px}
	.float{bottom:84px}
	.mbar{display:grid;grid-template-columns:1fr 1fr;position:fixed;left:0;right:0;bottom:0;z-index:70;background:#fff;border-top:1px solid var(--line);padding:10px;gap:10px;transform:translateY(110%);transition:transform .25s}
	.mbar.show{transform:none}
	table.price th,table.price td{padding:12px 6px;font-size:.85rem}
}
@media(prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}}
body.admin-bar .site-head{top:32px}
</style>
<?php wp_head(); ?>
</head>
<body <?php body_class( 'omx-landing' ); ?>>
<?php if ( function_exists( 'wp_body_open' ) ) { wp_body_open(); } ?>

<!-- HEADER -->
<header class="site-head">
	<div class="wrap">
		<a class="logo" href="#top" aria-label="BeTogether - <?php echo esc_attr( $cfg['project'] ); ?>">
			<img src="<?php echo esc_url( $a . 'logo.png' ); ?>" alt="BeTogether" onerror="this.replaceWith(document.createTextNode('BeTogether'))">
		</a>
		<nav class="nav" id="nav" aria-label="Page sections">
			<a href="#overview">Overview</a>
			<a href="#amenities">Amenities</a>
			<a href="#gallery">Gallery</a>
			<a href="#floor-plan">Floor Plan</a>
			<a href="#location">Location</a>
			<a href="#enquire">Contact us</a>
		</nav>
		<div class="head-cta">
			<a class="head-phone" href="<?php echo esc_url( $tel ); ?>"><?php echo esc_html( $cfg['phone'] ); ?></a>
			<button class="btn btn-primary btn-sm" data-open-modal data-interest="Retail shop" data-title="Download brochure">Download Brochure</button>
		</div>
		<button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="nav">&#9776;</button>
	</div>
</header>

<main id="top">

<!-- HERO -->
<section class="hero">
	<div class="hero-bg"><img src="<?php echo esc_url( $a . 'hero.jpg' ); ?>" alt="" fetchpriority="high" onerror="this.style.display='none'"></div>
	<div class="wrap">
		<div>
			<h1>Retail shops &amp; studio apartments at Omaxe Jankipuram, Lucknow</h1>
			<p class="lead">Open your business 5 minutes from Jankipuram Metro and the Lucknow Ring Road, inside an established residential neighbourhood.</p>
			<ul class="hero-points">
				<li>Shops for retail, showrooms, offices and food outlets</li>
				<li>2 minutes from the Kanpur-Lucknow Highway</li>
				<li>Anchor place, food courts and ample car parking</li>
			</ul>
			<div class="hero-actions">
				<button class="btn btn-gold" data-open-modal data-interest="Retail shop" data-title="Get the price list">Get Price List</button>
				<a class="btn btn-ghost" href="<?php echo esc_url( $tel ); ?>">Call <?php echo esc_html( $cfg['phone'] ); ?></a>
			</div>
		</div>
		<div class="form-card" id="enquire">
			<h2>Get price &amp; brochure</h2>
			<p class="sub">Our executive will call you with current availability and the payment plan.</p>
			<?php omx_form( 'form-hero', 'Hero form' ); ?>
		</div>
	</div>
</section>

<!-- TRUST BAR -->
<div class="trust">
	<div class="wrap">
		<div><strong>1989</strong><span>Omaxe Group established</span></div>
		<div><strong>5 min</strong><span>to Jankipuram Metro</span></div>
		<div><strong>2 min</strong><span>to Kanpur-Lucknow Highway</span></div>
		<div><strong>8</strong><span>amenities on site</span></div>
	</div>
</div>

<!-- OVERVIEW -->
<section id="overview">
	<div class="wrap about-grid">
		<div>
			<h2>A commercial address in a growing neighbourhood</h2>
			<p>Developing Jankipuram, Omaxe Jankipuram gives you the chance to set up your business in a location with strong residential catchment and growing commercial potential.</p>
			<p>Designed for modern business requirements, it offers well-planned commercial spaces suited to retail outlets, showrooms, offices, food outlets and other business ventures.</p>
			<div class="about-more" id="about-more">
				<p>The surrounding residential development can create opportunities for retailers, service providers, restaurants and other commercial businesses by providing access to a potential customer base.</p>
			</div>
			<button class="link-btn" id="about-toggle" aria-expanded="false" aria-controls="about-more">Read more</button>
		</div>
		<div class="about-img" id="gallery">
			<img src="<?php echo esc_url( $a . 'about.jpg' ); ?>" alt="Omaxe Jankipuram evening view" loading="lazy" onerror="this.style.display='none'">
		</div>
	</div>
</section>

<!-- CONNECTIVITY -->
<section class="band" id="highlights">
	<div class="wrap">
		<div class="sec-head">
			<h2>Omaxe Jankipuram highlights</h2>
			<p>Travel times to the places your customers and staff use every day.</p>
		</div>
		<div class="conn">
			<?php foreach ( $connect as $c ) : ?>
				<div><b><?php echo esc_html( $c[1] ); ?></b><span><?php echo esc_html( $c[0] ); ?></span></div>
			<?php endforeach; ?>
		</div>
		<p class="note">The surrounding residential development can create opportunities for retailers, service providers, restaurants and other commercial businesses by providing access to a potential customer base.</p>
		<div class="center"><button class="btn btn-primary" data-open-modal data-interest="Retail shop" data-title="Check availability">Check Availability</button></div>
	</div>
</section>

<!-- AMENITIES -->
<section id="amenities">
	<div class="wrap">
		<div class="sec-head"><h2>Omaxe Jankipuram amenities</h2></div>
		<ul class="amen">
			<?php foreach ( $amen as $m ) : ?><li><?php echo esc_html( $m ); ?></li><?php endforeach; ?>
		</ul>
	</div>
</section>

<!-- LOCATION -->
<section class="band" id="location">
	<div class="wrap">
		<div class="sec-head"><h2>Location advantage of Omaxe Jankipuram, Lucknow</h2></div>
		<div class="loc-grid">
			<div>
				<ul class="loc-list">
					<?php foreach ( $connect as $c ) : ?>
						<li><span><?php echo esc_html( $c[0] ); ?></span><b><?php echo esc_html( $c[1] ); ?></b></li>
					<?php endforeach; ?>
				</ul>
				<button class="btn btn-primary" data-open-modal data-interest="Retail shop" data-title="Book a site visit">Book a Site Visit</button>
			</div>
			<div class="map">
				<iframe title="Map of Jankipuram, Lucknow" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
					src="https://www.google.com/maps?q=Jankipuram+Colony+Road,+Lucknow&amp;output=embed"></iframe>
			</div>
		</div>
	</div>
</section>

<!-- FLOOR PLAN -->
<section id="floor-plan">
	<div class="wrap">
		<div class="sec-head">
			<h2>Floor plan of Omaxe Jankipuram, Lucknow</h2>
			<p>Share your details to receive the full-resolution plans.</p>
		</div>
		<div class="plans">
			<div class="plan"><div class="ph"><img src="<?php echo esc_url( $a . 'floor-1.jpg' ); ?>" alt="Floor plan option 1 (preview)" loading="lazy" onerror="this.style.display='none'"></div>
				<p>Studio apartment plan</p>
				<button class="btn btn-ghost btn-sm" data-open-modal data-interest="Studio apartment" data-title="Get the floor plan">Get full plan</button></div>
			<div class="plan"><div class="ph"><img src="<?php echo esc_url( $a . 'floor-2.jpg' ); ?>" alt="Floor plan option 2 (preview)" loading="lazy" onerror="this.style.display='none'"></div>
				<p>Retail unit plan</p>
				<button class="btn btn-ghost btn-sm" data-open-modal data-interest="Retail shop" data-title="Get the floor plan">Get full plan</button></div>
		</div>
		<div class="center"><button class="btn btn-primary" data-open-modal data-interest="Retail shop" data-title="Download brochure">Download Brochure</button></div>
	</div>
</section>

<!-- PRICE -->
<section class="band" id="price">
	<div class="wrap">
		<div class="sec-head"><h2>Price list of Omaxe Jankipuram project, Lucknow</h2></div>
		<div class="price-grid">
			<figure class="cost" style="margin:0">
				<img src="<?php echo esc_url( $a . 'cost-sheet.jpg' ); ?>" alt="Cost sheet preview" loading="lazy" onerror="this.style.display='none'">
				<figcaption>Complete costing detail</figcaption>
			</figure>
			<div style="overflow-x:auto">
				<table class="price">
					<thead><tr><th>Configuration</th><th>Carpet area (sq.ft.)</th><th>Price</th><th>Breakup</th></tr></thead>
					<tbody>
						<tr><td>Retail shops</td>
							<td><button class="link-btn" data-open-modal data-interest="Retail shop" data-title="Get carpet areas">On request</button></td>
							<td><button class="link-btn" data-open-modal data-interest="Retail shop" data-title="Get the price">On request</button></td>
							<td><button class="btn btn-primary btn-sm" data-open-modal data-interest="Retail shop" data-title="Get the price breakup">Price breakup</button></td></tr>
						<tr><td>Studio apartments</td>
							<td><button class="link-btn" data-open-modal data-interest="Studio apartment" data-title="Get carpet areas">On request</button></td>
							<td><button class="link-btn" data-open-modal data-interest="Studio apartment" data-title="Get the price">On request</button></td>
							<td><button class="btn btn-primary btn-sm" data-open-modal data-interest="Studio apartment" data-title="Get the price breakup">Price breakup</button></td></tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</section>

<!-- FAQ -->
<section id="faq">
	<div class="wrap">
		<div class="sec-head"><h2>Frequently asked questions</h2></div>
		<div class="faq">
			<?php foreach ( $faqs as $i => $f ) : ?>
				<details<?php echo 0 === $i ? ' open' : ''; ?>><summary><?php echo esc_html( $f[0] ); ?></summary><p><?php echo esc_html( $f[1] ); ?></p></details>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<!-- DEVELOPER -->
<section class="band dev" id="developer">
	<div class="wrap">
		<h2>About the developer</h2>
		<p>Omaxe Group is a trusted real estate developer in India, known for its legacy, quality projects and customer commitment. Established in 1989, the company has delivered numerous residential, commercial and integrated projects across the country. With a focus on quality construction, innovative design and customer safety and satisfaction, Omaxe creates modern spaces that offer comfort, functionality and long-term value.</p>
	</div>
</section>

<!-- FINAL CTA -->
<section class="cta" id="contact">
	<div class="wrap">
		<div>
			<h2>Register for pre-launch offers</h2>
			<p>Leave your number and we will call you with current availability, pricing and site visit slots. Prefer to talk now? Call <a href="<?php echo esc_url( $tel ); ?>"><strong><?php echo esc_html( $cfg['phone'] ); ?></strong></a>.</p>
		</div>
		<div class="form-card"><?php omx_form( 'form-cta', 'Footer form', 'Register now', true ); ?></div>
	</div>
</section>

</main>

<footer class="foot">
	<div class="wrap">
		<p><strong>Disclaimer:</strong> The content on this website is for information purpose only and does not establish an offer to avail of any service. Prices mentioned are subject to change without notice and prospectus mentioned are subject to availability. Images are for representation purpose only. We may also send updates to the mobile number / e-mail id registered with us.</p>
		<p>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> BeTogether. Channel partner site for <?php echo esc_html( $cfg['project'] ); ?>.</p>
	</div>
</footer>

<!-- Floating WhatsApp + mobile bar -->
<div class="float"><a class="wa" href="<?php echo esc_url( $wa ); ?>" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">WA</a></div>
<div class="mbar" id="mbar">
	<a class="btn btn-ghost btn-sm" href="<?php echo esc_url( $tel ); ?>">Call now</a>
	<button class="btn btn-primary btn-sm" data-open-modal data-interest="Retail shop" data-title="Get price &amp; brochure">Get price</button>
</div>

<!-- Modal enquiry -->
<div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-hidden="true">
	<div class="modal-box">
		<button class="modal-close" id="modal-close" aria-label="Close">&times;</button>
		<h2 id="modal-title" style="font-size:1.4rem">Get price &amp; brochure</h2>
		<p class="fine" style="margin-bottom:14px;font-size:.9rem">We will call you shortly with details.</p>
		<?php omx_form( 'form-modal', 'Popup form', 'Send my details', true ); ?>
	</div>
</div>

<script>
(function(){
	var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

	/* Mobile nav */
	var burger=$('#burger'), nav=$('#nav');
	burger.addEventListener('click',function(){var o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
	$$('#nav a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false')})});

	/* Read more */
	var tg=$('#about-toggle'), more=$('#about-more');
	tg.addEventListener('click',function(){var o=more.classList.toggle('open');tg.textContent=o?'Read less':'Read more';tg.setAttribute('aria-expanded',o)});

	/* Mobile sticky bar after scroll */
	var mbar=$('#mbar');
	window.addEventListener('scroll',function(){mbar.classList.toggle('show',window.scrollY>500)},{passive:true});

	/* Modal */
	var modal=$('#modal'), lastFocus=null;
	function openModal(btn){
		lastFocus=document.activeElement;
		$('#modal-title').textContent=btn.getAttribute('data-title')||'Get price & brochure';
		var sel=$('select[name=interest]',modal), want=btn.getAttribute('data-interest');
		if(sel&&want){sel.value=want}
		modal.classList.add('open');modal.setAttribute('aria-hidden','false');
		setTimeout(function(){$('input[name=name]',modal).focus()},50);
	}
	function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');if(lastFocus)lastFocus.focus()}
	document.addEventListener('click',function(e){
		var b=e.target.closest('[data-open-modal]');
		if(b){e.preventDefault();openModal(b)}
	});
	$('#modal-close').addEventListener('click',closeModal);
	modal.addEventListener('click',function(e){if(e.target===modal)closeModal()});
	document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.classList.contains('open'))closeModal()});

	/* UTM / click-id capture (persist for session) */
	var keys=['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid'], q=new URLSearchParams(location.search), store={};
	keys.forEach(function(k){
		var v=q.get(k);
		try{ if(v){sessionStorage.setItem('omx_'+k,v)} v=v||sessionStorage.getItem('omx_'+k)||''; }catch(err){ v=v||''; }
		store[k]=v;
	});
	$$('.lead-form').forEach(function(f){keys.forEach(function(k){var i=f.elements[k];if(i)i.value=store[k]})});

	/* Form submit (AJAX to this same page) */
	$$('.lead-form').forEach(function(form){
		var msg=$('.form-msg',form), btn=$('button[type=submit]',form);
		form.addEventListener('submit',function(e){
			e.preventDefault();
			msg.className='form-msg';msg.textContent='';
			$$('.invalid',form).forEach(function(i){i.classList.remove('invalid')});
			var name=form.elements.name, phone=form.elements.phone, digits=phone.value.replace(/\D/g,'').replace(/^(91|0)/,'');
			if(name.value.trim().length<2){name.classList.add('invalid');msg.textContent='Please enter your full name.';name.focus();return}
			if(!/^[6-9]\d{9}$/.test(digits)){phone.classList.add('invalid');msg.textContent='Enter a valid 10-digit mobile number.';phone.focus();return}
			btn.disabled=true;var label=btn.textContent;btn.textContent='Sending...';
			fetch(location.href,{method:'POST',body:new FormData(form),credentials:'same-origin',headers:{'X-Requested-With':'XMLHttpRequest'}})
			.then(function(r){return r.json()})
			.then(function(d){
				if(d.ok){
					form.reset();
					msg.className='form-msg ok';msg.textContent='Thank you. Our executive will call you shortly.';
					/* Analytics hooks - fires if tags are installed */
					if(window.gtag){gtag('event','generate_lead',{form:form.getAttribute('data-source')})}
					if(window.fbq){fbq('track','Lead')}
					if(window.dataLayer){dataLayer.push({event:'omx_lead',form:form.getAttribute('data-source')})}
					if(d.redirect){location.href=d.redirect;return}
					if(modal.classList.contains('open')){setTimeout(closeModal,2200)}
				}else{msg.textContent=d.msg||'Something went wrong. Please call us.'}
			})
			.catch(function(){msg.textContent='Network error. Please try again or call us.'})
			.finally(function(){btn.disabled=false;btn.textContent=label});
		});
	});
})();
</script>
<?php wp_footer(); ?>
</body>
</html>