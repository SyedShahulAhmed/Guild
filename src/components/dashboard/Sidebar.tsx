"use client";

import Link from "next/link";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Communities",
    href: "/communities",
  },
  {
    name: "Events",
    href: "/events",
  },
  {
    name: "Resources",
    href: "/resources",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-border">
      <div className="p-6">
        <h2 className="text-xl font-bold">
          Guild
        </h2>
      </div>

      <nav className="space-y-2 px-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-lg px-4 py-2 hover:bg-accent hover:text-background"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}