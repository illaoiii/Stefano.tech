# Portfolio

A personal developer / designer / creative portfolio. Black-and-white, minimal,
built with React, Vite, Tailwind CSS, and GSAP.

This README is written for someone editing this for the first time — every
"how do I change X" question you'll have in the first hour is answered below.

## 1. Overview

Single-page React app with these sections: Loading screen, Navigation, Hero,
About, Skills, Services, Experience, Education, Certifications, Featured
Projects, Project Gallery (with filtering), Creative/Multimedia showcase, and
Contact.

Almost nothing is hardcoded in the components — page content lives in small
data files under `src/data/`, so you can personalize the whole site without
touching component code.

## 2. Technologies

- **React** — UI
- **Vite** — dev server & build tool
- **Tailwind CSS v4** — styling (via `@tailwindcss/vite`)
- **GSAP** (+ ScrollTrigger) — scroll reveals, hero intro, hover/loader animation
- **Lucide React** — icons (generic UI icons)
- **react-icons** — used only for brand/social logos (GitHub, LinkedIn, etc.), since Lucide doesn't ship those

No paid services, API keys, or subscriptions are required to run or deploy this site.

## 3. Installation

```bash
npm install
```

## 4. Running locally

```bash
npm run dev
```

Opens at `http://localhost:5173`. Edits to files hot-reload automatically.

## 5. Building for production

```bash
npm run build      # outputs to dist/
npm run preview    # serve the built dist/ folder locally to sanity-check it
```

Other scripts: `npm run lint` runs oxlint.

## 6. Folder structure

```
src/
├── components/     Reusable UI: Navbar, Footer, Loader, modals, buttons, etc.
│   └── ui/         Smaller primitives (Button, Modal, ProfileImage, ProjectImage...)
├── sections/       One file per page section (Hero, About, Skills, Projects...)
├── animations/     GSAP setup + reusable animation functions
├── data/           ALL editable content — see section 7 below
├── hooks/          useTheme, useReducedMotion, useActiveSection, etc.
├── utils/          Small helpers (cn.js for merging class names)
├── App.jsx         Top-level layout — wires sections together
├── main.jsx        React entry point
└── index.css       Design tokens (colors, fonts) + global styles
```

## 7. How to change your information

Everything below is a plain JavaScript file — open it, edit the values, save.

| What | File |
|---|---|
| Name, role, tagline, bio, interests, email, location, resume path | `src/data/profile.js` |
| Social links (GitHub, LinkedIn, Facebook, Instagram, YouTube, Email) | `src/data/socials.js` |
| Nav bar links | `src/data/navigation.js` |
| Skills by category | `src/data/skills.js` |
| Services you offer | `src/data/services.js` |
| Work experience | `src/data/experience.js` |
| Education | `src/data/education.js` |
| Certifications | `src/data/certifications.js` |
| Projects (see section 9) | `src/data/projects.js` |
| Creative/multimedia showcase | `src/data/creative.js` |

**Leaving an array empty (`[]`)** in `experience.js`, `education.js`, or
`certifications.js` hides that whole section automatically — no code changes
needed.

**Leaving a social `href` as `""`** in `socials.js` hides that icon.

## 8. How to change your profile image

Drop your default photo at:

```
public/images/profile.jpg
```

Optionally, drop a second photo at:

```
public/images/profile-hover.jpg
```

`profile.jpg` shows by default; hovering the photo crossfades to
`profile-hover.jpg` (a different pose/expression works well here). If you
don't add a hover image, hovering just does nothing — no error, no broken
image.

The About section (`src/sections/About.jsx`) already points at both paths via
the `<ProfileImage>` component. Until `profile.jpg` exists, it shows a clean
placeholder instead of a broken image — nothing looks broken in the meantime.

`ProfileImage` (`src/components/ui/ProfileImage.jsx`) accepts:

```jsx
<ProfileImage
  image="images/profile.jpg"
  hoverImage="images/profile-hover.jpg"  // optional
  shape="rounded"      // "rectangle" | "rounded" | "circle"
  size="lg"             // "sm" | "md" | "lg" | "full"
  grayscale={true}
/>
```

## 9. How to add projects

