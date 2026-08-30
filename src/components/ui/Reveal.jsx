import { useEffect, useRef } from "react";
import { revealOnScroll } from "../../animations/scrollAnimations";

export default function Reveal({ children, delay = 0, y = 28, className = "", as: Tag = "div" }) {
  const ref = useRef(null);

  useEffect(() => {
    return revealOnScroll(ref.current, { delay, y });
  }, [delay, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
