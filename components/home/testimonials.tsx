"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The investor database was a game-changer for our seed round. We connected with 50+ investors in the first week alone.",
    author: "Alex Chen",
    role: "Founder, TechFlow AI",
    initials: "AC",
  },
  {
    quote: "TruERP transformed how we manage resources across our agency. The lifetime deal pricing made it an absolute no-brainer.",
    author: "Sarah Mitchell",
    role: "CEO, CreativeForce Agency",
    initials: "SM",
  },
  {
    quote: "The quality of the pitch deck templates rivals what we used to pay agencies $10k+ for. Exceptional value and instant delivery.",
    author: "Marcus Johnson",
    role: "Managing Partner, NexGen Ventures",
    initials: "MJ",
  },
  {
    quote: "We've been using TruCRM for our entire sales team. The lifetime access model saved us thousands in subscription fees.",
    author: "Emily Zhang",
    role: "VP Sales, CloudScale Inc.",
    initials: "EZ",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            Trusted By <span className="text-blue-500">Industry Leaders</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Hear from founders, agencies, and investors who use our platform daily.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-200 transition-all hover:shadow-md"
            >
              <Quote size={28} className="text-blue-200 mb-4" />
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="text-gray-900 font-medium text-sm">{t.author}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
