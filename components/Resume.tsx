"use client";

import { motion, useInView } from "framer-motion";
import { Download } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { resumeData } from "@/data/resume";
import { useRef } from "react";

export default function Resume() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="resume" className="relative py-32 px-6 lg:px-20 bg-background overflow-hidden" ref={containerRef}>
      {/* Subtle top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      
      {/* Ambient glowing orb */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-40 right-20 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none"
      />

      <div className="container mx-auto max-w-6xl">
        <SectionHeading label="// resume" title="My Resume" />

        <div className="grid lg:grid-cols-12 gap-12 relative">
          
          {/* Main Experience Column (8 cols on lg) */}
          <div className="lg:col-span-8">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-mono text-xs tracking-[0.15em] uppercase text-foreground/40 mb-8"
            >
              Experience
            </motion.h3>

            <div className="relative border-l border-white/10 pl-8 ml-4 space-y-12">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
              >
                {resumeData.experience.map((exp, index) => (
                  <motion.div key={index} variants={itemVariant} className="relative group mb-12 last:mb-0">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-accent transition-transform duration-300 group-hover:scale-150 group-hover:bg-accent/20" />
                    
                    <div className="bg-[#131313] p-6 rounded-sm border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-foreground">{exp.title}</h4>
                          <span className="text-accent font-medium">{exp.company}</span>
                        </div>
                        <div className="text-right">
                          <span className="block font-mono text-sm text-foreground/50">{exp.period}</span>
                          <span className="block font-mono text-xs text-foreground/40">{exp.location}</span>
                        </div>
                      </div>
                      
                      <ul className="space-y-2 mt-4">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-2 text-foreground/70 text-sm leading-relaxed">
                            <span className="text-highlight mt-1 opacity-70">▸</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Sidebar Column (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-16">
            
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-foreground/40 mb-6">
                Education
              </h3>
              <div className="space-y-6">
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="bg-[#131313] p-5 rounded-sm border border-white/5 border-l-2 border-l-highlight">
                    <h4 className="font-bold text-foreground mb-1">{edu.degree}</h4>
                    <div className="text-highlight text-sm mb-2">{edu.institution}</div>
                    <div className="font-mono text-xs text-foreground/50 mb-3">{edu.period}</div>
                    <p className="text-sm text-foreground/70 leading-relaxed">{edu.details}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Core Skills Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-mono text-xs tracking-[0.15em] uppercase text-foreground/40 mb-6">
                Core Toolkit
              </h3>
              <div className="space-y-5">
                {[
                  { label: "Frontend", items: resumeData.skills.frameworks.slice(0, 3).join(", ") + "..." },
                  { label: "Backend", items: "Supabase, PostgreSQL, Node.js" },
                  { label: "Languages", items: resumeData.skills.languages.join(", ") }
                ].map((skillGrp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-foreground/70">{skillGrp.label}</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + (idx * 0.2), ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-accent to-[#ff9153]" 
                      />
                    </div>
                    <div className="text-xs text-foreground/50 mt-2">{skillGrp.items}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
        </div>

        {/* Fixed Download Button (Corner of section) */}
        <div className="fixed bottom-8 right-8 z-40 hidden lg:block">
           <motion.a
            href={resumeData.resumePdfPath}
            download="VinayakJain_Resume.pdf"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center justify-center w-14 h-14 bg-[#131313]/80 backdrop-blur-md border border-accent/30 rounded-full shadow-lg transition-colors hover:bg-accent/10"
          >
            {/* Pulsing ring */}
            <motion.div 
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full border border-accent/50 group-hover:border-accent"
            />
            <Download size={20} className="text-accent group-hover:text-[#ff9153]" />
          </motion.a>
        </div>
        
        {/* Mobile Download Button */}
        <div className="mt-12 flex justify-center lg:hidden">
          <a 
            href={resumeData.resumePdfPath}
            download="VinayakJain_Resume.pdf"
            className="flex items-center gap-2 px-6 py-3 bg-accent/10 border border-accent/30 rounded-sm text-accent font-mono text-sm tracking-wider uppercase transition-all active:scale-95"
          >
            <Download size={16} />
            Download PDF
          </a>
        </div>

      </div>
    </section>
  );
}
