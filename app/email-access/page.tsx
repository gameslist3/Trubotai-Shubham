"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Image from "next/image";

function EmailAccessContent() {
  const searchParams = useSearchParams();
  const product = searchParams.get("product") || "";
  const email = searchParams.get("email") || "customer@example.com";
  const price = searchParams.get("price") || "0";

  const productName = product.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="fixed inset-0 overflow-hidden bg-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image src="/email.png" alt="Email background" fill className="object-cover" priority />
      </div>

      {/* Email card */}
      <div className="absolute right-[4%] top-[8%] bottom-[8%] w-[65%] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-2xl shadow-2xl border border-gray-200/80 overflow-hidden min-h-full flex flex-col"
        >
          <div className="flex-1 overflow-y-auto">
            {/* Email Header */}
            <div className="px-6 py-4 border-b border-gray-100 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">T</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#18352b]">TruBot AI</p>
                  <p className="text-xs text-gray-400">support@trubotai.com</p>
                </div>
                <div className="text-xs text-gray-400 flex-shrink-0">{today}</div>
              </div>
              <p className="text-sm font-medium text-[#18352b]">Your Digital Assets Access — {productName}</p>
              <p className="text-xs text-gray-400">to: {email}</p>
            </div>

            {/* Email Body */}
            <div className="px-7 py-6 space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>Hi {email.split("@")[0]},</p>

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
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function EmailAccessPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <Loader2 size={32} className="animate-spin text-blue-600" />
      </div>
    }>
      <EmailAccessContent />
    </Suspense>
  );
}
