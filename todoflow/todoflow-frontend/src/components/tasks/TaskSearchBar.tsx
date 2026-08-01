"use client";

import { Search } from "lucide-react";

interface TaskSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TaskSearchBar({ value, onChange }: TaskSearchBarProps) {
  return (
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tasks..."
        className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none ring-primary/40 focus:ring-2 sm:w-64"
      />
    </div>
  );
}