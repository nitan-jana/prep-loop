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

1. **The cost.** A mechanism described without its tradeoff is the most common
   incomplete answer — but only after the user has had the chance to volunteer
   it, since volunteering it unprompted is the difference between two grades.
2. **The weakest-evidenced claim.**
3. **The alternative not taken.**
4. **The boundary**, where the approach stops working.

One push is the floor. Keep going while the answer is still moving.

## The written answer comes before the spoken one

The deep dive is answered in writing, from
[`templates/deep-dive.md`](../../../templates/deep-dive.md), and drilled aloud
afterwards. The drill chain is ordered so each answer invites the next question,
which is how a real deep dive runs.

Writing it first is what makes the round repeatable — the same chain can be
drilled cold weeks later, and the file is what a loop's brief draws from.

## Attribution, before any claim

Settle three things: whose work it was, who else was involved, and what phrasing
survives someone opening the repository mid-answer.

That last test is the operative one. Shared work is described as shared, and the
user's part described precisely — which is nearly always more impressive than
the vague version it replaces.

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
- Every decision in it names what it cost and what was rejected
- The drill chain is written, not only the narrative
- `bun run check` is clean

**Write the files and stop** — the user reads the folder.
