#!/usr/bin/env bash
# Structural link check for the whole repo.
#
# Fails on:
#   - a relative markdown link whose target file does not exist
#   - a #fragment that matches no heading in the target file
#   - any occurrence of the section symbol, which this repo does not use
#     (a file link is machine-checkable; a section number is not)
#
# Usage: ./tools/check-links.sh [dir ...]      (default: the whole repo)
set -euo pipefail
cd "$(dirname "$0")/.."
exec python3 - "$@" <<'PY'
import os, re, sys, unicodedata

SKIP_DIRS = {".git", "intake", "node_modules", ".venv"}
roots = sys.argv[1:] or ["."]

def md_files():
    seen = set()
    for root in roots:
        if os.path.isfile(root):
            p = os.path.normpath(root)
            if p not in seen:
                seen.add(p)
                yield p
            continue
        for dirpath, dirnames, filenames in os.walk(root):
            dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
            for fn in filenames:
                if fn.endswith(".md"):
                    p = os.path.normpath(os.path.join(dirpath, fn))
                    if p not in seen:
                        seen.add(p)
                        yield p

INLINE = [
    (re.compile(r"`([^`]*)`"), r"\1"),
    (re.compile(r"\*\*([^*]*)\*\*"), r"\1"),
    (re.compile(r"\*([^*]*)\*"), r"\1"),
    (re.compile(r"\[([^\]]*)\]\([^)]*\)"), r"\1"),
]

def slugify(text):
    for pat, rep in INLINE:
        text = pat.sub(rep, text)
    s = unicodedata.normalize("NFC", text).strip().lower()
    s = re.sub(r"[^\w\s-]", "", s, flags=re.UNICODE)
    s = re.sub(r"\s", "-", s)
    return s

def headings(path):
    """GitHub anchor set for a file, including its -1/-2 duplicate suffixes."""
    slugs, counts = set(), {}
    try:
        lines = open(path, encoding="utf-8").read().splitlines()
    except (OSError, UnicodeDecodeError):
        return slugs
    fenced = False
    for line in lines:
        if line.lstrip().startswith("```"):
            fenced = not fenced
            continue
        if fenced:
            continue
        m = re.match(r"^(#{1,6})\s+(.*?)\s*#*\s*$", line)
        if not m:
            continue
        base = slugify(m.group(2))
        n = counts.get(base, 0)
        slugs.add(base if n == 0 else f"{base}-{n}")
        counts[base] = n + 1
    return slugs

LINK = re.compile(r"(?<!\!)\[[^\]]*\]\(\s*([^)\s]+)")
EXTERNAL = re.compile(r"^(https?:|mailto:|tel:|#!)", re.I)
SECTION_SYMBOL = "§"

heading_cache, errors, checked = {}, [], 0

for path in sorted(md_files()):
    try:
        lines = open(path, encoding="utf-8").read().splitlines()
    except (OSError, UnicodeDecodeError):
        continue
    fenced = False
    for lineno, line in enumerate(lines, 1):
        if line.lstrip().startswith("```"):
            fenced = not fenced
            continue
        if SECTION_SYMBOL in line:
            errors.append(f"{path}:{lineno}: section symbol — use a file link or a heading anchor")
        if fenced:
            continue
        for target in LINK.findall(line):
            if EXTERNAL.match(target):
                continue
            checked += 1
            filepart, _, frag = target.partition("#")
            if filepart:
                resolved = os.path.normpath(os.path.join(os.path.dirname(path), filepart))
                if not os.path.exists(resolved):
                    errors.append(f"{path}:{lineno}: broken link -> {target}")
                    continue
            else:
                resolved = path
            if frag:
                if not resolved.endswith(".md"):
                    continue
                if resolved not in heading_cache:
                    heading_cache[resolved] = headings(resolved)
                if frag.lower() not in heading_cache[resolved]:
                    errors.append(f"{path}:{lineno}: no such heading -> {target}")

if errors:
    for e in errors:
        print(e, file=sys.stderr)
    print(f"\ncheck-links: {len(errors)} problem(s) across {checked} relative link(s)", file=sys.stderr)
    sys.exit(1)

print(f"check-links: clean — {checked} relative link(s), no section symbols")
PY
