#!/usr/bin/env bun
// Structural link check.
//
// Fails on:
//   - a relative markdown link whose target file does not exist
//   - a #fragment that matches no heading in the target file
//   - any occurrence of the section symbol, which this repo does not use
//     (a file link is machine-checkable; a section number is not)
//
//   bun tools/check-links.ts [path ...]      default: the whole repo

import { Glob } from "bun";
import { existsSync, statSync } from "node:fs";
import { dirname, join, normalize, relative, resolve } from "node:path";

const SKIP = ["node_modules", ".git", "intake", ".venv"];
const SECTION_SYMBOL = "§";

export type Problem = { file: string; line: number; message: string };

/** GitHub's anchor slug: strip inline markup, lowercase, drop punctuation, spaces to hyphens. */
export function slugify(text: string): string {
  const plain = text
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]*)\*\*/g, "$1")
    .replace(/\*([^*]*)\*/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
  return plain
    .normalize("NFC")
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s/g, "-");
}

/** Every anchor a file exposes, including GitHub's -1/-2 suffixes for repeats. */
export function headingAnchors(source: string): Set<string> {
  const anchors = new Set<string>();
  const seen = new Map<string, number>();
  let fenced = false;
  for (const line of source.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      fenced = !fenced;
      continue;
    }
    if (fenced) continue;
    const m = /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const base = slugify(m[2]!);
    const n = seen.get(base) ?? 0;
    anchors.add(n === 0 ? base : `${base}-${n}`);
    seen.set(base, n + 1);
  }
  return anchors;
}

const LINK = /(?<!!)\[[^\]]*\]\(\s*([^)\s]+)/g;
const EXTERNAL = /^(https?:|mailto:|tel:|#!)/i;

async function markdownFiles(roots: string[]): Promise<string[]> {
  const out = new Set<string>();
  for (const root of roots) {
    if (existsSync(root) && statSync(root).isFile()) {
      out.add(normalize(root));
      continue;
    }
    const glob = new Glob("**/*.md");
    for await (const hit of glob.scan({ cwd: root, onlyFiles: true })) {
      if (SKIP.some((s) => hit === s || hit.startsWith(`${s}/`) || hit.includes(`/${s}/`))) continue;
      out.add(normalize(join(root, hit)));
    }
  }
  return [...out].sort();
}

export async function check(roots: string[]): Promise<{ problems: Problem[]; checked: number }> {
  const problems: Problem[] = [];
  const anchorCache = new Map<string, Set<string>>();
  let checked = 0;

  for (const path of await markdownFiles(roots)) {
    const source = await Bun.file(path).text();
    let fenced = false;
    const lines = source.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!;
      const lineNo = i + 1;

      if (line.trimStart().startsWith("```")) {
        fenced = !fenced;
        continue;
      }
      if (line.includes(SECTION_SYMBOL)) {
        problems.push({ file: path, line: lineNo, message: "section symbol — use a file link or a heading anchor" });
      }
      if (fenced) continue;

      for (const m of line.matchAll(LINK)) {
        const target = m[1]!;
        if (EXTERNAL.test(target)) continue;
        checked++;

        const hash = target.indexOf("#");
        const filePart = hash === -1 ? target : target.slice(0, hash);
        const fragment = hash === -1 ? "" : target.slice(hash + 1);

        let resolved = path;
        if (filePart) {
          resolved = normalize(join(dirname(path), decodeURIComponent(filePart)));
          if (!existsSync(resolved)) {
            problems.push({ file: path, line: lineNo, message: `broken link -> ${target}` });
            continue;
          }
        }
        if (!fragment || !resolved.endsWith(".md")) continue;

        if (!anchorCache.has(resolved)) {
          anchorCache.set(resolved, headingAnchors(await Bun.file(resolved).text()));
        }
        if (!anchorCache.get(resolved)!.has(fragment.toLowerCase())) {
          problems.push({ file: path, line: lineNo, message: `no such heading -> ${target}` });
        }
      }
    }
  }
  return { problems, checked };
}

if (import.meta.main) {
  const repoRoot = resolve(import.meta.dir, "..");
  process.chdir(repoRoot);
  const args = Bun.argv.slice(2);
  const roots = args.length
    ? args.map((a) => (resolve(a).startsWith(repoRoot) ? relative(repoRoot, resolve(a)) || "." : a))
    : ["."];

  const { problems, checked } = await check(roots);
  for (const p of problems) console.error(`${p.file}:${p.line}: ${p.message}`);
  if (problems.length) {
    console.error(`\ncheck-links: ${problems.length} problem(s) across ${checked} relative link(s)`);
    process.exit(1);
  }
  console.log(`check-links: clean — ${checked} relative link(s), no section symbols`);
}
