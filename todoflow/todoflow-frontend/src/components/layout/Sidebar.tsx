"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ListTodo,
  Calendar,
  BarChart3,
  Tag,
  CheckCircle2,
  Archive,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Tasks", href: "/dashboard/tasks", icon: ListTodo },
  { label: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Categories", href: "/dashboard/categories", icon: Tag },
  { label: "Completed", href: "/dashboard/completed", icon: CheckCircle2 },
  { label: "Archived", href: "/dashboard/archived", icon: Archive },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  const content = (
    <>
      <div className="mb-8 flex items-center justify-between px-2">
        <Link href="/dashboard" className="text-lg font-semibold text-foreground" onClick={onClose}>
          ✔ TodoFlow
        </Link>
        <button onClick={onClose} className="text-muted-foreground lg:hidden">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-destructive"
      >
        <LogOut size={18} />
        Logout
      </button>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card px-4 py-6 lg:flex">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={onClose} />
          <aside className="fixed inset-y-0 left-0 flex w-64 flex-col bg-card px-4 py-6 shadow-xl">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}