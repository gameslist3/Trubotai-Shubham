"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type DropdownItem = { label: string; href: string; badge?: string };

const productsDropdown: DropdownItem[] = [
  { label: "AI 360", href: "/marketplace" },
  { label: "TruSocial", href: "/lifetime-deals#trusocial" },
  { label: "TruCRM", href: "/lifetime-deals#trucrm" },
  { label: "TruLead", href: "/lifetime-deals#trulead" },
  { label: "TruChat & TruVoice", href: "/lifetime-deals" },
  { label: "TruERP", href: "/lifetime-deals#truerp" },
  { label: "AI Agents", href: "/lifetime-deals" },
  { label: "AI 720", href: "/marketplace" },
  { label: "AI Marketplace", href: "/marketplace" },
  { label: "AI Powered Surveillance", href: "/lifetime-deals" },
  { label: "Smart Invoice Processing", href: "/lifetime-deals" },
  { label: "Software Aggregator", href: "/marketplace" },
  { label: "Intelligent Sourcing Platform", href: "/marketplace" },
  { label: "AI 1080", href: "#", badge: "Coming soon" },
];

const solutionsDropdown: DropdownItem[] = [
  { label: "Retail & E-commerce", href: "/marketplace" },
  { label: "Financial Services", href: "/marketplace" },
  { label: "Healthcare", href: "/marketplace" },
  { label: "Manufacturing", href: "/marketplace" },
  { label: "Professional Services", href: "/marketplace" },
];

const partnersDropdown: DropdownItem[] = [
  { label: "White Label Partners", href: "#" },
  { label: "Implementation Partner", href: "#" },
  { label: "Technology Partner", href: "#" },
  { label: "Strategic Partner", href: "#" },
  { label: "Sales Partner", href: "#" },
  { label: "Startup Program", href: "#" },
  { label: "Royalty Program", href: "#" },
  { label: "Reseller Program", href: "#" },
];

const companyDropdown: DropdownItem[] = [
  { label: "About", href: "#" },
  { label: "Investor Relations", href: "#" },
  { label: "SME Empowerment", href: "#" },
  { label: "M&A Opportunities", href: "#" },
  { label: "Our Culture", href: "#" },
  { label: "Join Our Team", href: "#" },
  { label: "Contact Us", href: "#" },
];

const navItems: { label: string; items: DropdownItem[] }[] = [
  { label: "Products", items: productsDropdown },
  { label: "Solutions", items: solutionsDropdown },
  { label: "Partners", items: partnersDropdown },
  { label: "Company", items: companyDropdown },
];

function MegaMenu({
  label,
  items,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: {
  label: string;
  items: DropdownItem[];
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button className="text-base font-medium text-gray-900 hover:text-blue-500 transition-colors flex items-center gap-1">
        {label}
        <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
          >
            <div className="bg-white border border-gray-200 rounded-xl shadow-xl shadow-black/5 min-w-[220px] py-2">
              {items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block px-5 py-2.5 text-sm text-gray-700 hover:text-blue-500 hover:bg-blue-50/50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // Hide navbar on standalone email-access page
  if (pathname === "/email-access") return null;

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[81px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-bold text-lg text-gray-900">
              TruBot <span className="text-blue-500">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <MegaMenu
                key={item.label}
                label={item.label}
                items={item.items}
                isOpen={openDropdown === item.label}
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/marketplace">
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors shadow-sm">
                Buy Digital Assets
              </button>
            </Link>
            <Link href="/lifetime-deals">
              <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium px-5 py-2.5 rounded-md transition-colors">
                Book a Demo
              </button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-lg overflow-auto max-h-[calc(100vh-81px)]"
          >
            <div className="px-4 py-4">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className="flex items-center justify-between w-full px-3 py-3.5 text-base font-medium text-gray-700 hover:text-blue-500 transition-colors"
                  >
                    {item.label}
                    <ChevronDown size={16} className={`transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-2 pl-3">
                          {item.items.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="block px-3 py-2.5 text-sm text-gray-600 hover:text-blue-500 rounded-md hover:bg-blue-50/50 transition-colors"
                              onClick={() => setIsMobileOpen(false)}
                            >
                              <div className="flex items-center justify-between">
                                <span>{sub.label}</span>
                                {sub.badge && (
                                  <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <Link href="/marketplace">
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-3 rounded-md transition-colors">
                    Buy Digital Assets
                  </button>
                </Link>
                <Link href="/lifetime-deals">
                  <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium px-5 py-3 rounded-md transition-colors">
                    Book a Demo
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
