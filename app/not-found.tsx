import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center px-5 text-center"><div><p className="text-sm font-black uppercase tracking-widest text-brand">404</p><h1 className="mt-3 text-4xl font-black">This quest is still being written.</h1><p className="mt-4 text-slate-500">Let&apos;s get you back to the learning path.</p><Button asChild className="mt-7"><Link href="/dashboard">Go to dashboard</Link></Button></div></main>;
}
