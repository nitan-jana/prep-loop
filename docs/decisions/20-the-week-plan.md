<!-- leak-check: allow-path — names the plan file and the deferred list it carries -->

# A plan is instructions for sessions that have not happened

Not a record, not a summary, not an account of what slipped. A planner that
starts describing the past has started writing the log's file.

## Deferred first, always

The previous week's deferred list is placed before anything new is considered.
Overflow from a cap goes there rather than being dropped, and the next planning
session schedules from it first.

**An item deferred repeatedly is evidence, not a failure.** It was mis-scoped or
mis-placed, so it gets split, moved to a different block, or dropped — and
carrying it a fourth time unchanged is none of those three.

Nothing in the plan says an item was deferred. It appears as an instruction in
the block it now sits in, and that is all.

## A partial week is a plan

A week planned after it has begun does not get backfilled. Blocks whose windows
have passed are not written to the file and not created on the calendar: an
instruction for a session that cannot happen is noise in a file read every day,
and a calendar entry in the past is worse.

The session says which day the plan starts from, in one line, and carries on. It
does not ask whether to backfill, does not offer to reconstruct the missed part,
and does not note the omission inside the plan — **a plan that opens by
accounting for what it skipped is the history rule broken on line one.**

What happened in the passed part of the week belongs to the logs, and the
check-in backfills those.

## A block that keeps losing is a schedule fact

Read from the logs and moved, rather than the user being asked to try harder
next week. Scheduling the same block into the same losing window a fourth time
is not a mechanism; changing the window, the length or the subject is.

Where the fix is to the schedule itself rather than to one week, that is a
profile change and belongs to onboarding — so the planner says so and leaves it,
because it does not write the profile.

## Every week names one thing

A single imperative line naming what has to survive a bad week: the item that,
if everything else slips, is still done.

Without it a five-day plan is five equally weighted days with no signal about
which one matters when the week goes badly. It passes the artifact rules because
it instructs rather than explains, and it is picked from what the rest of the
week depends on — a framework the design blocks sit on top of, a story the
behavioural round cannot run without.

## The rotation is a shape, not a rule

It exists so no subject goes a full week untouched. An explicit request, a
regression, and the weakest grades all outrank it, and the plan does not explain
itself for departing from it.

## Where it lives

- [`.claude/skills/plan/SKILL.md`](../../.claude/skills/plan/SKILL.md) — the order of operations
- [`.claude/skills/plan/references/the-week-grid.md`](../../.claude/skills/plan/references/the-week-grid.md) — what decides a subject, and the caps arithmetically
- [`policy/cadence.md`](../../policy/cadence.md) — the block, and carrying work forward
- [`templates/week-plan.md`](../../templates/week-plan.md) — the shape, and the one thing

*In the history:* `5b19a0c` `ff55d76` `9d58d1b` `c7bc2bc` `afd70f2`
