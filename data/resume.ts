export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface Skills {
  languages: string[];
  frameworks: string[];
  tools: string[];
  other: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  experience: Experience[];
  education: Education[];
  skills: Skills;
  certifications: Certification[];
  resumePdfPath: string;
}

export const resumeData: ResumeData = {
  experience: [
    {
      title: "Founder",
      company: "Marketnera · Vicinix",
      period: "2026 – Present",
      location: "Meerut, UP, India",
      bullets: [
        "Hyperlocal commerce platform for Tier 2/3 India — MVP in development.",
        "Designed data model from scratch: PostGIS geolocation queries to surface nearby shops, per-shop inventory tables, and order state machine.",
        "Built shopkeeper dashboard and customer-facing discovery + cart flow — both mobile-first in Next.js 14.",
        "Integrated Razorpay for payments; enforced per-vendor data isolation via Supabase RLS policies.",
      ],
    },
    {
      title: "Freelance Developer",
      company: "Vicinix",
      period: "2025 – Present",
      location: "Remote",
      bullets: [
        "Sole developer on Symax Governance Dashboard (delivered 2026) — replaced a 12-sheet Excel workbook with a Supabase-backed system covering 13 compliance data sheets.",
        "Wrote Postgres triggers for field-level audit logging on every mutation; implemented soft deletes to preserve full history.",
        "Built RBAC from scratch: Super Admin, Admin, and Viewer roles enforced at both API middleware and RLS level.",
        "Managed full project lifecycle independently: requirements, development, security audit, and handover.",
      ],
    },
    {
      title: "Founding Engineer (CTO role)",
      company: "Outfevibe · AI Fashion SaaS",
      period: "2026",
      location: "India",
      bullets: [
        "Sole engineer on initial build of AI-powered outfit scoring and styling SaaS.",
        "Built the entire codebase from zero: Next.js frontend, Supabase backend, and a persona engine mapping style preferences.",
        "Implemented user onboarding, outfit upload + scoring interface, and recommendation feed.",
      ],
    },
    {
      title: "Member",
      company: "Vidya University Innovation Centre (VIC)",
      period: "2025 – Present",
      location: "Meerut, UP",
      bullets: [
        "Anchored and emceed college-level tech events.",
        "Produced content for VIC Podcast (Radio FM 88.8).",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Vidya University",
      period: "2025 – Present",
      details: "Active member of Vidya University Innovation Centre (VIC). Runs Vicinix and Marketnera alongside studies.",
    },
  ],
  skills: {
    languages: ["TypeScript", "JavaScript", "Python", "SQL"],
    frameworks: [
      "Next.js 14",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Recharts",
      "Three.js",
    ],
    tools: [
      "Supabase (Auth, RLS, Realtime, Edge Functions)",
      "PostgreSQL",
      "PostGIS",
      "REST APIs",
      "Git",
      "GitHub",
      "Vercel",
      "Razorpay",
      "OpenCV",
      "pptxgenjs",
    ],
    other: ["Video Editing", "Content Creation", "Event Anchoring / Emceeing"],
  },
  certifications: [],
  resumePdfPath: "/VinayakJain_Resume.pdf",
};
