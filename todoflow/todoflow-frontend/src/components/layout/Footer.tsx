import Link from "next/link";
import { Github, Linkedin, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-semibold text-foreground">✔ TodoFlow</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Organize your life. Complete more every day.
          </p>
          <div className="mt-4 flex gap-3 text-muted-foreground">
            <a href="https://github.com/robelyinager12-web/robelyinager12-web" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-foreground">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/robel-yinager-943b37419/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-foreground">
              <Linkedin size={18} />
            </a>
            <a href="https://t.me/robaNew05" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="hover:text-foreground">
              <Send size={18} />
            </a>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-foreground">Quick Links</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-foreground">Resources</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-foreground">Stay updated</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
            />
            <button className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
              Join
            </button>
          </form>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-7xl text-xs text-muted-foreground">
        © {new Date().getFullYear()} TodoFlow. All rights reserved.
      </p>
    </footer>
  );
}