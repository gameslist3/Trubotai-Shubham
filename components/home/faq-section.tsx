"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What is a Lifetime Deal (LTD)?",
    a: "A Lifetime Deal means you pay once and get access to the product forever. No recurring subscriptions, no hidden fees. You own the software for life, including all future updates during the active support period.",
  },
  {
    q: "How do I access my purchased assets?",
    a: "After your purchase is verified, you'll receive instant access via SharePoint. You can download all your assets directly or access them through your dashboard. Delivery typically takes less than 5 minutes.",
  },
  {
    q: "Is my payment information secure?",
    a: "Absolutely. We use Stripe for all payment processing, which is PCI-DSS compliant and uses industry-standard encryption. We never store your credit card information on our servers.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes! We offer a 30-day money-back guarantee on all digital assets and LTD products. If you're not satisfied, contact our support team and we'll process your refund promptly.",
  },
  {
    q: "How often are the databases updated?",
    a: "Our databases are updated quarterly to ensure accuracy. The Investor Database, Grant Database, and Lead Database are refreshed every 90 days with new verified entries.",
  },
  {
    q: "How does the purchase process work?",
    a: "When you click 'Buy Now', you'll be redirected to our secure Stripe checkout to complete your payment. After the payment is successful, you'll receive two emails — a purchase confirmation and a separate email with your SharePoint access link to download your assets.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 md:py-28" id="faq">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Frequently Asked <span className="text-blue-500">Questions</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Everything you need to know about our marketplace and products.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <div
                className={`bg-white border border-gray-200 rounded-lg p-5 cursor-pointer transition-all duration-300 hover:border-blue-200 ${openIndex === index ? "border-blue-300 shadow-sm" : ""}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-900 font-medium text-base md:text-lg pr-4">{faq.q}</h3>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0 ${openIndex === index ? "bg-blue-100 text-blue-500" : "bg-gray-100 text-gray-400"}`}>
                    {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed pt-4 border-t border-gray-100 mt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
