#!/usr/bin/env bun
// Structural check for the YAML data files still kept under `instance/`.
//
// Curriculum, claims, readiness and stories moved to instance/prep.db — their
// shape, enums and referential integrity are CHECK/FOREIGN KEY constraints in
// tools/schema.sql, and tools/check-db.ts covers what a constraint cannot.
// What stays here: `habits.yaml`, and the week plans once they are structured.
//
// leak-check: allow-path — it names the local folder it is pointed at on request
//
// Never part of the blocking `check`: a gate whose verdict depends on untracked
// per-install files would pass on a runner and for every other clone. See
// docs/decisions/05.
//
//   bun tools/check-data.ts [path]      default: instance/
//   bun run check:data                  runs this and check-db.ts

import { Glob } from "bun";
import { existsSync } from "node:fs";
import { join, relative, resolve } from "node:path";

export type Problem = { file: string; path: string; message: string };

// --- small helpers -------------------------------------------------------

export const GRADES = ["solid", "shaky", "not retained"] as const;
export const GRADE_LEGS = ["unprompted", "cost", "follow-up"] as const;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const ISO_WEEK = /^\d{4}-W\d{2}$/;

export const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** Collect problems for one document against a set of field rules. */
export class Checker {
  problems: Problem[] = [];
  constructor(public file: string) {}

  at(path: string, message: string) {
    this.problems.push({ file: this.file, path, message });
  }

  /** Every key on `obj` must be in `allowed`; flags typos and stale fields. */
  onlyKeys(obj: Record<string, unknown>, allowed: string[], path = "") {
    for (const k of Object.keys(obj)) {
      if (!allowed.includes(k)) this.at(path ? `${path}.${k}` : k, "unknown key");
    }
  }

  reqString(obj: Record<string, unknown>, key: string, path: string) {
    const v = obj[key];
    if (typeof v !== "string" || v.trim() === "") this.at(`${path}.${key}`, "required non-empty string");
  }

  optString(obj: Record<string, unknown>, key: string, path: string) {
    if (key in obj && typeof obj[key] !== "string") this.at(`${path}.${key}`, "must be a string when present");
  }

  enum<T extends readonly string[]>(obj: Record<string, unknown>, key: string, set: T, path: string, optional = false) {
    if (optional && !(key in obj)) return;
    const v = obj[key];
    if (typeof v !== "string" || !set.includes(v)) this.at(`${path}.${key}`, `one of ${set.map((s) => `'${s}'`).join(", ")}`);
  }

  isoDate(obj: Record<string, unknown>, key: string, path: string, optional = false) {
    if (optional && !(key in obj)) return;
    const v = obj[key];
    if (typeof v !== "string" || !ISO_DATE.test(v)) this.at(`${path}.${key}`, "date as YYYY-MM-DD");
  }

  list(obj: Record<string, unknown>, key: string, path: string, optional = false): unknown[] {
    if (optional && !(key in obj)) return [];
    const v = obj[key];
    if (!Array.isArray(v)) {
      this.at(`${path}.${key}`, "a list");
      return [];
    }
    return v;
  }
}

// --- concept validators -------------------------------------------------
//
// One imperative function per concept, taking an already-parsed value. No schema
// DSL: the rules read as code, and a rule that needs a special case gets one.

/** grade — a value plus, below `solid`, which tests it failed and the answer.
 *  Used where a full grade record is written (a log or review); the inventory's
 *  pointer form lives in the database. */
export function validateGrade(c: Checker, v: unknown, path: string) {
  if (!isObject(v)) return c.at(path, "a mapping");
  c.onlyKeys(v, ["value", "legs", "answer", "source"], path);
  c.enum(v, "value", GRADES, path);
  c.reqString(v, "answer", path);
  c.reqString(v, "source", path); // e.g. "log <date>" / "review <iso-week>"
  const legs = c.list(v, "legs", path, true);
  for (const [i, leg] of legs.entries()) {
    if (typeof leg !== "string" || !GRADE_LEGS.includes(leg as (typeof GRADE_LEGS)[number]))
      c.at(`${path}.legs[${i}]`, `one of ${GRADE_LEGS.map((s) => `'${s}'`).join(", ")}`);
  }
  if (v.value !== "solid" && legs.length === 0) c.at(`${path}.legs`, "a grade below 'solid' names the test it failed");
  if (v.value === "solid" && legs.length > 0) c.at(`${path}.legs`, "'solid' fails no test");
}

/** habits — observed grow, retired are kept. */
export function validateHabits(c: Checker, v: unknown) {
  if (!isObject(v)) return c.at("", "a mapping with 'observed' and 'retired'");
  c.onlyKeys(v, ["observed", "retired"]);
  for (const [i, h] of c.list(v, "observed", "", true).entries()) {
    const p = `observed[${i}]`;
    if (!isObject(h)) {
      c.at(p, "a mapping");
      continue;
    }
    c.onlyKeys(h, ["habit", "first_seen", "seen_since", "costs"], p);
    c.reqString(h, "habit", p);
    c.isoDate(h, "first_seen", p);
    c.reqString(h, "costs", p);
  }
  for (const [i, h] of c.list(v, "retired", "", true).entries()) {
    const p = `retired[${i}]`;
    if (!isObject(h)) {
      c.at(p, "a mapping");
      continue;
    }
    c.onlyKeys(h, ["habit", "stopped_appearing"], p);
    c.reqString(h, "habit", p);
  }
}

