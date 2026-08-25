<!-- leak-check: allow-path — names the artifact directories the catch-up lists -->

# Nothing runs on a timer

The first session of a day notices what should already have happened and
recovers the part of it that can still be recovered. There is no scheduler, no
cron, and no unsupervised run.

## What it replaced

The original design had a `runbooks/` directory — one file per scheduled
routine holding its complete logic, so that a cron job could be a six-line
bootstrap pointing at the repo. Three routines were specified in the repo map:
a weekly planner, a daily check-in writing the evidence half of each log, and a
brief writer running ahead of the review. Each would branch, commit and open a
pull request, because nobody was watching and the pull request was the review
surface.

All of it was deleted. The routines became skills the user invokes, and the
scheduler became a check that every session runs first.

## Why

**A remote.** Unsupervised routines have to run somewhere, which means the
personal half has to be reachable from that somewhere. That is directly opposed
to [the folder having no remote at all](01-one-line-is-the-privacy-model.md), and
the privacy model is the more valuable of the two.

**Order of construction.** Every session here is a pure function of files on
disk, which is exactly what a scheduler wraps later. Building the scheduler
first and the sessions inside it is harder and locks in the remote.

**What is actually recoverable.** Evidence is retroactive and recall is not.
Commits carry timestamps, so a day nobody closed out can be reconstructed later.
The quiz cannot — recall measured three days late measures something else — and
neither can a miss reason, which only the user knows and has by then forgotten.
A nightly routine would only ever have written the half that keeps.

## Where the check lives, and why not in the skills

In `CLAUDE.md`, run at the start of every session whichever skill was invoked.
The first session of a day is often not the check-in — it may be a round, a
story, or a question about something else — so a check living inside the planner
and the check-in is a check that gets skipped whenever the day opens with
anything else.

## What it was cut down to

The first version was three existence checks reading the profile for the list of
working days. It became **one directory listing, opening nothing**: a week
plan's own day headings are the list of working days, so the plan the first
check looks for answers the second for free. Reading a profile file to find out
whether anything is missing puts a read on the path that runs every session, to
answer a question an artifact already answers.

Two rules were added at the same time, both about speech rather than work:

**Silence when nothing is missing.** Most sessions find nothing and most days
open more than one session, so a line confirming the happy path appears
constantly and carries no information. What it costs is the one occasion
something is actually wrong, reported in the shape the user has been trained to
skim past.

**No marker file.** A marker would be state to keep honest — a stale one skips a
real backfill, one written early skips it permanently — to avoid a cost that is
already a single listing. The waste worth removing is speech, not work.

## Where it lives

- [`policy/catch-up.md`](../../policy/catch-up.md) — the checks, the bound on backfilling, and why it must not take over
- [`CLAUDE.md`](../../CLAUDE.md) — where it is invoked from
- [`README.md`](../../README.md) — optional local scheduling, kept on the roadmap and kept last

*In the history:* `0d81003` `e72e519` `203e757` `9cc18cb` `f2dbdce` `152a49b`
