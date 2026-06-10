"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTASection() {
  return (
    <section className="py-16 md:py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Start Automating with <span className="text-blue-400">TruBot AI</span> Today
          </h2>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Join 500+ forward-thinking teams already using our marketplace and
            lifetime software to accelerate their growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/marketplace">
              <Button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-md text-sm font-medium">
                Try for free
                <ArrowRight size={18} className="ml-1" />
              </Button>
            </Link>
            <Link href="/lifetime-deals">
              <Button className="border border-gray-500 text-white hover:bg-gray-800 px-6 py-3 rounded-md text-sm font-medium">
                Talk to our team
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
