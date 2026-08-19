<!-- leak-check: allow-path — names the personal files the grid is filled from -->

# Filling the grid

What goes in each block, once the shape has been read out of
`instance/profile/schedule.md`. The rules in the skill file apply throughout and
are not repeated here.

## Deferred first, always

The previous week's `## Deferred` list is placed before anything new is
considered, per [`policy/cadence.md`](../../../../policy/cadence.md#carrying-work-forward).

**An item that has deferred repeatedly is evidence, not a failure.** It was
mis-scoped or mis-placed. Split it, move it to a different block, or drop it —
those are the three honest responses, and carrying it a fourth time unchanged is
none of them.

Nothing in the plan says an item was deferred. It appears as an instruction in
the block it now sits in, and that is all.

## What decides a subject

In order. Stop at the first that applies.

1. **A stated request.** An explicit ask always wins.
2. **A regression.** A round type that held a rung and slipped outranks one
   never covered — [`policy/readiness.md`](../../../../policy/readiness.md#regression)
   gives the reason, and the drill is the specific answers named in the review
   file rather than the topic from the start.
3. **The weakest grades.** From `instance/performance/`.
4. **The rotation.** The usual subject for that block on that day.

**The rotation is a shape, not a rule.** It exists so no subject goes a full
week untouched. Where the first three reasons point elsewhere, the rotation
gives way and the plan does not explain itself for doing so.

## Retention before novelty

A question already worked beats a new one, per
[`policy/mock-sourcing.md`](../../../../policy/mock-sourcing.md#retention-before-novelty).
The `Last worked`, `Last asked` and `Grade` columns in each inventory are what
make this possible, and they are why those columns exist.

Both edges of the window are profile facts. Too recent tests nothing; too old
tests nothing either.

**The planner reads two of the three rows** in
[the retention pick](../../../../policy/mock-sourcing.md#the-retention-pick):
an entry graded below `solid`, and one graded `solid` long enough ago to be
worth re-working. The middle row — worked but never asked — is not a planning
input. That entry does not need studying again; it needs a question put to it,
and the loop is what does that.

Scheduling it into a block instead re-reads a topic from the start, which
[`policy/readiness.md`](../../../../policy/readiness.md#regression) names as the
wrong response to a gap.

**A block full of new material every day is a planning bug**, not an ambitious
week. It produces recognition, and recognition does not survive a round.

## The caps, arithmetically

Both values are in `instance/profile/schedule.md`. The mechanism is
[`policy/caps.md`](../../../../policy/caps.md).

**Content is counted across the whole day, not per block.** Walk each planned
day once, total the weighted new material in it, and compare against the
ceiling. A day with a large item in two blocks is over, however reasonable each
block looked on its own.

**Practice does not count.** Problems, drills, redoing covered material, writing
a story, running a round. Only genuinely new intake spends the allowance, which
in most weeks means one block spends it and the rest are free.

**Outbound is counted in actions, not in minutes.** One action is one, whatever
form it takes. Following up, researching and replying are not actions.

Overflow defers. It does not compress into a fuller day, and it is not dropped.

## Blocks that keep losing

A block that consistently gives way to the one after it is a schedule fact, per
[`policy/cadence.md`](../../../../policy/cadence.md#the-block). The planner reads
that from the logs and moves it.

**Move it rather than reinstating it.** Scheduling the same block into the same
losing window a fourth time asks the user to try harder, which is not a
mechanism. Changing the window, the length or the subject is.

Where the fix is to the schedule itself rather than to one week, that is a
profile change and belongs to onboarding. Say so and leave it; this skill does
not write `instance/profile/`.

## The three recurring sessions

Planning, the check-in and the review are on the calendar like any block, at the
windows `instance/profile/schedule.md` gives them. They are part of the week the
planner writes, not something outside it.

The review day is a working day and gets a log like any other, per
[`policy/cadence.md`](../../../../policy/cadence.md#every-working-day-gets-a-log).

## Writing an event description

Eight short lines is the ceiling, and most blocks need three:
[`policy/artifact-voice.md`](../../../../policy/artifact-voice.md#minimal) states
what a block description is — the task, the link, and what to skip.

The title is the block label and the subject with a middle dot between them, per
[`policy/calendar.md`](../../../../policy/calendar.md#one-event-per-block). The
stable label leads so a week reads as a rotation at a glance.

Every link is written as a labelled anchor, per
[`policy/calendar.md`](../../../../policy/calendar.md#a-link-is-a-label-not-an-address).
That is what keeps a block naming several entries inside the ceiling, so a
description over it is a scoping problem rather than a link one.

**A description that needs more than the ceiling is a mis-scoped block**, not a
description problem. Split the work or narrow it.

## Confirm the mirror, do not describe it

The last step is calling the calendar, not reporting what would be called.
Naming a window and telling the user it has been scheduled, without a write, is
the failure [`policy/calendar.md`](../../../../policy/calendar.md#who-may-write)
names as the one most often left half-done.

Create or update every event, then confirm in one line.
