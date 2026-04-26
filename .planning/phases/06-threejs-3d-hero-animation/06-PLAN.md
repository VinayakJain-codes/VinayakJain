---
phase: 6
name: Three.js 3D Hero Animation
wave: 1
depends_on: []
files_modified:
  - components/HeroScene3D.tsx
  - components/Hero.tsx
autonomous: false
requirements:
  - REQ-10
---

# Phase 6: Three.js 3D Hero Animation — Plan

## Objective

Replace the empty right-side canvas area in the Hero section with an interactive Three.js 3D scene. A morphing icosahedron with distortion shader, mouse-reactive rotation, orange brand accent lighting, and scroll-driven opacity/scale. Uses `@react-three/fiber` + `@react-three/drei` (already installed). SSR-safe, accessibility-aware, mobile-hidden.

---

## must_haves

- [ ] `components/HeroScene3D.tsx` — Self-contained R3F Canvas with morphing icosahedron
- [ ] `components/Hero.tsx` — Two-column layout at `lg:` breakpoint, dynamic import of `HeroScene3D`, scroll-driven opacity on 3D panel
- [ ] SSR safety via `dynamic(() => import(...), { ssr: false })`
- [ ] `prefers-reduced-motion` respected — mesh static when enabled
- [ ] No TypeScript compilation errors
- [ ] Mobile: 3D panel hidden (`hidden lg:flex`), hero text takes full width

---

## Wave 1 — Core 3D Scene + Hero Layout (All tasks parallel)

---

### Task 1: Create `components/HeroScene3D.tsx`

**Wave:** 1  
**Depends on:** None

<read_first>
- `components/ParticleBackground.tsx` — understand existing R3F patterns, imports, and Canvas setup
- `components/Hero.tsx` — understand current layout and scroll refs
- `app/globals.css` — confirm accent color value (`#f97316`), background (`#0a0a0a`)
- `package.json` — confirm drei/fiber/three versions for API compatibility
</read_first>

<action>
Create `components/HeroScene3D.tsx` with the following exact implementation:

```tsx
"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface SceneProps {
  reducedMotion: boolean;
}

function AnimatedMesh({ reducedMotion }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state, delta) => {
    if (!meshRef.current || reducedMotion) return;

    // Mouse-reactive rotation with smooth lerp
    meshRef.current.rotation.y +=
      (mouse.x * 0.6 - meshRef.current.rotation.y) * 0.04;
    meshRef.current.rotation.x +=
      (-mouse.y * 0.4 - meshRef.current.rotation.x) * 0.04;

    // Idle auto-rotation
    meshRef.current.rotation.y += delta * 0.12;

    // Ring counter-rotation for visual interest
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.08;
      ringRef.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <group>
      {/* Main morphing icosahedron */}
      <mesh ref={meshRef} castShadow>
        <icosahedronGeometry args={[1.5, 5]} />
        <MeshDistortMaterial
          color="#f97316"
          speed={reducedMotion ? 0 : 3.5}
          distort={reducedMotion ? 0 : 0.38}
          roughness={0.05}
          metalness={0.95}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Inner glow sphere — subtle fill */}
      <mesh>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Orbiting ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.1, 0.015, 8, 120]} />
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Second ring orthogonal */}
      <mesh rotation={[Math.PI / 2.5, Math.PI / 6, 0]}>
        <torusGeometry args={[2.4, 0.008, 8, 120]} />
        <meshBasicMaterial
          color="#fb923c"
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

function Lights() {
  return (
    <>
      {/* Ambient — dark fill */}
      <ambientLight intensity={0.15} />

      {/* Orange key light — matches accent */}
      <pointLight
        position={[4, 4, 3]}
        intensity={90}
        color="#f97316"
        distance={12}
        decay={2}
      />

      {/* Cool blue fill — contrast */}
      <pointLight
        position={[-4, -3, -2]}
        intensity={35}
        color="#60a5fa"
        distance={10}
        decay={2}
      />

      {/* Top white rim */}
      <spotLight
        position={[0, 8, 2]}
        intensity={50}
        angle={0.4}
        penumbra={0.8}
        color="#ffffff"
        castShadow={false}
      />
    </>
  );
}

interface HeroScene3DProps {
  reducedMotion?: boolean;
}

export default function HeroScene3D({ reducedMotion = false }: HeroScene3DProps) {
  return (
    <div
      className="w-full h-full min-h-[500px]"
      aria-hidden="true"
      role="presentation"
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
        }}
      >
        <Lights />
        <AnimatedMesh reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
```

