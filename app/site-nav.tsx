"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/ingredients", label: "Ingredients" },
  { href: "/menus", label: "Menus" },
];

// Stadium-board navigation: a floodlight-yellow band with the current page
// lit up like a scoreboard segment.
export default function SiteNav() {
  // trailingSlash is on, so "/menus/" and "/menus" are the same page.
  const pathname = usePathname().replace(/(.)\/$/, "$1");

  return (
    <header className="border-b-4 border-[#14231A] bg-[#F5C518] text-[#14231A] dark:bg-[#E0B310]">
      <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-2xl leading-none font-black uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14231A]"
        >
          My Sustainable Menus
        </Link>
        <ul className="grid grid-cols-4 gap-1 font-[family-name:var(--font-body)] text-sm font-semibold sm:flex sm:text-base">
          {links.map((link) => {
            const current = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={`block rounded-sm px-3 py-2 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14231A] ${
                    current
                      ? "bg-[#14231A] text-[#F5C518]"
                      : "hover:bg-[#14231A]/10"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
