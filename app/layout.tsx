import type { Metadata } from "next";
import { Barlow, Big_Shoulders, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteNav from "./site-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Stadium-signage display face and its body companion, used by the
// navigation and the home page.
const display = Big_Shoulders({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "900"],
});

const body = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
