import Container from "../components/ui/Container";
import ProfileImage from "../components/ui/ProfileImage";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import { profile } from "../data/profile";

export default function About() {
  return (
    <section id="about" className="py-28">
      <Container>
        <SectionHeading number="01" label="About" title="About me" />

        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <ProfileImage
              image="images/profile.jpg"
              hoverImage="images/profile-hover.jpg"
              shape="rounded"
              size="lg"
              alt={profile.name}
            />
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.05} className="space-y-5">
              {profile.bio.map((paragraph, i) => (
                <p key={i} className="text-base leading-relaxed text-muted sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-wide text-muted">
                  Interests
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="border border-border px-3 py-1.5 text-sm text-fg"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="border-l-2 border-border pl-5">
                <p className="mb-2 font-mono text-xs uppercase tracking-wide text-muted">
                  Currently
                </p>
                <p className="text-base leading-relaxed text-muted">{profile.goals}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
