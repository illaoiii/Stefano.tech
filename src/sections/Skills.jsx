import { Code2, Cpu, LayoutGrid, Palette, ShieldCheck, Terminal, Users } from "lucide-react";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import { skills } from "../data/skills";

const iconMap = { Code2, LayoutGrid, ShieldCheck, Palette, Terminal, Cpu, Users };

export default function Skills() {
  return (
    <section id="skills" className="border-t border-border py-28">
      <Container>
        <SectionHeading
          number="02"
          label="Skills"
          title="Skills"
          description="Tools and areas I'm actively working with — not a claim of mastery, just an honest snapshot."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => {
            const Icon = iconMap[group.icon] ?? Code2;
            return (
              <Reveal key={group.category} delay={i * 0.06} className="border border-border p-7">
                <Icon size={22} strokeWidth={1.25} className="text-fg" />
                <h3 className="mt-5 mb-4 text-lg font-semibold text-fg">{group.category}</h3>
                <ul className="space-y-2">
                  {group.items.map((skill) => (
                    <li key={skill} className="text-sm text-muted">
                      {skill}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
