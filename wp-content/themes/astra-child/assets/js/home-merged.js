/**
 * Better Insights Merged Homepage Interactions & Motion Engine (Home 2 + Home 3)
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. Form Handlers & Section Scripts
  // ---------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    // Hero intersection offscreen watcher
    const hero = document.getElementById('h2-hero');
    if (hero && 'IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        hero.classList.toggle('is-offscreen', !entry.isIntersecting);
      }).observe(hero);
    }

    // Home 2 Contact Form
    const h2Form = document.querySelector('#h2-contact .contact__form');
    if (h2Form) {
      const status = h2Form.querySelector('.contact__status');
      h2Form.addEventListener('submit', event => {
        event.preventDefault();
        const ok = h2Form.checkValidity();
        if (status) {
          status.textContent = ok ? (status.dataset.success || 'Thank you! Message received.') : (status.dataset.error || 'Please fill in all required fields.');
        }
        if (ok) h2Form.reset();
        else h2Form.querySelector(':invalid')?.focus();
      });
    }

    // Home 3 Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      const status = contactForm.querySelector('.contact__status');
      contactForm.addEventListener('submit', event => {
        event.preventDefault();
        const valid = contactForm.checkValidity();
        if (status) {
          status.textContent = valid ? (contactForm.dataset.msgOk || 'Thank you! We will be in touch shortly.') : (contactForm.dataset.msgError || 'Please correct the highlighted fields.');
        }
        if (valid) contactForm.reset();
        else contactForm.querySelector(':invalid')?.focus();
      });
    }
  });

  // ---------------------------------------------------------------------------
  // 2. Motion Queue Engine
  // ---------------------------------------------------------------------------
  const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
  const parsed = document.readyState === 'loading'
    ? new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, { once: true }))
    : Promise.resolve();
  const ready = () => Promise.all([fonts, parsed]).then(() => firsts);
  const nextTask = () => window.scheduler?.yield?.() ?? new Promise(resolve => setTimeout(resolve));

  const refresh = () => {
    if (typeof window.refreshScroll === 'function') return window.refreshScroll();
    window.ScrollTrigger?.sort();
    window.ScrollTrigger?.refresh();
  };

  const run = (setup, name) => {
    for (const trigger of window.ScrollTrigger?.getAll() || []) {
      if (!trigger.end && window.ScrollTrigger.getAll().includes(trigger)) trigger.refresh(0, 1);
    }
    const context = window.gsap.context(() => {});
    const log = new MutationObserver(() => {});
    log.observe(document.documentElement, { attributes: true, attributeOldValue: true, subtree: true });
    let failure = null, records;
    try {
      context.add(() => {
        try { setup(); } catch (error) { failure = error; }
      });
    } finally {
      records = log.takeRecords();
      log.disconnect();
    }
    if (!failure) return true;
    try { context.revert(); } catch (error) { console.error(name, 'revert failed', error); }
    for (const { target, attributeName, oldValue } of records.reverse()) {
      const now = target.getAttribute(attributeName);
      if (oldValue == null) {
        if (now != null) target.removeAttribute(attributeName);
      } else if (now !== oldValue) {
        target.setAttribute(attributeName, oldValue);
      }
    }
    console.error(name, failure);
    return false;
  };

  let firsts = Promise.resolve(), tail = null, pending = 0, lazy = null, building = 0;

  window.queueMotion = (setup, { first = false, near, id } = {}) => {
    if (!window.gsap || typeof setup !== 'function') return;
    const name = id || 'motion';
    if (near instanceof Element && window.IntersectionObserver) {
      const watch = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        watch.disconnect();
        building++;
        lazy = (lazy || ready()).then(nextTask).then(() => run(setup, name)).finally(() => { if (!--building) refresh(); });
      }, { rootMargin: '100% 0px' });
      watch.observe(near);
      return;
    }
    if (first) {
      firsts = firsts.then(() => fonts).then(() => { if (!run(setup, name)) refresh(); });
    } else {
      pending++;
      tail = (tail || ready()).then(nextTask).then(() => run(setup, name)).finally(() => { if (!--pending) refresh(); });
    }
    window.motionReady = Promise.all([firsts, tail]);
  };

  window.adjacent = (a, b) => {
    const order = [...document.querySelectorAll('[data-8b-section]')].filter(section => section.getAttribute('data-8b-section') !== 'navigation').map(section => section.id);
    return order.indexOf(a) >= 0 && order[order.indexOf(a) + 1] === b;
  };

  // ---------------------------------------------------------------------------
  // 3. Page Init (GSAP Plugins & Lenis Smooth Scroll)
  // ---------------------------------------------------------------------------
  if (window.gsap && window.ScrollTrigger) {
    if (window.SplitText) {
      gsap.registerPlugin(ScrollTrigger, SplitText);
    } else {
      gsap.registerPlugin(ScrollTrigger);
    }

    window.refreshScroll = function () {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };

    if (window.Lenis) {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const header = document.querySelector('.bi-header') || document.querySelector('#nav .nav__bar');
        const headerOffset = header ? Math.ceil(header.getBoundingClientRect().height || header.offsetHeight || 0) : 0;
        const lenis = window.lenis = new Lenis({
          lerp: 0.085,
          anchors: { offset: -headerOffset }
        });
        const tick = time => lenis.raf(time * 1000);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        return () => {
          gsap.ticker.remove(tick);
          gsap.ticker.lagSmoothing(500, 33);
          lenis.destroy();
          window.lenis = null;
        };
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 4. Motion Helpers (Home 2)
  // ---------------------------------------------------------------------------
  const effectsH2 = {
    rise(element, vars = {}) {
      const dot = element.querySelector('.m-dot');
      const timeline = gsap.timeline(vars);
      timeline.fromTo(element, { yPercent: 38, clipPath: 'inset(0% -6% 100% -6%)' }, { yPercent: 0, clipPath: 'inset(-30% -6% -30% -6%)', duration: 0.95, ease: 'expo.out', clearProps: 'clipPath,transform' }, 0);
      if (dot) timeline.fromTo(dot, { scale: 0, yPercent: -260 }, { scale: 1, yPercent: 0, duration: 0.75, ease: 'back.out(2.2)', clearProps: 'transform' }, 0.42);
      return timeline;
    },
    ink(element, vars = {}) {
      const words = element.querySelectorAll('.ink__word');
      return gsap.timeline(vars).fromTo(words, { opacity: 0.16 }, { opacity: 1, duration: 0.3, stagger: 0.06, ease: 'none' });
    },
    iris(element, vars = {}) {
      const image = element.querySelector('img');
      const timeline = gsap.timeline(vars);
      timeline.fromTo(element, { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)', duration: 1.15, ease: 'expo.inOut', clearProps: 'clipPath' }, 0);
      if (image) timeline.fromTo(image, { scale: 1.2 }, { scale: 1, duration: 1.5, ease: 'expo.out', clearProps: 'transform' }, 0.15);
      return timeline;
    }
  };

  function layoutBox(element) {
    if (!element) return { x: 0, y: 0, w: 0, h: 0, cx: 0, cy: 0 };
    let x = 0, y = 0, node = element;
    while (node) { x += node.offsetLeft; y += node.offsetTop; node = node.offsetParent; }
    return { x, y, w: element.offsetWidth, h: element.offsetHeight, cx: x + element.offsetWidth / 2, cy: y + element.offsetHeight / 2 };
  }
  window.layoutBox = layoutBox;

  function splitWords(element) {
    const original = element.innerHTML;
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) { fragment.append(part); return; }
        const word = document.createElement('span');
        word.className = 'ink__word';
        word.textContent = part;
        fragment.append(word);
      });
      node.replaceWith(fragment);
    });
    return () => { element.innerHTML = original; };
  }
  window.splitWords = splitWords;

  document.querySelectorAll('#home-2-scope [data-8b-section]').forEach(section => {
    const bound = name => [...section.querySelectorAll(`[data-8b-motion~="${name}"]`)];
    const rise = bound('rise'), ink = bound('ink'), iris = bound('iris');
    if (!rise.length && !ink.length && !iris.length) return;
    const first = section.getBoundingClientRect().top < window.innerHeight;
    if (rise.length) {
      window.queueMotion(() => gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        rise.forEach((element, index) => ScrollTrigger.create({ id: `effect:rise:${section.id}:${index}`, trigger: element, start: 'top 88%', once: true, animation: effectsH2.rise(element, { paused: true }) }));
      }), { first, id: `effect:rise:${section.id}` });
    }
    if (ink.length) {
      window.queueMotion(() => gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const reverts = ink.map(splitWords);
        ink.forEach((element, index) => ScrollTrigger.create({ id: `effect:ink:${section.id}:${index}`, trigger: element, start: 'top 88%', end: 'bottom 68%', scrub: 0.4, animation: effectsH2.ink(element) }));
        return () => reverts.forEach(revert => revert());
      }), { first, id: `effect:ink:${section.id}` });
    }
    if (iris.length) {
      window.queueMotion(() => gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        iris.forEach((element, index) => ScrollTrigger.create({ id: `effect:iris:${section.id}:${index}`, trigger: element, start: 'top 86%', once: true, animation: effectsH2.iris(element, { paused: true }) }));
      }), { first, id: `effect:iris:${section.id}` });
    }
  });

  // ---------------------------------------------------------------------------
  // 5. Motion Helpers (Home 3)
  // ---------------------------------------------------------------------------
  function restRadius(element) {
    if (!element) return 0;
    return parseFloat((getComputedStyle(element).clipPath.match(/round\s+([\d.]+)px/) || [])[1]) || 0;
  }
  window.restRadius = restRadius;

  function transcribe(element, wordsClass) {
    if (!window.SplitText) return gsap.timeline();
    const split = SplitText.create(element, { type: 'words', wordsClass });
    return gsap.fromTo(split.words, { '--bar': 1 }, { '--bar': 0, ease: 'none', stagger: 0.16, duration: 0.5 });
  }
  window.transcribe = transcribe;

  const captionPlayed = new WeakSet();
  const effectsH3 = {
    captionIn(element, vars = {}) {
      if (!window.SplitText) return gsap.timeline();
      const split = SplitText.create(element, { type: 'lines', mask: 'lines' });
      return gsap.timeline({ ...vars, onComplete: () => split.revert() })
        .from(split.lines, { yPercent: 108, duration: 1, ease: 'expo.out', stagger: 0.09 });
    },
    readAlong(element, vars = {}) {
      if (!window.SplitText) return gsap.timeline();
      const split = SplitText.create(element, { type: 'words' });
      const ink = getComputedStyle(element).color;
      const faint = ink.replace(/^rgb\((.+)\)$/, 'rgba($1, 0.22)');
      return gsap.fromTo(split.words, { color: faint }, { color: ink, ease: 'none', stagger: 0.12, duration: 0.6, ...vars });
    },
    bandRise(sheet, vars = {}) {
      const radius = restRadius(sheet);
      const side = window.innerWidth < 768 ? 2.5 : 4;
      const big = Math.round(radius * 2.6);
      return gsap.fromTo(sheet,
        { clipPath: `inset(0% ${side}% 0% ${side}% round ${big}px ${big}px 0px 0px)` },
        { clipPath: `inset(0% 0% 0% 0% round ${radius}px ${radius}px 0px 0px)`, ease: 'none', ...vars });
    }
  };
  window.effects = effectsH3;

  document.querySelectorAll('#home-3-scope [data-8b-section]').forEach(section => {
    const first = () => section.getBoundingClientRect().top < window.innerHeight;
    const timing = id => (first() ? { first: true, id } : { near: section, id });
    const headings = section.querySelectorAll('[data-8b-motion~="captionIn"]');
    if (headings.length) {
      const id = `effect:captionIn:${section.id}`;
      window.queueMotion(() => gsap.matchMedia().add({ wide: '(min-width: 48rem) and (prefers-reduced-motion: no-preference)', narrow: '(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)' }, () => {
        headings.forEach((heading, index) => {
          if (captionPlayed.has(heading)) return;
          const timeline = effectsH3.captionIn(heading, { paused: true });
          ScrollTrigger.create({ id: `${id}:${index}`, trigger: heading, start: 'top 88%', once: true, onEnter: () => { captionPlayed.add(heading); timeline.play(); } });
        });
      }), timing(id));
    }
    const reads = section.querySelectorAll('[data-8b-motion~="readAlong"]');
    if (reads.length) {
      const id = `effect:readAlong:${section.id}`;
      window.queueMotion(() => gsap.matchMedia().add({ wide: '(min-width: 48rem) and (prefers-reduced-motion: no-preference)', narrow: '(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)' }, () => {
        reads.forEach((element, index) => ScrollTrigger.create({ id: `${id}:${index}`, trigger: element, start: 'top 88%', end: 'bottom 60%', scrub: true, animation: effectsH3.readAlong(element) }));
      }), timing(id));
    }
    const bands = section.querySelectorAll('[data-8b-motion~="bandRise"]');
    if (bands.length) {
      const id = `effect:bandRise:${section.id}`;
      window.queueMotion(() => gsap.matchMedia().add({ wide: '(min-width: 48rem) and (prefers-reduced-motion: no-preference)', narrow: '(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)' }, () => {
        bands.forEach((sheet, index) => ScrollTrigger.create({ id: `${id}:${index}`, trigger: section, start: 'top bottom', end: 'top 25%', scrub: true, animation: effectsH3.bandRise(sheet) }));
      }), timing(id));
    }
  });

  // ---------------------------------------------------------------------------
  // 6. Home 2 Scene Timelines
  // ---------------------------------------------------------------------------
  // Hero Exit Scene
  window.queueMotion(() => {
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      if (!window.adjacent('h2-hero', 'statement')) return;
      const hero = document.getElementById('h2-hero');
      const statement = document.getElementById('statement');
      if (!hero || !statement) return;
      const target = statement.querySelector('.statement__dot');
      const aperture = hero.querySelector('.hero__aperture');
      if (!target || !aperture) return;
      const geometry = () => {
        const from = layoutBox(aperture), to = layoutBox(target);
        return { x: to.cx - from.cx, y: to.cy - from.cy, scale: to.w / from.w };
      };
      gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { id: 'h2-hero:exit', trigger: hero, start: 'bottom bottom', end: 'bottom 30%', scrub: true, invalidateOnRefresh: true } })
        .to(aperture, { x: () => geometry().x, y: () => geometry().y, ease: 'power1.inOut', duration: 1 }, 0)
        .to(aperture, { scale: () => geometry().scale, ease: 'power3.in', duration: 1 }, 0)
        .to(hero.querySelector('.hero__tint'), { opacity: 1, ease: 'power2.in', duration: 0.6 }, 0.4)
        .to(hero.querySelector('.hero__orbit'), { opacity: 0, duration: 0.3 }, 0)
        .to(hero.querySelector('.hero__word'), { xPercent: () => (window.matchMedia('(min-width: 900px) and (orientation: landscape)').matches ? -14 : 0), ease: 'power1.in', duration: 1 }, 0)
        .to(hero.querySelector('.hero__intro'), { y: -70, ease: 'power1.in', duration: 1 }, 0);
    });
  }, { first: true, id: 'scene:hero' });

  // Statement Scene
  window.queueMotion(() => {
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      const statement = document.getElementById('statement');
      if (!statement) return;
      const lines = statement.querySelectorAll('.statement__line');
      if (window.adjacent('h2-hero', 'statement')) {
        gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { id: 'statement:entry', trigger: statement, start: 'top bottom', end: 'top 30%', scrub: true } })
          .fromTo(lines, { yPercent: 85, xPercent: index => (index ? 9 : -6) }, { yPercent: 0, xPercent: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out' }, 0)
          .fromTo(statement.querySelector('.statement__dot'), { scale: 0 }, { scale: 1, duration: 0.1 }, 0.9);
      }
      const items = statement.querySelectorAll('.statement__index li');
      if (items.length) {
        gsap.from(items, { yPercent: 70, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'expo.out', scrollTrigger: { id: 'statement:index', trigger: statement.querySelector('.statement__index'), start: 'top 85%', once: true } });
      }
    });
  }, { id: 'scene:statement' });

  // Work Horizontal Pinning Scene
  window.queueMotion(() => {
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      const work = document.getElementById('work');
      if (!work) return;
      const track = work.querySelector('.work__track');
      const frame = work.querySelector('.work__window');
      const stage = work.querySelector('.work__stage');
      if (!track || !frame || !stage) return;
      work.classList.add('is-track');
      const run = () => Math.max(0, track.offsetWidth - (work.clientWidth - 2 * parseFloat(getComputedStyle(stage).paddingLeft)));
      const setRun = () => work.style.setProperty('--run', `${Math.round(run())}px`);
      setRun();
      ScrollTrigger.addEventListener('refreshInit', setRun);
      gsap.fromTo(work.querySelector('.work__plate'), { clipPath: 'inset(0% 3.2% 0% 3.2% round 44px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'power1.out', scrollTrigger: { id: 'work:plate', trigger: work, start: 'top bottom', end: 'top 15%', scrub: true } });
      const timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { id: 'work', trigger: work, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true } });
      timeline.to(track, { x: () => -run() }, 0);
      work.querySelectorAll('.case__img').forEach(image => timeline.fromTo(image, { xPercent: -5 }, { xPercent: 5 }, 0));
      if (window.adjacent('work', 'again')) {
        const cases = [...track.querySelectorAll('.case')];
        const radius = () => (window.innerWidth < 700 ? window.innerWidth * 2.1 : window.innerWidth * 0.95);
        const bend = card => {
          const offset = layoutBox(frame).x + card.offsetLeft + card.offsetWidth / 2 - run() - window.innerWidth / 2;
          const angle = offset / radius();
          return { x: radius() * Math.sin(angle) - offset, y: radius() * (1 - Math.cos(angle)), rotation: angle * 180 / Math.PI };
        };
        const exit = gsap.timeline({ defaults: { ease: 'power1.in' }, scrollTrigger: { id: 'work:exit', trigger: work, start: 'bottom bottom', end: 'bottom 30%', scrub: true, invalidateOnRefresh: true } });
        exit.to(frame, { x: () => -window.innerWidth * 0.2, duration: 1 }, 0);
        cases.forEach(card => exit.to(card, { x: () => bend(card).x, y: () => bend(card).y, rotation: () => bend(card).rotation, duration: 1 }, 0));
      }
      return () => { work.classList.remove('is-track'); work.style.removeProperty('--run'); ScrollTrigger.removeEventListener('refreshInit', setRun); };
    });
  }, { id: 'scene:work' });

  // Again Wheel Pinning Scene
  window.queueMotion(() => {
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      const again = document.getElementById('again');
      if (!again) return;
      const stage = again.querySelector('.again__stage');
      const head = again.querySelector('.again__head');
      const swing = again.querySelector('.again__swing');
      const wheel = again.querySelector('.again__wheel');
      if (!stage || !head || !swing || !wheel) return;
      const cards = [...wheel.querySelectorAll('.partner')];
      again.classList.add('is-wheel');
      cards.forEach((card, index) => card.style.setProperty('--i', index));
      let step = 0, arcTop = 0, radius = 1;
      const measure = () => {
        const width = window.innerWidth, height = stage.offsetHeight;
        const headBottom = head.offsetTop + head.offsetHeight;
        const room = height - headBottom - window.innerHeight * 0.04;
        const targetCard = width * (width < 700 ? 0.7 : 0.28);
        const card = Math.max(180, Math.min(targetCard, Math.max(targetCard * 0.85, (room - 32) / 1.25)));
        arcTop = headBottom + Math.max(28, (room - card * 1.25) * 0.4);
        radius = Math.max(width * 0.95, card * 3.3);
        step = 2 * Math.asin((card + Math.max(18, width * 0.024)) / (2 * radius)) * 180 / Math.PI;
        again.style.setProperty('--card', `${card.toFixed(1)}px`);
        again.style.setProperty('--radius', `${radius.toFixed(1)}px`);
        again.style.setProperty('--step', `${step.toFixed(3)}deg`);
        again.style.setProperty('--arc-top', `${arcTop.toFixed(1)}px`);
        again.style.setProperty('--spin', `${Math.round(cards.length * window.innerHeight * 0.42)}px`);
      };
      measure();
      ScrollTrigger.addEventListener('refreshInit', measure);
      gsap.fromTo(wheel, { rotation: () => step * 0.55 }, { rotation: () => -(cards.length - 0.45) * step, ease: 'none', scrollTrigger: { id: 'again', trigger: again, start: 'top 30%', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true } });
      if (window.adjacent('work', 'again')) {
        gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { id: 'again:entry', trigger: again, start: 'top bottom', end: 'top 30%', scrub: true, invalidateOnRefresh: true } })
          .fromTo(swing, { rotation: () => Math.max(4, Math.asin(Math.min(1, window.innerWidth * 0.3 / radius)) * 180 / Math.PI - step * 0.55) }, { rotation: 0, ease: 'power1.out' }, 0)
          .fromTo(swing, { y: () => -(arcTop - 40) }, { y: 0, ease: 'power2.in' }, 0)
          .fromTo(head, { yPercent: 45 }, { yPercent: 0, ease: 'power2.out' }, 0);
      }
      return () => {
        ScrollTrigger.removeEventListener('refreshInit', measure);
        again.classList.remove('is-wheel');
        ['--card', '--radius', '--step', '--arc-top', '--spin'].forEach(name => again.style.removeProperty(name));
        cards.forEach(card => card.style.removeProperty('--i'));
      };
    });
  }, { id: 'scene:again' });

  // Capabilities Scene
  window.queueMotion(() => {
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      const section = document.getElementById('capabilities');
      if (!section) return;
      const cards = [...section.querySelectorAll('.service')];
      section.classList.add('is-deck');
      cards.forEach((card, index) => card.style.setProperty('--i', index));
      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!next) return;
        gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { id: `capabilities:${index}`, trigger: next, start: 'top bottom', end: () => `top ${parseFloat(getComputedStyle(next).top) || 0}px`, scrub: true, invalidateOnRefresh: true } })
          .to(card, { scale: 0.9 }, 0)
          .to(card.querySelector('.service__shade'), { opacity: 0.55 }, 0);
      });
      return () => { section.classList.remove('is-deck'); cards.forEach(card => card.style.removeProperty('--i')); };
    });
  }, { id: 'scene:capabilities' });

  // Method Scene
  window.queueMotion(() => {
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      const method = document.getElementById('method');
      if (!method) return;
      const steps = [...method.querySelectorAll('.step')];
      const stations = [...method.querySelectorAll('.method__station')];
      method.classList.add('is-cycle');
      const timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { id: 'method', trigger: method.querySelector('.method__steps'), start: 'top 62%', end: 'bottom 62%', scrub: true } });
      timeline.fromTo(method.querySelector('.method__arc'), { attr: { 'stroke-dashoffset': 1 } }, { attr: { 'stroke-dashoffset': 0 }, duration: 1 }, 0)
        .fromTo(method.querySelector('.method__arm'), { rotation: 0 }, { rotation: 360, duration: 1 }, 0);
      steps.forEach((step, index) => {
        const at = index / steps.length;
        timeline.fromTo(step, { opacity: 0.2 }, { opacity: 1, duration: 0.07 }, Math.max(0, at - 0.03));
        if (stations[index]) timeline.fromTo(stations[index], { scale: 0.4 }, { scale: 1.35, duration: 0.05, ease: 'back.out(3)' }, at).to(stations[index], { scale: 1, duration: 0.08 }, at + 0.06);
      });
      return () => method.classList.remove('is-cycle');
    });
  }, { id: 'scene:method' });

  // Studio Scene
  window.queueMotion(() => {
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      const collage = document.querySelector('#studio .studio__collage');
      if (!collage) return;
      const shots = [...collage.querySelectorAll('.shot')];
      const tilt = [-8, 6, -4, 9, -6];
      const offset = (shot, axis) => {
        const centre = axis === 'x' ? collage.offsetWidth / 2 : Math.min(collage.offsetHeight / 2, window.innerHeight * 0.45);
        const own = axis === 'x' ? shot.offsetLeft + shot.offsetWidth / 2 : shot.offsetTop + shot.offsetHeight / 2;
        return centre - own;
      };
      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' }, scrollTrigger: { id: 'studio', trigger: collage, start: 'top 82%', end: () => (window.innerWidth < 900 ? 'top 10%' : 'center 55%'), scrub: true, invalidateOnRefresh: true } });
      shots.forEach((shot, index) => timeline.fromTo(shot, { x: () => offset(shot, 'x'), y: () => offset(shot, 'y'), rotation: tilt[index % tilt.length], scale: 0.66 }, { x: 0, y: 0, rotation: 0, scale: 1, duration: 1 }, (shots.length - 1 - index) * 0.08));
    });
  }, { id: 'scene:studio' });

  // Journal Scene
  window.queueMotion(() => {
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      const journal = document.getElementById('journal');
      if (!journal) return;
      const shots = [...journal.querySelectorAll('.journal__shot')];
      const stories = [...journal.querySelectorAll('.story')];
      journal.classList.add('is-swap');
      stories.forEach((story, index) => {
        const timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { id: `journal:${index}`, trigger: story, start: 'top 84%', end: 'top 50%', scrub: true } });
        timeline.fromTo(story, { opacity: 0.25 }, { opacity: 1, duration: 0.8 }, 0);
        if (index && shots[index]) timeline.fromTo(shots[index], { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)', ease: 'power1.inOut', duration: 1 }, 0);
      });
      return () => journal.classList.remove('is-swap');
    });
  }, { id: 'scene:journal' });

  // Home 2 Contact Scene
  window.queueMotion(() => {
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      const contact = document.getElementById('h2-contact');
      if (!contact) return;
      const voice = contact.querySelector('.contact__voice');
      const dot = contact.querySelector('.contact__title .m-dot');
      const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { id: 'contact', trigger: contact, start: 'top bottom', end: 'top 15%', scrub: true } });
      if (voice) tl.fromTo(voice, { fontWeight: 400, scale: 0.82, transformOrigin: '0% 100%' }, { fontWeight: 800, scale: 1, duration: 1 }, 0);
      if (dot) tl.fromTo(dot, { scale: 0, yPercent: -400 }, { scale: 1, yPercent: 0, duration: 0.25, ease: 'power2.in' }, 0.75);
    });
  }, { id: 'scene:contact' });

  // ---------------------------------------------------------------------------
  // 7. Home 3 Scene Timelines
  // ---------------------------------------------------------------------------
  // Calls Scene
  window.queueMotion(() => {
    const root = document.getElementById('calls');
    if (!root) return;
    const list = root.querySelector('.calls__list');
    if (!list) return;
    const items = [...list.children];
    const device = root.querySelector('.calls__device');
    const steps = items.map((item, index) => [...root.querySelectorAll(`.phone [data-step="${index + 1}"]`)]);
    gsap.matchMedia().add({ wide: '(min-width: 48rem) and (prefers-reduced-motion: no-preference)', narrow: '(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)' }, context => {
      const { wide } = context.conditions;
      const line = wide ? '58%' : '52%';
      const timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { id: 'calls', trigger: items[0], start: `top ${line}`, endTrigger: items[items.length - 1], end: `bottom ${line}`, scrub: true } });
      items.forEach((item, index) => {
        if (index > 0) timeline.fromTo(item, { opacity: 0.32 }, { opacity: 1, duration: 0.25 }, index - 0.1);
        if (index < items.length - 1) timeline.to(item, { opacity: 0.32, duration: 0.25 }, index + 0.9);
        if (steps[index]?.length) timeline.from(steps[index], { opacity: 0, y: 14, scale: 0.94, transformOrigin: '50% 100%', duration: 0.3, stagger: 0.18, ease: 'power2.out' }, index + 0.05);
      });
      timeline.to(items.slice(0, -1), { opacity: 1, duration: 0.3 }, items.length - 0.1);
      if (window.adjacent('calls', 'tune') && device) {
        gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { id: 'calls:exit', trigger: root, start: 'bottom bottom', end: 'bottom 30%', scrub: true, invalidateOnRefresh: true } })
          .to(device, { scale: 0.8, rotation: -7, y: () => -window.innerHeight * (wide ? 0.12 : 0.08) }, 0);
      }
    });
  }, { near: document.getElementById('calls'), id: 'calls' });

  // Tune Scene
  window.queueMotion(() => {
    const root = document.getElementById('tune');
    if (!root) return;
    const stage = root.querySelector('.tune__stage');
    const lines = [...root.querySelectorAll('.tune__line')];
    const sizeFill = root.querySelector('[data-ctl="size"] .tune__fill');
    const sizeThumb = root.querySelector('[data-ctl="size"] .tune__thumb');
    const weightFill = root.querySelector('[data-ctl="weight"] .tune__fill');
    const weightThumb = root.querySelector('[data-ctl="weight"] .tune__thumb');
    const pill = root.querySelector('[data-ctl="contrast"] .tune__pill');
    if (!stage) return;
    const tokens = getComputedStyle(document.documentElement);
    const paper = tokens.getPropertyValue('--color-2').trim() || '#faf5f0';
    const ink = tokens.getPropertyValue('--color-1').trim() || '#1b1411';
    const offset = (element, stop) => {
      let x = 0, y = 0;
      for (let node = element; node && node !== stop; node = node.offsetParent) { x += node.offsetLeft; y += node.offsetTop; }
      return { x, y };
    };
    gsap.matchMedia().add({ wide: '(min-width: 48rem) and (prefers-reduced-motion: no-preference)', narrow: '(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)' }, () => {
      if (window.adjacent('calls', 'tune')) {
        const calls = document.getElementById('calls');
        if (calls) {
          const aside = calls.querySelector('.calls__aside');
          const sticky = calls.querySelector('.calls__sticky');
          const screen = calls.querySelector('.phone__screen');
          if (aside && sticky && screen) {
            let geometry;
            const measure = () => {
              const startScroll = offset(root).y - window.innerHeight;
              const asideAt = offset(aside);
              const style = getComputedStyle(sticky);
              const released = asideAt.y + aside.offsetHeight - sticky.offsetHeight - startScroll;
              const fromBottom = style.top === 'auto' && style.bottom !== 'auto';
              const stickyY = fromBottom
                ? Math.min(released, window.innerHeight - (parseFloat(style.bottom) || 0) - sticky.offsetHeight)
                : Math.min(Math.max(asideAt.y - startScroll, parseFloat(style.top) || 0), released);
              const inner = offset(screen, sticky);
              const screenX = asideAt.x + inner.x + screen.offsetWidth / 2;
              const screenY = stickyY + inner.y + screen.offsetHeight / 2;
              const stageAt = offset(stage);
              geometry = {
                x: screenX - (stageAt.x + stage.offsetWidth / 2),
                y: screenY - (stageAt.y - startScroll + stage.offsetHeight / 2),
                scale: window.innerWidth < 768 ? 0.12 : Math.max(0.16, screen.offsetWidth / stage.offsetWidth)
              };
              return geometry.x;
            };
            gsap.timeline({ scrollTrigger: { id: 'tune:entry', trigger: root, start: 'top bottom', end: 'top 30%', scrub: true, invalidateOnRefresh: true } })
              .fromTo(stage, { scale: 0 }, { scale: () => (measure(), geometry.scale), ease: 'none', duration: 0.02, immediateRender: false }, 0)
              .fromTo(stage, { x: measure, y: () => geometry.y, scale: () => geometry.scale }, { x: 0, y: 0, scale: 1, ease: 'power1.inOut', duration: 0.98, immediateRender: false }, 0.02)
              .fromTo(stage, { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none', duration: 0.1, immediateRender: false }, 0);
          }
        }
      }
      const track = element => (element && element.parentElement ? element.parentElement.offsetWidth : 100);
      const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { id: 'tune', trigger: root, start: 'top 30%', end: 'top -45%', scrub: true, invalidateOnRefresh: true } });
      if (lines.length) tl.fromTo(lines, { fontVariationSettings: '"wght" 300', scale: 0.8 }, { fontVariationSettings: '"wght" 800', scale: 1, duration: 1 }, 0);
      if (sizeFill) tl.fromTo(sizeFill, { scaleX: 0.3 }, { scaleX: 0.75, duration: 1 }, 0);
      if (sizeThumb) tl.fromTo(sizeThumb, { x: () => -0.45 * track(sizeThumb) }, { x: 0, duration: 1 }, 0);
      if (weightFill) tl.fromTo(weightFill, { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);
      if (weightThumb) tl.fromTo(weightThumb, { x: () => -0.6 * track(weightThumb) }, { x: () => 0.4 * track(weightThumb), duration: 1 }, 0);
      tl.fromTo(stage, { backgroundColor: paper, color: ink }, { backgroundColor: ink, color: paper, duration: 0.3 }, 1.05);
      if (pill) tl.fromTo(pill, { xPercent: -100 }, { xPercent: 0, duration: 0.3 }, 1.05);
      if (lines.length) tl.to(lines, { fontVariationSettings: '"wght" 600', duration: 0.8 }, 1.45);
      if (weightFill) tl.to(weightFill, { scaleX: 0.6, duration: 0.8 }, 1.45);
      if (weightThumb) tl.to(weightThumb, { x: 0, duration: 0.8 }, 1.45);
    });
  }, { near: document.getElementById('tune'), id: 'tune' });

  // Rooms Horizontal Pinning Scene
  window.queueMotion(() => {
    const root = document.getElementById('rooms');
    if (!root) return;
    const hold = root.querySelector('.rooms__hold');
    const track = root.querySelector('.rooms__track');
    if (!hold || !track) return;
    const places = [...track.querySelectorAll('.rooms__place')];
    const lines = root.querySelectorAll('.rooms__line');
    gsap.matchMedia().add({ wide: '(min-width: 48rem) and (prefers-reduced-motion: no-preference)', narrow: '(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)' }, context => {
      const { wide } = context.conditions;
      root.classList.add('is-track');
      const travel = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const setTravel = () => gsap.set(root, { '--rooms-travel': `${travel()}px` });
      setTravel();
      ScrollTrigger.addEventListener('refreshInit', setTravel);
      const lead = () => Math.min(0.9, (window.innerWidth * 0.6) / track.scrollWidth);
      const main = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { id: 'rooms', trigger: hold, start: 'top top', end: 'bottom bottom', scrub: true, invalidateOnRefresh: true } });
      main.fromTo(track, { x: 0 }, { x: () => -travel(), duration: 1 }, 0)
        .fromTo(lines, { strokeDasharray: 1, strokeDashoffset: () => 1 - lead() }, { strokeDashoffset: 0, duration: 1 }, 0);
      places.forEach((place, index) => {
        const image = place.querySelector('img');
        const talk = place.querySelectorAll('.rooms__talk > *');
        if (image) gsap.fromTo(image, { xPercent: 7 }, { xPercent: 0, ease: 'none', scrollTrigger: { id: `rooms:photo-${index}`, trigger: place, containerAnimation: main, start: 'left right', end: wide ? 'left 66%' : 'left 40%', scrub: true } });
        if (talk.length) gsap.fromTo(talk, { y: 36, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', stagger: 0.3, scrollTrigger: { id: `rooms:talk-${index}`, trigger: place, containerAnimation: main, start: wide ? 'left 100%' : 'left 100%', end: wide ? 'left 66%' : 'left 40%', scrub: true } });
      });
      return () => {
        ScrollTrigger.removeEventListener('refreshInit', setTravel);
        root.classList.remove('is-track');
      };
    });
  }, { id: 'rooms' });

  // Voices Stagger Scene
  window.queueMotion(() => {
    const root = document.getElementById('voices');
    if (!root) return;
    const colsBox = root.querySelector('.voices__cols');
    const cols = [...root.querySelectorAll('.voices__col')];
    const cards = [...root.querySelectorAll('.voices__col > li')];
    const photo = root.querySelector('.voices__photo img');
    gsap.matchMedia().add({ wide: '(min-width: 48rem) and (prefers-reduced-motion: no-preference)', narrow: '(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)' }, context => {
      const { wide } = context.conditions;
      if (wide && colsBox) {
        cols.forEach((col, index) => gsap.fromTo(col, { y: () => window.innerHeight * (index ? 0.42 : 0.14) }, { y: 0, ease: 'none', scrollTrigger: { id: `voices:col-${index}`, trigger: colsBox, start: 'top bottom', end: 'top 18%', scrub: true, invalidateOnRefresh: true } }));
      } else {
        cards.forEach((card, index) => gsap.fromTo(card, { y: () => window.innerHeight * (index % 2 ? 0.16 : 0.06), x: index % 2 ? 28 : -28 }, { y: 0, x: 0, ease: 'none', scrollTrigger: { id: `voices:card-${index}`, trigger: card, start: 'top bottom', end: 'top 58%', scrub: true, invalidateOnRefresh: true } }));
      }
      if (photo) gsap.fromTo(photo, { scale: 1.2 }, { scale: 1, ease: 'none', scrollTrigger: { id: 'voices:photo', trigger: photo.parentElement, start: 'top bottom', end: 'center 50%', scrub: true } });
    });
  }, { near: document.getElementById('voices'), id: 'voices' });

  // Setup Stacked Cards Scene
  window.queueMotion(() => {
    const root = document.getElementById('setup');
    if (!root) return;
    const steps = root.querySelector('.setup__steps');
    if (!steps) return;
    const cards = [...steps.children];
    gsap.matchMedia().add({ wide: '(min-width: 48rem) and (prefers-reduced-motion: no-preference)', narrow: '(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)' }, () => {
      root.classList.add('is-stacked');
      const gap = () => parseFloat(getComputedStyle(steps).rowGap) || 0;
      const natural = index => cards.slice(0, index).reduce((sum, card) => sum + card.offsetHeight + gap(), 0);
      const stuck = index => parseFloat(getComputedStyle(cards[index]).top) || 0;
      cards.slice(0, -1).forEach((card, index) => {
        gsap.fromTo(card, { scale: 1, filter: 'brightness(1)' }, { scale: 0.92, filter: 'brightness(0.68)', ease: 'none', scrollTrigger: { id: `setup:${index}`, trigger: steps, start: () => `top+=${natural(index + 1)} bottom`, end: () => `top+=${natural(index + 1)} ${stuck(index + 1)}px`, scrub: true, invalidateOnRefresh: true } });
      });
      return () => root.classList.remove('is-stacked');
    });
  }, { id: 'setup' });

  // Start Scene
  window.queueMotion(() => {
    const root = document.getElementById('start');
    if (!root) return;
    const frame = root.querySelector('.start__window');
    const image = frame ? frame.querySelector('img') : null;
    const heading = root.querySelector('.start__copy h2');
    if (!frame || !image) return;
    gsap.matchMedia().add({ wide: '(min-width: 48rem) and (prefers-reduced-motion: no-preference)', narrow: '(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)' }, context => {
      const { wide } = context.conditions;
      const radius = restRadius(frame);
      const sideX = wide ? 31 : 12;
      const sideY = wide ? 15 : 22;
      gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { id: 'start', trigger: frame, start: 'top 92%', end: 'top 10%', scrub: true } })
        .fromTo(frame, { clipPath: `inset(${sideY}% ${sideX}% ${sideY}% ${sideX}% round ${radius * 3}px)` }, { clipPath: `inset(0% 0% 0% 0% round ${radius}px)` }, 0)
        .fromTo(image, { scale: 1.32 }, { scale: 1 }, 0);
      if (heading) {
        root.classList.add('is-transcribing');
        ScrollTrigger.create({ id: 'start:words', trigger: heading, start: 'top 96%', end: 'bottom 64%', scrub: true, animation: transcribe(heading, 'start__word') });
      }
      return () => root.classList.remove('is-transcribing');
    });
  }, { near: document.getElementById('start'), id: 'start' });

})();
