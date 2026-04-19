"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const techStack = [
  { name: "TypeScript", category: "language" },
  { name: "Python", category: "language" },
  { name: "JavaScript", category: "language" },
  { name: "SQL", category: "language" },
  { name: "Next.js 14", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "Three.js", category: "frontend" },
  { name: "Supabase", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "PostGIS", category: "backend" },
  { name: "Razorpay", category: "tools" },
  { name: "Git", category: "tools" },
  { name: "Vercel", category: "tools" },
  { name: "OpenCV", category: "tools" },
];

const chipColors: Record<string, string> = {
  language: "border-accent/30 text-accent bg-accent/5",
  frontend: "border-highlight/30 text-highlight bg-highlight/5",
  backend: "border-blue-400/30 text-blue-400 bg-blue-400/5",
  tools: "border-yellow-400/30 text-yellow-400 bg-yellow-400/5",
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
};

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6 lg:px-20 bg-[#0e0e0e]">
      {/* Subtle top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="container mx-auto max-w-6xl">
        <SectionHeading label="// about" title="Who I Am" />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Bio column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-foreground/70 leading-relaxed text-lg mb-6">
              I&apos;m <span className="text-foreground font-semibold">Vinayak Jain</span> — a full-stack developer,
              startup builder, and creator from Meerut, UP. Currently pursuing my BCA while building
              products that solve real problems.
            </p>
            <p className="text-foreground/50 leading-relaxed mb-8">
              I founded <span className="text-accent font-medium">Vicinix</span> as a freelance dev brand,
              and I&apos;m a member of the Vidya University Innovation Centre (VIC). I believe in shipping
              fast, learning in public, and building with intention.
            </p>

            {/* Callout card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative p-5 rounded-sm bg-[#131313] border-l-2 border-accent"
            >
              <p className="text-foreground/60 font-mono text-sm">
                <span className="text-highlight">▸</span> Currently building{" "}
                <span className="text-foreground font-medium">Marketnera</span> · Open to freelance
                projects
              </p>
            </motion.div>
          </motion.div>

          {/* Tech chips column */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="font-mono text-xs tracking-[0.15em] uppercase text-foreground/40 mb-6"
            >
              Tech Stack
            </motion.p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {techStack.map((tech) => (
                <motion.span
                  key={tech.name}
                  variants={chipVariants}
                  className={`px-3 py-1.5 rounded-full border font-mono text-xs tracking-wide transition-all duration-300 hover:scale-105 cursor-default ${chipColors[tech.category]}`}
                >
                  {tech.name}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
