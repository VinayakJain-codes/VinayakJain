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
const SolarSystemScene = dynamic(() => import("./SolarSystemScene"), {
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
      <div className="container max-w-7xl mx-auto px-6 lg:px-20 z-10 grid lg:grid-cols-2 items-center gap-8 w-full">
        
        {/* LEFT: Text content (unchanged) */}
        <div>
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
            className="text-lg md:text-xl tracking-wider text-foreground/70 font-mono mb-10 max-w-xl"
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

        {/* RIGHT: Three.js 3D Scene */}
        <motion.div
          className="flex items-center justify-center h-[300px] lg:h-[520px] relative mt-12 lg:mt-0 w-full"
          style={{ opacity: sceneOpacity, scale: sceneScale }}
          aria-hidden="true"
        >
          {/* Ambient bluish breathing glow behind the mesh */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "radial-gradient(ellipse at center, rgba(59,130,246,0.15) 0%, rgba(6,182,212,0.08) 50%, transparent 80%)",
              filter: "blur(40px)",
            }}
          />
          <SolarSystemScene reducedMotion={shouldReduce ?? false} />
        </motion.div>
      </div>

      {/* Ambient gradient overlays (unchanged) */}
      <div className="absolute pointer-events-none inset-0 bg-gradient-to-b from-transparent to-background/80" />
      <div className="absolute pointer-events-none inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0a_100%)] opacity-60" />
    </div>
  );
}
