import { Award, ExternalLink } from "lucide-react";
import Container from "../components/ui/Container";
import ProjectImage from "../components/ui/ProjectImage";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import { certifications } from "../data/certifications";

export default function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="border-t border-border py-28">
      <Container>
        <SectionHeading number="06" label="Certifications" title="Certifications" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => {
            const meta = [cert.organization, cert.date].filter(Boolean).join(" · ");
            return (
              <Reveal key={cert.name} delay={i * 0.06} className="border border-border">
                {cert.image ? (
                  <ProjectImage
                    image={cert.image}
                    alt={cert.name}
                    aspect="aspect-[3/2]"
                    grayscaleDefault={false}
                  />
                ) : (
                  <div className="p-6 pb-0">
                    <Award size={22} strokeWidth={1.25} className="text-fg" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-base font-semibold text-fg">{cert.name}</h3>
                  {meta && <p className="mt-1 text-sm text-muted">{meta}</p>}
                  {cert.description && (
                    <p className="mt-3 text-sm leading-relaxed text-muted">{cert.description}</p>
                  )}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm text-fg underline decoration-border underline-offset-4 hover:decoration-fg"
                    >
                      View credential <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
