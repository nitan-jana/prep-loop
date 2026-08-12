<!-- leak-check: allow-path — this file maps the repo and names every directory by design -->

# prep-loop

An interview prep system that runs inside [Claude Code](https://claude.com/claude-code).
It plans a week ahead, quizzes rather than collecting a self-report, scores mock
rounds against a fixed rubric, and checks the claims on a resume against the
commit history behind them.

**Nothing personal is ever committed.** Everything about a particular person
lives in `instance/`, a plain folder inside the clone that git ignores and that
has no remote. The profile, the verified claims, the daily logs, the graded
answers, the resume dropped in for onboarding: none of it can be pushed
anywhere, because there is nowhere for it to go.

That one line in `.gitignore` is the privacy model. The rest of the repo is
generic by construction, and [`tools/leak-check.ts`](tools/leak-check.ts) fails
the build if a name, a date, or a personal path appears in it.

## Start here

```bash
git clone <this repo>
cd prep-loop
```

Open Claude Code in the directory and run `/prep`. It reports where the install
stands and names the one thing to run next, which on a fresh clone is
`/onboard`. There is nothing to install.

[**`docs/getting-started.md`**](docs/getting-started.md) is the walkthrough:
onboarding, a week, a day, a review, and where everything lives.

## The design principle

**Policy describes the mechanism; profile supplies the parameters.**

`policy/` says what a check-in is, what a grade means, and how a round is
conducted. It contains no weekday, no clock time, no vendor and no framework
name, because those belong to a user rather than to the system.
`instance/profile/` supplies all of it, written by interviewing whoever is
using it. See [`CLAUDE.md`](CLAUDE.md) for the rules that keep the boundary.

## Status

Everything is written and nothing is proven. All seven sessions exist, the
guardrails run on every push, and the system has produced a profile and a week
plan. It has not yet closed out a single day or scored a single round.

**Built**

- [`policy/`](policy/README.md) — the mechanism in sixteen files: the week, the
  caps, what makes a claim safe to write, the artifact voice, the calendar
  contract, the rubric, how a round is conducted, where a question comes from,
  what readiness means
- [`.claude/skills/`](docs/getting-started.md) — seven sessions: `/prep` to see where
  you are, then onboarding, planning, the daily check-in, rounds and stories
- [`templates/`](templates/README.md) — the blank shape of everything the
  system produces
- Two checkers with tests: every link resolves, and nothing personal is in the
  tracked tree. They run on every push, and optionally before every commit.

**Untested** — the check-in, both round sessions and the story session have
never executed. No log has been written, no grade produced. The rubric, the
anchors, the re-grade audit and the readiness ladder are all written and none
of them has run against a real answer.

## Build order

- [x] Scaffolding, permissions, both checkers with tests
- [x] `policy/`
- [x] `templates/` and all seven sessions
- [ ] Run a full week untouched, then compare against what it replaces
- [ ] Collapse the sessions behind one command, if the week says the shape is
      right
- [ ] Voice interviewer, in a separate project, conducting rounds over speech
      and writing a transcript this one grades from

Automation is deliberately deferred. Every session here is a pure function of
files on disk, which is exactly what a scheduler wraps later. Building it the
other way around is harder, and it would have forced the personal half onto a
remote.

## Layout

| In the repo | |
|---|---|
| `policy/` | How the system works. No dates, no proper nouns, no second person. |
| `.claude/skills/` | How a session is invoked. Nothing else. |
| `templates/` | The blank shape of everything the system produces. |
| `tools/` | The two checkers. |
| `docs/` | How to use it, and anything the policy files assume rather than explain. |

| In `instance/`, ignored | |
|---|---|
| `profile/` | Facts, claims, habits, cadence. Written by onboarding. |
| `curriculum/` | One inventory per resource in use. |
| `plans/` `logs/` `performance/` `mocks/` | What gets planned and what happened. |
| `stories/` `deep-dives/` | Interview material. |
| `private/` | The denylist. |
| `intake/` | Resume drop. |

## Running the checks

[Bun](https://bun.sh) is the only prerequisite.

```bash
bun run check        # links, leaks and tests — runs straight from a clone
bun install          # only needed to edit: type definitions and the compiler
bun run typecheck
```

There are no runtime dependencies and there will not be any.

To run the checks before every commit:

```bash
git config core.hooksPath .githooks
```

Hooks are not tracked by git, which is why that takes a config line rather than
arriving with the clone. The workflow in `.github/workflows/` is the actual
gate; the hook is the fast local copy of it.
