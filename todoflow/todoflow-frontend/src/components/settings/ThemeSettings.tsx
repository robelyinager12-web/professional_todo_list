"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeSettings() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("todoflow_theme");
    const dark = stored === "dark";
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("todoflow_theme", next ? "dark" : "light");
  };

  return (
    <div className="max-w-md rounded-xl border border-border bg-card p-6">
      <h2 className="mb-4 text-sm font-semibold text-foreground">Appearance</h2>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-foreground">
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
          Dark Mode
        </div>

        <button
          onClick={toggle}
          className={`relative h-6 w-11 rounded-full transition ${isDark ? "bg-primary" : "bg-muted"}`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
              isDark ? "left-5" : "left-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
}