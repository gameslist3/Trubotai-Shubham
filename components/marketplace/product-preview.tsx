import { Zap } from "lucide-react";

export function FinancePreview() {
  return (
    <div className="w-full aspect-[4/3] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="h-8 bg-gray-50 border-b border-gray-200 flex items-center px-3 gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="ml-2 text-[10px] text-gray-400 font-medium">Finance Dashboard — Preview</span>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex gap-2">
          <div className="flex-1 bg-blue-50 rounded-lg p-2.5 border border-blue-100">
            <div className="text-[9px] text-blue-600 font-semibold uppercase tracking-wider">Revenue</div>
            <div className="text-lg font-bold text-[#18352b]">$128.5K</div>
            <div className="flex items-center gap-1 text-[10px] text-green-600">
              <span>↑</span><span>+12.3%</span>
            </div>
          </div>
          <div className="flex-1 bg-emerald-50 rounded-lg p-2.5 border border-emerald-100">
            <div className="text-[9px] text-emerald-600 font-semibold uppercase tracking-wider">Burn Rate</div>
            <div className="text-lg font-bold text-[#18352b]">$42.1K</div>
            <div className="flex items-center gap-1 text-[10px] text-amber-600">
              <span>→</span><span>Stable</span>
            </div>
          </div>
          <div className="flex-1 bg-purple-50 rounded-lg p-2.5 border border-purple-100">
            <div className="text-[9px] text-purple-600 font-semibold uppercase tracking-wider">Runway</div>
            <div className="text-lg font-bold text-[#18352b]">18.2 mo</div>
            <div className="flex items-center gap-1 text-[10px] text-green-600">
              <span>↑</span><span>Healthy</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 p-2.5">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[9px] font-semibold text-gray-500 uppercase">Cash Flow Forecast</span>
            <span className="text-[9px] text-blue-600 font-medium">+15.2%</span>
          </div>
          <div className="h-12 flex items-end gap-[3px]">
            {[35, 42, 38, 45, 52, 48, 55, 62, 58, 65, 72, 68].map((h, i) => (
              <div key={i} className="flex-1 bg-blue-500/70 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function InvestorPreview() {
  return (
    <div className="w-full aspect-[4/3] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="h-8 bg-gray-50 border-b border-gray-200 flex items-center px-3 gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="ml-2 text-[10px] text-gray-400 font-medium">Investor Database — Preview</span>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded bg-purple-100 flex items-center justify-center text-[10px] text-purple-600 font-bold">I</div>
          <div className="text-[11px] font-semibold text-gray-700">Top Investors Matching Your Profile</div>
          <div className="ml-auto text-[9px] text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded font-medium">12,400+</div>
        </div>
        <div className="space-y-1.5">
          {[
            { name: "Sequoia Capital", stage: "Seed - Series B", range: "$500K - $5M" },
            { name: "a16z", stage: "Series A - C", range: "$3M - $15M" },
            { name: "YC Continuity", stage: "Late Seed", range: "$500K - $2M" },
            { name: "Index Ventures", stage: "Seed - Series A", range: "$1M - $10M" },
          ].map((inv, i) => (
            <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white flex items-center justify-center text-[9px] font-bold">{inv.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-gray-800 truncate">{inv.name}</div>
                <div className="text-[9px] text-gray-400">{inv.stage}</div>
              </div>
              <div className="text-[9px] text-purple-600 font-medium">{inv.range}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DatabasePreview() {
  return (
    <div className="w-full aspect-[4/3] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="h-8 bg-gray-50 border-b border-gray-200 flex items-center px-3 gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="ml-2 text-[10px] text-gray-400 font-medium">Database — Preview</span>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-[11px] font-semibold text-gray-700">Programs & Opportunities</div>
          <div className="ml-auto flex gap-1">
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">All</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-100 text-green-700 font-medium">Active</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">Deadline</span>
          </div>
        </div>
        <div className="space-y-1">
          {[
            { name: "SBIR Grant", amount: "$250K", deadline: "Dec 15", tag: "Government" },
            { name: "YC Accelerator", amount: "$500K", deadline: "Mar 1", tag: "Top Tier" },
            { name: "Innovation Fund", amount: "$100K", deadline: "Jan 30", tag: "Private" },
            { name: "Techstars", amount: "$120K", deadline: "Feb 15", tag: "Top Tier" },
            { name: "EU Horizon", amount: "$2M", deadline: "Apr 1", tag: "Government" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50">
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-gray-800 truncate">{item.name}</div>
                <div className="flex gap-1.5 items-center">
                  <span className="text-[9px] text-gray-400">{item.deadline}</span>
                  <span className={`text-[8px] px-1 py-0.5 rounded font-medium ${
                    item.tag === "Top Tier" ? "bg-orange-100 text-orange-700" :
                    item.tag === "Government" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>{item.tag}</span>
                </div>
              </div>
              <div className="text-[11px] font-bold text-green-600">{item.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LeadsPreview() {
  return (
    <div className="w-full aspect-[4/3] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="h-8 bg-gray-50 border-b border-gray-200 flex items-center px-3 gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="ml-2 text-[10px] text-gray-400 font-medium">B2B Leads — Preview</span>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-semibold text-gray-700">Lead Database</div>
          <div className="flex items-center gap-1 text-[9px] text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span>1,024,831 records</span>
          </div>
        </div>
        <div className="border border-gray-100 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-2 py-1 border-b border-gray-100 flex text-[8px] text-gray-500 font-semibold uppercase">
            <span className="w-[30%]">Name</span>
            <span className="w-[25%]">Company</span>
            <span className="w-[25%]">Title</span>
            <span className="w-[20%]">Industry</span>
          </div>
          {[
            { name: "Sarah Chen", company: "TechFlow Inc", title: "CTO", industry: "SaaS" },
            { name: "James Wilson", company: "DataPulse", title: "VP Eng", industry: "AI" },
            { name: "Maria Garcia", company: "CloudBase", title: "CEO", industry: "Infra" },
            { name: "Alex Kumar", company: "NexGen AI", title: "Founder", industry: "AI" },
          ].map((lead, i) => (
            <div key={i} className="px-2 py-1 border-b border-gray-50 last:border-0 flex text-[10px] text-gray-700 hover:bg-gray-50">
              <span className="w-[30%] truncate font-medium">{lead.name}</span>
              <span className="w-[25%] truncate text-gray-500">{lead.company}</span>
              <span className="w-[25%] truncate text-gray-500">{lead.title}</span>
              <span className="w-[20%] truncate">
                <span className="text-[8px] px-1 py-0.5 rounded bg-gray-100 text-gray-500">{lead.industry}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PromptsPreview() {
  return (
    <div className="w-full aspect-[4/3] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="h-8 bg-gray-50 border-b border-gray-200 flex items-center px-3 gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="ml-2 text-[10px] text-gray-400 font-medium">AI Prompts Library — Preview</span>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-[11px] font-semibold text-gray-700">Content Prompt Templates</div>
          <div className="ml-auto text-[9px] text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded font-medium">100+ Prompts</div>
        </div>
        <div className="space-y-1.5">
          {[
            { category: "Thought Leadership", prompt: "Write a post about [topic] with 3 data-backed insights..." },
            { category: "Framework Posts", prompt: "Create a 'X vs Y' comparison framework showing..." },
            { category: "Hot Take", prompt: "Share a contrarian view on [trend] backed by..." },
            { category: "Storytelling", prompt: "Open with a personal failure that taught you..." },
          ].map((p, i) => (
            <div key={i} className="p-2 rounded-lg bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Zap size={10} className="text-indigo-500" />
                <span className="text-[9px] font-semibold text-indigo-600 uppercase">{p.category}</span>
              </div>
              <div className="text-[10px] text-gray-600 italic">"{p.prompt}"</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DocumentPreview() {
  return (
    <div className="w-full aspect-[4/3] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="h-8 bg-gray-50 border-b border-gray-200 flex items-center px-3 gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="ml-2 text-[10px] text-gray-400 font-medium">Document — Preview</span>
      </div>
      <div className="p-3">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-3 py-2 border-b border-gray-200">
            <div className="h-3 w-48 bg-gray-200 rounded" />
            <div className="h-2 w-32 bg-gray-200 rounded mt-1" />
          </div>
          <div className="p-3 space-y-2">
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-0.5" />
              <div className="flex-1 space-y-1">
                <div className="h-2 w-full bg-gray-100 rounded" />
                <div className="h-2 w-3/4 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-0.5" />
              <div className="flex-1 space-y-1">
                <div className="h-2 w-full bg-gray-100 rounded" />
                <div className="h-2 w-2/3 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-0.5" />
              <div className="flex-1 space-y-1">
                <div className="h-2 w-full bg-gray-100 rounded" />
                <div className="h-2 w-4/5 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-0.5" />
              <div className="flex-1 space-y-1">
                <div className="h-2 w-full bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RealEstatePreview() {
  return (
    <div className="w-full aspect-[4/3] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="h-8 bg-gray-50 border-b border-gray-200 flex items-center px-3 gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="ml-2 text-[10px] text-gray-400 font-medium">Real Estate — Preview</span>
      </div>
      <div className="p-3 space-y-2">
        <div className="flex gap-2">
          <div className="flex-1 bg-rose-50 rounded-lg p-2 border border-rose-100">
            <div className="text-[9px] text-rose-600 font-semibold uppercase">Property Value</div>
            <div className="text-base font-bold text-[#18352b]">$425K</div>
            <div className="text-[9px] text-green-600">↑ +8.2% YoY</div>
          </div>
          <div className="flex-1 bg-blue-50 rounded-lg p-2 border border-blue-100">
            <div className="text-[9px] text-blue-600 font-semibold uppercase">Cash Flow</div>
            <div className="text-base font-bold text-[#18352b]">+$1,850/mo</div>
            <div className="text-[9px] text-green-600">Cap Rate: 5.2%</div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 p-2.5">
          <div className="text-[9px] font-semibold text-gray-500 uppercase mb-1">Investment Scorecard</div>
          <div className="space-y-1">
            {[
              { label: "ROI Potential", value: 85 },
              { label: "Location Score", value: 92 },
              { label: "Risk Assessment", value: 72 },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[9px] text-gray-500 w-24">{s.label}</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.value}%` }} />
                </div>
                <span className="text-[9px] font-medium text-gray-700 w-6 text-right">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
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
