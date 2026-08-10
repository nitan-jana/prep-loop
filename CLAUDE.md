<!-- leak-check: allow-path — this file maps the repo and names every directory by design -->

# prep-loop

An interview prep system built on four mechanisms: a plan written ahead of each
week, named work blocks on a rotation, a check-in that quizzes rather than
collects a self-report, and a mock loop scored against a fixed rubric.

How often any of that happens belongs to the user, not to the system. How many
blocks, how long, which days carry which work, when the loop runs, what timezone
— every one of those is read from `instance/profile/`. **Policy describes the
mechanism; profile supplies the parameters.**

## Running the checks

[Bun](https://bun.sh) is the only prerequisite.

```
bun run check        # links, leaks and tests — needs no install
bun install          # only to edit: type definitions and the compiler
bun run typecheck
```

**No runtime dependencies, ever.** `tools/` uses Bun's built-ins alone, so the
checks run straight from a clone. A check that fails to start is a check that
gets skipped.

`devDependencies` are a different thing — types and the compiler, used by an
editor and by `typecheck`, never on any execution path. Those are fine. A
*runtime* dependency is not: if one ever looks necessary, that is a reason to
reconsider the design rather than to install it.

## Resolution order

1. [`policy/`](policy/README.md) — how the system works. Generic. The same for
   every user.
2. `instance/profile/` — who this install belongs to. Facts, dates, claims, habits.
3. `instance/curriculum/` — inventories of outside material, so a question can
   be named rather than remembered.
4. Skills — how a session is invoked. Nothing else.

**Point, never paraphrase.** A skill may link a policy file, or override it with
a stated reason. It may not restate it. Two copies of a rule is one rule and one
future bug. If a file appears to contradict something it links, the linked file
wins and the linking file is the defect.

**No section numbers.** Cite a file, or a heading anchor. A relative link is
machine-checkable; a section number is a string only a human can check.
[`tools/check-links.ts`](tools/check-links.ts) fails the run on either problem.

## The line

| This repo, public | `instance/`, ignored by git |
|---|---|
| `policy/` `.claude/` `templates/` `tools/` `docs/` | `profile/` `curriculum/` `plans/` `logs/` `performance/` `mocks/` `stories/` `deep-dives/` `private/` `intake/` |

**One line in `.gitignore` is the privacy model.** There is no state of this
repo in which a personal file is tracked, and no remote for `instance/` to be
pushed to. Nothing has to be remembered at commit time.

[`tools/leak-check.ts`](tools/leak-check.ts) covers the rest: a tracked file
that stays put but quotes something out of the folder. The gitignore keeps files
apart; the checker keeps contents apart.

**Nothing personal is hand-written into this repo. It comes from `/onboard`.**
A file that needs a fact about the user reads `instance/profile/`; it never
embeds one. That includes the things that don't look personal: the denylist
terms, the canary token, the calendar server id, session times and timezones.

The test is not "does this contain a name or a date" — that is only what
leak-check can mechanically catch. The test is **would this be true for a user
who isn't this one.** A six-block day, a weekend loop, a named framework and an
early-morning session all pass the first test and fail the second.

## At the start of every session

Run the catch-up in [`policy/catch-up.md`](policy/catch-up.md) before doing what
was asked. Three file existence checks: does this week have a plan, does every
day up to yesterday have a log, is there a brief for the next review.

Backfill a missing log and say so in one line. Report anything else and stop.
**Then get on with the actual request** — catch-up is not what the session is
for, and a catch-up that takes over is one the user learns to dread.

It lives here rather than in each skill's required reading because the first
session of a day is often not the check-in, and a check that only fires for one
skill is a check that gets skipped.

## Forbidden

- **Never write outside `instance/` during a session.** Skills produce
  artifacts, never policy, never templates, never their own instructions. A
  session that can edit the rules it runs under cannot be reviewed against
  anything.
- **Never seed this system from another prep system's artifacts.** A system that
  has read them reproduces their shape, and any comparison against them then
  measures nothing.

## Writing artifacts

Three rules govern anything the user reads daily — week plans, logs, calendar
event descriptions. **Minimal**, **instructions never completion state**, and
**no history**. They are stated in full, with what each rules out, in
[`policy/artifact-voice.md`](policy/artifact-voice.md).

Named here rather than explained here: this file is loaded into every session
and a policy file is not, so the names have to be in reach. The bodies stay in
one place.

## Commits

Only this repo is versioned. `instance/` is a plain folder with no git in it.

Subject line only, `type: summary`, matching the existing log. No body. No
`Co-Authored-By` trailer.

**Skills write files and stop. The user commits.**
