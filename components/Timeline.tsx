"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const timeline = [
  {
    period: "Ongoing",
    role: "Founder & Builder",
    org: "Marketnera",
    description: "Building India's hyperlocal commerce platform for Tier 2/3 cities",
    accent: "#f97316",
    active: true,
  },
  {
    period: "2025",
    role: "Delivered",
    org: "Symax Governance Dashboard",
    description: "Full-stack governance dashboard for Symax Group (UAE/UK/EU) via Vicinix",
    accent: "#13ec5b",
  },
  {
    period: "2025",
    role: "VIC Member",
    org: "Vidya Innovation Centre",
    description: "Vidya University Innovation Centre, Meerut",
    accent: "#3b82f6",
  },
  {
    period: "2024–25",
    role: "CTO",
    org: "Outfevibe",
    description: "AI Fashion SaaS — built the full initial codebase",
    accent: "#a855f7",
  },
  {
    period: "2024–25",
    role: "Freelance Developer",
    org: "Vicinix",
    description: "Full-stack web projects for clients across industries",
    accent: "#f97316",
  },
];

export default function Timeline() {
  return (
    <section id="experience" className="relative py-32 px-6 lg:px-20 bg-[#0e0e0e]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="container mx-auto max-w-4xl">
        <SectionHeading label="// experience" title="The Journey So Far" />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/40 via-foreground/10 to-transparent" />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={`${item.org}-${i}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pl-8 md:pl-10 group"
              >
                {/* Dot */}
                <div
                  className="absolute left-0 top-1.5 w-[15px] h-[15px] md:w-[19px] md:h-[19px] rounded-full border-2 transition-all duration-500"
                  style={{
                    borderColor: item.accent,
                    backgroundColor: item.active ? item.accent : "transparent",
                    boxShadow: item.active ? `0 0 12px ${item.accent}50` : "none",
                  }}
                />

                {/* Period badge */}
                <span
                  className="inline-block font-mono text-[10px] tracking-[0.15em] uppercase mb-1 px-2 py-0.5 rounded-sm"
                  style={{ color: item.accent, backgroundColor: `${item.accent}10` }}
                >
                  {item.period}
                </span>

                {/* Content */}
                <h3 className="text-lg md:text-xl font-semibold text-foreground mt-1">
                  <span className="text-foreground/50 font-normal">{item.role}</span>{" "}
                  <span className="text-foreground/30">@</span> {item.org}
                </h3>
                <p className="text-foreground/40 text-sm mt-1 font-mono">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
