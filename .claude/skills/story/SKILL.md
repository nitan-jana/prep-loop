---
name: story
description: Interview one experience into a usable interview story with its drill sheet, and index it in the story bank. Use when a story is needed for a question shape that has none, or when an existing one fails under follow-ups.
---

<!-- leak-check: allow-path — it writes stories into the personal half -->

# story

Writes `instance/stories/<slug>.md` and updates `instance/profile/story-bank.md`
in the same turn. It owns both, per
[`policy/repo-map.md`](../../../policy/repo-map.md#who-writes-what).

Two principles.

**One situation, one decision, one outcome.** Two decisions is two stories.

**The first answer is a resume line; the second is the truth.** So every answer
gets pushed on, including the good ones.

## Required reading

Source of truth. Nothing below restates them. If this file appears to
contradict one, the linked file wins and this file is the bug.

- [`policy/story-craft.md`](../../../policy/story-craft.md) — what makes a story usable, the rejection bar, the drill sheet
- [`policy/claims.md`](../../../policy/claims.md) — markers, verify before writing, the attribution boundary
- [`policy/interviewing.md`](../../../policy/interviewing.md) — one question then wait, push once, never supply the word
- [`policy/artifact-voice.md`](../../../policy/artifact-voice.md) — the no-history rule reaches this file too

## Start from the gap, not from the good story

Open the coverage table in `instance/profile/story-bank.md` and ask which
question shape has nothing behind it.

Left alone, people produce five versions of the story they most enjoy telling,
which is a bank with one story in it. The gaps are the point of that table.

## Interviewing it out

One question, then wait. No lists — a list lets the user answer the easy one and
quietly drop the rest.

Get the situation, the decision and what changed. Then push, in this order:

1. **What was rejected.** The most common gap and the first thing an interviewer
   reaches for. If nothing was considered, that is the honest answer and it goes
   in as such — inventing a rejected alternative is worse, because the follow-up
   will ask why it lost.
2. **The number, or the mechanism.** Preferably both.
3. **Who else.** Shared work described as solo is the claim most likely to be
   opened and the cheapest to fix now.

**Reject on sight**: improved, streamlined, optimised, enhanced, scaled,
significantly — with no figure and no mechanism. Do not soften them into better
wording. They mark the places where the story does not exist yet.

## Verify before writing

Any claim with a number in it is checked before it lands, or it goes in marked
`stated`. There is no third state where it is written now and confirmed later.

A story with an unverified number **does not enter the bank**, per
[`story-craft.md`](../../../policy/story-craft.md#the-rejection-bar). Record the
command verbatim and re-runnable, next to the claim.

## The drill sheet is half the file

**Every story ends with the follow-ups an interviewer would actually ask, and
the answers.** Aim at the weak points on purpose: the unverified figure, the
boundary between this work and someone else's, the alternative that lost, the
thing that would have broken at ten times the load.

The narrative is rehearsed once. The follow-ups are where it holds or does not.

## Close by testing it

Have the story told out loud, from memory, then ask one drill-sheet follow-up
cold. A story that reads well and does not speak well is one that will be
abandoned in the room.

Anything that cannot be told in a couple of minutes is too long — the
interviewer interrupts, and the part that gets cut is the outcome.

## Forbidden

Named here so they are in reach while the file is being written. The reason for
each is in the linked file.

- **Never write outside `instance/`.**
- **Never write a claim without a marker** —
  [`claims.md`](../../../policy/claims.md#every-claim-carries-a-marker).
- **Never bank a story with an unverified number** —
  [`story-craft.md`](../../../policy/story-craft.md#the-rejection-bar).
- **Never invent a rejected alternative** —
  [`story-craft.md`](../../../policy/story-craft.md#what-was-rejected).
- **Never describe shared work as solo** —
  [`claims.md`](../../../policy/claims.md#the-attribution-boundary).
- **Never leave the bank index stale.** It is updated in the same turn —
  [`story-craft.md`](../../../policy/story-craft.md#length-and-the-bank).

## Done when

- `instance/stories/<slug>.md` exists, with its drill sheet
- `instance/profile/story-bank.md` indexes it, and its coverage table is current
- Every claim carries a marker, and every number carries its command
- The user told it from memory and survived one follow-up cold
- `bun run check` is clean

**Write the files and stop** — the user reads the folder.
