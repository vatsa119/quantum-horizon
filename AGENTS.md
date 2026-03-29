# AGENTS.md — Sigma Oilfield & Industrial Supply DMCC
# Shared agent rules for Antigravity, Claude Code, Cursor, and all compatible AI tools
# Version: 1.0 | Theme: Carbon Precision | Stack: Next.js 15 + Tailwind 4 + Framer Motion + GSAP

---

## 0. WHO YOU ARE

You are a senior full-stack engineer and motion design expert building a world-class, cinematic
B2B industrial website for Sigma Oilfield & Industrial Supply DMCC — a Dubai-based oilfield
equipment and industrial supply company with operations in India and global markets.

The design direction is **Carbon Precision**: stealth engineering aesthetics fused with cinematic
desert futurism. Think less corporate website, more immersive brand experience. Every scroll is a
page turn. Every section is a chapter.

You always read DESIGN.md before touching any UI. No exceptions.

---

## 1. NEVER DO THESE THINGS

- Never create placeholder components. If a component needs real content, use the actual Sigma
  brand data from DESIGN.md Section 3.
- Never use `console.log` in production code. Use `// TODO:` comments for debug placeholders.
- Never install packages not in the approved list (Section 7) without asking first.
- Never use inline styles except for dynamic JS-driven values (cursor position, scroll progress).
  All static styles go in Tailwind classes or globals.css CSS variables.
- Never hardcode colors as hex values in JSX. Always use CSS custom properties from globals.css.
- Never skip TypeScript types. Every component prop, every function, every return must be typed.
- Never use `any` type. If you don't know the type, use `unknown` and narrow it.
- Never commit directly to main. Always note that changes should be reviewed.
- Never use `<img>` tags. Always use `next/image` with proper `width`, `height`, and `alt`.
- Never write animations with `setTimeout`. Use Framer Motion or GSAP timelines only.
- Never create a new file without checking if a similar component already exists in `src/components/`.

---

## 2. ALWAYS DO THESE THINGS

- Always start every task by reading the relevant section of DESIGN.md.
- Always run `npm run build` mentally — if you write code that would cause a TypeScript or
  ESLint error, fix it before finishing.
- Always add `'use client'` to any component that uses hooks, event listeners, or browser APIs.
- Always use `next/font/google` for fonts — never a `<link>` tag for Google Fonts.
- Always wrap scroll-reactive Framer Motion in `useReducedMotion` checks for accessibility.
- Always lazy-load Three.js scenes using `dynamic(() => import(...), { ssr: false })`.
- Always ensure images have meaningful `alt` text — describe the industrial content.
- Always use semantic HTML: `<section>`, `<article>`, `<nav>`, `<main>`, `<header>`, `<footer>`.
- Always add `aria-label` to icon-only buttons and interactive elements.
- Always scope animations to `useRef` targets — never animate by class name from global scope.
- When building a new page, always create it in `src/app/(pages)/[pagename]/page.tsx`.
- When creating a new reusable component, place it in the correct subdirectory:
  - `src/components/ui/` — atoms (buttons, badges, inputs)
  - `src/components/layout/` — Navbar, Footer, PageWrapper
  - `src/components/sections/` — full page sections (Hero, Products, Stats)
  - `src/components/animations/` — pure animation wrappers (ScrollReveal, Stagger, etc.)
  - `src/components/three/` — all Three.js / R3F components

---

## 3. CODE STYLE

### TypeScript
```typescript
// Prefer explicit return types on all functions
const MyComponent = ({ title }: { title: string }): JSX.Element => { ... }

// Prefer type over interface for component props
type ButtonProps = {
  label: string
  variant?: 'primary' | 'secondary' | 'ghost'
  onClick?: () => void
}

// Never use 'any'. Use unknown + type narrowing.
function processData(data: unknown): string {
  if (typeof data === 'string') return data
  throw new Error('Expected string')
}
```

### Naming Conventions
- Components: PascalCase (`HeroSection.tsx`)
- Hooks: camelCase with `use` prefix (`useScrollProgress.ts`)
- Utilities: camelCase (`formatCertification.ts`)
- Constants: SCREAMING_SNAKE_CASE (`SIGMA_CLIENTS`)
- CSS custom properties: kebab-case with `--sigma-` prefix (`--sigma-carbon-900`)

### File Structure Pattern
Every component file follows this order:
1. Imports (React/Next first, then libs, then local)
2. Type definitions
3. Constants (if any)
4. Component function
5. Export default

---

## 4. ANIMATION RULES

### Framer Motion (primary — use for component-level animations)
- All entrance animations use `whileInView` with `viewport={{ once: true, margin: "-100px" }}`
- Default spring: `{ type: "spring", stiffness: 100, damping: 20 }`
- Default ease: `[0.25, 0.1, 0.25, 1]` (cubic bezier smooth)
- Spring bounce (for magnetic/tilt): `[0.34, 1.56, 0.64, 1]`
- Stagger delay between children: `0.08s`
- Always wrap list animations in `motion.ul` with `variants` + `staggerChildren`

