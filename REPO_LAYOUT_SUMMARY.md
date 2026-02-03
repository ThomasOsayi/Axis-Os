# Axis-Os — Repository Layout & Implementation Summary

## File Structure (Tree)

```
Axis-Os/
├── .claude/
│   └── settings.local.json
├── axis-os-landing/                    # Next.js landing app
│   ├── .eslintrc.json
│   ├── .gitignore
│   ├── components.json                 # shadcn/ui config (new-york, lucide)
│   ├── next.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── README.md
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── src/
│       ├── app/
│       │   ├── favicon.ico
│       │   ├── fonts/
│       │   │   ├── GeistMonoVF.woff
│       │   │   └── GeistVF.woff
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   └── page.tsx
│       ├── components/
│       │   ├── AnimatedCounter.tsx
│       │   ├── FloatingOrbs.tsx
│       │   ├── Logo.tsx
│       │   ├── Navigation.tsx
│       │   ├── SectionReveal.tsx
│       │   ├── sections/
│       │   │   ├── Contact.tsx
│       │   │   ├── Footer.tsx
│       │   │   ├── Hero.tsx
│       │   │   ├── Pricing.tsx
│       │   │   ├── Process.tsx
│       │   │   └── Results.tsx
│       │   └── ui/
│       │       ├── button.tsx
│       │       ├── card.tsx
│       │       └── progress.tsx
│       └── lib/
│           └── utils.ts
└── README.md
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, CSS variables, tailwindcss-animate |
| **UI Components** | shadcn/ui (new-york style), Radix (Progress, Slot), lucide-react |
| **Animation** | Framer Motion 12 |
| **Utilities** | clsx, tailwind-merge, class-variance-authority |
| **Fonts** | Geist (local VF woff) |

---

## What’s Implemented

### App Shell

- **Root layout** (`src/app/layout.tsx`): Geist font, dark theme, metadata (title: “AXIS OS \| Growth Systems Marketing Agency”, description for outreach/professionalism/automation).
- **Home page** (`src/app/page.tsx`): Single-page layout with `Navigation` and six sections in order: Hero → Process → Results → Pricing → Contact → Footer. Dark slate background (`bg-slate-950`).
- **Global styles** (`globals.css`): Tailwind layers, design tokens (background, card, primary cyan, radius, etc.), custom keyframes for floating orbs (`float-1`, `float-2`, `float-3`), gradient text utility (`.gradient-text`).

### Sections (Landing Content)

| Section | File | Summary |
|--------|------|--------|
| **Hero** | `sections/Hero.tsx` | Full-viewport hero with FloatingOrbs, badge (“Growth Systems for Ambitious Brands”), headline “Turn Attention Into Predictable Revenue”, subcopy, CTA “Start Your Growth Plan” → `#contact`, secondary “See How It Works” → `#process`, and three AnimatedCounter stats (46.4x ROAS, $87k+ Profit, 35k+ Reached). |
| **Process** | `sections/Process.tsx` | Four-step process (Strategy & Alignment, Brand & Positioning, Outreach & Traffic, Systems & Scale) with expandable cards, Progress bars, Framer Motion (AnimatePresence), and per-step details/outcomes. |
| **Results** | `sections/Results.tsx` | “Proven Results” with three case-study cards (Caddie Splash, CMC Design Co, butcute): metrics, descriptions, gradient borders; uses Card, AnimatedCounter, SectionReveal. |
| **Pricing** | `sections/Pricing.tsx` | Three tiers: Core Growth ($2.5k–$3k/mo), Growth + Automation ($3.5k–$4.5k/mo, marked popular), Full System ($5k+/mo); feature lists, CTAs; SectionReveal. |
| **Contact** | `sections/Contact.tsx` | “Ready to Build Your Growth System?” with “For You” / “Not For You” cards (Check/X), FloatingOrbs, CTA to contact; id=`contact` for nav. |
| **Footer** | `sections/Footer.tsx` | Logo, copyright, links: Privacy, Terms, Contact (`#contact`). |

### Shared Components

| Component | Purpose |
|----------|--------|
| **Navigation** | Fixed nav with scroll state (backdrop blur when scrolled), Logo, desktop links (Process, Results, Pricing, Contact), mobile hamburger, active section highlight. |
| **Logo** | AXIS OS branding (used in nav and footer). |
| **SectionReveal** | Framer Motion wrapper: in-view trigger, fade + slide-up (opacity, y), configurable delay; used across sections. |
| **AnimatedCounter** | Count-up on scroll-into-view (useInView), optional prefix/suffix/decimals, easing; used in Hero stats and Results. |
| **FloatingOrbs** | Three blurred gradient orbs with CSS animations (float-1/2/3); used in Hero and Contact. |

### UI Primitives (shadcn-style)

- **Button** (`ui/button.tsx`): Variants/sizes, `asChild` for link CTAs.
- **Card** (`ui/card.tsx`): Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter.
- **Progress** (`ui/progress.tsx`): Radix-based progress bar (used in Process steps).

### Utilities

- **`lib/utils.ts`**: `cn()` — `clsx` + `tailwind-merge` for class names.

---

## Design System Notes

- **Theme**: Dark (slate-950 base), cyan/blue/indigo accents, emerald for “for you” in Contact.
- **Motion**: Scroll-triggered reveals (SectionReveal), counter animations, floating orbs; Framer Motion for process accordion.
- **Responsive**: Tailwind breakpoints (sm, md, lg) used for typography, spacing, and nav (mobile menu).
- **Accessibility**: Semantic sections and ids (`#process`, `#results`, `#pricing`, `#contact`) for in-page navigation and active states.

---

## Scripts (axis-os-landing)

- `npm run dev` — Next.js dev server  
- `npm run build` — Production build  
- `npm run start` — Start production server  
- `npm run lint` — ESLint  

---

*Generated as a repo layout and implementation summary for Axis-Os.*
