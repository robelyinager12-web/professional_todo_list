"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background px-6 py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Organize Your Life. Complete More Every Day.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Plan, manage, prioritize, and accomplish your daily goals using the most beautiful Todo application.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Get Started
            </Link>
            <button className="flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:bg-muted">
              <PlayCircle size={18} />
              Live Demo
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="space-y-3">
              {["Finish quarterly report", "Team standup at 10am", "Review pull requests"].map((item, i) => (
                <motion.div
                  key={item}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
                >
                  <span className="h-4 w-4 rounded-full border-2 border-primary" />
                  <span className="text-sm text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}