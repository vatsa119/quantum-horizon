# DESIGN.md — Sigma Carbon Precision Design System
# The single source of truth for all visual decisions.
# Antigravity reads this before every UI task.
# Version: 2.0

---

## SECTION 1: DESIGN PHILOSOPHY

**Theme name**: Carbon Precision
**Tagline**: "Precision Engineering. Cinematic Presence."

The website is not a brochure. It is an experience. Each scroll feels like turning the page of
a high-end industrial almanac. Sections don't slide — they fold, wipe, and reveal. Typography
doesn't appear — it impacts. The aesthetic communicates: this company operates at a level where
precision is the baseline, not the aspiration.

**Three pillars**:
1. Stealth Engineering — Carbon-black surfaces, hairline borders, monospaced specs
2. Desert Futurism — Film grain, warm red accents, cinematic scroll
3. Enterprise Credibility — Data-forward layouts, certification badges, trust signals

---

## SECTION 2: COLOR SYSTEM

### CSS Custom Properties (define in globals.css under :root)

```css
:root {
  /* Carbon Black Series — Primary Dark */
  --sigma-carbon-black: #0a0f18;
  --sigma-carbon-900:   #111827;
  --sigma-carbon-800:   #1a2744;
  --sigma-carbon-700:   #243352;
  --sigma-carbon-600:   #334566;

  /* Signal Red Series — Primary Accent */
  --sigma-red-600:      #b91c1c;
  --sigma-red-500:      #dc2626;  /* PRIMARY CTA COLOR */
  --sigma-red-400:      #ef4444;
  --sigma-red-300:      #f87171;
  --sigma-coral:        #ff6b5a;  /* Gradient endpoint */

  /* Tech Cyan — Secondary Accent (use sparingly) */
  --sigma-cyan-500:     #06b6d4;
  --sigma-cyan-400:     #22d3ee;

  /* Desert Sand — Tertiary (Dune influence) */
  --sigma-sand-500:     #d4a574;
  --sigma-sand-300:     #e8d4b8;
  --sigma-ochre:        #c9840a;

  /* Neutral Series */
  --sigma-white:        #ffffff;
  --sigma-neutral-50:   #f9fafb;
  --sigma-neutral-100:  #f3f4f6;
  --sigma-neutral-200:  #e5e7eb;
  --sigma-neutral-400:  #9ca3af;
  --sigma-neutral-600:  #4b5563;
  --sigma-neutral-900:  #111827;

  /* Semantic */
  --sigma-success:      #22c55e;
  --sigma-warning:      #f59e0b;
  --sigma-error:        #ef4444;
  --sigma-info:         #3b82f6;

  /* Stock status */
  --sigma-in-stock:     #4ade80;
  --sigma-limited:      #fbbf24;
  --sigma-out-stock:    #f87171;

  /* Gradients */
  --sigma-gradient-cta:     linear-gradient(135deg, #dc2626 0%, #ff6b5a 100%);
  --sigma-gradient-dark:    linear-gradient(180deg, #1a2744 0%, #0a0f18 100%);
  --sigma-gradient-text:    linear-gradient(135deg, #1a2744 0%, #dc2626 50%, #ff6b5a 100%);

  /* Patterns */
  --sigma-dotgrid: radial-gradient(circle, #334566 1px, transparent 1px);
  --sigma-dotgrid-size: 24px 24px;
}
```

### Color Usage Rules
- `--sigma-red-500`: ONLY for primary CTAs, active states, and key accent moments. Max 3 per page.
- `--sigma-carbon-900`: Primary dark background for all dark sections
- `--sigma-carbon-800`: Cards, elevated surfaces within dark sections
- `--sigma-carbon-600`: Borders and dividers within dark sections
- `--sigma-neutral-50` through `--sigma-neutral-200`: All light section backgrounds and cards
- **NEVER** use pure `#000000` or `#ffffff` — always use the Carbon/Neutral scale
- **NEVER** use Signal Red for background fills larger than a button

---

## SECTION 3: BRAND DATA

### Company Identity
```
Full name:     Sigma Oilfield & Industrial Supply DMCC
Short name:    Sigma Oilfield
Tagline:       Precision Engineering. Global Reach.
Domain:        sigmaoilfield.com (or current domain)
```

### Contact Details
```
Email (primary):       uma@sigmadxb.com
Phone (Dubai office):  +971 4 266 5748
Mobile:               +971 50 258 0299
Address (Dubai):       JLT Platinum Tower, Jebel Ali, Dubai, UAE
Address (India):       Hyderabad MSME Hub, Telangana, India
```

### Registrations
```
DMCC:   (Dubai DMCC registration — confirm number)
GST:    36ABFPT4227QIZ0  (India)
MSME:   UDYAM-TS-02-0021894  (India)
```

