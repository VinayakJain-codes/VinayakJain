"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Skill data — each becomes an orbiting planet                       */
/* ------------------------------------------------------------------ */

const SKILLS = [
  { name: "React",      color: "#61DAFB", radius: 1.2, speed: 0.6,  size: 0.15, angle: 0 },
  { name: "Next.js",    color: "#FFFFFF", radius: 1.9, speed: 0.4,  size: 0.18, angle: Math.PI / 2 },
  { name: "Node.js",    color: "#339933", radius: 2.6, speed: 0.3,  size: 0.14, angle: Math.PI },
  { name: "TypeScript", color: "#3178C6", radius: 3.2, speed: 0.2,  size: 0.16, angle: Math.PI * 1.5 },
  { name: "Tailwind",   color: "#06B6D4", radius: 3.8, speed: 0.15, size: 0.12, angle: Math.PI / 4 },
];

/* ------------------------------------------------------------------ */
/*  Individual Planet                                                  */
/* ------------------------------------------------------------------ */

interface PlanetProps {
  skill: (typeof SKILLS)[0];
  reducedMotion: boolean;
  index: number;
}

function Planet({ skill, reducedMotion, index }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialAngle = skill.angle ?? 0;

  useFrame((state) => {
    if (!meshRef.current) return;

    const angle = reducedMotion
      ? initialAngle
      : initialAngle + state.clock.elapsedTime * skill.speed;

    meshRef.current.position.x = Math.cos(angle) * skill.radius;
    meshRef.current.position.z = Math.sin(angle) * skill.radius;

    // Gentle self-rotation
    if (!reducedMotion) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
    }
  });

  return (
    <group>
      {/* Orbital ring track */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[skill.radius - 0.01, skill.radius + 0.01, 64]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Planet sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[skill.size, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          metalness={0.4}
          roughness={0.7}
        />

        {/* Skill label pinned to planet */}
        <Html distanceFactor={8} center>
          <div
            className="hidden md:block px-2 py-1 rounded bg-black/50 border border-white/10 backdrop-blur-sm whitespace-nowrap text-xs font-mono text-white pointer-events-none select-none"
          >
            {skill.name}
          </div>
        </Html>
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Solar system group (sun + planets + stars)                         */
/* ------------------------------------------------------------------ */

interface SceneProps {
  reducedMotion: boolean;
}

function SolarSystem({ reducedMotion }: SceneProps) {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current && !reducedMotion) {
      coreRef.current.rotation.y += delta * 0.2;
      // Gentle pulse
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group rotation={[Math.PI / 8, 0, 0]}>
      {/* Central core (Sun) */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#f97316" />
        
        {/* Corona glow */}
        <mesh>
          <sphereGeometry args={[0.65, 32, 32]} />
          <meshBasicMaterial 
            color="#f97316" 
            transparent 
            opacity={0.15} 
            blending={THREE.AdditiveBlending} 
          />
        </mesh>
        
        {/* Point light emitting from the sun */}
        <pointLight color="#f97316" intensity={100} distance={20} decay={2} />
      </mesh>

      {/* Ambient fill so planets aren't pitch-black on one side */}
      <ambientLight intensity={0.2} />

      {/* Orbiting skill planets */}
      {SKILLS.map((skill, i) => (
        <Planet
          key={skill.name}
          skill={skill}
          reducedMotion={reducedMotion}
          index={i}
        />
      ))}

      {/* Deep-space starfield */}
      <Stars
        radius={50}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={reducedMotion ? 0 : 1}
      />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Exported wrapper — mounts the Canvas                               */
/* ------------------------------------------------------------------ */

interface SolarSystemSceneProps {
  reducedMotion?: boolean;
}

export default function SolarSystemScene({
  reducedMotion = false,
}: SolarSystemSceneProps) {
  return (
    <div
      className="w-full h-full min-h-[350px] lg:min-h-[500px]"
      aria-hidden="true"
      role="presentation"
    >
      <Canvas
        camera={{ position: [0, 4, 9], fov: 50 }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <SolarSystem reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
