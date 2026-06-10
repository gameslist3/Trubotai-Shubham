"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageSquare, Mic, Bot, Building2, Calculator, Users, Eye, ArrowRight } from "lucide-react";

const bots = [
  { name: "TruChat", desc: "AI Chatbots", icon: MessageSquare, href: "/lifetime-deals", color: "from-blue-500 to-blue-600" },
  { name: "TruVoice", desc: "AI Voice Bots", icon: Mic, href: "/lifetime-deals", color: "from-purple-500 to-purple-600" },
  { name: "TruAgent", desc: "AI Agents", icon: Bot, href: "/lifetime-deals", color: "from-green-500 to-green-600" },
  { name: "TruERP", desc: "ERP System", icon: Building2, href: "/lifetime-deals#truerp", color: "from-amber-500 to-amber-600" },
  { name: "TruFinance", desc: "Invoice Automation", icon: Calculator, href: "/lifetime-deals", color: "from-teal-500 to-teal-600" },
  { name: "TruSocial", desc: "Social Media Tools", icon: Users, href: "/lifetime-deals#trusocial", color: "from-pink-500 to-pink-600" },
  { name: "TruWatch", desc: "AI Surveillance", icon: Eye, href: "/lifetime-deals", color: "from-cyan-500 to-cyan-600" },
];

export function MeetTheBotsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50" id="solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet the Bots That Run <span className="text-blue-500">Your Business</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Powerful AI-powered software solutions available with lifetime access.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bots.map((bot, i) => (
            <motion.div
              key={bot.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <Link href={bot.href} className="block group">
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-200 transition-all h-full">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${bot.color} flex items-center justify-center mb-4`}>
                    <bot.icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{bot.name}</h3>
                  <p className="text-sm text-gray-500">{bot.desc}</p>
                  <div className="flex items-center gap-1 text-blue-500 text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                    Learn More <ArrowRight size={14} />
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
