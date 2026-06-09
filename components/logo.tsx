import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5 font-black tracking-tight text-ink">
      <span className="grid h-9 w-9 rotate-3 place-items-center rounded-xl bg-brand font-mono text-sm text-white shadow-[0_4px_0_#5141C8] transition-transform group-hover:-rotate-3">JS</span>
      <span className="text-xl">JS Quest</span>
    </Link>
  );
}
