"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator, Briefcase, Database, Rocket, Users, Sparkles, Building2, FileText, Home, ArrowRight } from "lucide-react";

const categories = [
  { name: "Finance Templates", icon: Calculator, price: "49", href: "/marketplace/finance-templates", bg: "bg-blue-100", iconColor: "text-blue-600", desc: "Professional financial planning and analysis templates. Budget, forecast, and report with ease to drive smarter business decisions." },
  { name: "Investor", icon: Briefcase, price: "199", href: "/marketplace/investor-database", bg: "bg-purple-100", iconColor: "text-purple-600", desc: "Curated investor database with detailed funding preferences and contact info. Connect with the right VCs and angels for your startup." },
  { name: "Grant", icon: Database, price: "49", href: "/marketplace/grant-database", bg: "bg-green-100", iconColor: "text-green-600", desc: "Comprehensive grant database with eligibility filters and deadline tracking. Find and secure funding for your next big project." },
  { name: "Accelerator", icon: Rocket, price: "49", href: "/marketplace/accelerator-database", bg: "bg-orange-100", iconColor: "text-orange-600", desc: "Top startup accelerator programs with application details and success metrics. Get into the best programs to scale faster." },
  { name: "Leads (1M)", icon: Users, price: "49", href: "/marketplace/1m-leads", bg: "bg-pink-100", iconColor: "text-pink-600", desc: "1 million verified B2B leads across industries and regions. Target, filter, and convert your ideal customer profiles." },
  { name: "AI LinkedIn Prompts Pack", icon: Sparkles, price: "49", href: "/marketplace/ai-linkedin-prompts", bg: "bg-indigo-100", iconColor: "text-indigo-600", desc: "AI-powered prompt templates for LinkedIn content creation. Generate engaging posts, comments, and outreach messages that get results." },
  { name: "Architecture PRD", icon: Building2, price: "49", href: "/marketplace/architecture-prd", bg: "bg-teal-100", iconColor: "text-teal-600", desc: "Comprehensive architecture documentation templates for system design. Define constraints, trade-offs, and technical decisions with clarity." },
  { name: "Product PRDs", icon: FileText, price: "39", href: "/marketplace/product-prds", bg: "bg-amber-100", iconColor: "text-amber-600", desc: "Ready-to-use product requirement document templates. Streamline product planning, align stakeholders, and ship with confidence." },
  { name: "Real Estate", icon: Home, price: "49", href: "/marketplace/real-estate", bg: "bg-rose-100", iconColor: "text-rose-600", desc: "Complete real estate analysis templates and property calculators. Evaluate investments, manage portfolios, and close deals faster." },
];

export default function MarketplacePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
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
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Marketplace</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover premium digital assets to accelerate your business growth — from investor databases and B2B leads to financial templates and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-8 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/verify?product=${cat.href.split("/").pop()}&price=${cat.price}`} className="block h-full">
                  <div className="group relative h-full bg-white border border-gray-200 rounded-2xl p-6 md:p-7 transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-600/8 hover:-translate-y-1.5 flex flex-col">
                    {/* Top section: Icon + Heading */}
                    <div className="flex items-start gap-4">
                      <div className={`relative flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl ${cat.bg} flex items-center justify-center shadow-sm group-hover:shadow-md transition-all`}>
                        <cat.icon size={26} className={`${cat.iconColor} transition-colors`} />
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-[#18352b] mt-3 md:mt-4 group-hover:text-blue-700 transition-colors leading-tight">
                        {cat.name}
                      </h3>
                    </div>

                    {/* Middle section: Description (pushes bottom down) */}
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed mt-5 mb-0 flex-1">
                      {cat.desc}
                    </p>

                    {/* Bottom section: Price + Buy Now (sticky to bottom) */}
                    <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
                      <span className="text-xl md:text-2xl font-bold text-blue-600">${cat.price}</span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
                        Buy Now
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>

                    {/* Hover accent bar */}
                    <div className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
