"use client";

import Link from "next/link";
import { ArrowRight, Check, Code2, Flame, LockKeyhole, RotateCcw, Star, Target, TriangleAlert, Trophy } from "lucide-react";
import { lessons } from "@/lib/lessons";
import { useProgress } from "@/components/progress-provider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const colors: Record<string, string> = {
  purple: "bg-brand-light text-brand", blue: "bg-sky-50 text-sky-600", pink: "bg-rose-50 text-rose-500",
  green: "bg-emerald-50 text-emerald-600", orange: "bg-orange-50 text-orange-600", yellow: "bg-amber-50 text-amber-600"
};

export function DashboardContent() {
  const { completedLessonIds, xp, level, levelProgress, isUnlocked, resetProgress } = useProgress();
  const nextIndex = Math.min(completedLessonIds.length, lessons.length - 1);
  const nextLesson = lessons[nextIndex];
  const totalProgress = (completedLessonIds.length / lessons.length) * 100;

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
      <section className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="relative overflow-hidden rounded-4xl bg-ink p-7 text-white sm:p-10">
          <div className="absolute inset-0 opacity-20 dot-grid" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-widest text-brand-light"><Flame className="h-4 w-4 text-orange-400" /> Today&apos;s quest</span>
            <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">{completedLessonIds.length ? "Keep that momentum going." : "Ready for your first quest?"}</h1>
            <p className="mt-4 max-w-xl leading-7 text-slate-300">{completedLessonIds.length ? "One small lesson today is another big step toward speaking JavaScript." : "You don't need to know anything yet. We'll take it one friendly step at a time."}</p>
            <Button asChild size="lg" className="mt-7"><Link href={`/lesson/${nextLesson.id}`}>{completedLessonIds.includes(nextLesson.id) ? "Practice lesson" : "Continue learning"} <ArrowRight className="h-5 w-5" /></Link></Button>
          </div>
        </div>
        <div className="rounded-4xl border bg-white p-7 shadow-card">
          <div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-light text-brand"><Trophy className="h-6 w-6" /></span><span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">LEVEL {level}</span></div>
          <p className="mt-6 text-sm font-bold text-slate-500">Your progress</p><p className="mt-1 text-3xl font-black">{xp} XP</p>
          <Progress value={levelProgress} className="mt-4 h-3" /><p className="mt-2 text-xs font-semibold text-slate-400">{150 - (xp % 150)} XP until Level {level + 1}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 border-t pt-5"><div><p className="text-2xl font-black">{completedLessonIds.length}</p><p className="text-xs font-bold text-slate-400">Completed</p></div><div><p className="text-2xl font-black">{Math.round(totalProgress)}%</p><p className="text-xs font-bold text-slate-400">Course done</p></div></div>
        </div>
      </section>
      <section className="mt-12 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <div className="mb-6 flex items-end justify-between"><div><p className="text-sm font-bold uppercase tracking-widest text-brand">Your learning path</p><h2 className="mt-1 text-3xl font-black">JavaScript Foundations</h2></div><span className="hidden text-sm font-semibold text-slate-400 sm:block">{completedLessonIds.length} of {lessons.length} complete</span></div>
          <div className="space-y-4">
            {lessons.map((lesson, index) => {
              const completed = completedLessonIds.includes(lesson.id);
              const unlocked = isUnlocked(index);
              return (
                <article key={lesson.id} className={cn("group flex min-w-0 items-center gap-4 rounded-3xl border bg-white p-4 transition-all sm:gap-5 sm:p-5", unlocked ? "shadow-card hover:-translate-y-0.5 hover:border-brand/30" : "opacity-60")}>
                  <div className={cn("grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-lg font-black sm:h-16 sm:w-16", completed ? "bg-mint text-white" : unlocked ? colors[lesson.color] : "bg-slate-100 text-slate-400")}>{completed ? <Check className="h-7 w-7 stroke-[3]" /> : unlocked ? lesson.order : <LockKeyhole className="h-5 w-5" />}</div>
                  <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-black sm:text-lg">{lesson.title}</h3>{completed && <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-600">Complete</span>}</div><p className="mt-1 truncate text-sm text-slate-500">{lesson.description}</p><div className="mt-2 flex gap-3 text-xs font-bold text-slate-400"><span>{lesson.duration}</span><span className="text-amber-600">+{lesson.xp} XP</span></div></div>
                  {unlocked ? <Button asChild variant={completed ? "secondary" : "default"} size="sm"><Link href={`/lesson/${lesson.id}`}>{completed ? "Review" : index === nextIndex ? "Start" : "Open"}<ArrowRight className="hidden h-4 w-4 sm:block" /></Link></Button> : <span className="hidden rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-400 sm:block">Locked</span>}
                </article>
              );
            })}
          </div>
        </div>
        <aside className="space-y-5">
          <div className="rounded-3xl bg-ink p-6 text-white shadow-card"><Code2 className="h-6 w-6 text-mint" /><h3 className="mt-4 font-black">Try the playground</h3><p className="mt-2 text-sm leading-6 text-slate-300">Experiment with JavaScript in a safe editor. Nothing can break.</p><Button asChild size="sm" className="mt-5"><Link href="/playground">Open playground <ArrowRight className="h-4 w-4" /></Link></Button></div>
          <div className="rounded-3xl border bg-orange-50 p-6"><TriangleAlert className="h-6 w-6 text-orange-500" /><h3 className="mt-4 font-black">Mistakes library</h3><p className="mt-2 text-sm leading-6 text-slate-600">See common bugs, why they happen, and how to fix them.</p><Button asChild variant="secondary" size="sm" className="mt-5"><Link href="/mistakes">Explore fixes <ArrowRight className="h-4 w-4" /></Link></Button></div>
          <div className="rounded-3xl border bg-white p-6 shadow-card"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-50 text-amber-600"><Target className="h-5 w-5" /></span><div><p className="font-black">Daily goal</p><p className="text-xs font-semibold text-slate-400">10 minutes of practice</p></div></div><Progress value={completedLessonIds.length ? 100 : 35} className="mt-5" indicatorClassName="bg-sun" /><p className="mt-3 text-xs font-semibold text-slate-500">{completedLessonIds.length ? "Goal crushed. Nice work!" : "One lesson is all it takes."}</p></div>
          <div className="rounded-3xl border bg-brand-light p-6"><Star className="h-6 w-6 fill-brand text-brand" /><h3 className="mt-4 font-black">Beginner reminder</h3><p className="mt-2 text-sm leading-6 text-slate-600">Getting stuck is not failing. It&apos;s your brain making room for something new.</p></div>
          {completedLessonIds.length > 0 && <button onClick={resetProgress} className="flex w-full items-center justify-center gap-2 py-2 text-xs font-bold text-slate-400 hover:text-coral"><RotateCcw className="h-3.5 w-3.5" /> Reset progress</button>}
        </aside>
      </section>
    </main>
  );
}
