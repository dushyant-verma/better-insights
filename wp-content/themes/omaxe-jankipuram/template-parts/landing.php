<?php
/**
 * Landing page content (all sections).
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

$img      = get_template_directory_uri() . '/assets/images';
$maps_url = 'https://www.google.com/maps/search/?api=1&query=Omaxe+Jankipuram+Lucknow';
?>
  <main>
    <section class="hero" id="overview">
      <div class="hero-image"></div>
      <div class="hero-shade"></div>

      <div class="hero-container">

        <!-- Left Column: Hero Content -->
        <div class="hero-content">
          <div class="eyebrow eyebrow-light">
            <span></span> A COMMERCIAL ADDRESS WITH OPPORTUNITY
          </div>

          <h1>Make your next move<br><em>count.</em></h1>

          <p class="hero-lead">
            Explore commercial spaces at Omaxe Jankipuram, Lucknow —
            a destination designed around visibility, access and everyday convenience.
          </p>

          <div class="hero-tags">
            <span>Retail Shops</span><i></i>
            <span>Studio Apartments</span><i></i>
            <span>Commercial Spaces</span>
          </div>

          <div class="hero-actions">
            <a class="button button-gold" href="#enquiry">Get Project Details <span>↗</span></a>
            <a class="button button-outline-light" href="#gallery">Explore the Project</a>
          </div>

          <p class="hero-note">
            Project visuals are artistic representations. Please verify
            specifications and availability with the authorised sales team.
          </p>
        </div>

        <!-- Right Column: Enquiry Form -->
        <div class="enquiry-grid" id="enquiry">
          <form class="lead-form" id="leadForm" novalidate>

            <div class="form-heading">
              <span>ENQUIRY FORM</span>
              <strong>Get project details</strong>
              <small>Fields marked * are required.</small>
            </div>

            <label for="name">Full name *</label>
            <input id="name" name="name" type="text" placeholder="Enter your full name" autocomplete="name" required>

            <label for="phone">Mobile number *</label>
            <div class="phone-field">
              <span>+91</span>
              <input id="phone" name="phone" type="tel" inputmode="numeric" maxlength="10" placeholder="10-digit mobile number" autocomplete="tel-national" required>
            </div>

            <label for="interest">I am interested in *</label>
            <select id="interest" name="interest" required>
              <option value="">Select an option</option>
              <option>Retail Shops</option>
              <option>Studio Apartments</option>
              <option>Commercial Spaces</option>
              <option>Floor Plans</option>
              <option>Price List</option>
              <option>Brochure</option>
              <option>Site Visit</option>
            </select>

            <label for="budget">Preferred budget <small>(optional)</small></label>
            <select id="budget" name="budget">
              <option value="">Select budget range</option>
              <option>Prefer to discuss</option>
              <option>Below ₹25 lakh</option>
              <option>₹25–50 lakh</option>
              <option>₹50 lakh–₹1 crore</option>
              <option>Above ₹1 crore</option>
            </select>

            <!-- Honeypot (hidden from humans) -->
            <div style="position:absolute;left:-9999px;" aria-hidden="true">
              <label for="website">Leave this field empty</label>
              <input id="website" name="website" type="text" tabindex="-1" autocomplete="off">
            </div>

            <label class="consent">
              <input type="checkbox" id="consent" name="consent" value="1" required>
              <span>I agree to be contacted regarding this enquiry. *</span>
            </label>

            <button class="button button-gold form-submit" type="submit">Submit Enquiry <span>↗</span></button>

            <p class="form-privacy">
              Your details will be used to respond to this project enquiry.
              Please review the privacy policy before launch.
            </p>

            <div class="form-message" id="formMessage" role="status" aria-live="polite"></div>

          </form>
        </div>

      </div>
    </section>

    <section class="trust-strip" id="highlights">
      <div class="container trust-grid">
        <div class="trust-intro">
          <span class="eyebrow">THE PROJECT AT A GLANCE</span>
          <h2>A location that<br><em>works harder.</em></h2>
        </div>
        <article class="trust-item">
          <div class="line-icon"><svg viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg></div>
          <div><h3>Visibility</h3><p>Designed to make a strong impression.</p></div>
        </article>
        <article class="trust-item">
          <div class="line-icon"><svg viewBox="0 0 24 24"><path d="M5 17h14l-1.2-7.2A2 2 0 0 0 15.8 8H8.2a2 2 0 0 0-2 1.8L5 17Z"/><path d="M5 13H3v4h2m14-4h2v4h-2M7 17v2m10-2v2M7 11h10"/><circle cx="7.5" cy="15" r=".7"/><circle cx="16.5" cy="15" r=".7"/></svg></div>
          <div><h3>Accessibility</h3><p>Connectivity for customers and businesses.</p></div>
        </article>
        <article class="trust-item">
          <div class="line-icon"><svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg></div>
          <div><h3>Location</h3><p>Positioned in Jankipuram, Lucknow.</p></div>
        </article>
      </div>
    </section>

    <section class="section intro-section">
      <div class="container intro-grid">
        <div class="intro-copy">
          <span class="eyebrow">A PLACE TO DO BUSINESS</span>
          <h2>More than an address.<br><em>A business opportunity.</em></h2>
          <p>Discover a commercial destination planned for a mix of retail, food, services and modern business needs. Whether you are exploring a space for your venture or evaluating an investment, start with the details that matter.</p>
          <a class="text-link" href="#enquiry">Talk to the project team <span>↗</span></a>
        </div>
        <div class="intro-visual">
          <img src="<?php echo esc_url( $img . '/omaxe-hero-mobile.png' ); ?>" alt="Architectural visual of a modern commercial development" loading="lazy">
          <div class="visual-caption"><span>01 / PROJECT VISUAL</span><strong>Designed for a modern<br>commercial experience.</strong></div>
        </div>
      </div>
    </section>

    <section class="section investment-section" id="investment">
      <div class="container">
        <div class="section-heading">
          <div><span class="eyebrow">EXPLORE YOUR OPTIONS</span><h2>Find the space that<br><em>fits your ambition.</em></h2></div>
          <p>Tell us what you are looking for. Our team can help you understand the available configurations, indicative pricing and next steps.</p>
        </div>
        <div class="investment-grid">
          <article class="investment-card retail-card">
            <div class="investment-image"></div>
            <div class="investment-body">
              <span class="card-index">01 / RETAIL</span>
              <h3>Retail Shops</h3>
              <p>Explore commercial spaces for retail, services and customer-facing businesses.</p>
              <a href="#enquiry" data-interest="Retail Shops" class="text-link">Request retail details <span>↗</span></a>
            </div>
          </article>
          <article class="investment-card studio-card">
            <div class="investment-image"></div>
            <div class="investment-body">
              <span class="card-index">02 / STUDIO</span>
              <h3>Studio Apartments</h3>
              <p>Ask about studio configurations, specifications and current availability.</p>
              <a href="#enquiry" data-interest="Studio Apartments" class="text-link">Request studio details <span>↗</span></a>
            </div>
          </article>
          <article class="investment-card commercial-card">
            <div class="investment-image"></div>
            <div class="investment-body">
              <span class="card-index">03 / COMMERCIAL</span>
              <h3>Business Spaces</h3>
              <p>Discuss space requirements for your business and understand suitable options.</p>
              <a href="#enquiry" data-interest="Commercial Spaces" class="text-link">Discuss your requirement <span>↗</span></a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="benefit-band">
      <div class="container benefit-inner">
        <div class="benefit-copy">
          <span class="eyebrow eyebrow-light">A PROMOTIONAL BENEFIT</span>
          <h2>Explore the advertised<br><em>loyalty benefits.</em></h2>
          <p>Ask the sales team about eligibility, applicable terms and conditions, and the current offer details.</p>
        </div>
        <div class="benefit-art">
          <div class="coin-icon"><svg viewBox="0 0 100 100"><path d="M12 66 34 43l15 13 34-37"/><path d="M65 19h18v18"/><ellipse cx="22" cy="78" rx="10" ry="4"/><path d="M12 78v8c0 5 20 5 20 0v-8"/><ellipse cx="50" cy="68" rx="10" ry="4"/><path d="M40 68v18c0 5 20 5 20 0V68"/><ellipse cx="78" cy="58" rx="10" ry="4"/><path d="M68 58v28c0 5 20 5 20 0V58"/></svg></div>
          <div class="benefit-divider"></div>
          <div class="benefit-number"><span>LOYALTY BENEFITS</span><strong>12%<sup>*</sup> P.A.</strong></div>
        </div>
        <small class="benefit-disclaimer">*Till O.C. Apply. Terms, eligibility and conditions apply. Verify the offer with the authorised sales team.</small>
      </div>
    </section>

    <section class="section amenities-section" id="amenities">
      <div class="container">
        <div class="section-heading centered">
          <span class="eyebrow">THOUGHTFUL CONVENIENCES</span>
          <h2>Everything you need.<br><em>Within reach.</em></h2>
          <p>Explore the amenities highlighted for the project. Confirm final provisions and specifications with the developer.</p>
        </div>
        <div class="amenity-grid">
          <?php
          $amenities = array(
            '✦' => 'Star Gazing Area',
            '⌂' => 'Anchor Place',
            '♨' => 'Restaurants',
            '⇧' => 'High-Speed Elevators',
            '▤' => 'Business Centre',
            '▣' => 'Car Parking',
            '◈' => 'Food Courts',
            '◎' => 'CCTV Surveillance',
          );
          foreach ( $amenities as $icon => $label ) :
            ?>
            <article class="amenity"><span><?php echo esc_html( $icon ); ?></span><h3><?php echo esc_html( $label ); ?></h3></article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <section class="section gallery-section" id="gallery">
      <div class="container">
        <div class="section-heading">
          <div><span class="eyebrow">SEE THE VISION</span><h2>Project <em>gallery.</em></h2></div>
          <p>Explore architectural visuals to get a feel for the proposed commercial environment.</p>
        </div>
        <div class="gallery-grid">
          <button class="gallery-main gallery-open" data-src="<?php echo esc_url( $img . '/omaxe-hero-desktop.png' ); ?>" aria-label="View main project visual">
            <img src="<?php echo esc_url( $img . '/omaxe-hero-desktop.png' ); ?>" alt="Aerial architectural view of a modern commercial complex" loading="lazy">
            <span class="gallery-label">01 — AERIAL VIEW <b>↗</b></span>
          </button>
          <button class="gallery-side gallery-open" data-src="<?php echo esc_url( $img . '/omaxe-hero-mobile.png' ); ?>" aria-label="View alternate project visual">
            <img src="<?php echo esc_url( $img . '/omaxe-hero-mobile.png' ); ?>" alt="Street-level architectural view of a commercial complex" loading="lazy">
            <span class="gallery-label">02 — DEVELOPMENT VIEW <b>↗</b></span>
          </button>
        </div>
        <p class="image-note">Images are artistic impressions and are not a representation of final construction, finishes or delivered specifications.</p>
      </div>
    </section>

    <section class="section floor-section" id="floor-plans">
      <div class="container floor-grid">
        <div class="floor-copy">
          <span class="eyebrow">PLAN YOUR SPACE</span>
          <h2>Explore the<br><em>floor plans.</em></h2>
          <p>Get configuration-specific layouts and understand the space before making a decision. Request the latest approved floor plans from the project team.</p>
          <a class="button button-navy" href="#enquiry" data-interest="Floor Plans">Request Floor Plans <span>↗</span></a>
        </div>
        <div class="floor-preview">
          <div class="floor-sheet">
            <div class="floor-placeholder"><span>FLOOR PLAN</span><div class="plan-shape"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><small>Request the latest approved layout</small></div>
          </div>
          <div class="floor-caption"><span>CONFIGURATION DETAILS</span><span>AVAILABLE ON REQUEST ↗</span></div>
        </div>
      </div>
    </section>

    <section class="section pricing-section" id="pricing">
      <div class="container pricing-wrap">
        <div class="pricing-copy">
          <span class="eyebrow">TRANSPARENT NEXT STEPS</span>
          <h2>Get the latest<br><em>price list.</em></h2>
          <p>Pricing and availability may vary by configuration. Share your requirement to receive the latest details from the sales team.</p>
          <a class="button button-gold" href="#enquiry" data-interest="Price List">Request Price Details <span>↗</span></a>
        </div>
        <div class="price-table-wrap">
          <div class="price-table-title"><span>CONFIGURATION</span><span>PRICE &amp; AVAILABILITY</span></div>
          <div class="price-row"><strong>Retail Shops</strong><span>Request current price</span><a href="#enquiry" data-interest="Retail Shops">Enquire ↗</a></div>
          <div class="price-row"><strong>Studio Apartments</strong><span>Request current price</span><a href="#enquiry" data-interest="Studio Apartments">Enquire ↗</a></div>
          <div class="price-row"><strong>Commercial Spaces</strong><span>Discuss your requirement</span><a href="#enquiry" data-interest="Commercial Spaces">Enquire ↗</a></div>
          <p class="table-note">No pricing or inventory is assumed on this page. Request an updated, configuration-specific quote.</p>
        </div>
      </div>
    </section>

    <section class="section location-section" id="location">
      <div class="container location-grid">
        <div class="location-copy">
          <span class="eyebrow">CONNECTED TO THE CITY</span>
          <h2>Discover the<br><em>location advantage.</em></h2>
          <p>Located in Jankipuram, Lucknow. Explore the surrounding area and verify routes, travel times and access points before planning your visit.</p>
          <div class="location-points">
            <div><span>01</span><strong>Jankipuram, Lucknow</strong></div>
            <div><span>02</span><strong>Road connectivity</strong></div>
            <div><span>03</span><strong>Nearby urban conveniences</strong></div>
          </div>
          <a class="text-link" href="<?php echo esc_url( $maps_url ); ?>" target="_blank" rel="noopener">Explore on Google Maps <span>↗</span></a>
        </div>
        <div class="map-card">
          <div class="map-visual">
            <div class="map-road road-one"></div><div class="map-road road-two"></div><div class="map-road road-three"></div>
            <div class="map-block block-one"></div><div class="map-block block-two"></div><div class="map-block block-three"></div><div class="map-block block-four"></div>
            <div class="map-pin"><span>O</span></div>
            <div class="map-label">JANKIPURAM<br><small>LUCKNOW, UTTAR PRADESH</small></div>
          </div>
          <div class="map-footer"><span>PROJECT LOCATION</span><a href="<?php echo esc_url( $maps_url ); ?>" target="_blank" rel="noopener">OPEN MAP ↗</a></div>
        </div>
      </div>
    </section>

    <section class="section developer-section">
      <div class="container developer-grid">
        <div><span class="eyebrow">THE DEVELOPER</span><h2>Built on a legacy<br>of <em>development.</em></h2></div>
        <div>
          <p>Omaxe is a real estate developer with a portfolio across residential, commercial and mixed-use developments. Review the project-specific approvals, specifications, delivery commitments and disclosures before making an investment decision.</p>
          <a class="text-link" href="#enquiry">Request official project information <span>↗</span></a>
        </div>
      </div>
    </section>

    <section class="section faq-section" id="faq">
      <div class="container faq-grid">
        <div class="faq-intro">
          <span class="eyebrow">NEED CLARITY?</span>
          <h2>Frequently asked<br><em>questions.</em></h2>
          <p>Have a question that is not covered here? Send an enquiry and request a callback.</p>
          <a class="text-link" href="#enquiry">Ask the project team <span>↗</span></a>
        </div>
        <div class="faq-list">
          <?php
          $faqs = array(
            'Where is Omaxe Jankipuram located?' => 'The project is presented as being in Jankipuram, Lucknow. Contact the authorised sales team for the exact site address and directions.',
            'What types of spaces can I enquire about?' => 'The supplied project reference highlights retail shops and studio apartments. You can select your preferred configuration in the enquiry form.',
            'How can I get the latest price list?' => 'Submit your name, phone number and preferred configuration. The sales team can share current pricing and availability.',
            'Can I request a brochure and floor plans?' => 'Yes. Use the enquiry form and select Brochure or Floor Plans as your interest.',
            'Are the advertised loyalty benefits guaranteed?' => 'Offer eligibility, applicable conditions and any return-related representation must be confirmed in writing with the authorised sales team. Do not rely on promotional artwork alone.',
            'How can I arrange a site visit?' => 'Submit the enquiry form and mention that you would like to arrange a site visit. The team can confirm the available slots.',
          );
          foreach ( $faqs as $q => $a ) :
            ?>
            <details><summary><?php echo esc_html( $q ); ?></summary><p><?php echo esc_html( $a ); ?></p></details>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

  </main>
