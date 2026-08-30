import Reveal from "./Reveal";

export default function SectionHeading({ number, label, title, description, align = "left" }) {
  return (
    <Reveal
      className={`mb-14 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <div
        className={`mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted uppercase ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        {number && <span className="text-fg">{number}</span>}
        <span className="h-px w-8 bg-border" />
        {label && <span>{label}</span>}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
      )}
    </Reveal>
  );
}
