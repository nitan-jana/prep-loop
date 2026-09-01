---
name: recall
description: Spend a working day on retrieval — many short questions drawn from everything due, interleaved across every track, graded and written to a recall record. Use on a recall day in the rotation, or when what is due has outgrown what a loop can reach.
---

<!-- leak-check: allow-path — it writes the recall record into the personal half -->

# recall

Writes `instance/performance/<date>-recall.md` and nothing else. It owns that
record, per
[`policy/repo-map.md`](../../../policy/repo-map.md#who-writes-what), and **a
recall day gets no daily log** — this file stands in its place.

**It drains a queue.** Every other session goes deep on a few things inside one
round type. This one goes wide across every track.

## It reports the queue and waits

Run with no argument, print this and stop.

```
recall — everything due, interleaved.

  due         <count> entries past the edge, across <count> tracks
  of those    <count> never asked, <count> graded below solid, <count> due again
  oldest      <how far back the head of the queue was worked>

Say go and the first question follows. Questions are spent when asked.
```

**Never start a question from the bare invocation.** A question seen cannot be
asked cold again — [`docs/decisions/19-a-bare-invocation-waits.md`](../../../docs/decisions/19-a-bare-invocation-waits.md).

## Required reading

The linked file wins; nothing here restates one.

- [`policy/recall.md`](../../../policy/recall.md) — the pool, the edge, the interleaving, and what the session writes
- [`policy/mock-sourcing.md`](../../../policy/mock-sourcing.md) — the retention order, and never naming a question that does not exist
- [`policy/interviewing.md`](../../../policy/interviewing.md) — every question here is a round and runs by the same rules
- [`policy/grading.md`](../../../policy/grading.md) — the three grades and the rule that a grade carries its answer
- [`policy/artifact-voice.md`](../../../policy/artifact-voice.md) — how the record is written

## Order of operations

1. **Build the queue** — every worked entry past the recall edge in
   `instance/profile/schedule.md`, in the order at
   [`policy/mock-sourcing.md`](../../../policy/mock-sourcing.md#the-retention-pick).
   Anything already asked must clear the repeat edge too. No round type is off
   limits.
2. **Interleave it.** Order by age, then redistribute so no two consecutive
   questions come from the same track. Sorting by age alone regroups them,
   because entries worked in the same block share an age and a track.
3. **Report the counts and wait.**
4. **Ask, one at a time**, working down the order rather than stopping at the
   first eligible entry. Grade against the anchors in
   `instance/profile/grading-anchors.md`.
5. **Write the record** from [`templates/recall.md`](../../../templates/recall.md).
6. **Record coverage** — `Last asked` and `Grade` on every entry asked, naming
   this record as the file holding the answer.
7. **Stop.** No commit, and no daily log.

**Every entry is copied out of a file under `instance/curriculum/`**, with its
identifier and its link. A session asking dozens of small questions is where
[naming one that does not
exist](../../../policy/mock-sourcing.md#never-invent-a-question-name) is most
easily done.

## Forbidden

- **Never write outside `instance/`.**
- **Never write a daily log.** The record stands in its place —
  [`recall.md`](../../../policy/recall.md#it-writes-its-own-record).
- **Never name a question that is not in an inventory** —
  [`mock-sourcing.md`](../../../policy/mock-sourcing.md#never-invent-a-question-name).
- **Never hand the questions over as a list.** One, then wait —
  [`interviewing.md`](../../../policy/interviewing.md#one-question-then-wait).
- **Never group by track**, and never sort by age alone, which groups by track —
  [`recall.md`](../../../policy/recall.md#interleaved-never-blocked).
- **Never stop at the first eligible entry.** The order is a priority, not a
  filter — [`recall.md`](../../../policy/recall.md#it-reads-the-whole-list-and-works-down-it).
- **Never re-ask an entry inside the repeat edge** —
  [`mock-sourcing.md`](../../../policy/mock-sourcing.md#do-not-repeat-inside-the-window).
- **Never break role to hint, coach or reassure** —
  [`interviewing.md`](../../../policy/interviewing.md#in-role-until-the-round-ends).
- **Never record a grade without its quoted answer** —
  [`grading.md`](../../../policy/grading.md#a-grade-without-the-answer-is-not-a-grade).
- **Never move a readiness rung** —
  [`readiness.md`](../../../policy/readiness.md#it-is-per-round-type).
- **Never write an inventory row beyond its three coverage columns** —
  [`repo-map.md`](../../../policy/repo-map.md#who-writes-what).

## Done when

- `instance/performance/<date>-recall.md` exists, and no log was written for the day
- Every entry asked was copied from an inventory, with its link
- No two consecutive entries in the record share a track
- Every grade carries the answer that produced it, quoted
- Every entry asked carries `Last asked` and a `Grade` naming this record
- `bun run check` is clean

**Write the file and stop** — the user reads the folder.
