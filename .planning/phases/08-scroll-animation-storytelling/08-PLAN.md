---
phase: 8
name: Scroll Animation Storytelling
wave: 1
depends_on: []
files_modified:
  - components/ScrollStory.tsx
  - app/page.tsx
autonomous: false
requirements:
  - REQ-12
---

# Phase 8: Scroll Animation Storytelling — Plan

## Objective

Add a cinematic, scroll-pinned storytelling section between the Hero and About sections. As the user scrolls, the viewport stays "stuck" on a full-screen canvas while 5 narrative chapters about Vinayak's developer journey fade in and out sequentially. Uses Framer Motion's `useScroll` + `useTransform` on a tall outer container with a `position: sticky` inner viewport. Includes a thin scroll progress bar and ambient background color shifts per chapter. Gracefully degrades for `prefers-reduced-motion` users by showing all chapters stacked.

---

## must_haves

- [ ] `components/ScrollStory.tsx` — Full-screen scroll-pinned storytelling component with 5 chapters
- [ ] `app/page.tsx` — Insert `<ScrollStory />` between `<Hero />` and the first `<RevealSection>`
- [ ] Each chapter fades in/out within its `scrollYProgress` range
- [ ] Progress bar (thin accent-colored) shows scroll position through the section
- [ ] `prefers-reduced-motion` fallback — chapters shown stacked, no pinning
- [ ] No new dependencies — uses only Framer Motion + CSS
- [ ] No TypeScript compilation errors

---

## Wave 1 — Storytelling Section

---

### Task 1: Create `components/ScrollStory.tsx`

**Wave:** 1  
**Depends on:** None

<read_first>
- `components/Hero.tsx` — understand how `useScroll` and `useTransform` are used
- `components/RevealSection.tsx` — understand existing animation patterns
- `app/globals.css` — confirm design tokens (colors, fonts)
</read_first>

<action>
Create `components/ScrollStory.tsx` with the following exact implementation:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Story chapters                                                     */
/* ------------------------------------------------------------------ */

const CHAPTERS = [
  {
    number: "01",
    headline: "The Spark",
    body: "It started with curiosity — tinkering with HTML pages, breaking things, and rebuilding them better. Code wasn't just syntax; it was a superpower waiting to be unlocked.",
    accent: "#f97316",
  },
  {
    number: "02",
    headline: "Building Things",
    body: "From vanilla JavaScript to React, from REST APIs to Supabase — every project was a new puzzle. I taught myself by shipping, failing fast, and iterating relentlessly.",
    accent: "#13ec5b",
  },
  {
    number: "03",
    headline: "Going Pro",
    body: "I launched Vicinix as my freelance brand and started delivering real products for real clients. The Symax Governance Dashboard was the first major enterprise delivery — multi-entity compliance across UAE, UK, and EU.",
    accent: "#3b82f6",
  },
  {
    number: "04",
    headline: "Shipping Products",
    body: "Marketnera, Outfevibe, governance dashboards — each product pushed boundaries. Full-stack builds from database schema to deployment, with a focus on performance and craft.",
    accent: "#a855f7",
  },
  {
    number: "05",
    headline: "What's Next",
    body: "The journey is just getting started. Building with intention, learning in public, and always shipping. If you've scrolled this far — let's build something together.",
    accent: "#f97316",
  },
];

const CHAPTER_COUNT = CHAPTERS.length;

/* ------------------------------------------------------------------ */
/*  Single Chapter — scroll-driven opacity + y                         */
/* ------------------------------------------------------------------ */

interface ChapterProps {
  chapter: (typeof CHAPTERS)[0];
  index: number;
  scrollYProgress: import("framer-motion").MotionValue<number>;
  reducedMotion: boolean | null;
}

