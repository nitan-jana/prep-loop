#!/usr/bin/env bun
// The checks the schema cannot express. Everything else — shape, enums,
// within-database referential integrity — is a CHECK or FOREIGN KEY in
// tools/schema.sql, enforced on every write.
//
// What is left for code:
//   - SQLite's own integrity_check / foreign_key_check (cheap paranoia)
//   - a `grade_from` ('log <date>') names a real log or review, which live
//     as markdown files, so no FK can reach them
//
//   bun tools/check-db.ts            checks instance/prep.db
//   bun run check:db                 the same, by its script name

import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { open } from "./db.ts";

export type Problem = { where: string; message: string };

/** 'log <date>' / 'review <iso-week>' / 'recall <date>' -> the file it names,
 *  relative to instance/. Returns null if the string is shapeless. */
export function gradeSourcePath(src: string): string | null {
  const m = /^(log|review|recall)\s+(\S+)$/.exec(src.trim());
  if (!m) return null;
  const [, kind, id] = m;
  if (kind === "log") return `logs/${id}`;
  if (kind === "recall") return `performance/${id}-recall`;
  return `performance/${id}`;
}

export function checkDb(instanceDir: string): Problem[] {
  const problems: Problem[] = [];
  const db = open(join(instanceDir, "prep.db"));

  for (const r of db.query("PRAGMA integrity_check").all() as { integrity_check: string }[])
    if (r.integrity_check !== "ok") problems.push({ where: "integrity_check", message: r.integrity_check });

  for (const r of db.query("PRAGMA foreign_key_check").all() as { table: string; rowid: number; parent: string }[])
    problems.push({ where: `${r.table} rowid ${r.rowid}`, message: `dangling reference to ${r.parent}` });

  // grade_from -> a real log or review (markdown, so not FK-able)
  const rows = db
    .query(
      `SELECT 'entry' AS t, source_slug, identifier, grade_from FROM entry WHERE grade_from IS NOT NULL
       UNION ALL
       SELECT 'material', source_slug, identifier, grade_from FROM material WHERE grade_from IS NOT NULL`,
    )
    .all() as { t: string; source_slug: string; identifier: string; grade_from: string }[];

  for (const r of rows) {
    const rel = gradeSourcePath(r.grade_from);
    const at = `${r.t} ${r.source_slug}/${r.identifier}`;
    if (!rel) {
      problems.push({ where: at, message: `unparseable grade_from '${r.grade_from}'` });
      continue;
    }
    if (!existsSync(join(instanceDir, `${rel}.md`)) && !existsSync(join(instanceDir, `${rel}.yaml`)))
      problems.push({ where: at, message: `grade_from '${r.grade_from}' -> ${rel} (missing)` });
  }

  return problems;
}

if (import.meta.main) {
  const repoRoot = resolve(import.meta.dir, "..");
  const instanceDir = join(repoRoot, "instance");
  if (!existsSync(join(instanceDir, "prep.db"))) {
    console.log("check-db: no instance/prep.db — nothing to check");
    process.exit(0);
  }
  const problems = checkDb(instanceDir);
  for (const p of problems) console.error(`${p.where}: ${p.message}`);
  if (problems.length) {
    console.error(`\ncheck-db: ${problems.length} problem(s)`);
    process.exit(1);
  }
  console.log("check-db: clean");
}
