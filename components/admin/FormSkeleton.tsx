const pulseBlock = "animate-pulse rounded-sm bg-neutral-800";

export function FormSkeleton({ sections = 3 }: { sections?: number }) {
  return (
    <div className="flex flex-col gap-8" role="status" aria-label="Đang tải dữ liệu…">
      <div className="flex flex-col gap-3">
        <div className={`h-3 w-32 ${pulseBlock}`} />
        <div className={`h-8 w-72 ${pulseBlock}`} />
      </div>

      <div className="flex flex-col gap-6">
        {Array.from({ length: sections }).map((_, sectionIndex) => (
          <div className="flex flex-col gap-4 border border-neutral-800 p-5" key={sectionIndex}>
            <div className={`h-3 w-40 ${pulseBlock}`} />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className={`h-10 w-full ${pulseBlock}`} />
              <div className={`h-10 w-full ${pulseBlock}`} />
            </div>
            <div className={`h-24 w-full ${pulseBlock}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
