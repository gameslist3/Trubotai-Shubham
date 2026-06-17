"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator, Briefcase, Database, Rocket, Users, Sparkles, Building2, FileText, Home, ArrowRight, Info, X } from "lucide-react";

// ── Filters ──
const filters = [
  { label: "All", value: "all" },
  { label: "Finance", value: "finance" },
  { label: "Investor", value: "investor" },
  { label: "Databases", value: "database" },
  { label: "Templates", value: "template" },
  { label: "AI", value: "ai" },
  { label: "Real Estate", value: "real-estate" },
];

// ── Per-product expanded details ──
interface ProductDetails {
  longDesc: string;
  builtFor: string[];
  whatYouGet: string[];
  note?: string;
}

const productDetails: Record<string, ProductDetails> = {
  "Finance Templates": {
    longDesc:
      "Stop building spreadsheets from scratch. Whether you're pitching investors, planning your next quarter, or just trying to understand where your cash is going — you need financial clarity fast. Our finance templates give you a battle-tested starting point, not a blank page.",
    builtFor: [
      "Startup founders — Model your runway, burn rate, and fundraising scenarios without a CFO",
      "Operations teams — Structure your budgets, forecasts, and cash flow tracking in hours, not weeks",
      "SMBs & agencies — Get professional-grade finance frameworks without the consultant price tag",
      "Consultants & agencies — Reusable client-ready models you can white-label and deliver faster",
      "Finance teams — Standardise reporting across departments with consistent, shareable formats",
    ],
    whatYouGet: [
      "Ready-to-use Excel / Google Sheets templates",
      "Pre-built formulas, dashboards, and charts",
      "Clean structure — just fill in your numbers",
      "Instant download, lifetime access",
      "No subscription. No setup. No fluff.",
    ],
  },
  Investor: {
    longDesc:
      "Skip months of research. Start conversations that matter. Fundraising isn't just about your pitch — it's about reaching the right investors at the right stage. This database gives you a ready-made, high-quality starting point so you can focus on closing, not hunting.",
    builtFor: [
      "Startup founders (Pre-Seed to Series B) — Build a targeted investor pipeline in hours, not weeks",
      "Fundraising consultants & advisors — Deliver faster, higher-quality investor shortlists to clients",
      "Startup teams — Identify relevant investors by stage, sector, and geography",
      "Accelerators & incubators — Strengthen your network with structured investor mapping",
    ],
    whatYouGet: [
      "Curated list of active investors (VCs, angels, funds)",
      "Segmented by stage, sector, and geography",
      "Key details: firm, focus areas, typical cheque size, and more",
      "Clean, structured format (Excel / Google Sheets ready)",
      "Built for immediate outreach and pipeline creation",
    ],
  },
  Grant: {
    longDesc:
      "Stop digging through scattered websites. Start applying faster. Grants, government programs, and accelerators are some of the best funding sources — but they're buried across dozens of portals, deadlines, and eligibility criteria. We've done the research for you — so you can focus on applying and winning.",
    builtFor: [
      "Early-stage startups — Access funding without giving up equity",
      "Startups applying for government grants — Find relevant innovation programs faster",
      "Nonprofits & social enterprises — Discover foundation and impact funding opportunities",
      "AI & deep-tech companies — Identify sector-specific grants and research programs",
      "SMBs — Explore R&D grants, incentives, and tax credit opportunities",
    ],
    whatYouGet: [
      "Curated list of active grants, accelerators, and funding programs",
      "Clear eligibility criteria (stage, sector, geography)",
      "Application deadlines and timelines",
      "Funding size / grant value (where available)",
      "Direct links to apply — no digging required",
      "Clean, searchable format (Excel / Google Sheets ready)",
    ],
  },
  Accelerator: {
    longDesc:
      "Don't miss the window. Apply at the right time. Accelerators can fast-track your startup with funding, mentorship, and network access — but the biggest challenge is knowing which ones to apply to and when. We've mapped it all for you — so you never miss a relevant opportunity again.",
    builtFor: [
      "Early-stage founders — Discover and apply to accelerators globally",
      "Startup ecosystem builders — Build structured accelerator networks and resources",
      "Investors & analysts — Track accelerator pipelines and emerging startup cohorts",
    ],
    whatYouGet: [
      "Curated list of global accelerators (YC, Techstars, regional programs, niche accelerators)",
      "Application cycles and intake timelines",
      "Focus areas (AI, SaaS, FinTech, Climate, etc.)",
      "Geography and eligibility criteria",
      "Program benefits (funding, mentorship, equity terms where available)",
      "Direct application links",
    ],
  },
  "Leads (1M)": {
    longDesc:
      "Launch campaigns today, not next week. Building outreach lists is slow, expensive, and repetitive. This gives you a ready-made database so your team can start sending campaigns immediately.",
    note: "Important: This is a data asset, not the TruLead platform. This is a one-time downloadable lead database — not the full TruLead SaaS product. No login. No search interface. No AI scoring. No CRM sync. If you need automation, enrichment, or workflows — that's TruLead SaaS. If you just need data to move fast — this is it.",
    builtFor: [
      "Sales teams — Run large-scale cold email campaigns instantly",
      "Growth agencies — Build and deploy outreach lists across multiple clients",
      "Founders — Validate markets, test messaging, and generate early traction",
    ],
    whatYouGet: [
      "1 Million+ lead records",
      "Clean, structured dataset (CSV / Excel ready)",
      "Key fields: name, company, role, email (where available), industry, geography",
      "Ready for upload into any outreach tool (Apollo, Lemlist, Instantly, etc.)",
      "One-time download — no usage limits",
    ],
  },
  "AI LinkedIn Prompts Pack": {
    longDesc:
      "A curated collection of AI prompts engineered to help you write data-driven, insight-led LinkedIn content that positions you as a thought leader — not just another poster. Use it to build a consistent presence, generate post ideas, hooks, and full drafts in minutes, create content series that position you around a specific expertise, and respond to trends and news with credible, structured takes. One-time purchase. Use it forever.",
    builtFor: [
      "Founders & operators — Share business insights and frameworks that build trust with investors and buyers",
      "Consultants & advisors — Demonstrate expertise with structured, insight-led posts that win client attention",
      "Product and growth leaders — Publish market observations, trends, and data-backed takes at scale",
      "B2B sales & GTM teams — Warm up prospects with authoritative content before outreach",
    ],
    whatYouGet: [
      "Ready-to-use AI prompt templates for LinkedIn",
      "Prompts designed to lead with insight, data, and credibility — not fluff",
      "Structured for different post formats: thought leadership, frameworks, case studies, data drops, contrarian takes",
      "Built for AI tools (ChatGPT, Claude, Gemini, Perplexity) — just paste and customize",
      "Saves hours of staring at a blank post box every week",
    ],
  },
  "Architecture PRD": {
    longDesc:
      "Stop guessing your system design. Start with a proven structure. Architecture planning is one of the most important steps in building reliable software — but it's also one of the hardest to document clearly. Our templates help you define the system before you build it, so teams can align faster and make better technical decisions.",
    builtFor: [
      "CTOs and engineering leads — Design architecture from scratch with a clear blueprint",
      "Solutions architects — Create reusable reference documentation for client projects",
      "Startup technical co-founders — Present investor-ready architecture decks and system diagrams",
    ],
    whatYouGet: [
      "Professional architecture documentation template",
      "Sections for system overview, components, data flow, integrations, security, scalability, and deployment",
      "Easy to adapt for SaaS, platforms, marketplaces, internal tools, and AI systems",
      "Useful for internal alignment, client delivery, and investor communication",
    ],
  },
  "Product PRDs": {
    longDesc:
      "Stop starting every PRD from a blank page. Writing a solid PRD can take days of senior product time. Our templates give you a proven structure for defining features, aligning stakeholders, and handing clear requirements to design and engineering.",
    builtFor: [
      "Startup product managers — Set up your first proper PRD process without reinventing it",
      "Founders — Present product thinking more professionally to investors, teams, and partners",
      "Consultants — Deliver polished product strategy documents faster for client engagements",
    ],
    whatYouGet: [
      "Ready-to-use PRD template in clean, professional format",
      "Industry-standard sections: problem, goals, user stories, scope, requirements, flows, risks, success metrics",
      "Easy to customize for SaaS, apps, marketplaces, internal tools, and AI products",
      "Saves 2–5 days of product documentation work",
      "Great for individual use or team standardization",
    ],
  },
  "Real Estate": {
    longDesc:
      "Complete real estate analysis templates and property calculators. Evaluate investments, manage portfolios, and close deals faster with our comprehensive real estate toolkit.",
    builtFor: [
      "Real estate investors — Analyze properties and calculate ROI with ready-made templates",
      "Property managers — Track portfolio performance and manage cash flow",
      "Real estate agents — Present professional investment analyses to clients",
    ],
    whatYouGet: [
      "Real estate analysis templates and calculators",
      "Property valuation and ROI tools",
      "Portfolio tracking dashboards",
      "Cash flow and expense management sheets",
      "Instant download, lifetime access",
    ],
  },
};

