<!-- leak-check: allow-path — this file maps the repo and names every directory by design -->

# prep-loop

An interview prep system that runs inside [Claude Code](https://claude.com/claude-code).
It plans a week ahead, quizzes rather than collecting a self-report, scores mock
rounds against a fixed rubric, and checks the claims on a resume against the
commit history behind them.

## What it does

- **Audits the claims on your resume against your own commit history.** Every
  claim is marked verified, stated or contested, with the command that proved it
  stored alongside.
- **Quizzes you at the end of a day instead of asking how it went.** It reads
  your commits first, then tests what you can reconstruct.
- **Scores mock rounds on three defined grades**, keeps the quoted answer next to
  each one, and re-grades old answers blind each month to catch itself going
  soft.
- **Tells you when to stop preparing and start applying**, from actual scores
  rather than how ready you feel.
- **Turns experiences into stories with the follow-ups aimed at their weak
  points**, and shows you which question shapes you have nothing for.
- **Never coaches mid-round.** One hint destroys the only clean sample of what
  you can do alone.
- **Plans your week onto your calendar in one turn**, carried-over work first,
  under a cap on new material and a cap on applications.
- **Rebuilds a day you missed** from timestamps, and marks the part it cannot
  know as unknown rather than inventing it.
- **Never turns your notes into a record of what you failed to do.** No
  displacement history anywhere. A slipped item is just carried forward.

## Private by design

- **Your data never leaves your machine.** It lives in `instance/`, a gitignored
  folder with no remote. There is nowhere to push it.
- **A leak checker blocks the commit** if a name, a date or a personal path
  reaches the shared half. A per-install canary catches a whole file crossing the
  line.
- **You name what it may never read.** Employer code, client work, an
  unannounced product. Asked once, honoured forever.
- **Nothing paywalled is redistributed**, and no session commits anything. You
  read the diff.

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

- [`policy/`](policy/README.md) — the mechanism in seventeen files: the week, the
  caps, what makes a claim safe to write, the artifact voice, the calendar
  contract, the rubric, how a round is conducted, where a question comes from,
  what has to be true before an application goes out, what readiness means
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

## Roadmap

- [x] **Guardrails** — two checkers, thirty-one tests, CI on every push
- [x] **The generic system** — seventeen policy files, no personal data by
      construction
- [x] **Templates and all seven sessions**
- [ ] **A full week run untouched**, then compared against the system it replaces
- [ ] **Voice rounds**, over speech in a separate project, with only the round
      brief leaving your machine and the grading staying on it
- [ ] **Optional local scheduling**, for the plan waiting before you sit down
- [ ] **One command instead of seven**, if a full week says the shape is right
- [ ] **A hosted tier** for the things a laptop cannot do:
    - works without Claude Code, or any coding CLI at all
    - setup is a signup, with resume, code host and calendar connected once
    - a real interface instead of a terminal
    - your prep on every device, not just the machine you cloned onto
    - runs with the laptop closed: scheduling, reminders, calendar sync, and a brief prepared before the session rather than during it
    - catalogs maintained centrally, instead of every install re-scraping the same sites and rediscovering the same breakages
    - peer rounds, with a human on the other side
    - a rubric calibrated across many people's scored answers, rather than one person re-grading themselves
    - the deterministic work done in code rather than by a model: faster, cheaper, and the same result every time
    - lower cost per session, because each task gets a model sized for it instead of a frontier model parsing HTML
    - it notices when you stop
    - which questions actually get asked, and which sources are worth adding, pooled across everyone instead of learned alone

**The local version stays complete on its own.** Anything hosted is added
capability, never a piece carved out of what is here. If that ever stops being
true, the reason for building it this way has gone.

Automation is deliberately last. Every session here is a pure function of files
on disk, which is exactly what a scheduler wraps later. Building it the other way
around is harder, and it would have forced the personal half onto a remote.

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
