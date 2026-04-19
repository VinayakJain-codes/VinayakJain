---
phase: 5
title: Scroll Animations & Email Template
wave_count: 2
---

# Phase 5 Plan: Scroll Animations & Email Template

## Objective
Transform the portfolio into a cinematic, scroll-driven experience by:
1. Adding parallax depth to the Hero section
2. Adding staggered card reveals to Works
3. Adding site-wide section fade-up reveals via a shared wrapper
4. Upgrading SectionHeading with a curtain-mask text reveal
5. Wiring the Contact email link to a pre-filled mailto template
6. Ensuring all animations respect `prefers-reduced-motion`

---

## Wave 1: Infrastructure (New Files)

### Task 1.1 — Create `components/hooks/useScrollAnimation.ts`

**New file.** Centralises reusable scroll hooks.

```ts
// components/hooks/useScrollAnimation.ts
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function useParallax(distance = 80) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return { ref, y };
}
```

**Acceptance**: Hook is importable from `@/components/hooks/useScrollAnimation`.

---

### Task 1.2 — Create `components/RevealSection.tsx`

**New file.** Wraps any section with a fade-up-on-scroll reveal driven by `useInView`.

```tsx
// components/RevealSection.tsx
"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function RevealSection({
  children,
  className,
  delay = 0,
}: RevealSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: shouldReduce ? 0 : 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

**Notes:**
- Uses `motion.div` not `motion.section` — the child sections own their semantic tag.
- `useReducedMotion` suppresses `y` offset when user has motion sensitivity enabled.

**Acceptance**: Wrapping any section in `<RevealSection>` causes it to appear with fade-up on scroll.

---

## Wave 2: Component Edits

### Task 2.1 — Edit `components/Hero.tsx`

**Current state**: Hero uses static Framer Motion `initial/animate` for text reveals,
no scroll-based parallax. CTA buttons are already anchor tags.

**Change**: Add `useRef`, `useScroll`, `useTransform` for 3-layer scroll parallax.
Wrap the container with `ref`. Apply `style={{ y, opacity }}` to each layer.

**Exact diff to apply:**

```
REMOVE line 1:  "use client";
ADD    line 1:  "use client";
ADD after imports:
  import { useRef } from "react";
  import { motion, useScroll, useTransform } from "framer-motion";

ADD inside Hero() before return:
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const shouldReduce = useReducedMotion();   // import useReducedMotion too
  const headingY  = useTransform(scrollYProgress, [0, 1], [0, shouldReduce ? 0 : -120]);
  const taglineY  = useTransform(scrollYProgress, [0, 1], [0, shouldReduce ? 0 : -60]);
  const ctaY      = useTransform(scrollYProgress, [0, 1], [0, shouldReduce ? 0 : -30]);
  const opacity   = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

CHANGE outer div:
  <div className="relative min-h-screen ..."> → <div ref={ref} className="relative min-h-screen ...">

CHANGE motion.h1:
  Remove standalone initial/animate/transition
  Add: style={{ y: headingY, opacity }}

CHANGE motion.p (tagline):
  Add: style={{ y: taglineY, opacity }}

CHANGE motion.div (CTA wrapper):
  Add: style={{ y: ctaY }}
```

**Acceptance**: Scrolling past the Hero causes the heading to rise visibly faster than
the tagline, which rises faster than the CTA buttons.

---

### Task 2.2 — Edit `components/Works.tsx`

**Current state**: Static `<div className="grid sm:grid-cols-2 gap-6">` with no
scroll orchestration. Cards are individually animated via `whileInView` inside
`ProjectCard`.

**Change**: Convert grid `div` to `motion.div` with stagger container variants.

```tsx
// Works.tsx changes

// ADD import at top:
import { motion } from "framer-motion";

// ADD above return:
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

// CHANGE grid div:
<motion.div
  className="grid sm:grid-cols-2 gap-6"
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
```

**Acceptance**: Opening DevTools → Performance shows cards entering viewport
staggered 150ms apart, not all at once.

---

### Task 2.3 — Edit `components/ProjectCard.tsx`

**Current state**: Cards use `motion.article` with `initial/whileInView` and an
`index` prop for manual delay calculation (index * 0.1).

**Change**: Switch from individual `whileInView` to `variants` that participate in the
parent stagger from Works.tsx. Add `whileHover` lift. Add `useReducedMotion` guard.

```tsx
// ProjectCard.tsx changes

// ADD import at top (already has motion, just add hook):
import { motion, useReducedMotion } from "framer-motion";

// ADD inside component, before return:
const shouldReduce = useReducedMotion();