// ── Shared tooltip content renderer ──
function TooltipContent({ details, onClose }: { details: ProductDetails; onClose?: () => void }) {
  return (
    <div className="p-4 sm:p-3 space-y-4 sm:space-y-2.5 relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={14} />
        </button>
      )}
      <p className="text-[11px] text-gray-700 leading-relaxed">
        {details.longDesc}
      </p>

      {details.note && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
          <p className="text-[11px] text-amber-800 leading-relaxed">
            {details.note}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <h4 className="text-[10px] font-semibold text-[#18352b] uppercase tracking-wider mb-1">
            Built for
          </h4>
          <ul className="space-y-0.5">
            {details.builtFor.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[11px] text-gray-700 leading-relaxed"
              >
                <span className="mt-[4px] w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-semibold text-[#18352b] uppercase tracking-wider mb-1">
            What you get
          </h4>
          <ul className="space-y-0.5">
            {details.whatYouGet.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[11px] text-gray-700 leading-relaxed"
              >
                <svg className="mt-0.5 w-3 h-3 text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── Product cards data ──
type CategoryTag = (typeof filters)[number]["value"];

interface Category {
  name: string;
  tag: CategoryTag;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  price: string;
  href: string;
  bg: string;
  iconColor: string;
  desc: string;
  limitedOffer?: boolean;
}

const categories: Category[] = [
  { name: "Finance Templates", tag: "finance", icon: Calculator, price: "49", href: "/marketplace/finance-templates", bg: "bg-blue-100", iconColor: "text-blue-600", desc: "Professional financial planning and analysis templates. Budget, forecast, and report with ease to drive smarter business decisions." },
  { name: "Investor", tag: "investor", icon: Briefcase, price: "199", href: "/marketplace/investor-database", bg: "bg-purple-100", iconColor: "text-purple-600", desc: "Curated investor database with detailed funding preferences and contact info. Connect with the right VCs and angels for your startup.", limitedOffer: true },
  { name: "Grant", tag: "database", icon: Database, price: "49", href: "/marketplace/grant-database", bg: "bg-green-100", iconColor: "text-green-600", desc: "Comprehensive grant database with eligibility filters and deadline tracking. Find and secure funding for your next big project." },
  { name: "Accelerator", tag: "database", icon: Rocket, price: "49", href: "/marketplace/accelerator-database", bg: "bg-orange-100", iconColor: "text-orange-600", desc: "Top startup accelerator programs with application details and success metrics. Get into the best programs to scale faster." },
  { name: "Leads (1M)", tag: "database", icon: Users, price: "49", href: "/marketplace/1m-leads", bg: "bg-pink-100", iconColor: "text-pink-600", desc: "1 million verified B2B leads across industries and regions. Target, filter, and convert your ideal customer profiles.", limitedOffer: true },
  { name: "AI LinkedIn Prompts Pack", tag: "ai", icon: Sparkles, price: "49", href: "/marketplace/ai-linkedin-prompts", bg: "bg-indigo-100", iconColor: "text-indigo-600", desc: "AI-powered prompt templates for LinkedIn content creation. Generate engaging posts, comments, and outreach messages that get results." },
  { name: "Architecture PRD", tag: "template", icon: Building2, price: "49", href: "/marketplace/architecture-prd", bg: "bg-teal-100", iconColor: "text-teal-600", desc: "Comprehensive architecture documentation templates for system design. Define constraints, trade-offs, and technical decisions with clarity." },
  { name: "Product PRDs", tag: "template", icon: FileText, price: "39", href: "/marketplace/product-prds", bg: "bg-amber-100", iconColor: "text-amber-600", desc: "Ready-to-use product requirement document templates. Streamline product planning, align stakeholders, and ship with confidence." },
  { name: "Real Estate", tag: "real-estate", icon: Home, price: "49", href: "/marketplace/real-estate", bg: "bg-rose-100", iconColor: "text-rose-600", desc: "Complete real estate analysis templates and property calculators. Evaluate investments, manage portfolios, and close deals faster." },
];

// ── Component ──
export default function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [tooltipCard, setTooltipCard] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number; side: 'right' | 'left' | 'center' } | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear position when tooltip closes
  useEffect(() => {
    if (!tooltipCard) {
      setTooltipPos(null);
    }
  }, [tooltipCard]);

  const filteredCategories =
    activeFilter === "all"
      ? categories
      : categories.filter((cat) => cat.tag === activeFilter);

  const selectedDetails = tooltipCard ? productDetails[tooltipCard] : null;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-white to-white" />
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#18352b] leading-tight">
              Digital Assets{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                Marketplace
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover premium digital assets to accelerate your business growth
              — from investor databases and B2B leads to financial templates and
              more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-8 lg:px-12">
          {/* ── Filter Section ── */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => {
                  setActiveFilter(f.value);
                  setTooltipCard(null);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === f.value
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* ── Cards Grid ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat, index) => {
              const details = productDetails[cat.name];
              const showTooltip = tooltipCard === cat.name;

              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative h-full ${showTooltip ? "z-50" : "z-[1]"}`}
                >
                  {/* ── Card body ── */}
                  <div className="group bg-white border border-gray-200 rounded-2xl px-5 pt-5 pb-5 transition-all duration-300 flex flex-col relative hover:border-blue-300 hover:shadow-xl hover:shadow-blue-600/8 hover:-translate-y-1.5">
                    {/* Promo strip line — full-width banner at top */}
                    {cat.limitedOffer && (
                      <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
                        className="absolute -top-px left-0 right-0 z-0 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-t-2xl text-[11px] md:text-xs font-semibold leading-tight whitespace-nowrap pointer-events-none overflow-hidden shadow-sm"
                      >
                        {/* Subtle stripe overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.06)_50%,transparent_75%)]" />
                        <span className="relative inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-[4px] tracking-wide">
                          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                          50% OFF
                        </span>
                        <span className="relative text-white/90 font-medium tracking-wide">
                          All Products
                        </span>
                        <span className="relative w-1 h-1 rounded-full bg-white/30" />
                        <span className="relative text-white/75 text-[10px] md:text-[11px]">
                          Limited Time!
                        </span>
                      </motion.div>
                    )}

                    {/* Content wrapper — renders above the promo strip */}
                    <div className="relative z-[1] flex flex-col flex-1">
                      {/* Top: Icon + Heading */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`relative flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl ${cat.bg} flex items-center justify-center shadow-sm transition-all`}
                        >
                          <cat.icon
                            size={32}
                            className={`${cat.iconColor} transition-colors`}
                          />
                        </div>
                        <h3 className="text-[15px] md:text-[17px] font-bold text-[#18352b] transition-colors leading-tight">
                          {cat.name}
                        </h3>
                      </div>

                      {/* Content area — grows to fill space for equal-height cards */}
                      <div className="flex flex-1 flex-col mt-4">
                        <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                          {cat.desc}
                        </p>

                        {/* "See more" — compact, no divider */}
                        <div className="flex justify-end mt-auto pt-3 pb-1">
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              if (window.innerWidth < 640) {
                                e.stopPropagation();
                                setTooltipCard(tooltipCard === cat.name ? null : cat.name);
                              }
                            }}
                            onMouseEnter={(e) => {
                              if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
                              // Calculate position relative to the card
                              const btn = e.currentTarget;
                              const card = btn.closest('.group') as HTMLElement | null;
                              if (card) {
                                const rect = card.getBoundingClientRect();
                                const tooltipW = 448; // 28rem
                                const gap = 12;
                                const estimatedH = 480; // estimated max tooltip height
                                // Clamp top so tooltip stays within viewport
                                // Center tooltip vertically with the card
                                const top = Math.max(16, Math.min(rect.top + rect.height / 2 - estimatedH / 2, window.innerHeight - estimatedH - 16));
                                // Position to the right if room, otherwise to the left
                                if (window.innerWidth - rect.right >= tooltipW + gap) {
                                  setTooltipPos({ top, left: rect.right + gap, side: 'right' });
                                } else if (rect.left >= tooltipW + gap) {
                                  setTooltipPos({ top, left: rect.left - tooltipW - gap, side: 'left' });
                                } else {
                                  // Fallback: center on screen
                                  setTooltipPos({ top: Math.max(16, (window.innerHeight - estimatedH) / 2), left: (window.innerWidth - tooltipW) / 2, side: 'center' });
                                }
                              }
                              setTooltipCard(cat.name);
                            }}
                            onMouseLeave={() => {
                              closeTimeoutRef.current = setTimeout(() => setTooltipCard(null), 100);
                            }}
                            className="inline-flex items-center gap-1 text-xs font-medium text-blue-400/70 hover:text-blue-600 cursor-pointer transition-colors select-none"
                          >
                            <Info size={12} />
                            <span>See more</span>
                          </button>


                        </div>
                      </div>
                      </div>

                      {/* Bottom: Price + Buy Now */}
                      <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
                        <span className="text-xl md:text-2xl font-bold text-blue-600">
                          ${cat.price}
                        </span>
                        <Link
                          href={`/verify?product=${cat.href.split("/").pop()}&price=${cat.price}`}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition-all duration-200 hover:gap-2"
                        >
                          Buy Now
                          <ArrowRight
                            size={14}
                            className="transition-transform hover:translate-x-0.5"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* No results */}
          {filteredCategories.length === 0 && (
            <p className="text-center text-gray-400 py-16">
              No products match this category.
            </p>
          )}
        </div>
      </section>

      {/* Mobile tooltip — full-screen overlay */}
      {tooltipCard && selectedDetails && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-40 sm:hidden"
            onClick={() => setTooltipCard(null)}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-4 top-4 bottom-4 z-50 flex flex-col bg-blue-50 border border-blue-200 rounded-xl shadow-xl shadow-blue-600/15 overflow-y-auto sm:hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-blue-50 border-b border-blue-100 rounded-t-xl px-5 py-4 flex items-center justify-between z-10">
              <span className="text-sm font-semibold text-[#18352b]">{tooltipCard}</span>
              <button
                onClick={() => setTooltipCard(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>
            {/* Content */}
            <div className="flex-1">
              <TooltipContent details={selectedDetails} />
            </div>
          </motion.div>
        </>
      )}

      {/* Desktop/Tablet tooltip — positioned near its card */}
      {tooltipCard && selectedDetails && tooltipPos && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          onMouseEnter={() => {
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
          }}
          onMouseLeave={() => {
            closeTimeoutRef.current = setTimeout(() => setTooltipCard(null), 100);
          }}
          style={{ top: tooltipPos.top, left: tooltipPos.left }}
          className="hidden sm:block fixed w-[28rem] bg-blue-50 border border-blue-200 rounded-xl shadow-xl shadow-blue-600/15 z-50"
        >
          {/* Arrow pointing toward the card */}
          {tooltipPos.side === 'right' && (
            <div className="absolute -left-[6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-50 border-l border-b border-blue-200 rotate-45" />
          )}
          {tooltipPos.side === 'left' && (
            <div className="absolute -right-[6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-50 border-r border-t border-blue-200 rotate-45" />
          )}
          <TooltipContent details={selectedDetails} />
        </motion.div>
      )}
    </>
  );
}
