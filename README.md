<!-- leak-check: allow-path — this file maps the repo and names every directory by design -->

# prep-loop

An interview prep system that runs inside Claude Code. It plans a week ahead,
quizzes rather than collecting a self-report, and scores mock rounds against a
fixed rubric.

The design principle: **policy describes the mechanism, profile supplies the
parameters.** Everything about a particular person — cadence, claims, resources,
weak habits — is read from `profile/`, so the rest of the repo stays true for
anyone. See [`CLAUDE.md`](CLAUDE.md) for the rules that keep that boundary.

## Status

Under construction. The guardrails and the written system exist; nothing
executes them yet.

**Works**

- [`policy/`](policy/README.md) — the mechanism in fourteen files: the week,
  the caps, the artifact voice, the calendar contract, the rubric, how a round
  is conducted, where a question comes from, what readiness means
- `tools/check-links.ts` — every relative link resolves, every heading anchor
  matches, no section numbers anywhere
- `tools/leak-check.ts` — three tiers over the shareable half: denylist terms
  and dates block, second person warns, cadence tells are reported as a design
  smell
- 30 tests over both

**Not built yet** — no skills, no runbooks, no templates, no profile. The repo
describes how to plan a week, quiz someone and run a round; it cannot yet do
any of them.

## Build order

- [x] **Scaffolding and guards** — skeleton, permissions, denylist format, both
      checkers with tests
- [x] **`policy/`** — the generic system, fourteen files: repo map, cadence,
      caps, artifact voice, calendar, grading, interviewing, check-in protocol,
      mock sourcing, mocks, story craft, frameworks, readiness
- [ ] **`onboard` skill** — grills a user into a `profile/`, verifies every
      numeric claim against its original source, mints the canary, records the
      resource selection and builds a catalog per source
- [ ] **The remaining skills** — check-in, mock, mock loop, story, routines
- [ ] **`runbooks/`** — one file per scheduled routine holding its complete
      logic, so a cron job is a short bootstrap that points at the repo
- [ ] **Cut over and run a full week untouched**
- [ ] **Compare against the system this replaces, and decide** — if it is worse,
      that is a result, not something to patch around
- [ ] **Publish** — copy the shareable directories into a fresh public repo
- [ ] **Voice interviewer** — separate repo, conducts rounds over speech and
      writes a transcript this one grades from

## Layout

| Shareable | |
|---|---|
| `policy/` | How the system works. No dates, no proper nouns, no second person. |
| `runbooks/` | One file per scheduled routine, holding its complete logic. |
| `.claude/skills/` | How a session is invoked. Nothing else. |
| `templates/` | Blank profile files, blank artifacts, the catalog format and its fetchers. |
| `tools/` | The two checkers. |
| `docs/` | Architecture, writing a runbook, the calendar contract. |

| Personal | |
|---|---|
| `profile/` | Facts, claims, habits, cadence. Written by onboarding. |
| `curriculum/` | One inventory per resource in use. |
| `plans/` `logs/` `performance/` `mocks/` | What gets planned and what happened. |
| `stories/` `deep-dives/` | Interview material. |
| `private/` | The denylist. |
| `intake/` | Resume drop. Gitignored. |

Publishing is a copy of the first table into a fresh repo — no history to
rewrite, nothing to scrub, because those directories never held anything
personal. `tools/leak-check.ts` is what keeps that true.

## Running the checks

[Bun](https://bun.sh) is the only prerequisite.

```bash
bun run check        # links, leaks and tests — runs straight from a clone
bun install          # only needed to edit: type definitions and the compiler
bun run typecheck
```

There are no runtime dependencies and there will not be any. The scheduled
routines clone this repo and must never need an install step before following a
runbook.
