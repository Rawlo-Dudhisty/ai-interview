import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Interview Platform",
  description: "Practice AI-powered mock interviews with instant feedback.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-slate-100 text-slate-900 antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}