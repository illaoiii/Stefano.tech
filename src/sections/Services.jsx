import { Code2, Cpu, FileText, Network, ShieldCheck, Wrench } from "lucide-react";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import { services } from "../data/services";

const iconMap = { ShieldCheck, Network, Code2, Cpu, Wrench, FileText };

export default function Services() {
  if (services.length === 0) return null;

  return (
    <section id="services" className="py-28">
      <Container>
        <SectionHeading
          number="03"
          label="Focus areas"
          title="Focus areas"
          description="Where my hands-on project work and coursework overlap most."
        />

        <div className="border-t border-border">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Code2;
            return (
              <Reveal
                key={service.title}
                delay={Math.min(i * 0.05, 0.3)}
                className="group grid gap-4 border-b border-border py-8 transition-colors sm:grid-cols-[64px_1.3fr_1fr] sm:items-start sm:gap-8"
              >
                <span className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex items-start gap-4">
                  <Icon
                    size={18}
                    strokeWidth={1.25}
                    className="mt-1 shrink-0 text-fg transition-transform duration-300 group-hover:translate-x-1"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-fg">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </div>
                </div>

                {service.tools?.length > 0 && (
                  <p className="font-mono text-xs leading-relaxed text-muted sm:text-right">
                    {service.tools.join(" / ")}
                  </p>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