/** week plan — instructions for sessions that have not happened. No history. */
const HISTORY_KEYS = ["was", "previously", "moved_from", "attempt", "carried_from", "history"];
export function validateWeekPlan(c: Checker, v: unknown) {
  if (!isObject(v)) return c.at("", "a mapping");
  c.onlyKeys(v, ["week", "focus", "days", "deferred"]);
  if (typeof v.week !== "string" || !ISO_WEEK.test(v.week)) c.at("week", "an ISO week as YYYY-Www");
  c.optString(v, "focus", "");
  for (const [i, day] of c.list(v, "days", "", true).entries()) {
    const dp = `days[${i}]`;
    if (!isObject(day)) {
      c.at(dp, "a mapping");
      continue;
    }
    c.onlyKeys(day, ["date", "blocks"], dp);
    c.isoDate(day, "date", dp);
    for (const [j, b] of c.list(day, "blocks", dp, true).entries()) {
      const bp = `${dp}.blocks[${j}]`;
      if (!isObject(b)) {
        c.at(bp, "a mapping");
        continue;
      }
      c.onlyKeys(b, ["slot", "track", "instruction", "urls"], bp);
      c.reqString(b, "slot", bp);
      c.reqString(b, "track", bp);
      c.reqString(b, "instruction", bp);
      for (const [k, u] of c.list(b, "urls", bp, true).entries())
        if (typeof u !== "string" || !/^https?:\/\//.test(u)) c.at(`${bp}.urls[${k}]`, "an http(s) URL");
      for (const hk of HISTORY_KEYS) if (hk in b) c.at(`${bp}.${hk}`, "a plan carries no account of what was there before — see docs/decisions/10");
    }
  }
  for (const [i, d] of c.list(v, "deferred", "", true).entries()) {
    const dp = `deferred[${i}]`;
    if (!isObject(d)) {
      c.at(dp, "a mapping");
      continue;
    }
    c.onlyKeys(d, ["instruction", "urls"], dp);
    c.reqString(d, "instruction", dp);
    for (const hk of HISTORY_KEYS) if (hk in d) c.at(`${dp}.${hk}`, "no displacement history — see docs/decisions/10");
  }
}

// --- CLI --------------------------------------------------------------


/** Route a file to its concept by where it sits under `instance/`. Curriculum,
 *  claims, readiness and stories moved to instance/prep.db — those checks are in
 *  tools/check-db.ts and tools/schema.sql. What is left here is the concepts
 *  still kept as YAML. */
export function conceptFor(rel: string): string | null {
  if (rel === "profile/habits.yaml") return "habits";
  if (rel.startsWith("plans/")) return "week-plan";
  return null;
}

async function loadYaml(path: string): Promise<{ value: unknown; error?: string }> {
  try {
    return { value: Bun.YAML.parse(await Bun.file(path).text()) };
  } catch (e) {
    return { value: null, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function checkData(root: string) {
  const problems: Problem[] = [];
  let checked = 0;

  const glob = new Glob("**/*.yaml");
  const files: string[] = [];
  for await (const hit of glob.scan({ cwd: root, onlyFiles: true })) files.push(hit);
  files.sort();

  for (const rel of files) {
    const concept = conceptFor(rel);
    if (!concept) continue;
    const { value, error } = await loadYaml(join(root, rel));
    if (error) {
      problems.push({ file: rel, path: "", message: `YAML will not parse: ${error}` });
      continue;
    }
    const c = new Checker(rel);
    checked++;

    if (concept === "habits") {
      validateHabits(c, value);
    } else if (concept === "week-plan") {
      validateWeekPlan(c, value);
    }

    problems.push(...c.problems);
  }

  return { problems, checked };
}

if (import.meta.main) {
  const repoRoot = resolve(import.meta.dir, "..");
  process.chdir(repoRoot);
  const arg = Bun.argv[2];
  const root = arg
    ? resolve(arg).startsWith(repoRoot)
      ? relative(repoRoot, resolve(arg)) || "."
      : arg
    : "instance";

  if (!existsSync(root)) {
    console.log(`check-data: no ${root}/ — nothing to check`);
    process.exit(0);
  }

  const { problems, checked } = await checkData(root);
  for (const p of problems) console.error(`${p.file}${p.path ? `:${p.path}` : ""}: ${p.message}`);
  if (problems.length) {
    console.error(`\ncheck-data: ${problems.length} problem(s) across ${checked} data file(s) in ${root}/`);
    process.exit(1);
  }
  console.log(`check-data: clean — ${checked} data file(s) in ${root}/`);
}