### Certifications
```
API Certified     — American Petroleum Institute
ISO 9001:2015     — Quality Management System
```

### Key Clients (for ticker + marquee)
```typescript
export const SIGMA_CLIENTS = [
  { name: 'ONGC', full: 'Oil and Natural Gas Corporation' },
  { name: 'Oil India', full: 'Oil India Limited' },
  { name: 'GNRL', full: 'Gujarat Natural Resources Limited' },
  { name: 'SGD', full: 'SGD' },
]
```

### Key Stats (for animated counters)
```typescript
export const SIGMA_STATS = [
  { value: 95, suffix: '%', label: 'On-time delivery rate' },
  { value: 42, suffix: '+', label: 'Sectors served' },
  { value: 24, suffix: '/7', label: 'Response availability' },
  { value: 21000, suffix: 'm²', label: 'Jebel Ali workshop' },
]
```

### Product Sectors
```
Sector 01: Drilling & Heavy Machinery  — Mud pumps, drill bits, rotary equipment
Sector 02: Wellhead & Pressure Control — BOPs, valves, wellhead systems
Sector 03: Tubular & Casing           — Drill pipes, casing, tubing
Sector 04: Safety & Compliance        — Safety valves, PPE, regulatory equipment
Sector 05: Chemicals & Additives      — Drilling additives, lubricants, specialty chemicals
Sector 06: Instrumentation            — Flow meters, gauges, control systems
```

### Navigation Links
```typescript
export const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Clients',  href: '/clients' },
  { label: 'About',    href: '/about' },
  { label: 'Contact',  href: '/contact' },
]
```

---

## SECTION 4: TYPOGRAPHY

### Font Loading (src/app/layout.tsx)
```typescript
import { Playfair_Display, JetBrains_Mono } from 'next/font/google'

// Satoshi and General Sans loaded via Fontshare CDN in <head>
// Playfair Display and JetBrains Mono loaded via next/font

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})
```

### CSS Variables (add to :root in globals.css)
```css
--font-display:    'Satoshi', sans-serif;
--font-body:       'General Sans', system-ui, sans-serif;
--font-editorial:  var(--font-playfair), Georgia, serif;
--font-technical:  var(--font-mono), 'Courier New', monospace;
```

### Type Scale
| Role             | Font        | Size (desktop)       | Weight | Letter-spacing |
|------------------|-------------|----------------------|--------|----------------|
| Display XL       | Satoshi     | clamp(60px, 9vw, 96px)| 900   | -0.03em        |
| Display LG       | Satoshi     | clamp(48px, 7vw, 72px)| 900   | -0.02em        |
| Display MD       | Satoshi     | clamp(36px, 5vw, 56px)| 900   | -0.01em        |
| Section headline | Satoshi     | clamp(28px, 4vw, 40px)| 900   | -0.01em        |
| Editorial        | Playfair    | clamp(32px, 5vw, 56px)| 400i  | 0              |
| Body LG          | General Sans       | 18px                  | 400   | 0              |
| Body MD          | General Sans       | 16px                  | 400   | 0              |
| Label/Overline   | General Sans       | 12px                  | 600   | 0.1em (CAPS)   |
| Technical spec   | JetBrains   | 12–14px               | 400   | 0.05em         |

### Section Label Pattern (used throughout)
```tsx
// The red line prefix — appears before every section title
<p className="section-label">
  <span className="section-label__line" /> {/* CSS: 24px wide, 2px tall, var(--sigma-red-500) */}
  CORPORATE PROFILE
</p>
```

---

## SECTION 5: COMPONENT SPECS

### 5.1 Navbar
- **Position**: Fixed, full-width, z-index: 1000
- **Initial state**: Fully transparent, no background
- **Scrolled state** (after 80px scroll): `background: rgba(10,15,24,0.85)` + `backdrop-filter: blur(20px)` + `border-bottom: 0.5px solid rgba(255,255,255,0.1)`
- **Transition**: `all 0.3s ease`
- **Logo**: Left-aligned. "SIGMA" in Jakarta 800 + "OILFIELD" in Inter 600, smaller
- **Nav links**: Inter 500, 14px, uppercase, letter-spacing 0.05em. Active: `--sigma-red-500`
- **CTA button**: "GET A QUOTE" with border beam animation (see 5.3)
- **Mobile**: Hamburger at 768px breakpoint. Full-screen dark overlay menu.

### 5.2 SmartStickyCTA
- Hidden when user is in hero section (scroll < 80vh)
- Fades in (translateY: 100px → 0) when scroll > 80vh AND not near footer
- Fades out when footer is within 200px of viewport bottom
- Hidden entirely on `/contact` page
- Position: `fixed bottom-8 left-1/2 -translate-x-1/2`
- Style: same as primary CTA button with border beam

