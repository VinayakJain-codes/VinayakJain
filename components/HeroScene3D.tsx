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
