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

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-card px-4 py-6">
      <Link href="/dashboard" className="mb-8 px-2 text-lg font-semibold text-foreground">
        ✔ TodoFlow
      </Link>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
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
    </aside>
  );
}