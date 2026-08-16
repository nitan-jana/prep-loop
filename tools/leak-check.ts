#!/usr/bin/env bun
// Guards the boundary between this repo, which is public, and the local folder
// beside it, which is not.
//
// Nothing tracked here carries a date, a proper noun or a second person. The
// gitignore keeps whole files apart; this keeps their contents apart, which is
// the half a gitignore cannot do.
//
//   FAIL     a term from the denylist, including the canary
//   FAIL     a reference into the local folder
//   FAIL     a 2020s year — the sneakiest identifier. A line stating when a rule
//            was decided reads as a personal decision log even with every name
//            stripped, so policy states rules without saying when they were set.
//   WARN     second person, under `policy/` only. Policy is written in the third
//            person about a user who is not in the room. Everywhere else the
//            second person is correct, because templates and the readme address
//            whoever is reading them.
//   CADENCE  a weekday, clock time, cron expression or timezone. Not a leak — a
//            design smell: one user's routine baked into the mechanism.
//
// Only FAIL exits non-zero. Cadence and second person are reported for review,
// because meta-text about these very rules trips them — a check that cries wolf
// is one that gets switched off.
//
//   bun tools/leak-check.ts [path ...]     default: everything tracked
//
// leak-check: allow-path — this file names the personal paths by design

import { Glob } from "bun";
import { existsSync, statSync } from "node:fs";
import { join, normalize, relative, resolve } from "node:path";

// `LICENSE` is deliberately absent: a copyright line is a name and a year by
// definition, which is the thing this checker rejects everywhere else.
const DEFAULT_ROOTS = ["policy", ".claude", ".github", ".githooks", "templates", "tools", "docs", "CLAUDE.md", "README.md", "CONTRIBUTING.md"];
// `instance` is the local folder itself. The rest catch a stale reference that
// dropped the prefix, which resolves to nothing and would otherwise pass.
const PERSONAL_DIRS = ["instance", "profile", "logs", "performance", "stories", "deep-dives", "plans", "mocks", "curriculum", "intake", "private"];
const SKIP = ["node_modules", ".git", ".venv"];
const DENYLIST = "instance/private/denylist.txt";
// A fresh clone has no denylist and nothing to leak, so term matching being off
// is correct there. Once a profile exists the two facts together are a hole: the
// half of the check that knows the user's real names is silent, and the run
// still reports success.
const PROFILE = "instance/profile";

export type Tier = "FAIL" | "WARN" | "CADENCE";
export type Finding = { tier: Tier; file: string; line: number; message: string };

const DATE = /\b20(2\d)\b/;
const SECOND_PERSON = /\byour\b/i;
// The third-person rule belongs to policy and nowhere else, so the check runs
// nowhere else. Applied repo-wide it fires on every template and most of the
// readme, all of them correct, which is a warning nobody reads by the third one.
const SECOND_PERSON_SCOPE = /^policy[/\\]/;
const PERSONAL_PATH = new RegExp(`(?<![\\w/])(${PERSONAL_DIRS.join("|")})/`, "i");
const ALLOW_PATH = /leak-check:\s*allow-path/;
const ALLOW_CADENCE = /leak-check:\s*allow-cadence/;
// A test for these rules has to contain the thing each rule detects. This
// silences the heuristics for such a file — but never denylist terms, which are
// the actual privacy boundary. A real name in a fixture still fails.
const ALLOW_FIXTURES = /leak-check:\s*allow-fixtures/;

