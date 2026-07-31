"use client";

import { useAuthStore } from "../../store/authStore";

export default function WelcomeCard() {
  const user = useAuthStore((state) => state.user);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="rounded-xl bg-gradient-to-br from-primary to-primary/70 p-6 text-primary-foreground">
      <h1 className="text-xl font-semibold">
        {greeting}, {user?.fullName?.split(" ")[0] ?? "there"} 👋
      </h1>
      <p className="mt-1 text-sm text-primary-foreground/80">
        Here&apos;s what&apos;s on your plate today.
      </p>
    </div>
  );
}