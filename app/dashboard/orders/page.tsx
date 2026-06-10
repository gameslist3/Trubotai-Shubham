"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Search, Download } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";

const orders = [
  { id: "ORD-ABC123", product: "Investor Database", type: "Asset", date: "2024-06-07", amount: 199, status: "Delivered", invoice: true },
  { id: "ORD-DEF456", product: "Pitch Deck Bundle", type: "Asset", date: "2024-06-01", amount: 49, status: "Delivered", invoice: true },
  { id: "ORD-GHI789", product: "TruLead", type: "LTD", date: "2024-05-28", amount: 799, status: "Active", invoice: true },
  { id: "ORD-JKL012", product: "TruCRM", type: "LTD", date: "2024-05-28", amount: 999, status: "Active", invoice: true },
  { id: "ORD-MNO345", product: "UI/UX Templates", type: "Asset", date: "2024-05-20", amount: 19, status: "Delivered", invoice: true },
  { id: "ORD-PQR678", product: "Finance Templates", type: "Asset", date: "2024-05-15", amount: 49, status: "Delivered", invoice: true },
];

const filters = ["All", "Assets", "LTD", "Delivered", "Active"];

export default function DashboardOrdersPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = orders.filter((o) => {
    const matchesSearch = o.product.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === "All" || 
      o.type === activeFilter || o.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex min-h-screen pt-16">
      <DashboardSidebar />
      
      <div className="flex-1 ml-0 lg:ml-64 p-6 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Orders</h1>
              <p className="text-muted-light">View and manage all your purchases</p>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex-1 min-w-[200px] relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-500/50 transition-all"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    activeFilter === f ? "bg-blue-600 text-white" : "glass text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <GlassCard className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-muted font-medium">Order ID</th>
                  <th className="text-left py-4 px-4 text-muted font-medium">Product</th>
                  <th className="text-left py-4 px-4 text-muted font-medium">Type</th>
                  <th className="text-left py-4 px-4 text-muted font-medium">Date</th>
                  <th className="text-right py-4 px-4 text-muted font-medium">Amount</th>
                  <th className="text-left py-4 px-4 text-muted font-medium">Status</th>
                  <th className="text-center py-4 px-4 text-muted font-medium">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 font-mono text-xs text-muted-light">{order.id}</td>
                    <td className="py-4 px-4 text-gray-900 font-medium">{order.product}</td>
                    <td className="py-4 px-4">
                      <span className={`text-xs px-2 py-1 rounded-md ${
                        order.type === "LTD" ? "text-blue-600 bg-blue-50" : "text-teal-600 bg-teal-50"
                      }`}>{order.type}</span>
                    </td>
                    <td className="py-4 px-4 text-muted-light">{formatDate(order.date)}</td>
                    <td className="py-4 px-4 text-right text-gray-900 font-medium">{formatPrice(order.amount)}</td>
                    <td className="py-4 px-4">
                      <span className={`text-xs font-medium ${
                        order.status === "Delivered" ? "text-green-400" :
                        order.status === "Active" ? "text-blue-400" : "text-muted"
                      }`}>{order.status}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {order.invoice && (
                        <button className="text-gray-400 hover:text-gray-700 transition-colors">
                          <Download size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-light">No orders found</p>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
