"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import {
  FolderOpen,
  Mail,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  HardDrive,
  Shield,
  RefreshCw,
  FileSpreadsheet,
  FileImage,
  FileText,
  Layers,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: HardDrive, label: "Centralized Storage", desc: "All assets hosted on SharePoint" },
  { icon: Shield, label: "Secure Access", desc: "Enterprise-grade security & permissions" },
  { icon: RefreshCw, label: "Auto-Synced", desc: "Always up-to-date with latest versions" },
];

const fileIcons = [FileSpreadsheet, FileImage, FileText, Layers, Database];

export default function DashboardDownloadsPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // Simulate sending
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen pt-16">
      <DashboardSidebar />

      <div className="flex-1 ml-0 lg:ml-64 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-100/40 to-purple-100/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-orange-100/30 to-amber-100/20 blur-3xl" />
        </div>

        <div className="relative z-10 min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-2xl"
          >
            {/* Hero card */}
            <div className="bg-white border border-gray-200/80 rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden">
              {/* Top accent bar */}
              <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500" />

              <div className="p-8 md:p-10">
                {!sent ? (
                  <>
                    {/* Floating file icons decoration */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                      {fileIcons.map((Icon, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.4 }}
                          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center shadow-sm"
                        >
                          <Icon size={20} className="text-gray-500" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Title */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="text-center mb-8"
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100/50 text-xs font-medium text-blue-700 mb-4">
                        <FolderOpen size={14} />
                        All files hosted on Microsoft SharePoint
                      </div>
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Your Files, Ready in{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          SharePoint
                        </span>
                      </h1>
                      <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
                        Enter your email and we&apos;ll send you the secure link to your private
                        SharePoint folder with all your purchased assets.
                      </p>
                    </motion.div>

                    {/* Email Form */}
                    <motion.form
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      onSubmit={handleSubmit}
                      className="max-w-md mx-auto mb-8"
                    >
                      <div className="relative group">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center gap-2 bg-white border-2 border-gray-200 rounded-2xl px-4 py-1.5 shadow-sm group-focus-within:border-blue-400 group-focus-within:shadow-md group-focus-within:shadow-blue-500/10 transition-all duration-300">
                          <Mail size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300 flex-shrink-0" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            className="flex-1 py-3 bg-transparent text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none"
                          />
                          <Button
                            type="submit"
                            variant="primary"
                            size="md"
                            isLoading={loading}
                            disabled={!email.trim()}
                            className="rounded-xl whitespace-nowrap"
                          >
                            Send Link
                            <ArrowRight size={15} />
                          </Button>
                        </div>
                      </div>
                    </motion.form>

                    {/* Features */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100"
                    >
                      {features.map((f) => (
                        <div key={f.label} className="text-center">
                          <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto mb-2">
                            <f.icon size={16} className="text-gray-600" />
                          </div>
                          <p className="text-xs font-semibold text-gray-800">{f.label}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{f.desc}</p>
                        </div>
                      ))}
                    </motion.div>
                  </>
                ) : (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
                      className="w-20 h-20 rounded-3xl bg-gradient-to-br from-green-100 to-emerald-100 border border-green-200 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200/50"
                    >
                      <CheckCircle2 size={40} className="text-green-600" />
                    </motion.div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Link Sent! 🎉</h2>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                      We&apos;ve sent the SharePoint folder link to{" "}
                      <span className="font-semibold text-gray-800">{email}</span>.
                      Check your inbox (and spam folder just in case).
                    </p>

                    <div className="flex flex-col items-center gap-3">
                      <a
                        href="https://truerpai-my.sharepoint.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="primary" size="lg">
                          <ExternalLink size={16} />
                          Open SharePoint Folder
                        </Button>
                      </a>
                      <button
                        onClick={() => {
                          setSent(false);
                          setEmail("");
                        }}
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors underline underline-offset-2"
                      >
                        Send to a different email
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
