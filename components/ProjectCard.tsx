"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const shouldReduce = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: shouldReduce ? 0 : -6, transition: { duration: 0.2 } }}
      className="group relative flex flex-col h-full rounded-sm bg-[#131313] overflow-hidden transition-all duration-500 hover:bg-[#1a1919]"
    >
      {/* Left accent line on hover */}
      <div
        className="absolute top-0 left-0 w-[2px] h-0 group-hover:h-full transition-all duration-500"
        style={{ backgroundColor: project.statusColor }}
      />

      {/* Ambient glow on hover */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700"
        style={{ backgroundColor: project.statusColor }}
      />

      <div className="relative p-6 md:p-8 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-foreground/40 block mb-2">
              {project.tag}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-foreground transition-colors">
              {project.title}
            </h3>
          </div>

          {/* Status badge */}
          <span
            className="shrink-0 ml-4 px-3 py-1 rounded-full font-mono text-[10px] tracking-wider uppercase border whitespace-nowrap"
            style={{
              borderColor: `${project.statusColor}40`,
              color: project.statusColor,
              backgroundColor: `${project.statusColor}10`,
              boxShadow: `0 0 12px ${project.statusColor}15`,
            }}
          >
            {project.statusLabel}
          </span>
        </div>

        {/* Description */}
        <p className="text-foreground/50 text-sm leading-relaxed mb-6 flex-1">
          {project.description}
        </p>

        {/* Note */}
        {project.note && (
          <p className="text-foreground/30 font-mono text-xs italic mb-4">
            &quot;{project.note}&quot;
          </p>
        )}

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 rounded-sm bg-[#1a1919] group-hover:bg-[#201f1f] border border-white/5 font-mono text-[10px] tracking-wider text-foreground/40 transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          {project.builtBy && (
            <span className="font-mono text-[10px] tracking-wider text-foreground/30 uppercase">
              Built by {project.builtBy}
            </span>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-accent/70 hover:text-accent transition-colors group/link"
            >
              {project.linkLabel}
              <ExternalLink size={12} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
