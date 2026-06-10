"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Heart, Monitor, Wrench, Megaphone, Scale, ArrowRight } from "lucide-react";

const industries = [
  { icon: ShoppingBag, title: "E-commerce & Retail", desc: "Customer support bots, inventory management, and sales automation for online and physical retail.", href: "/marketplace" },
  { icon: Heart, title: "Healthcare & Clinics", desc: "Patient management templates, compliance docs, and scheduling automation tools.", href: "/marketplace" },
  { icon: Monitor, title: "EdTech & Coaching Platforms", desc: "Educational content templates, student management systems, and learning automation.", href: "/marketplace" },
  { icon: Wrench, title: "Local Services", desc: "HVAC, electricians, plumbers — never miss a job with after-hours bots and automated booking.", href: "/marketplace" },
  { icon: Megaphone, title: "Marketing Agencies & SaaS", desc: "Pitch decks, social media tools, lead databases, and UI/UX templates for agencies.", href: "/marketplace" },
  { icon: Scale, title: "Legal & Financial Services", desc: "Business templates, CRM systems, and productivity tools for consultants and firms.", href: "/marketplace" },
];

export function UseCasesSection() {
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
            Smart Use Cases for <span className="text-blue-500">Every Industry</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Our digital assets and software solutions power businesses across every industry.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Link href={item.href} className="block group h-full">
                <div className="relative bg-white border border-gray-200 rounded-xl p-7 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col overflow-hidden">
                  {/* Accent bar on hover */}
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  <div className="mb-7">
                    <item.icon size={32} className="text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2.5">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5 flex-1">{item.desc}</p>
                  <div className="flex items-center gap-1.5 text-blue-500 text-sm font-medium group-hover:gap-3 transition-all">
                    Explore Assets <ArrowRight size={15} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
