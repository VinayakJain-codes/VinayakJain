import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vinayak Jain | Full-Stack Developer & Builder",
  description:
    "Portfolio of Vinayak Jain — Full-Stack Developer, Startup Builder, and Creator. Founder of Vicinix. Building Marketnera. Based in Meerut, India.",
  keywords: [
    "Vinayak Jain",
    "Full-Stack Developer",
    "Next.js Developer",
    "Vicinix",
    "Marketnera",
    "Portfolio",
    "React Developer",
    "Supabase",
    "India",
  ],
  authors: [{ name: "Vinayak Jain" }],
  openGraph: {
    title: "Vinayak Jain | Full-Stack Developer & Builder",
    description:
      "Builder. Developer. Creator. Full-stack developer building products that matter.",
    type: "website",
    locale: "en_IN",
    siteName: "Vinayak Jain Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinayak Jain | Full-Stack Developer",
    description: "Builder. Developer. Creator.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased dark scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