Key implementation details:
- `icosahedronGeometry args={[1.5, 5]}` — radius 1.5, detail level 5 (enough faces for smooth distort)
- `MeshDistortMaterial` from `@react-three/drei` — built-in vertex shader distortion, no custom GLSL needed
- `speed={3.5}` — distort animation speed; set to 0 when `reducedMotion=true`
- `distort={0.38}` — amplitude of vertex displacement (0 = sphere, 1 = very chaotic)
- `metalness={0.95}`, `roughness={0.05}` — near-mirror metallic look to catch the orange key light dramatically
- Camera at z=4.5 with fov=45 gives a good field of view for the 1.5-radius mesh plus rings
- `gl.alpha: true` — transparent canvas background to inherit Hero's `#0a0a0a`
- Two torus rings with different radii/opacity for layered visual depth
- `THREE.ACESFilmicToneMapping` — filmic tone mapping for rich contrast matching the dark portfolio aesthetic
</action>

<acceptance_criteria>
- `components/HeroScene3D.tsx` file exists
- File contains `import { MeshDistortMaterial } from "@react-three/drei"`
- File contains `import { Canvas, useFrame, useThree } from "@react-three/fiber"`
- File contains `icosahedronGeometry`
- File contains `reducedMotion` prop interface
- File contains `aria-hidden="true"`
- File contains `role="presentation"`
- File exports `HeroScene3D` as default export
- No TypeScript errors when running `npx tsc --noEmit`
</acceptance_criteria>

---

### Task 2: Refactor `components/Hero.tsx` — Two-Column Layout + Dynamic Import

**Wave:** 1  
**Depends on:** Task 1 (HeroScene3D must exist before import)

<read_first>
- `components/Hero.tsx` — current full file (74 lines) — understand the existing layout, scroll refs, Framer Motion usage, and `useReducedMotion` hook
- `components/HeroScene3D.tsx` — (just created) confirm the props interface: `{ reducedMotion?: boolean }`
- `app/globals.css` — confirm Tailwind v4 class aliases used (`bg-background`, etc.)
</read_first>

<action>
Replace the content of `components/Hero.tsx` with the following:

```tsx
"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Code2, MoveRight } from "lucide-react";
import ParticleBackground from "./ParticleBackground";

// Dynamic import — prevents SSR crash (R3F Canvas is client-only)
const HeroScene3D = dynamic(() => import("./HeroScene3D"), {
  ssr: false,
  loading: () => null, // no spinner — seamless load
});

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const shouldReduce = useReducedMotion();

  // Existing parallax transforms (unchanged)
  const headingY = useTransform(scrollYProgress, [0, 1], [0, shouldReduce ? 0 : -120]);
  const taglineY = useTransform(scrollYProgress, [0, 1], [0, shouldReduce ? 0 : -60]);
  const ctaY     = useTransform(scrollYProgress, [0, 1], [0, shouldReduce ? 0 : -30]);
  const opacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // 3D scene fades and scales as user scrolls away
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const sceneScale   = useTransform(scrollYProgress, [0, 0.4], [1, 0.85]);

  return (
    <div
      ref={ref}
      className="relative min-h-screen w-full flex items-center bg-background overflow-hidden selection:bg-accent/30 selection:text-foreground"
    >
      <ParticleBackground />

      {/* Two-column layout at lg breakpoint */}
      <div className="container mx-auto px-6 lg:px-20 z-10 grid lg:grid-cols-2 items-center gap-8 w-full">
        
        {/* LEFT: Text content (unchanged) */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-highlight mb-6"
          >
            <Code2 size={20} />
            <span className="font-mono text-sm tracking-widest uppercase">
              System Initialization
            </span>
          </motion.div>

          <motion.h1
            style={{ y: headingY, opacity }}
            className="text-5xl md:text-7xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
          >
            Vinayak{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#ff9153]">
              Jain
            </span>
          </motion.h1>

          <motion.p
            style={{ y: taglineY, opacity }}
            className="text-xl md:text-2xl text-foreground/70 font-mono mb-10 max-w-lg"
          >
            Full-Stack Developer · Startup Builder · Creator
          </motion.p>

          <motion.div style={{ y: ctaY }} className="flex flex-wrap items-center gap-4">
            <a
              href="#works"
              className="group relative px-8 py-4 bg-accent/10 border border-accent/20 rounded-sm overflow-hidden backdrop-blur-md transition-all hover:bg-accent/20 hover:border-accent/40 hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent/0 to-accent/20 transition-transform duration-500 group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2 text-accent font-mono text-sm tracking-wider uppercase font-medium">
                View Projects
                <MoveRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-foreground/10 text-foreground/70 hover:text-foreground font-mono text-sm tracking-wider uppercase backdrop-blur-md rounded-sm transition-all hover:border-foreground/30 hover:bg-white/5"
            >
              Connect
            </a>
          </motion.div>
        </div>

        {/* RIGHT: Three.js 3D Scene — hidden below lg breakpoint */}
        <motion.div
          className="hidden lg:flex items-center justify-center h-[520px] relative"
          style={{ opacity: sceneOpacity, scale: sceneScale }}
          aria-hidden="true"
        >
          {/* Ambient glow behind the mesh */}
          <div className="absolute inset-0 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
          <HeroScene3D reducedMotion={shouldReduce ?? false} />
        </motion.div>
      </div>

      {/* Ambient gradient overlays (unchanged) */}
      <div className="absolute pointer-events-none inset-0 bg-gradient-to-b from-transparent to-background/80" />
      <div className="absolute pointer-events-none inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0a_100%)] opacity-60" />
    </div>
  );
}
```

