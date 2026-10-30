"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import "@/styles/home-merged.css";
import { MergedHeader } from "@/components/navigation/MergedHeader";
import { Footer } from "@/components/layout/Footer";

export function MergedHomepage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isDisposed = false;
    let lenisInstance: any = null;
    let gsapContext: any = null;
    let resizeHandler: (() => void) | null = null;
    let refreshInitHandler: (() => void) | null = null;

    // 1. Form handlers
    const h2Form = document.querySelector("#h2-contact .contact__form") as HTMLFormElement | null;
    const h2Status = h2Form?.querySelector(".contact__status");
    const handleH2Submit = (e: Event) => {
      e.preventDefault();
      if (!h2Form || !h2Status) return;
      const ok = h2Form.checkValidity();
      h2Status.textContent = ok
        ? (h2Status as HTMLElement).dataset.success || "Thank you. Our marketing team will review your enquiry and reply within 24 hours."
        : (h2Status as HTMLElement).dataset.error || "Please add your name, a valid email, and details about your marketing goals.";
      if (ok) h2Form.reset();
      else (h2Form.querySelector(":invalid") as HTMLElement)?.focus();
    };
    h2Form?.addEventListener("submit", handleH2Submit);

    const contactForm = document.getElementById("contact-form") as HTMLFormElement | null;
    const contactStatus = contactForm?.querySelector(".contact__status");
    const handleContactSubmit = (e: Event) => {
      e.preventDefault();
      if (!contactForm || !contactStatus) return;
      const valid = contactForm.checkValidity();
      contactStatus.textContent = valid
        ? contactForm.dataset.msgOk || "Thanks — our marketing team will review your enquiry and write back within 24 hours."
        : contactForm.dataset.msgError || "Please add your name, a valid email and a short message.";
      if (valid) contactForm.reset();
      else (contactForm.querySelector(":invalid") as HTMLElement)?.focus();
    };
    contactForm?.addEventListener("submit", handleContactSubmit);

    // 2. Measure nav height helper
    const bar = document.querySelector("#nav .nav__bar") as HTMLElement | null;
    const measureNav = () => {
      if (bar) {
        document.documentElement.style.setProperty(
          "--page-nav-h",
          `${Math.ceil(bar.getBoundingClientRect().bottom + 12)}px`
        );
      }
    };
    measureNav();
    window.addEventListener("resize", measureNav);

    // 3. Hero offscreen IntersectionObserver
    const hero = document.getElementById("h2-hero");
    let heroObserver: IntersectionObserver | null = null;
    if (hero && "IntersectionObserver" in window) {
      heroObserver = new IntersectionObserver(([entry]) => {
        hero.classList.toggle("is-offscreen", !entry.isIntersecting);
      });
      heroObserver.observe(hero);
    }

    // 4. Progressive Animation Engine (Restored from home-merged.html)
    const contexts: any[] = [];
    const observers: IntersectionObserver[] = [];
    const refreshInitHandlers: (() => void)[] = [];

    const startAnimations = async () => {
      // Wait for libraries to be available on window
      let attempts = 0;
      while ((!(window as any).gsap || !(window as any).ScrollTrigger) && attempts < 50) {
        if (isDisposed) return;
        await new Promise(r => setTimeout(r, 100));
        attempts++;
      }

      if (isDisposed) return;

      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      const Lenis = (window as any).Lenis;
      let SplitText = (window as any).SplitText;

      if (!gsap || !ScrollTrigger) return;

      // Register plugins
      if (SplitText) {
        gsap.registerPlugin(ScrollTrigger, SplitText);
      } else {
        gsap.registerPlugin(ScrollTrigger);
      }

      // Fallback for SplitText if needed
      if (!SplitText) {
        SplitText = {
          create(element: HTMLElement, options: any = {}) {
            const originalHTML = element.innerHTML;
            const words: HTMLElement[] = [];
            const lines: HTMLElement[] = [];

            if (options.type === "lines") {
              const lineDiv = document.createElement("div");
              lineDiv.className = "split-line";
              lineDiv.style.display = "block";
              lineDiv.style.overflow = "hidden";
              lineDiv.innerHTML = originalHTML;
              element.innerHTML = "";
              element.appendChild(lineDiv);
              lines.push(lineDiv);
            } else {
              const text = element.innerText || "";
              element.innerHTML = "";
              const parts = text.split(/\s+/);
              parts.forEach((word) => {
                const span = document.createElement("span");
                span.className = options.wordsClass || "split-word";
                span.style.display = "inline-block";
                span.textContent = word + " ";
                element.appendChild(span);
                words.push(span);
              });
            }

            return {
              words,
              lines,
              revert() {
                element.innerHTML = originalHTML;
              }
            };
          }
        };
      }

      // Initialize Lenis Smooth Scroll
      if (Lenis) {
        lenisInstance = new Lenis({
          lerp: 0.085,
          anchors: { offset: -(bar ? Math.ceil(bar.getBoundingClientRect().bottom) : 0) }
        });
        (window as any).lenis = lenisInstance;

        const tick = (time: number) => {
          if (lenisInstance) lenisInstance.raf(time * 1000);
        };
        lenisInstance.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }

      // Global Scroll Helpers
      const refreshScroll = () => {
        measureNav();
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      };
      (window as any).refreshScroll = refreshScroll;

      // Geometry & Text Helpers
      function layoutBox(element: HTMLElement) {
        let x = 0, y = 0, node: HTMLElement | null = element;
        while (node) {
          x += node.offsetLeft;
          y += node.offsetTop;
          node = node.offsetParent as HTMLElement | null;
        }
        return {
          x,
          y,
          w: element.offsetWidth,
          h: element.offsetHeight,
          cx: x + element.offsetWidth / 2,
          cy: y + element.offsetHeight / 2
        };
      }

      function restRadius(element: HTMLElement) {
        return parseFloat((getComputedStyle(element).clipPath.match(/round\s+([\d.]+)px/) || [])[1]) || 0;
      }

      function transcribe(element: HTMLElement, wordsClass: string) {
        const split = SplitText.create(element, { type: "words", wordsClass });
        return gsap.fromTo(split.words, { "--bar": 1 }, { "--bar": 0, ease: "none", stagger: 0.16, duration: 0.5 });
      }

      function splitWords(element: HTMLElement) {
        const original = element.innerHTML;
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        const nodes: Node[] = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(node => {
          const fragment = document.createDocumentFragment();
          (node.textContent || "").split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { fragment.append(part); return; }
            const word = document.createElement("span");
            word.className = "ink__word";
            word.textContent = part;
            fragment.append(word);
          });
          node.parentNode?.replaceChild(fragment, node);
        });
        return () => { element.innerHTML = original; };
      }

      const adjacent = (a: string, b: string) => {
        const order = [...document.querySelectorAll("[data-8b-section]")]
          .filter(section => section.getAttribute("data-8b-section") !== "navigation")
          .map(section => section.id);
        return order.indexOf(a) >= 0 && order[order.indexOf(a) + 1] === b;
      };

      // Effects Definitions
      const captionPlayed = new WeakSet();
      const effects = {
        rise(element: HTMLElement, vars = {}) {
          const dot = element.querySelector(".m-dot");
          const timeline = gsap.timeline(vars);
          timeline.fromTo(
            element,
            { yPercent: 38, clipPath: "inset(0% -6% 100% -6%)" },
            { yPercent: 0, clipPath: "inset(-30% -6% -30% -6%)", duration: 0.95, ease: "expo.out", clearProps: "clipPath,transform" },
            0
          );
          if (dot) {
            timeline.fromTo(
              dot,
              { scale: 0, yPercent: -260 },
              { scale: 1, yPercent: 0, duration: 0.75, ease: "back.out(2.2)", clearProps: "transform" },
              0.42
            );
          }
          return timeline;
        },
        ink(element: HTMLElement, vars = {}) {
          const words = element.querySelectorAll(".ink__word");
          return gsap.timeline(vars).fromTo(words, { opacity: 0.16 }, { opacity: 1, duration: 0.3, stagger: 0.06, ease: "none" });
        },
        iris(element: HTMLElement, vars = {}) {
          const image = element.querySelector("img");
          const timeline = gsap.timeline(vars);
          timeline.fromTo(
            element,
            { clipPath: "circle(0% at 50% 50%)" },
            { clipPath: "circle(75% at 50% 50%)", duration: 1.15, ease: "expo.inOut", clearProps: "clipPath" },
            0
          );
          if (image) timeline.fromTo(image, { scale: 1.2 }, { scale: 1, duration: 1.5, ease: "expo.out", clearProps: "transform" }, 0.15);
          return timeline;
        },
        captionIn(element: HTMLElement, vars = {}) {
          const split = SplitText.create(element, { type: "lines", mask: "lines" });
          return gsap.timeline({ ...vars, onComplete: () => split.revert() })
            .from(split.lines, { yPercent: 108, duration: 1, ease: "expo.out", stagger: 0.09 });
        },
        readAlong(element: HTMLElement, vars = {}) {
          const split = SplitText.create(element, { type: "words" });
          const ink = getComputedStyle(element).color;
          const faint = ink.replace(/^rgb\((.+)\)$/, "rgba($1, 0.22)");
          const targetFaint = faint !== ink ? faint : "rgba(27, 20, 17, 0.22)";
          return gsap.fromTo(split.words, { color: targetFaint }, { color: ink, ease: "none", stagger: 0.12, duration: 0.6, ...vars });
        },
        bandRise(sheet: HTMLElement, vars = {}) {
          const radius = restRadius(sheet);
          const side = window.innerWidth < 768 ? 2.5 : 4;
          const big = Math.round(radius * 2.6);
          return gsap.fromTo(
            sheet,
            { clipPath: `inset(0% ${side}% 0% ${side}% round ${big}px ${big}px 0px 0px)` },
            { clipPath: `inset(0% 0% 0% 0% round ${radius}px ${radius}px 0px 0px)`, ease: "none", ...vars }
          );
        }
      };

      // Queue Motion Engine
      const fontsReady: Promise<void> = document.fonts ? document.fonts.ready.then(() => {}) : Promise.resolve();
      const parsedReady = document.readyState === "loading"
        ? new Promise(resolve => document.addEventListener("DOMContentLoaded", resolve, { once: true }))
        : Promise.resolve();
      const ready = () => Promise.all([fontsReady, parsedReady]).then(() => firsts);
      const nextTask = () => (window as any).scheduler?.yield?.() ?? new Promise(resolve => setTimeout(resolve, 0));

      const run = (setup: () => void | (() => void), name: string) => {
        if (isDisposed) return false;
        for (const trigger of ScrollTrigger.getAll() || []) {
          if (!trigger.end && ScrollTrigger.getAll().includes(trigger)) trigger.refresh(0, 1);
        }
        const ctx = gsap.context(() => {});
        contexts.push(ctx);
        const log = new MutationObserver(() => {});
        log.observe(document.documentElement, { attributes: true, attributeOldValue: true, subtree: true });
        let failure: any = null;
        let records: MutationRecord[] = [];
        try {
          ctx.add(() => {
            try {
              const cleanup = setup();
              if (typeof cleanup === "function") {
                (ctx as any)._customCleanup = cleanup;
              }
            } catch (err) {
              failure = err;
            }
          });
        } finally {
          records = log.takeRecords();
          log.disconnect();
        }
        if (!failure) return true;
        try { ctx.revert(); } catch (e) { console.error(name, "revert failed", e); }
        for (const { target, attributeName, oldValue } of records.reverse()) {
          if (attributeName) {
            const now = (target as Element).getAttribute(attributeName);
            if (oldValue == null) {
              if (now != null) (target as Element).removeAttribute(attributeName);
            } else if (now !== oldValue) {
              (target as Element).setAttribute(attributeName, oldValue);
            }
          }
        }
        console.error(name, failure);
        return false;
      };

      let firsts: Promise<any> = Promise.resolve();
      let tail: Promise<any> | null = null;
      let pending = 0;
      let lazy: Promise<any> | null = null;
      let building = 0;

      const queueMotion = (setup: () => void | (() => void), { first = false, near = null as Element | null, id = "" } = {}) => {
        if (!gsap || typeof setup !== "function" || isDisposed) return;
        const name = id || "motion";
        if (near instanceof Element && "IntersectionObserver" in window) {
          const watch = new IntersectionObserver(entries => {
            if (!entries.some(entry => entry.isIntersecting)) return;
            watch.disconnect();
            building++;
            lazy = (lazy || ready()).then(nextTask).then(() => run(setup, name)).finally(() => {
              if (!--building) refreshScroll();
            });
          }, { rootMargin: "100% 0px" });
          watch.observe(near);
          observers.push(watch);
          return;
        }
        if (first) {
          firsts = firsts.then(() => fontsReady).then(() => {
            if (!run(setup, name)) refreshScroll();
          });
        } else {
          pending++;
          tail = (tail || ready()).then(nextTask).then(() => run(setup, name)).finally(() => {
            if (!--pending) refreshScroll();
          });
        }
      };

      // --- Motion H2: Rise, Ink, Iris ---
      document.querySelectorAll("#home-2-scope [data-8b-section]").forEach(section => {
        const bound = (name: string) => [...section.querySelectorAll(`[data-8b-motion~="${name}"]`)] as HTMLElement[];
        const rise = bound("rise"), ink = bound("ink"), iris = bound("iris");
        if (!rise.length && !ink.length && !iris.length) return;
        const first = section.getBoundingClientRect().top < window.innerHeight;

        if (rise.length) {
          queueMotion(() => {
            return gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
              rise.forEach((el, idx) => ScrollTrigger.create({ id: `effect:rise:${section.id}:${idx}`, trigger: el, start: "top 88%", once: true, animation: effects.rise(el, { paused: true }) }));
            });
          }, { first, id: `effect:rise:${section.id}` });
        }
        if (ink.length) {
          queueMotion(() => {
            return gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
              const reverts = ink.map(splitWords);
              ink.forEach((el, idx) => ScrollTrigger.create({ id: `effect:ink:${section.id}:${idx}`, trigger: el, start: "top 88%", end: "bottom 68%", scrub: 0.4, animation: effects.ink(el) }));
              return () => reverts.forEach(r => r());
            });
          }, { first, id: `effect:ink:${section.id}` });
        }
        if (iris.length) {
          queueMotion(() => {
            return gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
              iris.forEach((el, idx) => ScrollTrigger.create({ id: `effect:iris:${section.id}:${idx}`, trigger: el, start: "top 86%", once: true, animation: effects.iris(el, { paused: true }) }));
            });
          }, { first, id: `effect:iris:${section.id}` });
        }
      });

      // --- Motion H3: CaptionIn, ReadAlong, BandRise ---
      document.querySelectorAll("#home-3-scope [data-8b-section]").forEach(section => {
        const first = () => section.getBoundingClientRect().top < window.innerHeight;
        const timing = (id: string) => (first() ? { first: true, id } : { near: section, id });

        const headings = section.querySelectorAll('[data-8b-motion~="captionIn"]') as NodeListOf<HTMLElement>;
        if (headings.length) {
          const id = `effect:captionIn:${section.id}`;
          queueMotion(() => {
            return gsap.matchMedia().add({ wide: "(min-width: 48rem) and (prefers-reduced-motion: no-preference)", narrow: "(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)" }, () => {
              headings.forEach((heading, idx) => {
                if (captionPlayed.has(heading)) return;
                const timeline = effects.captionIn(heading, { paused: true });
                ScrollTrigger.create({ id: `${id}:${idx}`, trigger: heading, start: "top 88%", once: true, onEnter: () => { captionPlayed.add(heading); timeline.play(); } });
              });
            });
          }, timing(id));
        }

        const reads = section.querySelectorAll('[data-8b-motion~="readAlong"]') as NodeListOf<HTMLElement>;
        if (reads.length) {
          const id = `effect:readAlong:${section.id}`;
          queueMotion(() => {
            return gsap.matchMedia().add({ wide: "(min-width: 48rem) and (prefers-reduced-motion: no-preference)", narrow: "(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)" }, () => {
              reads.forEach((el, idx) => ScrollTrigger.create({ id: `${id}:${idx}`, trigger: el, start: "top 88%", end: "bottom 60%", scrub: true, animation: effects.readAlong(el) }));
            });
          }, timing(id));
        }

        const bands = section.querySelectorAll('[data-8b-motion~="bandRise"]') as NodeListOf<HTMLElement>;
        if (bands.length) {
          const id = `effect:bandRise:${section.id}`;
          queueMotion(() => {
            return gsap.matchMedia().add({ wide: "(min-width: 48rem) and (prefers-reduced-motion: no-preference)", narrow: "(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)" }, () => {
              bands.forEach((sheet, idx) => ScrollTrigger.create({ id: `${id}:${idx}`, trigger: section, start: "top bottom", end: "top 25%", scrub: true, animation: effects.bandRise(sheet) }));
            });
          }, timing(id));
        }
      });

      // --- Scene: Hero Exit into Statement Dot ---
      queueMotion(() => {
        return gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
          if (!adjacent("h2-hero", "statement")) return;
          const heroEl = document.getElementById("h2-hero");
          const target = document.getElementById("statement")?.querySelector(".statement__dot") as HTMLElement | null;
          const aperture = heroEl?.querySelector(".hero__aperture") as HTMLElement | null;
          if (!heroEl || !target || !aperture) return;

          const geometry = () => {
            const from = layoutBox(aperture), to = layoutBox(target);
            return { x: to.cx - from.cx, y: to.cy - from.cy, scale: to.w / from.w };
          };
          gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { id: "h2-hero:exit", trigger: heroEl, start: "bottom bottom", end: "bottom 30%", scrub: true, invalidateOnRefresh: true } })
            .to(aperture, { x: () => geometry().x, y: () => geometry().y, ease: "power1.inOut", duration: 1 }, 0)
            .to(aperture, { scale: () => geometry().scale, ease: "power3.in", duration: 1 }, 0)
            .to(heroEl.querySelector(".hero__tint"), { opacity: 1, ease: "power2.in", duration: 0.6 }, 0.4)
            .to(heroEl.querySelectorAll(".hero__orbit, .hero__glow"), { opacity: 0, duration: 0.3 }, 0)
            .to(heroEl.querySelector(".hero__word"), { xPercent: () => (matchMedia("(min-width: 900px) and (orientation: landscape)").matches ? -14 : 0), ease: "power1.in", duration: 1 }, 0)
            .to(heroEl.querySelector(".hero__intro"), { y: -70, ease: "power1.in", duration: 1 }, 0);
        });
      }, { first: true, id: "scene:hero" });

      // --- Scene: Statement ---
      queueMotion(() => {
        return gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
          const statement = document.getElementById("statement");
          if (!statement) return;
          const lines = statement.querySelectorAll(".statement__line");
          if (adjacent("h2-hero", "statement")) {
            const dot = statement.querySelector(".statement__dot");
            const entryTimeline = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { id: "statement:entry", trigger: statement, start: "top bottom", end: "top 30%", scrub: true } });
            if (lines.length) {
              entryTimeline.fromTo(lines, { yPercent: 85, xPercent: (index: number) => (index ? 9 : -6) }, { yPercent: 0, xPercent: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" }, 0);
            }
            if (dot) {
              entryTimeline.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.1 }, 0.9);
            }
          }
          const items = statement.querySelectorAll(".statement__index li");
          const indexTrigger = statement.querySelector(".statement__index");
          if (items.length && indexTrigger) {
            gsap.from(items, { yPercent: 70, opacity: 0, duration: 0.8, stagger: 0.07, ease: "expo.out", scrollTrigger: { id: "statement:index", trigger: indexTrigger, start: "top 85%", once: true } });
          }
        });
      }, { id: "scene:statement" });

      // --- Scene: Work ---
      queueMotion(() => {
        return gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
          const work = document.getElementById("work");
          if (!work) return;
          const track = work.querySelector(".work__track") as HTMLElement | null;
          const frame = work.querySelector(".work__window") as HTMLElement | null;
          const stage = work.querySelector(".work__stage") as HTMLElement | null;
          if (!track || !frame || !stage) return;

          work.classList.add("is-track");
          const run = () => Math.max(0, track.offsetWidth - (work.clientWidth - 2 * parseFloat(getComputedStyle(stage).paddingLeft)));
          const setRun = () => work.style.setProperty("--run", `${Math.round(run())}px`);
          setRun();
          ScrollTrigger.addEventListener("refreshInit", setRun);
          refreshInitHandlers.push(setRun);

          const plate = work.querySelector(".work__plate");
          if (plate) {
            gsap.fromTo(
              plate,
              { clipPath: "inset(0% 3.2% 0% 3.2% round 44px)" },
              { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power1.out", scrollTrigger: { id: "work:plate", trigger: work, start: "top bottom", end: "top 15%", scrub: true } }
            );
          }

          const timeline = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { id: "work", trigger: work, start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true } });
          timeline.to(track, { x: () => -run() }, 0);
          work.querySelectorAll(".case__img").forEach(image => timeline.fromTo(image, { xPercent: -5 }, { xPercent: 5 }, 0));

          if (adjacent("work", "again")) {
            const cases = [...track.querySelectorAll(".case")] as HTMLElement[];
            const radius = () => (window.innerWidth < 700 ? window.innerWidth * 2.1 : window.innerWidth * 0.95);
            const bend = (card: HTMLElement) => {
              const offset = layoutBox(frame).x + card.offsetLeft + card.offsetWidth / 2 - run() - window.innerWidth / 2;
              const angle = offset / radius();
              return { x: radius() * Math.sin(angle) - offset, y: radius() * (1 - Math.cos(angle)), rotation: angle * 180 / Math.PI };
            };
            const exit = gsap.timeline({ defaults: { ease: "power1.in" }, scrollTrigger: { id: "work:exit", trigger: work, start: "bottom bottom", end: "bottom 30%", scrub: true, invalidateOnRefresh: true } });
            exit.to(frame, { x: () => -window.innerWidth * 0.2, duration: 1 }, 0);
            cases.forEach(card => exit.to(card, { x: () => bend(card).x, y: () => bend(card).y, rotation: () => bend(card).rotation, duration: 1 }, 0));
          }

          return () => {
            work.classList.remove("is-track");
            work.style.removeProperty("--run");
            ScrollTrigger.removeEventListener("refreshInit", setRun);
          };
        });
      }, { id: "scene:work" });

      // --- Scene: Again ---
      queueMotion(() => {
        return gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
          const again = document.getElementById("again");
          if (!again) return;
          const stage = again.querySelector(".again__stage") as HTMLElement | null;
          const head = again.querySelector(".again__head") as HTMLElement | null;
          const swing = again.querySelector(".again__swing") as HTMLElement | null;
          const wheel = again.querySelector(".again__wheel") as HTMLElement | null;
          const cards = wheel ? [...wheel.querySelectorAll(".partner")] as HTMLElement[] : [];
          if (!stage || !head || !swing || !wheel || !cards.length) return;

          again.classList.add("is-wheel");
          cards.forEach((card, index) => card.style.setProperty("--i", `${index}`));
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
            again.style.setProperty("--card", `${card.toFixed(1)}px`);
            again.style.setProperty("--radius", `${radius.toFixed(1)}px`);
            again.style.setProperty("--step", `${step.toFixed(3)}deg`);
            again.style.setProperty("--arc-top", `${arcTop.toFixed(1)}px`);
            again.style.setProperty("--spin", `${Math.round(cards.length * window.innerHeight * 0.42)}px`);
          };
          measure();
          ScrollTrigger.addEventListener("refreshInit", measure);
          refreshInitHandlers.push(measure);

          gsap.fromTo(
            wheel,
            { rotation: () => step * 0.55 },
            { rotation: () => -(cards.length - 0.45) * step, ease: "none", scrollTrigger: { id: "again", trigger: again, start: "top 30%", end: "bottom bottom", scrub: true, invalidateOnRefresh: true } }
          );

          if (adjacent("work", "again")) {
            gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { id: "again:entry", trigger: again, start: "top bottom", end: "top 30%", scrub: true, invalidateOnRefresh: true } })
              .fromTo(swing, { rotation: () => Math.max(4, Math.asin(Math.min(1, window.innerWidth * 0.3 / radius)) * 180 / Math.PI - step * 0.55) }, { rotation: 0, ease: "power1.out" }, 0)
              .fromTo(swing, { y: () => -(arcTop - 40) }, { y: 0, ease: "power2.in" }, 0)
              .fromTo(head, { yPercent: 45 }, { yPercent: 0, ease: "power2.out" }, 0);
          }

          return () => {
            ScrollTrigger.removeEventListener("refreshInit", measure);
            again.classList.remove("is-wheel");
            ["--card", "--radius", "--step", "--arc-top", "--spin"].forEach(name => again.style.removeProperty(name));
            cards.forEach(card => card.style.removeProperty("--i"));
          };
        });
      }, { id: "scene:again" });

      // --- Scene: Capabilities ---
      queueMotion(() => {
        return gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
          const section = document.getElementById("capabilities");
          if (!section) return;
          const cards = [...section.querySelectorAll(".service")] as HTMLElement[];
          section.classList.add("is-deck");
          cards.forEach((card, index) => card.style.setProperty("--i", `${index}`));
          cards.forEach((card, index) => {
            const next = cards[index + 1];
            if (!next) return;
            gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { id: `capabilities:${index}`, trigger: next, start: "top bottom", end: () => `top ${parseFloat(getComputedStyle(next).top) || 0}px`, scrub: true, invalidateOnRefresh: true } })
              .to(card, { scale: 0.9 }, 0)
              .to(card.querySelector(".service__shade"), { opacity: 0.55 }, 0);
          });
          return () => {
            section.classList.remove("is-deck");
            cards.forEach(card => card.style.removeProperty("--i"));
          };
        });
      }, { id: "scene:capabilities" });

      // --- Scene: Method ---
      queueMotion(() => {
        return gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
          const method = document.getElementById("method");
          if (!method) return;
          const steps = [...method.querySelectorAll(".step")];
          const stations = [...method.querySelectorAll(".method__station")];
          method.classList.add("is-cycle");
          const timeline = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { id: "method", trigger: method.querySelector(".method__steps"), start: "top 62%", end: "bottom 62%", scrub: true } });
          const arc = method.querySelector(".method__arc");
          const arm = method.querySelector(".method__arm");
          if (arc) timeline.fromTo(arc, { attr: { "stroke-dashoffset": 1 } }, { attr: { "stroke-dashoffset": 0 }, duration: 1 }, 0);
          if (arm) timeline.fromTo(arm, { rotation: 0 }, { rotation: 360, duration: 1 }, 0);
          steps.forEach((step, index) => {
            const at = index / steps.length;
            timeline.fromTo(step, { opacity: 0.2 }, { opacity: 1, duration: 0.07 }, Math.max(0, at - 0.03));
            if (stations[index]) timeline.fromTo(stations[index], { scale: 0.4 }, { scale: 1.35, duration: 0.05, ease: "back.out(3)" }, at).to(stations[index], { scale: 1, duration: 0.08 }, at + 0.06);
          });
          return () => method.classList.remove("is-cycle");
        });
      }, { id: "scene:method" });

      // --- Scene: Studio ---
      queueMotion(() => {
        return gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
          const collage = document.querySelector("#studio .studio__collage") as HTMLElement | null;
          if (!collage) return;
          const shots = [...collage.querySelectorAll(".shot")] as HTMLElement[];
          const tilt = [-8, 6, -4, 9, -6];
          const offset = (shot: HTMLElement, axis: "x" | "y") => {
            const centre = axis === "x" ? collage.offsetWidth / 2 : Math.min(collage.offsetHeight / 2, window.innerHeight * 0.45);
            const own = axis === "x" ? shot.offsetLeft + shot.offsetWidth / 2 : shot.offsetTop + shot.offsetHeight / 2;
            return centre - own;
          };
          const timeline = gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: { id: "studio", trigger: collage, start: "top 82%", end: () => (window.innerWidth < 900 ? "top 10%" : "center 55%"), scrub: true, invalidateOnRefresh: true } });
          shots.forEach((shot, index) => {
            timeline.fromTo(shot, { x: () => offset(shot, "x"), y: () => offset(shot, "y"), rotation: tilt[index % tilt.length], scale: 0.66 }, { x: 0, y: 0, rotation: 0, scale: 1, duration: 1 }, (shots.length - 1 - index) * 0.08);
          });
        });
      }, { id: "scene:studio" });

      // --- Scene: Journal ---
      queueMotion(() => {
        return gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
          const journal = document.getElementById("journal");
          if (!journal) return;
          const shots = [...journal.querySelectorAll(".journal__shot")] as HTMLElement[];
          const stories = [...journal.querySelectorAll(".story")] as HTMLElement[];
          journal.classList.add("is-swap");
          stories.forEach((story, index) => {
            const timeline = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { id: `journal:${index}`, trigger: story, start: "top 84%", end: "top 50%", scrub: true } });
            timeline.fromTo(story, { opacity: 0.25 }, { opacity: 1, duration: 0.8 }, 0);
            if (index && shots[index]) timeline.fromTo(shots[index], { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", ease: "power1.inOut", duration: 1 }, 0);
          });
          return () => journal.classList.remove("is-swap");
        });
      }, { id: "scene:journal" });

      // --- Scene: H2-Contact ---
      queueMotion(() => {
        return gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
          const root = document.getElementById("h2-contact");
          if (!root) return;
          const voice = root.querySelector(".contact__voice");
          const dot = root.querySelector(".contact__title .m-dot");
          const contactTimeline = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { id: "contact", trigger: root, start: "top bottom", end: "top 15%", scrub: true } });
          if (voice) contactTimeline.fromTo(voice, { fontWeight: 400, scale: 0.82, transformOrigin: "0% 100%" }, { fontWeight: 800, scale: 1, duration: 1 }, 0);
          if (dot) contactTimeline.fromTo(dot, { scale: 0, yPercent: -400 }, { scale: 1, yPercent: 0, duration: 0.25, ease: "power2.in" }, 0.75);
        });
      }, { id: "scene:h2-contact" });

      // --- Scene: Calls ---
      queueMotion(() => {
        const root = document.getElementById("calls");
        if (!root) return;
        const list = root.querySelector(".calls__list");
        const items = list ? [...list.children] as HTMLElement[] : [];
        const device = root.querySelector(".calls__device");
        const steps = items.map((_, index) => [...root.querySelectorAll(`.phone [data-step="${index + 1}"]`)]);
        return gsap.matchMedia().add({ wide: "(min-width: 48rem) and (prefers-reduced-motion: no-preference)", narrow: "(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)" }, (context: any) => {
          const { wide } = context.conditions as any;
          const line = wide ? "58%" : "52%";
          const timeline = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { id: "calls", trigger: items[0], start: `top ${line}`, endTrigger: items[items.length - 1], end: `bottom ${line}`, scrub: true } });
          items.forEach((item, index) => {
            if (index > 0) timeline.fromTo(item, { opacity: 0.32 }, { opacity: 1, duration: 0.25 }, index - 0.1);
            if (index < items.length - 1) timeline.to(item, { opacity: 0.32, duration: 0.25 }, index + 0.9);
            if (steps[index]?.length) timeline.from(steps[index], { opacity: 0, y: 14, scale: 0.94, transformOrigin: "50% 100%", duration: 0.3, stagger: 0.18, ease: "power2.out" }, index + 0.05);
          });
          timeline.to(items.slice(0, -1), { opacity: 1, duration: 0.3 }, items.length - 0.1);
          if (adjacent("calls", "tune") && device) {
            gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { id: "calls:exit", trigger: root, start: "bottom bottom", end: "bottom 30%", scrub: true, invalidateOnRefresh: true } })
              .to(device, { scale: 0.8, rotation: -7, y: () => -window.innerHeight * (wide ? 0.12 : 0.08) }, 0);
          }
        });
      }, { near: document.getElementById("calls"), id: "calls" });

      // --- Scene: Tune ---
      queueMotion(() => {
        const root = document.getElementById("tune");
        if (!root) return;
        const stage = root.querySelector(".tune__stage") as HTMLElement | null;
        const lines = [...root.querySelectorAll(".tune__line")];
        const sizeFill = root.querySelector('[data-ctl="size"] .tune__fill');
        const sizeThumb = root.querySelector('[data-ctl="size"] .tune__thumb') as HTMLElement | null;
        const weightFill = root.querySelector('[data-ctl="weight"] .tune__fill');
        const weightThumb = root.querySelector('[data-ctl="weight"] .tune__thumb') as HTMLElement | null;
        const pill = root.querySelector('[data-ctl="contrast"] .tune__pill');
        const tokens = getComputedStyle(document.documentElement);
        const paper = tokens.getPropertyValue("--color-2").trim() || "#ffffff";
        const ink = tokens.getPropertyValue("--color-1").trim() || "#000000";

        const offset = (element: HTMLElement, stop?: HTMLElement) => {
          let x = 0, y = 0;
          for (let node: HTMLElement | null = element; node && node !== stop; node = node.offsetParent as HTMLElement | null) {
            x += node.offsetLeft;
            y += node.offsetTop;
          }
          return { x, y };
        };

        const mm = gsap.matchMedia().add({ wide: "(min-width: 48rem) and (prefers-reduced-motion: no-preference)", narrow: "(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)" }, () => {
          if (stage && adjacent("calls", "tune")) {
            const calls = document.getElementById("calls");
            const aside = calls?.querySelector(".calls__aside") as HTMLElement | null;
            const sticky = calls?.querySelector(".calls__sticky") as HTMLElement | null;
            const screen = calls?.querySelector(".phone__screen") as HTMLElement | null;
            if (calls && aside && sticky && screen) {
              let geometry: any;
              const measure = () => {
                const startScroll = offset(root).y - window.innerHeight;
                const asideAt = offset(aside);
                const style = getComputedStyle(sticky);
                const released = asideAt.y + aside.offsetHeight - sticky.offsetHeight - startScroll;
                const fromBottom = style.top === "auto" && style.bottom !== "auto";
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
              gsap.timeline({ scrollTrigger: { id: "tune:entry", trigger: root, start: "top bottom", end: "top 30%", scrub: true, invalidateOnRefresh: true } })
                .fromTo(stage, { scale: 0 }, { scale: () => (measure(), geometry.scale), ease: "none", duration: 0.02, immediateRender: false }, 0)
                .fromTo(stage, { x: measure, y: () => geometry.y, scale: () => geometry.scale }, { x: 0, y: 0, scale: 1, ease: "power1.inOut", duration: 0.98, immediateRender: false }, 0.02)
                .fromTo(stage, { autoAlpha: 0 }, { autoAlpha: 1, ease: "none", duration: 0.1, immediateRender: false }, 0);
            }
          }

          if (lines.length && stage && sizeThumb && weightThumb) {
            const track = (el: HTMLElement) => el.parentElement?.offsetWidth || 100;
            gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { id: "tune", trigger: root, start: "top 30%", end: "top -45%", scrub: true, invalidateOnRefresh: true } })
              .fromTo(lines, { fontVariationSettings: '"wght" 300', scale: 0.8 }, { fontVariationSettings: '"wght" 800', scale: 1, duration: 1 }, 0)
              .fromTo(sizeFill, { scaleX: 0.3 }, { scaleX: 0.75, duration: 1 }, 0)
              .fromTo(sizeThumb, { x: () => -0.45 * track(sizeThumb) }, { x: 0, duration: 1 }, 0)
              .fromTo(weightFill, { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
              .fromTo(weightThumb, { x: () => -0.6 * track(weightThumb) }, { x: () => 0.4 * track(weightThumb), duration: 1 }, 0)
              .fromTo(stage, { backgroundColor: paper, color: ink }, { backgroundColor: ink, color: paper, duration: 0.3 }, 1.05)
              .fromTo(pill, { xPercent: -100 }, { xPercent: 0, duration: 0.3 }, 1.05)
              .to(lines, { fontVariationSettings: '"wght" 600', duration: 0.8 }, 1.45)
              .to(weightFill, { scaleX: 0.6, duration: 0.8 }, 1.45)
              .to(weightThumb, { x: 0, duration: 0.8 }, 1.45);
          }
        });

        // Interactive control handlers
        const toggleBtns = root.querySelectorAll(".tune__toggle");
        toggleBtns.forEach(btn => {
          const handleToggle = () => {
            const checked = btn.getAttribute("aria-checked") === "true";
            btn.setAttribute("aria-checked", (!checked).toString());
          };
          btn.addEventListener("click", handleToggle);
        });

        const seg = root.querySelector('[data-ctl="contrast"]');
        if (seg && stage && pill) {
          const spans = seg.querySelectorAll("span");
          const setSegTheme = (theme: "light" | "dark") => {
            seg.setAttribute("data-theme", theme);
            if (theme === "light") {
              spans[0]?.setAttribute("aria-checked", "true");
              spans[1]?.setAttribute("aria-checked", "false");
              gsap.to(pill, { xPercent: -100, duration: 0.25, ease: "power2.out" });
              gsap.to(stage, { backgroundColor: paper, color: ink, duration: 0.25, ease: "power2.out" });
            } else {
              spans[0]?.setAttribute("aria-checked", "false");
              spans[1]?.setAttribute("aria-checked", "true");
              gsap.to(pill, { xPercent: 0, duration: 0.25, ease: "power2.out" });
              gsap.to(stage, { backgroundColor: ink, color: paper, duration: 0.25, ease: "power2.out" });
            }
          };
          spans[0]?.addEventListener("click", () => setSegTheme("light"));
          spans[1]?.addEventListener("click", () => setSegTheme("dark"));
        }

        const bindSlider = (ctlAttr: string, onUpdate: (pct: number) => void) => {
          const sliderEl = root.querySelector(`[data-ctl="${ctlAttr}"]`) as HTMLElement | null;
          if (!sliderEl) return;
          const fill = sliderEl.querySelector(".tune__fill") as HTMLElement | null;
          const thumb = sliderEl.querySelector(".tune__thumb") as HTMLElement | null;
          if (!fill || !thumb) return;

          let val = parseFloat(sliderEl.getAttribute("aria-valuenow") || "50");
          const applyVal = (v: number) => {
            val = Math.max(0, Math.min(100, Math.round(v)));
            sliderEl.setAttribute("aria-valuenow", val.toString());
            sliderEl.setAttribute("aria-valuetext", `${val}%`);
            const ratio = val / 100;
            fill.style.transform = `scaleX(${ratio})`;
            thumb.style.left = `${val}%`;
            onUpdate(ratio);
          };

          let dragging = false;
          const handleMove = (clientX: number) => {
            const rect = sliderEl.getBoundingClientRect();
            const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            applyVal(ratio * 100);
          };

          sliderEl.addEventListener("pointerdown", e => {
            dragging = true;
            sliderEl.setPointerCapture(e.pointerId);
            handleMove(e.clientX);
          });
          sliderEl.addEventListener("pointermove", e => {
            if (dragging) handleMove(e.clientX);
          });
          const endDrag = (e: PointerEvent) => {
            if (dragging) {
              dragging = false;
              try { sliderEl.releasePointerCapture(e.pointerId); } catch {}
            }
          };
          sliderEl.addEventListener("pointerup", endDrag);
          sliderEl.addEventListener("pointercancel", endDrag);
        };

        bindSlider("size", ratio => {
          if (lines.length) gsap.to(lines, { scale: 0.85 + ratio * 0.3, duration: 0.15, overwrite: "auto" });
        });
        bindSlider("weight", ratio => {
          if (lines.length) {
            const wght = Math.round(300 + ratio * 600);
            lines.forEach(l => { (l as HTMLElement).style.fontVariationSettings = `"wght" ${wght}`; });
          }
        });

        return () => mm.revert();
      }, { near: document.getElementById("tune"), id: "tune" });

      // --- Scene: Rooms ---
      queueMotion(() => {
        const root = document.getElementById("rooms");
        if (!root) return;
        const hold = root.querySelector(".rooms__hold");
        const track = root.querySelector(".rooms__track") as HTMLElement | null;
        const places = track ? [...track.querySelectorAll(".rooms__place")] as HTMLElement[] : [];
        const lines = root.querySelectorAll(".rooms__line");
        if (!hold || !track || !places.length) return;

        return gsap.matchMedia().add({ wide: "(min-width: 48rem) and (prefers-reduced-motion: no-preference)", narrow: "(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)" }, (context: any) => {
          const { wide } = context.conditions as any;
          root.classList.add("is-track");
          const travel = () => Math.max(0, track.scrollWidth - window.innerWidth);
          const setTravel = () => gsap.set(root, { "--rooms-travel": `${travel()}px` });
          setTravel();
          ScrollTrigger.addEventListener("refreshInit", setTravel);
          refreshInitHandlers.push(setTravel);

          const lead = () => Math.min(0.9, (window.innerWidth * 0.6) / track.scrollWidth);
          const main = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { id: "rooms", trigger: hold, start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true } });
          main.fromTo(track, { x: 0 }, { x: () => -travel(), duration: 1 }, 0)
            .fromTo(lines, { strokeDasharray: 1, strokeDashoffset: () => 1 - lead() }, { strokeDashoffset: 0, duration: 1 }, 0);

          places.forEach((place, index) => {
            const image = place.querySelector("img");
            const talk = place.querySelectorAll(".rooms__talk > *");
            if (image) {
              gsap.fromTo(image, { xPercent: 7 }, { xPercent: 0, ease: "none", scrollTrigger: { id: `rooms:photo-${index}`, trigger: place, containerAnimation: main, start: "left right", end: wide ? "left 66%" : "left 40%", scrub: true } });
            }
            if (talk.length) {
              gsap.fromTo(talk, { y: 36, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out", stagger: 0.3, scrollTrigger: { id: `rooms:talk-${index}`, trigger: place, containerAnimation: main, start: "left 100%", end: wide ? "left 66%" : "left 40%", scrub: true } });
            }
          });

          return () => {
            ScrollTrigger.removeEventListener("refreshInit", setTravel);
            root.classList.remove("is-track");
          };
        });
      }, { id: "rooms" });

      // --- Scene: Voices ---
      queueMotion(() => {
        const root = document.getElementById("voices");
        if (!root) return;
        const colsBox = root.querySelector(".voices__cols");
        const cols = [...root.querySelectorAll(".voices__col")];
        const cards = [...root.querySelectorAll(".voices__col > li")];
        const photo = root.querySelector(".voices__photo img");
        return gsap.matchMedia().add({ wide: "(min-width: 48rem) and (prefers-reduced-motion: no-preference)", narrow: "(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)" }, (context: any) => {
          const { wide } = context.conditions as any;
          if (wide && colsBox && cols.length) {
            cols.forEach((col, index) => {
              gsap.fromTo(col, { y: () => window.innerHeight * (index ? 0.42 : 0.14) }, { y: 0, ease: "none", scrollTrigger: { id: `voices:col-${index}`, trigger: colsBox, start: "top bottom", end: "top 18%", scrub: true, invalidateOnRefresh: true } });
            });
          } else if (!wide && cards.length) {
            cards.forEach((card, index) => {
              gsap.fromTo(card, { y: () => window.innerHeight * (index % 2 ? 0.16 : 0.06), x: index % 2 ? 28 : -28 }, { y: 0, x: 0, ease: "none", scrollTrigger: { id: `voices:card-${index}`, trigger: card, start: "top bottom", end: "top 58%", scrub: true, invalidateOnRefresh: true } });
            });
          }
          if (photo) {
            gsap.fromTo(photo, { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { id: "voices:photo", trigger: photo.parentElement, start: "top bottom", end: "center 50%", scrub: true } });
          }
        });
      }, { near: document.getElementById("voices"), id: "voices" });

      // --- Scene: Setup ---
      queueMotion(() => {
        const root = document.getElementById("setup");
        if (!root) return;
        const steps = root.querySelector(".setup__steps") as HTMLElement | null;
        const cards = steps ? [...steps.children] as HTMLElement[] : [];
        if (!steps || !cards.length) return;

        return gsap.matchMedia().add({ wide: "(min-width: 48rem) and (prefers-reduced-motion: no-preference)", narrow: "(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)" }, () => {
          root.classList.add("is-stacked");
          const gap = () => parseFloat(getComputedStyle(steps).rowGap) || 0;
          const natural = (index: number) => cards.slice(0, index).reduce((sum, card) => sum + card.offsetHeight + gap(), 0);
          const stuck = (index: number) => parseFloat(getComputedStyle(cards[index]).top) || 0;
          cards.slice(0, -1).forEach((card, index) => {
            gsap.fromTo(card, { scale: 1, filter: "brightness(1)" }, { scale: 0.92, filter: "brightness(0.68)", ease: "none", scrollTrigger: { id: `setup:${index}`, trigger: steps, start: () => `top+=${natural(index + 1)} bottom`, end: () => `top+=${natural(index + 1)} ${stuck(index + 1)}px`, scrub: true, invalidateOnRefresh: true } });
          });
          return () => root.classList.remove("is-stacked");
        });
      }, { id: "setup" });

      // --- Scene: Start ---
      queueMotion(() => {
        const root = document.getElementById("start");
        if (!root) return;
        const frame = root.querySelector(".start__window") as HTMLElement | null;
        const image = frame?.querySelector("img");
        const heading = root.querySelector(".start__copy h2") as HTMLElement | null;
        if (!frame || !image || !heading) return;

        return gsap.matchMedia().add({ wide: "(min-width: 48rem) and (prefers-reduced-motion: no-preference)", narrow: "(max-width: 47.99rem) and (prefers-reduced-motion: no-preference)" }, (context: any) => {
          const { wide } = context.conditions as any;
          const radius = restRadius(frame);
          const sideX = wide ? 31 : 12;
          const sideY = wide ? 15 : 22;
          gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { id: "start", trigger: frame, start: "top 92%", end: "top 10%", scrub: true } })
            .fromTo(frame, { clipPath: `inset(${sideY}% ${sideX}% ${sideY}% ${sideX}% round ${radius * 3}px)` }, { clipPath: `inset(0% 0% 0% 0% round ${radius}px)` }, 0)
            .fromTo(image, { scale: 1.32 }, { scale: 1 }, 0);

          root.classList.add("is-transcribing");
          ScrollTrigger.create({ id: "start:words", trigger: heading, start: "top 96%", end: "bottom 64%", scrub: true, animation: transcribe(heading, "start__word") });
          return () => root.classList.remove("is-transcribing");
        });
      }, { near: document.getElementById("start"), id: "start" });

      // --- Scene: Footer ---
      queueMotion(() => {
        const root = document.getElementById("footer");
        if (!root) return;
        const brand = root.querySelector(".footer__brand");
        const word = root.querySelector(".footer__word");
        if (!brand || !word) return;

        return gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
          gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { id: "footer", trigger: brand, start: "top bottom", end: "bottom bottom", scrub: true } })
            .fromTo(word, { yPercent: 70 }, { yPercent: 0 }, 0);
        });
      }, { near: document.getElementById("footer"), id: "footer" });

      // Window resize refresh
      resizeHandler = () => {
        refreshScroll();
      };
      window.addEventListener("resize", resizeHandler);
    };

    startAnimations();

    return () => {
      isDisposed = true;
      h2Form?.removeEventListener("submit", handleH2Submit);
      contactForm?.removeEventListener("submit", handleContactSubmit);
      window.removeEventListener("resize", measureNav);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      if (heroObserver) heroObserver.disconnect();
      observers.forEach(obs => obs.disconnect());
      refreshInitHandlers.forEach(handler => {
        (window as any).ScrollTrigger?.removeEventListener("refreshInit", handler);
      });
      contexts.forEach(ctx => {
        try {
          if (typeof ctx._customCleanup === "function") ctx._customCleanup();
          ctx.revert();
        } catch {}
      });

      // Clean up layout classes
      const idsAndClasses: [string, string][] = [
        ["work", "is-track"],
        ["again", "is-wheel"],
        ["capabilities", "is-deck"],
        ["method", "is-cycle"],
        ["journal", "is-swap"],
        ["rooms", "is-track"],
        ["setup", "is-stacked"],
        ["start", "is-transcribing"],
      ];
      idsAndClasses.forEach(([id, cls]) => {
        document.getElementById(id)?.classList.remove(cls);
      });

      if (lenisInstance) {
        lenisInstance.destroy();
        (window as any).lenis = null;
      }
    };
  }, []);

  return (
    <div id="top" ref={containerRef} className="merged-homepage-wrapper">
      <a className="skip" href="#main">Skip to main content</a>

      {/* Merged Header with adapted WordPress child theme mega menus and updated logo */}
      <MergedHeader />

      <main id="main" tabIndex={-1}>
        {/* ========================================================================= */}
        {/* First: Home 2 — Design Studio Sections                                   */}
        {/* ========================================================================= */}
        <div id="home-2-scope" className="home-2-scope">
          {/* Section: Hero */}
          <section id="h2-hero" data-8b-section="hero" aria-labelledby="h2-hero-title">
            <div className="hero__intro">
              <p className="m-text-5 hero__lead">
                We help brands do better, look better. Where do you want your brand to go? We&apos;re ready to help you get there.
              </p>
              <Link className="m-link hero__link" href="/work">
                <span className="m-link__label">Explore Our Work</span>
                <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5"/>
                </svg>
              </Link>
            </div>
            <h1 className="m-text-2 hero__title" id="h2-hero-title" style={{ "--len": 6 } as React.CSSProperties}>
              <span className="hero__word">
                <span className="hero__mask">
                  <span className="hero__glyphs">Better</span>
                </span>
              </span>
              <span className="hero__period" aria-hidden="true">
                <span className="hero__stage">
                  {/* Ambient Purple Depth Glow */}
                  <span className="hero__glow" aria-hidden="true"></span>

                  {/* Secondary Concentric Orbital Track */}
                  <span className="hero__orbit hero__orbit--outer" aria-hidden="true"></span>

                  {/* Primary Orbit with Animated Moon */}
                  <span className="hero__orbit hero__orbit--main">
                    <span className="hero__moon"></span>
                  </span>

                  {/* Zero-Gravity Floating Container */}
                  <span className="hero__float">
                    <span className="hero__aperture">
                      <img
                        srcSet="https://images.unsplash.com/photo-1754738381783-f9a2847bfef2?auto=format&fit=crop&w=280&h=280&q=68 280w, https://images.unsplash.com/photo-1754738381783-f9a2847bfef2?auto=format&fit=crop&w=400&h=400&q=68 400w, https://images.unsplash.com/photo-1754738381783-f9a2847bfef2?auto=format&fit=crop&w=640&h=640&q=68 640w, https://images.unsplash.com/photo-1754738381783-f9a2847bfef2?auto=format&fit=crop&w=960&h=960&q=68 960w"
                        sizes="(max-width: 767px) 74vw, 36vw"
                        className="hero__img"
                        src="https://images.unsplash.com/photo-1754738381783-f9a2847bfef2?auto=format&fit=crop&w=1200&h=1200&q=68"
                        width={1200}
                        height={1200}
                        alt=""
                        fetchPriority="high"
                      />
                      <span className="hero__rim" aria-hidden="true"></span>
                      <span className="hero__tint"></span>
                    </span>
                  </span>
                </span>
              </span>
            </h1>
          </section>

          {/* Section: Statement */}
          <section id="statement" data-8b-section="statement" aria-labelledby="statement-title">
            <h2 className="m-text-3 statement__title" id="statement-title">
              <span className="statement__line">Better Marketing,</span>
              <span className="statement__line">Better ROI<span className="m-dot statement__dot" aria-hidden="true"></span></span>
            </h2>
            <div className="statement__body">
              <p className="m-text-5 statement__lead" data-8b-motion="ink">
                Launching is easy. Delivering measurable business growth and sustained ROI is what matters. We combine data-driven marketing strategies, high-performance web engineering, and digital growth funnels to help ambitious brands scale.
              </p>
              <nav className="statement__index" aria-label="On this page">
                <ul>
                  <li><Link className="m-link" href="/work"><span className="m-link__label">See the work</span><svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg></Link></li>
                  <li><Link className="m-link" href="/services"><span className="m-link__label">What we do</span><svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg></Link></li>
                  <li><a className="m-link" href="#method"><span className="m-link__label">How we work</span><svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg></a></li>
                  <li><Link className="m-link" href="/about"><span className="m-link__label">Inside Better Insights</span><svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg></Link></li>
                  <li><Link className="m-link" href="/insights"><span className="m-link__label">Ideas and news</span><svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg></Link></li>
                  <li><Link className="m-link" href="/contact"><span className="m-link__label">Get Marketing Plan</span><svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg></Link></li>
                </ul>
              </nav>
            </div>
          </section>

          {/* Section: Work */}
          <section id="work" data-8b-section="work" aria-labelledby="work-title">
            <div className="work__plate" aria-hidden="true"></div>
            <div className="work__stage">
              <div className="work__head">
                <h2 className="m-text-3" id="work-title">Selected work<span className="m-dot" aria-hidden="true"></span></h2>
                <p className="m-text-5 work__lead">
                  Verified client results and growth campaigns across diverse industries.{" "}
                  <Link href="/work" className="m-link" style={{ marginLeft: "0.5rem", display: "inline-flex" }}>
                    <span className="m-link__label">View All Work</span>
                    <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                  </Link>
                </p>
              </div>
              <div className="work__window">
                <ul className="work__track">
                  <li className="case">
                    <Link href="/work/course-proxy" className="case__media" aria-label="Course Proxy Case Study">
                      <img
                        srcSet="https://images.unsplash.com/photo-1620802090791-fd9420668913?auto=format&fit=crop&w=400&h=250&q=80 400w, https://images.unsplash.com/photo-1620802090791-fd9420668913?auto=format&fit=crop&w=960&h=600&q=80 960w, https://images.unsplash.com/photo-1620802090791-fd9420668913?auto=format&fit=crop&w=1600&h=1000&q=80 1600w"
                        sizes="(max-width: 767px) 183vw, 52vw"
                        className="case__img"
                        src="https://images.unsplash.com/photo-1620802090791-fd9420668913?auto=format&fit=crop&w=1600&h=1000&q=80"
                        width={1600}
                        height={1000}
                        alt="Course Proxy"
                        loading="lazy"
                      />
                    </Link>
                    <span className="m-badge case__tag">Education · SEO &amp; Web Design</span>
                    <div className="case__text">
                      <h3 className="m-text-4 case__name">
                        <Link href="/work/course-proxy" style={{ color: "inherit", textDecoration: "none" }}>
                          Course Proxy
                        </Link>
                      </h3>
                      <p className="m-text-5 case__line">Intelligent course discovery portal and expert career counseling platform.</p>
                      <Link href="/work/course-proxy" className="m-link m-text-6" style={{ marginTop: "0.5rem", display: "inline-flex" }}>
                        <span className="m-link__label">Read Case Study</span>
                        <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                      </Link>
                    </div>
                  </li>
                  <li className="case">
                    <Link href="/work/the-ly" className="case__media" aria-label="The Ly Case Study">
                      <img
                        srcSet="https://images.unsplash.com/photo-1713371690087-baafaf440240?auto=format&fit=crop&w=400&h=250&q=80 400w, https://images.unsplash.com/photo-1713371690087-baafaf440240?auto=format&fit=crop&w=960&h=600&q=80 960w, https://images.unsplash.com/photo-1713371690087-baafaf440240?auto=format&fit=crop&w=1600&h=1000&q=80 1600w"
                        sizes="(max-width: 767px) 183vw, 52vw"
                        className="case__img"
                        src="https://images.unsplash.com/photo-1713371690087-baafaf440240?auto=format&fit=crop&w=1600&h=1000&q=80"
                        width={1600}
                        height={1000}
                        alt="The Ly"
                        loading="lazy"
                      />
                    </Link>
                    <span className="m-badge case__tag">Manufacturing · SEO</span>
                    <div className="case__text">
                      <h3 className="m-text-4 case__name">
                        <Link href="/work/the-ly" style={{ color: "inherit", textDecoration: "none" }}>
                          The Ly
                        </Link>
                      </h3>
                      <p className="m-text-5 case__line">High-volume international search engine optimization and scalable organic reach.</p>
                      <Link href="/work/the-ly" className="m-link m-text-6" style={{ marginTop: "0.5rem", display: "inline-flex" }}>
                        <span className="m-link__label">Read Case Study</span>
                        <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                      </Link>
                    </div>
                  </li>
                  <li className="case">
                    <Link href="/work/pooja-hospital-telehealth" className="case__media" aria-label="Pooja Hospital Case Study">
                      <img
                        srcSet="https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&w=400&h=250&q=80 400w, https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&w=960&h=600&q=80 960w, https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&w=1600&h=1000&q=80 1600w"
                        sizes="(max-width: 767px) 183vw, 52vw"
                        className="case__img"
                        src="https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&w=1600&h=1000&q=80"
                        width={1600}
                        height={1000}
                        alt="Pooja Hospital"
                        loading="lazy"
                      />
                    </Link>
                    <span className="m-badge case__tag">Healthcare · Telehealth</span>
                    <div className="case__text">
                      <h3 className="m-text-4 case__name">
                        <Link href="/work/pooja-hospital-telehealth" style={{ color: "inherit", textDecoration: "none" }}>
                          Pooja Hospital
                        </Link>
                      </h3>
                      <p className="m-text-5 case__line">Unified patient care ecosystem, OPD digitization, and teleconsultations.</p>
                      <Link href="/work/pooja-hospital-telehealth" className="m-link m-text-6" style={{ marginTop: "0.5rem", display: "inline-flex" }}>
                        <span className="m-link__label">Read Case Study</span>
                        <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                      </Link>
                    </div>
                  </li>
                  <li className="case">
                    <Link href="/work/voyya-app-growth" className="case__media" aria-label="Voyya Case Study">
                      <img
                        srcSet="https://images.unsplash.com/photo-1544213456-bc37cb97df74?auto=format&fit=crop&w=400&h=250&q=80 400w, https://images.unsplash.com/photo-1544213456-bc37cb97df74?auto=format&fit=crop&w=960&h=600&q=80 960w, https://images.unsplash.com/photo-1544213456-bc37cb97df74?auto=format&fit=crop&w=1600&h=1000&q=80 1600w"
                        sizes="(max-width: 767px) 183vw, 52vw"
                        className="case__img"
                        src="https://images.unsplash.com/photo-1544213456-bc37cb97df74?auto=format&fit=crop&w=1600&h=1000&q=80"
                        width={1600}
                        height={1000}
                        alt="Voyya"
                        loading="lazy"
                      />
                    </Link>
                    <span className="m-badge case__tag">Mobile App · Digital Growth</span>
                    <div className="case__text">
                      <h3 className="m-text-4 case__name">
                        <Link href="/work/voyya-app-growth" style={{ color: "inherit", textDecoration: "none" }}>
                          Voyya
                        </Link>
                      </h3>
                      <p className="m-text-5 case__line">Performance user acquisition, viral referral mechanics, and brand growth.</p>
                      <Link href="/work/voyya-app-growth" className="m-link m-text-6" style={{ marginTop: "0.5rem", display: "inline-flex" }}>
                        <span className="m-link__label">Read Case Study</span>
                        <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                      </Link>
                    </div>
                  </li>
                  <li className="case">
                    <Link href="/work/veda-edu" className="case__media" aria-label="Veda Edu Case Study">
                      <img
                        srcSet="https://images.unsplash.com/photo-1614149162883-504ce4d13909?auto=format&fit=crop&w=400&h=250&q=80 400w, https://images.unsplash.com/photo-1614149162883-504ce4d13909?auto=format&fit=crop&w=960&h=600&q=80 960w, https://images.unsplash.com/photo-1614149162883-504ce4d13909?auto=format&fit=crop&w=1600&h=1000&q=80 1600w"
                        sizes="(max-width: 767px) 183vw, 106vw"
                        className="case__img"
                        src="https://images.unsplash.com/photo-1614149162883-504ce4d13909?auto=format&fit=crop&w=1600&h=1000&q=80"
                        width={1600}
                        height={1000}
                        alt="Veda Edu"
                        loading="lazy"
                      />
                    </Link>
                    <span className="m-badge case__tag">EdTech · Adaptive Learning</span>
                    <div className="case__text">
                      <h3 className="m-text-4 case__name">
                        <Link href="/work/veda-edu" style={{ color: "inherit", textDecoration: "none" }}>
                          Veda Edu
                        </Link>
                      </h3>
                      <p className="m-text-5 case__line">AI-driven adaptive learning workflows and personalized student guidance.</p>
                      <Link href="/work/veda-edu" className="m-link m-text-6" style={{ marginTop: "0.5rem", display: "inline-flex" }}>
                        <span className="m-link__label">Read Case Study</span>
                        <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Again / Numbers */}
          <section id="again" data-8b-section="again" aria-labelledby="again-title">
            <div className="again__stage">
              <div className="again__head">
                <h2 className="m-text-3" id="again-title">Over 62,500 leads driven for clients<span className="m-dot" aria-hidden="true"></span></h2>
                <p className="m-text-5 again__lead">
                  More than 250 digital marketing projects helping over 250 brands scale through SEO, ads, web, and growth systems.{" "}
                  <Link href="/our-clientele" className="m-link" style={{ marginLeft: "0.5rem", display: "inline-flex" }}>
                    <span className="m-link__label">Explore Our Clientele</span>
                    <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                  </Link>
                </p>
              </div>
              <div className="again__swing">
                <ul className="again__wheel">
                  <li className="partner">
                    <Link href="/work/course-proxy" className="partner__card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                      <img src="https://images.unsplash.com/photo-1594386245199-289c2fe0bd0a?auto=format&fit=crop&w=400&h=500&q=80" className="partner__img" alt="Course Proxy" loading="lazy" />
                      <div className="partner__text"><span className="m-badge partner__year">Education</span><h3 className="m-text-4 partner__name">Course Proxy</h3><p className="m-text partner__line">Intelligent course discovery and career counseling platform.</p></div>
                    </Link>
                  </li>
                  <li className="partner">
                    <Link href="/work/the-ly" className="partner__card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                      <img src="https://images.unsplash.com/photo-1532713107108-dfb5d8d2fc42?auto=format&fit=crop&w=400&h=500&q=80" className="partner__img" alt="The Ly" loading="lazy" />
                      <div className="partner__text"><span className="m-badge partner__year">Manufacturing</span><h3 className="m-text-4 partner__name">The Ly</h3><p className="m-text partner__line">International search engine marketing and conversion infrastructure.</p></div>
                    </Link>
                  </li>
                  <li className="partner">
                    <Link href="/work/pooja-hospital-telehealth" className="partner__card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                      <img src="https://images.unsplash.com/photo-1658296777645-0f389d06867c?auto=format&fit=crop&w=400&h=500&q=80" className="partner__img" alt="Pooja Hospital" loading="lazy" />
                      <div className="partner__text"><span className="m-badge partner__year">Healthcare</span><h3 className="m-text-4 partner__name">Pooja Hospital</h3><p className="m-text partner__line">Unified patient care ecosystem and online OPD teleconsultations.</p></div>
                    </Link>
                  </li>
                  <li className="partner">
                    <Link href="/work/voyya-app-growth" className="partner__card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                      <img src="https://images.unsplash.com/photo-1558324190-c940eb141401?auto=format&fit=crop&w=400&h=500&q=80" className="partner__img" alt="Voyya" loading="lazy" />
                      <div className="partner__text"><span className="m-badge partner__year">App Growth</span><h3 className="m-text-4 partner__name">Voyya</h3><p className="m-text partner__line">Accelerating mobile user acquisition across global markets.</p></div>
                    </Link>
                  </li>
                  <li className="partner">
                    <Link href="/work/veda-edu" className="partner__card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                      <img src="https://images.unsplash.com/photo-1641675301559-468f9f4ca037?auto=format&fit=crop&w=400&h=500&q=80" className="partner__img" alt="Veda Edu" loading="lazy" />
                      <div className="partner__text"><span className="m-badge partner__year">EdTech</span><h3 className="m-text-4 partner__name">Veda Edu</h3><p className="m-text partner__line">AI-driven adaptive learning workflows and personalized guidance.</p></div>
                    </Link>
                  </li>
                  <li className="partner">
                    <Link href="/work/stylebar-ireland" className="partner__card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                      <img src="https://images.unsplash.com/photo-1761234852163-23f2ededd04e?auto=format&fit=crop&w=400&h=500&q=80" className="partner__img" alt="Stylebar Ireland" loading="lazy" />
                      <div className="partner__text"><span className="m-badge partner__year">Digital Commerce</span><h3 className="m-text-4 partner__name">Stylebar Ireland</h3><p className="m-text partner__line">High-performance digital presence and customer acquisition.</p></div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Capabilities */}
          <section id="capabilities" data-8b-section="capabilities" aria-labelledby="capabilities-title">
            <div className="capabilities__head">
              <h2 className="m-text-3" id="capabilities-title" data-8b-motion="rise">What we do<span className="m-dot" aria-hidden="true"></span></h2>
              <p className="m-text-5 capabilities__lead">
                Data-driven marketing, web design, and digital growth services tailored to elevate your business.{" "}
                <Link href="/services" className="m-link" style={{ marginLeft: "0.5rem", display: "inline-flex" }}>
                  <span className="m-link__label">Explore All Services</span>
                  <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                </Link>
              </p>
            </div>
            <ol className="capabilities__deck">
              <li className="service m-surface">
                <div className="service__text">
                  <h3 className="m-text-4">
                    <Link href="/services/website-development" style={{ color: "inherit", textDecoration: "none" }}>
                      Website Development
                    </Link>
                  </h3>
                  <p className="m-text-5 service__line">Create a strong first impression with websites and landing pages designed to engage your audience and support business growth.</p>
                  <ul className="service__tags"><li className="m-badge">UI/UX Design</li><li className="m-badge">Landing Pages</li><li className="m-badge">Web Development</li><li className="m-badge">Performance</li></ul>
                  <Link href="/services/website-development" className="m-link m-text-6" style={{ marginTop: "1rem", display: "inline-flex" }}>
                    <span className="m-link__label">Explore Website Development</span>
                    <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                  </Link>
                </div>
                <Link href="/services/website-development" className="service__media" data-8b-motion="iris" aria-label="Website Development">
                  <img src="https://images.unsplash.com/photo-1617825295690-28ae56c56135?auto=format&fit=crop&w=640&h=480&q=80" width={640} height={480} alt="Packaging design mockup" loading="lazy" />
                </Link>
                <span className="service__shade" aria-hidden="true"></span>
              </li>
              <li className="service m-surface">
                <div className="service__text">
                  <h3 className="m-text-4">
                    <Link href="/services/digital-growth" style={{ color: "inherit", textDecoration: "none" }}>
                      Digital Growth &amp; Performance
                    </Link>
                  </h3>
                  <p className="m-text-5 service__line">Reach the right audiences, improve visibility, attract new customer segments, and support sales through Google and social media advertising.</p>
                  <ul className="service__tags"><li className="m-badge">Google Ads</li><li className="m-badge">Meta Ads</li><li className="m-badge">PPC Campaigns</li><li className="m-badge">ROI Scaling</li></ul>
                  <Link href="/services/digital-growth" className="m-link m-text-6" style={{ marginTop: "1rem", display: "inline-flex" }}>
                    <span className="m-link__label">Explore Digital Growth</span>
                    <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                  </Link>
                </div>
                <Link href="/services/digital-growth" className="service__media" data-8b-motion="iris" aria-label="Digital Growth">
                  <img src="https://images.unsplash.com/photo-1601972599720-36938d4ecd31?auto=format&fit=crop&w=640&h=480&q=80" width={640} height={480} alt="Smartphone app" loading="lazy" />
                </Link>
                <span className="service__shade" aria-hidden="true"></span>
              </li>
              <li className="service m-surface">
                <div className="service__text">
                  <h3 className="m-text-4">
                    <Link href="/services/ai-automation" style={{ color: "inherit", textDecoration: "none" }}>
                      AI &amp; Automation
                    </Link>
                  </h3>
                  <p className="m-text-5 service__line">Deploy intelligent AI agents, custom workflow automations, and data processing tools to streamline operations and accelerate customer response.</p>
                  <ul className="service__tags"><li className="m-badge">AI Agents</li><li className="m-badge">Workflow Automation</li><li className="m-badge">Cognitive Systems</li><li className="m-badge">Efficiency</li></ul>
                  <Link href="/services/ai-automation" className="m-link m-text-6" style={{ marginTop: "1rem", display: "inline-flex" }}>
                    <span className="m-link__label">Explore AI &amp; Automation</span>
                    <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                  </Link>
                </div>
                <Link href="/services/ai-automation" className="service__media" data-8b-motion="iris" aria-label="AI and Automation">
                  <img src="https://images.unsplash.com/photo-1720175646447-e37d994007fc?auto=format&fit=crop&w=640&h=480&q=80" width={640} height={480} alt="AI & Automation" loading="lazy" />
                </Link>
                <span className="service__shade" aria-hidden="true"></span>
              </li>
              <li className="service m-surface">
                <div className="service__text">
                  <h3 className="m-text-4">
                    <Link href="/services/crm-integrations" style={{ color: "inherit", textDecoration: "none" }}>
                      CRM &amp; Integrations
                    </Link>
                  </h3>
                  <p className="m-text-5 service__line">Connect lead capture, multi-channel customer communications, and analytics into one unified pipeline that nurtures prospects automatically.</p>
                  <ul className="service__tags"><li className="m-badge">HubSpot &amp; Zoho</li><li className="m-badge">API Integrations</li><li className="m-badge">Lead Pipelines</li><li className="m-badge">Data Sync</li></ul>
                  <Link href="/services/crm-integrations" className="m-link m-text-6" style={{ marginTop: "1rem", display: "inline-flex" }}>
                    <span className="m-link__label">Explore CRM &amp; Integrations</span>
                    <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                  </Link>
                </div>
                <Link href="/services/crm-integrations" className="service__media" data-8b-motion="iris" aria-label="CRM and Integrations">
                  <img src="https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?auto=format&fit=crop&w=640&h=480&q=80" width={640} height={480} alt="Workshop notes" loading="lazy" />
                </Link>
                <span className="service__shade" aria-hidden="true"></span>
              </li>
              <li className="service m-surface">
                <div className="service__text">
                  <h3 className="m-text-4">
                    <Link href="/services/digital-transformation" style={{ color: "inherit", textDecoration: "none" }}>
                      Digital Transformation
                    </Link>
                  </h3>
                  <p className="m-text-5 service__line">Build a consistent brand identity through logo design, typography, color systems, and modern tech architecture that strengthen reputation.</p>
                  <ul className="service__tags"><li className="m-badge">Brand Identity</li><li className="m-badge">Logo Design</li><li className="m-badge">Enterprise Strategy</li><li className="m-badge">Scale</li></ul>
                  <Link href="/services/digital-transformation" className="m-link m-text-6" style={{ marginTop: "1rem", display: "inline-flex" }}>
                    <span className="m-link__label">Explore Digital Transformation</span>
                    <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                  </Link>
                </div>
                <Link href="/services/digital-transformation" className="service__media" data-8b-motion="iris" aria-label="Digital Transformation">
                  <img src="https://images.unsplash.com/photo-1769675353367-e581059c7c43?auto=format&fit=crop&w=640&h=480&q=80" width={640} height={480} alt="Abstract violet lights" loading="lazy" />
                </Link>
                <span className="service__shade" aria-hidden="true"></span>
              </li>
            </ol>
          </section>

          {/* Section: Method */}
          <section id="method" data-8b-section="method" aria-labelledby="method-title">
            <div className="method__head">
              <h2 className="m-text-3" id="method-title" data-8b-motion="rise">How we work<span className="m-dot" aria-hidden="true"></span></h2>
              <p className="m-text-5 method__lead" data-8b-motion="ink">Every project follows a proven, customer-focused consulting loop built for measurable impact and sustained growth.</p>
            </div>
            <div className="method__body">
              <div className="method__ring" aria-hidden="true">
                <svg className="method__svg" viewBox="0 0 400 400">
                  <circle className="method__track" cx="200" cy="200" r="170"/>
                  <circle className="method__arc" cx="200" cy="200" r="170" pathLength={1} strokeDasharray="1 1" strokeDashoffset={0}/>
                </svg>
                <span className="method__station" style={{ "--x": 0, "--y": -1 } as React.CSSProperties}></span>
                <span className="method__station" style={{ "--x": 1, "--y": 0 } as React.CSSProperties}></span>
                <span className="method__station" style={{ "--x": 0, "--y": 1 } as React.CSSProperties}></span>
                <span className="method__station" style={{ "--x": -1, "--y": 0 } as React.CSSProperties}></span>
                <span className="method__arm"><span className="method__runner"></span></span>
              </div>
              <ol className="method__steps">
                <li className="step"><h3 className="m-text-4">Listen &amp; Discover</h3><p className="m-text-5 step__text">We analyze your market, customer data, and current digital funnel before designing strategies.</p></li>
                <li className="step"><h3 className="m-text-4">Strategize &amp; Build</h3><p className="m-text-5 step__text">Collaborative design and engineering of high-performing campaigns, websites, and brand assets.</p></li>
                <li className="step"><h3 className="m-text-4">Deploy &amp; Measure</h3><p className="m-text-5 step__text">We launch campaigns, track KPIs transparently, and evaluate real business impact against agreed goals.</p></li>
                <li className="step"><h3 className="m-text-4">Optimize &amp; Scale</h3><p className="m-text-5 step__text">Continuous refinement, conversion rate optimization, and scaling what delivers the highest ROI.</p></li>
              </ol>
            </div>
          </section>

          {/* Section: Studio */}
          <section id="studio" data-8b-section="studio" aria-labelledby="studio-title">
            <div className="studio__head">
              <h2 className="m-text-3" id="studio-title">Inside Better Insights<span className="m-dot" aria-hidden="true"></span></h2>
              <p className="m-text-5 studio__lead" data-8b-motion="ink">
                Based in Pune, India, we are a multidisciplinary team of marketing strategists, developers, SEO analysts, and creatives dedicated to driving measurable growth for brands.{" "}
                <Link href="/about" className="m-link" style={{ marginLeft: "0.5rem", display: "inline-flex" }}>
                  <span className="m-link__label">Learn More About Us</span>
                  <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                </Link>
              </p>
            </div>
            <div className="studio__collage">
              <figure className="shot shot--wide"><img src="https://images.unsplash.com/photo-1787647559705-d2ad3322020e?auto=format&fit=crop&w=690&h=460&q=80" width={690} height={460} alt="Team meeting" loading="lazy" /></figure>
              <figure className="shot shot--tall"><img src="https://images.unsplash.com/photo-1643373977342-73cfc7cc0c5e?auto=format&fit=crop&w=400&h=533&q=80" width={400} height={533} alt="Colleagues laughing" loading="lazy" /></figure>
              <figure className="shot shot--tall"><img src="https://images.unsplash.com/photo-1745434159123-4908d0b9df94?auto=format&fit=crop&w=400&h=533&q=80" width={400} height={533} alt="Designer smiling" loading="lazy" /></figure>
              <figure className="shot shot--wide"><img src="https://images.unsplash.com/photo-1787647560262-ebfcf6c5f979?auto=format&fit=crop&w=690&h=460&q=80" width={690} height={460} alt="Collaborating at table" loading="lazy" /></figure>
              <figure className="shot shot--wide"><img src="https://images.unsplash.com/photo-1623652653308-d49d335c92eb?auto=format&fit=crop&w=690&h=460&q=80" width={690} height={460} alt="Team discussion" loading="lazy" /></figure>
              <div className="studio__roles">
                <h3 className="m-text-7" data-8b-motion="rise">Open roles<span className="m-dot" aria-hidden="true"></span></h3>
                <ul>
                  <li className="role"><span className="m-text-7">SEO Analyst</span><span className="m-text-6 role__place">Pune / Hybrid</span></li>
                  <li className="role"><span className="m-text-7">Web Developer</span><span className="m-text-6 role__place">Pune</span></li>
                  <li className="role"><span className="m-text-7">Marketing Operations Associate</span><span className="m-text-6 role__place">Pune</span></li>
                </ul>
                <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", marginTop: "1rem" }}>
                  <Link className="m-link" href="/careers">
                    <span className="m-link__label">Explore Open Roles</span>
                    <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                  </Link>
                  <a className="m-link" href="mailto:contact@betterinsights.in">
                    <span className="m-link__label">contact@betterinsights.in</span>
                    <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section: H2 Contact */}
          <section id="h2-contact" data-8b-section="contact" aria-labelledby="h2-contact-title">
            <h2 className="m-text-3 contact__title" id="h2-contact-title" style={{ "--len": 10 } as React.CSSProperties}><span className="contact__voice">Let&apos;s talk</span><span className="m-dot" aria-hidden="true"></span></h2>
            <div className="contact__grid">
              <div className="contact__info">
                <p className="m-text-5 contact__lead">Tell us what you want to achieve. Our marketing specialists review every inquiry and reply within 24 hours.</p>
                <a className="contact__mail" href="mailto:contact@betterinsights.in"><span>contact@betterinsights.in</span></a>
                <dl className="contact__places">
                  <div>
                    <dt className="m-text-7">Pune Office</dt>
                    <dd className="m-text">Office No. 828, Clover Hills Plaza<br />Undri Pisoli Road, Kondhwa, Pune – 411048</dd>
                    <dd className="m-text"><a href="tel:+919509996730">+91 950 999 6730</a></dd>
                  </div>
                  <div>
                    <dt className="m-text-7">Maharashtra, India</dt>
                    <dd className="m-text">Better Insights Digital Consulting<br />contact@betterinsights.in</dd>
                    <dd className="m-text"><a href="tel:+919509996730">+91 950 999 6730</a></dd>
                  </div>
                </dl>
              </div>
              <form className="contact__form m-surface" noValidate>
                <div className="contact__pair">
                  <label className="m-text-6">Your name<input className="m-field" name="name" type="text" autoComplete="name" required /></label>
                  <label className="m-text-6">Email<input className="m-field" name="email" type="email" autoComplete="email" required /></label>
                </div>
                <div className="contact__pair">
                  <label className="m-text-6">Company<input className="m-field" name="company" type="text" autoComplete="organization" /></label>
                  <label className="m-text-6">What can we help with?<select className="m-field" name="topic"><option>SEO &amp; Organic Growth</option><option>Google &amp; Meta Ads</option><option>Website Design &amp; Development</option><option>Social Media Marketing</option><option>Branding &amp; PR</option><option>Comprehensive Marketing Plan</option></select></label>
                </div>
                <label className="m-text-6">A few words about the project<textarea className="m-field" name="message" rows={3} required></textarea></label>
                <div className="contact__actions">
                  <button data-magnetic className="m-btn" type="submit"><span className="m-btn__label">Send message</span></button>
                  <p className="m-text contact__status" role="status" aria-live="polite" data-success="Thank you. Our marketing team will review your enquiry and reply within 24 hours." data-error="Please add your name, a valid email, and details about your marketing goals."></p>
                </div>
              </form>
            </div>
          </section>

          {/* Section: Journal */}
          <section id="journal" data-8b-section="journal" aria-labelledby="journal-title">
            <div className="journal__head" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "1rem" }}>
              <h2 className="m-text-3" id="journal-title" data-8b-motion="rise">Ideas and news<span className="m-dot" aria-hidden="true"></span></h2>
              <Link href="/insights" className="m-link">
                <span className="m-link__label">Explore All Insights</span>
                <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
              </Link>
            </div>
            <div className="journal__body">
              <div className="journal__frame">
                <img src="https://images.unsplash.com/photo-1769755409781-9e8924c57362?auto=format&fit=crop&w=690&h=863&q=80" width={690} height={863} alt="Conference stage" loading="lazy" className="journal__shot" />
                <img src="https://images.unsplash.com/photo-1783094269325-4ba186e8e01b?auto=format&fit=crop&w=690&h=863&q=80" width={690} height={863} alt="Woman working on laptop" loading="lazy" className="journal__shot" />
                <img src="https://images.unsplash.com/photo-1581080247486-57989c1f14ab?auto=format&fit=crop&w=690&h=863&q=80" width={690} height={863} alt="Typography printed" loading="lazy" className="journal__shot" />
                <img src="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&w=690&h=863&q=80" width={690} height={863} alt="Sticky notes on corkboard" loading="lazy" className="journal__shot" />
              </div>
              <ol className="journal__list">
                <li className="story">
                  <p className="m-text-6 story__meta"><span>Web Design</span> · <time dateTime="2026-10-01">1 October 2026</time> · 4 min read</p>
                  <h3 className="m-text-7">
                    <Link href="/insights" style={{ color: "inherit", textDecoration: "none" }}>
                      Website User Experience: How Frictionless UX Drives Higher Conversion Rates
                    </Link>
                  </h3>
                  <p className="m-text story__text">Why intuitive navigation, rapid page loading, and clear calls to action turn visitors into paying customers.</p>
                  <Link href="/insights" className="m-link m-text-6" style={{ marginTop: "0.5rem", display: "inline-flex" }}>
                    <span className="m-link__label">Read Article</span>
                    <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                  </Link>
                </li>
                <li className="story">
                  <p className="m-text-6 story__meta"><span>SEO</span> · <time dateTime="2026-09-18">18 September 2026</time> · 5 min read</p>
                  <h3 className="m-text-7">
                    <Link href="/insights" style={{ color: "inherit", textDecoration: "none" }}>
                      The Modern SEO Playbook: Technical Optimization &amp; Content That Ranks
                    </Link>
                  </h3>
                  <p className="m-text story__text">Proven search engine strategies that build domain authority, target buyer intent, and capture sustainable organic traffic.</p>
                  <Link href="/insights" className="m-link m-text-6" style={{ marginTop: "0.5rem", display: "inline-flex" }}>
                    <span className="m-link__label">Read Article</span>
                    <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                  </Link>
                </li>
                <li className="story">
                  <p className="m-text-6 story__meta"><span>Ads</span> · <time dateTime="2026-08-30">30 August 2026</time> · 3 min read</p>
                  <h3 className="m-text-7">
                    <Link href="/insights" style={{ color: "inherit", textDecoration: "none" }}>
                      Scaling Return on Ad Spend: Smart Bidding and Audience Segmentation
                    </Link>
                  </h3>
                  <p className="m-text story__text">Structuring high-converting Google and Meta ad campaigns to lower acquisition costs and maximize return on investment.</p>
                  <Link href="/insights" className="m-link m-text-6" style={{ marginTop: "0.5rem", display: "inline-flex" }}>
                    <span className="m-link__label">Read Article</span>
                    <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                  </Link>
                </li>
                <li className="story">
                  <p className="m-text-6 story__meta"><span>Growth Strategy</span> · <time dateTime="2026-08-04">4 August 2026</time> · 6 min read</p>
                  <h3 className="m-text-7">
                    <Link href="/insights" style={{ color: "inherit", textDecoration: "none" }}>
                      Digital Growth Framework: Bridging Marketing, Technology, and Analytics
                    </Link>
                  </h3>
                  <p className="m-text story__text">Aligning brand messaging, marketing funnels, and data analytics into one cohesive engine for long-term business growth.</p>
                  <Link href="/insights" className="m-link m-text-6" style={{ marginTop: "0.5rem", display: "inline-flex" }}>
                    <span className="m-link__label">Read Article</span>
                    <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3.5 13.5 8 9 12.5"/></svg>
                  </Link>
                </li>
              </ol>
            </div>
          </section>
        </div>

        {/* ========================================================================= */}
        {/* Second: Home 3 — App Landing Page Sections                                */}
        {/* ========================================================================= */}
        <div id="home-3-scope" className="home-3-scope">
          {/* Section: Calls */}
          <section className="calls on-dark" id="calls" data-8b-section="calls" aria-labelledby="calls-title">
            <div className="calls__sheet m-band-3" aria-hidden="true" data-8b-motion="bandRise"></div>
            <div className="calls__inner l-wrap">
              <div className="calls__head">
                <h2 className="m-text-3" id="calls-title" data-8b-motion="captionIn">Marketing infrastructure built to perform.</h2>
                <div className="calls__head-copy">
                  <p className="m-text-4 calls__lead">Digital campaigns and high-converting web experiences that capture attention and turn engagement into measurable growth.</p>
                  <Link className="m-btn" href="/contact"><span className="m-btn__label">Get Marketing Plan</span><span className="m-btn__wave" aria-hidden="true"><i></i><i></i><i></i></span></Link>
                </div>
              </div>
              <div className="calls__grid">
                <ul className="calls__list">
                  <li className="calls__item"><h3 className="m-text-5">Real-time analytics, lead by lead</h3><p className="m-text-8">Every inquiry, conversion, and traffic source is tracked transparently so you know exactly where your ROI comes from.</p></li>
                  <li className="calls__item"><h3 className="m-text-5">Integrated marketing funnels</h3><p className="m-text-8">Connect your search, ads, website, and CRM into one seamless pipeline that nurtures prospects from click to close.</p></li>
                  <li className="calls__item"><h3 className="m-text-5">High-converting web experiences</h3><p className="m-text-8">Fast, accessible, responsive landing pages designed to engage visitors and drive action on any device.</p></li>
                  <li className="calls__item"><h3 className="m-text-5">Targeted audience segmentation</h3><p className="m-text-8">Reach prospective buyers based on high intent, demographics, and behavior with tailored, persuasive messaging.</p></li>
                  <li className="calls__item"><h3 className="m-text-5">Data and insights that stay yours</h3><p className="m-text-8">Full transparency and ownership over all your advertising accounts, analytics dashboards, and campaign assets.</p></li>
                </ul>
                <div className="calls__aside">
                  <div className="calls__sticky">
                    <div className="calls__device">
                      <figure className="phone" aria-label="Example of a consultation with Better Insights">
                        <div className="phone__screen">
                          <div className="phone__top">
                            <p className="phone__who">Better Insights Strategy</p>
                            <p className="phone__state"><span className="phone__dot" aria-hidden="true"></span>Consultation · Live Session</p>
                            <span className="phone__end" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 14c4-4 12-4 16 0l-2 3-3-1v-2c-2-1-4-1-6 0v2l-3 1z"/></svg></span>
                          </div>
                          <p className="phone__number" data-step="2">Verified Growth Partner · Better Insights</p>
                          <ol className="phone__log">
                            <li className="phone__msg" data-step="1"><p className="m-caption"><span className="m-caption__wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span className="m-caption__text">We have completed the comprehensive audit of your digital marketing funnel.</span></p></li>
                            <li className="phone__msg phone__msg--you" data-step="3"><p className="m-caption-2"><span className="m-caption__wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span className="m-caption__text">Organic traffic is up 48% and qualified client leads doubled this month.</span></p><p className="phone__note">Verified · ROI Growth Metrics</p></li>
                            <li className="phone__cue" data-step="4">Strategy Team · reviewing campaign performance</li>
                            <li className="phone__msg" data-step="4"><p className="m-caption"><span className="m-caption__wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span className="m-caption__text">We have already prepared the expansion roadmap for your team review.</span></p></li>
                            <li className="phone__msg phone__msg--you" data-step="5"><p className="m-caption-2"><span className="m-caption__wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span className="m-caption__text">Let us connect on Friday to review the new campaign.</span></p></li>
                          </ol>
                          <p className="phone__saved" data-step="5"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>Growth plan delivered to your team</p>
                          <div className="phone__bar" aria-hidden="true">
                            <span><svg viewBox="0 0 24 24"><path d="M4 10v4h4l5 4V6L8 10zM16 9a4 4 0 0 1 0 6"/></svg>Speaker</span>
                            <span><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>Mute</span>
                            <span><svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h1M11 10h1M15 10h1M8 14h8"/></svg>Type</span>
                            <span><svg viewBox="0 0 24 24"><path d="M6 6h.01M12 6h.01M18 6h.01M6 12h.01M12 12h.01M18 12h.01M6 18h.01M12 18h.01M18 18h.01"/></svg>Keypad</span>
                          </div>
                        </div>
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Tune */}
          <section className="tune" id="tune" data-8b-section="caption-styles" aria-labelledby="tune-title">
            <div className="tune__sheet m-band-2" aria-hidden="true"></div>
            <div className="tune__inner l-wrap">
              <div className="tune__stage">
                <p className="tune__meta m-text-6"><span><i aria-hidden="true"></i>Live preview</span><span>Strategy · Performance · ROI</span></p>
                <p className="tune__sample m-text-2"><span className="tune__line" style={{ "--len": 16 } as React.CSSProperties}>Better Marketing,</span> <span className="tune__line" style={{ "--len": 10 } as React.CSSProperties}>Better ROI.</span></p>
              </div>
              <div className="tune__body">
                <div className="tune__head">
                  <h2 className="m-text-3" id="tune-title" data-8b-motion="captionIn">Digital growth, tailored to your goals.</h2>
                  <p className="m-text-4">From targeted advertising and technical SEO to conversion optimization and performance analytics, we connect strategy, technology, and data to help your business grow.</p>
                </div>
                <ul className="tune__settings">
                  {/* Row 1: Paid Media Campaigns */}
                  <li className="tune__row">
                    <h3 className="m-text-5">Paid Media Campaigns</h3>
                    <p className="m-text-8">Reach the right audience through targeted campaigns across Google, Meta, LinkedIn, and other relevant channels.</p>
                    <div
                      className="tune__ctl tune__slider"
                      data-ctl="size"
                      role="slider"
                      tabIndex={0}
                      aria-label="Paid media campaign allocation slider"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={75}
                      aria-valuetext="75% Allocation"
                    >
                      <span className="tune__fill"></span>
                      <span className="tune__thumb"></span>
                    </div>
                  </li>

                  {/* Row 2: Technical SEO */}
                  <li className="tune__row">
                    <h3 className="m-text-5">Technical SEO</h3>
                    <p className="m-text-8">Improve search visibility through technical audits, on-page optimization, and a stronger site structure.</p>
                    <div
                      className="tune__ctl tune__slider"
                      data-ctl="weight"
                      role="slider"
                      tabIndex={0}
                      aria-label="Technical SEO optimization slider"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={60}
                      aria-valuetext="60% Optimization"
                    >
                      <span className="tune__fill"></span>
                      <span className="tune__thumb"></span>
                    </div>
                  </li>

                  {/* Row 3: Conversion Rate Optimization */}
                  <li className="tune__row">
                    <h3 className="m-text-5">Conversion Rate Optimization</h3>
                    <p className="m-text-8">Create clearer customer journeys and landing pages designed to turn qualified traffic into enquiries.</p>
                    <div
                      className="tune__ctl tune__seg"
                      data-ctl="contrast"
                      role="radiogroup"
                      aria-label="Landing page preview theme"
                      tabIndex={0}
                    >
                      <b className="tune__pill"></b>
                      <span role="radio" aria-checked="false" tabIndex={-1}>Light</span>
                      <span role="radio" aria-checked="true" tabIndex={-1}>Dark</span>
                    </div>
                  </li>

                  {/* Row 4: Performance Analytics */}
                  <li className="tune__row">
                    <h3 className="m-text-5">Performance Analytics</h3>
                    <p className="m-text-8">Track meaningful metrics, understand campaign performance, and make informed growth decisions.</p>
                    <span className="tune__ctl tune__tag" aria-label="Key Performance Indicators">KPIs</span>
                  </li>

                  {/* Row 5: Brand Positioning */}
                  <li className="tune__row">
                    <h3 className="m-text-5">Brand Positioning</h3>
                    <p className="m-text-8">Build consistent messaging and a recognizable brand identity across digital touchpoints.</p>
                    <button
                      type="button"
                      className="tune__ctl tune__toggle"
                      role="switch"
                      aria-checked="true"
                      aria-label="Brand positioning active"
                    ></button>
                  </li>

                  {/* Row 6: CRM & Marketing Automation */}
                  <li className="tune__row">
                    <h3 className="m-text-5">CRM &amp; Marketing Automation</h3>
                    <p className="m-text-8">Connect lead capture, customer follow-ups, and marketing workflows to reduce manual effort.</p>
                    <span className="tune__ctl tune__tag" aria-label="Marketing automation active">Auto</span>
                  </li>

                  {/* Row 7: Audience Retargeting */}
                  <li className="tune__row">
                    <h3 className="m-text-5">Audience Retargeting</h3>
                    <p className="m-text-8">Reconnect with interested visitors through relevant messaging across supported digital channels.</p>
                    <button
                      type="button"
                      className="tune__ctl tune__toggle"
                      role="switch"
                      aria-checked="true"
                      aria-label="Audience retargeting active"
                    ></button>
                  </li>

                  {/* Row 8: Website Performance */}
                  <li className="tune__row">
                    <h3 className="m-text-5">Website Performance</h3>
                    <p className="m-text-8">Improve loading speed, responsive experiences, and technical performance across devices.</p>
                    <button
                      type="button"
                      className="tune__ctl tune__toggle"
                      role="switch"
                      aria-checked="true"
                      aria-label="Website performance optimization active"
                    ></button>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Rooms / Touchpoints */}
          <section className="rooms on-dark" id="rooms" data-8b-section="in-person" aria-labelledby="rooms-title">
            <div className="rooms__sheet m-band-4" aria-hidden="true"></div>
            <div className="rooms__head l-wrap">
              <h2 className="m-text-3" id="rooms-title" data-8b-motion="captionIn">Brand impact across every digital touchpoint.</h2>
              <p className="m-text-4 rooms__lead" data-8b-motion="readAlong">From organic search to paid social, we help your brand look better and perform consistently wherever your prospective customers spend time.</p>
            </div>
            <div className="rooms__hold">
              <div className="rooms__stage">
                <p className="rooms__now m-text-6"><i aria-hidden="true"></i>Omnichannel Presence · 5 Touchpoints</p>
                <div className="rooms__track">
                  <svg className="rooms__lines" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
                    <path className="rooms__line rooms__line--a" pathLength={1} d="M0 60C40 10 80 10 120 50S200 95 240 55 320 5 360 45 440 95 480 55 560 5 600 45 680 95 720 55 800 5 840 45 920 95 1000 50"/>
                    <path className="rooms__line rooms__line--b" pathLength={1} d="M0 40C40 90 80 90 120 50S200 5 240 45 320 95 360 55 440 5 480 45 560 95 600 55 680 5 720 45 800 95 840 55 920 5 1000 50"/>
                  </svg>
                  <figure className="rooms__place">
                    <img src="https://images.unsplash.com/photo-1786772444593-63542e7d0618?auto=format&fit=crop&w=400&q=80" width={400} alt="Search and Discovery" loading="lazy" />
                    <figcaption className="rooms__label m-text-6">Search &amp; Discovery</figcaption>
                    <div className="rooms__talk">
                      <p className="m-caption"><span className="m-caption__wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span className="m-caption__text">How do we rank for high-intent searches?</span></p>
                      <p className="m-caption-2"><span className="m-caption__wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span className="m-caption__text">Our technical SEO captures top rankings.</span></p>
                    </div>
                  </figure>
                  <figure className="rooms__place">
                    <img src="https://images.unsplash.com/photo-1627662166825-a860471632e4?auto=format&fit=crop&w=400&q=80" width={400} alt="Landing Experience" loading="lazy" />
                    <figcaption className="rooms__label m-text-6">Landing Experience</figcaption>
                    <div className="rooms__talk">
                      <p className="m-caption"><span className="m-caption__wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span className="m-caption__text">Is the landing page converting visitors?</span></p>
                      <p className="m-caption-2"><span className="m-caption__wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span className="m-caption__text">Conversion rate grew 3.2x with new design.</span></p>
                    </div>
                  </figure>
                  <figure className="rooms__place">
                    <img src="https://images.unsplash.com/photo-1790469337210-02bde622b520?auto=format&fit=crop&w=400&q=80" width={400} alt="Paid Advertising" loading="lazy" />
                    <figcaption className="rooms__label m-text-6">Paid Advertising</figcaption>
                    <div className="rooms__talk">
                      <p className="m-caption"><span className="m-caption__wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span className="m-caption__text">Can we lower cost per qualified acquisition?</span></p>
                      <p className="m-caption-2"><span className="m-caption__wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span className="m-caption__text">Smart bidding optimized CPA by 42%.</span></p>
                    </div>
                  </figure>
                  <figure className="rooms__place">
                    <img src="https://images.unsplash.com/photo-1638957835514-224c57ffe617?auto=format&fit=crop&w=400&q=80" width={400} alt="Client Retention" loading="lazy" />
                    <figcaption className="rooms__label m-text-6">Client Retention</figcaption>
                    <div className="rooms__talk">
                      <p className="m-caption"><span className="m-caption__wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span className="m-caption__text">How do we nurture acquired customers?</span></p>
                      <p className="m-caption-2"><span className="m-caption__wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span className="m-caption__text">Automated workflows keep retention high.</span></p>
                    </div>
                  </figure>
                  <figure className="rooms__place">
                    <img src="https://images.unsplash.com/photo-1787767296743-b59cbed3809d?auto=format&fit=crop&w=400&q=80" width={400} alt="Brand Authority" loading="lazy" />
                    <figcaption className="rooms__label m-text-6">Brand Authority</figcaption>
                    <div className="rooms__talk">
                      <p className="m-caption"><span className="m-caption__wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span className="m-caption__text">How do we build long-term industry trust?</span></p>
                      <p className="m-caption-2"><span className="m-caption__wave" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span className="m-caption__text">PR and thought leadership drive authority.</span></p>
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Voices / Testimonials */}
          <section className="voices" id="voices" data-8b-section="testimonials" aria-labelledby="voices-title">
            <div className="voices__sheet m-band" aria-hidden="true" data-8b-motion="bandRise"></div>
            <div className="voices__inner l-wrap">
              <h2 className="m-text-3 voices__title" id="voices-title" data-8b-motion="captionIn">Recommended by leaders. Loved by the people who work with us.</h2>
              <div className="voices__grid">
                <figure className="voices__expert">
                  <div className="voices__photo"><img src="https://images.unsplash.com/photo-1643297654397-97b3201abc7c?auto=format&fit=crop&w=660&q=80" alt="Eileen Brennan" loading="lazy" /></div>
                  <blockquote className="voices__quote m-text-4" data-8b-motion="readAlong">
                    <p>“Better Insights transformed our digital presence with exceptional agility. Their strategic clarity and engineering precision delivered measurable business growth from day one.”</p>
                  </blockquote>
                  <figcaption className="voices__who m-text-6">
                    <span className="voices__badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg></span>
                    <p>Eileen Brennan<br /><span>Managing Director, Stylebar Ireland</span></p>
                  </figcaption>
                </figure>
                <div className="voices__cols">
                  <ul className="voices__col">
                    <li className="m-card">
                      <p className="voices__stars" aria-label="5 out of 5 stars">
                        {[...Array(5)].map((_, i) => (<svg key={i} viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.2l2 4.3 4.7.5-3.5 3.2 1 4.6L8 11.4l-4.2 2.4 1-4.6L1.3 6l4.7-.5z"/></svg>))}
                      </p>
                      <p className="m-text">The SEO strategy they implemented drove a massive increase in organic inquiries within three months.</p>
                      <p className="m-text-6">David C. Gallagher, Operations Director</p>
                    </li>
                    <li className="m-card">
                      <p className="voices__stars" aria-label="5 out of 5 stars">
                        {[...Array(5)].map((_, i) => (<svg key={i} viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.2l2 4.3 4.7.5-3.5 3.2 1 4.6L8 11.4l-4.2 2.4 1-4.6L1.3 6l4.7-.5z"/></svg>))}
                      </p>
                      <p className="m-text">Their Google Ads management lowered our cost per acquisition while doubling our qualified leads.</p>
                      <p className="m-text-6">Ananya Khare, Principal Partner</p>
                    </li>
                    <li className="m-card">
                      <p className="voices__stars" aria-label="5 out of 5 stars">
                        {[...Array(5)].map((_, i) => (<svg key={i} viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.2l2 4.3 4.7.5-3.5 3.2 1 4.6L8 11.4l-4.2 2.4 1-4.6L1.3 6l4.7-.5z"/></svg>))}
                      </p>
                      <p className="m-text">Exceptional web design and development. The team understood our vision and executed flawlessly.</p>
                      <p className="m-text-6">Ravi Sharma, Founder</p>
                    </li>
                  </ul>
                  <ul className="voices__col">
                    <li className="m-card">
                      <p className="voices__stars" aria-label="5 out of 5 stars">
                        {[...Array(5)].map((_, i) => (<svg key={i} viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.2l2 4.3 4.7.5-3.5 3.2 1 4.6L8 11.4l-4.2 2.4 1-4.6L1.3 6l4.7-.5z"/></svg>))}
                      </p>
                      <p className="m-text">Over 62,500 leads driven for clients is not just a stat—we saw the results in our own pipeline.</p>
                      <p className="m-text-6">Vikram Patel, Director</p>
                    </li>
                    <li className="m-card">
                      <p className="voices__stars" aria-label="5 out of 5 stars">
                        {[...Array(5)].map((_, i) => (<svg key={i} viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.2l2 4.3 4.7.5-3.5 3.2 1 4.6L8 11.4l-4.2 2.4 1-4.6L1.3 6l4.7-.5z"/></svg>))}
                      </p>
                      <p className="m-text">Strategic, data-driven, and highly responsive. Better Insights is a true growth partner.</p>
                      <p className="m-text-6">Kavita N., Brand Manager</p>
                    </li>
                    <li className="m-card">
                      <p className="voices__stars" aria-label="5 out of 5 stars">
                        {[...Array(5)].map((_, i) => (<svg key={i} viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.2l2 4.3 4.7.5-3.5 3.2 1 4.6L8 11.4l-4.2 2.4 1-4.6L1.3 6l4.7-.5z"/></svg>))}
                      </p>
                      <p className="m-text">Collaborative and practical. They helped us eliminate digital bottlenecks and grow sustainably.</p>
                      <p className="m-text-6">Neha Joshi, COO</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Setup */}
          <section className="setup" id="setup" data-8b-section="how-it-works" aria-labelledby="setup-title">
            <div className="setup__sheet m-band-2" aria-hidden="true"></div>
            <div className="setup__inner l-wrap">
              <div className="setup__head">
                <h2 className="m-text-3" id="setup-title" data-8b-motion="captionIn">Three steps to start scaling.</h2>
                <p className="m-text-4">Simple onboarding, transparent communication, and rapid turnaround on all marketing deliverables.</p>
              </div>
              <ol className="setup__steps">
                <li className="setup__card" style={{ "--setup-i": 0 } as React.CSSProperties}>
                  <p className="setup__num m-text-2" aria-hidden="true">1</p>
                  <div className="setup__copy"><h3 className="m-text-5">Discovery &amp; Audit</h3><p className="m-text-8">We analyze your existing marketing channels, search visibility, competitor landscape, and conversion funnels to identify growth opportunities.</p></div>
                  <div className="setup__ui m-text-6" aria-hidden="true">
                    <p className="setup__check"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/></svg>Full Channel Audit</p>
                    <p className="setup__check"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/></svg>Competitor Benchmark</p>
                    <p className="setup__check"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/></svg>Growth Roadmap</p>
                  </div>
                </li>
                <li className="setup__card" style={{ "--setup-i": 1 } as React.CSSProperties}>
                  <p className="setup__num m-text-2" aria-hidden="true">2</p>
                  <div className="setup__copy"><h3 className="m-text-5">Custom Growth Plan</h3><p className="m-text-8">We engineer a tailored digital strategy spanning SEO, paid ads, website optimization, and content designed to achieve your specific KPIs.</p></div>
                  <div className="setup__ui m-text-6" aria-hidden="true">
                    <p className="setup__option setup__option--on">Multi-Channel Scaling<span>Selected</span></p>
                    <p className="setup__option">Dedicated Strategy Lead<span>Active</span></p>
                  </div>
                </li>
                <li className="setup__card on-dark" style={{ "--setup-i": 2 } as React.CSSProperties}>
                  <p className="setup__num m-text-2" aria-hidden="true">3</p>
                  <div className="setup__copy"><h3 className="m-text-5">Launch &amp; Scale</h3><p className="m-text-8">We deploy campaigns, monitor live performance metrics, optimize conversion rates, and deliver transparent ROI reporting at every stage.</p></div>
                  <div className="setup__ui" aria-hidden="true">
                    <p className="m-caption"><span className="m-caption__wave"><i></i><i></i><i></i><i></i></span><span className="m-caption__text">Campaigns deployed live</span></p>
                    <p className="m-caption-2"><span className="m-caption__wave"><i></i><i></i><i></i><i></i></span><span className="m-caption__text">Transparent ROI verified</span></p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* Section: FAQ */}
          <section className="faq" id="faq" data-8b-section="faq" aria-labelledby="faq-title">
            <div className="faq__sheet m-band" aria-hidden="true"></div>
            <div className="faq__inner l-wrap">
              <div className="faq__head">
                <h2 className="m-text-3" id="faq-title" data-8b-motion="captionIn">Questions, answered plainly.</h2>
                <p className="m-text-8">Still wondering about something? <Link className="m-link" href="/contact">Ask a person</Link> — we reply within a day.</p>
              </div>
              <div className="faq__list">
                <details className="faq__item"><summary className="m-text-5">What services does Better Insights provide?<span className="faq__icon" aria-hidden="true"></span></summary><p className="m-text">We provide comprehensive digital marketing and consulting services, including Web Design, Google &amp; Meta Ads, SEO, Social Media Marketing, Public Relations, and Branding.</p></details>
                <details className="faq__item"><summary className="m-text-5">How do you measure project success and ROI?<span className="faq__icon" aria-hidden="true"></span></summary><p className="m-text">We establish clear, measurable KPIs prior to launch—including qualified lead volume, conversion rate, cost per acquisition, and organic search ranking growth—tracked through real-time dashboards.</p></details>
                <details className="faq__item"><summary className="m-text-5">What industries does Better Insights work with?<span className="faq__icon" aria-hidden="true"></span></summary><p className="m-text">We have deep consulting and execution experience across Education, Healthcare, Manufacturing, Digital Commerce, Legal, Real Estate, and Technology sectors.</p></details>
                <details className="faq__item"><summary className="m-text-5">How does the onboarding and collaboration process work?<span className="faq__icon" aria-hidden="true"></span></summary><p className="m-text">We begin with an in-depth discovery audit, provide a transparent roadmap and deliverables schedule, communicate through dedicated channels, and provide regular performance reviews.</p></details>
                <details className="faq__item"><summary className="m-text-5">Who owns our campaign data and accounts?<span className="faq__icon" aria-hidden="true"></span></summary><p className="m-text">You retain 100% ownership over all advertising accounts, analytics dashboards, website code, and creative assets. We believe in complete transparency and data sovereignty.</p></details>
                <details className="faq__item"><summary className="m-text-5">Can you help us scale into international markets?<span className="faq__icon" aria-hidden="true"></span></summary><p className="m-text">Yes. We manage multi-region campaigns and international SEO architectures helping brands expand across India, the Middle East, Europe, and the United States.</p></details>
                <details className="faq__item"><summary className="m-text-5">What is the typical timeframe to see results?<span className="faq__icon" aria-hidden="true"></span></summary><p className="m-text">Paid advertising and landing page optimizations typically drive leads within the first two weeks, while technical SEO and organic ranking strategies show strong compounded growth within 60 to 90 days.</p></details>
                <details className="faq__item"><summary className="m-text-5">How can my brand get started with a marketing plan?<span className="faq__icon" aria-hidden="true"></span></summary><p className="m-text">Reach out through our contact form, email contact@betterinsights.in, or call +91 950 999 6730. Our team will review your business needs and provide a tailored marketing plan within 24 hours.</p></details>
              </div>
            </div>
          </section>

          {/* Section: Start / CTA */}
          <section className="start on-dark" id="start" data-8b-section="call-to-action" aria-labelledby="start-title">
            <div className="start__sheet m-band-4" aria-hidden="true"></div>
            <div className="start__inner l-wrap">
              <div className="start__window">
                <img src="https://images.unsplash.com/photo-1726047336347-77803fc5f725?auto=format&fit=crop&w=1010&q=80" width={1010} alt="Young woman smiling" loading="lazy" />
              </div>
              <div className="start__copy">
                <h2 className="m-text-3" id="start-title">Ready to scale your digital growth?</h2>
                <p className="m-text-4">Get in touch today to explore how Better Insights can transform your brand&apos;s digital presence and marketing ROI.</p>
                <div className="start__actions">
                  <Link className="m-btn" href="/contact"><span className="m-btn__label">Get Marketing Plan</span><span className="m-btn__wave" aria-hidden="true"><i></i><i></i><i></i></span></Link>
                  <Link className="m-link m-text-6" href="/work">Explore Our Work</Link>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Contact */}
          <section className="contact" id="contact" data-8b-section="contact" aria-labelledby="contact-title">
            <div className="contact__sheet m-band-2" aria-hidden="true" data-8b-motion="bandRise"></div>
            <div className="contact__inner l-wrap">
              <div className="contact__info">
                <h2 className="m-text-3" id="contact-title" data-8b-motion="captionIn">Connect with our marketing team.</h2>
                <p className="m-text-4">Tell us about your brand and goals. Our marketing specialists review every enquiry and reply within 24 hours.</p>
                <figure className="contact__photo">
                  <img src="https://images.unsplash.com/photo-1766066014237-00645c74e9c6?auto=format&fit=crop&w=680&q=80" width={680} alt="Support specialist" loading="lazy" />
                </figure>
                <ul className="contact__ways">
                  <li><p className="m-text-6">Call / WhatsApp</p><a className="m-link m-text-5" href="tel:+919509996730">+91 950 999 6730</a></li>
                  <li><p className="m-text-6">Email</p><a className="m-link m-text-5" href="mailto:contact@betterinsights.in">contact@betterinsights.in</a></li>
                  <li><p className="m-text-6">Office</p><Link className="m-link m-text-5" href="/contact">Pune, Maharashtra, India</Link></li>
                </ul>
              </div>
              <form className="contact__form" id="contact-form" noValidate data-msg-ok="Thanks — our marketing team will review your enquiry and write back within 24 hours." data-msg-error="Please add your name, a valid email and a short message.">
                <h3 className="m-text-5">Request a Marketing Plan</h3>
                <div className="m-field"><label className="m-field__label" htmlFor="contact-name">Your name</label><input className="m-field__input" id="contact-name" name="name" type="text" autoComplete="name" required /></div>
                <div className="m-field"><label className="m-field__label" htmlFor="contact-email">Email</label><input className="m-field__input" id="contact-email" name="email" type="email" autoComplete="email" required /></div>
                <div className="m-field"><label className="m-field__label" htmlFor="contact-message">How can we help?</label><textarea className="m-field__input" id="contact-message" name="message" rows={4} required></textarea></div>
                <button data-magnetic className="m-btn-2" type="submit"><span className="m-btn__label">Send Enquiry</span><span className="m-btn__wave" aria-hidden="true"><i></i><i></i><i></i></span></button>
                <p className="contact__status m-text-8" role="status" aria-live="polite"></p>
              </form>
            </div>
          </section>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* Global Shared Footer                                                      */}
      {/* ========================================================================= */}
      <Footer />
    </div>
  );
}
