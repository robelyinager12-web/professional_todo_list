import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "../providers/QueryProvider";
import AuthProvider from "../providers/AuthProvider";
import ThemeProvider from "../providers/ThemeProvider";

export const metadata: Metadata = {
  title: "TodoFlow — Organize Your Life. Complete More Every Day.",
  description: "Plan, manage, prioritize, and accomplish your daily goals with TodoFlow.",
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("todoflow_theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var isDark = stored ? stored === "dark" : prefersDark;
    if (isDark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}