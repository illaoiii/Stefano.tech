import { Mail } from "lucide-react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { cn } from "../../utils/cn";

// lucide-react intentionally ships no brand/logo icons, so social/brand marks
// come from react-icons instead — everything else in this project uses lucide.
const icons = {
  Github: FaGithub,
  Linkedin: FaLinkedin,
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  Youtube: FaYoutube,
  Mail,
};

export default function SocialIcons({ socials, className = "", iconClassName = "" }) {
  const active = socials.filter((s) => s.href && s.href.trim() !== "");
  if (active.length === 0) return null;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {active.map((social) => {
        const Icon = icons[social.icon] ?? Mail;
        return (
          <a
            key={social.name}
            href={social.href}
            target={social.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={social.name}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center border border-border text-muted transition-colors duration-300 hover:border-fg hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg",
              iconClassName,
            )}
          >
            <Icon size={16} />
          </a>
        );
      })}
    </div>
  );
}
