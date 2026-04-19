# Phase 01: Foundation & Hero Section - Context

**Gathered:** 2026-04-19
**Status:** Ready for planning
**Source:** PRD Express Path (vinayak-portfolio-plan.md) + User Revisions

<domain>
## Phase Boundary

Set up the Next.js App Router project architecture and build the Hero section with heavily animated Three.js particle backgrounds and a Stitch-generated base UI.
</domain>

<decisions>
## Implementation Decisions

### Project Foundation
- Initialize Next.js 14 App Router project with TypeScript, Tailwind CSS, and Framer Motion.
- Set up domain-specific design tokens in globals.css/tailwind.config (Dark base `#0a0a0a`, orange accent `#f97316`, green pop `#13ec5b`).
- Apply typography (Syne/Space Grotesk for display, DM Mono/Geist Mono for body).
- Utilize the **Stitch MCP Server** to generate base UI screens and implement the design system.

### Hero Section & Animations
- Full-screen hero section displaying "Vinayak Jain".
- Tagline "Builder. Developer. Creator."
- Animated typewriter for rotating roles.
- Call to action buttons: "View Work", "Contact Me".
- Use **heavy animations and moving particles** for the background.
- Include **Three.js** (`three`, `@react-three/fiber`, `@react-three/drei`) to generate an immersive, interactive particle field or 3D scene.
- Social pill row for LinkedIn, GitHub, Email.
- Implement responsive layout: font scales with `clamp()` and no horizontal scroll.

### the agent's Discretion
- Stitch design system configurations and exact screen generation prompts.
- Specific particle behavior (e.g., cursor repulsion, wave mechanics, depth of field effects) in Three.js.
- Structure of the typewriter animation.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Architecture
- `vinayak-portfolio-plan.md` — The original portfolio PRD.

</canonical_refs>

<specifics>
## Specific Ideas

- The theme should feel like a developer-meets-creator aesthetic – bold, editorial, techy but human.
- The UI should be scaffolded via Stitch MCP tools where suitable.
- The background needs to be a rich 3D particle simulation that feels highly premium and dynamic.

</specifics>

<deferred>
## Deferred Ideas

- None — PRD covers phase scope.

</deferred>

---

*Phase: 01-foundation-hero*
*Context gathered: 2026-04-19 via PRD Express Path and manual additions*