Edit `src/data/projects.js`. Each project is an object:

```js
{
  title: "Project Name",
  description: "Project description",
  category: "Web", // "Web" | "Cybersecurity" | "Graphics" | "Video" | "Multimedia"
  image: "images/projects/project-1.jpg",
  technologies: ["React", "JavaScript", "Tailwind CSS"],
  github: "https://github.com/you/project",   // leave "" to hide the button
  liveDemo: "https://your-demo.com",           // leave "" to hide the button
  year: "2026",
  featured: true,   // shows it in the "Featured Projects" row up top
  role: "Developer",
  gallery: ["images/projects/project-1-1.jpg"], // extra images shown in the modal
}
```

The category filter buttons (All / Web / Cybersecurity / Graphics / Video /
Multimedia) automatically reflect whatever's in this file — clicking a
project card opens a detail modal with the gallery, tech list, and links.

## 10. How to add project / certificate / creative images

Put image files in:

```
public/images/projects/       → referenced by src/data/projects.js
public/images/certificates/   → referenced by src/data/certifications.js
public/images/creative/       → referenced by src/data/creative.js
```

Reference them **without** a leading slash, e.g. `images/projects/my-shot.jpg`
(not `/images/projects/my-shot.jpg`) — this project deploys to a subpath on
GitHub Pages, and relative paths are what make that work without extra
configuration. Any image path that doesn't resolve just falls back to a
placeholder — the page never shows a broken image icon.

## 11. How to add certifications

Edit `src/data/certifications.js`. Leave `image` or `credentialUrl` as `""`
to hide that part of the card.

## 12. How to change social links

Edit `src/data/socials.js`. Set `href` to your real profile URL, or leave it
`""` to hide that icon entirely (in the hero, footer, and contact section).

## 13. How to change colors

Open `src/index.css`. The whole palette is defined in two small blocks:

```css
:root {  /* light mode */
  --bg: #ffffff;
  --fg: #0a0a0a;
  --muted: #59595c;
  --border: #e4e4e4;
  --card: #f7f7f7;
}

.dark {  /* dark mode (default) */
  --bg: #0a0a0a;
  --fg: #fafafa;
  --muted: #9a9a9d;
  --border: #262626;
  --card: #121212;
}
```

Everything in the app uses these five variables (via Tailwind classes like
`bg-bg`, `text-fg`, `text-muted`, `border-border`, `bg-card`) — change them
here and the whole site updates. The design is intentionally monochrome; if
you add an accent color, define it the same way and use it sparingly.

## 14. How to change animations

GSAP logic lives in `src/animations/`:

- `gsap.js` — registers ScrollTrigger once, exposes `prefersReducedMotion()`
- `heroAnimations.js` — the hero's intro text reveal
- `scrollAnimations.js` — the generic "fade up on scroll" used by `<Reveal>`, and the project-filter stagger
- `hoverAnimations.js` — button lift + image zoom on hover
- `pageAnimations.js` — loader → content handoff

All animations check `prefersReducedMotion()` and skip/shorten themselves
when the user has reduced motion enabled at the OS level.

The `<Reveal>` component (`src/components/ui/Reveal.jsx`) is what makes
almost every section fade up on scroll — wrap anything in it to get that
effect for free: `<Reveal delay={0.1}>...</Reveal>`.

## 15. How to add your resume

Drop your PDF at:

```
public/resume.pdf
```

The hero's "Download resume" button checks whether that file exists. Until
you add it, the button shows "Resume coming soon" and is disabled instead of
linking to a 404.

## 16. Contact form

The contact form works out of the box with **no backend**: submitting it
opens the visitor's email client with a pre-filled message to the address in
`src/data/profile.js`.

If you'd rather receive submissions directly (no email client popup), you can
wire it to a free form backend like [Formspree](https://formspree.io) (free
tier, no credit card, no server of your own required):

1. Create a free Formspree account and a new form — you'll get an endpoint
   URL like `https://formspree.io/f/xxxxxxx`.
2. Copy `.env.example` to `.env`.
3. Set `VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx` in `.env`.
4. Restart `npm run dev`.

That endpoint isn't a secret (it's meant to be used from a browser), but keep
it out of source control anyway — `.env` is already gitignored.

