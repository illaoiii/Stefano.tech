import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "../data/navigation";
import { profile } from "../data/profile";
import useActiveSection from "../hooks/useActiveSection";
import useLockBodyScroll from "../hooks/useLockBodyScroll";
import Container from "./ui/Container";
import ThemeToggle from "./ui/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
  const activeId = useActiveSection(sectionIds);

  useLockBodyScroll(isOpen);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-bg/10 bg-fg text-bg">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <a href="#home" className="font-mono text-sm font-semibold tracking-wide text-bg">
          {profile.initials}
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = id === activeId;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative py-1 text-sm tracking-wide transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-bg after:transition-all after:duration-300 ${
                  isActive
                    ? "text-bg after:w-full"
                    : "text-bg/60 after:w-0 hover:text-bg hover:after:w-full"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="group hidden items-center gap-1.5 border border-bg bg-bg px-4 py-2 text-sm text-fg transition-opacity hover:opacity-85 sm:inline-flex"
          >
            Say hi
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <ThemeToggle invert className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="inline-flex h-10 w-10 items-center justify-center border border-bg/30 text-bg md:hidden"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {isOpen && (
        <div className="border-t border-bg/10 bg-fg md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-bg/10 py-3 text-sm text-bg last:border-none"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-1.5 border border-bg bg-bg py-2.5 text-sm font-medium text-fg"
            >
              Say hi <ArrowUpRight size={14} />
            </a>
            <div className="flex items-center justify-between pt-4">
              <span className="font-mono text-xs uppercase tracking-wide text-bg/60">Theme</span>
              <ThemeToggle invert />
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
