# Phase 7: Solar System Skills Hero Animation - Research

## Context
The user wants to replace the geometric 3D animation (Phase 6) with a "Solar System / Galaxy" concept where their top skills (like React, Node.js, Next.js, etc.) are represented as planets orbiting a central sun or core.

## Technical Requirements
- **Three.js Ecosystem**: We will use `@react-three/fiber` and `@react-three/drei`.
- **Sun/Core**: A glowing sphere in the center.
- **Planets**: Spheres orbiting at different radii and speeds.
- **Skill Labels**: Use the `<Html>` component from `@react-three/drei` to render 2D DOM elements (like skill names or icons) tethered to the 3D planet meshes.
- **Orbit Rings**: Visual lines showing the orbital paths (using `LineLoop` or `EdgesGeometry` / `RingGeometry`).
- **SSR Safety**: Must be dynamically imported with `ssr: false` in `Hero.tsx`.
- **Accessibility**: Must pause animation if `useReducedMotion` is true.

## Design
- Background: Transparent (inheriting from the global `bg-background` which is `#0a0a0a`).
- Central Core: Accent color `#f97316` with a strong `pointLight` and `meshBasicMaterial` to look like a glowing sun.
- Planets: Neutral or slightly colored spheres (e.g., `#fb923c` or `#60a5fa`).
- Orbital Paths: Thin, faint rings (`opacity: 0.15`).
- Labels: White or orange text with a dark semi-transparent background, dropping a subtle glow.

## Proposed Component: `components/SolarSystemScene.tsx`
We will create a new file `components/SolarSystemScene.tsx` to avoid completely destroying the previous `HeroScene3D.tsx` logic, and update `components/Hero.tsx` to dynamically import `SolarSystemScene` instead.

### The Planets (Skills)
Skills to feature:
1. React
2. Next.js
3. Node.js
4. TypeScript
5. TailwindCSS

### Math for Orbits
We can use `Math.cos()` and `Math.sin()` with `state.clock.elapsedTime` in `useFrame` to position planets along a circular orbit.
```tsx
const angle = state.clock.elapsedTime * speed + offset;
mesh.position.x = Math.cos(angle) * radius;
mesh.position.z = Math.sin(angle) * radius;
```
If reduced motion is active, the `elapsedTime` multiplier is frozen or we just use the `offset` as the static angle.
