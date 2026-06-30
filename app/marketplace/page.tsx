"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator, Briefcase, Database, Rocket, Users, Sparkles, Building2, FileText, Home, Crosshair, Shield, TrendingUp, Handshake, Globe, Mail, Calendar, Send, Gift, ArrowRight, Info, X } from "lucide-react";
import { getProductsByFilter, products, filterToSlugs } from "@/lib/product-data";
import ProductDetailView from "@/components/marketplace/product-detail-view";

// ── Filters ──
const filters = [
  { label: "All", value: "all" },
  { label: "AI", value: "ai" },
  { label: "Finance", value: "finance" },
  { label: "Strategy", value: "strategy" },
  { label: "Data Assets", value: "data-assets" },
  { label: "Leads (Bulk)", value: "leads-bulk" },
  { label: "SDLC Templates", value: "sdlc-templates" },
  { label: "Real Estate", value: "real-estate" },
  { label: "Bundle", value: "bundle" },
];

// ── Sub-categories per filter (tab bar style) ──
interface SubCategory {
  name: string;
  slug: string;
  price: string;
}

const filterSubCategories: Record<string, SubCategory[]> = {
  "ai": [
    { name: "AI LinkedIn Prompts Pack", slug: "ai-linkedin-prompts", price: "49" },
    { name: "Cold Email Templates", slug: "cold-email-templates", price: "49" },
  ],
  "strategy": [
    { name: "Channel Partner Pack", slug: "channel-partners", price: "99" },
    { name: "GTM", slug: "gtm-strategy", price: "199" },
    { name: "Pitch Deck Samples", slug: "pitch-deck-samples", price: "99" },
    { name: "NDA and Agreements", slug: "nda-pack", price: "99" },
    { name: "M&A", slug: "ma-strategy", price: "199" },
  ],
  "data-assets": [
    { name: "Accelerator", slug: "accelerator-database", price: "49" },
    { name: "Grant", slug: "grant-database", price: "49" },
    { name: "Investor", slug: "investor-database", price: "199" },
    { name: "Leads (1M)", slug: "1m-leads", price: "49" },
    { name: "Leads (250K)", slug: "250k-leads", price: "49" },
  ],
  "leads-bulk": [
    { name: "Leads (150M)", slug: "150m-leads", price: "1999" },
    { name: "Leads (390M)", slug: "390m-leads", price: "3999" },
  ],
  "sdlc-templates": [
    { name: "Architecture PRD", slug: "architecture-prd", price: "49" },
    { name: "Product PRD", slug: "product-prds", price: "39" },
    { name: "Proposals Docs", slug: "proposals-docs", price: "99" },
    { name: "Sample PRD", slug: "sample-prd", price: "99" },
    { name: "Project Timeline Templates", slug: "project-timeline-templates", price: "49" },
    { name: "Website Content", slug: "website-content", price: "199" },
    { name: "Lean PRD", slug: "lean-prd", price: "99" },
  ],
};

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
  "Leads (250K)": {
    longDesc:
      "A compact, targeted B2B lead dataset with 250,000 verified records. Perfect for smaller teams, niche campaigns, and budget-conscious outreach. Get clean, ready-to-use data without the enterprise price tag.",
    note: "Important: This is a data asset, not the TruLead platform. This is a one-time downloadable lead database — not the full TruLead SaaS product. No login. No search interface. No AI scoring. No CRM sync.",
    builtFor: [
      "Small sales teams — Run targeted cold email campaigns without data overload",
      "Startups — Validate niche markets with a focused, affordable dataset",
      "Growth agencies — Build outreach lists for specific industries or regions",
      "Founders — Test outreach messaging and generate early traction",
    ],
    whatYouGet: [
      "250,000+ lead records",
      "Clean, structured dataset (CSV / Excel ready)",
      "Key fields: name, company, role, email (where available), industry, geography",
      "Ready for upload into any outreach tool (Apollo, Lemlist, Instantly, etc.)",
      "One-time download — no usage limits",
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
  "Product PRD": {
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
  "GTM": {
    longDesc:
      "These are not MBA slide decks or theoretical frameworks. Every template in this pack is built around how early-stage companies actually think about go-to-market — from zero to first revenue, from first revenue to scale. That means flexible frameworks you adapt to your specific business model, step-by-step guidance built into every section, decision trees to guide your channel and motion choices, and formats ready for investor meetings, board reviews, and team planning sessions.",
    builtFor: [
      "First-time founders — Turn your product into a repeatable revenue motion with structured guidance",
      "Startup operators — Prepare for Series A with investor-ready GTM documentation",
      "Product & growth leaders — Plan structured market entry with decision trees and channel frameworks",
      "Consultants & advisors — Deliver consistent, client-ready GTM deliverables",
      "Accelerator mentors — Provide standardised strategy tools across portfolio companies",
    ],
    whatYouGet: [
      "A written, structured GTM strategy for your business",
      "A clear ICP you and your team can align on",
      "A channel and motion plan you can actually execute",
      "A launch sequence with accountability built in",
      "A metrics framework to track what moves the needle",
      "Editable templates for PowerPoint, Google Slides, Word, and Notion",
    ],
  },
  "NDA and Agreements": {
    longDesc:
      "Complete NDA and confidentiality management system — agreements, workflows, and supporting documentation all in one pack. LLP-specific structure designed around the legal and operational context of a Limited Liability Partnership. Includes AI-powered prompts to draft, customise, and review your agreements faster than ever.",
    builtFor: [
      "LLP founders — Protect confidential information before onboarding clients, employees, or contractors",
      "Startup operators — Protect proprietary technology, business models, and IP from day one",
      "Consultants — Share sensitive client information securely across engagements",
      "Tech & SaaS companies — License software, APIs, and proprietary data with proper NDA coverage",
      "Agencies — Work with client data, briefs, and commercially sensitive information",
    ],
    whatYouGet: [
      "A legally structured NDA and confidentiality system for your LLP",
      "AI-powered tools to draft and review agreements faster",
      "A live dashboard to track every agreement across your business",
      "Internal SOPs your team can follow consistently",
      "Licensing templates to protect your IP in commercial deals",
      "Complete documentation and audit trail for every confidentiality arrangement",
    ],
  },
  "M&A": {
    longDesc:
      "End-to-end M&A toolkit — from target identification through valuation, due diligence, and deal structuring, all in one pack. Strategy and execution in one place with built-in valuation metrics covering the key methodologies used in real transactions.",
    builtFor: [
      "Founders & CEOs — Evaluate your first acquisition or prepare to be acquired",
      "Corporate development teams — Identify, score, and prioritise acquisition targets",
      "PE & venture investors — Evaluate new equity deals and portfolio acquisitions",
      "CFOs — Build internal M&A capability without external advisors",
      "Business brokers & M&A advisors — Deliver professional client-facing deal documentation",
    ],
    whatYouGet: [
      "A clear, written acquisition strategy before you approach a single target",
      "A consistent framework for evaluating every deal against the same criteria",
      "A structured pipeline of acquisition targets with scoring and prioritisation",
      "A defensible valuation range built on multiple methodologies",
      "The right questions to ask any new equity partner before you sign anything",
      "A professional, repeatable M&A process you can use across every deal",
    ],
  },
  "Channel Partner Pack": {
    longDesc:
      "Complete channel partner programme in a box — from partner agreement and onboarding to deal registration and commission tracking, all in one pack. Covers 4 partner models (Referral, Reseller, MSP, System Integrator) with a 3-tier structure (Silver, Gold, Platinum) with commissions from 15% to 30%.",
    builtFor: [
      "Independent consultants — Refer clients and earn 10–15% commission without heavy sales commitment",
      "VARs & resellers — Sell and fulfil AI solutions with 20–25% reseller margin",
      "MSPs — Add recurring revenue by bundling AI with existing managed services",
      "System integrators — Embed AI into enterprise digital transformation projects",
      "Digital agencies — Scale client delivery without adding headcount through AI automation",
    ],
    whatYouGet: [
      "A complete, professional channel partner programme ready to launch",
      "Frameworks for every partner type from referral through to strategic SI",
      "Commission structures your partners will understand and be motivated by",
      "A deal registration process that protects your revenue and your partners' pipeline",
      "Proven GTM playbooks for Enterprise, SMB, and Agency segments",
      "A 90-day onboarding plan that gets new partners generating pipeline fast",
    ],
  },
  "Lean PRD": {
    longDesc:
      "A streamlined Lean PRD template designed for rapid product definition. Perfect for startups and agile teams that need to validate ideas fast without heavy documentation overhead. Define your problem, solution, success metrics, and scope — all in one concise document.",
    builtFor: [
      "Startup founders — Validate product ideas quickly with minimal documentation",
      "Product managers — Write focused PRDs that get to the point",
      "Agile teams — Define MVPs and iterate based on real feedback",
      "Engineers — Understand the what and why before building",
    ],
    whatYouGet: [
      "Lean PRD template (editable format)",
      "Problem statement framework",
      "Success metrics and hypothesis tracking",
      "Scope definition and prioritisation matrix",
      "Ready for Notion, Google Docs, or Markdown",
    ],
  },
  "Website Content": {
    longDesc:
      "Complete website content system with every core page of an AI startup website written and structured. Includes 15 ready-to-use content documents — homepage, 8 product pages, about, contact, CTA library, website structure guide, and a reusable template pack.",
    builtFor: [
      "AI startup founders — Launch a professional website without weeks of content writing",
      "SaaS product teams — Get structured product page copy fast",
      "Marketing managers — Work from a proven content architecture",
      "Web designers — Get ready-to-implement copy alongside design work",
      "Digital agencies — Use a reusable content framework for faster delivery",
    ],
    whatYouGet: [
      "A complete, professional AI startup website — written and ready to build",
      "8 fully written product pages covering every major AI product category",
      "A CTA library you can drop into any page immediately",
      "A reusable template framework for every future page you need",
      "SEO guidance and implementation recommendations built in",
      "A master compiled document for your development team to hand off directly",
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
}

const categories: Category[] = [
  { name: "All Assets Bundle", tag: "bundle", icon: Gift, price: "5299", href: "/marketplace/all-assets-bundle", bg: "bg-amber-100", iconColor: "text-amber-600", desc: "Every digital asset in our marketplace at a massive discount. Get everything in one bundle." },
  { name: "Finance Templates", tag: "finance", icon: Calculator, price: "49", href: "/marketplace/finance-templates", bg: "bg-blue-100", iconColor: "text-blue-600", desc: "Professional financial planning and analysis templates. Budget, forecast, and report with ease to drive smarter business decisions." },
  { name: "Investor", tag: "data-assets", icon: Briefcase, price: "199", href: "/marketplace/investor-database", bg: "bg-purple-100", iconColor: "text-purple-600", desc: "Curated investor database with detailed funding preferences and contact info. Connect with the right VCs and angels for your startup." },
  { name: "Grant", tag: "data-assets", icon: Database, price: "49", href: "/marketplace/grant-database", bg: "bg-green-100", iconColor: "text-green-600", desc: "Comprehensive grant database with eligibility filters and deadline tracking. Find and secure funding for your next big project." },
  { name: "Accelerator", tag: "data-assets", icon: Rocket, price: "49", href: "/marketplace/accelerator-database", bg: "bg-orange-100", iconColor: "text-orange-600", desc: "Top startup accelerator programs with application details and success metrics. Get into the best programs to scale faster." },
  { name: "Leads (1M)", tag: "data-assets", icon: Users, price: "49", href: "/marketplace/1m-leads", bg: "bg-pink-100", iconColor: "text-pink-600", desc: "1 million verified B2B leads across industries and regions. Target, filter, and convert your ideal customer profiles." },
  { name: "Leads (250K)", tag: "data-assets", icon: Users, price: "49", href: "/marketplace/250k-leads", bg: "bg-pink-100", iconColor: "text-pink-600", desc: "250,000 verified B2B leads — a compact, targeted dataset for focused outreach campaigns." },
  { name: "AI LinkedIn Prompts Pack", tag: "ai", icon: Sparkles, price: "49", href: "/marketplace/ai-linkedin-prompts", bg: "bg-indigo-100", iconColor: "text-indigo-600", desc: "AI-powered prompt templates for LinkedIn content creation. Generate engaging posts, comments, and outreach messages that get results." },
  { name: "Cold Email Templates", tag: "ai", icon: Mail, price: "49", href: "/marketplace/cold-email-templates", bg: "bg-blue-100", iconColor: "text-blue-600", desc: "Proven cold email templates that get replies, book meetings, and close deals." },
  { name: "Architecture PRD", tag: "sdlc-templates", icon: Building2, price: "49", href: "/marketplace/architecture-prd", bg: "bg-teal-100", iconColor: "text-teal-600", desc: "Comprehensive architecture documentation templates for system design. Define constraints, trade-offs, and technical decisions with clarity." },
  { name: "Product PRD", tag: "sdlc-templates", icon: FileText, price: "39", href: "/marketplace/product-prds", bg: "bg-amber-100", iconColor: "text-amber-600", desc: "Ready-to-use product requirement document templates. Streamline product planning, align stakeholders, and ship with confidence." },
  { name: "Proposals Docs", tag: "sdlc-templates", icon: FileText, price: "99", href: "/marketplace/proposals-docs", bg: "bg-blue-100", iconColor: "text-blue-600", desc: "Professional proposal and business plan templates for grant applications and client pitches." },
  { name: "Sample PRD", tag: "sdlc-templates", icon: FileText, price: "99", href: "/marketplace/sample-prd", bg: "bg-amber-100", iconColor: "text-amber-600", desc: "Ready-to-use PRD samples and templates to help product teams define, scope, and communicate requirements." },
  { name: "Project Timeline Templates", tag: "sdlc-templates", icon: Calendar, price: "49", href: "/marketplace/project-timeline-templates", bg: "bg-teal-100", iconColor: "text-teal-600", desc: "Professional project timeline and Gantt chart templates to plan, track, and deliver projects on time." },
  { name: "Website Content", tag: "sdlc-templates", icon: Globe, price: "199", href: "/marketplace/website-content", bg: "bg-cyan-100", iconColor: "text-cyan-600", desc: "15 professionally written content documents covering every page of an AI startup website." },
  { name: "Lean PRD", tag: "sdlc-templates", icon: FileText, price: "99", href: "/marketplace/lean-prd", bg: "bg-amber-100", iconColor: "text-amber-600", desc: "Streamlined Lean PRD template to define, validate, and communicate product requirements fast." },
  { name: "GTM", tag: "strategy", icon: Crosshair, price: "199", href: "/marketplace/gtm-strategy", bg: "bg-sky-100", iconColor: "text-sky-600", desc: "Structured go-to-market frameworks and strategy templates. Move from idea to market with clarity, confidence, and a plan that scales." },
  { name: "Pitch Deck Samples", tag: "strategy", icon: Send, price: "99", href: "/marketplace/pitch-deck-samples", bg: "bg-orange-100", iconColor: "text-orange-600", desc: "Professional pitch deck templates that help you tell your story and win investors." },
  { name: "NDA and Agreements", tag: "strategy", icon: Shield, price: "99", href: "/marketplace/nda-pack", bg: "bg-slate-100", iconColor: "text-slate-600", desc: "Professional NDA templates, AI prompts, dashboards, documentation, and SOP tools for founders and LLPs." },
  { name: "M&A", tag: "strategy", icon: TrendingUp, price: "199", href: "/marketplace/ma-strategy", bg: "bg-emerald-100", iconColor: "text-emerald-600", desc: "Professional M&A strategy frameworks, analysis tools, valuation templates, and deal documentation." },
  { name: "Channel Partner Pack", tag: "strategy", icon: Handshake, price: "99", href: "/marketplace/channel-partners", bg: "bg-violet-100", iconColor: "text-violet-600", desc: "Everything to launch, manage, and scale a channel partner programme — templates, playbooks, and tools." },
  { name: "Real Estate", tag: "real-estate", icon: Home, price: "199", href: "/marketplace/real-estate", bg: "bg-rose-100", iconColor: "text-rose-600", desc: "Professional-grade templates, trackers, and workflows for landlords, property investors, and real estate pros." },
  { name: "Leads (150M)", tag: "leads-bulk", icon: Database, price: "1999", href: "/marketplace/150m-leads", bg: "bg-purple-100", iconColor: "text-purple-600", desc: "150 million verified B2B leads — the ultimate dataset for enterprise-scale outreach campaigns." },
  { name: "Leads (390M)", tag: "leads-bulk", icon: Database, price: "3999", href: "/marketplace/390m-leads", bg: "bg-indigo-100", iconColor: "text-indigo-600", desc: "390 million verified B2B leads — the most comprehensive B2B dataset available." },
];

// ── Cards that should not show "See more" ──
const CARDS_WITHOUT_SEE_MORE = new Set([
  "Sample PRD",
  "Project Timeline Templates",
  "Cold Email Templates",
  "Leads (150M)",
  "Leads (390M)",
  "Pitch Deck Samples",
  "Proposals Docs",
  "Leads (250K)",
  "Lean PRD",
]);

// ── Component ──
export default function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [tooltipCard, setTooltipCard] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number; side: 'right' | 'left' | 'center' } | null>(null);
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(null);
  const [bundleListOpen, setBundleListOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const detailContentRef = useRef<HTMLDivElement>(null);
  const skipScrollRef = useRef(false);

  // Clear position when tooltip closes
  useEffect(() => {
    if (!tooltipCard) {
      setTooltipPos(null);
    }
  }, [tooltipCard]);

  const subCategories = filterSubCategories[activeFilter] || [];
  const hasSubCategories = subCategories.length > 0;
  const isSingleProductFilter = ["finance", "real-estate", "bundle"].includes(activeFilter);

  // Determine which slug to show
  let currentSlug: string | null = null;
  if (hasSubCategories) {
    currentSlug = activeSubCategory || subCategories[0]?.slug || null;
  } else if (isSingleProductFilter) {
    currentSlug = filterToSlugs[activeFilter]?.[0] || null;
  }

  const filteredCategories =
    activeFilter === "all"
      ? [...categories]
      : categories.filter((cat) => cat.tag === activeFilter);

  // Sort: "All Assets Bundle" always first, then alphabetical
  filteredCategories.sort((a, b) => {
    if (a.name === "All Assets Bundle") return -1;
    if (b.name === "All Assets Bundle") return 1;
    return a.name.localeCompare(b.name);
  });

  const selectedDetails = tooltipCard ? productDetails[tooltipCard] : null;

  // Handle card click — switch to inline filter view instead of navigating away
  const handleCardClick = (cat: Category) => {
    const slug = cat.href.split("/").pop() || "";
    setActiveFilter(cat.tag);
    setSelectedProductSlug(slug);
    setTooltipCard(null);
    // Set subcategory if the filter has matching subcategories
    const subCats = filterSubCategories[cat.tag];
    if (subCats) {
      const matching = subCats.find((s) => s.slug === slug);
      if (matching) {
        setActiveSubCategory(matching.slug);
      } else {
        setActiveSubCategory(null);
      }
    } else {
      setActiveSubCategory(null);
    }
  };

  // For specific filter views: get products from shared data
  const isFilteredView = activeFilter !== "all";
  const filterProducts = isFilteredView ? getProductsByFilter(activeFilter) : [];
  const currentProductSlug = selectedProductSlug || currentSlug;

  // Scroll to detail content when a card is clicked (not on filter/submenu clicks)
  useEffect(() => {
    if (skipScrollRef.current) {
      skipScrollRef.current = false;
      return;
    }
    if (isFilteredView && currentProductSlug && detailContentRef.current) {
      const y = detailContentRef.current.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [isFilteredView, currentProductSlug]);

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

      {/* Product Grid / Detail View */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-8 lg:px-12">
          {/* ── Filter Section ── */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-4">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => {
                  skipScrollRef.current = true;
                  setActiveFilter(f.value);
                  setSelectedProductSlug(null);
                  setActiveSubCategory(null);
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

          {/* ── Sub-category Tab Bar ── */}
          {hasSubCategories && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-center gap-0 mb-8"
            >
              {subCategories.map((sub, idx) => {
                const isActive = activeSubCategory === sub.slug || (!activeSubCategory && idx === 0);
                return (
                  <div key={sub.slug} className="flex items-center">
                    {idx > 0 && (
                      <div className="w-px h-4 bg-gray-200 mx-3" />
                    )}
                    <button
                      onClick={() => {
                        skipScrollRef.current = true;
                        setActiveSubCategory(sub.slug);
                        setSelectedProductSlug(sub.slug);
                        setTooltipCard(null);
                      }}
                      className={`relative px-1.5 py-2 text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {sub.name}
                      {/* Active bottom line */}
                      {isActive && (
                        <motion.div
                          layoutId="activeSubTab"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full"
                        />
                      )}
                    </button>
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* ── Full-width 50% OFF Ribbon (both edges curve upward in same direction) ── */}
        <div
          className="relative w-full py-3 md:py-3.5 overflow-hidden mb-8 md:mb-10"
          style={{
            clipPath: `polygon(
              0% 5%, 20% 3%, 40% 2%, 50% 1.5%, 60% 2%, 80% 3%, 100% 5%,
              100% 96%, 80% 94.5%, 60% 93%, 50% 92.5%, 40% 93%, 20% 94.5%, 0% 96%
            )`
          }}
        >
          {/* Base gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700" />

          {/* Soft inner radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)]" />

          {/* Subtle noise/grain texture */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '128px 128px',
            }}
          />

          {/* Top highlight edge glow */}
          <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* Animated shimmer sweep */}
          <motion.div
            className="absolute inset-0"
            initial={{ x: '-100%' }}
            animate={{ x: '400%' }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
              width: '60%',
            }}
          />

          {/* Floating decorative sparkles */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div className="absolute -top-3 -left-3 w-14 h-14 rounded-full bg-white/5 blur-xl" />
            <motion.div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full bg-blue-400/10 blur-xl" />
            <motion.div
              className="absolute top-1/3 left-[12%] w-1.5 h-1.5 rounded-full bg-white/25"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/2 right-[18%] w-1 h-1 rounded-full bg-white/20"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
              className="absolute bottom-1/3 right-[30%] w-2 h-2 rounded-full bg-blue-300/20"
              animate={{ opacity: [0.1, 0.5, 0.1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </div>

          {/* Content — centered — improved visibility */}
          <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
              {/* ── Glowing 50% OFF Badge ── */}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Neon glow behind badge */}
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 via-amber-400/20 to-orange-400/20 rounded-xl blur-lg" />
                <div className="relative inline-flex items-center gap-1.5 bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-500 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-extrabold tracking-wide shadow-[0_0_20px_rgba(251,191,36,0.3)] ring-1 ring-yellow-300/40">
                  <svg className="w-4 h-4 text-[#8F4A0E]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                  <span className="text-[#8F4A0E] [text-shadow:0_2px_6px_rgba(0,0,0,0.4)]">50%</span>
                  <span className="text-[10px] md:text-xs font-bold text-[#8F4A0E] [text-shadow:0_2px_6px_rgba(0,0,0,0.4)]">OFF</span>
                </div>
              </motion.div>

              {/* ── ALL PRODUCTS ── */}
              <span className="text-white font-extrabold text-sm md:text-lg tracking-[0.08em] [text-shadow:0_2px_8px_rgba(0,0,0,0.4)]">
                ALL PRODUCTS
              </span>

              {/* ── Premium Separator ── */}
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              </div>

              {/* ── LIMITED TIME OFFER ── */}
              <motion.div
                animate={{ opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Dark blue shadow glow behind text */}
                <div className="absolute -inset-3 bg-blue-900/20 rounded-full blur-md" />
                <div className="relative flex items-center gap-2.5 text-white text-xs md:text-sm font-bold uppercase tracking-wider [text-shadow:0_2px_8px_rgba(0,0,0,0.4)]">
                  <svg className="w-4 h-4 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span className="text-white font-extrabold tracking-[0.12em]">
                    Limited Time Offer
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div ref={detailContentRef} className="mx-auto w-full max-w-[1400px] px-6 md:px-8 lg:px-12">
          {isFilteredView && filterProducts.length > 0 ? (
            /* ── Filtered: Show inline product detail view(s) ── */
            <div>
              {/* Multi-product selector — only shown when no sub-category tabs exist */}
              {!hasSubCategories && filterProducts.length > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                  {filterProducts.map((p) => {
                    const slug = Object.keys(products).find((s) => products[s].name === p.name) || "";
                    const isActive = currentProductSlug === slug;
                    return (
                      <button
                        key={p.name}
                        onClick={() => setSelectedProductSlug(slug)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {p.name}
                      </button>
                    );
                  })}
                </div>
              )}

              {currentProductSlug && products[currentProductSlug] ? (
                <div>
                  {/* Breadcrumb */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                    <span className="text-gray-600 font-medium">
                      {filters.find((f) => f.value === activeFilter)?.label}
                    </span>
                    <span className="text-gray-300">/</span>
                    <span className="text-[#18352b] font-medium">{products[currentProductSlug].name}</span>
                  </div>
                  <ProductDetailView product={products[currentProductSlug]} slug={currentProductSlug} />
                </div>
              ) : (
                <p className="text-center text-gray-400 py-16">Product not found.</p>
              )}
            </div>
          ) : (
            /* ── "All" filter: Show card grid ── */
            <div>
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
                      className={`relative h-full ${cat.name === "All Assets Bundle" ? "sm:col-span-2 lg:col-span-1" : ""} ${showTooltip ? "z-50" : "z-[1]"}`}
                    >
                      {cat.name === "All Assets Bundle" ? (
                        /* ── ── CLEAN BUNDLE CARD ── ── */
                        <div
                          onClick={() => handleCardClick(cat)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(cat); } }}
                          role="button"
                          tabIndex={0}
                          className="group relative bg-white border-2 border-amber-200/70 rounded-2xl px-5 pt-5 pb-5 transition-all duration-300 flex flex-col h-full shadow-md hover:shadow-xl hover:shadow-amber-200/20 hover:-translate-y-1.5 hover:border-amber-300 overflow-hidden cursor-pointer"
                        >
                          {/* Simple Best Value tag */}
                          <div className="absolute top-0 right-0">
                            <div className="bg-amber-500 text-white text-[8px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-bl-xl rounded-tr-xl">
                              Best Value
                            </div>
                          </div>

                          <div className="flex flex-col flex-1">
                            {/* Top: Icon + Heading */}
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-amber-100 flex items-center justify-center">
                                <cat.icon size={32} className="text-amber-600" />
                              </div>
                              <div>
                                <h3 className="text-[15px] md:text-[17px] font-bold text-[#18352b] leading-tight">
                                  {cat.name}
                                </h3>
                                <p className="text-[10px] text-amber-600 font-medium mt-0.5">
                                  22 Premium Assets
                                </p>
                              </div>
                            </div>

                            {/* Content area */}
                            <div className="flex flex-1 flex-col mt-4">
                              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                                {cat.desc}
                              </p>

                              {/* "View All" link */}
                              <div className="flex justify-end mt-auto pt-3 pb-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setBundleListOpen(true);
                                  }}
                                  className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors"
                                >
                                  View all {categories.length - 1} products
                                  <ArrowRight size={12} />
                                </button>
                              </div>
                            </div>

                            {/* Bottom: Price + Buy Now */}
                            <div className="flex items-center justify-between mt-auto pt-5 border-t border-amber-100">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-400 line-through">$10,599</span>
                                  <span className="inline-flex items-center bg-green-100 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded">50% OFF</span>
                                </div>
                                <span className="text-xl md:text-2xl font-bold text-amber-600">$5,299</span>
                                <span className="text-[9px] text-gray-400 mt-0.5">One-time · Lifetime access</span>
                              </div>
                              <Link
                                href={`/verify?product=${cat.href.split("/").pop()}&price=${cat.price}`}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 bg-amber-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-amber-600 transition-all duration-200 shadow-md hover:shadow-lg"
                              >
                                Buy Now
                                <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* ── ── STANDARD CARD ── ── */
                        <div
                          onClick={() => handleCardClick(cat)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(cat); } }}
                          role="button"
                          tabIndex={0}
                          className="group bg-white border border-gray-200 rounded-2xl px-5 pt-5 pb-5 transition-all duration-300 flex flex-col h-full relative hover:border-blue-300 hover:shadow-xl hover:shadow-blue-600/8 hover:-translate-y-1.5 cursor-pointer"
                        >
                          <div className="flex flex-col flex-1">
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

                              {/* "See more" — compact, no divider (hidden for cards without details) */}
                              {!CARDS_WITHOUT_SEE_MORE.has(cat.name) && (
                                <div className="flex justify-end mt-auto pt-3 pb-1">
                                <div className="relative">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (window.innerWidth < 640) {
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
                              )}
                            </div>

                            {/* Bottom: Price + Buy Now */}
                            <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-400 line-through">
                                    ${parseInt(cat.price) * 2}
                                  </span>
                                  <span className="inline-flex items-center bg-green-100 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded">50% OFF</span>
                                </div>
                                <span className="text-xl md:text-2xl font-bold text-blue-600">
                                  ${cat.price}
                                </span>
                              </div>
                              <Link
                                href={`/verify?product=${cat.href.split("/").pop()}&price=${cat.price}`}
                                onClick={(e) => e.stopPropagation()}
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
                      )}
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

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* BUNDLE PRODUCT LIST — Full product overview modal */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {bundleListOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setBundleListOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-4 top-[5%] bottom-[5%] md:inset-x-auto md:left-[15%] md:right-[15%] lg:left-[20%] lg:right-[20%] z-50 flex flex-col bg-white rounded-2xl shadow-2xl shadow-amber-900/20 border border-amber-200 overflow-hidden"
          >
            {/* ── Header ── */}
            <div className="flex-shrink-0 bg-gradient-to-r from-amber-50 via-white to-yellow-50 border-b border-amber-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-md">
                  <Gift size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#18352b]">All Assets Bundle</h3>
                  <p className="text-xs text-gray-500">{categories.length - 1} premium assets included</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    <span className="text-xs text-gray-400 line-through">$10,599</span>
                    <span className="text-[9px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">50% OFF</span>
                  </div>
                  <span className="text-base font-bold text-amber-600">$5,299</span>
                </div>
                <Link
                  href="/verify?product=all-assets-bundle&price=5299"
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm font-bold px-4 py-2 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg shadow-amber-500/25"
                >
                  Buy Now
                  <ArrowRight size={14} />
                </Link>
                <button
                  onClick={() => setBundleListOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* ── Scrollable product list ── */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="grid sm:grid-cols-2 gap-3">
                {categories
                  .filter((c) => c.name !== "All Assets Bundle")
                  .map((product, i) => {
                    const Icon = product.icon;
                    return (
                      <motion.div
                        key={product.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/70 border border-gray-100 hover:border-amber-200 hover:bg-amber-50/30 transition-all group"
                      >
                        <div className={`flex-shrink-0 w-9 h-9 rounded-lg ${product.bg} flex items-center justify-center`}>
                          <Icon size={18} className={product.iconColor} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-sm font-bold text-[#18352b]">{product.name}</h4>
                            <span className="text-xs font-semibold text-gray-500 flex-shrink-0">${product.price}</span>
                          </div>
                          <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5 line-clamp-2">
                            {product.desc}
                          </p>
                          <Link
                            href={product.href}
                            className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-600/60 hover:text-amber-700 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            View details
                            <ArrowRight size={10} />
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="flex-shrink-0 bg-gradient-to-r from-amber-50/50 via-white to-yellow-50/50 border-t border-amber-200 px-6 py-3 flex items-center justify-between">
              <p className="text-xs text-gray-400">
                <span className="font-semibold text-[#18352b]">{categories.length - 1} assets</span> — One-time purchase, lifetime access
              </p>
              <Link
                href="/verify?product=all-assets-bundle&price=5299"
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg shadow-amber-500/25"
              >
                Get the Bundle
                <ArrowRight size={12} />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
