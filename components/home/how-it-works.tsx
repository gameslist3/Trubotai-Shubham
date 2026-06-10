"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Shield, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose",
    desc: "Browse our marketplace of premium digital assets — investor databases, templates, PRDs, and lifetime software.",
    icon: ShoppingBag,
  },
  {
    number: "02",
    title: "Buy",
    desc: "Complete your secure Stripe checkout in minutes. We'll send you a confirmation and access link via email.",
    icon: Shield,
  },
  {
    number: "03",
    title: "Let It Work",
    desc: "Get immediate access via SharePoint with a link sent to your email. Download and start using right away.",
    icon: Sparkles,
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How TruBot AI <span className="text-blue-500">Works</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Three simple steps to access premium digital assets and lifetime software.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
                <step.icon size={32} className="text-blue-500" />
              </div>
              <div className="text-blue-500 text-sm font-semibold mb-2">{step.number}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-sm text-gray-500 max-w-xs mx-auto">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
