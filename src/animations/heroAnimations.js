import { getGsap, prefersReducedMotion } from "./gsap";

// Runs once on mount: intro text reveal for the hero section.
// refs: { eyebrow, name, title, description, actions, socials }
export function playHeroIntro(refs) {
  const targets = Object.values(refs).filter(Boolean);
  if (targets.length === 0) return;

  if (prefersReducedMotion()) {
    targets.forEach((t) => {
      t.style.opacity = 1;
      t.style.transform = "none";
    });
    return;
  }

  const { gsap } = getGsap();
  gsap.set(targets, { opacity: 0, y: 24 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });
  tl.to(refs.eyebrow, { opacity: 1, y: 0 })
    .to(refs.name, { opacity: 1, y: 0 }, "-=0.55")
    .to(refs.title, { opacity: 1, y: 0 }, "-=0.55")
    .to(refs.description, { opacity: 1, y: 0 }, "-=0.5")
    .to(refs.actions, { opacity: 1, y: 0 }, "-=0.45")
    .to(refs.socials, { opacity: 1, y: 0 }, "-=0.4");

  return tl;
}
