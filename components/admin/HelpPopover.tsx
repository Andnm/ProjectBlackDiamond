export function HelpPopover({ children }: { children: React.ReactNode }) {
  return (
    <span className="group relative inline-flex">
      <span
        aria-label="วิธีใช้งานหน้านี้"
        className="inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full border border-neutral-600 text-[11px] font-bold text-neutral-400 transition group-hover:border-amber-400 group-hover:text-amber-400"
        role="button"
        tabIndex={0}
      >
        ?
      </span>
      <div
        className="pointer-events-none absolute left-0 top-full z-20 mt-2 w-[min(20rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] border border-neutral-700 bg-neutral-900 p-4 text-xs leading-relaxed text-neutral-300 opacity-0 shadow-2xl transition group-hover:opacity-100 group-focus-within:opacity-100"
        role="tooltip"
      >
        {children}
      </div>
    </span>
  );
}
