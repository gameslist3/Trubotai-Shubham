import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Toaster } from "react-hot-toast";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TruBotAI - Digital Assets Marketplace & Lifetime Software Deals",
  description:
    "Get access to investor databases, startup templates, PRDs, UI systems, lead databases, and lifetime software products. Premium digital assets marketplace.",
  keywords: [
    "digital assets",
    "marketplace",
    "lifetime deals",
    "startup templates",
    "investor database",
    "business intelligence",
    "TruBotAI",
    "TruERP",
    "TruCRM",
    "TruLead",
    "TruSocial",
  ],
  openGraph: {
    title: "TruBotAI - Digital Assets Marketplace & Lifetime Software",
    description:
      "Enterprise-grade digital assets marketplace and lifetime software solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#18352b]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              color: "#18352b",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            },
          }}
        />
      </body>
    </html>
  );
}
