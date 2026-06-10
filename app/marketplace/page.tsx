"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calculator, Users, Database, Rocket, ArrowRight } from "lucide-react";

const categories = [
  { name: "Finance Templates", icon: Calculator, price: "49", href: "/marketplace/finance-templates", bg: "bg-blue-100", iconColor: "text-blue-600" },
  { name: "Investor", icon: Users, price: "199", href: "/marketplace/investor-database", bg: "bg-purple-100", iconColor: "text-purple-600" },
  { name: "Grant", icon: Database, price: "49", href: "/marketplace/grant-database", bg: "bg-green-100", iconColor: "text-green-600" },
  { name: "Accelerator", icon: Rocket, price: "49", href: "/marketplace/accelerator-database", bg: "bg-orange-100", iconColor: "text-orange-600" },
  { name: "Leads (1M)", icon: Users, price: "49", href: "/marketplace/1m-leads", bg: "bg-pink-100", iconColor: "text-pink-600" },
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
                <Link href={`/verify?product=${cat.href.split("/").pop()}&price=${cat.price}`}>
                  <div className="group relative h-full bg-white border border-gray-200 rounded-2xl p-6 md:p-7 transition-all duration-300 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-600/8 hover:-translate-y-1.5">
                    <div className="flex items-start gap-5">
                      {/* Icon */}
                      <div className={`relative flex-shrink-0 w-16 h-16 rounded-2xl ${cat.bg} flex items-center justify-center shadow-sm group-hover:shadow-md transition-all`}>
                        <cat.icon size={28} className={`${cat.iconColor} transition-colors`} />
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-[#18352b] mb-3 group-hover:text-blue-700 transition-colors">
                          {cat.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-blue-600">${cat.price}</span>
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
                            Buy Now
                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
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
