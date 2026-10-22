"use client";

import { Journal } from "@/components/Journal";

export default function HomePage() {
  return (
    <main className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <Journal />
    </main>
  );
}
