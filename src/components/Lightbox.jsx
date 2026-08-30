import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import Modal from "./ui/Modal";
import ProjectImage from "./ui/ProjectImage";

export default function Lightbox({ items, activeIndex, onClose, onNavigate }) {
  const isOpen = activeIndex !== null && activeIndex !== undefined;
  const item = isOpen ? items[activeIndex] : null;

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "ArrowRight") onNavigate((activeIndex + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((activeIndex - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, activeIndex, items.length, onNavigate]);

  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="lightbox-title" className="max-w-4xl">
      <div className="relative">
        <ProjectImage
          image={item.image}
          alt={item.title}
          aspect="aspect-video"
          grayscaleDefault={false}
        />

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onNavigate((activeIndex - 1 + items.length) % items.length)}
              aria-label="Previous item"
              className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center border border-border bg-bg/80 text-fg backdrop-blur transition-colors hover:border-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-fg"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate((activeIndex + 1) % items.length)}
              aria-label="Next item"
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center border border-border bg-bg/80 text-fg backdrop-blur transition-colors hover:border-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-fg"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      <div className="p-6">
        <p className="font-mono text-[11px] uppercase tracking-wide text-muted">{item.type}</p>
        <h3 id="lightbox-title" className="mt-1 text-xl font-semibold text-fg">
          {item.title}
        </h3>
      </div>
    </Modal>
  );
}
