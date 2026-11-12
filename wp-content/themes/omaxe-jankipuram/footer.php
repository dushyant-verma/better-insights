<?php
/**
 * Footer, mobile CTA bar, lightbox and wp_footer().
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
$maps_url = 'https://www.google.com/maps/search/?api=1&query=Omaxe+Jankipuram+Lucknow';
?>
  <footer class="site-footer">
    <div class="container footer-main">
      <a class="brand brand-footer" href="#top"><span class="brand-mark">O</span><span class="brand-name">OMAXE <small>JANKIPURAM</small></span></a>
      <p>Explore commercial opportunities at Jankipuram, Lucknow.</p>
      <a class="footer-top" href="#top">BACK TO TOP ↑</a>
    </div>
    <div class="container footer-bottom">
      <span>© <?php echo esc_html( gmdate( 'Y' ) ); ?> Omaxe Jankipuram. All rights reserved.</span>
      <span>Disclaimer: Images are artistic impressions. Project details, approvals, specifications, offers, pricing and availability are subject to confirmation by the authorised developer or sales representative.</span>
    </div>
  </footer>

  <div class="mobile-cta">
    <a href="#enquiry">Enquire Now <span>↗</span></a>
    <a href="<?php echo esc_url( $maps_url ); ?>" target="_blank" rel="noopener" aria-label="Open location map">⌖</a>
  </div>

  <div class="lightbox" id="lightbox" aria-hidden="true">
    <button class="lightbox-close" aria-label="Close image">×</button>
    <img src="" alt="Expanded project visual">
  </div>

<?php wp_footer(); ?>
</body>
</html>
