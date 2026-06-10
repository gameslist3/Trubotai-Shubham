"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, ArrowRight, Coins, Mail, Cloud, Star, Users, FileText, Building2, Palette, Presentation, Calculator, Database, Rocket } from "lucide-react";

const productData: Record<string, {
  name: string;
  description: string;
  longDescription: string;
  price: number;
  items: string;
  icon: any;
  features: string[];
  deliverables: string[];
  color: string;
}> = {
  "investor-database": {
    name: "Investor Database",
    description: "12,000+ verified investors with direct contacts",
    longDescription: "Access our comprehensive database of 12,000+ verified angel investors, venture capital firms, and investment funds. Perfect for startups raising capital.",
    price: 199,
    items: "12,000+ Investors",
    icon: Users,
    features: ["Direct email contacts", "Investment preferences", "Portfolio companies", "Check size ranges", "Geographic focus", "Contacted by stage"],
    deliverables: ["Excel spreadsheet", "CSV export", "CRM-ready format"],
    color: "from-purple-500/10 to-purple-600/5",
  },
  "finance-templates": {
    name: "Finance Templates",
    description: "Financial models, budgets, and forecasting templates",
    longDescription: "Professional-grade financial templates for startups and businesses. Includes P&L statements, cash flow projections, and valuation models.",
    price: 49,
    items: "15 Templates",
    icon: Calculator,
    features: ["P&L statements", "Cash flow projections", "Valuation models", "Budget templates", "Financial ratios", "Investor-ready format"],
    deliverables: ["Editable Excel files", "Google Sheets versions", "Documentation guide"],
    color: "from-blue-500/10 to-blue-600/5",
  },
  "grant-database": {
    name: "Grant Database",
    description: "500+ active grant opportunities",
    longDescription: "Discover 500+ active business grants, government funding programs, and innovation awards. Updated quarterly with new opportunities.",
    price: 49,
    items: "500+ Grants",
    icon: Database,
    features: ["Grant amounts & eligibility", "Application deadlines", "Government & private grants", "Industry-specific filters", "Success tips", "Application templates"],
    deliverables: ["Searchable database", "Grant tracker template", "Application checklist"],
    color: "from-green-500/10 to-green-600/5",
  },
  "accelerator-database": {
    name: "Accelerator Database",
    description: "Top startup accelerators worldwide",
    longDescription: "Curated list of 300+ top startup accelerators and incubators worldwide. Includes program details, equity requirements, and application links.",
    price: 49,
    items: "300 Accelerators",
    icon: Rocket,
    features: ["Program durations", "Equity requirements", "Funding amounts", "Application windows", "Alumni success stories", "Industry focus areas"],
    deliverables: ["Excel database", "Program comparison sheet", "Application calendar"],
    color: "from-orange-500/10 to-orange-600/5",
  },
  "1m-leads": {
    name: "1M B2B Leads",
    description: "1 million verified B2B leads",
    longDescription: "Access 1 million+ verified B2B leads with direct contact information. Perfect for sales teams, marketers, and growth hackers.",
    price: 49,
    items: "1M+ Leads",
    icon: Users,
    features: ["Verified email addresses", "Company information", "Industry classification", "Decision maker titles", "Company size data", "Location data"],
    deliverables: ["CSV file", "CRM-ready format", "Data dictionary"],
    color: "from-pink-500/10 to-pink-600/5",
  },
  "prds": {
    name: "Product PRDs",
    description: "Professional product requirement documents",
    longDescription: "200+ professionally crafted product requirement document (PRD) templates covering various product types and industries.",
    price: 19,
    items: "200 PRDs",
    icon: FileText,
    features: ["Feature specifications", "User stories", "Acceptance criteria", "Technical requirements", "UI/UX requirements", "Priority matrices"],
    deliverables: ["Editable documents", "PRD templates", "Best practices guide"],
    color: "from-teal-500/10 to-teal-600/5",
  },
  "prd-bundle": {
    name: "PRD Bundle",
    description: "5 complete PRD template collections in one",
    longDescription: "The ultimate PRD bundle with 5 complete collections. Save 50% compared to buying individually.",
    price: 49,
    items: "5 Collections",
    icon: FileText,
    features: ["SaaS PRDs", "Mobile app PRDs", "E-commerce PRDs", "Enterprise PRDs", "API PRDs", "All individual features included"],
    deliverables: ["5 complete collections", "Bonus: Roadmap templates", "Priority support"],
    color: "from-cyan-500/10 to-cyan-600/5",
  },
  "architecture-docs": {
    name: "Architecture Docs",
    description: "System architecture documentation templates",
    longDescription: "150+ system architecture documentation templates covering microservices, cloud infrastructure, and enterprise systems.",
    price: 19,
    items: "150 Docs",
    icon: Building2,
    features: ["System diagrams", "Architecture decisions", "Deployment guides", "Security documentation", "Integration specs", "Performance benchmarks"],
    deliverables: ["Editable documents", "Diagram templates", "Architecture patterns"],
    color: "from-indigo-500/10 to-indigo-600/5",
  },
  "architecture-bundle": {
    name: "Architecture Bundle",
    description: "10 architecture doc collections in one",
    longDescription: "Complete architecture documentation bundle with 10 collections. Save 50% compared to individual purchases.",
    price: 49,
    items: "10 Collections",
    icon: Building2,
    features: ["Cloud architecture", "Microservices", "Enterprise systems", "Security architecture", "All individual features", "Bonus: Migration guides"],
    deliverables: ["10 complete collections", "Architecture review checklist", "Priority support"],
    color: "from-violet-500/10 to-violet-600/5",
  },
  "ui-ux-templates": {
    name: "UI/UX Templates",
    description: "Modern UI/UX design templates",
    longDescription: "100+ modern UI/UX design templates for web and mobile applications. Includes wireframes, prototypes, and design systems.",
    price: 19,
    items: "100 Templates",
    icon: Palette,
    features: ["Wireframe kits", "Prototype templates", "Design system components", "Mobile & web layouts", "Icon sets", "Typography guides"],
    deliverables: ["Figma files", "Sketch files", "Design system documentation"],
    color: "from-rose-500/10 to-rose-600/5",
  },
  "ui-ux-bundle": {
    name: "UI/UX Bundle",
    description: "8 UI/UX template collections in one",
    longDescription: "Complete UI/UX template bundle with 8 collections. Save 50% compared to individual purchases.",
    price: 49,
    items: "8 Collections",
    icon: Palette,
    features: ["Dashboard templates", "Landing page kits", "Mobile app templates", "E-commerce designs", "All individual features", "Bonus: Animation library"],
    deliverables: ["8 complete collections", "Design token system", "Priority support"],
    color: "from-fuchsia-500/10 to-fuchsia-600/5",
  },
  "pitch-decks": {
    name: "Pitch Deck Templates",
    description: "Investor-ready pitch deck templates",
    longDescription: "50+ investor-ready pitch deck templates designed to help you craft compelling presentations that secure funding.",
    price: 19,
    items: "50 Templates",
    icon: Presentation,
    features: ["Slide-by-slide guides", "Storytelling frameworks", "Financial slide templates", "Competitive analysis slides", "Team slide designs", "Pitch script examples"],
    deliverables: ["PowerPoint files", "Google Slides versions", "Pitch script guide"],
    color: "from-amber-500/10 to-amber-600/5",
  },
  "pitch-deck-bundle": {
    name: "Pitch Deck Bundle",
    description: "6 pitch deck collections in one",
    longDescription: "Complete pitch deck bundle with 6 collections covering every funding stage. Save 50% compared to individual purchases.",
    price: 49,
    items: "6 Collections",
    icon: Presentation,
    features: ["Pre-seed decks", "Seed round decks", "Series A decks", "Industry-specific decks", "All individual features", "Bonus: Investor tracker"],
    deliverables: ["6 complete collections", "Investor outreach templates", "Priority support"],
    color: "from-yellow-500/10 to-yellow-600/5",
  },
};

