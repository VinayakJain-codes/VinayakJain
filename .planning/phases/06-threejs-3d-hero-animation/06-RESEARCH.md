# Phase 6: Three.js 3D Hero Animation — Research

## Context Snapshot

| Item | Detail |
|---|---|
| Framework | Next.js 16.2.4 (App Router) |
| React | 19.2.4 |
| Three.js | `three@0.184.0` (installed) |
| R3F | `@react-three/fiber@9.6.0` (installed) |
| Drei | `@react-three/drei@10.7.7` (installed) |
| Accent color | `#f97316` (orange) |
| Background | `#0a0a0a` (near-black) |
| Existing 3D | `ParticleBackground` (full-screen particle sphere behind Hero text) |
| Hero layout | Single-column `max-w-4xl` text, right half is **empty** (see screenshot red box) |

---

## Problem Statement

The Hero section has a large empty right-side area (visible as a red-outlined region in the screenshot). The existing `ParticleBackground` is a full-screen absolute background with 5000 rotating particles. The right panel needs a **foreground** 3D scene that:
- Occupies the right ~45% of the Hero viewport
- Complements but doesn't compete with the particle background
- Feels premium and interactive (mouse-reactive)
- Integrates with the orange (`#f97316`) brand palette
- Is lightweight enough to run at 60 fps on mid-range hardware

---

## Technical Approach

### 1. Layout Change: Hero → Two-Column Grid

Convert Hero from single-column to a **responsive two-column grid** at `lg:` breakpoint:
- Left column: existing text content (`max-w-xl`)
- Right column: new `HeroScene3D` component (full-height canvas)
- Below `lg`: right column hidden (`hidden lg:block`), hero remains single-column

```tsx
// Hero.tsx layout refactor
<div className="container mx-auto px-6 lg:px-20 z-10 grid lg:grid-cols-2 items-center gap-8">
  <div>{/* existing text */}</div>
  <div className="hidden lg:flex items-center justify-center h-full">
    <HeroScene3D />
  </div>
</div>
```

### 2. The 3D Scene: Morphing Icosahedron

**Geometry choice: `IcosahedronGeometry`** — provides a rich faceted look ideal for portfolio "tech crystal" aesthetic.

**Vertex shader distortion** using `CustomShaderMaterial` or raw `ShaderMaterial`. Key technique: offset vertex positions using time-based sine/noise to create organic morph.

Alternative simpler approach: use **`MeshDistortMaterial`** from `@react-three/drei` — built-in distortion shader, zero boilerplate, high quality.

```tsx
import { MeshDistortMaterial } from "@react-three/drei";

<mesh>
  <icosahedronGeometry args={[1.8, 6]} />
  <MeshDistortMaterial
    color="#f97316"
    speed={3}
    distort={0.35}
    roughness={0.1}
    metalness={0.9}
    wireframe={false}
  />
</mesh>
```

### 3. Mouse-Reactive Rotation

Use `useFrame` + `useRef` to smoothly lerp mesh rotation toward mouse position:

```tsx
const { mouse } = useThree();
useFrame((state, delta) => {
  if (!meshRef.current) return;
  meshRef.current.rotation.y += (mouse.x * 0.5 - meshRef.current.rotation.y) * 0.05;
  meshRef.current.rotation.x += (-mouse.y * 0.3 - meshRef.current.rotation.x) * 0.05;
  // Idle auto-rotation when mouse not moving
  meshRef.current.rotation.y += delta * 0.15;
});
```

### 4. Scroll-Driven Scale

Use Framer Motion `useScroll` + `useTransform` to pass a scale value to the mesh:

```tsx
// In HeroScene3D parent (Hero.tsx)
const sceneScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);
// Pass as prop to Canvas → mesh
```

Actually, since R3F Canvas is separate from Framer Motion scroll context, better approach: use a CSS `transform: scale()` on the canvas wrapper div, controlled by Framer Motion `style` prop.

### 5. Lighting Setup

```tsx
<ambientLight intensity={0.2} />
<pointLight position={[5, 5, 3]} intensity={80} color="#f97316" />  // orange key
<pointLight position={[-5, -3, -3]} intensity={30} color="#60a5fa" /> // blue fill
<spotLight position={[0, 8, 0]} intensity={40} angle={0.5} penumbra={1} castShadow />
```

### 6. SSR Safety

R3F Canvas crashes on SSR. Use Next.js `dynamic` import:

```tsx
// In Hero.tsx
import dynamic from "next/dynamic";
const HeroScene3D = dynamic(() => import("./HeroScene3D"), { ssr: false });
```

### 7. Reduced Motion

```tsx
const prefersReduced = useReducedMotion(); // from framer-motion (already used in Hero)
// In HeroScene3D, pass as prop — if true, stop animation loop
```

### 8. Optional Glow Ring Effect

Use `<Ring>` from Drei or a torus geometry around the icosahedron with additive blending for a halo/aura effect:

```tsx
<mesh rotation={[Math.PI / 2, 0, 0]}>
  <torusGeometry args={[2.2, 0.02, 8, 100]} />
  <meshBasicMaterial color="#f97316" transparent opacity={0.3} />
</mesh>
```

---

## Files to Create / Modify

| File | Action |
|---|---|
| `components/HeroScene3D.tsx` | **CREATE** — isolated R3F scene component |
| `components/Hero.tsx` | **MODIFY** — two-column layout, dynamic import, scroll-driven scale |

---

## Performance Guardrails

- `dpr={[1, 2]}` — cap pixel ratio at 2
- `frameloop="demand"` → NO, keep `"always"` for mouse reactivity; use `performance.regress` instead
- `antialias: false` on Canvas for mobile (detect via `navigator.maxTouchPoints`)
- Canvas `style={{ pointerEvents: 'none' }}` so scroll works over it

---

## Validation Architecture

### Dimension 1 — Correctness
- `HeroScene3D.tsx` renders without console errors in dev mode
- `next build` completes without type errors
- Dynamic import boundary prevents SSR crash

### Dimension 2 — Layout
- At `lg:` breakpoint: text left, 3D scene right, both vertically centered
- Below `lg:` breakpoint: 3D scene hidden, text takes full width
- Mesh stays within canvas bounds (no clipping)

### Dimension 3 — Interactivity
- Mouse movement causes mesh to smoothly follow (lerp factor ≈ 0.05)
- Idle auto-rotation visible when mouse is outside viewport
- Scroll from 0→50% reduces scene opacity/scale

### Dimension 4 — Accessibility
- `prefers-reduced-motion`: animation stops (mesh is static), no distortion
- Canvas has `aria-hidden="true"` + `role="presentation"`

### Dimension 5 — Performance
- 60 fps on M1 Mac / modern laptop (target)
- No jank on initial load (dynamic import shows nothing, not a spinner)

### Dimension 6 — Brand Consistency
- Mesh uses `#f97316` accent color
- Fill light uses cool blue for contrast — matches the dark portfolio aesthetic
- Canvas background transparent (inherits `#0a0a0a` from Hero)
