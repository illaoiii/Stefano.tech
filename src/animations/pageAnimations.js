import { getGsap, prefersReducedMotion } from "./gsap";

// Loader -> main content handoff. Called once when the loader finishes.
export function playLoaderExit(loaderEl, contentEl, onComplete) {
  if (prefersReducedMotion() || !loaderEl) {
    if (loaderEl) loaderEl.style.display = "none";
    if (contentEl) contentEl.style.opacity = 1;
    onComplete?.();
    return;
  }

  const { gsap } = getGsap();
  const tl = gsap.timeline({ onComplete });

  tl.to(loaderEl, { opacity: 0, duration: 0.5, ease: "power2.inOut" }).set(loaderEl, {
    display: "none",
  });

  if (contentEl) {
    gsap.set(contentEl, { opacity: 0, y: 12 });
    tl.to(contentEl, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.2");
  }

  return tl;
}
