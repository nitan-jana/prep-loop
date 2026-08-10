<!-- leak-check: allow-path — names the artifacts it checks for -->

# Catch-up

Nothing in this system runs on a timer. Instead, the first session of a day
notices what should already have happened and recovers the part of it that can
still be recovered.

This runs at the start of **every** session, whichever skill the user invoked.
The first session of a day is often not the check-in — it may be a round, a
story, or a question about something else entirely — so a check that lives
inside the planner and the check-in is a check that gets skipped whenever the
day opens with anything else.

## The three checks

Stat only. Does the file exist, nothing more.

1. **Does the current week have a plan?** `instance/plans/` for this week's
   identifier.
2. **Does every working day up to yesterday have a log?** `instance/logs/`,
   against the working days in `instance/profile/schedule.md`.
3. **Is there a brief for the next review?** `instance/mocks/`.

**No reads, no git, no parsing.** Three existence checks is the entire budget,
and it holds however long the install has been running. Anything that grows
with history belongs behind a miss, not in the detection.

## What happens on a miss

**Only the backfill acts on its own.** A missing log is reconstructed from
commit timestamps and file history, written, and marked `evidence-only` per
[`checkin-protocol.md`](checkin-protocol.md#backfilling-a-missed-day). It needs
no input from the user, it cannot get anything wrong that was not already
unknown, and leaving it undone loses evidence as history moves further away.

**Everything else is reported, not done.** A missing week plan and a missing
brief are both work the user has to be present for. Say so in one line and stop
there.

## The bound

Backfilling is not free. Returning after time away can mean several days of
history to reconstruct, at the start of a session opened to do something else.

So: **backfill a day or two silently, then stop and ask.** Beyond that, report
the gap in one line and wait. A session that spends its first minutes
reconstructing a week nobody asked about is a session the user learns to dread
opening.

## It must not take over the session

One line, then get on with what was asked.

Not a summary of the week. Not a list of everything outstanding. Not a question
about why the plan is missing. The user opened this session to do something,
and catch-up is not that thing.

This is the rule most likely to erode, because each individual addition looks
helpful. The test: after catch-up has spoken, is the user any further from
starting what they came to do.

## No marker file

Nothing records that catch-up has run today. It does not need to — three
existence checks find nothing on the second run and cost the same as they did
on the first.

A marker would be one more piece of state to keep honest, and its only benefit
would be skipping work that is already free.
