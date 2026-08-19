<!-- leak-check: allow-path — names the inventories the columns live on -->

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

## Three readers, three different jobs

The **check-in** writes the columns and never reads them. It closes a day it is
still inside, which makes it the wrong instrument for a retention question.

The **planner** reads the first and third rows, so a week is not built entirely
out of new material. It deliberately does not read the middle one: an entry
studied and never tested does not need studying again, it needs a question put
to it, and scheduling it into a block re-reads a topic from the start.

The **review** is the only reader of the middle row, through a round built for
it.

## The round that drains the pool

One round of the loop is drawn from entries worked and never asked — several of
them in the time one deep question would take, because these are the small
entries. **It is the only place they surface**, so a brief without it leaves
them where they were.

Four constraints, each closing a way it could go wrong:

- **Sequential, like any round.** Handing over a list in one turn lets the user
  answer the ones they know and drop the rest.
- **It creates no readiness rung.** Rungs are per round type, and this round
  spans whatever the pool held.
- **It runs last and it yields.** Its length is whatever the window has left.
- **The review is never compressed to make room for it.** A loop ending with a
  full retention round and a thin review has traded its most valuable output for
  its cheapest.

## Where it lives

- [`policy/mock-sourcing.md`](../../policy/mock-sourcing.md) — what the inventory records, the pick, and who draws from it
- [`policy/mocks.md`](../../policy/mocks.md) — the rapid-fire round and its four constraints
- [`policy/repo-map.md`](../../policy/repo-map.md) — the two owners of an inventory, split by column

*In the history:* `7a1933e` `2210af9` `afd70f2`
