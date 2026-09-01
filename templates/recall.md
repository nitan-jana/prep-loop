<!-- leak-check: allow-path — names the personal file it is a template for -->

# Recall record

One recall day's scored entries, at
`instance/performance/<date>-recall.md`. Written by the recall session, per
[`policy/recall.md`](../policy/recall.md#it-writes-its-own-record).

**This file stands in place of the day's log.** A recall day has no
`instance/logs/` entry, and the check-in reads this one where it would have read
that — [`policy/checkin-protocol.md`](../policy/checkin-protocol.md#backfilling-a-missed-day).
A recall day that never ran has no record here and is backfilled as an ordinary
log instead.

**Everything below the line is the template. Delete this preamble, and keep the
heading that follows it.**

---

# <date> — recall

## Entries

Drawn from everything past the recall edge, worked down in the order at
[`policy/mock-sourcing.md`](../policy/mock-sourcing.md#the-retention-pick),
oldest first inside each row. Graded against the anchors in
`instance/profile/grading-anchors.md`. **A grade without its quoted answer is
not a grade.**

Rows sit in the order they were asked, which is the interleaved order — see
[`policy/recall.md`](../policy/recall.md#interleaved-never-blocked) for why they
are not grouped by track, and why this session scores lower than a grouped one
would on the same material.

`Due` is which row of the order the entry came from, and nothing more — it is
not a comparison to how the entry graded last time.

| Entry | From | Track | Due | Grade | Answer |
|---|---|---|---|---|---|
| <entry identifier> | <source slug> | <track> | <below solid / never asked / decay> | <solid / shaky / not retained> | "<the user's words>" |

## What a stronger answer would have contained

Only for entries below `solid`. One line each, naming the specific missing
piece rather than the topic.

- <entry identifier> — <what was missing>

## Queue

| | |
|---|---|
| Asked | <count> |
| Eligible and not reached | <count> |
| Of those, never asked | <count> |

The second number is what the next recall day starts from. It is a count and
nothing more — no note on whether it grew, no comparison to last time, per
[`policy/artifact-voice.md`](../policy/artifact-voice.md#no-history).

**No readiness rows.** A recall session moves no rung, per
[`policy/recall.md`](../policy/recall.md#it-moves-no-rung).
