# plan

Writes `instance/plans/<week>.md` and puts that same week on the calendar. It
owns both, per [`policy/repo-map.md`](../policy/repo-map.md#who-writes-what),
and nothing else writes either.

**A plan is a set of instructions for sessions that have not happened yet.** Not
a record, not a summary, not an account of what slipped. A planner that starts
describing the past has started writing the log's file.

## Required reading

The linked file wins; nothing here restates one.

- [`policy/cadence.md`](../policy/cadence.md) — what a week is, what a block is, how work carries forward
- [`policy/caps.md`](../policy/caps.md) — the two ceilings a plan may not exceed
- [`policy/calendar.md`](../policy/calendar.md) — the mirror rule, one event per block, which tool per operation
- [`policy/artifact-voice.md`](../policy/artifact-voice.md) — how every line of the plan and every event description is written
- [`policy/mock-sourcing.md`](../policy/mock-sourcing.md) — where a named question may come from, and what to do with no history yet
- [`policy/readiness.md`](../policy/readiness.md) — what the grades mean when they decide priority
- [`policy/repo-map.md`](../policy/repo-map.md) — the path to write, and that this command writes and stops

## What it reads

Nothing personal is decided here. All of it is read.

| Source | Supplies |
|---|---|
| `instance/profile/schedule.yaml` | Working days, block labels and windows, the rotation, the recurring sessions, the recall cycle, the timezone, both cap values, the content weights, the retention edges |
| `instance/profile/schedule.md` | Why any of those is what it is, and what a block is currently parked behind. Not a planning input |
| `instance/profile/state.md` | Readiness rungs, the sourcing phase, what is paused and what unpauses it |
| `instance/prep.db` | The entries a block may name |
| The previous week's plan | Its `## Deferred` list, which is scheduled before anything new |
| `instance/logs/` | What actually ran, which is how a block that keeps losing gets moved rather than repeated |
| `instance/performance/` | Grades, when there are any. Weakest round type first |

**Read the schedule rather than assuming a shape.** How many blocks, how long,
which days, what usually sits where, when the recurring sessions run — every one
of those is a profile fact and none of them is the same for two installs.

## Order of operations

1. **Reach the calendar first.** One read — the calendar list, or the window
   about to be planned; whichever the runtime's calendar makes cheapest. If it
   is not reachable, **write nothing at all**, not even the file, say so in a
   line, and stop. This is first because it is the only failure that has to
   abort the session, and finding it after the file is written is finding it
   too late —
   [`calendar.md`](../policy/calendar.md#mirror-in-the-same-turn).
2. **Resolve the week identifier.** ISO week-numbered, per
   [`repo-map.md`](../policy/repo-map.md#artifact-names):
   `date -d <a date in the week> +%G-W%V`. Derive it; do not count weeks by hand.
3. **Read `schedule.yaml`** into a grid of working days by block labels.
4. **Drop windows that have already passed.** See below.
5. **Place the deferred list first**, from the previous week's plan.
6. **Fill what is left** from the rotation. Details in
   [`references/the-week-grid.md`](plan/references/the-week-grid.md).
7. **Check both caps, per day**, and move the overflow to `## Deferred` rather
   than dropping it.
8. **Name the week's one thing**, in one imperative line — the item that is
   still done if everything else slips. Without it a five-day plan is five
   equally weighted days with no signal about which one matters when the week
   goes badly.
9. **Write the file** from [`templates/week-plan.md`](../templates/week-plan.md).
10. **Mirror the whole week to the calendar**, one event per block, in this same
    turn.
11. **Stop.** No commit.

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
check-in handles those on request. See
[`policy/checkin-protocol.md`](../policy/checkin-protocol.md#backfilling-a-missed-day).

## Forbidden

- **Never write outside `instance/`.** Not policy, not templates, not this file.
- **Never name a question that is not in an inventory.** This command is where it
  is most easily broken — a block description wants a task and a link, and
  inventing a plausible one is a keystroke away. Every named entry is *copied*
  out of `instance/prep.db` with its link; where no inventory covers what a
  block needs, the block says what to do in plain words and names nothing —
  [`mock-sourcing.md`](../policy/mock-sourcing.md#never-invent-a-question-name).
- **Never write completion state**, into the plan or onto an event —
  [`artifact-voice.md`](../policy/artifact-voice.md#instructions-never-completion-state).
- **Never write history**, including where a deferred item came from —
  [`artifact-voice.md`](../policy/artifact-voice.md#no-history).
- **Never schedule over a cap.** The overflow defers —
  [`caps.md`](../policy/caps.md#a-cap-binds-the-plan-not-the-person).
- **Never put two subjects in one block** —
  [`cadence.md`](../policy/cadence.md#the-block).
- **Never delete and recreate a block that moved.** It is an update —
  [`calendar.md`](../policy/calendar.md#tool-per-operation).
- **Never ask the user to self-assess** to fill a gap in the grades. Readiness
  is evidence — [`readiness.md`](../policy/readiness.md#readiness-is-evidence-not-a-feeling).

## Done when

- `instance/plans/<week>.md` exists and every line of it is an instruction
- Every block in it is on the calendar, one event per block, for the same week
- Every named entry resolves to a row in `instance/prep.db`
- Neither cap is exceeded on any day, and what did not fit is in `## Deferred`
- `bun run check` is clean

Then say what was planned in a line or two, and what deferred. **Write the files
and stop** — the user reads the folder.
