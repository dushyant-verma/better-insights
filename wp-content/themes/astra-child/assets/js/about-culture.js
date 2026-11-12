/**
 * Better Insights — Culture & Atmosphere Section ("Feel the atmosphere")
 * GSAP ScrollTrigger horizontal scroll and staggered entrance animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.bi-culture-section');
  if (!section) return;

  const collageWrap = section.querySelector('.bi-culture-collage-wrap');
  const collage = section.querySelector('.bi-culture-collage');
  const items = section.querySelectorAll('.bi-culture-item');
  const prevBtn = section.querySelector('.bi-culture-nav-btn--prev');
  const nextBtn = section.querySelector('.bi-culture-nav-btn--next');

  // 1. Mobile touch navigation controls
  if (prevBtn && nextBtn && collageWrap) {
    const updateButtons = () => {
      const maxScroll = collageWrap.scrollWidth - collageWrap.clientWidth;
      prevBtn.disabled = collageWrap.scrollLeft <= 10;
      nextBtn.disabled = collageWrap.scrollLeft >= maxScroll - 10;
    };

    prevBtn.addEventListener('click', () => {
      collageWrap.scrollBy({ left: -window.innerWidth * 0.75, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      collageWrap.scrollBy({ left: window.innerWidth * 0.75, behavior: 'smooth' });
    });

    collageWrap.addEventListener('scroll', updateButtons, { passive: true });
    updateButtons();
  }

  // 2. Check if GSAP and ScrollTrigger are available
  if (typeof gsap === 'undefined') {
    return;
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 3. Staggered reveal animation when section enters viewport
  gsap.fromTo(
    section.querySelectorAll('.bi-culture-intro__eyebrow, .bi-culture-intro__title, .bi-culture-intro__desc'),
    {
      opacity: 0,
      y: 28,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
      },
    }
  );

  // 4. Desktop Horizontal Scrub & Parallax (matchMedia >= 1024px)
  if (typeof ScrollTrigger !== 'undefined' && collage && collageWrap) {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const getScrollAmount = () => {
        const collageWidth = collage.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(collageWidth - viewportWidth + 80);
      };

      // Main horizontal translation pinned to scroll
      const horizontalTween = gsap.to(collage, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(collage.scrollWidth - window.innerWidth, 1200)}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Subtle parallax & rotation float on individual items during horizontal scrub
      items.forEach((item, index) => {
        const isOdd = index % 2 === 1;
        gsap.to(item, {
          y: isOdd ? '-=40' : '+=40',
          rotate: isOdd ? '+=2.5' : '-=2.5',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${Math.max(collage.scrollWidth - window.innerWidth, 1200)}`,
            scrub: 1.2,
          },
        });
      });

      return () => {
        horizontalTween.kill();
      };
    });

    // Mobile / Tablet entrance reveal
    mm.add('(max-width: 1023px)', () => {
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            scale: 0.92,
            y: 20,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            delay: (index % 3) * 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              once: true,
            },
          }
        );
      });
    });
  }
});

