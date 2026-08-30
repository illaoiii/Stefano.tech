import { GraduationCap } from "lucide-react";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import { education } from "../data/education";

export default function Education() {
  if (education.length === 0) return null;

  return (
    <section id="education" className="py-28">
      <Container>
        <SectionHeading number="05" label="Education" title="Education" />

        <div className="grid gap-6 sm:grid-cols-2">
          {education.map((edu, i) => (
            <Reveal key={edu.school + edu.program} delay={i * 0.08} className="border border-border p-7">
              <GraduationCap size={22} strokeWidth={1.25} className="text-fg" />
              <h3 className="mt-5 text-base font-semibold text-fg">{edu.program}</h3>
              <p className="mt-1 text-sm text-muted">
                {edu.school} · {edu.years}
              </p>
              {edu.description && (
                <p className="mt-4 text-sm leading-relaxed text-muted">{edu.description}</p>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
