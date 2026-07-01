"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, CheckCircle, Star,
  Zap, Clock, Info, Shield
} from "lucide-react";
import { ProductData } from "@/lib/product-data";

// ── Product image mapping for filtered detail screens ──
const productImages: Record<string, string> = {
  "finance-templates": "/Finance Database.png",
  "investor-database": "/Investor Database.png",
  "grant-database": "/Grant Database.png",
  "accelerator-database": "/Accelerator.png",
  "1m-leads": "/Leads (1M).png",
  "ai-linkedin-prompts": "/Al Linkedln Prompts Database.png",
  "architecture-prd": "/Architecture Database.png",
  "product-prds": "/Product PRD.png",
  "real-estate": "/Real Estate Database.png",
  "gtm-strategy": "/GTM.png",
  "nda-pack": "/NDA and Agreements.png",
  "ma-strategy": "/M&A.png",
  "channel-partners": "/Channel Partner Pack.png",
  "website-content": "/Website Content.png",
  "pitch-deck-samples": "/Pitch Deck Samples.png",
  "proposals-docs": "/Proposals Docs.png",
  "project-timeline-templates": "/Project Timeline Templates.png",
  "cold-email-templates": "/Cold Email Templates.png",
  "250k-leads": "/Leads (250K).png",
  "150m-leads": "/Leads (150M).png",
  "390m-leads": "/Leads (390M).png",
  "lean-prd": "/Lean PRD.png",
  "all-assets-bundle": "/All Assets Bundle.png",
};

// ── Section Component ──

function ExpandableSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="pb-1 pt-3">
        <span className="text-sm font-semibold text-[#18352b]">{title}</span>
      </div>
      <div className="pb-3">{children}</div>
    </div>
  );
}

// ── Detail View Props ──

interface ProductDetailViewProps {
  product: ProductData;
  slug: string;
}

// ── Main Detail View Component ──

export default function ProductDetailView({ product, slug }: ProductDetailViewProps) {
  const originalPrice = product.price * 2;
  const imageSrc = productImages[slug];

  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
        {/* ══════ LEFT: Plain placeholder or image (user will add images later) ══════ */}
        <div className="order-2 lg:order-1">
          <div className="sticky top-28">
            <div className="rounded-2xl overflow-hidden">
              {imageSrc ? (
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={imageSrc}
                    alt={product.name}
                    fill
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className="object-contain p-4 select-none"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className={`w-full aspect-[4/3] ${product.bgColor} flex items-center justify-center`}>
                  <div className="text-center">
                    <product.icon size={64} className={`${product.iconColor} mx-auto mb-3 opacity-40`} />
                    <p className={`text-sm font-medium ${product.iconColor} opacity-30`}>{product.name}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ══════ RIGHT: Product Details — simplified ══════ */}
        <div className="order-1 lg:order-2">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-7">
            {/* Title */}
            <h1 className="text-xl md:text-2xl font-bold text-[#18352b] mb-1">{product.name}</h1>
            <p className="text-sm text-gray-500 mb-5">{product.tagline}</p>

            {/* ── Description ── */}
            <p className="text-sm text-gray-600 leading-relaxed mb-5">{product.description}</p>

            {/* ── Product Sections ── */}
            <div className="border-t border-gray-100 divide-y divide-gray-100">
              <ExpandableSection title="Key Features">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {product.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-sm text-gray-600">
                      <Star size={12} className="text-blue-500 flex-shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>
              </ExpandableSection>

              <ExpandableSection title="What's Included">
                <ul className="space-y-1.5">
                  {product.whatsIncluded.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                {product.note && (
                  <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-sm text-amber-800 leading-relaxed">{product.note}</p>
                  </div>
                )}
              </ExpandableSection>

              <ExpandableSection title="Who It's For">
                <ul className="space-y-1.5">
                  {product.useCases.map((useCase) => (
                    <li key={useCase} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-[5px]" />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </ExpandableSection>

              <ExpandableSection title="templetes you recives">
                <div className="flex flex-wrap gap-2">
                  {product.deliverables.map((d) => (
                    <span key={d} className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-600">
                      {d}
                    </span>
                  ))}
                </div>
                <p className="mt-2.5 text-sm text-gray-400 flex items-center gap-1">
                  <Info size={11} />
                  All files delivered digitally
                </p>
              </ExpandableSection>
            </div>

            {/* ── Bottom CTA — improved ══ */}
            <div className="mt-6 pt-5 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-400 mb-0.5">Price</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-blue-600">${product.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-400 line-through">${originalPrice.toLocaleString()}</span>
                    <span className="inline-flex items-center bg-green-100 text-green-700 text-sm font-bold px-1.5 py-0.5 rounded">50% OFF</span>
                  </div>
                </div>
              </div>
              <Link
                href={`/verify?product=${slug}&price=${product.price}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/25"
              >
                Buy Now
                <ArrowRight size={16} />
              </Link>
              <div className="mt-3 flex items-center justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1"><Shield size={11} /> Secure Stripe checkout</span>
                <span className="flex items-center gap-1"><Clock size={11} /> Lifetime access</span>
                <span className="flex items-center gap-1"><Zap size={11} /> Instant delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