## 17. SEO & social preview

Edit the `<head>` of `index.html`:

- `<title>` — browser tab title
- `<meta name="description">` — search engine snippet
- `og:title` / `og:description` / `og:image` — how the page looks when
  shared on social media / iMessage / Discord, etc. Add a real image at
  `public/og-image.jpg` (about 1200×630px) and it'll be picked up automatically.
- `<link rel="icon">` — points at `public/favicon.svg`; replace that file with
  your own icon (any square SVG or PNG works).

## 18. Deploying

### GitHub Pages (configured for you)

This repo already includes `.github/workflows/deploy.yml`, which builds and
publishes the site automatically every time you push to `main`. One-time setup:

1. Push this repo to GitHub (see the exact commands your assistant/README gave you, or section 19 below).
2. On GitHub: **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**.
3. Push to `main` (or re-run the workflow from the **Actions** tab). The site
   publishes to `https://<your-username>.github.io/<repo-name>/`.

This works whether the repo is a project page (`username.github.io/repo-name/`)
or you rename it to `username.github.io` for a root page — every asset
reference in this project is a relative path (see section 10), and
`vite.config.js` builds with `base: './'`, so nothing needs to change either way.

### Other static hosts

The build output (`npm run build` → `dist/`) is a plain static site and works
anywhere:

- **Vercel** / **Netlify**: connect the repo, build command `npm run build`, output directory `dist`.

If you're using the Formspree contact form, set `VITE_FORM_ENDPOINT` as an
environment variable in your host's project settings (not committed to git).
For GitHub Pages specifically, add it as a repo variable/secret and reference
it in `deploy.yml`'s build step if you want it baked into the deployed build.

## 19. Chatbot

`src/components/ChatbotWidget.jsx` is a disabled placeholder button, not a
working chatbot. There's no genuinely free way to run a real AI chatbot
entirely client-side — any real model call needs a backend to hold the API
key (never put an OpenAI/Anthropic/Gemini key in frontend code). Wire this up
later once you have a backend or serverless function to proxy the request.

## 20. Remaining TODOs (things only you can fill in)

Content from your resume (`Stefano_Ilao_Resume (4) - Copy.docx`) is already in
`src/data/` — name, role, bio, skills, education, certifications, and your one
listed project (Sign Language Recognition Model). What's still missing:

- [x] `public/images/profile.jpg` and `public/images/profile-hover.jpg` are in place
- [ ] Export your resume as a PDF and add it at `public/resume.pdf` (the source file is a `.docx` — no converter was available on this machine, so this step is on you: File → Save As / Export → PDF in Word or Google Docs)
- [ ] Add a screenshot/demo image of the Sign Language Recognition Model to `public/images/projects/` and update its `image` path in `src/data/projects.js`
- [ ] Add real GitHub/LinkedIn URLs in `src/data/socials.js` if you have them (your resume didn't list any, so they're currently hidden)
- [ ] As you finish CompTIA Security+ / CCNA, move them from "in progress" (`skills.js`, `profile.js`) into `src/data/certifications.js` as earned credentials
- [ ] As you gain real work experience, add entries to `src/data/experience.js` (currently empty) and add `{ label: "Experience", href: "#experience" }` back into `src/data/navigation.js`
- [ ] Optional: set up `VITE_FORM_ENDPOINT` for the contact form (see section 16)
- [ ] Optional: add a real `public/og-image.jpg` for social link previews

Two content decisions I made that you should sanity-check:

- **"Focus areas" section** (`src/sections/Services.jsx` / `src/data/services.js`) — your resume reads as a job-seeker, not a freelancer, so I reframed the spec's original "Services" list into focus areas derived from your actual skills instead of generic freelance offerings (web dev, video editing, etc.) that weren't backed by anything in your resume. Rename it back to "Services" and restore freelance-style content if that's actually the direction you want.
- **Creative/Multimedia section is hidden** (`src/data/creative.js` is empty) — nothing in your resume pointed to photography/video/graphics work, so rather than invent placeholder creative work, this section just doesn't render. Add real items there if you have multimedia work to show, and it'll appear automatically.
