"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const email = "Vinayak@vicinix.co.in";

function LinkedinIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/vinayak-jain-1786b9357/",
    icon: LinkedinIcon,
    color: "#0a66c2",
  },
  {
    label: "GitHub",
    href: "https://github.com/VinayakJain-codes",
    icon: GithubIcon,
    color: "#ffffff",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(
    "Project Inquiry"
  )}&body=${encodeURIComponent(
    `Hi Vinayak,\n\nI'm interested in working with you on a project.\n\nProject Details:\n- Type: \n- Budget: \n- Timeline: \n\nLooking forward to hearing from you!`
  )}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-32 px-6 lg:px-20 bg-background">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="container mx-auto max-w-3xl text-center">
        <SectionHeading label="// contact" title="Let's Build Something" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-foreground/50 font-mono text-sm max-w-md mx-auto mb-12"
        >
          Got a project in mind, want to collaborate, or just want to say hi? I&apos;m always open to
          conversations.
        </motion.p>

        {/* Email card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mx-auto max-w-md p-6 rounded-sm bg-[#131313] border border-white/5 mb-10 group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] to-transparent rounded-sm pointer-events-none" />

          <div className="relative flex items-center justify-between gap-4">
            <a
              href={mailtoHref}
              className="flex items-center gap-3 min-w-0 group/mail"
            >
              <Mail size={18} className="text-accent shrink-0 group-hover/mail:scale-110 transition-transform" />
              <span className="text-foreground/80 group-hover/mail:text-accent font-mono text-sm transition-colors truncate">
                {email}
              </span>
            </a>
            <button
              onClick={handleCopy}
              className="shrink-0 p-2 rounded-sm hover:bg-white/5 text-foreground/40 hover:text-foreground transition-all"
              aria-label="Copy email"
            >
              {copied ? (
                <Check size={16} className="text-highlight" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
        </motion.div>

        {/* Social pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-3"
        >
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/social inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
            >
              <social.icon size={16} className="text-foreground/60 group-hover/social:text-foreground transition-colors" />
              <span className="font-mono text-xs tracking-wider text-foreground/60 group-hover/social:text-foreground transition-colors">
                {social.label}
              </span>
              <ArrowUpRight size={12} className="text-foreground/30 group-hover/social:text-foreground/60 transition-all group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-32 pt-8 border-t border-white/5 text-center"
      >
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-foreground/20">
          Built under Vicinix · Vinayak Jain · Meerut, UP
        </p>
      </motion.footer>
    </section>
  );
}
