import { getGsap, prefersReducedMotion } from "./gsap";

// Small magnetic-feeling scale/lift used on buttons and cards.
// Returns a cleanup function that removes the listeners.
export function attachHoverLift(el, { scale = 1.02, y = -4 } = {}) {
  if (!el || prefersReducedMotion()) return () => {};

  const { gsap } = getGsap();

  const onEnter = () => gsap.to(el, { scale, y, duration: 0.3, ease: "power2.out" });
  const onLeave = () => gsap.to(el, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });

  el.addEventListener("mouseenter", onEnter);
  el.addEventListener("mouseleave", onLeave);

  return () => {
    el.removeEventListener("mouseenter", onEnter);
    el.removeEventListener("mouseleave", onLeave);
  };
}

export function attachImageZoom(el, { scale = 1.08 } = {}) {
  if (!el || prefersReducedMotion()) return () => {};

  const { gsap } = getGsap();
  const img = el.querySelector("img");
  if (!img) return () => {};

  const onEnter = () => gsap.to(img, { scale, duration: 0.5, ease: "power2.out" });
  const onLeave = () => gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" });

  el.addEventListener("mouseenter", onEnter);
  el.addEventListener("mouseleave", onLeave);

  return () => {
    el.removeEventListener("mouseenter", onEnter);
    el.removeEventListener("mouseleave", onLeave);
  };
}
