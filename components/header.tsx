"use client";

import Link from "next/link";
import { Code2, Flame, TriangleAlert, Zap } from "lucide-react";
import { Logo } from "@/components/logo";
import { useProgress } from "@/components/progress-provider";
import { Button } from "@/components/ui/button";

export function Header({ compact = false }: { compact?: boolean }) {
  const { xp } = useProgress();
  return (
    <header className="border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <div className="flex items-center gap-2 sm:gap-4">
          {!compact && (
            <div className="hidden items-center gap-1.5 rounded-xl bg-orange-50 px-3 py-2 text-sm font-bold text-orange-600 sm:flex">
              <Flame className="h-4 w-4 fill-orange-400" /> 1 day
            </div>
          )}
          <div className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-2 text-sm font-bold text-amber-700">
            <Zap className="h-4 w-4 fill-sun text-sun" /> {xp} XP
          </div>
          <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex">
            <Link href="/playground"><Code2 className="h-4 w-4" /> Playground</Link>
          </Button>
          <Button asChild size="sm" variant="ghost" className="hidden lg:inline-flex">
            <Link href="/mistakes"><TriangleAlert className="h-4 w-4" /> Mistakes</Link>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
