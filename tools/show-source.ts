#!/usr/bin/env bun
// Print one curriculum source from instance/prep.db as markdown — for a quick
// look. Nothing reads the output; the database is the source of truth.
//
//   bun tools/show-source.ts            list the slugs
//   bun tools/show-source.ts <slug>   the source table, quirks, entries, material
//
// leak-check: allow-path — it opens the local database

import { open } from "./db.ts";

const db = open();
const slug = Bun.argv[2];

if (!slug) {
  for (const r of db
    .query(
      `SELECT slug, completeness,
              (SELECT count(*) FROM entry    WHERE source_slug = source.slug) AS entries,
              (SELECT count(*) FROM material WHERE source_slug = source.slug) AS material
       FROM source ORDER BY slug`,
    )
    .all() as any[]) {
    console.log(`${r.slug.padEnd(28)} ${r.completeness.padEnd(9)} ${r.entries} entries${r.material ? `, ${r.material} material` : ""}`);
  }
  process.exit(0);
}

const src = db.query("SELECT * FROM source WHERE slug = ?").get(slug) as any;
if (!src) {
  console.error(`show-source: no source '${slug}'`);
  process.exit(1);
}

const out: string[] = [`# ${src.name}`, "", "| Field | Value |", "|---|---|"];
const field = (k: string, v: unknown) => v != null && out.push(`| ${k} | ${v} |`);
field("Where", src.url);
field("Access", src.access);
field("Covers", src.covers);
field("Completeness", src.completeness);
field("Pulled", src.pulled_on);
field("Built by", src.built_by);
field("Cross-checked", src.cross_checked);
field("Refresh", src.refresh_cadence);
field("Fastest-moving", src.fastest_moving);

if (src.quirks) {
  out.push("", "## Known quirks", "");
  for (const q of String(src.quirks).split("\n")) out.push(`- ${q}`);
}

const tags = new Map<number, string[]>();
for (const t of db.query("SELECT entry_id, tag FROM entry_tag WHERE entry_id IN (SELECT id FROM entry WHERE source_slug = ?) ORDER BY tag").all(slug) as any[]) {
  if (!tags.has(t.entry_id)) tags.set(t.entry_id, []);
  tags.get(t.entry_id)!.push(t.tag);
}

const entries = db.query("SELECT * FROM entry WHERE source_slug = ? ORDER BY section, id").all(slug) as any[];
out.push("", "## Entries", "", `${entries.length} entries.`);
const COLS = ["Identifier", "Title", "Link", "Tags", "Difficulty", "Worked", "Asked", "Grade"];
let section: string | null = null;
for (const e of entries) {
  if (e.section !== section) {
    section = e.section;
    if (section) out.push("", `### ${section}`);
    out.push("", `| ${COLS.join(" | ")} |`, `|${COLS.map(() => "---").join("|")}|`);
  }
  const grade = e.grade ? `${e.grade} · ${e.grade_from ?? ""}`.trim() : "";
  out.push(
    `| ${e.identifier} | ${e.title} | \`${e.url}\` | ${(tags.get(e.id) ?? []).join(", ")} | ` +
      `${e.difficulty ?? ""} | ${e.worked_on ?? ""} | ${e.asked_on ?? ""} | ${grade} |`,
  );
}

const material = db.query("SELECT * FROM material WHERE source_slug = ? ORDER BY section, id").all(slug) as any[];
if (material.length) {
  out.push("", "## Material", "", "| Identifier | Title | Kind | Lessons | Access | Worked | Grade |", "|---|---|---|---|---|---|---|");
  for (const m of material) {
    const grade = m.grade ? `${m.grade} · ${m.grade_from ?? ""}`.trim() : "";
    out.push(`| ${m.identifier} | ${m.title} | ${m.kind} | ${m.lessons ?? ""} | ${m.access ?? ""} | ${m.worked_on ?? ""} | ${grade} |`);
  }
}

process.stdout.write(out.join("\n") + "\n");
