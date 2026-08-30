import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import SocialIcons from "../components/ui/SocialIcons";
import { profile } from "../data/profile";
import { socials } from "../data/socials";

const initialForm = { name: "", email: "", subject: "", message: "" };
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(form.subject || `Portfolio contact from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });
      if (res.ok) {
        setStatus("sent");
        setForm(initialForm);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="border-t border-border py-28">
      <Container>
        <Reveal className="mb-16 max-w-3xl">
          <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <span className="text-fg">09</span>
            <span className="h-px w-8 bg-border" />
            <span>Contact</span>
          </div>
          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-6xl">
            Let's build something secure.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
            Have an opportunity, a project, or a security question? Send a message below —
            I read every one.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="space-y-4">
            {profile.availability && (
              <p className="inline-flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-fg" />
                {profile.availability}
              </p>
            )}

            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 border border-border p-5 transition-colors hover:border-fg"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center border border-border text-fg">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                    Email
                  </p>
                  <p className="text-sm font-medium text-fg">{profile.email}</p>
                </div>
              </a>
            )}

            {profile.location && (
              <div className="flex items-center gap-4 border border-border p-5">
                <span className="inline-flex h-11 w-11 items-center justify-center border border-border text-fg">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                    Location
                  </p>
                  <p className="text-sm font-medium text-fg">{profile.location}</p>
                </div>
              </div>
            )}

            {profile.phone && (
              <a
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-4 border border-border p-5 transition-colors hover:border-fg"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center border border-border text-fg">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                    Phone
                  </p>
                  <p className="text-sm font-medium text-fg">{profile.phone}</p>
                </div>
              </a>
            )}

            <div className="pt-2">
              <SocialIcons socials={socials} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-5 border border-border p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  required
                />
                <Field
                  label="Email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                />
              </div>

              <Field
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project inquiry"
              />

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-fg">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="w-full resize-none border border-border bg-card px-4 py-3 text-sm text-fg placeholder:text-muted/70 outline-none transition-colors focus:border-fg"
                />
              </div>

              <Button type="submit" variant="primary" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send message"}
                <Send size={16} className="ml-1 inline" />
              </Button>

              {status === "sent" && (
                <p role="status" className="text-sm text-muted">
                  Message sent — thanks for reaching out.
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="text-sm text-muted">
                  Something went wrong. Please try emailing directly instead.
                </p>
              )}
              {!FORM_ENDPOINT && (
                <p className="font-mono text-[11px] text-muted">
                  Form isn't wired to a backend yet — submitting opens your email client instead.
                  See the README to connect a free form service.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Field({ label, name, type = "text", value, onChange, placeholder, required }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-fg">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-border bg-card px-4 py-3 text-sm text-fg placeholder:text-muted/70 outline-none transition-colors focus:border-fg"
      />
    </div>
  );
}
