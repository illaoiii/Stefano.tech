import ProjectImage from "./ui/ProjectImage";

export default function ProjectCard({ project, onOpen, featured = false }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
    >
      <ProjectImage
        image={project.image}
        alt={project.title}
        aspect={featured ? "aspect-[16/10]" : "aspect-[4/3]"}
      />
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-fg transition-transform duration-300 group-hover:translate-x-1 sm:text-lg">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-xs uppercase tracking-wide text-muted">
            {project.category} · {project.year}
          </p>
        </div>
      </div>
    </button>
  );
}
