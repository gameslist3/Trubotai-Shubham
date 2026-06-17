// ── Shared Product Data ──

import {
  Calculator, Briefcase, Database, Rocket, Users, Sparkles,
  Building2, FileText, Home
} from "lucide-react";

export interface ProductData {
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  features: string[];
  whatsIncluded: string[];
  keyBenefits: string[];
  useCases: string[];
  deliverables: string[];
  color: string;
  bgColor: string;
  iconBg: string;
  iconColor: string;
  previewType: "finance" | "investor" | "database" | "leads" | "prompts" | "document" | "realestate";
  note?: string;
}

export const products: Record<string, ProductData> = {
  "finance-templates": {
    name: "Finance Templates",
    tagline: "Investor-ready finance templates to accelerate planning, forecasting, and fundraising.",
    description: "Professional financial planning and analysis templates. Budget, forecast, and report with ease to drive smarter business decisions.",
    longDescription: "Stop building spreadsheets from scratch. Whether you're pitching investors, planning your next quarter, or just trying to understand where your cash is going — you need financial clarity fast. Our finance templates give you a battle-tested starting point, not a blank page.",
    price: 49,
    icon: Calculator,
    features: ["Pre-built financial models", "P&L & cash flow projections", "Budget & forecast sheets", "KPI dashboards", "Valuation calculators", "Investor-ready formatting"],
    whatsIncluded: ["Financial model templates", "Budget planner sheets", "Forecast & projection tools", "KPI dashboard templates", "Editable Excel & Google Sheets files", "Documentation & usage guide"],
    keyBenefits: ["Save 20+ hours of spreadsheet work", "Professional investor-ready format", "Battle-tested by 500+ startups", "Instant download — no setup needed", "Works with Excel & Google Sheets", "Lifetime access & free updates"],
    useCases: ["Startup founders modeling runway & burn rate", "CFOs preparing board-ready financials", "Agencies creating client budget proposals", "Consultants delivering financial analysis", "SMBs building annual budgets & forecasts"],
    deliverables: ["Editable Excel files (.xlsx)", "Google Sheets versions", "PDF documentation guide"],
    color: "from-blue-500/10 to-blue-600/5",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    previewType: "finance",
  },
  "investor-database": {
    name: "Investor Database",
    tagline: "12,000+ verified investors — reach the right VCs and angels for your startup.",
    description: "Curated investor database with detailed funding preferences and contact info. Connect with the right VCs and angels for your startup.",
    longDescription: "Skip months of research. Start conversations that matter. Fundraising isn't just about your pitch — it's about reaching the right investors at the right stage. This database gives you a ready-made, high-quality starting point so you can focus on closing, not hunting.",
    price: 199,
    icon: Briefcase,
    features: ["12,000+ verified investors", "VCs, angels & funds", "Investment preferences data", "Portfolio company details", "Check size ranges", "Geographic & stage filters"],
    whatsIncluded: ["Complete investor database", "VC & angel investor lists", "Fundraising strategy guide", "Email outreach templates", "CRM-ready CSV export", "Quarterly update credits"],
    keyBenefits: ["Skip 3 months of research", "Target investors by stage & sector", "Direct contact information", "Clean, structured format", "Ready for immediate outreach", "CRMs & tools compatible"],
    useCases: ["Pre-seed to Series B fundraising", "Building targeted investor pipelines", "Fundraising consultant deliverables", "Startup ecosystem mapping", "Investor relations management"],
    deliverables: ["Excel spreadsheet (.xlsx)", "CSV export (CRM-ready)", "Investor outreach guide"],
    color: "from-purple-500/10 to-purple-600/5",
    bgColor: "bg-purple-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    previewType: "investor",
  },
  "grant-database": {
    name: "Grant Database",
    tagline: "500+ active grants and funding programs — stop searching, start applying.",
    description: "Comprehensive grant database with eligibility filters and deadline tracking. Find and secure funding for your next big project.",
    longDescription: "Stop digging through scattered websites. Start applying faster. Grants, government programs, and accelerators are some of the best funding sources — but they're buried across dozens of portals, deadlines, and eligibility criteria. We've done the research for you — so you can focus on applying and winning.",
    price: 49,
    icon: Database,
    features: ["500+ active grant listings", "Government & private grants", "Eligibility criteria details", "Application deadlines", "Funding amount ranges", "Direct application links"],
    whatsIncluded: ["Curated grant database", "Government funding programs", "Private foundation grants", "Innovation awards listings", "Deadline tracking calendar", "Application templates & checklists"],
    keyBenefits: ["Find grants you qualify for fast", "Never miss a deadline again", "Government & private funding", "Direct links to apply", "Search & filter by criteria", "Updated quarterly"],
    useCases: ["Early-stage startup grant funding", "R&D tax credit opportunities", "Nonprofit & impact funding", "Deep-tech research programs", "Small business innovation grants"],
    deliverables: ["Searchable Excel database", "Grant tracker template", "Application checklist guide"],
    color: "from-green-500/10 to-green-600/5",
    bgColor: "bg-green-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    previewType: "database",
  },
  "accelerator-database": {
    name: "Accelerator Database",
    tagline: "300+ top accelerators worldwide — apply at the right time with the right program.",
    description: "Top startup accelerator programs with application details and success metrics. Get into the best programs to scale faster.",
    longDescription: "Don't miss the window. Apply at the right time. Accelerators can fast-track your startup with funding, mentorship, and network access — but the biggest challenge is knowing which ones to apply to and when. We've mapped it all for you — so you never miss a relevant opportunity again.",
    price: 49,
    icon: Rocket,
    features: ["300+ global accelerators", "Application cycle dates", "Funding & equity details", "Program duration info", "Industry focus areas", "Alumni success metrics"],
    whatsIncluded: ["Global accelerator database", "YC, Techstars & top programs", "Application timeline calendar", "Program comparison sheets", "Alumni outcome data", "Application tips & guides"],
    keyBenefits: ["Never miss an application window", "Compare programs side-by-side", "Find the right fit for your stage", "Access alumni success data", "Direct application links", "Updated for each cohort cycle"],
    useCases: ["Early-stage accelerator applications", "YC & Techstars preparation", "Niche & regional program discovery", "Accelerator strategy planning", "Portfolio company benchmarking"],
    deliverables: ["Excel database (.xlsx)", "Program comparison sheet", "Application calendar tracker"],
    color: "from-orange-500/10 to-orange-600/5",
    bgColor: "bg-orange-50",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    previewType: "database",
  },
  "1m-leads": {
    name: "Leads (1M)",
    tagline: "1 million verified B2B leads — launch your outreach campaigns today.",
    description: "1 million verified B2B leads across industries and regions. Target, filter, and convert your ideal customer profiles.",
    longDescription: "Launch campaigns today, not next week. Building outreach lists is slow, expensive, and repetitive. This gives you a ready-made database so your team can start sending campaigns immediately.",
    price: 49,
    icon: Users,
    features: ["1M+ verified B2B records", "Company & contact data", "Industry classification", "Decision-maker titles", "Geographic coverage", "CRM-ready export"],
    whatsIncluded: ["1M+ lead database", "Contact names & emails", "Company & industry data", "Job title & seniority info", "CSV & Excel exports", "Data dictionary guide"],
    keyBenefits: ["Skip weeks of list building", "Verified contact information", "Ready for any outreach tool", "B2B focused & segmented", "One-time purchase — use forever", "No subscription or hidden fees"],
    useCases: ["Cold email outreach campaigns", "Sales prospecting & lead gen", "Market validation research", "Growth hacking experiments", "Agency client acquisition"],
    note: "Important: This is a data asset, not the TruLead platform. This is a one-time downloadable lead database — not the full TruLead SaaS product. No login. No search interface. No AI scoring. No CRM sync. If you need automation, enrichment, or workflows — that's TruLead SaaS. If you just need data to move fast — this is it.",
    deliverables: ["CSV file (CRM-ready)", "Excel spreadsheet (.xlsx)", "Data dictionary & usage guide"],
    color: "from-pink-500/10 to-pink-600/5",
    bgColor: "bg-pink-50",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    previewType: "leads",
  },
  "ai-linkedin-prompts": {
    name: "AI LinkedIn Prompts Pack",
    tagline: "100+ AI prompts to create data-driven LinkedIn content that builds authority.",
    description: "AI-powered prompt templates for LinkedIn content creation. Generate engaging posts, comments, and outreach messages that get results.",
    longDescription: "A curated collection of AI prompts engineered to help you write data-driven, insight-led LinkedIn content that positions you as a thought leader — not just another poster. Use it to build a consistent presence, generate post ideas, hooks, and full drafts in minutes.",
    price: 49,
    icon: Sparkles,
    features: ["100+ expert-crafted prompts", "Thought leadership frameworks", "Data-backed post structures", "Engagement hook templates", "Industry-specific prompts", "AI tool compatible"],
    whatsIncluded: ["Complete prompt library", "Post structure frameworks", "Hook & headline templates", "Content calendar guide", "AI tool setup instructions", "Example posts library"],
    keyBenefits: ["Save 5+ hours per week on content", "Post with data & credibility", "Consistent thought leadership", "Works with ChatGPT, Claude & more", "Never stare at a blank page again", "Lifetime access & future updates"],
    useCases: ["Founders building personal brand", "Consultants demonstrating expertise", "B2B sales warming prospects", "Product leaders sharing insights", "Agency partners attracting clients"],
    deliverables: ["Digital prompt pack (PDF)", "AI tool setup guide", "Example post library"],
    color: "from-indigo-500/10 to-indigo-600/5",
    bgColor: "bg-indigo-50",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    previewType: "prompts",
  },
  "architecture-prd": {
    name: "Architecture PRD",
    tagline: "Battle-tested architecture documentation templates — design systems with clarity.",
    description: "Comprehensive architecture documentation templates for system design. Define constraints, trade-offs, and technical decisions with clarity.",
    longDescription: "Stop guessing your system design. Start with a proven structure. Architecture planning is one of the most important steps in building reliable software — but it's also one of the hardest to document clearly. Our templates help you define the system before you build it, so teams can align faster and make better technical decisions.",
    price: 49,
    icon: Building2,
    features: ["System architecture templates", "Component & data flow docs", "Integration specifications", "Security & scalability sections", "Deployment architecture", "ADR templates included"],
    whatsIncluded: ["Architecture documentation template", "System overview framework", "Component & data flow guides", "Security & scalability sections", "Deployment architecture docs", "ADR (Architecture Decision Record) templates"],
    keyBenefits: ["Document architecture in hours", "Consistent team standards", "Investor & stakeholder ready", "Supports all tech stacks", "Reusable for any project", "Saves 2-3 days per project"],
    useCases: ["CTOs designing new systems", "Engineering leads documenting architecture", "Solution architects creating references", "Startup technical co-founders", "Technical due diligence prep"],
    deliverables: ["Editable document template", "Architecture diagram stencils", "ADR template collection"],
    color: "from-teal-500/10 to-teal-600/5",
    bgColor: "bg-teal-50",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    previewType: "document",
  },
  "product-prds": {
    name: "Product PRDs",
    tagline: "Ready-to-use PRD templates — ship better products with clear requirements.",
    description: "Ready-to-use product requirement document templates. Streamline product planning, align stakeholders, and ship with confidence.",
    longDescription: "Stop starting every PRD from a blank page. Writing a solid PRD can take days of senior product time. Our templates give you a proven structure for defining features, aligning stakeholders, and handing clear requirements to design and engineering.",
    price: 39,
    icon: FileText,
    features: ["PRD template collections", "User stories & acceptance criteria", "Feature specification sections", "Priority & roadmap matrices", "Stakeholder alignment guides", "SaaS & app optimized"],
    whatsIncluded: ["Complete PRD templates", "User story frameworks", "Acceptance criteria guides", "Priority matrix templates", "Stakeholder communication docs", "Best practices handbook"],
    keyBenefits: ["Save 2-5 days per PRD", "Industry-standard structure", "Team-wide consistency", "From spec to hand-off ready", "Works for SaaS, apps & more", "Adaptable to any methodology"],
    useCases: ["Product managers writing specs", "Founders defining product requirements", "Consultants delivering PRDs", "Engineering teams receiving specs", "Startup product documentation"],
    deliverables: ["Editable PRD templates (.docx)", "Google Docs versions", "Best practices guide"],
    color: "from-amber-500/10 to-amber-600/5",
    bgColor: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    previewType: "document",
  },
  "real-estate": {
    name: "Real Estate",
    tagline: "Complete real estate analysis toolkit — evaluate properties and close deals faster.",
    description: "Complete real estate analysis templates and property calculators. Evaluate investments, manage portfolios, and close deals faster.",
    longDescription: "Complete real estate analysis templates and property calculators. Evaluate investments, manage portfolios, and close deals faster with our comprehensive real estate toolkit. Includes property analysis, ROI calculators, cash flow models, and portfolio tracking dashboards.",
    price: 49,
    icon: Home,
    features: ["Property analysis calculators", "ROI & cash flow models", "Portfolio tracking dashboards", "Expense management sheets", "Comparative market analysis", "Investment scorecards"],
    whatsIncluded: ["Real estate analysis templates", "Property valuation calculators", "ROI & cash flow models", "Portfolio tracker dashboard", "Expense management sheets", "Investment scorecard tools"],
    keyBenefits: ["Analyze deals in minutes", "Professional client presentations", "Track entire portfolio in one place", "Data-driven investment decisions", "Works for residential & commercial", "Instant download, lifetime access"],
    useCases: ["Real estate investors analyzing properties", "Agents presenting investment analyses", "Property managers tracking portfolios", "Brokers evaluating deal opportunities", "Individuals planning real estate purchases"],
    deliverables: ["Editable Excel templates", "Google Sheets versions", "Usage documentation guide"],
    color: "from-rose-500/10 to-rose-600/5",
    bgColor: "bg-rose-50",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    previewType: "realestate",
  },
};

