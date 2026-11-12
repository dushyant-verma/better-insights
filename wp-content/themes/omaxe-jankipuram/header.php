<?php
/**
 * Header: <head>, announcement bar and sticky navigation.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#006ec7">
  <meta name="description" content="<?php echo esc_attr( 'Explore commercial investment opportunities at Omaxe Jankipuram, Lucknow. Request project details, configuration information and the latest price list.' ); ?>">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

  <div class="announcement">
    <span>OMAXE JANKIPURAM, LUCKNOW</span>
    <span class="announcement-dot"></span>
    <span>ENQUIRE FOR PROJECT DETAILS</span>
  </div>

  <header class="site-header" id="top">
    <div class="container nav-wrap">
      <a class="brand" href="#top" aria-label="Omaxe Jankipuram home">
        <span class="brand-mark">O</span>
        <span class="brand-name">OMAXE <small>JANKIPURAM</small></span>
      </a>
      <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="main-nav" aria-label="Main navigation">
        <a href="#overview">Overview</a>
        <a href="#highlights">Highlights</a>
        <a href="#amenities">Amenities</a>
        <a href="#gallery">Gallery</a>
        <a href="#floor-plans">Floor Plans</a>
        <a href="#location">Location</a>
        <a href="#faq">FAQs</a>
      </nav>
      <a class="button button-small button-gold nav-cta" href="#enquiry">Enquire Now <span>↗</span></a>
    </div>
  </header>
