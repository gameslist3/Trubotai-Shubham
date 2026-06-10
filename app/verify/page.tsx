"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Mail, Cloud, Download, PartyPopper } from "lucide-react";
import Image from "next/image";

function EmailCard({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-2xl border border-gray-200/80 overflow-hidden min-h-full flex flex-col ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </motion.div>
  );
}

function EmailFooter() {
  return (
    <div className="px-7 py-3 bg-gray-50 border-t border-gray-100 text-center">
      <p className="text-[10px] text-gray-400">TruBot AI • Premium Digital Assets Marketplace</p>
    </div>
  );
}

function EmailOverlay({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] overflow-hidden bg-white"
    >
      <div className="absolute inset-0">
        <Image src="/email.png" alt="Email background" fill className="object-cover" priority />
      </div>
      <div className="absolute right-[4%] top-[12%] bottom-[12%] w-[65%] overflow-y-auto">
        {children}
      </div>
    </motion.div>
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

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showStripe, setShowStripe] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showPurchaseComplete, setShowPurchaseComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [viewHeight, setViewHeight] = useState(800);
  const [showOrderEmail, setShowOrderEmail] = useState(false);
  const [showAssetsEmail, setShowAssetsEmail] = useState(false);
  const product = searchParams.get("product") || "";
  const price = searchParams.get("price") || "0";

  const productName = product.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const email = "customer@example.com";

  useEffect(() => {
    setViewHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 4500);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleStripeClick = () => {
    setShowStripe(false);
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      setShowPurchaseComplete(true);
      setShowConfetti(true);
    }, 2200);
  };

  const handlePurchaseCompleteClick = () => {
    setShowPurchaseComplete(false);
    setShowOrderEmail(true);
  };

  const handleOrderEmailClick = () => {
    setShowOrderEmail(false);
    setShowAssetsEmail(true);
  };

  const handleAssetsEmailClick = () => {
    setShowAssetsEmail(false);
  };

  const showMain = !showStripe && !showLoading && !showPurchaseComplete && !showOrderEmail && !showAssetsEmail;

  return (
    <>
      {/* Stripe overlay */}
      <AnimatePresence>
        {showStripe && (
          <motion.div
            key="stripe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] cursor-pointer bg-white flex items-center justify-center p-4 md:p-8"
            onClick={handleStripeClick}
          >
            <div className="relative w-full h-full">
              <Image src="/stripe.png" alt="Stripe Checkout" fill className="object-contain" priority />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processing Payment → Payment Complete animation */}
      <AnimatePresence>
        {showLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex flex-col items-center"
            >
              {/* Circular progress with checkmark transition */}
              <div className="relative mb-8">
                <svg width="130" height="130" viewBox="0 0 100 100">
                  {/* Background ring */}
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                  {/* Progress ring that fills during processing */}
                  <motion.circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke="#3b82f6" strokeWidth="6" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.6, ease: "easeInOut" }}
                    style={{ rotate: -90, transformOrigin: "center" }}
                  />
                  {/* Checkmark path - appears and turns green after progress */}
                  <motion.path
                    d="M33 50l12 12 24-24"
                    fill="none" stroke="#10b981" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1.3, duration: 0.5, ease: "easeOut" }}
                  />
                  {/* Dollar sign - fades out as checkmark appears */}
                  <motion.text
                    x="50" y="56" textAnchor="middle" dominantBaseline="middle"
                    className="text-[28px] font-bold" fill="#3b82f6"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 0.3 }}
                    transition={{ delay: 1.2, duration: 0.3, ease: "easeIn" }}
                  >$</motion.text>
                </svg>
                {/* Glow pulse around the ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(59,130,246,0)",
                      "0 0 20px rgba(59,130,246,0.15)",
                      "0 0 40px rgba(59,130,246,0.08)",
                      "0 0 0px rgba(16,185,129,0)",
                      "0 0 30px rgba(16,185,129,0.15)",
                      "0 0 0px rgba(16,185,129,0)",
                    ],
                  }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                />
              </div>

              {/* Text transitions from Processing to Complete */}
              <div className="h-8 mb-1 overflow-hidden">
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: -32 }}
                  transition={{ delay: 1.4, duration: 0.3, ease: "easeOut" }}
                >
                  <h3 className="text-xl font-bold text-[#18352b] h-8 flex items-center justify-center">Processing Payment</h3>
                  <h3 className="text-xl font-bold text-emerald-600 h-8 flex items-center justify-center">Payment Complete!</h3>
                </motion.div>
              </div>

              {/* Subtitle transitions */}
              <div className="h-5 mb-4 overflow-hidden">
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: -20 }}
                  transition={{ delay: 1.4, duration: 0.3, ease: "easeOut" }}
                >
                  <p className="text-sm text-gray-400 h-5 flex items-center justify-center">Verifying your transaction securely</p>
                  <p className="text-sm text-emerald-500 h-5 flex items-center justify-center">Transaction verified successfully</p>
                </motion.div>
              </div>

              {/* Progress bar - fills blue then turns green */}
              <div className="w-64 h-2.5 rounded-full bg-gray-100 overflow-hidden shadow-inner">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: "0%", background: "#3b82f6" }}
                  animate={{
                    width: "100%",
                    background: ["#3b82f6", "#3b82f6", "#10b981"],
                  }}
                  transition={{
                    width: { duration: 1.8, ease: "easeInOut" },
                    background: { times: [0, 0.7, 1], duration: 2 },
                  }}
                  style={{ boxShadow: "0 0 6px rgba(59,130,246,0.3)" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Purchase Complete with confetti - part of the page layout so navbar is visible */}
      {showPurchaseComplete && (
        <section className="relative min-h-dvh py-16 md:py-24 bg-[#f8fafc]">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {showConfetti && <Confetti viewHeight={viewHeight} />}
          </div>
          <div className="mx-auto w-full max-w-[560px] px-4 sm:px-6 relative z-10" onClick={handlePurchaseCompleteClick}>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full cursor-pointer"
            >
              {/* Purchase Complete Card */}
              <div className="bg-white rounded-3xl shadow-xl shadow-blue-600/5 border border-gray-200 overflow-hidden">
                {/* Success Hero Banner */}
                <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 md:px-8 pt-10 pb-7 text-center overflow-hidden">
                  <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-white/5 blur-3xl" />
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/[0.04] blur-3xl" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-white/[0.03] to-transparent" />

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                    className="relative z-10"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center mx-auto mb-4 shadow-xl">
                      <PartyPopper size={28} className="text-white drop-shadow-lg" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="relative z-10"
                  >
                    <h1 className="text-2xl md:text-[28px] font-bold text-white mb-1 tracking-tight">Purchase Complete!</h1>
                    <p className="text-blue-200/80 text-sm">Thank you for your order</p>
                  </motion.div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-7 space-y-5">
                  {/* Order Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <h2 className="text-sm font-semibold text-[#18352b] mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      Order Summary
                    </h2>
                    <div className="bg-white border border-gray-200 rounded-xl p-4">
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Order ID</span>
                          <span className="text-[#18352b] font-mono font-semibold text-xs">{orderId}</span>
                        </div>
                        <div className="h-px bg-gray-100" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Product</span>
                          <span className="text-[#18352b] font-medium">{productName}</span>
                        </div>
                        <div className="h-px bg-gray-100" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Date</span>
                          <span className="text-[#18352b]">{today}</span>
                        </div>
                        <div className="h-px bg-gray-100" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Amount Paid</span>
                          <span className="font-semibold text-amber-600">${price}</span>
                        </div>
                        <div className="h-px bg-gray-100" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">Status</span>
                          <span className="text-green-700 bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full font-medium text-[11px]">Confirmed</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* SharePoint note */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-center"
                  >
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">📎 SharePoint access link sent to your email.</span>
                      {" "}Please check your inbox (and spam folder) to access and download your purchased assets.
                    </p>
                  </motion.div>

                  {/* Next Steps */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h2 className="text-sm font-semibold text-[#18352b] mb-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                      Next Steps
                    </h2>
                    <div className="space-y-2">
                      {[
                        { icon: Mail, title: "Check your inbox for order confirmation", color: "bg-blue-100 text-blue-600" },
                        { icon: Cloud, title: "Access your assets via SharePoint link", color: "bg-teal-100 text-teal-600" },
                        { icon: Download, title: "Download and start using your assets", color: "bg-purple-100 text-purple-600" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                          <div className={"w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 " + item.color}>
                            <item.icon size={15} />
                          </div>
                          <p className="text-sm text-[#18352b]">{item.title}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Email 1: Order Confirmation */}
      <AnimatePresence>
        {showOrderEmail && !showAssetsEmail && (
          <EmailOverlay key="order-email">
            <EmailCard onClick={handleOrderEmailClick}>
              <div className="px-6 py-4 border-b border-gray-100 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">T</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#18352b]">TruBot AI</p>
                    <p className="text-xs text-gray-400">support@trubotai.com</p>
                  </div>
                  <div className="text-xs text-gray-400 flex-shrink-0">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
                <p className="text-sm font-medium text-[#18352b]">Confirmation of Purchasing the Digital Asset — {productName}</p>
                <p className="text-xs text-gray-400">to: {email}</p>
              </div>

              <div className="px-7 py-6 space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>Hi there,</p>
                <p>Thank you for your purchase and for choosing <strong>TruBot AI</strong>.</p>
                <p>We are pleased to confirm that your order for the selected Digital Asset has been successfully processed.</p>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
                  <p className="font-semibold text-[#18352b] text-sm">Order Summary</p>
                  <div className="text-xs space-y-1">
                    <p><span className="text-gray-500">Order ID:</span> <span className="text-[#18352b] font-mono">{orderId}</span></p>
                    <p><span className="text-gray-500">Purchase Date:</span> <span className="text-[#18352b]">{today}</span></p>
                    <p><span className="text-gray-500">Product:</span> <span className="text-[#18352b]">{productName}</span></p>
                    <p><span className="text-gray-500">Amount Paid:</span> <span className="text-blue-600 font-semibold">${price}</span></p>
                    <p><span className="text-gray-500">Status:</span> <span className="text-green-600 font-semibold">Confirmed</span></p>
                  </div>
                </div>

                <p>Your purchase has been successfully recorded, and our team is currently preparing your asset access workspace.</p>
                <p>You will receive a separate email shortly containing your secure SharePoint access link and instructions for accessing your purchased assets.</p>

                <div className="space-y-2">
                  <p className="font-semibold text-[#18352b] text-xs">What&apos;s Next?</p>
                  <ul className="space-y-1 text-xs text-gray-500">
                    <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>Your digital asset will be made available through a secure SharePoint workspace.</li>
                    <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>A dedicated access email will be sent to your registered email address.</li>
                    <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>Once received, you can immediately access, view, and download your purchased files.</li>
                  </ul>
                </div>

                <p className="text-xs text-gray-500">If you have any questions regarding your order, billing, or asset access, please don&apos;t hesitate to contact our support team.</p>
                <p className="text-xs text-gray-500">Thank you for trusting <strong>TruBot AI</strong>. We appreciate your business and look forward to helping you achieve success with our solutions.</p>

                <div><p className="text-sm font-semibold text-[#18352b]">Best Regards,</p><p className="text-sm font-bold text-blue-600">Anita</p><p className="text-xs text-gray-400">TruBot AI Team</p></div>
              </div>
              <EmailFooter />
            </EmailCard>
          </EmailOverlay>
        )}
      </AnimatePresence>

      {/* Email 2: Purchased Digital Assets from TruBot AI - SharePoint access link */}
      <AnimatePresence>
        {showAssetsEmail && !showOrderEmail && (
          <EmailOverlay key="assets-email">
            <EmailCard onClick={handleAssetsEmailClick}>
              <div className="px-6 py-4 border-b border-gray-100 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">T</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#18352b]">TruBot AI</p>
                    <p className="text-xs text-gray-400">support@trubotai.com</p>
                  </div>
                  <div className="text-xs text-gray-400 flex-shrink-0">{today}</div>
                </div>
                <p className="text-sm font-medium text-[#18352b]">Purchased Digital Assets from TruBot AI — {productName}</p>
                <p className="text-xs text-gray-400">to: {email}</p>
              </div>

              <div className="px-7 py-6 space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>Hi there,</p>
                <p>Thank you for purchasing and trusting <strong>TruBot AI</strong>.</p>
                <p>We&apos;re excited to have you on board. Your purchased Digital Assets are now ready for access.</p>
                <p>To access your files, simply open the SharePoint link below:</p>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                  <p className="font-semibold text-[#18352b] text-xs mb-2">SharePoint Access Link</p>
                  <div className="bg-white border border-blue-200 rounded-lg px-4 py-3 text-blue-600 text-sm font-medium break-all">
                    https://trubotai.sharepoint.com/sites/{productName.replace(/\s+/g, "")}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2">Click the link above or copy it into your browser</p>
                </div>

                <p className="text-xs text-gray-500">You can browse, view, and download all purchased assets directly from the SharePoint workspace.</p>

                <div className="space-y-2">
                  <p className="font-semibold text-[#18352b] text-xs">Important Information</p>
                  <ul className="space-y-1 text-xs text-gray-500">
                    {[
                      "The SharePoint workspace is provided as a secure and reliable way to deliver your purchased digital assets.",
                      "Please keep this access link private and do not share it with unauthorized users.",
                      "We recommend downloading and backing up the assets to your local storage for convenient future access.",
                      "If you experience any issues accessing the files, please contact our support team and we will assist you promptly.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-[#18352b] text-xs">Need Assistance?</p>
                  <p className="text-xs text-gray-500">If you have any questions regarding the asset structure, implementation, usage guidelines, or file organization, feel free to reach out to us. Our team will be happy to help you get the most value from your purchase.</p>
                </div>

                <p className="text-xs text-gray-500">Thank you again for choosing <strong>TruBot AI</strong>.</p>
                <p className="text-xs text-gray-500">We appreciate your trust and look forward to supporting your success.</p>

                <div><p className="text-sm font-semibold text-[#18352b]">Best Regards,</p><p className="text-sm font-bold text-blue-600">Anita</p><p className="text-xs text-gray-400">TruBot AI Team</p></div>
              </div>
              <EmailFooter />
            </EmailCard>
          </EmailOverlay>
        )}
      </AnimatePresence>

      {/* End state */}
      {showMain && (
        <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white to-white" />
          <div className="mx-auto w-full max-w-[440px] px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-600/20">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#18352b] mb-2">You&apos;re All Set!</h2>
              <p className="text-sm text-gray-400 mb-6">Your digital assets are ready. Check your emails for access details.</p>
              <button
                onClick={() => router.push("/dashboard")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Go to Dashboard
              </button>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
        <div className="mx-auto w-full max-w-[500px] px-6">
          <div className="flex items-center justify-center">
            <div className="relative">
              <Loader2 size={32} className="animate-spin text-blue-600" />
              <motion.div
                className="absolute -inset-3 rounded-full border-2 border-blue-400/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </section>
    }>
      <VerifyForm />
    </Suspense>
  );
}
