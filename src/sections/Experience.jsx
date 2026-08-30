import { Briefcase } from "lucide-react";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import { experience } from "../data/experience";

export default function Experience() {
  if (experience.length === 0) return null;

  return (
    <section id="experience" className="border-t border-border py-28">
      <Container>
        <SectionHeading number="04" label="Experience" title="Experience" />

        <div className="space-y-10 border-l border-border pl-8 sm:pl-10">
          {experience.map((job, i) => (
            <Reveal key={`${job.company}-${job.position}`} delay={i * 0.08} className="relative">
              <span className="absolute -left-[38px] top-1 flex h-6 w-6 items-center justify-center border border-border bg-bg text-fg sm:-left-[46px]">
                <Briefcase size={12} />
              </span>

              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-fg">
                  {job.position} <span className="text-muted">— {job.company}</span>
                </h3>
                <span className="font-mono text-xs uppercase tracking-wide text-muted">
                  {job.date}
                </span>
              </div>

              {job.description && (
                <p className="mt-3 text-sm leading-relaxed text-muted">{job.description}</p>
              )}

              {job.responsibilities?.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {job.responsibilities.map((point, idx) => (
                    <li key={idx} className="flex gap-2 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {job.tools?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.tools.map((tool) => (
                    <span key={tool} className="border border-border px-2.5 py-1 font-mono text-xs text-muted">
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
