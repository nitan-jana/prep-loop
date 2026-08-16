<!-- leak-check: allow-path — points at the policy this file parameterises -->

# Schedule

The parameters behind [`policy/cadence.md`](../../policy/cadence.md) and
[`policy/caps.md`](../../policy/caps.md). Days, blocks, sessions, ceilings.

## Working days

| Day | Blocks | Notes |
|---|---|---|
| <day> | <labels> | |

Days not listed are not working days, and nothing gets scheduled on them.

## Blocks

The label is stable; the subject inside it moves week to week.

| Label | Window | Usual subject |
|---|---|---|
| <letter> | <start>–<end> | <subject> |

## Calendar description ceiling

<how many short lines fit an event without scrolling, on the device this
calendar actually gets read on>

The rule behind it is in
[`policy/artifact-voice.md`](../../policy/artifact-voice.md#a-description-has-a-ceiling).

## Recurring sessions

| Session | Day | Window |
|---|---|---|
| Planning | <day> | <start>–<end> |
| Check-in | <every working day> | <start>–<end> |
| Review and loop | <day> | <start>–<end> |

## Caps

| Cap | Ceiling |
|---|---|
| New content per day | <count>, across the whole day |
| Outbound actions per day | <count> |

### Content weights

A ceiling counted in flat items treats a chapter and a short article the same.

| Weight | What counts as one |
|---|---|
| Large | <what> |
| Medium | <what> |
| Not counted | Problems, drills, redoing covered material, writing, rounds |

## Timezone

<timezone identifier>

Everything scheduled resolves against this. It is written down because a
routine runs somewhere else.