export const fallbackProduct: ProductData = {
  name: "Digital Asset",
  tagline: "Premium digital asset for your business needs.",
  description: "High-quality premium digital asset.",
  longDescription: "A premium digital asset designed to help you grow your business.",
  price: 49,
  icon: FileText,
  features: ["Instant digital delivery", "Lifetime access", "Premium quality"],
  whatsIncluded: ["Digital file", "Documentation", "License"],
  keyBenefits: ["Instant access", "Lifetime use", "Premium quality"],
  useCases: ["Business growth", "Professional use", "Personal use"],
  deliverables: ["Digital file", "Documentation"],
  color: "from-blue-500/10 to-blue-600/5",
  bgColor: "bg-blue-50",
  iconBg: "bg-blue-100",
  iconColor: "text-blue-600",
  previewType: "document",
};

// ── Filter category → product slug mapping ──
export const filterToSlugs: Record<string, string[]> = {
  "finance": ["finance-templates"],
  "investor": ["investor-database"],
  "database": ["grant-database", "accelerator-database", "1m-leads"],
  "template": ["architecture-prd", "product-prds"],
  "ai": ["ai-linkedin-prompts"],
  "real-estate": ["real-estate"],
};

export function getProductsByFilter(filter: string): ProductData[] {
  const slugs = filterToSlugs[filter] || [];
  return slugs.map((slug) => products[slug]).filter(Boolean);
}
