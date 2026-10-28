<?php
/**
 * The template for displaying the Better Insights Merged Homepage (Home 2 + Home 3).
 *
 * The original homepage template is backed up at:
 * front-page-original.php and can be viewed via page-templates/homepage-template.php.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

get_header();

// Render the merged homepage content (Home 2 + Home 3 sections)
get_template_part( 'template-parts/homepage/merged-content' );

get_footer();
