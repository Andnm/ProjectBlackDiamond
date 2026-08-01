import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

async function loadEnv(file) {
  const text = await fs.readFile(file, "utf8");
  return Object.fromEntries(
    text
      .split(/\r?\n/)
      .filter((line) => line && !line.trimStart().startsWith("#"))
      .map((line) => {
        const separator = line.indexOf("=");
        return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
      }),
  );
}

const env = await loadEnv(".env.local");
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } },
);

const tables = ["collection_pieces", "blog_posts"];
const exported = {};

for (const table of tables) {
  const rows = [];
  const pageSize = 1000;

  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .range(from, from + pageSize - 1);

    if (error) throw new Error(`${table}: ${error.message}`);
    rows.push(...data);
    if (data.length < pageSize) break;
  }

  exported[table] = rows;
}

const timestamp = new Date().toISOString().replaceAll(":", "-");
const outputDirectory = path.resolve("backups");
const outputFile = path.join(outputDirectory, `supabase-data-${timestamp}.json`);
await fs.mkdir(outputDirectory, { recursive: true });
await fs.writeFile(
  outputFile,
  `${JSON.stringify(
    {
      exported_at: new Date().toISOString(),
      source: env.NEXT_PUBLIC_SUPABASE_URL,
      access_level: "anon (subject to Row Level Security policies)",
      tables: exported,
    },
    null,
    2,
  )}\n`,
  "utf8",
);

console.log(
  JSON.stringify({
    outputFile,
    rowCounts: Object.fromEntries(
      Object.entries(exported).map(([table, rows]) => [table, rows.length]),
    ),
  }),
);
