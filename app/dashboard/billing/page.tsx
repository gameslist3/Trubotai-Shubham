"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { CreditCard, Download, CheckCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

const invoices = [
  { id: "INV-001", date: "2024-06-07", amount: 199, status: "Paid", product: "Investor" },
  { id: "INV-002", date: "2024-06-01", amount: 49, status: "Paid", product: "Pitch Deck Bundle" },
  { id: "INV-003", date: "2024-05-28", amount: 799, status: "Paid", product: "TruLead LTD" },
  { id: "INV-004", date: "2024-05-28", amount: 999, status: "Paid", product: "TruCRM LTD" },
];

export default function DashboardBillingPage() {
  return (
    <div className="flex min-h-screen pt-16">
      <DashboardSidebar />
      
      <div className="flex-1 ml-0 lg:ml-64 p-6 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Billing</h1>
            <p className="text-muted-light">Manage your payment methods and invoices</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <GlassCard>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
                  <Button variant="secondary" size="sm">
                    <CreditCard size={14} />
                    Update
                  </Button>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-12 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <CreditCard size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">Visa ending in 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/28</p>
                  </div>
                  <CheckCircle size={18} className="text-green-600 ml-auto" />
                </div>
              </GlassCard>

              <GlassCard className="mt-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Invoice History</h3>
                </div>
                <div className="space-y-3">
                  {invoices.map((inv) => (
                    <div key={inv.id} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{inv.product}</p>
                        <p className="text-xs text-gray-500">{inv.id} • {formatDate(inv.date)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">${inv.amount}</p>
                          <p className="text-xs text-green-600">{inv.status}</p>
                        </div>
                        <button className="p-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-700">
                          <Download size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            <div>
              <GlassCard>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Summary</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Total Spent</p>
                    <p className="text-3xl font-bold gradient-text">$2,046</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Active Products</p>
                    <p className="text-2xl font-bold text-gray-900">4</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Next Invoice</p>
                    <p className="text-2xl font-bold text-gray-900">N/A</p>
                    <p className="text-xs text-gray-500 mt-1">All purchases are one-time</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
