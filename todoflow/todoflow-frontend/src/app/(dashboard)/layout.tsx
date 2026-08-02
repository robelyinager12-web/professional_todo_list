"use client";

import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import DashboardHeader from "../../components/layout/DashboardHeader";
import PageTransition from "../../components/shared/PageTransition";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="flex-1">
        <DashboardHeader onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="p-4 sm:p-6">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}