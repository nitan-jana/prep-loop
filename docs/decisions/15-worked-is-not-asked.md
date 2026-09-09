# Worked is not asked

Every inventory entry carries three columns written by the system rather than by
whatever built the file: `Last worked`, `Last asked`, and `Grade`. Together they
are the pool a retention question is drawn from.

## Why one column was not enough

The inventories originally carried `Last worked` and a grade. A block names more
entries than any one session can test, so an entry can sit in front of the user
for a full window and never be questioned.

With only the first column, **that entry is indistinguishable from one that was
asked and answered well.** Silence reads as a pass. Splitting the pair into
"the material was in front of them" and "it was questioned and graded" is what
makes the untested set visible at all.

`Grade` is an index, not the record: it names the log or review file holding the
quoted answer, because [a grade without its answer is not a
grade](12-three-grades.md) and an inventory of grades without answers is exactly
the calibration failure that rule prevents.

## The pick, in order

1. **Graded below `solid`, past the lower edge.** A regression outranks an
   uncovered topic.
2. **`Last worked` filled, `Last asked` empty.** Studied and never tested.
3. **Graded `solid`, past the upper edge.** The decay test.

**Difficulty does not rank.** The entries that go untested are the ones that
looked too small to spend a question on, so ranking by difficulty rebuilds the
bias the second row exists to correct.

### It was split in two, and put back

The middle row was briefly given a pool of its own, on the reasoning that a
queue with an arrival rate is a different kind of thing from a round type
falling due. It is — but the ordering was never what went wrong.

**The failure was a reader without a window.** One round at the end of the loop
read all three rows, took a single entry, and ran in whatever time was left. To
a reader with room for one, an order is a filter: the first row was rarely
empty, so the second was rarely reached.

Splitting it then caused a second failure that took longer to see. A graded
entry outside every tracked round type had nowhere left to be asked *at a
distance* — the loop picks a type first, and the only session wide enough to
reach the rest had just been restricted to entries never asked at all. Material
with a daily block and no readiness rung would have gone on being quizzed
promptly and never once tested at a remove, which is the only distance that says
anything about retention.

The list went back to three rows. What changed instead is [who reads
it](21-the-recall-day.md): a session with a whole day, which works down the
order rather than stopping at the first thing it finds.

## Four readers, four different jobs

The **check-in** writes the columns and never reads them. It closes a day it is
still inside, which makes it the wrong instrument for a retention question.

The **planner** reads the first and third rows, so a week is not built entirely
out of new material. It deliberately does not read the middle one: an entry
studied and never tested does not need studying again, it needs a question put
to it, and scheduling it into a block re-reads a topic from the start.

The **review** takes one entry, inside the round type it picked first, and
reaches the top of the readiness ladder through the third row — the last rung is
defined on material not recently studied.

The **recall session** works down the whole list, across every track, for as
long as the day lasts. It is the only reader not scoped to a round type and the
only one that does not stop at the first eligible entry.

## Where it lives

- [`policy/mock-sourcing.md`](../../policy/mock-sourcing.md) — what the inventory records, the pick, and who draws from it
- [`policy/recall.md`](../../policy/recall.md) — the session that works down the list
- [`policy/repo-map.md`](../../policy/repo-map.md) — the two owners of an inventory, split by column

*In the history:* `7a1933e` `2210af9` `afd70f2`
