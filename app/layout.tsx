import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Sustainable Menus",
  description:
    "Help chefs design menus with a low carbon footprint by tracking the carbon impact of every ingredient and portion.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="flex gap-6 px-4 py-3 font-sans text-sm">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/ingredients">Ingredients</Link>
          <Link href="/menus">Menus</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
