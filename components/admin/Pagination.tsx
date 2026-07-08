import Link from "next/link";

type Props = {
  page: number;
  pageCount: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
};

const linkClass =
  "inline-flex h-9 min-w-9 items-center justify-center border border-neutral-700 px-3 text-xs font-bold uppercase tracking-[0.12em] text-neutral-300 transition hover:border-amber-400 hover:text-amber-400";
const disabledClass =
  "inline-flex h-9 min-w-9 items-center justify-center border border-neutral-800 px-3 text-xs font-bold uppercase tracking-[0.12em] text-neutral-700";
const activeClass =
  "inline-flex h-9 min-w-9 items-center justify-center border border-amber-400 bg-amber-400 px-3 text-xs font-bold uppercase tracking-[0.12em] text-neutral-950";

function buildHref(basePath: string, page: number, searchParams?: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value) params.set(key, value);
    }
  }
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function Pagination({ page, pageCount, basePath, searchParams }: Props) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav aria-label="Phân trang" className="flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link className={linkClass} href={buildHref(basePath, page - 1, searchParams)}>
          ‹ Trước
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClass}>
          ‹ Trước
        </span>
      )}

      {pages.map((pageNumber) =>
        pageNumber === page ? (
          <span aria-current="page" className={activeClass} key={pageNumber}>
            {pageNumber}
          </span>
        ) : (
          <Link className={linkClass} href={buildHref(basePath, pageNumber, searchParams)} key={pageNumber}>
            {pageNumber}
          </Link>
        ),
      )}

      {page < pageCount ? (
        <Link className={linkClass} href={buildHref(basePath, page + 1, searchParams)}>
          Sau ›
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClass}>
          Sau ›
        </span>
      )}
    </nav>
  );
}
