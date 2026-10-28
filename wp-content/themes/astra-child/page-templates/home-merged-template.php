<?php
/**
 * Template Name: Home Merged Template (Home 2 + Home 3)
 * Description: Unified homepage combining all sections from Home 2 (Design Studio) and Home 3 (Tech & Consulting) with WordPress header and footer.
 *
 * @package Astra_Child
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

get_template_part( 'template-parts/homepage/merged-content' );

get_footer();
