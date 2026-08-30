import { useMemo, useRef, useState } from "react";
import { staggerChildren } from "../animations/scrollAnimations";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import { projects } from "../data/projects";
import { cn } from "../utils/cn";

// Edit this list as your project mix grows — it just needs to match the
// "category" values used in src/data/projects.js.
const CATEGORIES = ["All", "Cybersecurity", "Machine Learning", "Embedded Systems", "Networking"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const gridRef = useRef(null);

  const featured = useMemo(() => projects.filter((p) => p.featured), []);
  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  const handleFilterChange = (category) => {
    setActiveCategory(category);
    requestAnimationFrame(() => {
      staggerChildren(gridRef.current, "[data-project-card]", { y: 16, stagger: 0.05 });
    });
  };

  return (
    <section id="projects" className="border-t border-border py-28">
      <Container>
        <SectionHeading
          number="07"
          label="Projects"
          title="Featured projects"
          description="A selection of what I've built and worked on."
        />

        {featured.length > 0 && (
          <div className="mb-20 grid gap-8 md:grid-cols-2">
            {featured.map((project, i) => (
              <Reveal key={project.title} delay={i * 0.08}>
                <ProjectCard project={project} onOpen={setSelectedProject} featured />
              </Reveal>
            ))}
          </div>
        )}

        <div className="mb-10 flex items-center justify-between gap-4 border-t border-border pt-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Project gallery</p>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleFilterChange(category)}
              aria-pressed={activeCategory === category}
              className={cn(
                "border px-4 py-2 text-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg",
                activeCategory === category
                  ? "border-fg bg-fg text-bg"
                  : "border-border text-muted hover:border-fg hover:text-fg",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted">
            No projects in this category yet.
          </p>
        ) : (
          <div ref={gridRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <div key={project.title} data-project-card>
                <ProjectCard project={project} onOpen={setSelectedProject} />
              </div>
            ))}
          </div>
        )}
      </Container>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
