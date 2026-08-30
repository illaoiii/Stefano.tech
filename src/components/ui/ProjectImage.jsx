import { ImageOff } from "lucide-react";
import { useState } from "react";
import { attachImageZoom } from "../../animations/hoverAnimations";
import { cn } from "../../utils/cn";

export default function ProjectImage({
  image,
  alt = "",
  aspect = "aspect-[4/3]",
  grayscaleDefault = true,
  className = "",
}) {
  const [errored, setErrored] = useState(false);
  const showImage = image && !errored;

  const attachZoom = (el) => {
    if (el) return attachImageZoom(el);
  };

  return (
    <div
      ref={attachZoom}
      className={cn(
        "group relative w-full overflow-hidden border border-border bg-card",
        aspect,
        className,
      )}
    >
      {showImage ? (
        <img
          src={image}
          alt={alt}
          loading="lazy"
          onError={() => setErrored(true)}
          className={cn(
            "h-full w-full object-cover transition-[filter] duration-500 ease-out",
            grayscaleDefault && "grayscale group-hover:grayscale-0",
          )}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted">
          <ImageOff size={28} strokeWidth={1.25} />
          <span className="px-4 text-center font-mono text-[10px] uppercase tracking-wide">
            Image placeholder
          </span>
        </div>
      )}
    </div>
  );
}
