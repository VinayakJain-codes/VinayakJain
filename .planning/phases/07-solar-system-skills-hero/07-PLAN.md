---
phase: 7
name: Solar System Skills Hero Animation
wave: 1
depends_on: []
files_modified:
  - components/SolarSystemScene.tsx
  - components/Hero.tsx
autonomous: false
requirements:
  - REQ-11
---

# Phase 7: Solar System Skills Hero Animation — Plan

## Objective

Replace the Phase 6 geometric 3D animation with a "Solar System / Galaxy" Three.js scene. The sun/center will be the core, and orbiting planets will represent top skills (e.g., React, Next.js, Node.js). Must include orbital paths, glowing starfield, and interactive behaviors, using `@react-three/fiber` and `@react-three/drei`.

---

## must_haves

- [ ] `components/SolarSystemScene.tsx` — Self-contained R3F Canvas with a central core, orbiting planets, skill labels via `<Html>`, and faint orbital rings.
- [ ] `components/Hero.tsx` — Update dynamic import to load `SolarSystemScene` instead of `HeroScene3D`.
- [ ] SSR safety via `dynamic(() => import(...), { ssr: false })`
- [ ] `prefers-reduced-motion` respected — planets static when enabled
- [ ] No TypeScript compilation errors

---

## Wave 1 — Solar System Scene (All tasks parallel)

---

### Task 1: Create `components/SolarSystemScene.tsx`

**Wave:** 1  
**Depends on:** None

<read_first>
- `components/HeroScene3D.tsx` — review how R3F and reducedMotion were set up in the previous iteration.
- `app/globals.css` — confirm accent color value (`#f97316`), background (`#0a0a0a`)
</read_first>

<action>
Create `components/SolarSystemScene.tsx` with the following exact implementation:

```tsx
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Stars } from "@react-three/drei";
import * as THREE from "three";

interface SceneProps {
  reducedMotion: boolean;
}

const SKILLS = [
  { name: "React", color: "#61DAFB", radius: 1.5, speed: 0.8, size: 0.15 },
  { name: "Next.js", color: "#FFFFFF", radius: 2.2, speed: 0.5, size: 0.18 },
  { name: "Node.js", color: "#339933", radius: 3.0, speed: 0.3, size: 0.14 },
  { name: "TypeScript", color: "#3178C6", radius: 3.8, speed: 0.2, size: 0.16 },
  { name: "Tailwind", color: "#06B6D4", radius: 4.5, speed: 0.15, size: 0.12 },
];

function Planet({ skill, reducedMotion, index }: { skill: typeof SKILLS[0], reducedMotion: boolean, index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialAngle = useMemo(() => (Math.PI * 2 / SKILLS.length) * index, [index]);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Calculate angle: static if reducedMotion, else orbiting over time
    const angle = reducedMotion 
      ? initialAngle 
      : initialAngle + state.clock.elapsedTime * skill.speed;

    meshRef.current.position.x = Math.cos(angle) * skill.radius;
    meshRef.current.position.z = Math.sin(angle) * skill.radius;
    
    // Rotate the planet on its own axis
    if (!reducedMotion) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.01;
    }
  });

  return (
    <group>
      {/* Orbital Path (Ring) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[skill.radius - 0.01, skill.radius + 0.01, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>

      {/* The Planet Mesh */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[skill.size, 32, 32]} />
        <meshStandardMaterial color={skill.color} metalness={0.4} roughness={0.7} />
        
        {/* Html Label */}
        <Html distanceFactor={10} center>
          <div className="px-2 py-1 rounded bg-black/50 border border-white/10 backdrop-blur-sm whitespace-nowrap text-xs font-mono text-white pointer-events-none select-none">
            {skill.name}
          </div>
        </Html>
      </mesh>
    </group>
  );
}

function SolarSystem({ reducedMotion }: SceneProps) {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current && !reducedMotion) {
      coreRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group rotation={[Math.PI / 8, 0, 0]}>
      {/* Central Core (Sun) */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#f97316" />
        {/* Sun Glow */}
        <pointLight color="#f97316" intensity={100} distance={20} decay={2} />
      </mesh>

      {/* Ambient Fill */}
      <ambientLight intensity={0.2} />

      {/* Planets */}
      {SKILLS.map((skill, i) => (
        <Planet key={skill.name} skill={skill} reducedMotion={reducedMotion} index={i} />
      ))}
      
      {/* Background Stars */}
      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={reducedMotion ? 0 : 1} />
    </group>
  );
}

interface SolarSystemSceneProps {
  reducedMotion?: boolean;
}

export default function SolarSystemScene({ reducedMotion = false }: SolarSystemSceneProps) {
  return (
    <div className="w-full h-full min-h-[500px]" aria-hidden="true" role="presentation">
      <Canvas
        camera={{ position: [0, 4, 8], fov: 45 }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <SolarSystem reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
```

