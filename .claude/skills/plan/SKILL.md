---
name: plan
description: Write the week plan and mirror the same week to the calendar in one turn. Use when a week has no plan, when the planning session runs, or when a plan needs rebuilding after the schedule changes.
---

<!-- leak-check: allow-path — it writes the week plan into the personal half -->

# plan

Writes `instance/plans/<week>.md` and puts that same week on the calendar. It
owns both, per [`policy/repo-map.md`](../../../policy/repo-map.md#who-writes-what),
and nothing else writes either.

One principle. Everything else follows from it.

**A plan is a set of instructions for sessions that have not happened yet.**
Not a record, not a summary, not an account of what slipped. A planner that
starts describing the past has started writing the log's file.

## Required reading

Source of truth. Nothing below restates them. If this file appears to
contradict one, the linked file wins and this file is the bug.

- [`policy/cadence.md`](../../../policy/cadence.md) — what a week is, what a block is, how work carries forward
- [`policy/caps.md`](../../../policy/caps.md) — the two ceilings a plan may not exceed
- [`policy/calendar.md`](../../../policy/calendar.md) — the mirror rule, one event per block, which tool per operation
- [`policy/artifact-voice.md`](../../../policy/artifact-voice.md) — how every line of the plan and every event description is written
- [`policy/mock-sourcing.md`](../../../policy/mock-sourcing.md) — where a named question may come from
- [`policy/readiness.md`](../../../policy/readiness.md) — what the grades mean when they decide priority
- [`policy/repo-map.md`](../../../policy/repo-map.md) — the path to write, and that this skill writes and stops

## The calendar comes first

**Confirm the calendar is reachable before reading anything else.** One call is
enough — `list_calendars`, or a read against the window about to be planned.

If it is not reachable, **write nothing at all**, say so in a line, and stop.
Not the file either. [`policy/calendar.md`](../../../policy/calendar.md#mirror-in-the-same-turn)
gives the reason: a repo and a calendar that disagree are worse than neither
being written, because there is no way to tell which one is stale.

This check is first because it is the only failure that has to abort the whole
session, and discovering it after the file is written means discovering it too
late.

## What it reads

Nothing personal is decided here. All of it is read.

| Source | Supplies |
|---|---|
| `instance/profile/schedule.md` | Working days, block labels and windows, the rotation, the three sessions, the timezone, both cap values |
| `instance/profile/state.md` | Readiness rungs, the sourcing phase, what is paused and what unpauses it |
| `instance/curriculum/` | The entries a block may name — see the sourcing rule below |
| The previous week's plan | Its `## Deferred` list, which is scheduled before anything new |
| `instance/logs/` | What actually ran, which is how a block that keeps losing gets moved rather than repeated |
| `instance/performance/` | Grades, when there are any. Weakest round type first |

**Read the schedule rather than assuming a shape.** How many blocks, how long,
which days, what usually sits where, when the recurring sessions run — every one
of those is a profile fact and none of them is the same for two installs.

## Order of operations

1. **Reach the calendar.** Above. Abort if it is not there.
2. **Resolve the week identifier.** ISO week-numbered, per
   [`policy/repo-map.md`](../../../policy/repo-map.md#artifact-names):
   `date -d <a date in the week> +%G-W%V`. Derive it; do not count weeks by hand.
3. **Read the schedule** into a grid of working days by block labels.
4. **Drop windows that have already passed.** A block cannot be instructed
   retroactively. See below.
5. **Place the deferred list first**, from the previous week's plan.
6. **Fill what is left** from the rotation. Details in
   [`references/the-week-grid.md`](references/the-week-grid.md).
7. **Check both caps, per day**, and move the overflow to `## Deferred` rather
   than dropping it.
8. **Name the week's one thing**, in one imperative line, from what the rest of
   the week depends on. The item that is still done if everything else slips.
   Without it a five-day plan is five equally weighted days with no signal about
   which one matters when the week goes badly.
9. **Write the file** from [`templates/week-plan.md`](../../../templates/week-plan.md).
10. **Mirror the whole week to the calendar**, one event per block, in this same
    turn.
11. **Stop.** The user reads the folder. No commit — `instance/` is not tracked.

## A partial week is a plan

A week planned after it has begun does not get backfilled. Blocks whose windows
have passed are not written to the file and not created on the calendar, because
an instruction for a session that cannot happen is noise in a file read every
day, and a calendar entry in the past is worse.

**Say which day the plan starts from, in one line, and carry on.** Do not ask
whether to backfill, do not offer to reconstruct the missed part, and do not
note the omission inside the plan — a plan that opens by accounting for what it
skipped is the history rule broken on line one.

What happened in the passed part of the week belongs to the logs, and the
check-in backfills those. See [`policy/catch-up.md`](../../../policy/catch-up.md).

## Never name a question that is not in an inventory

The hard rule of the system, stated in
[`policy/mock-sourcing.md`](../../../policy/mock-sourcing.md#never-invent-a-question-name),
and this skill is where it is most easily broken — a block description wants a
task and a link, and inventing a plausible one is a keystroke away.

**Every named entry is copied out of a file under `instance/curriculum/`,
along with its link.** Not recalled, not reconstructed from a title, not
assembled from a known URL pattern. An inventory that carries links carries them
so this step is a copy rather than a guess.

Where no inventory covers what a block needs, the block says what to do in
plain words and names nothing.

## Cold start

A first plan has no previous week, no logs and no grades. That is the normal
state for a new install and is not a gap to work around.

With nothing to be weakest, rotate through the round types or take a stated
preference — [`policy/mock-sourcing.md`](../../../policy/mock-sourcing.md#choosing-the-round-type)
covers it. Do not ask the user to self-assess to fill the gap; readiness is
evidence and there is not any yet.

## Forbidden

Named here so they are in reach while the grid is being filled. The reason for
each is in the linked file, and stays there.

- **Never write outside `instance/`.** Not policy, not templates, not this file.
- **Never write completion state**, into the plan or onto an event —
  [`artifact-voice.md`](../../../policy/artifact-voice.md#instructions-never-completion-state).
- **Never write history**, including where a deferred item came from —
  [`artifact-voice.md`](../../../policy/artifact-voice.md#no-history).
- **Never schedule over a cap.** The overflow defers —
  [`caps.md`](../../../policy/caps.md#a-cap-binds-the-plan-not-the-person).
- **Never put two subjects in one block** —
  [`cadence.md`](../../../policy/cadence.md#the-block).
- **Never delete and recreate a block that moved.** It is an update —
  [`calendar.md`](../../../policy/calendar.md#tool-per-operation).

## Done when

- `instance/plans/<week>.md` exists and every line of it is an instruction
- Every block in it is on the calendar, one event per block, for the same week
- Every named entry resolves to a row in a file under `instance/curriculum/`
- Neither cap is exceeded on any day, and what did not fit is in `## Deferred`
- `bun run check` is clean

Then say what was planned in a line or two, and what deferred. **Write the files
and stop** — the user reads the folder.
