---
name: checkin
description: Close out a working day — gather evidence, quiz what stuck, record misses in the user's own words, reschedule what slipped. Use at the end of a working day, or when earlier days are missing a log.
---

<!-- leak-check: allow-path — it writes the day's log into the personal half -->

# checkin

Writes `instance/logs/<date>.md` and moves at most one block on the calendar. It
owns the daily log, per
[`policy/repo-map.md`](../../../policy/repo-map.md#who-writes-what), and nothing
else writes one.

One principle. The rest follows from it.

**It tests; it does not ask how the day went.** A self-report is the least
reliable input available, and this system exists partly to replace it.

## Required reading

Source of truth. Nothing below restates them. If this file appears to
contradict one, the linked file wins and this file is the bug.

- [`policy/checkin-protocol.md`](../../../policy/checkin-protocol.md) — the three parts, in order, and what each one may contain
- [`policy/grading.md`](../../../policy/grading.md) — the three grades and the rule that a grade carries its answer
- [`policy/interviewing.md`](../../../policy/interviewing.md) — the quiz is a short round and runs by the same rules
- [`policy/artifact-voice.md`](../../../policy/artifact-voice.md) — how the log is written
- [`policy/calendar.md`](../../../policy/calendar.md) — the one reschedule this skill may make
- [`policy/cadence.md`](../../../policy/cadence.md) — what a log is for and what its status means

## Order of operations

1. **Backfill first.** Check whether earlier working days are missing a log,
   before touching today. See below.
2. **Gather evidence**, before asking anything.
3. **Quiz**, from what the evidence shows the day covered.
4. **Ask for miss reasons**, and record them verbatim.
5. **Reschedule** what slipped — and actually call the calendar.
6. **Write the log** from [`templates/daily-log.md`](../../../templates/daily-log.md).
7. **Stop.** No commit.

## Evidence before questions

Gather first. Opening with a question the evidence could have answered teaches
the user that the answers are not checked.

Where to look: commits in whatever repositories the day's practice lands in,
files that appeared under `instance/stories/` or `instance/deep-dives/`, and the
timestamps on all of it against the block windows in
`instance/profile/schedule.md`.

**Silence is not a miss.** A reading block leaves no commits. Inferring a miss
from an absence of evidence is how a log becomes a record of failure that is
also wrong.

## The quiz is a round

Short, but a round — so
[`policy/interviewing.md`](../../../policy/interviewing.md) applies in full. One
question then wait. Push at least once. Never supply the term being groped for.
Never mention a grade or what a stronger answer would have contained.

**Keep it to a few items.** A check-in that becomes a full round eats the
evening and then gets skipped, and a skipped check-in costs more than a shallow
one.

Grade against the anchors in `instance/profile/grading-anchors.md`. That file is
empty until there are real graded answers to put in it, and an empty anchor file
is not a reason to skip grading — it is a reason to be careful, and the quoted
answers written now are what fills it later.

## Backfilling

**Check for missing logs before doing anything else**, and reconstruct what can
still be recovered from commit timestamps and file history.

The bound is in [`policy/catch-up.md`](../../../policy/catch-up.md): a day or
two silently, then stop and ask. A session that spends its first minutes
reconstructing a week nobody asked about is one the user learns to dread.

**Leave the quiz section present and explicitly empty** on a backfilled log. Do
not quiz on a day that has passed, and do not ask for a miss reason nobody
remembers accurately.

## The reschedule is a calendar call

Find a free window with `suggest_time`, then **call `create_event` or
`update_event`**, then confirm in one line.

Naming a slot is not a reschedule. This is the step most often left half-done,
and a log saying a block moved while the calendar still shows the old one is
worse than not moving it.

**One block, at most.** A check-in that rebuilds the week is a planning session
wearing the wrong name — that is
[`plan`](../plan/SKILL.md)'s job, and rescheduling everything guarantees an
overloaded tomorrow. Anything else goes to the week plan's `## Deferred` list or
is dropped, and both are fine.

## Forbidden

Named here so they are in reach while the log is being written. The reason for
each is in the linked file.

- **Never write outside `instance/`.**
- **Never ask how the day went** —
  [`checkin-protocol.md`](../../../policy/checkin-protocol.md#it-quizzes-it-does-not-collect-a-report).
- **Never editorialise a miss reason**, summarise it into a category, or compare
  it to a previous one —
  [`checkin-protocol.md`](../../../policy/checkin-protocol.md#misses).
- **Never record a grade without its quoted answer** —
  [`grading.md`](../../../policy/grading.md#a-grade-without-the-answer-is-not-a-grade).
- **Never fabricate the missing half of a backfilled log** —
  [`checkin-protocol.md`](../../../policy/checkin-protocol.md#backfilling-a-missed-day).
- **Never infer a miss from silence** —
  [`checkin-protocol.md`](../../../policy/checkin-protocol.md#evidence-first-before-any-question).

## Done when

- `instance/logs/<date>.md` exists, with a status that matches what is actually known
- Every grade in it carries the answer that produced it, quoted
- Every miss reason is in the user's own words
- Anything rescheduled is on the calendar, not just named
- `bun run check` is clean

**Write the files and stop** — the user reads the folder.
