---
name: mock
description: Run a single project deep-dive round and write the project's deep-dive answers. Use for the deep-dive slot in the rotation, or before a loop that will include one.
---

<!-- leak-check: allow-path — it writes deep dives into the personal half -->

# mock

Runs one project deep-dive round and writes
`instance/deep-dives/<project-slug>.md`. It owns that file, per
[`policy/repo-map.md`](../../../policy/repo-map.md#who-writes-what).

**It opens on the weakest-evidenced claim, not the most interesting one.** A
`stated` claim has nothing behind it but the user's word, which is exactly where
an interviewer catches a candidate.

## Required reading

The linked file wins; nothing here restates one.

- [`policy/claims.md`](../../../policy/claims.md) — markers, verify before writing, the attribution boundary
- [`policy/interviewing.md`](../../../policy/interviewing.md) — how the round is conducted, and where to push, in order
- [`policy/grading.md`](../../../policy/grading.md) — the grades, and that one carries its answer
- [`policy/frameworks.md`](../../../policy/frameworks.md) — announce once, then disappear; drill the exit hardest
- [`policy/artifact-voice.md`](../../../policy/artifact-voice.md) — the no-history rule reaches this file too

## Order of operations

1. **Read the evidence first** — `instance/profile/attribution.md` for whose
   work it was and what has been verified, and the repository itself. A round
   that has not read it cannot push on the weak spot, because it does not know
   which claim is thin. Sorting the claims by marker is most of the preparation.
2. **Settle attribution** before any claim: whose work it was, who else was
   involved, and what phrasing survives the source being opened mid-answer —
   [`claims.md`](../../../policy/claims.md#the-attribution-boundary).
3. **Run the round**, in role throughout.
4. **Drop role, then verify.** Every claim the round surfaced gets checked
   before any of it lands in the file. This is the one moment both halves are
   available — the answer is still live and nothing is at stake. Checking inside
   the round would be coaching, and would spend the sample.
5. **Write the deep dive** from
   [`templates/deep-dive.md`](../../../templates/deep-dive.md), weakest evidence
   first, with the drill chain ordered so each answer invites the next question.
6. **Drill it aloud** afterwards. Writing it first is what makes the round
   repeatable weeks later, and the file is what a loop's brief draws from.
7. **Stop.** No commit.

## Forbidden

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
- **Never treat a quote from the round as a source.** Frozen wording is worth
  recording and is not evidence —
  [`claims.md`](../../../policy/claims.md#unverifiable-is-not-unverified).
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
