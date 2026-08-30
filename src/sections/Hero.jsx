import { Download } from "lucide-react";
import { useEffect, useRef } from "react";
import { playHeroIntro } from "../animations/heroAnimations";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import SocialIcons from "../components/ui/SocialIcons";
import Squiggle from "../components/ui/Squiggle";
import { profile } from "../data/profile";
import { socials } from "../data/socials";
import useFileExists from "../hooks/useFileExists";

// Underlines this phrase in the tagline if present — falls back to plain
// text if you edit profile.js and the phrase no longer matches.
const HIGHLIGHT_PHRASE = "offensive security";

function renderTaglineWithHighlight(tagline) {
  const idx = tagline.indexOf(HIGHLIGHT_PHRASE);
  if (idx === -1) return tagline;
  return (
    <>
      {tagline.slice(0, idx)}
      <Squiggle>{HIGHLIGHT_PHRASE}</Squiggle>
      {tagline.slice(idx + HIGHLIGHT_PHRASE.length)}
    </>
  );
}

export default function Hero() {
  const eyebrowRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const actionsRef = useRef(null);
  const socialsRef = useRef(null);
  const resumeExists = useFileExists(profile.resume);

  useEffect(() => {
    const tl = playHeroIntro({
      eyebrow: eyebrowRef.current,
      name: nameRef.current,
      title: titleRef.current,
      description: descriptionRef.current,
      actions: actionsRef.current,
      socials: socialsRef.current,
    });
    return () => tl?.kill();
  }, []);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_65%_65%_at_50%_15%,black,transparent)]" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/4 hidden select-none font-mono text-[220px] font-bold leading-none text-fg/[0.03] lg:block"
      >
        {profile.initials}
      </span>

      <Container className="relative py-24 lg:py-0">
        <p
          ref={eyebrowRef}
          className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-muted"
        >
          Hello, I'm
        </p>

        <h1
          ref={nameRef}
          className="text-5xl font-bold uppercase leading-[0.95] tracking-tight text-fg sm:text-7xl lg:text-8xl"
        >
          {profile.name}
        </h1>

        <p
          ref={titleRef}
          className="mt-6 font-mono text-sm uppercase tracking-[0.25em] text-muted sm:text-base"
        >
          {profile.titleLine}
        </p>

        <p
          ref={descriptionRef}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
        >
          {renderTaglineWithHighlight(profile.tagline)}
        </p>

        <div ref={actionsRef} className="mt-10 flex flex-wrap items-center gap-4">
          <Button as="a" href="#projects" variant="primary" showArrow>
            View my work
          </Button>
          {resumeExists ? (
            <Button as="a" href={profile.resume} download variant="secondary">
              <Download size={16} className="mr-2 inline" /> Download resume
            </Button>
          ) : (
            <Button
              as="button"
              type="button"
              variant="secondary"
              disabled
              title="Add /public/resume.pdf to enable this button"
            >
              <Download size={16} className="mr-2 inline" /> Resume coming soon
            </Button>
          )}
        </div>

        <div ref={socialsRef} className="mt-12">
          <SocialIcons socials={socials} />
        </div>
      </Container>
    </section>
  );
}
