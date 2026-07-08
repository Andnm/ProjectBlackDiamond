type Props = {
  rows?: number;
  columns?: number;
};

const pulseBlock = "animate-pulse rounded-sm bg-neutral-800";

export function TableSkeleton({ rows = 8, columns = 6 }: Props) {
  return (
    <div className="flex flex-col gap-8" role="status" aria-label="Đang tải dữ liệu…">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className={`h-3 w-28 ${pulseBlock}`} />
          <div className={`h-8 w-56 ${pulseBlock}`} />
        </div>
        <div className={`h-11 w-44 ${pulseBlock}`} />
      </div>

      <div className="overflow-hidden border border-neutral-800">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr className="border-b border-neutral-900 last:border-0" key={rowIndex}>
                {Array.from({ length: columns }).map((__, colIndex) => (
                  <td className="px-4 py-3" key={colIndex}>
                    {colIndex === 0 ? (
                      <div className={`h-14 w-14 ${pulseBlock}`} />
                    ) : (
                      <div className={`h-4 w-full max-w-[10rem] ${pulseBlock}`} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        <div className={`h-9 w-64 ${pulseBlock}`} />
      </div>
    </div>
  );
}
