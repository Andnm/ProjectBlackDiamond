const pulseBlock = "animate-pulse rounded-sm bg-outline/15";

export function PublicDetailSkeleton() {
  return (
    <main className="bg-background pt-20">
      <div className="section-shell py-16" role="status" aria-label="Đang tải nội dung…">
        <div className={`mb-10 h-4 w-48 ${pulseBlock}`} />
        <div className={`aspect-[16/9] w-full ${pulseBlock}`} />
        <div className="mt-10 flex flex-col gap-4">
          <div className={`h-3 w-32 ${pulseBlock}`} />
          <div className={`h-10 w-2/3 ${pulseBlock}`} />
          <div className={`h-4 w-full ${pulseBlock}`} />
          <div className={`h-4 w-5/6 ${pulseBlock}`} />
          <div className={`h-4 w-3/4 ${pulseBlock}`} />
        </div>
      </div>
    </main>
  );
}
