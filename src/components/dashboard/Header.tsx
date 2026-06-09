"use client";

import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-border p-4">
      <div className="flex items-center justify-between">
        <input
          placeholder="Search..."
          className="rounded-lg border px-4 py-2"
        />

        <div className="flex items-center gap-4">
          <Bell />

          <div className="h-10 w-10 rounded-full bg-muted" />
        </div>
      </div>
    </header>
  );
}