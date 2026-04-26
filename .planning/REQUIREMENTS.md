# Requirements

## REQ-1: Project Foundation & Layout
- **Description**: Next.js App Router setup with Tailwind CSS, Framer Motion, layout components, fonts, and dark mode configuration.
- **Source**: PROJECT.md

## REQ-2: Hero Section
- **Description**: Full-screen hero section with name, tagline, animated typewriter for roles, CTAs, subtle animated background, and social pills.
- **Source**: PROJECT.md

## REQ-3: About Section 
- **Description**: Bio section with tech stack chips and photo placeholder.
- **Source**: PROJECT.md

## REQ-4: Works Section
- **Description**: 4 project cards detailing Marketnera, Symax, Outfevibe, and Presence Guard with appropriate tags and status badges.
- **Source**: PROJECT.md

## REQ-5: Freelance/Vicinix Section
- **Description**: Information about Vicinix brand, services, and clear Call To Action.
- **Source**: PROJECT.md

## REQ-6: Experience & Skills
- **Description**: Minimal vertical timeline and a grid or tag cloud of skills categorised by language/tool.
- **Source**: PROJECT.md

## REQ-7: Contact & Final Polish
- **Description**: Contact section, final responsive design implementation (hamburger nav, tap targets), and metadata/SEO optimizations.
- **Source**: PROJECT.md

## REQ-8: Scroll Animations
- **Description**: Cinematic scroll-driven parallax, staggered card reveals, site-wide section fade-ups, and animated text reveals using Framer Motion.
- **Source**: PROJECT.md

## REQ-9: Email Template
- **Description**: Pre-filled mailto link with a structured hiring inquiry template for the Contact section.
- **Source**: PROJECT.md

## REQ-10: Three.js 3D Hero Animation
- **Description**: Interactive Three.js 3D scene filling the right-side empty canvas area in the Hero section. Must feature a morphing geometric sculpture with shader distortion, mouse-reactive rotation, scroll-driven scale transition, and dynamic lighting with orange accent color palette integration. Must use @react-three/fiber + @react-three/drei (already installed). Must be SSR-safe (dynamic import with no-SSR). Must respect prefers-reduced-motion. Must not degrade hero layout on mobile (gracefully hidden or simplified below md breakpoint).
- **Source**: User Request (Phase 6)

## REQ-11: Solar System Skills Hero Animation
- **Description**: Replace the Phase 6 animation with a "Solar System / Galaxy" concept. Top skills (like React, Node.js, Next.js, etc.) are represented as planets orbiting a central sun/core. Visuals must be premium, using `@react-three/fiber` and `@react-three/drei` (e.g. `Html` component for skill labels, trails, glowing spheres). Must be SSR-safe and support reduced-motion.
- **Source**: User Request (Phase 7)

## REQ-12: Scroll Animation Storytelling
- **Description**: A full-screen, scroll-pinned storytelling section inserted between Hero and About. Uses Framer Motion `useScroll` and `useTransform` to drive chapter-style text reveals, a scroll progress bar, parallax background layers, and smooth opacity/position transitions. The narrative should walk through Vinayak's developer journey in 4-5 "chapters" that animate in and out as the user scrolls. Must respect `prefers-reduced-motion`. No external dependencies beyond Framer Motion (already installed).
- **Source**: User Request (Phase 8)
