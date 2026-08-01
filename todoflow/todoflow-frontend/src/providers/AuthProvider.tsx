"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { fetchMe } from "../lib/api/auth";
import { useAuthStore } from "../store/authStore";

function isProtectedPath(pathname: string) {
  return pathname.startsWith("/dashboard");
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setAuth, clearAuth } = useAuthStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("todoflow_token") : null;

    if (!storedToken) {
      setChecked(true);
      if (isProtectedPath(pathname)) {
        router.push("/login");
      }
      return;
    }

    if (user) {
      setChecked(true);
      return;
    }

    fetchMe()
      .then(({ user: freshUser }) => {
        setAuth(freshUser, storedToken);
      })
      .catch(() => {
        clearAuth();
        if (isProtectedPath(pathname)) {
          router.push("/login");
        }
      })
      .finally(() => setChecked(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!checked && isProtectedPath(pathname)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}