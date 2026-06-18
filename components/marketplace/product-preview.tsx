"use client";

import { Zap, Building, Database, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

/* ── Floating emoji sticker helper ── */
function Stickers({ items }: { items: { emoji: string; x: number; y: number; rot: number; delay: number }[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: s.delay + 0.4, type: "spring", stiffness: 200, damping: 10 }}
          className="absolute text-3xl md:text-4xl select-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, transform: `rotate(${s.rot}deg)` }}
        >
          <motion.span
            animate={{ y: [0, -3, 0], rotate: [0, s.rot + 5, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
            className="inline-block drop-shadow-md"
          >
            {s.emoji}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Finance ── */
export function FinancePreview() {
  return (
    <div className="w-full aspect-[4/3] bg-white overflow-hidden flex flex-col relative">
      <Stickers items={[
        { emoji: "💰", x: 3, y: 4, rot: -15, delay: 0 },
        { emoji: "📈", x: 85, y: 4, rot: 10, delay: 0.3 },
        { emoji: "⚡", x: 50, y: 85, rot: -8, delay: 0.6 },
      ]} />
      <div className="flex items-center px-3 py-2 gap-1.5 border-b border-gray-100">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-green-400" />
      </div>
      <div className="flex-1 p-3 flex flex-col gap-3">
        <div className="flex gap-2 flex-[2]">
          {[
            { value: "$128.5K", label: "Revenue", change: "+12.3%", up: true },
            { value: "18.2 mo", label: "Runway", change: "Healthy", up: true },
            { value: "$42.1K", label: "Burn", change: "Stable", up: false },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 bg-blue-50/60 rounded-xl border border-blue-100/60 flex flex-col items-center justify-center p-2"
            >
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 120 }}
                className="text-lg md:text-xl font-bold text-[#18352b]"
              >
                {card.value}
              </motion.span>
              <div className="flex items-center gap-1 mt-0.5">
                <motion.span
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className={`text-[10px] ${card.up ? "text-green-600" : "text-amber-600"}`}
                >↑</motion.span>
                <span className={`text-[9px] font-medium ${card.up ? "text-green-600" : "text-amber-600"}`}>{card.change}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-[3] bg-gray-50/80 rounded-xl border border-gray-100 p-3 flex flex-col"
        >
          <div className="flex-1 flex items-end gap-[2px]">
            {[35, 42, 38, 45, 52, 48, 55, 62, 58, 65, 72, 68].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
                className="flex-1 bg-gradient-to-t from-blue-400 to-blue-300 rounded-t-sm"
                whileHover={{ opacity: 0.7 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Investor ── */
export function InvestorPreview() {
  return (
    <div className="w-full aspect-[4/3] bg-white overflow-hidden flex flex-col relative">
      <Stickers items={[
        { emoji: "🚀", x: 3, y: 4, rot: 12, delay: 0 },
        { emoji: "💼", x: 85, y: 4, rot: -10, delay: 0.3 },
        { emoji: "🎯", x: 50, y: 85, rot: 8, delay: 0.6 },
      ]} />
      <div className="flex items-center px-3 py-2 gap-1.5 border-b border-gray-100">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-green-400" />
      </div>
      <div className="flex-1 p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center"
          >
            <Building size={12} className="text-blue-600" />
          </motion.div>
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-semibold"
          >12.4K</motion.span>
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          {[
            { name: "Sequoia", range: "$500K–$5M", initials: "SC" },
            { name: "a16z", range: "$3M–$15M", initials: "A" },
            { name: "YC Continuity", range: "$500K–$2M", initials: "YC" },
            { name: "Index Ventures", range: "$1M–$10M", initials: "IV" },
          ].map((inv, i) => (
            <motion.div
              key={inv.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors flex-1"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0"
              >
                {inv.initials}
              </motion.div>
              <span className="text-[11px] font-semibold text-[#18352b] flex-1 truncate">{inv.name}</span>
              <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="text-[9px] text-blue-600 font-medium"
              >{inv.range}</motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Database ── */
export function DatabasePreview() {
  return (
    <div className="w-full aspect-[4/3] bg-white overflow-hidden flex flex-col relative">
      <Stickers items={[
        { emoji: "🗄️", x: 3, y: 4, rot: 8, delay: 0 },
        { emoji: "🔍", x: 85, y: 4, rot: -12, delay: 0.3 },
        { emoji: "🏆", x: 50, y: 85, rot: 5, delay: 0.6 },
      ]} />
      <div className="flex items-center px-3 py-2 gap-1.5 border-b border-gray-100">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-green-400" />
      </div>
      <div className="flex-1 p-3 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Database size={12} className="text-blue-600" />
          <div className="flex gap-1 ml-auto">
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium">All</span>
            <motion.span
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[8px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-medium"
            >Live</motion.span>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          {[
            { name: "SBIR Grant", amount: "$250K", tag: "Grant" },
            { name: "YC Accelerator", amount: "$500K", tag: "Top" },
            { name: "Innovation Fund", amount: "$100K", tag: "Fund" },
            { name: "Techstars", amount: "$120K", tag: "Top" },
            { name: "EU Horizon", amount: "$2M", tag: "Grant" },
          ].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 transition-colors flex-1"
            >
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <span className="text-[11px] font-semibold text-[#18352b] truncate">{item.name}</span>
                <span className={`text-[7px] px-1 py-0.5 rounded font-semibold ${
                  item.tag === "Top" ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
                }`}>{item.tag}</span>
              </div>
              <motion.span
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className="text-[10px] font-bold text-green-600"
              >{item.amount}</motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Leads ── */
export function LeadsPreview() {
  return (
    <div className="w-full aspect-[4/3] bg-white overflow-hidden flex flex-col relative">
      <Stickers items={[
        { emoji: "👥", x: 3, y: 4, rot: -10, delay: 0 },
        { emoji: "📞", x: 85, y: 4, rot: 12, delay: 0.3 },
        { emoji: "🎯", x: 50, y: 85, rot: -5, delay: 0.6 },
      ]} />
      <div className="flex items-center px-3 py-2 gap-1.5 border-b border-gray-100">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-green-400" />
      </div>
      <div className="flex-1 p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Users size={12} className="text-blue-600" />
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-1"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"
            />
            <span className="text-[8px] text-gray-400 font-medium">1M+</span>
          </motion.div>
        </div>
        <div className="flex-1 border border-gray-100 rounded-lg overflow-hidden flex flex-col">
          <div className="bg-gray-50 px-2 py-1 border-b border-gray-100 flex text-[7px] text-gray-400 font-semibold uppercase">
            <span className="w-[28%]">Name</span>
            <span className="w-[24%]">Company</span>
            <span className="w-[24%]">Role</span>
            <span className="w-[24%]">Industry</span>
          </div>
          <div className="flex-1 flex flex-col">
            {[
              { name: "Sarah Chen", company: "TechFlow", role: "CTO", ind: "SaaS" },
              { name: "James Wilson", company: "DataPulse", role: "VP Eng", ind: "AI" },
              { name: "Maria Garcia", company: "CloudBase", role: "CEO", ind: "Infra" },
              { name: "Alex Kumar", company: "NexGen", role: "Founder", ind: "AI" },
            ].map((lead, i) => (
              <motion.div
                key={lead.name}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center px-2 py-1 border-b border-gray-50 last:border-0 text-[9px] text-gray-600 hover:bg-gray-50 transition-colors flex-1"
              >
                <span className="w-[28%] truncate font-medium">{lead.name}</span>
                <span className="w-[24%] truncate text-gray-400">{lead.company}</span>
                <span className="w-[24%] truncate text-gray-400">{lead.role}</span>
                <span className="w-[24%] truncate">
                  <span className="text-[7px] px-1 py-0.5 rounded bg-gray-100 text-gray-500 font-medium">{lead.ind}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Prompts ── */
export function PromptsPreview() {
  return (
    <div className="w-full aspect-[4/3] bg-white overflow-hidden flex flex-col relative">
      <Stickers items={[
        { emoji: "🤖", x: 3, y: 4, rot: -10, delay: 0 },
        { emoji: "✨", x: 85, y: 4, rot: 15, delay: 0.3 },
        { emoji: "💡", x: 50, y: 85, rot: -8, delay: 0.6 },
      ]} />
      <div className="flex items-center px-3 py-2 gap-1.5 border-b border-gray-100">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-green-400" />
      </div>
      <div className="flex-1 p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Sparkles size={12} className="text-blue-600" />
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[8px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-semibold"
          >100+</motion.span>
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          {[
            { cat: "Thought Leadership", color: "text-blue-600" },
            { cat: "Framework Posts", color: "text-green-600" },
            { cat: "Hot Take", color: "text-amber-600" },
            { cat: "Storytelling", color: "text-blue-500" },
          ].map((p, i) => (
            <motion.div
              key={p.cat}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors flex-1"
            >
              <motion.div
                animate={{ rotate: [0, 12, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                <Zap size={12} className={p.color} />
              </motion.div>
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{p.cat}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Document ── */
export function DocumentPreview() {
  return (
    <div className="w-full aspect-[4/3] bg-white overflow-hidden flex flex-col relative">
      <Stickers items={[
        { emoji: "📄", x: 3, y: 4, rot: -10, delay: 0 },
        { emoji: "📝", x: 85, y: 4, rot: 12, delay: 0.3 },
        { emoji: "✅", x: 50, y: 85, rot: -5, delay: 0.6 },
      ]} />
      <div className="flex items-center px-3 py-2 gap-1.5 border-b border-gray-100">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-green-400" />
      </div>
      <div className="flex-1 p-3 flex flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 border border-gray-100 rounded-lg overflow-hidden flex flex-col"
        >
          <div className="bg-gray-50 px-3 py-2 border-b border-gray-100">
            <motion.div
              animate={{ width: ["60%", "50%", "60%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="h-3 bg-gray-200 rounded"
            />
            <motion.div
              animate={{ width: ["40%", "35%", "40%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 bg-gray-100 rounded mt-1.5"
            />
          </div>
          <div className="flex-1 p-3 flex flex-col gap-2">
            {[
              { color: "bg-blue-400" },
              { color: "bg-green-400" },
              { color: "bg-amber-400" },
              { color: "bg-blue-300" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 flex-1"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`}
                />
                <div className="flex-1 flex flex-col gap-1 justify-center">
                  <div className="h-2 bg-gray-100 rounded" style={{ width: `${75 - i * 5}%` }} />
                  <div className="h-1.5 bg-gray-50 rounded" style={{ width: `${55 - i * 5}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Real Estate ── */
export function RealEstatePreview() {
  return (
    <div className="w-full aspect-[4/3] bg-white overflow-hidden flex flex-col relative">
      <Stickers items={[
        { emoji: "🏠", x: 3, y: 4, rot: -12, delay: 0 },
        { emoji: "🔑", x: 85, y: 4, rot: 10, delay: 0.3 },
        { emoji: "💰", x: 50, y: 85, rot: -8, delay: 0.6 },
      ]} />
      <div className="flex items-center px-3 py-2 gap-1.5 border-b border-gray-100">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="w-2 h-2 rounded-full bg-green-400" />
      </div>
      <div className="flex-1 p-3 flex flex-col gap-3">
        <div className="flex gap-2 flex-[2]">
          {[
            { value: "$425K", label: "Value", change: "+8.2%" },
            { value: "+$1.8K", label: "Cash Flow", change: "5.2% Cap" },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 bg-blue-50/60 rounded-xl border border-blue-100/60 flex flex-col items-center justify-center p-2"
            >
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 120 }}
                className="text-lg font-bold text-[#18352b]"
              >
                {card.value}
              </motion.span>
              <span className="text-[8px] text-green-600 font-medium mt-0.5">{card.change}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-[3] bg-gray-50/80 rounded-xl border border-gray-100 p-3 flex flex-col gap-2 justify-center"
        >
          {[
            { label: "ROI", value: 85 },
            { label: "Location", value: 92 },
            { label: "Risk", value: 72 },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-[8px] text-gray-400 font-medium w-10">{s.label}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.value}%` }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-300 rounded-full"
                />
              </div>
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className="text-[9px] font-medium text-gray-500 w-7 text-right"
              >{s.value}%</motion.span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function ProductPreview({ type }: { type: string }) {
  switch (type) {
    case "finance": return <FinancePreview />;
    case "investor": return <InvestorPreview />;
    case "database": return <DatabasePreview />;
    case "leads": return <LeadsPreview />;
    case "prompts": return <PromptsPreview />;
    case "realestate": return <RealEstatePreview />;
    default: return <DocumentPreview />;
  }
}
