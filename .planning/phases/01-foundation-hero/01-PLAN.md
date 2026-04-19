---
wave: 1
depends_on: []
files_modified: ["package.json", "tailwind.config.ts", "app/globals.css", "app/layout.tsx", "app/page.tsx", "components/Hero.tsx", "components/ParticleBackground.tsx"]
autonomous: true
requirements: ["REQ-1", "REQ-2"]
---

# Phase 01: Foundation & Hero Section - Execution Plan

<objective>
Setup the Next.js 14 project, configure Tailwind CSS and Stitch UI screens, install necessary dependencies (Three.js, Framer Motion, Lucide React), and build the full-screen Hero component with heavy 3D particle animations.
</objective>

<tasks>

<task>
<description>Scaffold Next.js Project & Dependencies</description>
<read_first>
- vinayak-portfolio-plan.md
</read_first>
<action>
1. Initialize a Next.js App Router project using `npx -y create-next-app@latest . --typescript --eslint --tailwind --app --src-dir=false --import-alias="@/*" --use-npm` in the current directory if it does not exist.
2. Install Framer Motion, Lucide icons, and Three.js packages: `npm install framer-motion lucide-react three @react-three/fiber @react-three/drei`.
3. Install Three.js types: `npm install -D @types/three`.
4. Create the expected `components`, `data`, and `public/assets` folders.
</action>
<acceptance_criteria>
- `package.json` contains `next`, `react`, `framer-motion`, `lucide-react`, `three`, `@react-three/fiber`, and `@react-three/drei`.
- Directory `components` exists.
</acceptance_criteria>
</task>

<task>
<description>Generate Base UI using Stitch MCP Server</description>
<read_first>
- .planning/phases/01-foundation-hero/01-CONTEXT.md
</read_first>
<action>
1. Ask the Stitch MCP server to instantiate a new project (`mcp_StitchMCP_create_project`) titled "Vinayak Portfolio".
2. Create a design system (`mcp_StitchMCP_create_design_system`) adopting the context colors (Dark base `#0a0a0a`, accent `#f97316`, pop `#13ec5b`) and correct fonts (`Syne` / `Space Grotesk`).
3. Generate the base hero component layout by calling `mcp_StitchMCP_generate_screen_from_text` with the prompt: "A dark premium portfolio hero section for a full-stack developer. Include 'Vinayak Jain', and 'Builder. Developer. Creator.' with vibrant orange and green accents."
4. Extract the generated code and place it in the `components/` directory as a baseline (note: heavy animations will be layered on next).
</action>
<acceptance_criteria>
- `components/Hero.tsx` or similar component exists with Stitch-generated baseline markup.
- Stitch project and design system API calls have been successfully executed in the workspace context.
</acceptance_criteria>
</task>

<task>
<description>Configure Theme and Fonts</description>
<read_first>
- tailwind.config.ts
- app/globals.css
- app/layout.tsx
</read_first>
<action>
1. Edit `tailwind.config.ts` to extend the theme colors:
   - `background: '#0a0a0a'`
   - `accent: '#f97316'`
   - `highlight: '#13ec5b'`
2. Edit `app/layout.tsx` to load modern Google fonts via `next/font/google`:
   - `Syne` or `Space Grotesk` (variable `--font-display`)
   - `DM Mono` or `Geist Mono` (variable `--font-body`)
3. Set the global `body` tag in `app/layout.tsx` to use the dark background, correct text colors, and the body font.
</action>
<acceptance_criteria>
- `tailwind.config.ts` contains `accent` and `highlight` colors.
- `app/layout.tsx` imports two fonts from `next/font/google`.
- `app/globals.css` applies `#0a0a0a` to the base body.
</acceptance_criteria>
</task>

<task>
<description>Implement Three.js Particle Background & Final Hero Polish</description>
<read_first>
- components/Hero.tsx
- app/page.tsx
</read_first>
<action>
1. Create `components/ParticleBackground.tsx` using `@react-three/fiber` and `@react-three/drei`. Implement a visually striking moving particle system (e.g., using `Points` and custom shaders or Math formulas to create wave-like heavy animation motion with reactive interaction).
2. Integrate `<ParticleBackground />` into `components/Hero.tsx` securely behind the main text via absolute positioning (`absolute inset-0 -z-10`).
3. Polish the text layout: animated typewriter effect ("Full-Stack Dev", "Solo Builder", "Content Creator"), CTA buttons, and social pills (LinkedIn, GitHub, Email icons).
4. Apply Framer Motion variants to ensure text layers fade up elegantly, complementing the 3D background.
5. Render `<Hero />` in the main `app/page.tsx` file.
</action>
<acceptance_criteria>
- `components/ParticleBackground.tsx` exists and renders a `<Canvas>` from `@react-three/fiber`.
- `components/Hero.tsx` imports and renders `<ParticleBackground />`.
- `app/page.tsx` renders the new `Hero` component perfectly.
</acceptance_criteria>
</task>

</tasks>

<must_haves>
- Project starts via `npm run dev` with ZERO errors.
- Three.js particle system operates smoothly in the background.
- Stitch UI concepts are fully integrated with Next.js app structure.
- Typewriter animation cycles through the specific roles.
</must_haves>
