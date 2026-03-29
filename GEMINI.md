# GEMINI.md — Antigravity-Specific Configuration
# Sigma Oilfield & Industrial Supply DMCC
# Overrides and extends AGENTS.md. This file takes precedence.

---

## ANTIGRAVITY AGENT MODE

Always operate in **Agent-Driven Development** mode. This means:
- Always produce an Implementation Plan before writing code on any task > 30 minutes
- Use parallel execution: if a task has independent sub-tasks, work on them simultaneously
- Maintain the Knowledge Base below — update it after every session with new learnings

---

## PLANNING MODE TRIGGERS

Use Planning Mode automatically when the task involves any of:
- A new page or route
- A new animation sequence (GSAP timeline or Framer Motion orchestration)
- Any change to globals.css or the design token system
- Three.js scene creation or modification
- A new `provider` or `hook`
- Anything the user describes as "the whole X section"

---

## KNOWLEDGE BASE

> Antigravity updates this section automatically. Do not edit manually.

### Build commands
```bash
npm run dev          # Start development server on localhost:3000
npm run build        # Production build — always run to verify before marking done
npm run lint         # ESLint check
```

### Known project facts
- Project is at: C:\Users\tvssr\.gemini\antigravity\playground\quantum-horizon
- Deployed at: quantum-horizon-one.vercel.app (separate from password-protected vatsa119 version)
- Tailwind 4 uses CSS-first config — no tailwind.config.ts needed, configure in globals.css
- Three.js must always be lazy-loaded: `dynamic(() => import('../three/SceneName'), { ssr: false })`
- next.config.ts already has Unsplash remote patterns configured

### Decisions made
- Age gate: SKIPPED. Not appropriate for B2B industrial site.
- Floating sidebar CTA: REMOVED. Replaced by SmartStickyCTA component.
- Font stack updated: Satoshi (display) + General Sans (body) via Fontshare CDN. Playfair Display + JetBrains Mono stay on Google Fonts via next/font.
- Smooth scroll: Lenis wraps root layout via LenisProvider
- Book-turn transition: Panel wipe (homepage) + StPageFlip (products) + 3D fold (about)
- About page: 5 sections (Expertise, Mission, Excellence, Quality, Vision) with fixed right side-nav dots. No GSAP fold on About — Framer Motion whileInView only. GSAP fold reserved for a future polish pass (Prompt 7).
- Contact page: SmartStickyCTA hidden (pathname === '/contact'). Confirmed in existing component.

### Components built (update as you go)
- [x] LenisProvider
- [x] GSAPProvider
- [x] Navbar (frosted glass)
- [x] SmartStickyCTA
- [x] HeroSection (ticker + popout + GSAP timeline)
- [x] globals.css (Carbon Precision design tokens)
- [x] PanelWipe (scroll-triggered section reveal animation)
- [x] src/lib/animations.ts (Framer Motion variants library)
- [x] CorporateNarrative (dual-card light/dark section)
- [x] GlobalSourcing (dark centered section with stat pills)
- [x] StatsBanner (4 animated counters)
- [x] ClientsPreview (marquee strip + headline)
- [x] Footer (animated gradient border, 3-column, trust badges)
- [x] ProductsCinema (700vh scroll-hijacked cinematic sequence, 6 sectors)
- [x] PixelTransition (canvas pixel disintegration between sectors)
- [x] ProductsHero
- [x] ProductGrid (with sector grouping)
- [x] ProductCard (with tilt + hover reveal)
- [x] TiltCard (react-parallax-tilt wrapper)
- [x] ProductModal (AnimatePresence slide-up, specs table)
- [x] SectorHeader
- [x] src/lib/products.ts (mock product data — 8 products, 4 sectors)
- [x] src/lib/animations.ts
- [x] Footer (animated border, 3-column, trust badges, SYSTEM.UMA pulse dot)
- [x] ClientsHero (Playfair editorial headline)
- [x] ClientSelector (interactive logo list + AnimatePresence insights panel)
- [x] AboutHero (Playfair editorial headline)
- [x] AboutSections (5-section scrollytelling)
- [x] AboutSideNav (fixed right dot navigation)
- [x] ContactHero (SYSTEM.UMA status indicator)
- [x] ContactGrid (5 contact cards + trust badges)

---

## BROWSER AUTOMATION RULES

When Antigravity uses the browser to verify work:
- Always check localhost:3000 after implementing any visual component
- Take a screenshot and confirm: no layout shift, no broken images, no console errors
- Check mobile viewport (375px) for every section built
- Verify the build passes before marking any task complete

---

## MULTI-AGENT ORCHESTRATION

For large tasks, spawn specialist agents:
- **CoderAgent**: Implements components
- **ReviewerAgent**: Checks TypeScript, ESLint, accessibility
- **PerformanceAgent**: Checks bundle size and Core Web Vitals

Coordinate via task lists. Never let agents overwrite each other's files without merging.

---

## MCP SERVER USAGE

When MCP servers are connected (see mcp_config.json), use them as follows:

### GitHub MCP
- Use to read source files directly from the repo when needed
- Use to create branches before large feature work
- Never force-push to main

### Figma MCP (if connected)
- Read design tokens and component specs directly from Figma
- Use figma/figma-implement-design skill for 1:1 component translation

### Context7 / Documentation MCP (if connected)
- Always query for latest Next.js 15, Framer Motion 12, and GSAP docs before writing complex code
- Prefer official docs over training data for API signatures

---

## OUTPUT FORMAT

After completing any task, always output in this format:

```
## Task Complete: [task name]

### Files created
- `path/to/file.tsx` — [what it does]

### Files modified  
- `path/to/file.ts` — [what changed and why]

### Files deleted
- `path/to/old-file.tsx` — [why it was removed]

### To verify
1. [specific thing to check in the browser]
2. [specific thing to check in the browser]

### Next recommended task
[one sentence describing the logical next step]
```