### 5.3 Primary CTA Button (border beam)
```css
.cta-primary {
  position: relative;
  padding: 14px 28px;
  background: var(--sigma-gradient-cta);
  border-radius: 100px;
  overflow: hidden;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: white;
  border: none;
  cursor: pointer;
}

/* The beam ring */
.cta-primary::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 100px;
  background: conic-gradient(from 0deg, transparent 0%, transparent 30%, #dc2626 50%, transparent 70%, transparent 100%);
  animation: beam-rotate 3s linear infinite;
  z-index: -1;
}

/* Inner fill mask */
.cta-primary::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 100px;
  background: var(--sigma-gradient-cta);
  z-index: -1;
}

@keyframes beam-rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
```

### 5.4 Hero Section — The Full Sequence
The hero is a 100vh pinned section. It runs a GSAP timeline on load.

**Timeline sequence**:
1. `t=0`: Page loads. Ticker strip is running (CSS infinite marquee, fast — 8s loop)
2. `t=1.5s`: Ticker abruptly freezes (JS pauses animation). 200ms silence.
3. `t=1.7s`: Background rig image fades in with slight scale (1.05 → 1.0)
4. `t=2.0s`: "Dubai · India · Global" subline fades in from below (opacity 0→1, y 10→0)
5. `t=2.3s`: "SIGMA" slams in — perspective scale from (scale:0.7, opacity:0) to (scale:1, opacity:1), 0.4s
6. `t=2.5s`: "OILFIELD" hits — same treatment, 0.15s after SIGMA
7. `t=2.65s`: "& INDUSTRIAL SUPPLY" sweeps in, slightly slower
8. `t=3.0s`: "DMCC" slides in from right
9. `t=3.3s`: CTA button appears with spring bounce. Border beam starts.
10. `t=3.5s`: Scroll indicator animates in at bottom

**Ticker strip content** (fast-scrolling, grayscale logos or text):
```
ONGC · OIL INDIA LIMITED · GUJARAT NATURAL RESOURCES · SGD · API CERTIFIED · ISO 9001:2015 · DMCC MEMBER · 42 SECTORS · 95% DELIVERY RATE
```

**Background**: Full-bleed oil rig photograph. Dark overlay: `rgba(10,15,24,0.65)`.
Dot-grid pattern at 20% opacity. Film grain at 3% opacity.

### 5.5 Section Transitions (the "book turn")

**Homepage** → Panel wipe between sections:
- A `<div>` with `background: var(--sigma-carbon-900)` expands from 0% to 100% height (scaleY)
- driven by ScrollTrigger scrub
- The incoming section is pinned behind it, revealed as the wipe passes

**About page** → 3D page fold between the 5 narrative sections:
- GSAP: `gsap.to(section, { rotateX: -85, transformOrigin: 'top center', ease: 'none' })`
- `transform-style: preserve-3d` on parent, `perspective: 1200px`
- Creates literal page-turning feel

**Products page** → StPageFlip between product sectors

### 5.6 Dark Section Template
Every dark background section uses this CSS pattern:
```css
.section-dark {
  position: relative;
  background: var(--sigma-gradient-dark);
  overflow: hidden;
}
/* Dot grid */
.section-dark::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: var(--sigma-dotgrid);
  background-size: var(--sigma-dotgrid-size);
  opacity: 0.25;
  pointer-events: none;
}
/* Film grain */
.section-dark::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/textures/grain.png');
  background-repeat: repeat;
  opacity: 0.03;
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

### 5.7 Product Card (Magnetic)
- White card: `background: linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)`
- Border: `1px solid var(--sigma-neutral-200)`, radius 16px
- Inset shadow: `inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.05)`
- Hover: 3D tilt via `react-parallax-tilt` (tiltMaxAngleX/Y: 8, glareEnable: true, glareMaxOpacity: 0.15)
- Product title: Inter 600, 14px
- Model number: JetBrains Mono 11px, `--sigma-neutral-400`
- Availability dot: 8px circle, pulsing animation, color per stock status
- "View Details": reveals on hover, slides up from bottom of card

### 5.8 Certification Badge
```tsx
<span className="cert-badge">
  <CheckIcon size={12} />
  API-6A CERTIFIED
</span>
```
```css
.cert-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  background: var(--sigma-carbon-900);
  color: var(--sigma-cyan-400);
  font-family: var(--font-technical);
  font-size: 11px;
  letter-spacing: 0.08em;
  border-radius: 4px;
  border: 0.5px solid var(--sigma-cyan-400);
}
```

### 5.9 Availability Indicator
```tsx
type StockStatus = 'in-stock' | 'limited' | 'on-request'

