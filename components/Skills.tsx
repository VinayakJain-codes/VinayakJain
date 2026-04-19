"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const skillCategories = [
  {
    label: "Languages",
    color: "#f97316",
    skills: ["TypeScript", "Python", "JavaScript", "SQL"],
  },
  {
    label: "Frontend",
    color: "#13ec5b",
    skills: ["Next.js 14", "React", "Tailwind CSS", "Framer Motion", "Recharts", "Three.js"],
  },
  {
    label: "Backend / DB",
    color: "#3b82f6",
    skills: ["Supabase", "PostgreSQL", "RLS", "PostGIS", "Realtime"],
  },
  {
    label: "Tools",
    color: "#eab308",
    skills: ["Git", "GitHub", "Razorpay", "OpenCV", "pptxgenjs", "Vercel"],
  },
  {
    label: "Other",
    color: "#a855f7",
    skills: ["Video Editing", "Content Creation", "Event Anchoring"],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

const tagVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6 lg:px-20 bg-background">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-highlight/20 to-transparent" />

      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          label="// skills"
          title="Tech Arsenal"
          description="The tools and technologies I reach for when building."
        />

        <div className="space-y-10">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: catIdx * 0.08 }}
            >
              {/* Category label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color, boxShadow: `0 0 8px ${cat.color}60` }} />
                <span className="font-mono text-xs tracking-[0.15em] uppercase" style={{ color: cat.color }}>
                  {cat.label}
                </span>
                <div className="flex-1 h-px bg-foreground/5" />
              </div>

              {/* Tags */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-wrap gap-2 pl-5"
              >
                {cat.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={tagVariants}
                    className="px-3.5 py-2 rounded-sm font-mono text-xs tracking-wide border transition-all duration-300 cursor-default hover:scale-[1.04]"
                    style={{
                      borderColor: `${cat.color}20`,
                      color: `${cat.color}cc`,
                      backgroundColor: `${cat.color}08`,
                    }}
                    whileHover={{
                      borderColor: `${cat.color}50`,
                      boxShadow: `0 0 15px ${cat.color}15`,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
