# Phase 5 Context: Scroll Animations & Email Template

## Phase Goal
Add cinematic, scroll-driven animations to the portfolio and wire up a `mailto:` link in
Contact that pre-fills a professional hiring inquiry template for the user.

## Source PRD
User-provided plan document (pasted in chat, 2026-04-19).

## Key Requirements

### REQ-8: Scroll Animations
- **Hero parallax**: Heading, tagline, and CTA float at different scroll speeds using
  `useScroll` + `useTransform`. Heading moves fastest, CTAs move slowest. Opacity fades
  to 0 by 60% scroll depth.
- **Project card stagger**: Cards in Works section appear one-by-one with 150ms stagger
  using `variants` + `whileInView`. Hover lifts card 6px.
- **Site-wide section reveals**: About, Timeline, Skills, Vicinix, Contact all fade-up
  with `useInView` via a shared `RevealSection` component.
- **Animated heading reveals**: SectionHeading text slides up through an `overflow-hidden`
  mask for a curtain-reveal effect.
- **Reduced motion safety**: All animation disabilities (`prefers-reduced-motion`) respected
  via `useReducedMotion()`.

### REQ-9: Email Template on Contact
- Clicking the email address (or a CTA button) opens the user's mail client with:
  - **To**: vinayakjain2110@gmail.com
  - **Subject**: "Project Inquiry via Portfolio"
  - **Body**: The full structured template (Project Details, Budget, Timeline, Description,
    About You section).
- The plain-text body must URL-encode correctly.
- The existing copy-to-clipboard button stays alongside the mailto link.

## Files To Create / Edit

| File | Action |
|---|---|
| `components/hooks/useScrollAnimation.ts` | NEW — `useParallax` hook |
| `components/RevealSection.tsx` | NEW — generic fade-up wrapper |
| `components/Hero.tsx` | EDIT — add parallax layers |
| `components/ProjectCard.tsx` | EDIT — add stagger variants + hover lift |
| `components/Works.tsx` | EDIT — add stagger container |
| `components/SectionHeading.tsx` | EDIT — curtain-reveal heading |
| `components/Contact.tsx` | EDIT — mailto with pre-filled template |
| `app/page.tsx` | EDIT — wrap sections in RevealSection |

## Out of Scope
- No new npm packages
- No server-side changes
- No contact form with actual submission
