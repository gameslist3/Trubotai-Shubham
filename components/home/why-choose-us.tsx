"use client";

import { motion } from "framer-motion";
import { Zap, Shield, HeadphonesIcon, Star, CheckCircle } from "lucide-react";

const features = [
  { icon: Zap, title: "Instant Delivery", desc: "Get your assets immediately after purchase via SharePoint. No waiting.", color: "bg-blue-100 text-blue-600" },
  { icon: Shield, title: "Secure Payments", desc: "All transactions are processed securely through Stripe with full encryption.", color: "bg-purple-100 text-purple-600" },
  { icon: HeadphonesIcon, title: "24/7 Support", desc: "Our team is always available to help you with any questions or issues.", color: "bg-green-100 text-green-600" },
  { icon: Star, title: "Premium Quality", desc: "Every asset is vetted and curated to ensure the highest quality standards.", color: "bg-amber-100 text-amber-600" },
  { icon: CheckCircle, title: "30-Day Guarantee", desc: "Not satisfied? Get a full refund within 30 days. No questions asked.", color: "bg-teal-100 text-teal-600" },
];

export function WhyChooseUsSection() {
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
            Why Businesses Choose <span className="text-blue-500">TruBot AI</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Thousands of teams trust TruBotAI for their digital asset needs.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {features.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="text-center p-5 border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-200 transition-all"
            >
              <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mx-auto mb-3`}>
                <item.icon size={22} />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
