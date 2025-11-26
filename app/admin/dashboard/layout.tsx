"use client";

import { useState } from "react";
import type React from "react";
import { Sidebar } from "@/component/dashboard/sidebar";
import { DashboardHeader } from "@/component/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMobileMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#F0F3F9]">
      <Sidebar isOpen={isMobileMenuOpen} onClose={handleMenuClose} />
      <main className="flex-1 overflow-auto">
        <DashboardHeader onMenuClick={handleMenuOpen} />
        {children}
      </main>
    </div>
  );
}
