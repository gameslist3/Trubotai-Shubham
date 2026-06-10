"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ArrowRight, Download, ShoppingBag, TrendingUp, Clock, Zap, Users } from "lucide-react";

const purchasedProducts = [
  { name: "TruLead", status: "Active", icon: Zap, color: "from-blue-500/10 to-purple-600/5" },
  { name: "TruCRM", status: "Active", icon: Users, color: "from-teal-500/10 to-emerald-600/5" },
];

const recentPurchases = [
  { name: "Investor Database", date: "2 days ago", price: "199", status: "Delivered" },
  { name: "Pitch Deck Bundle", date: "1 week ago", price: "49", status: "Delivered" },
  { name: "UI/UX Templates", date: "2 weeks ago", price: "19", status: "Delivered" },
];

const recommendedAssets = [
  { name: "Grant Database", items: "500+ Grants", price: "49" },
  { name: "PRD Bundle", items: "5 Templates", price: "49" },
  { name: "Architecture Bundle", items: "10 Docs", price: "49" },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen pt-16">
      <DashboardSidebar />

      <div className="flex-1 ml-0 lg:ml-64 p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#18352b]">Dashboard</h1>
              <p className="text-gray-500">Welcome back, John!</p>
            </div>
            <Link href="/marketplace">
              <Button variant="primary" className="rounded-xl">
                Browse Marketplace
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: ShoppingBag, label: "Purchases", value: "12" },
              { icon: Download, label: "Downloads", value: "48" },
              { icon: TrendingUp, label: "Active LTDs", value: "3" },
              { icon: Clock, label: "Member Since", value: "3mo" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 hover:border-blue-200 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-sm">
                  <stat.icon size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#18352b]">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Purchased Products */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#18352b]">Your Products</h3>
              <Link href="/dashboard/products" className="text-sm text-blue-600 hover:text-blue-700">
                View all
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {purchasedProducts.map((product) => (
                <div key={product.name} className={`rounded-2xl p-5 bg-gradient-to-br ${product.color} border border-gray-200`}>
                  <div className="flex items-start justify-between mb-3">
                    <product.icon size={28} className="text-blue-600" />
                    <span className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-200">
                      {product.status}
                    </span>
                  </div>
                  <h4 className="text-[#18352b] font-semibold">{product.name}</h4>
                  <Link href="/dashboard/products" className="text-sm text-blue-600 hover:text-blue-700 mt-2 inline-block">
                    Launch
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Purchases + Recommended */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-[#18352b] mb-4">Recent Purchases</h3>
              <div className="space-y-3">
                {recentPurchases.map((purchase) => (
                  <div key={purchase.name} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-3">
                    <div>
                      <p className="text-sm font-medium text-[#18352b]">{purchase.name}</p>
                      <p className="text-xs text-gray-500">{purchase.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-blue-600">${purchase.price}</span>
                      <p className="text-xs text-green-600">{purchase.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#18352b]">Recommended</h3>
                <Link href="/marketplace" className="text-sm text-blue-600 hover:text-blue-700">
                  Browse all
                </Link>
              </div>
              <div className="space-y-3">
                {recommendedAssets.map((asset) => (
                  <div key={asset.name} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-3">
                    <div>
                      <p className="text-sm font-medium text-[#18352b]">{asset.name}</p>
                      <p className="text-xs text-gray-500">{asset.items}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-blue-600">${asset.price}</span>
                      <Link href={`/verify?product=${asset.name.toLowerCase().replace(/\s+/g, "-")}&price=${asset.price}`}>
                        <Button variant="primary" size="sm" className="rounded-xl">Buy</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
