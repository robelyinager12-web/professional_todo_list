"use client";

import { motion } from "framer-motion";
import { ListChecks, FolderKanban, CalendarDays, BellRing, Users, Moon } from "lucide-react";

const features = [
  { icon: ListChecks, title: "Task Management", desc: "Create, organize, and track tasks with full flexibility." },
  { icon: FolderKanban, title: "Smart Categories", desc: "Group tasks by work, personal, study, and more." },
  { icon: CalendarDays, title: "Calendar View", desc: "See your week and month at a glance, drag to reschedule." },
  { icon: BellRing, title: "Reminder Notifications", desc: "Never miss a deadline with timely reminders." },
  { icon: Users, title: "Team Collaboration", desc: "Share categories and tasks with teammates." },
  { icon: Moon, title: "Dark Mode", desc: "Easy on the eyes, day or night." },
];

export default function Features() {
  return (
    <section id="features" className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground">Everything you need to stay on track</h2>
          <p className="mt-3 text-muted-foreground">
            A complete toolkit for planning your day and following through.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                <Icon size={20} />
              </div>
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}