const cardVariants = {
  hidden: { opacity: 0, y: shouldReduce ? 0 : 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// CHANGE motion.article:
// Remove: initial, whileInView, viewport, transition, and index-based delay
// Add:    variants={cardVariants}
// Add:    whileHover={{ y: shouldReduce ? 0 : -6, transition: { duration: 0.2 } }}
```

**Note**: The `index` prop is no longer needed for animation but may remain in the
component signature for future use. Remove from destructuring if unused elsewhere.

**Acceptance**: Cards slide up staggered; hovering a card lifts it 6px with a fast
0.2s transition.

---

### Task 2.4 — Edit `components/SectionHeading.tsx`

**Current state**: `motion.h2` fades in from `y: 20`. No mask/curtain effect.

**Change**: Wrap the `motion.h2` in an `overflow-hidden` div so the heading appears
to rise through a slot (curtain effect). Change `y` start from `20` to `100%`.

```tsx
// SectionHeading.tsx h2 change:
<div className="overflow-hidden">
  <motion.h2
    initial={{ y: "100%", opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
    className="text-3xl md:text-5xl font-bold tracking-tight text-foreground"
  >
    {title}
  </motion.h2>
</div>
```

**Acceptance**: Section titles visually slide up through a masked slot rather than
fading in from below.

---

### Task 2.5 — Edit `components/Contact.tsx`

**Current state**: Email link is `<a href="mailto:vinayakjain2110@gmail.com">` with
no pre-filled subject or body.

**Change**: Build a `mailtoHref` constant with URL-encoded subject and body, then
apply it to the existing email `<a>` tag. The copy button stays unchanged.

```tsx
// Contact.tsx — add above return:
const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(
  "Project Inquiry via Portfolio"
)}&body=${encodeURIComponent(
  `Hi Vinayak,\n\nI came across your portfolio and I'm interested in hiring you for a project.\n\n--- Project Details ---\n\nProject Type: [e.g. Web App / Dashboard / Landing Page]\nBudget Range: [Your budget]\nTimeline: [When do you need it by]\nDescription: [Briefly describe what you need]\n\n--- About You ---\n\nName: \nCompany/Brand: \nWebsite (if any): \n\nLooking forward to hearing from you.\n\nRegards,\n[Your Name]`
)}`;

// CHANGE the email <a> href:
href={mailtoHref}   // was: href={`mailto:${email}`}
```

**Acceptance**: Clicking the email link opens the mail client with subject
"Project Inquiry via Portfolio" and the full structured body pre-filled.

---

### Task 2.6 — Edit `app/page.tsx`

**Current state**: Sections are rendered as direct JSX with no scroll wrapper.

**Change**: Import `RevealSection` and wrap About, Works, Timeline, Skills, Vicinix,
and Contact. Hero manages its own parallax and does NOT get wrapped.

```tsx
// page.tsx
import RevealSection from "@/components/RevealSection";

// Layout:
<>
  <Navbar />
  <main className="flex flex-col scroll-smooth">
    <Hero />                                      {/* no wrapper — owns its own parallax */}
    <RevealSection><About /></RevealSection>
    <RevealSection><Works /></RevealSection>       {/* cards stagger inside */}
    <RevealSection><Timeline /></RevealSection>
    <RevealSection><Skills /></RevealSection>
    <RevealSection><Vicinix /></RevealSection>
    <RevealSection><Contact /></RevealSection>
  </main>
</>
```

**Acceptance**: Each section fades up as it enters the viewport. No double-animation
conflicts with inner component animations.

---

## Verification Checklist

### Functional
- [ ] `useScrollAnimation.ts` exports `useParallax` and is importable
- [ ] `RevealSection` wraps sections — fade-up triggers on scroll
- [ ] Hero heading, tagline, CTAs move at different Y rates on scroll
- [ ] Hero content fades to opacity 0 by 60% of scroll depth
- [ ] Project cards stagger in 150ms apart on Works scroll-into-view
- [ ] Hovering a project card lifts it 6px
- [ ] Section headings rise through masked slot
- [ ] Clicking email opens mail client with pre-filled subject + body template
- [ ] Copy-to-clipboard button still works alongside new mailto link

### Accessibility / Performance
- [ ] `prefers-reduced-motion` OS setting disables all Y offsets
- [ ] Zero new npm packages added
- [ ] `npm run build` exits code 0

### Visual
- [ ] No horizontal overflow / scrollbar on 375px mobile width
- [ ] No animation conflicts between RevealSection and inner `whileInView` calls
- [ ] Stagger timing feels smooth, not slow (150ms per card)
