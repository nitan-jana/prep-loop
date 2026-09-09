<!-- leak-check: allow-path — names the inventories the queue is built from -->

# The drain is a day, not a round

Everything falling due for a retention question is drained by working days given
over entirely to retrieval, on a cycle. It was previously drained by one round at
the end of the loop, and that round was deleted.

## The round could not keep up, and was built to lose

The retention round was the only thing in the system that surfaced an entry with
`Last worked` filled and `Last asked` empty, and the only one wide enough to ask
about material belonging to no tracked round type. It ran last, its length was
whatever the window had left, and the review was never to be compressed to make
room for it.

Every one of those constraints was right on its own terms — the review is the
loop's most valuable output and the round is its cheapest. Together they made the
sole instrument draining the queue the first thing cut whenever the sitting ran
long.

The arithmetic settles it regardless of scheduling. Each working day's blocks
name more entries than the check-in closing that day can ask about, so the queue
takes on new entries every day and loses them only to this one round. A drain
sized in leftover minutes against an inflow sized in days is not a backlog being
worked off. It is a level that rises.

**Sizing the drain in days is the only thing that changes the sign.** It costs
blocks that would otherwise carry new material, which is the right trade:
coverage is the thing this system has least trouble producing.

It also settles what the session may draw from. A day is long enough to work
down [the retention order](15-worked-is-not-asked.md) rather than stop at the
first eligible entry, so the order stays one list and this session reads all of
it. An attempt to give it only the never-asked row lasted until the first
question of what happens to an entry it grades: outside the round types a loop
rotates through, nothing would ever ask it again.

## The loop kept a round, with a different pool

Deleting the rapid-fire round removed the loop's only wide, many-question slot,
and with it the only pass over a week's material between the evening it was
worked and a recall day a fortnight later. That gap was not the point of the
change and should not have been a consequence of it.

So the slot stayed and its pool changed. The round now covers **the week just
worked**, not the untested backlog — the one round in the system scoped by
calendar rather than by what has fallen due. It is the middle of three
distances, and each measures something the others cannot: hours, days, weeks.

It draws the whole week, including what the check-in already asked. Excluding
those was tried first, on the reasoning that the repeat edge had already put
them out of reach — but that edge protects a retention grade from the round that
last asked the question, and this round measures no retention. Re-asking on the
fourth day what was asked on the first is what an expanding interval is; the
exclusion would have refused the second repetition for having done the first.
The unasked entries go first, which is an ordering and not a filter.

Its yield rule survived the move and is defensible now in a way it was not
before. A round that yields its window is fatal when it is the only drain for an
unbounded backlog, which is what killed the last one. It is affordable when it
is one pass of three over material a recall day will reach regardless — a week
it loses costs a repetition, not the measurement.

## What the cycle is not

**Not a sweep of the weeks since the last one.** The first shape proposed was a
cycle that tested each week's own material, then spent a later week going back
over the weeks before it. That inverts the instrument twice over. Material from
the week being tested is inside the lower edge, so a same-week question grades
short-term memory — the check-in already asked it, hours after the block. And a
cycle that only ever looks back a fixed number of weeks caps the ladder: the top
readiness rung is defined on material *not* recently studied, so nothing could
reach it.

**Not a fixed number of days.** A cycle counted in days drifts across the week
and lands on days that are not working days, straddles the week plans the
planner writes one at a time, and needs a stored anchor to count from. A cycle
counted in weeks is derived from the week identifier itself, so there is no
state to drift.

The day count that was reaching for a material window became the window instead
— a lower edge of its own, wider than the one that guards a re-ask, and set for
a different reason. The repeat edge guards against the round that last asked
something. This one guards against the block that last worked it, which is the
only guard a never-asked entry has at all.

So the queue is not partitioned into stretches at all. It is drained
oldest-first for as long as the session lasts, and what is not reached stays
queued. That is why the cycle needs no alignment with anything.

## Interleaved, and that is most of the point

The questions are not grouped by track. After two of a kind the answer stops
requiring the retrieval of *which* approach applies and only requires executing
one already in hand — and selection is most of what an interview tests, since it
never announces what kind of question is coming.

The failure is hard to see from either side, because grouping produces visibly
better answers. It produces worse retention at the same time, which is the half
nobody watches.

One consequence had to be written down rather than left to be rediscovered: an
interleaved session scores lower than a grouped one on the same material, so a
dip across a recall day is the instrument working and not a regression.

Sorting the queue by age alone reproduces the grouping for free, since entries
worked in the same block share an age and a track. The rule is therefore stated
against the outcome, not the sort.

## It writes a record and no log

A recall day produces a scored record and no daily log. Everything a log holds
for that day — what ran, what was asked, what was graded, quoted — is already in
the record, and writing both is writing the day twice.

This is the same resolution the review day already had, reached the other way
round: there, the loop hands off to a check-in and the log links the review
rather than restating it. Here the record is the whole of the day, so it stands
in the log's place, and [the one thing that looks for missing
days](../../policy/checkin-protocol.md#backfilling-a-missed-day) accepts either.

## Where it lives

- [`policy/recall.md`](../../policy/recall.md) — the pool, the edge, the interleaving, and what the session writes
- [`policy/mocks.md`](../../policy/mocks.md#the-week-round) — the round the loop kept, and the pool it swapped to
- [`policy/mock-sourcing.md`](../../policy/mock-sourcing.md#who-draws-from-it) — the retention order and its four readers
- [`commands/recall.md`](../../commands/recall.md) — how a recall day is run
- [`docs/decisions/15-worked-is-not-asked.md`](15-worked-is-not-asked.md) — the columns that made the queue visible in the first place
