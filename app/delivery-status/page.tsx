"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { CheckCircle, Clock, Package, Mail, Cloud, Search, ArrowRight } from "lucide-react";
import { useState } from "react";

const deliverySteps = [
  { icon: CheckCircle, label: "Payment Confirmed", time: "2 minutes ago", status: "completed" as const },
  { icon: Package, label: "Order Processing", time: "1 minute ago", status: "completed" as const },
  { icon: Cloud, label: "SharePoint Upload", time: "In progress", status: "in-progress" as const },
  { icon: Mail, label: "Delivery Email Sent", time: "Pending", status: "pending" as const },
  { icon: Cloud, label: "Access Ready", time: "Pending", status: "pending" as const },
];

export default function DeliveryStatusPage() {
  const [orderId, setOrderId] = useState("");

  return (
    <section className="relative min-h-screen pt-32 pb-16">
      <div className="gradient-orb top-0 left-1/2 -translate-x-1/2" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Delivery <GradientText>Status</GradientText>
            </h1>
            <p className="text-muted-light">
              Track your order delivery in real-time
            </p>
          </div>

          {/* Search order */}
          <GlassCard className="mb-8">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter Order ID (e.g., ORD-...) or Email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl glass text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
              <Button variant="primary">Track</Button>
            </div>
          </GlassCard>

          {/* Delivery Timeline */}
          <GlassCard>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Order Progress</h3>
                <p className="text-sm text-gray-500">Order #ORD-ABC123XYZ</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-400 font-medium flex items-center gap-1">
                  <Clock size={14} />
                  Estimated: ~5 min
                </p>
              </div>
            </div>

            <div className="space-y-0">
              {deliverySteps.map((step, index) => (
                <div key={step.label} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      step.status === "completed" ? "bg-blue-600" :
                      step.status === "in-progress" ? "bg-blue-600 animate-pulse" :
                      "bg-gray-100 border border-gray-200"
                    }`}>
                      <step.icon size={20} className="text-white" />
                    </div>
                    {index < deliverySteps.length - 1 && (
                      <div className={`w-0.5 h-12 ${step.status === "completed" ? "bg-blue-500" : step.status === "in-progress" ? "bg-gradient-to-b from-blue-500 to-gray-200" : "bg-gray-200"}`} />
                    )}
                  </div>
                  <div className="pt-2.5">
                    <p className={`font-medium ${step.status === "completed" || step.status === "in-progress" ? "text-gray-900" : "text-gray-400"}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-500">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Delivery Progress</span>
                <span className="text-gray-900 font-medium">40%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full w-[40%] rounded-full bg-blue-600" />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
