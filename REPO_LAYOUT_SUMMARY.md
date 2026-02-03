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
│       │   ├── MagneticButton.tsx
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
│           ├── animations.ts
│           └── utils.ts
├── README.md
└── REPO_LAYOUT_SUMMARY.md
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

- **Root layout** (`src/app/layout.tsx`): Geist font (local VF), dark theme, metadata (title: “AXIS OS | Growth Systems Marketing Agency”, description for outreach/professionalism/automation).
- **Home page** (`src/app/page.tsx`): Single-page layout with `Navigation` and six sections in order: Hero → Process → Results → Pricing → Contact → Footer. Dark slate background (`bg-slate-950`).
- **Global styles** (`globals.css`): Tailwind layers; design tokens (background, card, primary cyan, radius, ease/duration vars); floating orbs keyframes (`float-1`, `float-2`, `float-3`) and classes (`.animate-float-1/2/3`); page-load keyframes (fade-in, fade-up, fade-down, fade-left, fade-right, scale-in, blur-in) and utilities (`.animate-fade-in`, etc.); stagger delay classes (`.delay-1` … `.delay-8`); glow/shimmer/gradient-shift keyframes and `.animate-glow-pulse`, `.animate-shimmer`, `.animate-gradient`; text-reveal keyframes and utilities; gradient utilities (`.gradient-text`, `.gradient-text-animated`, `.gradient-border`); `.animate-on-load` for initial hidden state; hover and other effect utilities.

### Sections (Landing Content)

| Section | File | Summary |
|--------|------|---------|
| **Hero** | `sections/Hero.tsx` | Full-viewport hero with FloatingOrbs, gradient mesh background, badge (“Growth Systems for Ambitious Brands”), headline “Turn Attention Into Predictable Revenue”, subcopy, primary CTA “Start Your Growth Plan” and secondary “See How It Works” (both `MagneticButton` → `#contact` / `#process`), three AnimatedCounter stats (46.4x ROAS, $87k+ Profit, 35k+ Reached). Uses SectionReveal, StaggerReveal, StaggerItem, TextReveal and `lib/animations` (staggerContainer, staggerItem, fadeInUp, easings). |
| **Process** | `sections/Process.tsx` | Four-step process (Strategy & Alignment, Brand & Positioning, Outreach & Traffic, Systems & Scale) with expandable cards, Progress bars, Framer Motion (AnimatePresence), per-step details/outcomes; uses `easings` from `lib/animations`. |
| **Results** | `sections/Results.tsx` | “Proven Results” with three case-study cards (Caddie Splash, CMC Design Co, butcute): metrics, descriptions, gradient borders; uses Card, AnimatedCounter, SectionReveal; uses `easings` from `lib/animations`. |
| **Pricing** | `sections/Pricing.tsx` | Three tiers: Core Growth ($2.5k–$3k/mo), Growth + Automation ($3.5k–$4.5k/mo, marked popular), Full System ($5k+/mo); feature lists, CTAs; SectionReveal; uses `easings` from `lib/animations`. |
| **Contact** | `sections/Contact.tsx` | “Ready to Build Your Growth System?” with “For You” / “Not For You” cards (Check/X), FloatingOrbs, primary CTA via MagneticButton; id=`contact` for nav; uses `easings` from `lib/animations`. |
| **Footer** | `sections/Footer.tsx` | Logo, copyright, links: Privacy, Terms, Contact (`#contact`). |

### Shared Components

| Component | Purpose |
|----------|---------|
| **Navigation** | Fixed nav with scroll state (backdrop blur + border when scrolled), Logo, desktop links (Process, Results, Pricing, Contact), active section highlight (cyan), “Book a Call” Button → `#contact`, mobile hamburger menu. |
| **Logo** | AXIS OS branding (nav and footer). |
| **SectionReveal** | Framer Motion scroll-in-view wrapper: configurable direction (up/down/left/right/none), effect (fade/blur/scale/blur-scale), delay, duration, distance, `once`, `margin`; supports multiple `as` tags. Also exports: **StaggerReveal** (staggered children), **StaggerItem**, **TextReveal** (character/word reveal), **ParallaxReveal**, **HoverReveal**, **CounterReveal**. Uses `easings` from `lib/animations`. |
| **AnimatedCounter** | Count-up on scroll-into-view (useInView), optional prefix/suffix/decimals, duration, easing; used in Hero stats and Results. |
| **FloatingOrbs** | Three blurred gradient orbs with CSS animations (float-1/2/3); used in Hero and Contact. |
| **MagneticButton** | Cursor-follow magnetic effect (Framer Motion useMotionValue/useSpring), configurable strength/radius; optional glow and scale on hover; supports `as` button/a/div, href, onClick, disabled. Used for Hero CTAs and Contact CTA. |

### UI Primitives (shadcn-style)

- **Button** (`ui/button.tsx`): Variants/sizes, `asChild` for link CTAs.
- **Card** (`ui/card.tsx`): Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter.
- **Progress** (`ui/progress.tsx`): Radix-based progress bar (used in Process steps).

### Lib & Utilities

- **`lib/utils.ts`**: `cn()` — clsx + tailwind-merge for class names.
- **`lib/animations.ts`**: Central Framer Motion animation primitives: **easings** (easeOutExpo, easeOutQuart, easeInOutCirc, easeOutBack, easeOutElastic); **transitions** (fast, normal, slow, slower, spring, springBouncy, springGentle); **fade variants** (fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight); **scale** (scaleIn, scaleInCenter); **blur** (blurIn, blurInUp); **stagger** (staggerContainer, staggerContainerFast/Slow, createStaggerContainer, staggerItem, staggerItemScale, staggerItemFade); **text** (textContainer, textCharacter, textWord, textBlur); **reveal** (revealVariants, revealFromLeft, revealFromRight); **special** (floatingVariants, rotateVariants, pulseVariants); **helpers** (createFadeVariant, withDelay); **viewportSettings** (once, margin presets). Used by SectionReveal, Hero, Process, Results, Pricing, Contact.

---

## Design System Notes

- **Theme**: Dark (slate-950 base), cyan/blue/indigo accents, emerald for “for you” in Contact.
- **Motion**: Scroll-triggered reveals (SectionReveal and variants), magnetic CTAs (MagneticButton), counter animations (AnimatedCounter), floating orbs; Framer Motion for process accordion; shared easing/transition presets in `lib/animations`.
- **Responsive**: Tailwind breakpoints (sm, md, lg) for typography, spacing, and nav (mobile menu).
- **Accessibility**: Semantic sections and ids (`#process`, `#results`, `#pricing`, `#contact`) for in-page navigation and active states.

---

## Scripts (axis-os-landing)

- `npm run dev` — Next.js dev server  
- `npm run build` — Production build  
- `npm run start` — Start production server  
- `npm run lint` — ESLint  

---

*Generated as a repo layout and implementation summary for Axis-Os.*
