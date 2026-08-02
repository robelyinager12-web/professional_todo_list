"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../shared/ThemeToggle";

const links = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Gallery", href: "/gallery" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-foreground">
          ✔ TodoFlow
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Sign Up
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className="text-foreground">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-muted-foreground">
                {link.label}
              </Link>
            ))}
            <Link href="/login" className="text-sm font-medium text-foreground">
              Login
            </Link>
            <Link href="/register" className="text-sm font-medium text-primary">
              Sign Up
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}