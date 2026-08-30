import { useEffect, useRef, useState } from "react";
import { getGsap, prefersReducedMotion } from "../animations/gsap";

const SESSION_KEY = "portfolio-loader-shown";

export default function Loader({ onDone }) {
  const [visible, setVisible] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) !== "true";
    } catch {
      return true;
    }
  });
  const containerRef = useRef(null);
  const percentRef = useRef(null);

  useEffect(() => {
    if (!visible) {
      onDone();
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // ignore — worst case the loader replays once more
    }

    if (prefersReducedMotion()) {
      const timeout = setTimeout(() => {
        setVisible(false);
        onDone();
      }, 300);
      return () => clearTimeout(timeout);
    }

    const { gsap } = getGsap();
    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            setVisible(false);
            onDone();
          },
        });
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 1.1,
      ease: "power1.inOut",
      onUpdate: () => {
        if (percentRef.current) {
          percentRef.current.textContent = `${Math.round(counter.value)}%`;
        }
      },
    });

    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-bg text-fg"
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
        [ My Portfolio ]
      </p>
      <p className="font-mono text-sm text-muted">Loading...</p>
      <p ref={percentRef} className="font-mono text-4xl font-semibold tabular-nums">
        0%
      </p>
    </div>
  );
}
