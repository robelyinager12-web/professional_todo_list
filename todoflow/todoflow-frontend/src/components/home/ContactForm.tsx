"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground">Get in touch</h2>
          <p className="mt-3 text-muted-foreground">
            Questions, feedback, or partnership ideas — we&apos;d love to hear from you.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6">
            {submitted && (
              <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Thanks for reaching out — we&apos;ll get back to you soon.
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Name</label>
                <input
                  required
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                <input
                  type="email"
                  required
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Subject</label>
              <input
                required
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
              <textarea
                required
                rows={5}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-primary/40 focus:ring-2"
                placeholder="Tell us more..."
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Send Message
            </button>
          </form>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-border">
              <iframe
                title="TodoFlow office location"
                className="h-64 w-full"
                loading="lazy"
                src="https://maps.google.com/maps?q=San%20Francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"
              />
            </div>

            <div className="space-y-4 rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Phone size={16} className="text-primary" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Mail size={16} className="text-primary" />
                hello@todoflow.app
              </div>
              <div className="flex items-start gap-3 text-sm text-foreground">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                548 Market Street, San Francisco, CA 94104
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}