function Chapter({ chapter, index, scrollYProgress, reducedMotion }: ChapterProps) {
  // Each chapter occupies 1/CHAPTER_COUNT of the total scroll range
  const start = index / CHAPTER_COUNT;
  const peak = start + 0.5 / CHAPTER_COUNT;
  const end = (index + 1) / CHAPTER_COUNT;

  const opacity = useTransform(
    scrollYProgress,
    [start, peak, end],
    [0, 1, 0],
  );
  const y = useTransform(
    scrollYProgress,
    [start, peak, end],
    [40, 0, -40],
  );

  // Reduced motion: show all chapters statically stacked
  if (reducedMotion) {
    return (
      <div className="py-16 border-b border-white/5 last:border-b-0">
        <span
          className="font-mono text-xs tracking-[0.2em] uppercase mb-3 block"
          style={{ color: chapter.accent }}
        >
          {chapter.number} / {String(CHAPTER_COUNT).padStart(2, "0")}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{chapter.headline}</h2>
        <p className="text-foreground/60 text-lg max-w-xl leading-relaxed">{chapter.body}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center items-start px-6 lg:px-20 pointer-events-none"
      style={{ opacity, y }}
    >
      <div className="container mx-auto max-w-4xl">
        <motion.span
          className="font-mono text-xs tracking-[0.2em] uppercase mb-4 block"
          style={{ color: chapter.accent }}
        >
          {chapter.number} / {String(CHAPTER_COUNT).padStart(2, "0")}
        </motion.span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.1]">
          {chapter.headline}
          <span className="inline-block w-2 h-2 rounded-full ml-3 align-middle" style={{ backgroundColor: chapter.accent, boxShadow: `0 0 12px ${chapter.accent}60` }} />
        </h2>
        <p className="text-foreground/60 text-lg md:text-xl max-w-xl leading-relaxed font-light">
          {chapter.body}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main ScrollStory component                                         */
/* ------------------------------------------------------------------ */

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const shouldReduce = useReducedMotion();

  // Progress bar width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Background hue shift driven by scroll
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.02, 0.05, 0.02]);

  // Reduced motion: render stacked, no pinning
  if (shouldReduce) {
    return (
      <section className="relative py-32 px-6 lg:px-20 bg-background">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="container mx-auto max-w-4xl">
          <p className="font-mono text-xs tracking-[0.15em] uppercase text-foreground/40 mb-10">
            // my journey
          </p>
          {CHAPTERS.map((ch, i) => (
            <Chapter
              key={ch.number}
              chapter={ch}
              index={i}
              scrollYProgress={scrollYProgress}
              reducedMotion={shouldReduce}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative" style={{ height: `${CHAPTER_COUNT * 100}vh` }}>
      {/* Sticky viewport — pinned while outer container scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background flex items-center">
        {/* Ambient background glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 30% 50%, rgba(249,115,22,0.06), transparent 70%)",
            opacity: bgOpacity,
          }}
        />

        {/* Gradient divider at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent z-10" />

        {/* Section label */}
        <div className="absolute top-8 left-6 lg:left-20 z-10">
          <span className="font-mono text-xs tracking-[0.15em] uppercase text-foreground/30">
            // my journey
          </span>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-10">
          <motion.div
            className="h-full bg-accent"
            style={{ width: progressWidth }}
          />
        </div>

        {/* Scroll hint on first chapter */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
          }}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase text-foreground/30">
            Scroll to explore
          </span>
          <motion.div
            className="w-px h-6 bg-accent/40"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Chapters — absolutely positioned, driven by scroll */}
        {CHAPTERS.map((ch, i) => (
          <Chapter
            key={ch.number}
            chapter={ch}
            index={i}
            scrollYProgress={scrollYProgress}
            reducedMotion={shouldReduce}
          />
        ))}

        {/* Bottom gradient to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-[5]" />
      </div>
    </section>
  );
}
```

Key implementation details:
- **Outer container** height is `CHAPTER_COUNT * 100vh` (= `500vh`), giving 5 screens of scroll distance
- **Sticky inner viewport** (`position: sticky; top: 0; height: 100vh`) stays pinned
- **`useScroll` + `target: containerRef`** tracks scroll progress through the tall outer container
- Each `Chapter` computes its own opacity & y transform from `scrollYProgress` ranges
- **Progress bar**: thin `2px` accent bar at the bottom showing `0% → 100%` width
- **Scroll hint**: "Scroll to explore" text with a pulsing line, fading away after 10% progress
- **Reduced motion**: renders chapters stacked vertically, no pinning, no animation
- **Background glow**: subtle radial gradient whose opacity pulses with scroll
- Each chapter headline gets a colored dot glow matching its accent for visual flair
</action>

<acceptance_criteria>
- `components/ScrollStory.tsx` file exists
- File imports `useScroll`, `useTransform`, `useReducedMotion` from `framer-motion`
- Contains a `CHAPTERS` array with 5 entries
- Each chapter has `number`, `headline`, `body`, and `accent` fields
- Outer container uses dynamic height based on chapter count
- Inner container uses `sticky top-0 h-screen`
- Progress bar element exists with `motion.div` driven by `progressWidth`
- Reduced motion path renders chapters stacked (no sticky)
- "Scroll to explore" hint with fade-out at 10% progress
- No TypeScript errors when running `npx tsc --noEmit`
</acceptance_criteria>

---

### Task 2: Insert `ScrollStory` into `app/page.tsx`

**Wave:** 1  
**Depends on:** Task 1

<read_first>
- `app/page.tsx` — current section order
</read_first>

<action>
Update `app/page.tsx` to import and place `ScrollStory` between `<Hero />` and `<RevealSection><About /></RevealSection>`:

1. Add import:
```tsx
import ScrollStory from "@/components/ScrollStory";
```

2. Place after `<Hero />`:
```tsx
<Hero />
<ScrollStory />
<RevealSection><About /></RevealSection>
```
</action>

<acceptance_criteria>
- `app/page.tsx` imports `ScrollStory`
- `<ScrollStory />` appears directly after `<Hero />`
- `<ScrollStory />` appears directly before `<RevealSection><About /></RevealSection>`
- No TypeScript errors when running `npx tsc --noEmit`
</acceptance_criteria>

---

## Verification Steps

After execution, manually verify:

1. **Dev server check:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` — verify:
   - [ ] After scrolling past the Hero, the viewport pins on a dark screen
   - [ ] 5 chapters fade in/out sequentially as you scroll
   - [ ] Chapter number label shows (e.g., `01 / 05`)
   - [ ] Headlines are large and bold, body text is lighter
   - [ ] A thin orange progress bar at the bottom grows from left to right
   - [ ] "Scroll to explore" hint is visible initially, then fades away
   - [ ] After the 5th chapter, scrolling unpins and the About section appears

2. **Mobile check** (Chrome DevTools → mobile viewport):
   - [ ] Sticky pinning still works
   - [ ] Text is readable at smaller sizes
   - [ ] No horizontal overflow

3. **Reduced motion check**:
   - [ ] All chapters appear stacked vertically
   - [ ] No scroll pinning
   - [ ] No opacity animation

4. **Build check:**
   ```bash
   npm run build
   ```
   - [ ] Build completes without errors

---

## Notes for Executor

- **Do not** modify any existing section components — this is an additive insertion
- The `height: ${CHAPTER_COUNT * 100}vh` style creates the scroll distance — each chapter gets roughly one full viewport of scroll
- The `sticky` div inside acts like a "camera" that stays in place while the outer container scrolls
- The `useTransform` ranges are evenly distributed: `[i/N, (i+0.5)/N, (i+1)/N]` for each chapter `i` out of `N` chapters
- Font sizes for headlines (`text-4xl md:text-6xl lg:text-7xl`) are deliberately large for a cinematic feel
- Background color stays `bg-background` to seamlessly connect Hero → Story → About
