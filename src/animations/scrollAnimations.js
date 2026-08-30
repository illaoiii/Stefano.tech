import { getGsap, prefersReducedMotion } from "./gsap";

// Fades + slides an element up into place once it enters the viewport.
// Used by the <Reveal> component — keep this the single source of truth
// for "section reveal" motion so every section animates consistently.
export function revealOnScroll(el, { y = 28, delay = 0, duration = 0.7 } = {}) {
  if (!el) return () => {};

  if (prefersReducedMotion()) {
    el.style.opacity = 1;
    el.style.transform = "none";
    return () => {};
  }

  const { gsap } = getGsap();

  gsap.set(el, { opacity: 0, y });

  const tween = gsap.to(el, {
    opacity: 1,
    y: 0,
    duration,
    delay,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 88%",
      once: true,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}

export function staggerChildren(container, selector, { y = 20, stagger = 0.08 } = {}) {
  if (!container) return () => {};
  const targets = container.querySelectorAll(selector);
  if (targets.length === 0) return () => {};

  if (prefersReducedMotion()) {
    targets.forEach((t) => {
      t.style.opacity = 1;
      t.style.transform = "none";
    });
    return () => {};
  }

  const { gsap } = getGsap();
  gsap.set(targets, { opacity: 0, y });

  const tween = gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger,
    ease: "power3.out",
    scrollTrigger: {
      trigger: container,
      start: "top 85%",
      once: true,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}
