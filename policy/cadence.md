<!-- leak-check: allow-path — names the artifact directories the week produces -->

# Cadence

The week is the unit of planning. The day is the unit of record. The block is
the unit of work.

Which days, how many blocks, how long each runs, and which subjects sit in
which block are all read from `profile/schedule.md`. This file says what those
things are for.

## The block

A block is a commitment to one subject for one window. It is not a to-do list
and not a deadline. Finishing early and stopping is a complete block; running
over into the next one is two damaged blocks.

Each block has a short stable label and a subject — the label is how it appears
on the calendar and in a log, so it stays the same from week to week even as
the subject inside it moves. A rotation assigns subjects to labels across the
week so that no subject goes a full week untouched.

**A block is scheduled, not stacked.** Two subjects in one block means one of
them was not really planned.

**A block that consistently loses to the block after it is a schedule fact.**
The planner reads that from the logs and moves it, rather than the user being
asked to try harder next week.

## The three recurring sessions

Named by role, not by day. Which day each falls on is a profile fact.

**The planning session** opens the week. It writes the week plan and mirrors it
to the calendar in the same turn. It schedules carried-forward items before it
schedules anything new. See [`caps.md`](caps.md) for what it may not exceed.

**The check-in** closes a working day. It gathers evidence, quizzes what the
day covered, records misses in the user's own words, and reschedules what
slipped. See [`checkin-protocol.md`](checkin-protocol.md).

**The review session** runs the mock loop and scores it. See
[`mocks.md`](mocks.md) and [`grading.md`](grading.md). It ends by handing off to
a check-in, because a review day is still a working day.

## Every working day gets a log

Including the review day. Including a day where almost nothing happened.

A missing log is indistinguishable from a day that was not worked, which
destroys the only signal the planner has. So the log always exists, and it is
always honest about how much of it is known:

- `status: evidence-only` — written unsupervised. What can be proven from
  commits and file changes is filled in; the quiz section is present and
  explicitly empty. This means **unknown**, never *missed*.
- `status: complete` — a check-in has filled in the quiz, the miss reasons and
  the reschedule.

Nothing infers a miss from an absence of evidence. A block with no commits may
have been a reading block.

## Carrying work forward

Unfinished work goes to a `## Deferred` list at the bottom of the week plan, as
a plain instruction. The next planning session schedules from that list first,
before adding anything new.

**The deferred entry says what to do and nothing else.** No column for where it
came from, no note about which week it slipped out of, no count of how many
times it has moved. See [`artifact-voice.md`](artifact-voice.md#no-history) for
why that rule holds everywhere and not only here.

An item that has been deferred repeatedly is not flagged as a failure. It is
evidence that it was mis-scoped or mis-placed, and the planning session either
splits it, moves it to a different block, or drops it.
