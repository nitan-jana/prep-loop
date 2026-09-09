#!/usr/bin/env bun
// Rebuilds the markdown views generated from a YAML source of truth. Right now
// that is just `instance/profile/habits.md` from `habits.yaml` — the curriculum
// inventories moved to instance/prep.db and are read with tools/show-source.ts.
//
//   bun tools/render-views.ts            rewrite the views
//   bun tools/render-views.ts --check    fail if a view is stale
//
// leak-check: allow-path — it writes into the local profile folder

import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

const GENERATED = "<!-- generated from the .yaml beside it by tools/render-views.ts — do not edit -->";
const DASH = "—";
const cell = (v: unknown): string => (v == null ? DASH : String(v).replace(/\n+/g, " ").replace(/\|/g, "\\|").trim());

/** Insert each group of rows after the Nth table separator line in `template`. */
function spliceRows(template: string, rowGroups: string[][]): string {
  const lines = template.split("\n");
  const out: string[] = [];
  let table = 0;
  for (const line of lines) {
    out.push(line);
    if (/^\|(\s*:?-+:?\s*\|)+\s*$/.test(line)) {
      out.push(...(rowGroups[table] ?? []));
      table++;
    }
  }
  return out.join("\n");
}

function withMarker(text: string): string {
  const lines = text.split("\n");
  if (lines[0]?.startsWith("<!--")) return [lines[0], GENERATED, ...lines.slice(1)].join("\n");
  return [GENERATED, ...lines].join("\n");
}

async function renderHabits(repoRoot: string): Promise<string> {
  const value = Bun.YAML.parse(await Bun.file(join(repoRoot, "instance/profile/habits.yaml")).text()) as any;
  const template = await Bun.file(join(repoRoot, "templates/profile/habits.md")).text();
  const observed = (value?.observed ?? []).map(
    (h: any) => `| ${cell(h.habit)} | ${cell(h.first_seen)} | ${cell(h.seen_since)} | ${cell(h.costs)} |`,
  );
  const retired = (value?.retired ?? []).map((h: any) => `| ${cell(h.habit)} | ${cell(h.stopped_appearing)} |`);
  const md = withMarker(spliceRows(template, [observed, retired]));
  return md.endsWith("\n") ? md : md + "\n";
}

const VIEWS: Record<string, (repoRoot: string) => Promise<string>> = {
  "instance/profile/habits.md": renderHabits,
};

if (import.meta.main) {
  const repoRoot = resolve(import.meta.dir, "..");
  const checkOnly = Bun.argv.includes("--check");
  let drift = 0;
  let wrote = 0;

  for (const [rel, build] of Object.entries(VIEWS)) {
    const src = join(repoRoot, rel.replace(/\.md$/, ".yaml"));
    if (!existsSync(src)) continue;
    const want = await build(repoRoot);
    const path = join(repoRoot, rel);
    const current = existsSync(path) ? await Bun.file(path).text() : null;
    if (current === want) continue;
    if (checkOnly) {
      console.error(`render-views: ${rel} is stale — rerun without --check`);
      drift++;
    } else {
      await Bun.write(path, want);
      wrote++;
    }
  }

  if (checkOnly) {
    if (drift) process.exit(1);
    console.log("render-views: views up to date");
  } else {
    console.log(`render-views: ${wrote} view(s) written`);
  }
}
