"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { toast } from "react-hot-toast";

export default function DashboardSettingsPage() {
  return (
    <div className="flex min-h-screen pt-16">
      <DashboardSidebar />
      
      <div className="flex-1 ml-0 lg:ml-64 p-6 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
            <p className="text-muted-light">Manage your account settings</p>
          </div>

          <div className="space-y-6 max-w-2xl">
            <GlassCard>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile</h3>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-light mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full px-4 py-3 rounded-xl glass text-gray-900 focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full px-4 py-3 rounded-xl glass text-gray-900 focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full px-4 py-3 rounded-xl glass text-gray-900 focus:outline-none focus:border-blue-500/50 transition-all"
                  />
                </div>
                <Button variant="primary" onClick={() => toast.success("Settings saved!")}>
                  Save Changes
                </Button>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  "Email notifications for purchases",
                  "Weekly newsletter & updates",
                  "Product updates & changelog",
                  "Marketing & promotional emails",
                ].map((pref) => (
                  <label key={pref} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">{pref}</span>
                  </label>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Danger Zone</h3>
              <p className="text-sm text-gray-600 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="secondary" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                Delete Account
              </Button>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
