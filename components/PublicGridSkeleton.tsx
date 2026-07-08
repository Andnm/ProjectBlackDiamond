const pulseBlock = "animate-pulse rounded-sm bg-outline/15";

export function PublicGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <main className="bg-background pt-20">
      <div className="section-shell py-24" role="status" aria-label="Đang tải nội dung…">
        <div className="grid grid-cols-1 gap-px overflow-hidden bg-outline/10 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: count }).map((_, index) => (
            <div className="flex min-h-[34rem] flex-col bg-surface" key={index}>
              <div className={`aspect-square w-full ${pulseBlock}`} />
              <div className="flex flex-1 flex-col gap-3 p-7">
                <div className={`h-3 w-24 ${pulseBlock}`} />
                <div className={`h-6 w-3/4 ${pulseBlock}`} />
                <div className={`h-4 w-full ${pulseBlock}`} />
                <div className={`h-4 w-5/6 ${pulseBlock}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
