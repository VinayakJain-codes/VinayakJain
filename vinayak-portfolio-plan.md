# 🧑‍💻 Vinayak Jain — Portfolio Website Plan

**Brand**: Vicinix | **Role**: Full-Stack Developer · Builder · Creator  
**Tech Stack Recommended**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion  
**Deployment**: Vercel (free tier, global CDN — accessible everywhere)

---

## 🎨 Design Direction

| Property | Decision |
|---|---|
| **Theme** | Dark base (`#0a0a0a`) with orange accent (`#f97316`) and green pop (`#13ec5b`) |
| **Aesthetic** | Developer-meets-creator — bold, editorial, techy but human |
| **Typography** | Display: `Syne` or `Space Grotesk` · Body: `DM Mono` or `Geist Mono` |
| **Motion** | Subtle scroll reveals, cursor glow, section transitions via Framer Motion |
| **Vibe** | A builder's journal — not a generic portfolio template |

---

## 📐 Site Architecture (Pages & Sections)

### 1. `/` — Home / Hero
- **Full-screen hero** with your name: **Vinayak Jain**
- Tagline: *"Builder. Developer. Creator."* (or your own words)
- Animated typewriter for rotating roles: `Full-Stack Dev` → `Solo Builder` → `Content Creator`
- CTA buttons: `View Work` · `Contact Me`
- Subtle animated background (grid or noise texture)
- Social pill row: LinkedIn · GitHub · Email

---

### 2. `/` → About Section (scroll)
- Short sharp bio (3–4 lines) — who you are, what you build, where you're from (Meerut, UP)
- Mention: BCA student · Vicinix founder · VIC member
- **Tech Stack chips**: Next.js, Supabase, TypeScript, Tailwind, Python, Framer Motion, Recharts
- Photo (optional but adds trust)
- Small callout: *"Currently building Marketnera · Open to freelance projects"*

---

### 3. `/works` or scroll → Works Section
This is the **centerpiece** of the site. Show 4 projects as cards.

#### Card 1 — Marketnera
- **Tag**: Startup · Hyperlocal Commerce
- **Description**: Connecting local shopkeepers with nearby customers across Tier 2/3 India
- **Stack**: Next.js · Supabase/PostGIS · Razorpay
- **Status badge**: 🟡 In Development
- **Links**: Website / Coming Soon

#### Card 2 — Symax Governance Dashboard
- **Tag**: Client Project · Corporate Governance
- **Description**: Full-stack governance dashboard for Symax Group (UAE/UK/EU) with audit logging, RBAC, Excel-to-Supabase migration, and 13 data sheets
- **Stack**: Next.js 14 · Supabase · Recharts · Tailwind
- **Status badge**: ✅ Delivered
- **Built by**: Vicinix

#### Card 3 — Outfevibe (CTO)
- **Tag**: Startup · AI Fashion SaaS
- **Description**: AI-powered outfit scoring and styling SaaS for the Indian market. Built the full initial codebase as CTO.
- **Stack**: Next.js · Supabase · Persona Engine
- **Status badge**: 🔵 Past Role
- **Note**: *"CTO & initial codebase builder — no longer with company"*
- **Link**: outfevibe.com

#### Card 4 — Presence Guard
- **Tag**: Open Source · Python App
- **Description**: Solo-built Python webcam monitoring tool with drowsiness detection (PERCLOS), gaze tracking, posture analysis, rPPG heart rate estimation, and intruder detection. ~1,572 lines.
- **Stack**: Python · OpenCV · NumPy
- **Status badge**: ✅ Public
- **Link**: GitHub repo

---

### 4. Freelance / Vicinix Section (scroll)
- Short section introducing **Vicinix** — your freelance dev brand
- Services offered: Web Apps, Dashboards, Full-Stack Builds, Startup MVPs
- Past client work callout (Symax)
- CTA: *"Have a project in mind? Let's talk."* → links to contact

---

### 5. `/` → Experience / Timeline Section
A minimal vertical timeline:

```
2024–25   CTO @ Outfevibe          AI Fashion SaaS, built full codebase
2024–25   Freelance @ Vicinix      Full-stack web projects for clients
2025      Symax Dashboard           Delivered for Symax Group via Vicinix
2025      VIC Member                Vidya University Innovation Centre, Meerut
Ongoing   Marketnera                Building India's hyperlocal commerce platform
```

---

### 6. `/` → Skills Section
Visual grid or tag cloud:

**Languages**: TypeScript, Python, JavaScript, SQL  
**Frontend**: Next.js 14, React, Tailwind CSS, Framer Motion, Recharts  
**Backend/DB**: Supabase, PostgreSQL, RLS, PostGIS, Realtime  
**Tools**: Git, GitHub, Razorpay, OpenCV, pptxgenjs, Vercel  
**Other**: Video Editing, Content Creation, Event Anchoring

---

### 7. Contact Section
- Heading: *"Let's Build Something"*
- Email: vinayakjain2110@gmail.com (click to copy or mailto)
- LinkedIn: link with icon
- GitHub: VinayakJain-codes
- Optional: simple contact form (EmailJS or Resend — no backend needed)
- Vicinix Razorpay link (for quick payment — optional)

---

## 📱 Mobile Responsiveness Plan

| Breakpoint | Behaviour |
|---|---|
| `< 640px` (mobile) | Single column, stacked cards, hamburger nav, full-width hero text |
| `640–1024px` (tablet) | 2-column grid for project cards |
| `> 1024px` (desktop) | 3-column grid, side-by-side hero, sticky nav |

**Key mobile rules:**
- No horizontal scroll anywhere
- Touch-friendly tap targets (min 44px)
- Hero font scales with `clamp()` — readable on 375px screens
- Framer Motion animations reduced on `prefers-reduced-motion`
- Nav collapses to hamburger drawer on mobile
- Images use `next/image` with lazy loading for fast mobile load

---

## 🗂 Folder Structure (Next.js 14 App Router)

```
vinayak-portfolio/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Home (all sections)
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Works.tsx
│   ├── ProjectCard.tsx
│   ├── Vicinix.tsx
│   ├── Timeline.tsx
│   ├── Skills.tsx
│   └── Contact.tsx
├── data/
│   └── projects.ts         # Project data array (easy to update)
├── public/
│   ├── og-image.png        # For social sharing preview
│   └── assets/
├── tailwind.config.ts
└── next.config.ts
```

---

## ⚡ Performance & SEO

- **Metadata**: OG image, title, description for each page (for LinkedIn/WhatsApp previews)
- **Domain**: Buy `vinayakjain.dev` or use `vicinix.in/vinayak` — looks more professional than Vercel subdomain
- **Analytics**: Add Vercel Analytics (free) or Plausible
- **Lighthouse target**: 90+ on Performance, Accessibility, SEO
- **Font loading**: Use `next/font/google` to avoid layout shift

---

## 🚀 Launch Checklist

- [ ] Hero section live with name + socials
- [ ] All 4 project cards populated
- [ ] Mobile nav working
- [ ] Contact section functional
- [ ] OG image set (for LinkedIn share preview)
- [ ] Custom domain connected
- [ ] Deployed on Vercel
- [ ] Shared on LinkedIn + VIC community

---

## 🔮 Phase 2 (Later Additions)

- **Blog/Notes** — Dev logs, build journals (great for SEO + personal brand)
- **Marketnera dedicated page** — Full pitch-style landing within portfolio
- **Testimonial from Symax** — If client permits, a short quote
- **Resume download button** — PDF export
- **Dark/Light toggle** — Accessible preference

---

*Built under Vicinix · Vinayak Jain · Meerut, UP*
