import { ArrowUpRight } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../utils/cn";

const base =
  "group inline-flex items-center justify-center gap-2 border px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg disabled:cursor-not-allowed disabled:opacity-40";

const variants = {
  primary: "border-fg bg-fg text-bg hover:opacity-85",
  secondary: "border-border text-fg hover:border-fg",
  ghost: "border-transparent text-muted hover:text-fg",
};

const Button = forwardRef(function Button(
  { as: Tag = "button", variant = "primary", showArrow = false, className = "", children, ...props },
  ref,
) {
  return (
    <Tag ref={ref} className={cn(base, variants[variant], className)} {...props}>
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Tag>
  );
});

export default Button;
