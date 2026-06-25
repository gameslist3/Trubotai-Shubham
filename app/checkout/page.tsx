"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Wallet, CheckCircle, Loader2, CreditCard, Lock, Mail, Cloud, ArrowRight } from "lucide-react";
import { getCreditBalance, deductCredits } from "@/lib/credits";
import toast from "react-hot-toast";

const productPrices: Record<string, number> = {
  "investor-database": 199, "finance-templates": 49, "grant-database": 49,
  "accelerator-database": 49, "1m-leads": 49, "1m-b2b-leads": 49, "prds": 19, "prd-bundle": 49,
  "architecture-docs": 19, "architecture-bundle": 49, "ui-ux-templates": 19,
  "ui-ux-bundle": 49, "pitch-decks": 19, "pitch-decks-templates": 19, "pitch-deck-bundle": 49,
  "gtm-strategy": 199,
  "nda-pack": 99,
  "ma-strategy": 199,
  "channel-partners": 99,
  "website-content": 199,
  "pitch-deck-samples": 99,
  "proposals-docs": 99,
  "sample-prd": 99,
  "project-timeline-templates": 49,
  "cold-email-templates": 49,
  "150m-leads": 1999,
  "390m-leads": 3999,
  "all-assets-bundle": 100,
};

const productNames: Record<string, string> = {
  "investor-database": "Investor Database", "finance-templates": "Finance Templates",
  "grant-database": "Grant Database", "accelerator-database": "Accelerator Database",
  "1m-leads": "1M B2B Leads", "1m-b2b-leads": "1M B2B Leads",
  "prds": "Product PRDs", "prd-bundle": "PRD Bundle",
  "architecture-docs": "Architecture Docs", "architecture-bundle": "Architecture Bundle",
  "ui-ux-templates": "UI/UX Templates", "ui-ux-bundle": "UI/UX Bundle",
  "pitch-decks": "Pitch Deck Templates", "pitch-decks-templates": "Pitch Deck Templates",
  "pitch-deck-bundle": "Pitch Deck Bundle",
  "gtm-strategy": "GTM and Strategy",
  "nda-pack": "NDA and Agreements",
  "ma-strategy": "M&A Strategy",
  "channel-partners": "Channel Partner Pack",
  "website-content": "Website Content",
  "pitch-deck-samples": "Pitch Deck Samples",
  "proposals-docs": "Proposals Docs",
  "sample-prd": "Sample PRD",
  "project-timeline-templates": "Project Timeline Templates",
  "cold-email-templates": "Cold Email Templates",
  "150m-leads": "150M Leads",
  "390m-leads": "390M Leads",
  "all-assets-bundle": "All Assets Bundle",
};

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const product = searchParams.get("product") || "";
  const priceParam = searchParams.get("price") || "";
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState("");
  const [creditBalance, setCreditBalance] = useState(0);

  const price = productPrices[product] || parseInt(priceParam, 10) || 0;
  const productName = productNames[product] || product.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const hasEnoughCredits = creditBalance >= price;
  const remainingAfter = creditBalance - price;

  useEffect(() => {
    setCreditBalance(getCreditBalance());
  }, []);

  const handlePayment = async () => {
    if (!hasEnoughCredits) {
      toast.error("Insufficient balance!");
      return;
    }

    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));

    const result = deductCredits(price);
    if (!result.success) {
      toast.error("Transaction failed. Insufficient balance.");
      setIsProcessing(false);
      return;
    }

    setCreditBalance(result.newBalance);
    setIsProcessing(false);
    toast.success(`Purchase successful! $${price.toLocaleString()} charged.`);
    router.push(`/purchase-success?product=${product}&price=${price}`);
  };

  const getSlugFromName = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white to-white" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      
      <div className="mx-auto w-full max-w-[1200px] px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid md:grid-cols-5 gap-6 md:gap-8">
            {/* Main Checkout */}
            <div className="md:col-span-3">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-2.5 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
                    <CreditCard size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#18352b]">Secure Checkout</h2>
                    <p className="text-xs text-gray-400">Powered by Stripe</p>
                  </div>
                </div>

                {/* Stripe Checkout Simulation */}
                <div className="border border-gray-200 rounded-2xl p-5 mb-5 bg-white">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <CreditCard size={16} className="text-blue-600" />
                      <span className="text-sm font-semibold text-[#18352b]">Payment Details</span>
                    </div>
                    <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                      Test Mode
                    </span>
                  </div>

                  {/* Product Summary */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#18352b] font-semibold text-sm">{productName}</p>
                        <p className="text-xs text-gray-400">Digital Asset</p>
                      </div>
                      <span className="text-lg font-bold text-blue-600">${price.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-300 text-[#18352b]">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-sm">{email || "verified@example.com"}</span>
                      <CheckCircle size={14} className="text-green-500 ml-auto" />
                    </div>
                    <p className="text-[11px] text-green-600 mt-1.5 flex items-center gap-1">
                      <CheckCircle size={11} /> Email verified via OTP
                    </p>
                  </div>

                  {/* Card Details - Stripe-like */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Card Details</label>
                    <div className="bg-white border border-gray-300 rounded-xl p-3.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                      <div className="flex items-center gap-2 mb-3">
                        <CreditCard size={16} className="text-gray-400" />
                        <input
                          type="text"
                          placeholder="Card number"
                          defaultValue="4242 4242 4242 4242"
                          readOnly
                          className="flex-1 text-[#18352b] bg-transparent border-none outline-none text-sm"
                        />
                      </div>
                      <div className="flex gap-3 border-t border-gray-100 pt-3">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          defaultValue="12/28"
                          readOnly
                          className="w-1/2 text-[#18352b] bg-transparent border-none outline-none text-sm"
                        />
                        <input
                          type="text"
                          placeholder="CVC"
                          defaultValue="123"
                          readOnly
                          className="w-1/2 text-[#18352b] bg-transparent border-none outline-none text-sm"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1.5">
                      Test card: 4242 4242 4242 4242 | 12/28 | 123
                    </p>
                  </div>

                  {/* Insufficient credits warning */}
                  {!hasEnoughCredits && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <Shield size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-red-800 font-medium text-sm">Insufficient Balance</p>
                          <p className="text-xs text-gray-600 mt-1">
                            You need ${price.toLocaleString()} but only have ${creditBalance.toLocaleString()}.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pay Button */}
                  <Button
                    variant="primary"
                    className="w-full rounded-xl"
                    size="lg"
                    isLoading={isProcessing}
                    disabled={!hasEnoughCredits}
                    onClick={handlePayment}
                  >
                    <Lock size={16} />
                    Pay ${price.toLocaleString()}
                  </Button>

                  <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400">
                    <Shield size={12} /> Secured by Stripe • Test transaction
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-2">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
                <h3 className="text-lg font-semibold text-[#18352b] mb-5">Order Summary</h3>

                {/* Product details */}
                <div className="bg-gray-50 rounded-xl p-4 mb-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#18352b] font-medium text-sm">{productName}</p>
                      <p className="text-[11px] text-gray-400">Digital Asset</p>
                    </div>
                    <span className="text-blue-600 font-bold">${price.toLocaleString()}</span>
                  </div>
                </div>

                {/* What's included */}
                <h4 className="text-sm font-semibold text-[#18352b] mb-3">What&apos;s Included</h4>
                <ul className="space-y-2.5 mb-6">
                  {[
                    "Instant digital delivery",
                    "Lifetime access",
                    "SharePoint integration",
                    "24/7 customer support",
                    "30-day money-back guarantee",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle size={15} className="text-green-500 flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>

                {/* Pricing breakdown */}
                <div className="border-t border-gray-100 pt-4 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Item Price</span>
                    <span className="text-[#18352b]">${price.toLocaleString()}</span>
                  </div>
                  {hasEnoughCredits && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Balance After Purchase</span>
                      <span className="text-amber-600 font-medium">${remainingAfter.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold pt-2.5 border-t border-gray-100">
                    <span className="text-[#18352b]">Total</span>
                    <span className="text-blue-600">${price.toLocaleString()}</span>
                  </div>
                </div>

                {/* Delivery info */}
                <div className="mt-6 space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-gray-500">
                    <Cloud size={14} className="text-blue-500" />
                    <span>Delivered via SharePoint</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-500">
                    <Mail size={14} className="text-blue-500" />
                    <span>Confirmation sent to email</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <Loader2 size={32} className="animate-spin text-blue-600 mx-auto" />
        </div>
      </section>
    }>
      <CheckoutForm />
    </Suspense>
  );
}
