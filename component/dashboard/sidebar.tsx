"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { label: "Articles", icon: FileText, href: "/admin/dashboard/articles" },
    { label: "Analytics", icon: BarChart3, href: "/admin/dashboard/analytics" },
    { label: "Settings", icon: Settings, href: "/admin/dashboard/settings" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="w-64 bg-[#003366] text-white hidden sm:flex flex-col">
        {/* Logo */}
        <div className="flex flex-row md:flex-col gap-3 px-4 md:px-6 py-6 items-center md:items-start justify-between">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-lg bg-[#FAFAFA] flex items-center justify-center">
              <img src="/primary-lens.svg" alt="Lens" className="w-9 h-9" />
            </div>
            <h1 className="text-lg md:text-2xl font-bold text-[#FAFAFA] mt-1">
              THE LENS
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Exact match for Dashboard, startsWith for others
            const isActive =
              item.href === "/admin/dashboard"
                ? pathname === item.href
                : pathname === item.href ||
                  pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#00264C] text-white"
                    : "text-blue-100 hover:bg-[#00264C]/40"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Mobile Sidebar */}
          <div className="fixed inset-y-0 left-0 w-64 bg-[#003366] text-white z-50 flex flex-col sm:hidden animate-slide-in">
            {/* Logo */}
            <div className="flex flex-row gap-3 px-4 py-6 items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-lg bg-[#FAFAFA] flex items-center justify-center">
                  <img src="/primary-lens.svg" alt="Lens" className="w-9 h-9" />
                </div>
                <h1 className="text-lg font-bold text-[#FAFAFA] mt-1">
                  THE LENS
                </h1>
              </div>

              <button onClick={onClose} type="button" aria-label="Close menu">
                <X className="w-6 h-6 text-white hover:cursor-pointer" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#00264C] text-white"
                        : "text-blue-100 hover:bg-[#00264C]/40"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
