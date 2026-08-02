"use client";

import { useAuthStore } from "../../store/authStore";
import NotificationBell from "./NotificationBell";
import ThemeToggle from "../shared/ThemeToggle";

export default function DashboardHeader() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div>
        <p className="text-sm text-muted-foreground">Welcome back,</p>
        <p className="text-sm font-medium text-foreground">{user?.fullName ?? "there"}</p>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <NotificationBell />
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {user?.fullName?.charAt(0).toUpperCase() ?? "U"}
        </div>
      </div>
    </header>
  );
}