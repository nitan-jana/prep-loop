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

**It tests; it does not ask how the day went.** A self-report is the least
reliable input available, and this system exists partly to replace it.

## Required reading

The linked file wins; nothing here restates one.

- [`policy/checkin-protocol.md`](../../../policy/checkin-protocol.md) — the three parts in order, the quiz, misses, the reschedule, backfilling
- [`policy/grading.md`](../../../policy/grading.md) — the three grades and the rule that a grade carries its answer
- [`policy/interviewing.md`](../../../policy/interviewing.md) — the quiz is a short round and runs by the same rules
- [`policy/artifact-voice.md`](../../../policy/artifact-voice.md) — how the log is written
- [`policy/calendar.md`](../../../policy/calendar.md) — the one reschedule this skill may make
- [`policy/cadence.md`](../../../policy/cadence.md) — what a log is for and what its status means

## Order of operations

1. **Report any gap**, before touching today — an earlier working day with
   neither a log nor a recall record. Name the days and wait;
   [backfill only what the user asks
   for](../../../policy/checkin-protocol.md#backfilling-a-missed-day).
2. **Gather evidence**, before asking anything. Timestamps against the block
   windows in `instance/profile/schedule.md`.
3. **Quiz**, from what the evidence shows the day covered, grading against the
   anchors in `instance/profile/grading-anchors.md`.
4. **Ask for miss reasons**, and record them verbatim.
5. **Reschedule** what slipped — and actually call the calendar.
6. **Write the log** from [`templates/daily-log.md`](../../../templates/daily-log.md).
7. **Record coverage** on the entries the day touched, under
   `instance/curriculum/` — `Last worked` on everything the blocks named,
   `Last asked` and `Grade` only on what the quiz reached.
8. **Stop.** No commit.

## Forbidden

- **Never write outside `instance/`.**
- **Never ask how the day went** —
  [`checkin-protocol.md`](../../../policy/checkin-protocol.md#it-quizzes-it-does-not-collect-a-report).
- **Never infer a miss from silence.** A reading block leaves no commits —
  [`checkin-protocol.md`](../../../policy/checkin-protocol.md#evidence-first-before-any-question).
- **Never editorialise a miss reason**, summarise it into a category, or compare
  it to a previous one —
  [`checkin-protocol.md`](../../../policy/checkin-protocol.md#misses).
- **Never record a grade without its quoted answer** —
  [`grading.md`](../../../policy/grading.md#a-grade-without-the-answer-is-not-a-grade).
- **Never backfill a day unasked**, and never fabricate the missing half of one —
  [`checkin-protocol.md`](../../../policy/checkin-protocol.md#backfilling-a-missed-day).
- **Never source a quiz item from the retention order.** This closes a day it is
  still inside —
  [`checkin-protocol.md`](../../../policy/checkin-protocol.md#today-only).
- **Never reschedule more than one block.** Rebuilding the week is
  [`plan`](../plan/SKILL.md)'s job —
  [`checkin-protocol.md`](../../../policy/checkin-protocol.md#reschedule).
- **Never write an inventory row beyond its three coverage columns** —
  [`repo-map.md`](../../../policy/repo-map.md#who-writes-what).

## Done when

- `instance/logs/<date>.md` exists, with a status that matches what is actually known
- Every earlier working day has a log or a recall record, or the gap was named and left alone
- Every grade in it carries the answer that produced it, quoted
- Every miss reason is in the user's own words
- Anything rescheduled is on the calendar, not just named
- Every entry the day named carries `Last worked`, and only the asked ones carry
  `Last asked` and `Grade`
- `bun run check` is clean

**Write the files and stop** — the user reads the folder.
