import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "../providers/QueryProvider";
import AuthProvider from "../providers/AuthProvider";

export const metadata: Metadata = {
  title: "TodoFlow — Organize Your Life. Complete More Every Day.",
  description: "Plan, manage, prioritize, and accomplish your daily goals with TodoFlow.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}