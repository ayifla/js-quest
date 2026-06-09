import Link from "next/link";
import { ArrowRight, Check, TriangleAlert, X } from "lucide-react";
import { lessons } from "@/lib/lessons";
import { Button } from "@/components/ui/button";

export function MistakesLibrary() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 lg:px-8 lg:py-14">
      <section className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-2 text-xs font-black uppercase tracking-widest text-orange-600"><TriangleAlert className="h-4 w-4" /> Mistakes are clues</span>
        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">Common Beginner Mistakes</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">Every coder makes these. Learn to spot them and you&apos;ll fix bugs faster.</p>
      </section>
      <section className="mt-12 grid gap-5 md:grid-cols-2">
        {lessons.map((lesson) => (
          <article key={lesson.id} className="rounded-3xl border bg-white p-5 shadow-card sm:p-6">
            <div className="flex items-center justify-between gap-3"><span className="rounded-full bg-brand-light px-3 py-1.5 text-xs font-black uppercase tracking-widest text-brand">{lesson.title}</span><span className="text-xs font-bold text-slate-400">{lesson.duration} lesson</span></div>
            <h2 className="mt-5 text-xl font-black">{lesson.mistake.title}</h2>
            <div className="mt-5 grid gap-3">
              <CodeSnippet label="Incorrect" code={lesson.mistake.wrong} correct={false} />
              <p className="rounded-2xl bg-orange-50 p-4 text-sm font-semibold leading-6 text-orange-800">{lesson.mistake.why}</p>
              <CodeSnippet label="Corrected" code={lesson.mistake.correct} correct />
            </div>
            <Button asChild variant="ghost" size="sm" className="mt-4"><Link href={`/lesson/${lesson.id}`}>Practice this lesson <ArrowRight className="h-4 w-4" /></Link></Button>
          </article>
        ))}
      </section>
    </main>
  );
}

function CodeSnippet({ label, code, correct }: { label: string; code: string; correct: boolean }) {
  return <div className={`rounded-2xl border-2 p-4 ${correct ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}><p className={`mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-widest ${correct ? "text-emerald-700" : "text-rose-700"}`}>{correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}{label}</p><pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-6 text-ink"><code>{code}</code></pre></div>;
}
