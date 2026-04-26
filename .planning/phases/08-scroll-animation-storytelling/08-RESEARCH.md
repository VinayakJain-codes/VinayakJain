# Phase 8: Scroll Animation Storytelling — Research

## Concept

A **full-screen, scroll-pinned storytelling section** placed between the Hero and About sections. As the user scrolls, the viewport stays "pinned" on this section while content transitions through 4–5 narrative "chapters" that tell Vinayak's developer journey.

Think of it like Apple's product pages or Linear's landing page — where scrolling drives the narrative forward, with text fading in/out, backgrounds shifting, and a progress indicator showing how far through the story the viewer is.

## Technical Approach

### Scroll-Pinning with Framer Motion + CSS `position: sticky`

We do **not** need a heavy library like GSAP ScrollTrigger or Locomotive Scroll. We can achieve this with:

1. **A tall outer container** (e.g., `height: 400vh`) to create scroll "room"
2. **A sticky inner viewport** (`position: sticky; top: 0; height: 100vh`) that stays pinned while the outer container scrolls past
3. **Framer Motion's `useScroll`** on the outer container to get a `scrollYProgress` (0→1)
4. **`useTransform`** to map `scrollYProgress` ranges to opacity, y-position, and scale of each chapter

This pattern keeps the section pinned for exactly as long as the outer container's height minus one viewport.

### Chapter Structure

Each chapter occupies a `scrollYProgress` range:
- Chapter 1: `0.00 – 0.20` → "The spark" (how I got into coding)
- Chapter 2: `0.20 – 0.40` → "Building things" (first projects, learning stack)
- Chapter 3: `0.40 – 0.60` → "Going pro" (freelancing, Vicinix)
- Chapter 4: `0.60 – 0.80` → "Shipping products" (Marketnera, Outfevibe, Symax)
- Chapter 5: `0.80 – 1.00` → "What's next" (vision, CTA)

Each chapter fades in when its range begins and fades out as the next chapter starts. Only one chapter is visible at any given time.

### Visual Layers

1. **Background gradient** — shifts color subtly per chapter
2. **Chapter number / label** — small mono text (e.g., `01 / 05`)
3. **Headline** — large bold text
4. **Body** — supporting description
5. **Progress bar** — thin horizontal or vertical bar showing scroll progress through the storytelling section

### Existing Patterns & Design Tokens

- **Colors**: `--accent: #f97316`, `--highlight: #13ec5b`, `--foreground: #ededed`, `--background: #0a0a0a`
- **Fonts**: `--font-sans` (Space Grotesk), `--font-mono` (Geist Mono)
- **Animation**: Project already uses Framer Motion extensively (`useScroll`, `useTransform`, `useReducedMotion`)
- **Section patterns**: Background alternates between `bg-background (#0a0a0a)` and `bg-[#0e0e0e]`. Gradient dividers between sections.

### Accessibility

- `useReducedMotion` → if true, show all chapters stacked vertically in a non-pinned layout (graceful degradation, no scroll-pinning)
- Each chapter should be a semantic `<article>` or `<div role="region">`

## Files to Create / Modify

| File | Action |
|------|--------|
| `components/ScrollStory.tsx` | **Create** — The entire scroll storytelling section |
| `app/page.tsx` | **Modify** — Insert `<ScrollStory />` between `<Hero />` and `<RevealSection><About /></RevealSection>` |
