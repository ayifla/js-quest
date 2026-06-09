"use client";

import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { CheckCircle2, CircleAlert, Code2, Play, RotateCcw, Sparkles, Trash2, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const examples = [
  { name: "Say hello", code: "// Change the message, then press Run!\nlet name = \"Coder\";\nconsole.log(\"Hello, \" + name + \"!\");" },
  { name: "Do some math", code: "let apples = 3;\nlet moreApples = 2;\nconsole.log(\"Total apples:\", apples + moreApples);" },
  { name: "Make a choice", code: "let score = 8;\n\nif (score > 5) {\n  console.log(\"You levelled up!\");\n}" }
];

const workerSource = `
self.onmessage = function(event) {
  const logs = [];
  const format = value => {
    if (typeof value === "string") return value;
    if (typeof value === "undefined") return "undefined";
    try { return JSON.stringify(value, null, 2); } catch { return String(value); }
  };
  const console = {
    log: (...values) => logs.push(values.map(format).join(" ")),
    warn: (...values) => logs.push("Warning: " + values.map(format).join(" ")),
    error: (...values) => logs.push("Error: " + values.map(format).join(" "))
  };
  try {
    new Function("console", event.data)(console);
    self.postMessage({ ok: true, logs });
  } catch (error) {
    self.postMessage({ ok: false, logs, error: error.name + ": " + error.message });
  }
};`;

export function Playground() {
  const [code, setCode] = useState(examples[0].code);
  const [startingCode, setStartingCode] = useState(examples[0].code);
  const [output, setOutput] = useState<string[]>(["Your output will appear here."]);
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle");
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => () => workerRef.current?.terminate(), []);

  function chooseExample(example: typeof examples[number]) {
    setCode(example.code);
    setStartingCode(example.code);
    setOutput([`Loaded "${example.name}". Press Run when you're ready.`]);
    setStatus("idle");
  }

  function runCode() {
    workerRef.current?.terminate();
    setStatus("running");
    setOutput(["Running your code..."]);
    const blobUrl = URL.createObjectURL(new Blob([workerSource], { type: "text/javascript" }));
    const worker = new Worker(blobUrl);
    URL.revokeObjectURL(blobUrl);
    workerRef.current = worker;

    const timeout = window.setTimeout(() => {
      worker.terminate();
      setStatus("error");
      setOutput(["Your code ran for too long, so we stopped it.", "Check for a loop that never ends."]);
    }, 2000);

    worker.onmessage = (event: MessageEvent<{ ok: boolean; logs: string[]; error?: string }>) => {
      window.clearTimeout(timeout);
      worker.terminate();
      setStatus(event.data.ok ? "success" : "error");
      const lines = event.data.logs.length ? event.data.logs : ["Code finished. Nothing was printed yet."];
      setOutput(event.data.error ? [...lines, event.data.error] : lines);
    };
    worker.postMessage(code);
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
      <section className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-light px-3 py-2 text-xs font-black uppercase tracking-widest text-brand"><Sparkles className="h-4 w-4" /> Safe space to experiment</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">JavaScript Playground</h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600">Change the code, press Run, and see what happens. You cannot break anything here.</p>
        </div>
        <Button onClick={runCode} size="lg"><Play className="h-5 w-5 fill-white" /> Run code</Button>
      </section>

      <section className="mb-5 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-black uppercase tracking-widest text-slate-400">Try an example</span>
        {examples.map((example) => <button key={example.name} onClick={() => chooseExample(example)} className="rounded-xl border bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:border-brand/30 hover:bg-brand-light hover:text-brand">{example.name}</button>)}
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-700 bg-[#111827] shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#192231] px-4 py-3">
          <div className="flex items-center gap-3"><span className="flex gap-1.5"><i className="h-3 w-3 rounded-full bg-coral" /><i className="h-3 w-3 rounded-full bg-sun" /><i className="h-3 w-3 rounded-full bg-mint" /></span><span className="flex items-center gap-2 font-mono text-xs text-slate-300"><Code2 className="h-4 w-4 text-sky-400" /> playground.js</span></div>
          <div className="flex gap-2">
            <Button onClick={() => { setCode(startingCode); setStatus("idle"); }} variant="ghost" size="sm" className="text-slate-300 hover:bg-white/10 hover:text-white"><RotateCcw className="h-4 w-4" /> Reset</Button>
            <Button onClick={runCode} size="sm"><Play className="h-4 w-4 fill-white" /> Run</Button>
          </div>
        </div>
        <div className="h-[380px] sm:h-[430px]">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value ?? "")}
            loading={<div className="grid h-full place-items-center text-sm font-bold text-slate-400">Opening your editor...</div>}
            options={{ minimap: { enabled: false }, fontSize: 15, lineHeight: 24, padding: { top: 18 }, scrollBeyondLastLine: false, automaticLayout: true, tabSize: 2, wordWrap: "on", suggestOnTriggerCharacters: true }}
          />
        </div>
        <div className="border-t border-white/10 bg-[#0b111b]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400"><Terminal className="h-4 w-4 text-mint" /> Output console</span>
            <button onClick={() => { setOutput(["Console cleared."]); setStatus("idle"); }} className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white"><Trash2 className="h-3.5 w-3.5" /> Clear output</button>
          </div>
          <div className="min-h-32 p-4 font-mono text-sm leading-7">
            <div className={cn("mb-2 flex items-center gap-2 font-sans text-xs font-bold", status === "error" ? "text-coral" : status === "success" ? "text-mint" : "text-slate-500")}>
              {status === "error" ? <CircleAlert className="h-4 w-4" /> : status === "success" ? <CheckCircle2 className="h-4 w-4" /> : null}
              {status === "running" ? "Running..." : status === "success" ? "Nice! Your code ran successfully." : status === "error" ? "No worries. Read the message and try one small change." : "Ready when you are."}
            </div>
            {output.map((line, index) => <p key={`${line}-${index}`} className={status === "error" && index === output.length - 1 ? "text-coral" : "text-slate-200"}><span className="mr-3 select-none text-slate-600">›</span>{line}</p>)}
          </div>
        </div>
      </section>
    </main>
  );
}
