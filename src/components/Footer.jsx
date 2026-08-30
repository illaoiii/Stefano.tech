import { profile } from "../data/profile";
import { socials } from "../data/socials";
import Container from "./ui/Container";
import SocialIcons from "./ui/SocialIcons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs uppercase tracking-wide text-muted">
          © {year} {profile.name}. Built with React, Vite &amp; Tailwind CSS.
        </p>
        <SocialIcons socials={socials} iconClassName="h-9 w-9" />
      </Container>
    </footer>
  );
}
