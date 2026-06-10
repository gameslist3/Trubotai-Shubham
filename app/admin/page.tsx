"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { TrendingUp, ShoppingBag, Users, Package, DollarSign, Plus, Search, MoreHorizontal, Eye } from "lucide-react";

const stats = [
  { icon: DollarSign, label: "Revenue", value: "$24,589", change: "+12.5%", positive: true },
  { icon: ShoppingBag, label: "Sales", value: "342", change: "+8.2%", positive: true },
  { icon: Package, label: "Orders", value: "156", change: "+5.1%", positive: true },
  { icon: Users, label: "Customers", value: "89", change: "+15.3%", positive: true },
  { icon: TrendingUp, label: "Assets Sold", value: "523", change: "+11.7%", positive: true },
];

const recentOrders = [
  { id: "ORD-ABC123", customer: "alex@example.com", product: "Investor Database", amount: "$199", status: "Completed", date: "2 min ago" },
  { id: "ORD-DEF456", customer: "sarah@agency.com", product: "TruLead LTD", amount: "$799", status: "Processing", date: "15 min ago" },
  { id: "ORD-GHI789", customer: "marcus@startup.io", product: "Pitch Deck Bundle", amount: "$49", status: "Completed", date: "1 hour ago" },
  { id: "ORD-JKL012", customer: "emily@corp.com", product: "TruCRM LTD", amount: "$999", status: "Pending", date: "3 hours ago" },
];

const products = [
  { name: "Investor Database", sales: 45, revenue: "$8,955", status: "Active" },
  { name: "TruLead", sales: 32, revenue: "$25,568", status: "Active" },
  { name: "Pitch Deck Bundle", sales: 28, revenue: "$1,372", status: "Active" },
  { name: "Finance Templates", sales: 22, revenue: "$1,078", status: "Active" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <section className="relative min-h-screen pt-24 pb-16">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin <GradientText>Dashboard</GradientText></h1>
              <p className="text-muted-light">Manage your marketplace and orders</p>
            </div>
            <Button variant="primary">
              <Plus size={18} />
              Add Asset
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
            {["Overview", "Marketplace", "Orders", "Customers"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.toLowerCase() ? "bg-blue-600 text-white" : "glass text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {stats.map((stat) => (
              <GlassCard key={stat.label} className="py-4 md:py-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                    <stat.icon size={18} className="text-white" />
                  </div>
                  <span className={`text-xs font-medium ${stat.positive ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </GlassCard>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-gray-500">{order.id}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          order.status === "Completed" ? "text-green-700 bg-green-50" :
                          order.status === "Processing" ? "text-blue-700 bg-blue-50" :
                          "text-yellow-700 bg-yellow-50"
                        }`}>{order.status}</span>
                      </div>
                      <p className="text-sm text-gray-900 font-medium truncate">{order.product}</p>
                      <p className="text-xs text-gray-500">{order.customer}</p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <p className="text-sm font-semibold text-gray-900">{order.amount}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Products */}
            <GlassCard>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
                <Button variant="ghost" size="sm">Manage</Button>
              </div>
              <div className="space-y-3">
                {products.map((product) => (
                  <div key={product.name} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <Package size={18} className="text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-3">
                      <p className="text-sm font-semibold gradient-text">{product.revenue}</p>
                      <span className="text-xs text-green-600">{product.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Marketplace Management */}
          <GlassCard className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Marketplace Management</h3>
              <div className="flex gap-3">
                <div className="relative">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    placeholder="Search assets..."
                    className="pl-10 pr-4 py-2 rounded-xl glass text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-500/50 transition-all"
                  />
                </div>
                <Button variant="primary" size="sm">
                  <Plus size={16} />
                  Add New
                </Button>
              </div>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-3 text-muted font-medium">Product</th>
                  <th className="text-left py-3 px-3 text-muted font-medium">Category</th>
                  <th className="text-right py-3 px-3 text-muted font-medium">Price</th>
                  <th className="text-right py-3 px-3 text-muted font-medium">Sales</th>
                  <th className="text-left py-3 px-3 text-muted font-medium">Status</th>
                  <th className="text-center py-3 px-3 text-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Investor Database", cat: "Database", price: "$199", sales: 45, status: "Published" },
                  { name: "Finance Templates", cat: "Templates", price: "$49", sales: 22, status: "Published" },
                  { name: "Grant Database", cat: "Database", price: "$49", sales: 18, status: "Draft" },
                  { name: "UI/UX Bundle", cat: "Bundle", price: "$49", sales: 15, status: "Published" },
                ].map((item) => (
                  <tr key={item.name} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-3 text-gray-900 font-medium">{item.name}</td>
                    <td className="py-3 px-3 text-gray-500">{item.cat}</td>
                    <td className="py-3 px-3 text-right text-gray-900">{item.price}</td>
                    <td className="py-3 px-3 text-right text-gray-900">{item.sales}</td>
                    <td className="py-3 px-3">
                      <span className={`text-xs px-2 py-1 rounded-md ${
                        item.status === "Published" ? "text-green-700 bg-green-50" : "text-yellow-700 bg-yellow-50"
                      }`}>{item.status}</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-700">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-700">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
