(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    mainNav.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ---------- Pre-select interest from CTA links ---------- */
  document.querySelectorAll('[data-interest]').forEach(link => {
    link.addEventListener('click', () => {
      const interest = link.getAttribute('data-interest');
      const select = document.querySelector('#interest');
      if (select && interest) select.value = interest;
    });
  });

  /* ---------- Phone: digits only ---------- */
  const phone = document.querySelector('#phone');
  if (phone) {
    phone.addEventListener('input', () => {
      phone.value = phone.value.replace(/\D/g, '').slice(0, 10);
    });
  }

  /* ---------- Enquiry form (WordPress AJAX) ---------- */
  const form = document.querySelector('#leadForm');
  const formMessage = document.querySelector('#formMessage');

  function showMessage(text, type) {
    formMessage.className = 'form-message ' + type;
    formMessage.textContent = text;
    formMessage.style.display = 'block';
  }

  if (form && formMessage) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      formMessage.className = 'form-message';
      formMessage.style.display = 'none';

      const name = form.querySelector('#name').value.trim();
      const phoneValue = form.querySelector('#phone').value.trim();
      const interest = form.querySelector('#interest').value;
      const consent = form.querySelector('#consent').checked;

      if (!name || !/^[6-9]\d{9}$/.test(phoneValue) || !interest || !consent) {
        showMessage('Please enter your name, a valid 10-digit Indian mobile number, select an interest and accept the contact consent.', 'error');
        return;
      }

      if (typeof omaxeData === 'undefined') {
        showMessage('Form is not configured correctly. Please contact the site owner.', 'error');
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const data = new FormData();
      data.append('action', 'omaxe_submit_lead');
      data.append('nonce', omaxeData.nonce);
      data.append('name', name);
      data.append('phone', phoneValue);
      data.append('interest', interest);
      data.append('budget', form.querySelector('#budget').value);
      data.append('consent', '1');
      data.append('website', form.querySelector('#website') ? form.querySelector('#website').value : '');
      data.append('page', window.location.href);
      data.append('utm_source', params.get('utm_source') || 'direct');
      data.append('utm_medium', params.get('utm_medium') || '');
      data.append('utm_campaign', params.get('utm_campaign') || '');
      data.append('gclid', params.get('gclid') || '');

      const submitBtn = form.querySelector('.form-submit');
      const originalHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting…';

      try {
        const response = await fetch(omaxeData.ajaxUrl, {
          method: 'POST',
          credentials: 'same-origin',
          body: data
        });
        const result = await response.json();

        if (result && result.success) {
          showMessage(result.data.message, 'success');
          form.reset();

          // Fire tracking events if analytics tags are present
          if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { event_category: 'enquiry', event_label: interest });
          if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
        } else {
          const msg = result && result.data && result.data.message ? result.data.message : 'Something went wrong. Please try again.';
          showMessage(msg, 'error');
        }
      } catch (err) {
        showMessage('Network error. Please check your connection and try again.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
      }
    });
  }

  /* ---------- Gallery lightbox ---------- */
  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = lightbox ? lightbox.querySelector('img') : null;

  document.querySelectorAll('.gallery-open').forEach(button => {
    button.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = button.dataset.src;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (lightbox) {
    const closeBtn = lightbox.querySelector('.lightbox-close');
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  }
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });
})();
