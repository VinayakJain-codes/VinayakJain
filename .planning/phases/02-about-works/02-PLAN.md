# Phase 2: About & Works Sections

## Goal
Build the About section with tech chips and the Works section with 4 featured project cards.

## Requirements
- REQ-3: About section with bio, tech stack chips, current status callout
- REQ-4: Works section with 4 project cards (Marketnera, Symax, Outfevibe, Presence Guard)

## Plan

### Wave 1 — Data & Shared Components
1. **`data/projects.ts`** — Create project data array with all 4 projects
2. **`components/SectionHeading.tsx`** — Reusable animated section heading

### Wave 2 — Section Components
1. **`components/About.tsx`** — Bio, tech chips, callout
2. **`components/ProjectCard.tsx`** — Individual project card with hover glow
3. **`components/Works.tsx`** — Grid layout with project cards

### Wave 3 — Integration
1. **`app/page.tsx`** — Wire About + Works into the homepage
2. **`app/globals.css`** — Add any custom animation keyframes needed

## Verification
- `npm run build` passes with zero errors
- All sections render correctly
