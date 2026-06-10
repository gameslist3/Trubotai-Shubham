"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Check, ArrowRight, Sparkles, Zap, Users, Building2, MessageSquare } from "lucide-react";

const products = [
  {
    name: "TruLead",
    tagline: "AI-Powered Lead Generation",
    icon: Zap,
    gradient: "from-blue-500/20 to-purple-600/10",
    features: ["Smart lead scoring", "Multi-channel outreach", "CRM integration", "Analytics dashboard", "Automated sequences"],
    status: "Active",
  },
  {
    name: "TruSocial",
    tagline: "Social Media Automation",
    icon: MessageSquare,
    gradient: "from-pink-500/20 to-rose-600/10",
    features: ["Content scheduling", "AI content generation", "Analytics & insights", "Multi-platform support", "Team collaboration"],
    status: "Inactive",
  },
  {
    name: "TruCRM",
    tagline: "Customer Relationship Management",
    icon: Users,
    gradient: "from-teal-500/20 to-emerald-600/10",
    features: ["Contact management", "Pipeline tracking", "Automation workflows", "Team collaboration", "Custom reports"],
    status: "Active",
  },
  {
    name: "TruERP",
    tagline: "Enterprise Resource Planning",
    icon: Building2,
    gradient: "from-amber-500/20 to-orange-600/10",
    features: ["Resource planning", "Inventory management", "Financial tracking", "Business intelligence", "HR management"],
    status: "Inactive",
  },
];

export default function DashboardProductsPage() {
  return (
    <div className="flex min-h-screen pt-16">
      <DashboardSidebar />
      
      <div className="flex-1 ml-0 lg:ml-64 p-6 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Your Products</h1>
            <p className="text-muted-light">Manage your lifetime deal products</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${product.gradient} border border-gray-200 flex items-center justify-center`}>
                        <product.icon size={28} className="text-gray-700" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.tagline}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${
                      product.status === "Active"
                        ? "text-green-700 bg-green-50 border-green-200"
                        : "text-gray-500 bg-gray-50 border-gray-200"
                    }`}>
                      {product.status}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {product.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-3 text-sm text-gray-600">
                        <Check size={14} className="text-green-600 flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-3">
                    <Button variant="primary" className="flex-1">
                      {product.status === "Active" ? "Launch App" : "Purchase"}
                      <ArrowRight size={16} />
                    </Button>
                    <Button variant="secondary">Details</Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