const statusConfig = {
  'in-stock':   { label: 'In Stock',   color: 'var(--sigma-in-stock)' },
  'limited':    { label: 'Limited',    color: 'var(--sigma-limited)' },
  'on-request': { label: 'On Request', color: 'var(--sigma-neutral-400)' },
}
```

---

## SECTION 6: PAGE-BY-PAGE IMPLEMENTATION GUIDE

### Homepage `/`
Sections in order:
1. `<HeroSection />` — ticker freeze + popout headline + CTA
2. `<CorporateNarrative />` — two-card layout (light/dark), company intro + global services
3. `<GlobalSourcing />` — dark card, animated dots, API cert mention
4. `<ProductPreview />` — 3 featured products, magnetic cards, "See all" CTA
5. `<StatsBanner />` — animated counters, 4 key metrics
6. `<ClientsPreview />` — infinite marquee strip
7. `<ContactTeaser />` — single CTA card, response time indicator

### Products `/products`
- Hero: "ASSET PRECISION" with gradient text on "PRECISION" + API badge
- Product grid: 4-column, organized by Sector 01–06
- Each sector: red vertical bar + bold title header
- StPageFlip wraps sector groups — turning between sectors feels like turning pages
- Each card: magnetic tilt, availability dot, model number in JetBrains Mono
- Click → quick-view modal (AnimatePresence slide-up)

### Clients `/clients`
- Hero: Playfair Display "THE CLIENTELE" — editorial serif headline
- Infinite marquee strip (logos, grayscale → color on hover)
- Interactive selector: click logo → Partner Insights panel updates
- Client logos: ONGC, Oil India, Gujarat Natural Resources, SGD

### About `/about`
- Side navigation dots (fixed right): Expertise, Mission, Excellence, Quality, Vision
- Each section uses Framer Motion scrollytelling (whileInView stagger)
- 3D page fold transitions between sections (GSAP ScrollTrigger)
- "95%" counter in Excellence section
- Vision section: full dark navy + cursor spotlight
- Fix: audit and remove excessive padding between Mission and Excellence sections

### Contact `/contact`
- Hero: "CONNECT PRECISION" headline
- Contact card grid: Direct Line, Mobile, Address (dark card), two email cards
- "Average response time: <2 hours" indicator
- Trust badges: API Certified, Global Sourcing Network
- No SmartStickyCTA on this page

---

## SECTION 7: ANIMATION REFERENCE

### Entrance Variants (Framer Motion)
```typescript
export const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } }
}
```

### GSAP Hero Popout (pseudocode timeline)
```javascript
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
tl
  .to(tickerRef.current, { animationPlayState: 'paused' }, 1.5)
  .fromTo(bgImageRef.current, { scale: 1.05, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 }, 1.7)
  .fromTo(sublabelRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 2.0)
  .fromTo(wordRefs.sigma, { opacity: 0, scale: 0.7, z: -200 }, { opacity: 1, scale: 1, z: 0, duration: 0.4 }, 2.3)
  .fromTo(wordRefs.oilfield, { opacity: 0, scale: 0.7, z: -200 }, { opacity: 1, scale: 1, z: 0, duration: 0.4 }, 2.45)
  .fromTo(wordRefs.rest, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 2.6)
  .fromTo(ctaRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, 3.0)
```

---

## SECTION 8: FILE DELETION LIST

These files from the default Next.js scaffold should be deleted:

```
src/app/fonts/           — Remove. Fonts loaded via next/font/google in layout.tsx
public/next.svg          — Remove. Replace with Sigma logo.
public/vercel.svg        — Remove.
src/app/page.tsx         — REPLACE entirely with the new homepage component assembly.
README.md                — REPLACE with project-specific README.
PROJECT_SUMMARY.md       — SUPERSEDED by this DESIGN.md. Can be archived or deleted.
```

---

## SECTION 9: MCP SERVERS (for reference)

Configured in `~/.gemini/antigravity/mcp_config.json`:

| Server       | Purpose                                          |
|--------------|--------------------------------------------------|
| GitHub       | Read repo files, create branches, PRs            |
| Context7     | Fetch latest Next.js, Framer Motion, GSAP docs   |
| Figma        | Read design specs (when design files exist)      |

---

## SECTION 10: CURRENT BUGS TO FIX (Phase 1 priority)

1. **🔴 CRITICAL**: Broken product images in Sector 04
   - Files affected: Products page, Sector 04 grid
   - Fix: Audit image paths, ensure files exist in `/public/`, update `src` attributes

2. **🟡 MEDIUM**: Triple CTA redundancy
   - Current: Right sidebar tab "REQUEST QUOTE" + always-visible floating pill + nav CTA
   - Fix: Delete sidebar tab component, delete always-visible floating CTA, implement SmartStickyCTA

3. **🟡 MEDIUM**: Excessive whitespace on About page
   - Between Mission section and Excellence section
   - Fix: Audit padding/margin on About page section containers

4. **🟡 MEDIUM**: Static fonts (not using next/font)
   - Fix: Migrate to next/font/google for all typefaces (see Section 4)
