"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, ArrowRight, Check, ChevronRight, CircleHelp, Code2, Frown,
  Lightbulb, PartyPopper, Smile, Sparkles, TriangleAlert, X, Zap
} from "lucide-react";
import type { Lesson } from "@/lib/lessons";
import { lessons } from "@/lib/lessons";
import { useProgress } from "@/components/progress-provider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const motivationMessages = ["Great job!", "You're improving!", "Keep going!"];

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [confidence, setConfidence] = useState<string | null>(null);
  const router = useRouter();
  const { completeLesson } = useProgress();
  const currentIndex = lessons.findIndex((item) => item.id === lesson.id);
  const nextLesson = lessons[currentIndex + 1];
  const isChallengeCorrect = answer.trim().toLowerCase() === lesson.challenge.answer.toLowerCase();
  const isQuizCorrect = quizAnswer === lesson.quiz.answer;
  const motivation = motivationMessages[currentIndex % motivationMessages.length];

  useEffect(() => {
    if (step === 5) completeLesson(lesson.id, lesson.xp);
  }, [step, lesson.id, lesson.xp, completeLesson]);

  function next() {
    setChecked(false);
    setShowHint(false);
    setStep((value) => value + 1);
  }

  function finish() {
    if (nextLesson) router.push(`/lesson/${nextLesson.id}`);
    else router.push("/dashboard");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-5xl items-center gap-3 px-4 sm:gap-4 sm:px-5">
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard"><ArrowLeft className="h-5 w-5" /><span className="hidden sm:inline">Exit lesson</span></Link>
          </Button>
          <Progress value={((step + 1) / 6) * 100} className="mx-auto max-w-xl flex-1" indicatorClassName="bg-mint" />
          <span className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-2 text-sm font-black text-amber-700">
            <Zap className="h-4 w-4 fill-sun text-sun" /> {lesson.xp}
          </span>
        </div>
      </header>

      <div key={step} className="lesson-enter mx-auto max-w-3xl px-5 py-9 sm:py-12">
        {step === 0 && (
          <section>
            <LessonHeading eyebrow={lesson.concept.eyebrow} title={lesson.concept.title} body={lesson.concept.body} />
            <div className="mt-7 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
              {lesson.concept.visual.map((item, index) => (
                <div className="contents" key={item.label}>
                  <div className="visual-pop rounded-2xl border-2 border-brand/10 bg-brand-light p-3 text-center sm:p-5" style={{ animationDelay: `${index * 120}ms` }}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand">{item.label}</p>
                    <p className="mt-2 break-words font-mono text-sm font-bold text-ink sm:text-base">{item.value}</p>
                  </div>
                  {index < lesson.concept.visual.length - 1 && <ArrowRight className="h-4 w-4 text-brand/50" />}
                </div>
              ))}
            </div>
            <CodeCard label="See it in code" code={lesson.concept.code} />
            <Tip>{lesson.concept.tip}</Tip>
            <Continue onClick={next} label="I get the idea" />
          </section>
        )}

        {step === 1 && (
          <section>
            <LessonHeading eyebrow="Beginner mistake" title={lesson.mistake.title} body="Spotting mistakes is a real coding skill. Here's one to remember." />
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <CodeCompare label="Not quite" code={lesson.mistake.wrong} correct={false} />
              <CodeCompare label="Fixed" code={lesson.mistake.correct} correct />
            </div>
            <div className="mt-5 flex gap-4 rounded-3xl border border-orange-200 bg-orange-50 p-5">
              <TriangleAlert className="h-6 w-6 shrink-0 text-orange-500" />
              <div><p className="font-black text-orange-900">What happened?</p><p className="mt-1 text-sm leading-6 text-orange-800">{lesson.mistake.why}</p></div>
            </div>
            <Continue onClick={next} label="I'll remember that" />
          </section>
        )}

        {step === 2 && (
          <section>
            <LessonHeading eyebrow="Your turn" title={lesson.challenge.prompt} body="Fill the blank. One tiny win is all we're after." />
            <div className="mt-7 rounded-3xl bg-ink p-5 sm:p-7">
              <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-8 text-white sm:text-base">{lesson.challenge.starter}</pre>
              <div className="mt-5 border-t border-white/10 pt-5">
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Your answer</label>
                <input value={answer} onChange={(e) => { setAnswer(e.target.value); setChecked(false); }} placeholder="Type here..." className="w-full rounded-2xl border-2 border-white/10 bg-white/10 px-4 py-3 font-mono text-white outline-none transition focus:border-brand" />
              </div>
            </div>
            {checked && <Feedback correct={isChallengeCorrect} correctText="Yes! You just wrote working JavaScript." wrongText="You're close. Try the hint, then have another go." />}
            {showHint && <div className="mt-4 flex gap-3 rounded-2xl bg-brand-light p-4 text-sm text-slate-600"><CircleHelp className="h-5 w-5 shrink-0 text-brand" />{lesson.challenge.hint}</div>}
            <div className="mt-7 flex items-center justify-between gap-3">
              <Button onClick={() => setShowHint(true)} variant="ghost"><Lightbulb className="h-4 w-4" /> Hint</Button>
              {checked && isChallengeCorrect ? <Button onClick={next}>Continue <ArrowRight className="h-4 w-4" /></Button> : <Button onClick={() => setChecked(true)} disabled={!answer.trim()}>Check answer</Button>}
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <LessonHeading eyebrow="Quick quiz" title={lesson.quiz.question} body="Pick one answer. Mistakes are welcome here." />
            <div className="mt-7 space-y-3">
              {lesson.quiz.options.map((option, index) => (
                <button key={option} onClick={() => { setQuizAnswer(index); setChecked(false); }} className={cn("flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left text-sm font-semibold transition sm:p-5", quizAnswer === index ? "border-brand bg-brand-light text-brand-dark" : "border-slate-200 hover:border-brand/30 hover:bg-slate-50")}>
                  <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-xl font-black", quizAnswer === index ? "bg-brand text-white" : "bg-slate-100 text-slate-500")}>{String.fromCharCode(65 + index)}</span>{option}
                </button>
              ))}
            </div>
            {checked && <Feedback correct={isQuizCorrect} correctText="Exactly right. Your brain kept that!" wrongText="Not yet. Read the choices once more and try again." />}
            <div className="mt-7 flex justify-end">{checked && isQuizCorrect ? <Button onClick={next}>Continue <ArrowRight className="h-4 w-4" /></Button> : <Button onClick={() => setChecked(true)} disabled={quizAnswer === null}>Check answer</Button>}</div>
          </section>
        )}

        {step === 4 && (
          <section className="text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-light text-brand"><CircleHelp className="h-8 w-8" /></span>
            <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-5xl">How confident are you?</h1>
            <p className="mt-3 text-slate-500">Be honest. This helps JS Quest meet you where you are.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <ConfidenceButton emoji="😊" label="I understand" active={confidence === "understand"} onClick={() => setConfidence("understand")} />
              <ConfidenceButton emoji="😐" label="Somewhat" active={confidence === "somewhat"} onClick={() => setConfidence("somewhat")} />
              <ConfidenceButton emoji="😵" label="I'm confused" active={confidence === "confused"} onClick={() => setConfidence("confused")} />
            </div>
            {confidence === "confused" && (
              <div className="lesson-enter mt-6 rounded-3xl border-2 border-brand/20 bg-brand-light p-6 text-left">
                <div className="flex items-center gap-2 font-black text-brand"><Lightbulb className="h-5 w-5" /> Let&apos;s make it simpler</div>
                <p className="mt-3 text-lg font-semibold leading-8 text-ink">{lesson.concept.simple}</p>
                <p className="mt-3 text-sm text-slate-600">You do not need to memorize it yet. Seeing it again is progress.</p>
              </div>
            )}
            {confidence && confidence !== "confused" && <p className="lesson-enter mt-6 font-bold text-mint">{confidence === "understand" ? "Nice! You're ready to build on it." : "That's completely normal. Practice will make it click."}</p>}
            <div className="mt-8 flex justify-center"><Button onClick={next} size="lg" disabled={!confidence}>Finish lesson <Sparkles className="h-5 w-5" /></Button></div>
          </section>
        )}

        {step === 5 && (
          <section className="relative text-center">
            <div className="confetti confetti-one" /><div className="confetti confetti-two" /><div className="confetti confetti-three" />
            <div className="celebrate-bounce mx-auto grid h-24 w-24 place-items-center rounded-[2rem] bg-amber-50 text-amber-500"><PartyPopper className="h-12 w-12" /></div>
            <p className="mt-7 font-bold uppercase tracking-[0.2em] text-brand">Quest complete</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">{motivation}</h1>
            <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-slate-600">You finished {lesson.title} in just a few minutes. That is real progress.</p>
            <div className="reward-pop mx-auto mt-7 flex max-w-sm items-center justify-between rounded-3xl bg-brand-light p-5">
              <div className="text-left"><p className="text-sm font-bold text-slate-500">Reward earned</p><p className="mt-1 text-2xl font-black text-brand">+{lesson.xp} XP</p></div>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white"><Zap className="h-7 w-7 fill-white" /></span>
            </div>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="secondary" size="lg"><Link href="/dashboard">Back to dashboard</Link></Button>
              <Button onClick={finish} size="lg">{nextLesson ? "Next lesson" : "Finish course"} <ChevronRight className="h-5 w-5" /></Button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function LessonHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return <><p className="font-bold uppercase tracking-[0.2em] text-brand">{eyebrow}</p><h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">{title}</h1><p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">{body}</p></>;
}

function CodeCard({ label, code }: { label: string; code: string }) {
  return <div className="mt-6 rounded-3xl bg-ink p-5 text-white code-glow sm:p-6"><div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400"><Code2 className="h-4 w-4 text-mint" />{label}</div><pre className="overflow-x-auto font-mono text-sm leading-8 sm:text-base"><code>{code}</code></pre></div>;
}

function CodeCompare({ label, code, correct }: { label: string; code: string; correct: boolean }) {
  return <div className={cn("rounded-3xl border-2 p-5", correct ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50")}><div className={cn("mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest", correct ? "text-emerald-700" : "text-rose-700")}>{correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}{label}</div><pre className="overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-6 text-ink sm:text-sm"><code>{code}</code></pre></div>;
}

function Tip({ children }: { children: React.ReactNode }) {
  return <div className="mt-5 flex gap-4 rounded-3xl border border-amber-200 bg-amber-50 p-5"><Lightbulb className="h-6 w-6 shrink-0 text-amber-600" /><div><p className="font-black text-amber-900">Good to know</p><p className="mt-1 text-sm leading-6 text-amber-800">{children}</p></div></div>;
}

function Continue({ onClick, label }: { onClick: () => void; label: string }) {
  return <div className="mt-8 flex justify-end"><Button onClick={onClick} size="lg">{label} <ArrowRight className="h-5 w-5" /></Button></div>;
}

function ConfidenceButton({ emoji, label, active, onClick }: { emoji: string; label: string; active: boolean; onClick: () => void }) {
  return <button onClick={onClick} className={cn("rounded-3xl border-2 p-5 text-center font-black transition hover:-translate-y-1 hover:border-brand/40", active ? "border-brand bg-brand-light text-brand" : "border-slate-200 bg-white")}><span className="block text-4xl">{emoji}</span><span className="mt-3 block">{label}</span></button>;
}

function Feedback({ correct, correctText, wrongText }: { correct: boolean; correctText: string; wrongText: string }) {
  return <div className={cn("lesson-enter mt-5 flex gap-3 rounded-2xl p-4 text-sm font-semibold", correct ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700")}>{correct ? <Smile className="h-5 w-5 shrink-0" /> : <Frown className="h-5 w-5 shrink-0" />}{correct ? correctText : wrongText}</div>;
}
