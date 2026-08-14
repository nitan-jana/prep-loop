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

One directory listing answers all three. Names only, nothing opened.

    instance/plans/   instance/logs/   instance/mocks/

1. **Does the current week have a plan?** A file named for this week's
   identifier in `instance/plans/`.
2. **Does every working day up to yesterday have a log?** A week plan's own day
   headings are the list of working days, so the plan files found by the first
   check supply the answer to the second. Early in a week the days in question
   belong to the previous plan, which the same listing already returned. With no
   plan covering those days there is nothing to compare against, and the missing
   plan is the finding.
3. **Is there a brief for the next review?** `instance/mocks/`.

**No file reads, no git, no parsing.** One listing is the entire budget, and it
holds however long the install has been running.

The working days come from the plan rather than from the profile deliberately.
Reading a profile file to find out whether anything is missing puts a read on
the path that runs every session, to answer a question the artifact already
being looked for answers for free. Anything that grows with history, or opens
anything, belongs behind a miss rather than in the detection.

## What happens on a miss

**Only the backfill acts on its own.** A missing log is reconstructed from
commit timestamps and file history, written, and marked `evidence-only` per
[`checkin-protocol.md`](checkin-protocol.md#backfilling-a-missed-day). It needs
no input from the user, it cannot get anything wrong that was not already
unknown, and leaving it undone loses evidence as history moves further away.

**Everything else is reported, not done.** A missing week plan and a missing
brief are both work the user has to be present for. Say so in one line and stop
there.

## Silence when there is nothing to say

Nothing missing, nothing said. No "all clear", no note that the check ran, no
summary of what it found and liked.

Most sessions find nothing and most days open more than one session, so a line
confirming the happy path is a line that appears constantly and carries no
information. What it costs is the one occasion something was actually wrong,
reported in the same shape the user has been trained to skim past.

A real gap does repeat across sessions in the same day, since nothing here
records what was already said. That is accepted rather than solved: a gap is
rare, it is one line, and it names something worth doing. The noise problem was
never the misses.

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

Nothing records that catch-up has run today. It does not need to — one listing
finds nothing on the second run and costs what it cost on the first.

A marker would be one more piece of state to keep honest, and it would have to
be kept honest: a stale one skips a real backfill, and one written before the
work finishes skips it permanently. All of that to avoid a cost that is already
a single listing.

**The waste worth removing is speech, not work.** A repeated check costs
essentially nothing. A repeated line costs attention every time, which is the
budget that actually runs out.
