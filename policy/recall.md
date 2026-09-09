# The recall session

Working days given over entirely to retrieval. No new material, no block
subjects, no progress through a source — only questions about material already
worked, whether or not anything has asked about it before.

How often it comes round and which days it takes are read from
`instance/profile/schedule.md`. This file says what those days are for.

## Why it is a day and not a round

What is due grows faster than any single round drains it.

Every block names more entries than the check-in that closes it can ask about,
so each working day adds to a queue that only ever leaves by being asked — and
an entry asked once and graded rejoins it later, from the other end. A drain
that runs for the minutes a review has left over is smaller than the leak, and
the difference compounds: the queue is not a backlog being worked off, it is a
level that rises.

Sizing the drain in days rather than in rounds is the only thing that changes
that. It costs blocks that would otherwise carry new material, which is the
right trade — coverage is the thing this system has least trouble producing.

## It reads the whole list, and works down it

The pool is every entry in `instance/prep.db` that has been worked and is
now past the recall edge, ordered by
[`mock-sourcing.md`](mock-sourcing.md#the-retention-pick) — a known gap first,
then what was never asked, then a decay test on what held.

**It does not stop at the first eligible entry.** Every other reader of that
list takes one and moves on, because every other reader has room for one. This
session has a day, so the order is a priority for working down rather than a
filter for choosing between. That difference is the entire reason the list does
not need splitting.

**It is the only reader that is not scoped to a round type.** A loop picks a
type first and asks inside it, so material belonging to no tracked type is
reachable here and nowhere else.

That is about distance, not about coverage. Such a subject is already asked
twice before it gets here — by the check-in on the day its block runs, and by
[the loop's week round](mocks.md#the-week-round) days later, over what the
check-in did not reach. Neither can ask at a remove: one closes the day it is
inside, per [`checkin-protocol.md`](checkin-protocol.md#today-only), and the
other is scoped to the week just worked.

This session is the third distance and the only one where forgetting has had
time to happen. Without it a subject with a daily block and no rung would be
tested often, promptly, and never once far enough out for the answer to mean
anything.

**Oldest eligible first inside each row.** The session does not divide history
into stretches and sweep them in turn — it takes the head of the queue and keeps
going until the window ends. What is not reached stays queued for the next one,
which is why the cycle needs no alignment with anything the entries were worked
in.

**Nothing else drains the never-asked row.** Rescheduling such an entry as a
block re-reads a topic from the start, which
[`readiness.md`](readiness.md#regression) names as the wrong response to a gap.
The planner therefore skips that row, and this session is where it goes.

### Its lower edge is its own

An entry is eligible once enough time has passed since it was worked. That edge
is a separate profile fact from the one in
[`mock-sourcing.md`](mock-sourcing.md#do-not-repeat-inside-the-window), and it is
the wider of the two.

The repeat edge exists because a question already asked is contaminated by the
round that asked it. This one exists for a different reason and applies whether
or not anything was asked: an entry worked days ago is still in short-term
memory, so testing it measures the block rather than the retention. An entry
never asked has nothing contaminating it and is still too close to be worth a
question.

Both edges apply, and an entry has to clear both. The repeat edge is the one
that matters for a row already graded; this one is the only thing standing in
front of a row that never was.

## Interleaved, never blocked

**The session does not group its questions by subject.** Consecutive entries
come from different tracks, and a block window on a recall day carries no
subject of its own — which is a deliberate departure from
[`cadence.md`](cadence.md#the-block), where a block is a commitment to one
subject.

Grouping inflates the result. After two questions of a kind the answer no longer
requires retrieving *which* approach applies, only executing one already in
hand, and selection is most of what an interview tests — it never announces
which kind of question is coming. A grouped session produces better answers and
worse retention, and it is the better answers that make the failure hard to
notice.

One consequence for reading the grades: an interleaved session scores lower than
a grouped one would on the same material. That is the instrument working, not a
regression, and a dip across a recall session is not by itself evidence that
anything slipped.

## It writes its own record

The session writes a scored record at the path in
[`repo-map.md`](repo-map.md#artifact-names), and the coverage columns on every
entry it asked about, per
[`mock-sourcing.md`](mock-sourcing.md#what-the-inventory-records).

**A recall day gets no daily log.** Its record already holds what a log would —
what ran, what was asked, what was graded, in the user's quoted words — and a
log beside it would be the same day written twice.
[`checkin-protocol.md`](checkin-protocol.md#backfilling-a-missed-day) reads the
record in a log's place, so nothing treats the day as missing.

Grades carry their quoted answers like any other, per
[`grading.md`](grading.md#a-grade-without-the-answer-is-not-a-grade). Each is
graded against the same rubric and the same anchors, because an entry asked here
and an entry asked in a round are the same measurement taken in different rooms.

## It moves no rung

Rungs are per round type and are earned across consecutive reviews, per
[`readiness.md`](readiness.md#it-is-per-round-type). A recall session spans
whatever the queue held, which is every track at once and no round type in
particular, so it grades entries and stops there.

What it produces for the ladder is the same thing every graded answer produces:
an entry with a date and a result on it, which the next review reads as history
rather than as a rung it must reconcile.

## It is a round, and it is conducted like one

[`interviewing.md`](interviewing.md) applies in full — one question then
silence, no hint, no supplying the term, the rubric never mentioned.

**Never hand the questions over as a list.** Several short questions in
sequence is what this session is; several short questions at once lets the user
answer the ones they know and skip the rest, which grades the selection rather
than the recall. It is the failure this session is most exposed to, because the
questions are small enough that batching them looks efficient.

The entries are small — a quiz item, a type challenge, the approach to one
problem — so many of them fit where one deep question would go. That is what
makes the day a drain rather than a gesture.
