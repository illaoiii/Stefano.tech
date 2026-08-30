import { useState } from "react";
import Lightbox from "../components/Lightbox";
import Container from "../components/ui/Container";
import ProjectImage from "../components/ui/ProjectImage";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import { creativeWork } from "../data/creative";

export default function Creative() {
  const [activeIndex, setActiveIndex] = useState(null);

  if (creativeWork.length === 0) return null;

  return (
    <section id="creative" className="border-t border-border py-28">
      <Container>
        <SectionHeading
          number="08"
          label="Creative"
          title="Creative & multimedia"
          description="Photography, video, and graphics work outside of software development."
        />

        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {creativeWork.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.06} className="mb-6 break-inside-avoid">
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
              >
                <ProjectImage image={item.image} alt={item.title} aspect="aspect-[4/5]" />
                <div className="mt-3">
                  <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                    {item.type}
                  </p>
                  <h3 className="mt-1 text-sm font-medium text-fg">{item.title}</h3>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      <Lightbox
        items={creativeWork}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </section>
  );
}