const CADENCE: [RegExp, string][] = [
  [/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i, "weekday"], // leak-check: allow-cadence
  [/\b\d{1,2}:\d{2}\b/, "clock time"],
  [/^\s*schedule:\s*["']?[-\d*]/i, "cron expression"],
  [/\b(Africa|America|Asia|Atlantic|Australia|Europe|Indian|Pacific)\/[A-Za-z_]+\b/, "timezone"],
];

export type Denylist = { terms: string[]; patterns: RegExp[] };

export function parseDenylist(source: string): Denylist {
  const terms: string[] = [];
  const patterns: RegExp[] = [];
  for (const raw of source.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    if (line.startsWith("re:")) patterns.push(new RegExp(line.slice(3), "i"));
    else terms.push(line);
  }
  return { terms, patterns };
}

export function scanText(path: string, source: string, deny: Denylist): Finding[] {
  const findings: Finding[] = [];
  const fixtures = ALLOW_FIXTURES.test(source);
  const pathAllowed = fixtures || ALLOW_PATH.test(source);
  const cadenceAllowed = fixtures || ALLOW_CADENCE.test(source);

  source.split("\n").forEach((line, i) => {
    const lineNo = i + 1;
    const low = line.toLowerCase();
    const add = (tier: Tier, message: string) => findings.push({ tier, file: path, line: lineNo, message });

    for (const t of deny.terms) if (low.includes(t.toLowerCase())) add("FAIL", `denylist term '${t}'`);
    for (const p of deny.patterns) if (p.test(line)) add("FAIL", `denylist pattern /${p.source}/`);

    if (!fixtures) {
      const date = DATE.exec(line);
      if (date) add("FAIL", `dated — ${date[0]}`);
    }

    if (!pathAllowed) {
      const pp = PERSONAL_PATH.exec(line);
      if (pp) add("FAIL", `personal path '${pp[0]}'`);
    }
    if (!fixtures && SECOND_PERSON_SCOPE.test(path) && SECOND_PERSON.test(line)) add("WARN", "second person");

    if (!cadenceAllowed && !ALLOW_CADENCE.test(line)) {
      for (const [rx, label] of CADENCE) {
        const m = rx.exec(line);
        if (m) add("CADENCE", `${label} — '${m[0].trim()}'`);
      }
    }
  });
  return findings;
}

async function filesUnder(roots: string[]): Promise<string[]> {
  const out = new Set<string>();
  for (const root of roots) {
    if (!existsSync(root)) continue;
    if (statSync(root).isFile()) {
      out.add(normalize(root));
      continue;
    }
    const glob = new Glob("**/*");
    for await (const hit of glob.scan({ cwd: root, onlyFiles: true, dot: true })) {
      if (SKIP.some((s) => hit === s || hit.startsWith(`${s}/`) || hit.includes(`/${s}/`))) continue;
      out.add(normalize(join(root, hit)));
    }
  }
  return [...out].sort();
}

export async function leakCheck(roots: string[], denylistPath = DENYLIST) {
  const deny = existsSync(denylistPath)
    ? parseDenylist(await Bun.file(denylistPath).text())
    : { terms: [], patterns: [] };

  const findings: Finding[] = [];
  const files = await filesUnder(roots);
  for (const path of files) {
    let source: string;
    try {
      source = await Bun.file(path).text();
    } catch {
      continue;
    }
    findings.push(...scanText(path, source, deny));
  }
  return { findings, scanned: files.length, hasDenylist: existsSync(denylistPath) };
}

/** A profile with no denylist beside it: term matching is off for an install
 *  that has real names in it. Reported as a failure, not a note. */
export function denylistGap(hasDenylist: boolean, hasProfile: boolean): boolean {
  return !hasDenylist && hasProfile;
}

if (import.meta.main) {
  const repoRoot = resolve(import.meta.dir, "..");
  process.chdir(repoRoot);
  const args = Bun.argv.slice(2);
  const roots = args.length
    ? args.map((a) => (resolve(a).startsWith(repoRoot) ? relative(repoRoot, resolve(a)) || "." : a))
    : DEFAULT_ROOTS;

  const { findings, scanned, hasDenylist } = await leakCheck(roots);
  const gap = denylistGap(hasDenylist, existsSync(PROFILE));
  if (gap) {
    console.error(`FAIL     ${DENYLIST} is missing while ${PROFILE} exists — term matching is off`);
    console.error(`         restore it from templates/denylist.txt and refill it from the profile`);
  } else if (!hasDenylist) {
    console.error(`leak-check: no ${DENYLIST} — term matching disabled until onboarding runs`);
  }

  const by = (t: Tier) => findings.filter((f) => f.tier === t);
  for (const t of ["CADENCE", "WARN", "FAIL"] as Tier[]) {
    for (const f of by(t)) console.error(`${t.padEnd(8)} ${f.file}:${f.line}: ${f.message}`);
  }

  const present = roots.filter((r) => existsSync(r));
  const label = present.length ? present.join(", ") : "(nothing)";
  const failures = by("FAIL").length + (gap ? 1 : 0);
  const tally = `${failures} failure(s), ${by("WARN").length} warning(s), ${by("CADENCE").length} cadence tell(s)`;
  if (failures) {
    console.error(`\nleak-check: ${tally} across ${scanned} file(s) in ${label}`);
    process.exit(1);
  }
  console.log(`leak-check: no leaks — ${scanned} file(s) in ${label}, ${tally}`);
}
