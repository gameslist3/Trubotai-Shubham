"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, Star, Zap, Shield, Users, MessageSquare, Building2, Coins, Crown, PiggyBank, Infinity, Gift, Percent, RefreshCw } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const products = [
  {
    id: "trulead",
    name: "TruLead",
    tagline: "AI-Powered Lead Generation Engine",
    description: "Generate, score, and convert high-quality leads with AI-driven automation.",
    icon: Zap,
    features: [
      "AI-powered lead scoring & prioritization",
      "Multi-channel outreach (Email, LinkedIn, Phone)",
      "Smart CRM integration & sync",
      "Real-time analytics & reporting dashboard",
      "Automated follow-up sequences",
      "Lead enrichment & data validation",
    ],
    prices: { monthly: 49, annual: 490, lifetime: 799, hasStarter: false },
    color: "from-blue-500/10 to-blue-600/5",
    popular: false,
  },
  {
    id: "trusocial",
    name: "TruSocial",
    tagline: "Social Media Command Center",
    description: "Schedule, create, and analyze social media content across all platforms.",
    icon: MessageSquare,
    features: [
      "AI content generation & scheduling",
      "Multi-platform publishing (7+ platforms)",
      "Advanced analytics & audience insights",
      "Team collaboration & approval workflows",
      "Content calendar & asset library",
      "Competitor analysis & monitoring",
    ],
    prices: { monthly: 39, annual: 390, lifetime: 699, hasStarter: true, starterPrice: 399 },
    color: "from-pink-500/10 to-pink-600/5",
    popular: true,
  },
  {
    id: "trucrm",
    name: "TruCRM",
    tagline: "Customer Relationship Management",
    description: "Manage contacts, pipelines, and automate your entire sales process.",
    icon: Users,
    features: [
      "Contact & deal management",
      "Visual pipeline tracking & forecasting",
      "Email & calendar integration",
      "Automated workflow builder",
      "Custom reports & dashboards",
      "Mobile app with offline mode",
    ],
    prices: { monthly: 59, annual: 590, lifetime: 999, hasStarter: false },
    color: "from-teal-500/10 to-teal-600/5",
    popular: false,
  },
  {
    id: "truerp",
    name: "TruERP",
    tagline: "Enterprise Resource Planning",
    description: "Comprehensive ERP solution for resource planning, inventory, and financials.",
    icon: Building2,
    features: [
      "Resource planning & allocation",
      "Inventory & supply chain management",
      "Financial accounting & reporting",
      "Business intelligence & analytics",
      "HR & workforce management",
      "Multi-entity & multi-currency support",
    ],
    prices: { monthly: 99, annual: 990, lifetime: 1999, hasStarter: false },
    color: "from-amber-500/10 to-amber-600/5",
    popular: false,
  },
];

const savingsData = [
  { period: "1 Year", subscription: "$588 - $1,188", lifetime: "$699 - $1,999", savings: "Up to 40%" },
  { period: "3 Years", subscription: "$1,764 - $3,564", lifetime: "$699 - $1,999", savings: "Up to 65%" },
  { period: "5 Years", subscription: "$2,940 - $5,940", lifetime: "$699 - $1,999", savings: "Up to 75%" },
];

