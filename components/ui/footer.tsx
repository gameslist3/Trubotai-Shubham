"use client";

import Link from "next/link";

const footerLinks = {
  Products: [
    { href: "/marketplace", label: "Digital Assets" },
    { href: "/lifetime-deals", label: "Lifetime Deals" },
    { href: "/lifetime-deals#trulead", label: "TruLead" },
    { href: "/lifetime-deals#trusocial", label: "TruSocial" },
    { href: "/lifetime-deals#trucrm", label: "TruCRM" },
    { href: "/lifetime-deals#truerp", label: "TruERP" },
  ],
  Solutions: [
    { href: "/marketplace", label: "Asset Marketplace" },
    { href: "/marketplace/investor-database", label: "Investor Database" },
    { href: "/marketplace/1m-leads", label: "B2B Leads" },
    { href: "/marketplace/grant-database", label: "Grant Database" },
    { href: "/marketplace/prd-bundle", label: "PRD Bundle" },
    { href: "/marketplace/gtm-strategy", label: "GTM and Strategy" },
    { href: "/marketplace/nda-pack", label: "NDA Pack" },
    { href: "/marketplace/ma-strategy", label: "M&A Strategy" },
    { href: "/marketplace/channel-partners", label: "Channel Partners" },
    { href: "/marketplace/website-content", label: "Website Content" },
  ],
  Company: [
    { href: "#", label: "About Us" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
  ],
  Support: [
    { href: "#", label: "Documentation" },
    { href: "#", label: "API Reference" },
    { href: "#", label: "Community" },
    { href: "/delivery-status", label: "Delivery Status" },
    { href: "#", label: "Contact Us" },
  ],
};

import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  // Hide footer on standalone email-access page
  if (pathname === "/email-access") return null;

  return (
    <footer className="relative bg-[#0f172a] border-t border-gray-800 overflow-hidden">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-8 lg:px-12 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-lg text-white">
                TruBot<span className="text-blue-400">AI</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Enterprise-grade digital assets marketplace and lifetime software
              solutions for modern teams.
            </p>
            <div className="flex gap-3">
              {["twitter", "github", "linkedin"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-600 transition-all"
                >
                  <span className="text-xs font-medium capitalize">{social[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-gray-200 font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TruBotAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