Key changes from original Hero.tsx:
1. `import dynamic from "next/dynamic"` — SSR-safe lazy load of HeroScene3D
2. Layout div: added `grid lg:grid-cols-2 items-center gap-8 w-full`
3. Text content wrapped in `<div className="max-w-xl">` (was `max-w-4xl`)
4. Heading size reduced to `lg:text-7xl` (was `lg:text-8xl`) to fit narrower column
5. Tagline `max-w-lg` (was `max-w-2xl`) to fit column width
6. New `sceneOpacity` and `sceneScale` Framer Motion transforms
7. New right column: `<motion.div className="hidden lg:flex items-center justify-center h-[520px]">` wraps HeroScene3D
8. `HeroScene3D` receives `reducedMotion={shouldReduce ?? false}` prop
9. Ambient glow div behind mesh: `bg-accent/5 blur-3xl`
</action>

<acceptance_criteria>
- `components/Hero.tsx` contains `import dynamic from "next/dynamic"`
- File contains `import("./HeroScene3D")`
- File contains `ssr: false`
- File contains `lg:grid-cols-2`
- File contains `hidden lg:flex`
- File contains `sceneOpacity` and `sceneScale` variables
- File contains `<HeroScene3D reducedMotion={`
- File contains `shouldReduce ?? false`
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
   - [ ] Right side of hero shows rotating orange icosahedron
   - [ ] Mesh morphs/distorts continuously
   - [ ] Moving mouse makes mesh follow (smooth lerp)
   - [ ] Scrolling down causes 3D panel to fade and scale down
   - [ ] Two orbit rings visible (one brighter, one subtle)
   - [ ] Orange point light creates warm glow on mesh faces
   - [ ] Blue fill light creates color contrast on shadow side

2. **Mobile check** (Chrome DevTools → mobile viewport):
   - [ ] 3D panel is hidden (`display: none` via `hidden lg:flex`)
   - [ ] Hero text takes full width
   - [ ] No layout shift or overflow

3. **Reduced motion check** (Chrome DevTools → Rendering → Emulate CSS prefers-reduced-motion):
   - [ ] Mesh is static (no rotation, no distortion animation)

4. **Build check:**
   ```bash
   npm run build
   ```
   - [ ] Build completes without errors
   - [ ] No TypeScript or import errors

5. **Console check:**
   - [ ] No Three.js warnings in dev console
   - [ ] No R3F deprecation warnings

---

## Notes for Executor

- **Do not** change `ParticleBackground.tsx` — the particle sphere background stays
- **Do not** add `@react-three/postprocessing` or bloom effects — requires additional package, out of scope
- **Do not** modify `app/page.tsx` — Hero import is unchanged
- The `MeshDistortMaterial` component from `@react-three/drei` internally compiles vertex shaders; no custom GLSL files needed
- If TypeScript complains about `useReducedMotion` returning `boolean | null`, the `?? false` coalesce in `reducedMotion={shouldReduce ?? false}` handles it
- The `h-[520px]` on the right column container matches well with the min-h-screen hero — adjust if the scene looks too small/large
- The `dpr={[1, 2]}` Canvas prop caps pixel ratio for performance without hurting quality on Retina displays
