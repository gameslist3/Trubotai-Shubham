"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Transform Your Business with Intelligent{" "}
              <span className="text-blue-500">AI Solutions</span>
            </h1>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-xl">
              Powerful AI agents, voice bots, chatbots, and business solutions designed to revolutionize how enterprises operate in 2025 and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/marketplace">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-medium shadow-md shadow-blue-500/20">
                  Buy Digital Assets
                  <ArrowRight size={18} className="ml-1" />
                </Button>
              </Link>
              <Link href="/lifetime-deals">
                <Button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-md text-sm font-medium">
                  View Lifetime Deals
                </Button>
              </Link>
            </div>
            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
              {[
                { value: "85%", label: "Reduction in Manual Tasks" },
                { value: "$3.2M", label: "Average Annual Savings" },
                { value: "93%", label: "Customer Retention Rate" },
                { value: "250+", label: "AI Solutions Offered" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - placeholder for visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="bg-gradient-to-br from-blue-50 to-white border border-gray-200 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">TruBot AI</p>
                  <p className="text-sm text-gray-400">Intelligent AI Platform</p>
                </div>
              </div>
              <div className="space-y-3">
                {["AI-Powered Lead Generation", "Smart Customer Support", "Automated Workflows"].map((item, i) => (
                  <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                      {i + 1}
                    </div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
