import { User } from "lucide-react";
import { useState } from "react";
import { cn } from "../../utils/cn";

const shapeClasses = {
  rectangle: "rounded-none",
  rounded: "rounded-2xl",
  circle: "rounded-full",
};

const sizeClasses = {
  sm: "w-32 h-32",
  md: "w-56 h-56",
  lg: "w-72 h-72 sm:w-96 sm:h-96",
  full: "w-full h-full",
};

export default function ProfileImage({
  image,
  hoverImage,
  shape = "rounded",
  size = "lg",
  grayscale = false,
  alt = "Profile photo",
  className = "",
}) {
  const [errored, setErrored] = useState(false);
  const [hoverErrored, setHoverErrored] = useState(false);
  const showImage = image && !errored;
  const showHoverImage = hoverImage && !hoverErrored;

  return (
    <div
      className={cn(
        "group relative overflow-hidden border border-border bg-card",
        shapeClasses[shape],
        sizeClasses[size],
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
            "h-full w-full object-cover transition-opacity duration-500",
            grayscale && "grayscale",
            showHoverImage && "group-hover:opacity-0",
          )}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-muted">
          <User size={40} strokeWidth={1.25} />
          <span className="px-4 text-center font-mono text-[11px] uppercase tracking-wide">
            Add /public/images/profile.jpg
          </span>
        </div>
      )}

      {showHoverImage && (
        <img
          src={hoverImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          onError={() => setHoverErrored(true)}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            grayscale && "grayscale",
          )}
        />
      )}
    </div>
  );
}
