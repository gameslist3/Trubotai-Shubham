"use client";

import { motion } from "framer-motion";
import { Zap, Clock, Shield, BarChart3 } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Work Smarter",
    desc: "Automate repetitive tasks and focus on high-impact work with AI-powered tools.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Clock,
    title: "Always-On",
    desc: "Your digital assets and tools are available 24/7 via SharePoint with instant delivery.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Shield,
    title: "Less Chaos",
    desc: "Streamlined workflows from purchase to delivery. Email verification, Stripe checkout, and SharePoint in one flow.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: BarChart3,
    title: "Future-Proof",
    desc: "Lifetime access to software products and quarterly updated databases.",
    color: "bg-amber-100 text-amber-600",
  },
];

export function WhyChooseSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-blue-500">TruBot AI</span>?
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            We make it easy to access premium digital assets and lifetime software with a seamless experience.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-4`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
