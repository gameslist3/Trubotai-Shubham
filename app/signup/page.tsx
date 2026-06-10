"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Building2, Briefcase, Globe, Check, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const accountTypes = [
  { id: "prosumer", label: "Prosumer", icon: User, desc: "Individual professionals" },
  { id: "smb", label: "SMB", icon: Building2, desc: "Small to medium businesses" },
  { id: "agency", label: "Agency", icon: Briefcase, desc: "Creative & digital agencies" },
  { id: "enterprise", label: "Enterprise", icon: Globe, desc: "Large organizations" },
];

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";
  const [accountType, setAccountType] = useState("prosumer");
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    toast.success("Account created successfully!");
    router.push(redirect === "ltd" ? "/lifetime-deals" : "/dashboard");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white to-white" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="mx-auto w-full max-w-[500px] px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 text-[#18352b]">
                Create Your Account
              </h1>
              <p className="text-gray-500">Choose your account type and get started</p>
            </div>

            {/* Account Type Selector */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {accountTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setAccountType(type.id)}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    accountType === type.id
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <type.icon size={20} className={accountType === type.id ? "text-blue-600" : "text-gray-400"} />
                    {accountType === type.id && <Check size={16} className="text-blue-600" />}
                  </div>
                  <p className="text-sm font-medium text-[#18352b]">{type.label}</p>
                  <p className="text-xs text-gray-500">{type.desc}</p>
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-300 text-[#18352b] placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-300 text-[#18352b] placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-300 text-[#18352b] placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Repeat your password"
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-300 text-[#18352b] placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              <Button variant="primary" className="w-full rounded-xl" size="lg" isLoading={isLoading} type="submit">
                Create Account
                <ArrowRight size={18} />
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <a href={`/login${redirect ? `?redirect=${redirect}` : ""}`} className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
        <div className="mx-auto w-full max-w-[500px] px-6">
          <div className="flex items-center justify-center">
            <Loader2 size={32} className="animate-spin text-blue-600" />
          </div>
        </div>
      </section>
    }>
      <SignupForm />
    </Suspense>
  );
}
