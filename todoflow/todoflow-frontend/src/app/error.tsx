"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-semibold text-foreground">Something went wrong</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">An unexpected error occurred. You can try again, or head back to the homepage.</p>
      <div className="mt-6 flex gap-3">
        <button onClick={reset} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90">Try again</button>
        <Link href="/" className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted">Go home</Link>
      </div>
    </div>
  );
}