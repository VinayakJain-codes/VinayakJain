export interface Project {
  id: string;
  title: string;
  tag: string;
  description: string;
  stack: string[];
  status: "delivered" | "in-development" | "past-role" | "public";
  statusLabel: string;
  statusColor: string;
  builtBy?: string;
  note?: string;
  link?: string;
  linkLabel?: string;
}

export const projects: Project[] = [
  {
    id: "marketnera",
    title: "Marketnera",
    tag: "Startup · Hyperlocal Commerce",
    description:
      "Connecting local shopkeepers with nearby customers across Tier 2/3 India. Building the commerce layer small towns deserve.",
    stack: ["Next.js", "Supabase", "PostGIS", "Razorpay"],
    status: "in-development",
    statusLabel: "In Development",
    statusColor: "#eab308",
    link: "#",
    linkLabel: "Coming Soon",
  },
  {
    id: "symax",
    title: "Symax Governance Dashboard",
    tag: "Client Project · Corporate Governance",
    description:
      "Full-stack governance dashboard for Symax Group (UAE/UK/EU) with audit logging, RBAC, Excel-to-Supabase migration, and 13 data sheets.",
    stack: ["Next.js 14", "Supabase", "Recharts", "Tailwind"],
    status: "delivered",
    statusLabel: "Delivered",
    statusColor: "#13ec5b",
    builtBy: "Vicinix",
  },
  {
    id: "outfevibe",
    title: "Outfevibe",
    tag: "Startup · AI Fashion SaaS",
    description:
      "AI-powered outfit scoring and styling SaaS for the Indian market. Built the full initial codebase as CTO.",
    stack: ["Next.js", "Supabase", "Persona Engine"],
    status: "past-role",
    statusLabel: "Past Role",
    statusColor: "#3b82f6",
    note: "CTO & initial codebase builder — no longer with company",
    link: "https://outfevibe.com",
    linkLabel: "outfevibe.com",
  },
  {
    id: "presence-guard",
    title: "Presence Guard",
    tag: "Open Source · Python App",
    description:
      "Solo-built webcam monitoring tool with drowsiness detection (PERCLOS), gaze tracking, posture analysis, rPPG heart rate estimation, and intruder detection. ~1,572 lines.",
    stack: ["Python", "OpenCV", "NumPy"],
    status: "public",
    statusLabel: "Public",
    statusColor: "#13ec5b",
    link: "https://github.com/VinayakJain-codes",
    linkLabel: "GitHub",
  },
];