Key implementation details:
- `SKILLS` array holds planet specs (color, orbit radius, orbit speed, mesh size).
- `Planet` component calculates its orbit position using `Math.cos()` and `Math.sin()`.
- `<Html>` from Drei renders the skill label perfectly tracked to the planet mesh in 3D space.
- A `<ringGeometry>` draws the faint orbital track.
- `<Stars>` creates a subtle moving starfield behind the solar system.
- Camera positioned slightly above `[0, 4, 8]` and looking down to show the orbital plane effectively.
</action>

<acceptance_criteria>
- `components/SolarSystemScene.tsx` file exists.
- File uses `<Html>` and `<Stars>` from `@react-three/drei`.
- File implements `SKILLS` mapping to `Planet` components.
- Orbit positions correctly use `Math.cos` and `Math.sin`.
- Orbital tracks are rendered with `<ringGeometry>`.
- `reducedMotion` halts planet orbiting and star field twinkling.
- No TypeScript errors when running `npx tsc --noEmit`.
</acceptance_criteria>

---

### Task 2: Refactor `components/Hero.tsx` to use `SolarSystemScene`

**Wave:** 1  
**Depends on:** Task 1

<read_first>
- `components/Hero.tsx`
</read_first>

<action>
Update `components/Hero.tsx` to dynamically import `SolarSystemScene` instead of `HeroScene3D`.

1. Change the dynamic import line:
```tsx
const SolarSystemScene = dynamic(() => import("./SolarSystemScene"), {
  ssr: false,
  loading: () => null,
});
```
2. Change the component reference in the JSX:
```tsx
        <motion.div
          className="hidden lg:flex items-center justify-center h-[520px] relative"
          style={{ opacity: sceneOpacity, scale: sceneScale }}
          aria-hidden="true"
        >
          {/* Ambient glow behind the mesh */}
          <div className="absolute inset-0 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
          <SolarSystemScene reducedMotion={shouldReduce ?? false} />
        </motion.div>
```
</action>

<acceptance_criteria>
- `Hero.tsx` imports `SolarSystemScene` instead of `HeroScene3D`.
- `<SolarSystemScene reducedMotion={...} />` is rendered in the JSX.
- No TypeScript errors.
</acceptance_criteria>

---

## Verification Steps

After execution, manually verify:

1. **Dev server check:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` — verify:
   - [ ] Right side of hero shows a glowing orange sun and orbiting planets.
   - [ ] Planets have small glowing text labels matching top skills.
   - [ ] Faint orbital rings are visible.
   - [ ] Background starfield twinkles slightly.

2. **Mobile check**:
   - [ ] 3D panel is hidden (`display: none` via `hidden lg:flex`)

3. **Reduced motion check** (Chrome DevTools → Rendering → Emulate CSS prefers-reduced-motion):
   - [ ] Planets freeze in place on their orbits.
   - [ ] Starfield stops twinkling.

4. **Build check:**
   ```bash
   npm run build
   ```
   - [ ] Build completes without errors.

