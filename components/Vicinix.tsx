"use client";

import { motion } from "framer-motion";
import { Code2, LayoutDashboard, Rocket, Server, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const services = [
  { icon: Code2, label: "Web Apps", description: "Full-stack Next.js applications built for scale" },
  { icon: LayoutDashboard, label: "Dashboards", description: "Data-rich interfaces with real-time capabilities" },
  { icon: Server, label: "Full-Stack Builds", description: "End-to-end from database schema to deployment" },
  { icon: Rocket, label: "Startup MVPs", description: "Ship fast, validate faster — from idea to launch" },
];

export default function Vicinix() {
  return (
    <section id="vicinix" className="relative py-32 px-6 lg:px-20 bg-[#0e0e0e]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          label="// freelance"
          title="Vicinix"
          description="My freelance development brand — turning ideas into shipped products."
        />

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {services.map((service, i) => (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group p-6 rounded-sm bg-[#131313] hover:bg-[#1a1919] transition-all duration-500 cursor-default"
            >
              <service.icon
                size={24}
                className="text-accent/60 group-hover:text-accent transition-colors duration-300 mb-4"
              />
              <h3 className="text-foreground font-semibold text-sm mb-2">{service.label}</h3>
              <p className="text-foreground/40 font-mono text-xs leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Client callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative p-6 md:p-8 rounded-sm bg-[#131313] border border-white/5 overflow-hidden"
        >
          {/* Subtle diagonal gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-foreground/30 mb-2">
                Past Client Work
              </p>
              <p className="text-foreground/70 text-sm leading-relaxed max-w-lg">
                Delivered the <span className="text-foreground font-medium">Symax Governance Dashboard</span> for
                Symax Group — a multi-entity compliance system spanning UAE, UK, and EU jurisdictions with 13 data
                sheets, audit logging, and RBAC.
              </p>
            </div>

            <a
              href="#contact"
              className="group/cta inline-flex items-center gap-2 px-6 py-3 bg-accent/10 border border-accent/20 rounded-sm font-mono text-xs tracking-wider uppercase text-accent hover:bg-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] whitespace-nowrap shrink-0"
            >
              Have a project? Let&apos;s talk
              <ArrowRight size={14} className="transition-transform group-hover/cta:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
