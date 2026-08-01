"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LayoutDashboard, KanbanSquare, CalendarDays, BarChart3, Moon, Smartphone } from "lucide-react";

const shots = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard, gradient: "from-indigo-500 to-purple-500" },
  { key: "board", label: "Task Board", icon: KanbanSquare, gradient: "from-sky-500 to-blue-500" },
  { key: "calendar", label: "Calendar", icon: CalendarDays, gradient: "from-emerald-500 to-teal-500" },
  { key: "analytics", label: "Analytics", icon: BarChart3, gradient: "from-amber-500 to-orange-500" },
  { key: "dark", label: "Dark Mode", icon: Moon, gradient: "from-slate-700 to-slate-900" },
  { key: "mobile", label: "Mobile Version", icon: Smartphone, gradient: "from-pink-500 to-rose-500" },
];

export default function Gallery() {
  const [active, setActive] = useState<(typeof shots)[number] | null>(null);

  return (
    <section id="gallery" className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground">See TodoFlow in action</h2>
          <p className="mt-3 text-muted-foreground">
            A closer look at the dashboard, calendar, and everything in between.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shots.map((shot, i) => (
            <motion.button
              key={shot.key}
              onClick={() => setActive(shot)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative aspect-video overflow-hidden rounded-xl border border-border shadow-sm transition hover:shadow-lg"
            >
              <div
                className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${shot.gradient} transition duration-300 group-hover:scale-105`}
              >
                <shot.icon size={40} className="text-white/90" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-black/40 px-4 py-2 text-left text-sm font-medium text-white backdrop-blur-sm">
                {shot.label}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2 text-white"
              >
                <X size={18} />
              </button>
              <div className={`flex aspect-video items-center justify-center bg-gradient-to-br ${active.gradient}`}>
                <active.icon size={72} className="text-white/90" />
              </div>
              <div className="bg-card px-6 py-4">
                <p className="text-sm font-medium text-foreground">{active.label}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}