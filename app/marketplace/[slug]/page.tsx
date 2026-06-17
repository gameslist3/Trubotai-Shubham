"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products, fallbackProduct } from "@/lib/product-data";
import ProductDetailView from "@/components/marketplace/product-detail-view";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = products[slug] || { ...fallbackProduct, name: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) };

  return (
    <section className="relative min-h-screen pt-28 pb-16 md:pt-32">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white to-white" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* ── Breadcrumb ── */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400 mb-6 md:mb-8">
            <Link href="/marketplace" className="hover:text-blue-600 transition-colors">Marketplace</Link>
            <span>/</span>
            <span className="text-[#18352b] font-medium">{product.name}</span>
          </div>

          {/* ── Back link ── */}
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 transition-colors mb-6"
          >
            <ArrowRight size={12} className="rotate-180" />
            Back to all products
          </Link>

          <ProductDetailView product={product} slug={slug} />
        </motion.div>
      </div>
    </section>
  );
}
