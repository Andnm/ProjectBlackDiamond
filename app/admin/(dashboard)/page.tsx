import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getActiveTranslationProvider } from "@/lib/translation/provider";
import { getQuotaStatus, QUOTA_THRESHOLDS } from "@/lib/translation/quota";

const QUOTA_LEVEL_META = {
  ok: { label: "ปกติ", bar: "bg-emerald-400", text: "text-emerald-300" },
  yellow: { label: "เตือนระดับเหลือง", bar: "bg-amber-400", text: "text-amber-300" },
  red: { label: "เตือนระดับแดง", bar: "bg-red-400", text: "text-red-300" },
  stop: { label: "หยุดแปลอัตโนมัติชั่วคราว", bar: "bg-red-500", text: "text-red-400" },
} as const;

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: collectionCount },
    { count: blogCount },
    { count: publishedBlogCount },
  ] = await Promise.all([
    supabase
      .from("collection_pieces")
      .select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true })
      .eq("published", true),
  ]);

  const provider = getActiveTranslationProvider();
  const quota = await getQuotaStatus(provider);
  const quotaMeta = QUOTA_LEVEL_META[quota.level];
  const quotaPercent = Math.min(100, Math.round((quota.used / QUOTA_THRESHOLDS.stop) * 100));

  const cards = [
    {
      label: "สินค้าในคอลเลกชัน",
      value: collectionCount ?? 0,
      href: "/admin/collection",
      cta: "จัดการคอลเลกชัน",
    },
    {
      label: "บทความบล็อก",
      value: blogCount ?? 0,
      href: "/admin/blog",
      cta: "จัดการบทความ",
    },
    {
      label: "บทความที่เผยแพร่แล้ว",
      value: publishedBlogCount ?? 0,
      href: "/admin/blog",
      cta: "ดูรายการ",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-bold uppercase tracking-[0.3em] text-amber-400">
          ภาพรวม
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-400">
          จัดการเนื้อหาคอลเลกชันเพชรดำและบทความของ BlackDiamond
          การเปลี่ยนแปลงทั้งหมดจะอัปเดตบนหน้าเว็บสาธารณะโดยอัตโนมัติภายในไม่กี่นาที
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            className="flex flex-col justify-between gap-6 border border-neutral-800 bg-neutral-900/40 p-6"
            key={card.label}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">
                {card.label}
              </p>
              <p className="mt-3 font-headline text-4xl text-white">
                {card.value}
              </p>
            </div>
            <Link
              className="text-xs font-bold uppercase tracking-[0.16em] text-amber-400 transition hover:text-amber-300"
              href={card.href}
            >
              {card.cta} →
            </Link>
          </div>
        ))}
      </div>

      <div className="border border-neutral-800 bg-neutral-900/40 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">
            โควต้าแปลภาษาเดือนนี้ ({provider.id === "unconfigured" ? "ยังไม่ได้ตั้งค่า provider" : provider.id})
          </p>
          <span className={`text-xs font-bold uppercase tracking-[0.14em] ${quotaMeta.text}`}>{quotaMeta.label}</span>
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden bg-neutral-800">
          <div className={`h-full ${quotaMeta.bar} transition-all`} style={{ width: `${quotaPercent}%` }} />
        </div>
        <p className="mt-3 text-sm text-neutral-400">
          ใช้ไป {quota.used.toLocaleString("th-TH")} ตัวอักษร จากเพดานเตือน {QUOTA_THRESHOLDS.stop.toLocaleString("th-TH")}{" "}
          (เหลือ {quota.remaining.toLocaleString("th-TH")})
        </p>
        <p className="mt-1 text-xs text-neutral-500">
          เหลือง {QUOTA_THRESHOLDS.yellow.toLocaleString("th-TH")} · แดง {QUOTA_THRESHOLDS.red.toLocaleString("th-TH")} · หยุดแปลอัตโนมัติที่{" "}
          {QUOTA_THRESHOLDS.stop.toLocaleString("th-TH")}
        </p>
      </div>
    </div>
  );
}
