"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Features", href: "#features" },
    { name: "Communities", href: "#communities" },
    { name: "Events", href: "#events" },
    { name: "Resources", href: "#resources" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-accent text-3xl font-black tracking-wide transition-all duration-300 sm:text-4xl"
        >
          Guild
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-3 lg:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="
                text-muted
                rounded-full
                px-5
                py-2
                text-sm
                font-medium
                transition-all
                duration-300
                hover:bg-accent
                hover:text-black
              "
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="text-foreground text-sm font-medium transition-all duration-300 hover:text-accent"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="
              bg-accent
              rounded-full
              px-6
              py-3
              text-sm
              font-semibold
              text-black
              transition-all
              duration-300
              hover:scale-105
            "
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-accent lg:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          open ? "max-h-125" : "max-h-0"
        }`}
      >
        <div className="border-t border-border bg-background px-4 py-6">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="
                  text-muted
                  rounded-xl
                  px-4
                  py-3
                  transition-all
                  duration-300
                  hover:bg-accent
                  hover:text-black
                "
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="
                text-foreground
                hover:text-accent
                rounded-xl
                py-3
                text-center
                transition-all
                duration-300
              "
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="
                bg-accent
                rounded-xl
                py-3
                text-center
                font-semibold
                text-black
                transition-all
                duration-300
                hover:scale-[1.02]
              "
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
