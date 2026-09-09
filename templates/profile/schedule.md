# Schedule

The reasoning behind [`schedule.yaml`](schedule.yaml), which holds every value a
session reads. This file repeats none of them — it says why each is what it is.

The parameters themselves are those of
[`policy/cadence.md`](../../policy/cadence.md) and
[`policy/caps.md`](../../policy/caps.md). Build them from what has actually been
sustained, not from an ideal week.

## Working days

<why these days and not others, and what a day carrying fewer blocks is for>

## Blocks

<why each block sits where it does; what a shortened block is protecting; what is
parked out of a block, and the condition that unparks it>

## Calendar description ceiling

<what the ceiling is protecting — the count itself is `calendar_description_lines`>

The rule behind it is in
[`policy/artifact-voice.md`](../../policy/artifact-voice.md#a-description-has-a-ceiling).

## Recurring sessions

<why each falls where it does, and what shares a sitting with what>

## Caps

<why each ceiling is the number it is, and how the per-day ceiling reads against
the cadence the blocks actually give it — a weekly block under a per-day ceiling
needs that reconciliation written down or the two files contradict each other>

### Content weights

A ceiling counted in flat items treats a chapter and a short article the same,
which is what `content_weights` exists to correct.

<what routinely spends the allowance, and what never counts against it>

## Recall days

The parameters behind [`policy/recall.md`](../../policy/recall.md).

<why this cycle and these days; whether the cycle is derived from the week number
rather than stored, and why that matters after a week away>

## Retention window

Both edges of the window are in
[`policy/mock-sourcing.md`](../../policy/mock-sourcing.md#do-not-repeat-inside-the-window),
and the recall edge in
[`policy/recall.md`](../../policy/recall.md#its-lower-edge-is-its-own).

<what each of the three edges is guarding against — the lower edge against a
re-ask contaminated by the round that last asked, the upper edge against a miss
that is uninformative because forgetting was expected, the recall edge against an
answer that comes from the block that worked it rather than from retention>

The values belong here rather than in policy because they depend on how much
material is in rotation and how long the run is. A user with a small inventory
and a short horizon wants the edges tighter than one with a large one.

## Timezone

Everything scheduled resolves against `timezone`. It is written down because a
routine runs somewhere else.
