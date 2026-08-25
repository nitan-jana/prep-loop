---
name: mock
description: Run a single project deep-dive round and write the project's deep-dive answers. Use for the deep-dive slot in the rotation, or before a loop that will include one.
---

<!-- leak-check: allow-path — it writes deep dives into the personal half -->

# mock

Runs one project deep-dive round and writes
`instance/deep-dives/<project-slug>.md`. It owns that file, per
[`policy/repo-map.md`](../../../policy/repo-map.md#who-writes-what).

One principle.

**It opens on the weakest-evidenced claim, not the most interesting one.** A
`stated` claim has nothing behind it but the user's word, which is exactly where
an interviewer catches a candidate.

## Required reading

Source of truth. Nothing below restates them. If this file appears to
contradict one, the linked file wins and this file is the bug.

- [`policy/claims.md`](../../../policy/claims.md) — markers, and what they change downstream
- [`policy/interviewing.md`](../../../policy/interviewing.md) — how the round is conducted, and where to push
- [`policy/grading.md`](../../../policy/grading.md) — the grades, and that one carries its answer
- [`policy/frameworks.md`](../../../policy/frameworks.md) — announce once, then disappear; drill the exit hardest
- [`policy/artifact-voice.md`](../../../policy/artifact-voice.md) — the no-history rule reaches this file too

## Read the evidence first

Before the round, read what is actually known about the project:
`instance/profile/attribution.md` for whose work it was and what has been
verified, and the repository itself.

**A round that has not read the evidence cannot push on the weak spot**, because
it does not know which claim is thin. Sorting the claims by marker is most of
the preparation.

## Where to push

In order of preference, per
[`policy/interviewing.md`](../../../policy/interviewing.md#push-once-at-minimum):

1. **The cost**, and only after it could have been volunteered.
2. **The weakest-evidenced claim.**
3. **The alternative not taken.**
4. **The boundary**, where the approach stops working.

The reason each one earns its place, and why the order matters, is in the linked
file. This list is here to be glanced at mid-round, not to restate it.

One push is the floor. Keep going while the answer is still moving.

## Verify after the round, before the file

The round ends, role drops, and **then** every claim it surfaced gets checked —
before any of it lands in the deep dive, per
[`claims.md`](../../../policy/claims.md#verify-before-writing-not-after).

This is the one moment where both halves are available: the answer is still
live, and nothing is at stake any more. Checking inside the round instead would
be coaching, and would spend the only sample the round exists to produce.

Checked here: anything about a public dependency, and anything in a repository
that can still be opened. Not checked: work behind an access boundary, which
lands `stated` with the boundary itself named as the reason.

**A quote from the round is not a source.** Recording what was said is worth
doing and belongs in the file, because frozen wording is what a later round
catches drift against. It is not evidence of the claim being true —
[unverifiable is not unverified](../../../policy/claims.md#unverifiable-is-not-unverified).

## The written answer comes before the spoken one

The deep dive is answered in writing, from
[`templates/deep-dive.md`](../../../templates/deep-dive.md), and drilled aloud
afterwards. The drill chain is ordered so each answer invites the next question,
which is how a real deep dive runs.

Writing it first is what makes the round repeatable — the same chain can be
drilled cold weeks later, and the file is what a loop's brief draws from.

## Attribution, before any claim

Settle whose work it was, who else was involved, and what phrasing survives the
source being opened mid-answer, per
[`claims.md`](../../../policy/claims.md#the-attribution-boundary). The third is
the operative test and the reason for it is in that file.

## Forbidden

Named here so they are in reach mid-round. The reason for each is in the linked
file.

- **Never write outside `instance/`.**
- **Never break role during the round** to hint, coach or grade —
  [`interviewing.md`](../../../policy/interviewing.md#in-role-until-the-round-ends).
- **Never supply the term** the user is groping for —
  [`interviewing.md`](../../../policy/interviewing.md#one-question-then-wait).
- **Never mention the rubric** during the round —
  [`interviewing.md`](../../../policy/interviewing.md#never-reveal-the-rubric).
- **Never coach a framework mid-round** —
  [`frameworks.md`](../../../policy/frameworks.md#the-round-grades-the-answer-not-the-adherence).
- **Never write a claim without a marker** —
  [`claims.md`](../../../policy/claims.md#every-claim-carries-a-marker).
- **Never write the review scores.** Those belong to
  [`mock-loop`](../mock-loop/SKILL.md).

## Done when

- `instance/deep-dives/<project-slug>.md` exists, ordered weakest evidence first
- Every claim carries a marker, and every number carries its command
- No claim is `stated` unless its source names why the check was impossible
- Every decision in it names what it cost and what was rejected
- The drill chain is written, not only the narrative
- `bun run check` is clean

**Write the files and stop** — the user reads the folder.
