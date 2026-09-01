---
name: story
description: Interview one experience into a usable interview story with its drill sheet, and index it in the story bank. Use when a story is needed for a question shape that has none, or when an existing one fails under follow-ups.
---

<!-- leak-check: allow-path — it writes stories into the personal half -->

# story

Writes `instance/stories/<slug>.md` and updates `instance/profile/story-bank.md`
in the same turn. It owns both, per
[`policy/repo-map.md`](../../../policy/repo-map.md#who-writes-what).

**The first answer is a resume line; the second is the truth.** So every answer
gets pushed on, including the good ones.

## Required reading

The linked file wins; nothing here restates one.

- [`policy/story-craft.md`](../../../policy/story-craft.md) — what makes a story usable, the rejection bar, what was rejected, the drill sheet
- [`policy/claims.md`](../../../policy/claims.md) — markers, verify before writing, the attribution boundary
- [`policy/interviewing.md`](../../../policy/interviewing.md) — one question then wait, push once, never supply the word
- [`policy/artifact-voice.md`](../../../policy/artifact-voice.md) — the no-history rule reaches this file too

## Order of operations

1. **Start from the gap.** Open the coverage table in
   `instance/profile/story-bank.md` and take a question shape with nothing
   behind it. Left alone, people produce five versions of the story they most
   enjoy telling, which is a bank with one story in it.
2. **Interview it out** — one question, then wait. Situation, decision, what
   changed. Then push, per
   [`story-craft.md`](../../../policy/story-craft.md#what-was-rejected) and
   [`interviewing.md`](../../../policy/interviewing.md#push-once-at-minimum).
3. **Verify before writing.** Any claim with a number is checked before it
   lands, or it goes in `stated`. There is no third state where it is written
   now and confirmed later.
4. **Write the story and its drill sheet** from
   [`templates/story.md`](../../../templates/story.md). The drill sheet is half
   the file — the narrative is rehearsed once, the follow-ups are where it holds
   or does not.
5. **Update the bank index** in the same turn.
6. **Test it.** Have it told aloud from memory, then ask one drill-sheet
   follow-up cold. A story that reads well and does not speak well is one that
   will be abandoned in the room.
7. **Stop.** No commit.

## Forbidden

- **Never write outside `instance/`.**
- **Never write a claim without a marker** —
  [`claims.md`](../../../policy/claims.md#every-claim-carries-a-marker).
- **Never bank a story with an unverified number** —
  [`story-craft.md`](../../../policy/story-craft.md#the-rejection-bar).
- **Never soften a rejected word into better wording.** Improved, streamlined,
  optimised, scaled with no figure and no mechanism mark where the story does
  not exist yet — [`story-craft.md`](../../../policy/story-craft.md#the-rejection-bar).
- **Never invent a rejected alternative** —
  [`story-craft.md`](../../../policy/story-craft.md#what-was-rejected).
- **Never describe shared work as solo** —
  [`claims.md`](../../../policy/claims.md#the-attribution-boundary).
- **Never hand over a list of questions.** A list lets the user answer the easy
  one and drop the rest —
  [`interviewing.md`](../../../policy/interviewing.md#one-question-then-wait).
- **Never leave the bank index stale.** It is updated in the same turn —
  [`story-craft.md`](../../../policy/story-craft.md#length-and-the-bank).

## Done when

- `instance/stories/<slug>.md` exists, with its drill sheet
- `instance/profile/story-bank.md` indexes it, and its coverage table is current
- Every claim carries a marker, and every number carries its command
- The user told it from memory and survived one follow-up cold
- `bun run check` is clean

**Write the files and stop** — the user reads the folder.