const fallback = {
  name: "Digital Asset",
  description: "Premium digital asset",
  longDescription: "High-quality premium digital asset for your business needs.",
  price: 49,
  items: "Premium Asset",
  icon: FileText,
  features: ["Instant delivery", "Lifetime access", "SharePoint integration"],
  deliverables: ["Digital file", "Documentation"],
  color: "from-blue-500/10 to-blue-600/5",
};

function getIconBg(color: string): string {
  const map: Record<string, string> = {
    purple: 'bg-purple-100', green: 'bg-green-100', orange: 'bg-orange-100',
    pink: 'bg-pink-100', teal: 'bg-teal-100', cyan: 'bg-cyan-100',
    indigo: 'bg-indigo-100', violet: 'bg-violet-100', rose: 'bg-rose-100',
    fuchsia: 'bg-fuchsia-100', amber: 'bg-amber-100', yellow: 'bg-yellow-100',
    blue: 'bg-blue-100', red: 'bg-red-100', lime: 'bg-lime-100',
    emerald: 'bg-emerald-100', sky: 'bg-sky-100', slate: 'bg-slate-100',
  };
  for (const [key, val] of Object.entries(map)) {
    if (color.includes(key)) return val;
  }
  return 'bg-blue-100';
}

function getIconColor(color: string): string {
  const map: Record<string, string> = {
    purple: 'text-purple-600', green: 'text-green-600', orange: 'text-orange-600',
    pink: 'text-pink-600', teal: 'text-teal-600', cyan: 'text-cyan-600',
    indigo: 'text-indigo-600', violet: 'text-violet-600', rose: 'text-rose-600',
    fuchsia: 'text-fuchsia-600', amber: 'text-amber-600', yellow: 'text-yellow-600',
    blue: 'text-blue-600', red: 'text-red-600', lime: 'text-lime-600',
    emerald: 'text-emerald-600', sky: 'text-sky-600', slate: 'text-slate-600',
  };
  for (const [key, val] of Object.entries(map)) {
    if (color.includes(key)) return val;
  }
  return 'text-blue-600';
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const product = productData[slug] || { ...fallback, name: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) };
  const Icon = product.icon;

  const iconBg = getIconBg(product.color);
  const iconColor = getIconColor(product.color);

  return (
    <section className="relative min-h-screen pt-32 pb-16">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white to-white" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="mx-auto w-full max-w-[1200px] px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/marketplace" className="hover:text-blue-600 transition-colors">Marketplace</Link>
            <span>/</span>
            <span className="text-[#18352b]">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left - Product Details */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-gray-200 rounded-2xl p-8">
                {/* Header */}
                <div className="flex items-start gap-5 mb-8">
                  <div className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center shadow-sm flex-shrink-0`}>
                    <Icon size={30} className={iconColor} />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-[#18352b] mb-2">{product.name}</h1>
                    <p className="text-gray-500 text-lg">{product.description}</p>
                  </div>
                </div>

                {/* Pricing CTA */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-700 mb-1">Price</p>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-blue-600">${product.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <Link href={`/verify?product=${slug}&price=${product.price}`}>
                      <Button variant="primary" size="xl" className="rounded-xl shadow-lg shadow-blue-600/25">
                        Buy Now
                        <ArrowRight size={20} />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-[#18352b] mb-4">About This Asset</h2>
                  <p className="text-gray-600 leading-relaxed">{product.longDescription}</p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-[#18352b] mb-4">Key Features</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {product.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 text-sm text-gray-600">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <h2 className="text-xl font-semibold text-[#18352b] mb-4">What You&apos;ll Get</h2>
                  <div className="flex flex-wrap gap-2">
                    {product.deliverables.map((d) => (
                      <span key={d} className="px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-[#18352b] mb-5">Purchase Includes</h3>
                
                <ul className="space-y-3 mb-6">
                  {[
                    "Instant digital delivery",
                    "Lifetime access & updates",
                    "SharePoint integration",
                    "24/7 customer support",
                    "30-day money-back guarantee",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle size={15} className="text-green-500 flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>

                {/* Delivery info */}
                <div className="border-t border-gray-100 pt-5 space-y-3">
                  <div className="flex items-center gap-2.5 text-sm text-gray-500">
                    <Cloud size={16} className="text-blue-500" />
                    <span>Delivered via SharePoint</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-500">
                    <Mail size={16} className="text-blue-500" />
                    <span>Email confirmation sent</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-gray-500">
                    <Shield size={16} className="text-blue-500" />
                    <span>Secure Stripe checkout</span>
                  </div>
                </div>

                {/* Price summary */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[#18352b] font-semibold">Total</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-2xl font-bold text-blue-600">${product.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <Link href={`/verify?product=${slug}&price=${product.price}`}>
                    <Button variant="primary" className="w-full rounded-xl" size="lg">
                      Buy Now
                      <ArrowRight size={18} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
