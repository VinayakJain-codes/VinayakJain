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
      "Hyperlocal marketplace for Tier 2/3 India — lets shopkeepers list inventory and get discovered by nearby customers via PostGIS radius queries. Solving the lack of digital presence for local shops.",
    stack: ["Next.js 14", "Supabase", "PostGIS", "Razorpay"],
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
      "Replaced a 12-sheet Excel workbook with a full-stack web system covering filing status, document control, and approval workflows across 3 jurisdictions (UAE/UK/EU).",
    stack: ["Next.js 14", "Supabase", "Recharts", "Tailwind"],
    status: "delivered",
    statusLabel: "Delivered (2026)",
    statusColor: "#13ec5b",
    builtBy: "Vicinix",
  },
  {
    id: "outfevibe",
    title: "Outfevibe",
    tag: "Startup · AI Fashion SaaS",
    description:
      "AI-powered outfit scoring and styling SaaS for the Indian market. Built the entire codebase from zero as the sole Founding Engineer.",
    stack: ["Next.js", "Supabase", "Persona Engine"],
    status: "past-role",
    statusLabel: "Past Role (2026)",
    statusColor: "#3b82f6",
    note: "Sole engineer on initial build — no longer with company",
    link: "https://outfevibe.com",
    linkLabel: "outfevibe.com",
  },
  {
    id: "presence-guard",
    title: "Presence Guard",
    tag: "Open Source · Python App",
    description:
      "~1,572-line Python webcam monitoring tool using OpenCV for drowsiness detection, gaze tracking, posture analysis, and heart rate estimation via rPPG.",
    stack: ["Python", "OpenCV", "NumPy"],
    status: "public",
    statusLabel: "Public (2026)",
    statusColor: "#13ec5b",
    link: "https://github.com/VinayakJain-codes",
    linkLabel: "GitHub",
  },
];
