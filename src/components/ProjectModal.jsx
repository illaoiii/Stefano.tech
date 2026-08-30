import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import ProjectImage from "./ui/ProjectImage";
import Modal from "./ui/Modal";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const {
    title,
    description,
    technologies = [],
    role,
    year,
    github,
    liveDemo,
    image,
    gallery = [],
  } = project;

  return (
    <Modal isOpen={Boolean(project)} onClose={onClose} labelledBy="project-modal-title">
      <ProjectImage image={image} alt={title} aspect="aspect-video" grayscaleDefault={false} />

      <div className="space-y-6 p-6 sm:p-8">
        <div>
          <h3 id="project-modal-title" className="text-2xl font-semibold text-fg sm:text-3xl">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
        </div>

        <dl className="grid grid-cols-2 gap-4 border-y border-border py-5 sm:grid-cols-4">
          {role && (
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wide text-muted">Role</dt>
              <dd className="mt-1 text-sm text-fg">{role}</dd>
            </div>
          )}
          {year && (
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wide text-muted">Year</dt>
              <dd className="mt-1 text-sm text-fg">{year}</dd>
            </div>
          )}
        </dl>

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="border border-border px-2.5 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {gallery.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {gallery.map((src, i) => (
              <ProjectImage
                key={i}
                image={src}
                alt={`${title} screenshot ${i + 1}`}
                aspect="aspect-square"
              />
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-2">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm text-fg transition-colors hover:border-fg"
            >
              <FaGithub size={16} /> Code
            </a>
          )}
          {liveDemo && (
            <a
              href={liveDemo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-fg bg-fg px-5 py-2.5 text-sm text-bg transition-opacity hover:opacity-85"
            >
              <ExternalLink size={16} /> Live demo
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
}
