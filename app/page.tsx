import Link from "next/link";
import { ArrowRight, Check, Code2, Heart, Play, ShieldCheck, Sparkles, Trophy, Zap } from "lucide-react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: Heart, title: "Made for first-timers", body: "No jargon dumps. Every idea is explained in plain, friendly language.", color: "bg-rose-50 text-coral" },
  { icon: Code2, title: "Learn by doing", body: "Tiny, interactive challenges turn every new concept into a quick win.", color: "bg-brand-light text-brand" },
  { icon: Trophy, title: "Progress you can feel", body: "Earn XP, unlock lessons, and watch your coding confidence grow.", color: "bg-amber-50 text-amber-600" }
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Header compact />
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_15%,#EEEAFE_0,transparent_30%),radial-gradient(circle_at_15%_75%,#E7FAF3_0,transparent_25%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-4 py-2 text-sm font-bold text-brand shadow-sm">
              <Sparkles className="h-4 w-4" /> JavaScript without the overwhelm
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.04] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Your friendly first step into <span className="relative text-brand">coding<span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-sun/70 -z-10" /></span>.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              Master JavaScript through bite-sized lessons, cheerful challenges, and lots of little wins. You really can do this.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg"><Link href="/dashboard">Start learning free <ArrowRight className="h-5 w-5" /></Link></Button>
              <Button asChild size="lg" variant="secondary"><Link href="#how-it-works"><Play className="h-4 w-4 fill-brand text-brand" /> See how it works</Link></Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-500">
              {["No signup needed", "Learn at your pace", "100% beginner friendly"].map((item) => (
                <span key={item} className="flex items-center gap-1.5"><Check className="h-4 w-4 text-mint" />{item}</span>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl lg:mx-0">
            <div className="absolute -left-7 -top-7 grid h-20 w-20 -rotate-12 place-items-center rounded-3xl bg-sun text-3xl shadow-card">✦</div>
            <div className="rounded-4xl border border-white bg-white/80 p-4 shadow-card backdrop-blur sm:p-6">
              <div className="rounded-3xl bg-ink p-5 text-white code-glow sm:p-7">
                <div className="mb-7 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-coral" /><span className="h-3 w-3 rounded-full bg-sun" /><span className="h-3 w-3 rounded-full bg-mint" />
                  <span className="ml-auto font-mono text-xs text-slate-400">first-quest.js</span>
                </div>
                <pre className="overflow-x-auto font-mono text-sm leading-8 sm:text-base"><code><span className="text-fuchsia-300">let</span> explorer = <span className="text-amber-200">&quot;you&quot;</span>;{"\n"}<span className="text-fuchsia-300">let</span> superpower = <span className="text-amber-200">&quot;JavaScript&quot;</span>;{"\n\n"}console.<span className="text-sky-300">log</span>(<span className="text-amber-200">`Ready, ${"{explorer}"}?`</span>);</code></pre>
                <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint text-ink"><Check className="h-5 w-5 stroke-[3]" /></span>
                  <div><p className="text-xs font-bold uppercase tracking-widest text-mint">Output</p><p className="mt-1 font-mono text-sm">Ready, you? 🚀</p></div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-brand-light p-4">
                <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-brand"><Zap className="h-5 w-5 fill-brand" /></span><div><p className="font-bold">Quest complete!</p><p className="text-sm text-slate-500">That wasn&apos;t scary, right?</p></div></div>
                <span className="rounded-xl bg-brand px-3 py-2 text-sm font-black text-white">+40 XP</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-bold uppercase tracking-[0.2em] text-brand">A kinder way to learn</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Built to keep you curious, not confused.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, body, color }) => (
            <article key={title} className="rounded-3xl border bg-white p-7 shadow-card">
              <span className={`grid h-14 w-14 place-items-center rounded-2xl ${color}`}><Icon className="h-7 w-7" /></span>
              <h3 className="mt-6 text-xl font-black">{title}</h3><p className="mt-3 leading-7 text-slate-600">{body}</p>
            </article>
          ))}
        </div>
      </section>
      <footer className="border-t bg-white"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-slate-500 sm:flex-row lg:px-8"><span className="font-bold text-ink">JS Quest</span><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-mint" /> Your progress stays private on this device.</span></div></footer>
    </main>
  );
}