export default function LifetimeDealsPage() {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-sm text-blue-700 mb-6">
              <Sparkles size={14} className="text-blue-500" />
              Limited Time Offer
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#18352b]">
              Lifetime Access To{" "}
              <span className="text-blue-600">TruBotAI Products</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Own powerful business software forever. No recurring subscriptions.
              No hidden fees. Just one payment and it&apos;s yours for life.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { icon: Star, label: "One-Time Payment" },
                { icon: Zap, label: "Instant Access" },
                { icon: Shield, label: "Lifetime Updates" },
                { icon: Users, label: "Priority Support" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm text-gray-500">
                  <item.icon size={16} className="text-blue-500" />
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                id={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {product.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold shadow-md shadow-blue-600/30">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`h-full bg-white border ${product.popular ? "border-blue-300 shadow-lg shadow-blue-600/10" : "border-gray-200"} rounded-2xl p-6 flex flex-col transition-all hover:shadow-md`}>
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${product.color} border border-gray-100 flex items-center justify-center`}>
                      <product.icon size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#18352b]">{product.name}</h3>
                      <p className="text-xs text-gray-500">{product.tagline}</p>
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm mb-6">{product.description}</p>

                  {/* Pricing */}
                  <div className="space-y-2.5 mb-6">
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Monthly</span>
                        <span className="text-[#18352b] font-semibold">{formatPrice(product.prices.monthly)}/mo</span>
                      </div>
                    </div>
                    {product.prices.hasStarter && (
                      <div className="border border-violet-200 rounded-xl p-3.5 bg-violet-50/50">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-violet-700 font-medium">
                            <Crown size={14} className="inline mr-1" />
                            Starter LTD
                          </span>
                          <span className="text-lg font-bold text-blue-600">${product.prices.starterPrice?.toLocaleString() || ""}</span>
                        </div>
                      </div>
                    )}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Annual</span>
                        <span className="text-[#18352b] font-semibold">{formatPrice(product.prices.annual)}/yr</span>
                      </div>
                    </div>
                    <div className="border border-blue-200 rounded-xl p-3.5 bg-blue-50/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-700 font-medium">
                          {product.prices.hasStarter ? "Pro " : ""}Lifetime
                        </span>
                        <span className="text-xl font-bold text-blue-600">${product.prices.lifetime.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-xs text-amber-600/70">
                        <span className="text-green-600">✓</span> One-time payment
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {product.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <Check size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href={`/verify?product=${product.id}&type=ltd`}>
                    <Button variant="primary" className="w-full rounded-xl">
                      Buy Lifetime Access
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Lifetime? */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent" />
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#18352b]">
              Why Choose <span className="text-blue-600">Lifetime?</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              See exactly how much you save with a one-time lifetime investment vs. recurring subscriptions.
            </p>
          </motion.div>

          {/* Savings Calculator */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="grid md:grid-cols-3 gap-6">
              {savingsData.map((item, i) => (
                <motion.div
                  key={item.period}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:border-blue-200 transition-all">
                    <div className="text-sm font-semibold text-blue-600 bg-blue-50 inline-block px-3 py-1 rounded-full mb-5">
                      {item.period}
                    </div>
                    <div className="mb-1">
                      <p className="text-xs text-gray-400 mb-0.5">Subscription</p>
                      <p className="text-lg font-semibold text-[#18352b]">{item.subscription}</p>
                    </div>
                    <div className="w-8 h-px bg-gray-200 mx-auto my-3" />
                    <div className="mb-5">
                      <p className="text-xs text-gray-400 mb-0.5">Lifetime (one-time)</p>
                      <p className="text-lg font-semibold text-blue-600">{item.lifetime}</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl py-3 px-4 shadow-sm">
                      <p className="text-xs text-green-100 font-medium">You Save</p>
                      <p className="text-xl font-bold text-white">{item.savings}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Savings Meter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-2xl mx-auto text-center hover:border-blue-200 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <PiggyBank size={22} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-[#18352b] mb-1">Total Savings Over 5 Years</h3>
                <p className="text-sm text-gray-500 mb-8">One lifetime payment vs. monthly subscriptions</p>

                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Subscription</span>
                    <span className="text-red-500 font-medium">$2,940 – $5,940</span>
                  </div>
                  <div className="relative h-10 bg-gray-100 rounded-xl overflow-hidden mb-4">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-red-200 rounded-xl"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-end pr-4"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "30%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.6 }}
                    >
                      <span className="text-white text-xs font-bold drop-shadow-sm">Lifetime</span>
                    </motion.div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Lifetime (one-time)</span>
                    <span className="text-blue-600 font-medium">$699 – $1,999</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl py-5 px-6 shadow-lg shadow-green-500/20">
                  <p className="text-white/80 text-sm mb-0.5">You save</p>
                  <p className="text-4xl font-bold text-white">Up to 75%</p>
                  <p className="text-green-100 text-sm mt-1">That&apos;s $3,900+ per product</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Feature Grid */}
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {[
                { icon: Infinity, title: "Own It Forever", desc: "No expirations, no renewals. Pay once and own the software for life.", color: "from-blue-500 to-blue-600" },
                { icon: Gift, title: "All Updates Included", desc: "Get every feature update, security patch, and improvement at no extra cost.", color: "from-purple-500 to-purple-600" },
                { icon: Percent, title: "70%+ Cheaper", desc: "Compared to 5 years of monthly subscriptions. The math is clear.", color: "from-green-500 to-green-600" },
                { icon: RefreshCw, title: "30-Day Guarantee", desc: "Not satisfied? Full refund within 30 days. No questions asked.", color: "from-orange-500 to-orange-600" },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-200 rounded-2xl p-5 text-center hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4 shadow-md`}>
                    <item.icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-[#18352b] font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