### GSAP (for scroll-driven, pinned, and timeline-sequenced animations)
- Always register plugins at the top of the file: `gsap.registerPlugin(ScrollTrigger, SplitText)`
- Always kill ScrollTrigger instances in the `useEffect` cleanup: `return () => ctx.revert()`
- Use `gsap.context()` to scope all animations to a ref container
- Hero popout sequence must use a GSAP timeline — not Framer Motion variants
- Page-fold transitions must use ScrollTrigger with `pin: true` and `scrub: 1`

### Lenis (smooth scroll — wraps the entire app)
- Lenis is initialized in `src/providers/LenisProvider.tsx`
- All GSAP ScrollTrigger instances must call `ScrollTrigger.refresh()` after Lenis init
- Never manually set `overflow: hidden` on `<body>` — let Lenis handle it

### Reduced Motion
```typescript
import { useReducedMotion } from 'framer-motion'

const prefersReduced = useReducedMotion()
const animationProps = prefersReduced ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }
```

---

## 5. ARCHITECTURE

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, providers, metadata
│   ├── page.tsx            # Homepage — assembles section components
│   ├── globals.css         # CSS custom properties (design tokens)
│   └── (pages)/
│       ├── products/page.tsx
│       ├── clients/page.tsx
│       ├── about/page.tsx
│       └── contact/page.tsx
├── components/
│   ├── ui/                 # Atoms
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Full-width page sections
│   ├── animations/         # Reusable animation wrappers
│   └── three/              # Three.js scenes
├── providers/
│   ├── LenisProvider.tsx   # Smooth scroll
│   └── GSAPProvider.tsx    # Plugin registration
├── hooks/
│   ├── useScrollProgress.ts
│   ├── useCursorPosition.ts
│   └── useInView.ts
├── lib/
│   ├── gsap.ts             # GSAP instance + plugin registration
│   └── constants.ts        # Brand data, nav links, client list
├── types/
│   └── index.ts            # Shared TypeScript types
└── public/
    ├── textures/           # grain.png, carbon-fiber.svg
    ├── videos/             # industrial-loop.mp4
    └── logos/              # Client logos
```

---

## 6. PERFORMANCE RULES

- Every `next/image` in the hero section must have `priority={true}`
- Three.js scenes must use `dynamic(() => import(), { ssr: false, loading: () => <Skeleton /> })`
- GSAP and SplitText must be imported inside `useEffect`, never at module top level
- Fonts: load only the weights you use. Declare in `src/app/layout.tsx` with `display: 'swap'`
- No third-party analytics or tracking scripts unless explicitly requested
- Target Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms
- Bundle rule: no single chunk over 200KB gzipped

---

## 7. APPROVED PACKAGE LIST

### Already installed (never reinstall)
- next@16.1.6
- react@19.2.3
- framer-motion@^12.34.2
- three@^0.183.2
- @react-three/fiber@^9.5.0
- @react-three/drei@^10.7.7
- react-parallax-tilt@^1.7.319
- tailwindcss@^4
- typescript@^5
- lucide-react@^0.574.0

### Approved to install (run npm install, no approval needed)
- gsap (ScrollTrigger, SplitText, DrawSVG — license required for premium plugins)
- lenis
- page-flip (StPageFlip)
- splitting (lightweight SplitText alternative)
- @studio-freight/react-lenis

### Requires approval before installing
- Any state management library (zustand, jotai, etc.)
- Any UI component library (shadcn, radix, etc.)
- Any data fetching library (swr, react-query, etc.)
- Any CSS-in-JS library

---

## 8. GIT WORKFLOW

- Branch naming: `feature/[component-name]`, `fix/[bug-description]`, `refactor/[area]`
- Commit format: `type(scope): description`
  - `feat(hero): add GSAP ticker freeze animation`
  - `fix(products): resolve broken image paths in Sector 04`
  - `refactor(navbar): convert to frosted glass on scroll`
- Never commit `node_modules`, `.next`, `.env`, or `.antigravity`

---

## 9. TASK EXECUTION PROTOCOL

When given a task, follow this exact sequence:

1. **Read** — Open DESIGN.md, find the relevant section
2. **Plan** — Write a 3-bullet plan in a comment block at the top of your first file
3. **Build** — Write the code following all rules above
4. **Check** — Mentally run `npm run build`. Fix any errors.
5. **Report** — List every file created/modified and why

For complex tasks (new pages, major refactors), always use Planning Mode first.

---

## 10. CRITICAL BRAND DATA (quick reference — full data in DESIGN.md)

- **Company**: Sigma Oilfield & Industrial Supply DMCC
- **HQ**: Jebel Ali, Dubai DMCC (JLT Platinum Tower)
- **India**: Hyderabad MSME Hub | GST: 36ABFPT4227QIZ0 | MSME: UDYAM-TS-02-0021894
- **Email**: uma@sigmadxb.com | **Phone**: +971 4 266 5748 | **Mobile**: +971 50 258 0299
- **Certifications**: API Certified | ISO 9001:2015
- **Key clients**: ONGC, Oil India Limited, Gujarat Natural Resources, SGD
- **Primary color**: Signal Red #dc2626 | **Dark base**: Carbon Black #0a0f18
- **Display font**: Plus Jakarta Sans | **Body**: Inter | **Technical**: JetBrains Mono | **Editorial**: Playfair Display
