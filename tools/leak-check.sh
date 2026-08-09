#!/usr/bin/env bash
# Guards the boundary between the shareable half of this repo and the personal half.
#
# The shareable directories must contain no dates, no proper nouns, and no
# second person. That constraint is what makes publishing a copy rather than a
# scrubbing project — so this script is the thing that keeps it true.
#
#   FAIL  a term from private/denylist.txt, incl. the canary
#   FAIL  a reference to a personal directory
#   FAIL  a 2020s year — the sneakiest identifier. A line like "set on <a date>"
#         reads as a personal decision log even with every name stripped, so
#         policy states rules without saying when they were decided.
#   WARN  second person attached to a claim
#
# Second person is a warning, not a failure, on purpose: templates address the
# end user directly and skills address the agent, so failing on it would cry
# wolf until someone stopped running this.
#
# Usage: ./tools/leak-check.sh [dir ...]   (default: the shareable directories)
#
# leak-check: allow-path   — this script names personal directories by design
set -euo pipefail
cd "$(dirname "$0")/.."
exec python3 - "$@" <<'PY'
import os, re, sys

DEFAULT_DIRS = ["policy", "runbooks", ".claude", "templates", "tools", "docs",
                "CLAUDE.md", "README.md"]
PERSONAL_DIRS = ["profile", "logs", "performance", "stories", "deep-dives", "plans", "mocks", "curriculum", "intake", "private"]
SKIP_DIRS = {".git", "node_modules", ".venv"}
DENYLIST = "private/denylist.txt"

roots = [d for d in (sys.argv[1:] or DEFAULT_DIRS) if os.path.exists(d)]

terms, regexes = [], []
if os.path.exists(DENYLIST):
    for raw in open(DENYLIST, encoding="utf-8"):
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if line.startswith("re:"):
            regexes.append(re.compile(line[3:], re.I))
        else:
            terms.append(line)
else:
    print(f"leak-check: no {DENYLIST} — term matching disabled", file=sys.stderr)

DATE = re.compile(r"\b20(2[0-9])\b")
SECOND_PERSON = re.compile(r"\byour\b", re.I)
PERSONAL_PATH = re.compile(r"(?<![\w/])(" + "|".join(PERSONAL_DIRS) + r")/", re.I)
# A file may name personal paths when that is its job — a template documenting
# where its output lands, or these scripts. Marker works in any comment syntax.
ALLOW_PATH_MARKER = re.compile(r"leak-check:\s*allow-path")

# Cadence tells. Not a privacy leak — a design smell. A shareable file naming a
# weekday, a clock time, a cron expression or a timezone has baked one user's
# routine into what is meant to be the mechanism. Reported separately and does
# not fail the run: meta-text about this very rule trips it, and so do examples.
CADENCE = [
    (re.compile(r"\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b", re.I), "weekday"),  # leak-check: allow-cadence
    (re.compile(r"\b\d{1,2}:\d{2}\b"), "clock time"),
    (re.compile(r"^\s*schedule:\s*[\"']?[-\d*]", re.I), "cron expression"),
    (re.compile(r"\b(Africa|America|Asia|Atlantic|Australia|Europe|Indian|Pacific)/[A-Za-z_]+\b"), "timezone"),
]
ALLOW_CADENCE_MARKER = re.compile(r"leak-check:\s*allow-cadence")

fails, warns, cadence, scanned = [], [], [], 0

def files():
    for root in roots:
        if os.path.isfile(root):
            yield root
            continue
        for dirpath, dirnames, filenames in os.walk(root):
            dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
            for fn in filenames:
                yield os.path.normpath(os.path.join(dirpath, fn))

for path in sorted(files()):
    try:
        content = open(path, encoding="utf-8").read()
    except (OSError, UnicodeDecodeError):
        continue
    scanned += 1
    path_allowed = bool(ALLOW_PATH_MARKER.search(content))
    cadence_allowed = bool(ALLOW_CADENCE_MARKER.search(content))
    for lineno, line in enumerate(content.splitlines(), 1):
        low = line.lower()
        for t in terms:
            if t.lower() in low:
                fails.append(f"{path}:{lineno}: denylist term {t!r}")
        for rx in regexes:
            if rx.search(line):
                fails.append(f"{path}:{lineno}: denylist pattern /{rx.pattern}/")
        m = DATE.search(line)
        if m:
            fails.append(f"{path}:{lineno}: dated — {m.group(0)}")
        if not path_allowed:
            m = PERSONAL_PATH.search(line)
            if m:
                fails.append(f"{path}:{lineno}: personal path {m.group(0)!r}")
        if SECOND_PERSON.search(line):
            warns.append(f"{path}:{lineno}: second person")
        if not cadence_allowed and not ALLOW_CADENCE_MARKER.search(line):
            for rx, label in CADENCE:
                m = rx.search(line)
                if m:
                    cadence.append(f"{path}:{lineno}: {label} — {m.group(0).strip()!r}")

for c in cadence:
    print(f"CADENCE  {c}", file=sys.stderr)
for w in warns:
    print(f"WARN     {w}", file=sys.stderr)
for f in fails:
    print(f"FAIL     {f}", file=sys.stderr)

label = ", ".join(roots) if roots else "(nothing)"
tally = f"{len(fails)} failure(s), {len(warns)} warning(s), {len(cadence)} cadence tell(s)"
if fails:
    print(f"\nleak-check: {tally} across {scanned} file(s) in {label}", file=sys.stderr)
    sys.exit(1)
print(f"leak-check: no leaks — {scanned} file(s) in {label}, {tally}")
PY
