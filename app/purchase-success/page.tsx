"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import { ArrowRight, Mail, Cloud, Download, FileText, Copy, Check, PartyPopper, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

function SuccessContent() {

  const searchParams = useSearchParams();
  const product = searchParams.get("product") || "";
  const price = parseInt(searchParams.get("price") || "0", 10);
  const [showConfetti, setShowConfetti] = useState(true);
  const [viewHeight, setViewHeight] = useState(800);
  const [copied, setCopied] = useState(false);
  const toastShown = useRef(false);

  const productName = product.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const orderId = searchParams.get("orderId") || `ORD-${Date.now().toString(36).toUpperCase()}`;

  useEffect(() => {
    setViewHeight(window.innerHeight);
    if (!toastShown.current) {
      toastShown.current = true;
      toast.success("Purchase completed successfully!", { duration: 4000 });
    }
    const timer = setTimeout(() => setShowConfetti(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      {showConfetti && <Confetti viewHeight={viewHeight} />}

      <div className="bg-white border border-gray-200 rounded-3xl shadow-xl shadow-blue-600/5">
        {/* Success Hero Banner */}
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 px-6 md:px-8 pt-8 pb-6 text-center overflow-hidden rounded-t-3xl">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute bottom-0 right-10 w-60 h-60 rounded-full bg-white/5 blur-3xl" />

          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }} className="relative z-10">
            <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto mb-2 shadow-xl">
              <PartyPopper size={24} className="text-white drop-shadow-lg" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Purchase Complete</h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="relative z-10 inline-flex items-center gap-2 mt-2 px-3.5 py-1 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
            <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center"><span className="text-white text-[10px] font-bold">$</span></div>
            <span className="text-white font-semibold text-xs">{productName}</span>
            <span className="text-blue-200 text-[10px]">•</span>
            <span className="text-blue-200 text-xs">${price.toLocaleString()}</span>
          </motion.div>
        </div>

        {/* Body */}
        <div className="pt-5 px-6 pb-6 md:p-7 space-y-4">
          {/* SharePoint note */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
            <p className="text-sm text-blue-800">
              <span className="font-medium">📎 SharePoint access link shared with your email id.</span>
              {" "}Please check your inbox (and spam folder) to access your purchased asset.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Order Summary */}
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
                <h2 className="text-sm font-semibold text-[#18352b] mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FileText size={13} className="text-blue-600" />
                  </div>
                  Order Summary
                </h2>
                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-100/70 flex items-center justify-center">
                          <FileText size={12} className="text-blue-600" />
                        </div>
                        <span className="text-sm text-gray-500">Order ID</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-[#18352b] font-mono font-semibold">{orderId}</span>
                        <button onClick={handleCopy} className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors active:scale-90">
                          {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} className="text-gray-400" />}
                        </button>
                      </div>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-purple-100/70 flex items-center justify-center">
                          <span className="text-xs text-purple-600 font-bold">P</span>
                        </div>
                        <span className="text-sm text-gray-500">Product</span>
                      </div>
                      <span className="text-sm text-[#18352b] font-medium text-right">{productName}</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-teal-100/70 flex items-center justify-center">
                          <span className="text-xs text-teal-600 font-bold">#</span>
                        </div>
                        <span className="text-sm text-gray-500">Type</span>
                      </div>
                      <span className="text-sm text-[#18352b]">Digital Asset</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-amber-100/70 flex items-center justify-center">
                          <span className="text-xs text-amber-600 font-bold">$</span>
                        </div>
                        <span className="text-sm text-gray-500">Amount</span>
                      </div>
                      <span className="font-semibold text-amber-600">${price.toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-green-100/70 flex items-center justify-center">
                          <span className="text-xs text-green-600 font-bold">✓</span>
                        </div>
                        <span className="text-sm text-gray-500">Status</span>
                      </div>
                      <span className="text-green-700 bg-green-50 border border-green-200 px-3 py-0.5 rounded-full font-medium text-[11px] shadow-sm">Confirmed</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Next Steps */}
            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <h2 className="text-sm font-semibold text-[#18352b] mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                    <ArrowRight size={13} className="text-blue-600" />
                  </div>
                  Next Steps
                </h2>
                <div className="space-y-0">
                  {[
                    { icon: Mail, title: "Check Email", desc: "Receipt with access link" },
                    { icon: Cloud, title: "Access SharePoint", desc: "Download your assets" },
                    { icon: Download, title: "Download & Use", desc: "Start using in projects" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <item.icon size={15} />
                      </div>
                      <div className="flex-1 min-w-0 flex items-center justify-between">
                        <p className="text-sm font-medium text-[#18352b]">{item.title}</p>
                        <p className="text-xs text-gray-400 ml-3">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Confetti component
function Confetti({ viewHeight }: { viewHeight: number }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  if (!isClient) return <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden" />;

  const isMobile = viewHeight < 800;
  const primaryCount = isMobile ? 35 : 70;
  const secondaryCount = isMobile ? 15 : 30;

  const colors = ["#2563eb","#3b82f6","#60a5fa","#10b981","#34d399","#f59e0b","#fbbf24","#ef4444","#f87171","#8b5cf6","#a78bfa","#ec4899","#f472b6","#06b6d4","#22d3ee","#f97316","#fb923c"];
  const shapes = ["square","circle","ribbon","star"] as const;
  const driftEase = [0.22, 1, 0.36, 1] as const;

  const burstParticles = Array.from({ length: primaryCount }, (_, i) => {
    const angle = (i / primaryCount) * 360 + (Math.random() - 0.5) * 20;
    const rad = (angle * Math.PI) / 180;
    const distance = 120 + Math.random() * (isMobile ? 150 : 250);
    return {
      id: i, delay: Math.random() * 0.2, color: colors[Math.floor(Math.random() * colors.length)],
      x: 50, y: 12, xDrift: Math.cos(rad) * distance, yDrift: Math.sin(rad) * distance - Math.random() * 40,
      rotation: Math.random() * 720, duration: 2.0 + Math.random() * 1.5,
      size: Math.random() < 0.2 ? 7 : 2 + Math.random() * 4, shape: shapes[Math.floor(Math.random() * shapes.length)],
      opacity: 0.85 + Math.random() * 0.15,
    };
  });

  const allParticles = [...burstParticles, ...Array.from({ length: secondaryCount }, (_, i) => ({
    id: primaryCount + i, delay: 0.5 + Math.random() * 0.4,
    color: colors[Math.floor(Math.random() * colors.length)],
    x: 42 + Math.random() * 16, y: 10 + Math.random() * 10,
    xDrift: (Math.random() - 0.5) * 80, yDrift: 20 + Math.random() * 60,
    rotation: Math.random() * 360, duration: 0.9 + Math.random() * 0.7,
    size: 1 + Math.random() * 2, shape: "circle" as const, opacity: 1,
  }))];

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {allParticles.map((p) => (
        <motion.div key={p.id} className="absolute will-change-transform"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.shape === "ribbon" ? p.size * 2.5 : p.size, height: p.shape === "ribbon" ? p.size * 0.4 : p.size }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: [0, p.opacity, p.opacity * 0.9, 0], scale: [0, 1.15, 1, 0.2], x: [0, p.xDrift * 0.2, p.xDrift * 0.6, p.xDrift], y: [0, p.yDrift * 0.2, p.yDrift * 0.6, p.yDrift], rotate: [0, p.rotation * 0.3, p.rotation * 0.7, p.rotation] }}
          transition={{ duration: p.duration, delay: p.delay, ease: driftEase }}>
          {p.shape === "circle" ? <div className="w-full h-full rounded-full" style={{ backgroundColor: p.color, boxShadow: `0 0 8px ${p.color}80` }} /> :
           p.shape === "star" ? <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-sm" fill={p.color}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg> :
           p.shape === "ribbon" ? <div className="w-full h-full" style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}dd, ${p.color}88)`, borderRadius: "3px" }} /> :
           <div className="w-full h-full rounded-sm" style={{ backgroundColor: p.color }} />}
        </motion.div>
      ))}
      <motion.div className="absolute left-1/2 top-[12%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full pointer-events-none will-change-transform"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 0.5, 0], scale: [0, 1.5, 3.5] }}
        transition={{ duration: 1.0, delay: 0.05, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(59,130,246,0.25) 35%, transparent 65%)" }} />
    </div>
  );
}

export default function PurchaseSuccessPage() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center py-4 md:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white to-white" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="mx-auto w-full max-w-[1040px] px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Suspense fallback={<div className="flex items-center justify-center h-40"><Loader2 size={28} className="animate-spin text-blue-600" /></div>}>
            <SuccessContent />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
}
