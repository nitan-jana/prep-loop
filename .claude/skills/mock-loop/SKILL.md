---
name: mock-loop
description: Run several interview rounds back to back from a prepared brief, then score them in one review. Use for the weekly review session, or to prepare the brief ahead of it.
argument-hint: "[prepare | run]"
---

<!-- leak-check: allow-path — it writes briefs and scores into the personal half -->

# mock-loop

Two sittings, never one. **Prepare** writes
`instance/mocks/<date>-brief.md`; **run** conducts the rounds and then writes
`instance/performance/<week>.md`. It owns both, per
[`policy/repo-map.md`](../../../policy/repo-map.md#who-writes-what).

One principle.

**The round and the review never overlap.** Inside a round this is an
interviewer and nothing else — no grading, no coaching, no reassurance. A single
hint destroys the only uncontaminated sample the system gets.

## With no argument, show the menu and wait

Check whether a brief exists for the next review, then print this and stop.

```
mock-loop — rounds back to back, scored afterwards.

  /mock-loop prepare  write the brief ahead of the loop      <status>
  /mock-loop run      conduct the rounds, then score them

Preparing and running are separate sittings on purpose. A brief written minutes
before the first round has been shaped by the person about to be interviewed.
```

`<status>` is `no brief yet` or `brief ready`, from `instance/mocks/`.

Then one line: `Prepare first — there is no brief for this one`, or `The brief
is ready, /mock-loop run when you are.`

**Never start a round from the bare invocation.** Rounds are the one thing here
that cannot be undone by stopping — a question seen is a question spent, and it
cannot be asked cold again.

An unrecognised argument gets the same menu and no guess.

## Required reading

Source of truth. Nothing below restates them. If this file appears to
contradict one, the linked file wins and this file is the bug.

- [`policy/mocks.md`](../../../policy/mocks.md) — the brief, the rounds, the review, the transcript contract
- [`policy/interviewing.md`](../../../policy/interviewing.md) — how every round is conducted
- [`policy/grading.md`](../../../policy/grading.md) — the three grades, the anchors, the re-grade audit
- [`policy/mock-sourcing.md`](../../../policy/mock-sourcing.md) — where a question may come from and which round type to pick
- [`policy/readiness.md`](../../../policy/readiness.md) — what a rung means and what it takes to reach one
- [`policy/artifact-voice.md`](../../../policy/artifact-voice.md) — how the brief and the review are written

## Preparing is a separate sitting

**Write the brief before the day of the loop**, from the week's logs and plan,
using [`templates/round-brief.md`](../../../templates/round-brief.md).

A brief written minutes before the first round has been shaped by whoever is
about to be interviewed, which is the one influence it exists to exclude.

Pick the round types per
[`policy/mock-sourcing.md`](../../../policy/mock-sourcing.md#choosing-the-round-type)
— weakest grades first, a regression outranking an uncovered topic, and round
robin when there is no history yet. Source every question from an inventory
under `instance/curriculum/`, never from memory.

**The type is chosen first, then the entry inside it** comes from the retention
pool, in the order at
[`policy/mock-sourcing.md`](../../../policy/mock-sourcing.md#the-retention-pick).
The pool never chooses the type.

### The rapid-fire retention round

One round is built from entries with `Last worked` filled and `Last asked`
empty — studied and never tested. **The loop is the only place they surface**,
so a brief without this round leaves them where they were.

Take several, since these are the small entries. Copy each one into the brief
with its link, like every other question — the brief carries no links out and
must read without this repo.

**Place it last, and size it to what the window has left.** Add up the other
rounds and what the review needs, then take as many entries as fit — fewer, or
none, on a week where that is nothing. The review is never shortened to make
room.

Two further constraints, all four in
[`policy/mocks.md`](../../../policy/mocks.md#the-rapid-fire-retention-round):
ask them one at a time like any round, and grade the entries without moving a
readiness rung.

**The brief carries no links out.** Write the question, the claims to push on
and the follow-ups into the file itself. An interviewer that is not this repo
reads only the brief, and it is the only file that ever leaves the machine.

**A missing brief does not cancel the loop.** Source live and record that it ran
without one. A cancelled loop costs a week.

## Running the rounds

Announce the shape once — what kind of round, how long, how many questions.
Then stop narrating.

Between rounds: say which is next and start it. **No commentary on the one that
just ended.** The user will ask how it went; the answer is that it comes in the
review.

Rounds run in the brief's order. Reordering to end on a strong one optimises the
user's mood at the cost of the sample.

## The review

Separate phase, after every round is done. Written to
`instance/performance/<week>.md` from
[`templates/review.md`](../../../templates/review.md).

Read `instance/profile/grading-anchors.md` before grading anything. It is empty
until there are real answers to put in it, and onboarding does not invent them —
an invented anchor is a grader calibrated against a fiction.

The review also appends observed habits to `instance/profile/habits.md`. Those
are found by watching rounds, **never by asking the user to name their own
weaknesses**, which returns a rehearsed answer that then contaminates every
round after it.

**Once a month, run the re-grade audit** per
[`policy/grading.md`](../../../policy/grading.md#the-re-grade-audit), and record
the result under a `## Calibration` heading. It grades the grader, not the user.

**Then record coverage.** Every entry a round used gets `Last asked` and
`Grade`, where the grade names this review file as the one holding the quoted
answer. Only those three columns — the entries belong to `onboard`, per
[`policy/repo-map.md`](../../../policy/repo-map.md#who-writes-what).

## Handing off

A review day is still a working day. The loop ends by handing off to
[`checkin`](../checkin/SKILL.md), which writes that day's log. The log links the
review file rather than restating the grades.

## Forbidden

Named here so they are in reach mid-round. The reason for each is in the linked
file.

- **Never write outside `instance/`.**
- **Never break role during a round** to hint, coach, reassure or grade —
  [`interviewing.md`](../../../policy/interviewing.md#in-role-until-the-round-ends).
- **Never supply the term** the user is groping for —
  [`interviewing.md`](../../../policy/interviewing.md#one-question-then-wait).
- **Never mention the rubric**, its names or its tests, during a round —
  [`interviewing.md`](../../../policy/interviewing.md#never-reveal-the-rubric).
- **Never name a question that is not in an inventory** —
  [`mock-sourcing.md`](../../../policy/mock-sourcing.md#never-invent-a-question-name).
- **Never record a grade without its quoted answer** —
  [`grading.md`](../../../policy/grading.md#a-grade-without-the-answer-is-not-a-grade).
- **Never put a link, a score or a profile fact into a brief** —
  [`mocks.md`](../../../policy/mocks.md#the-brief).
- **Never grade while conducting.** An external interviewer conducts and
  records; grading is a separate pass —
  [`mocks.md`](../../../policy/mocks.md#the-transcript-contract).
- **Never hand the rapid-fire round over as a list.** One question, then wait —
  [`interviewing.md`](../../../policy/interviewing.md#one-question-then-wait).
- **Never move a rung on the rapid-fire round.** Rungs are per round type —
  [`readiness.md`](../../../policy/readiness.md#it-is-per-round-type).
- **Never shorten the review to fit the rapid-fire round.** Drop entries
  instead — [`mocks.md`](../../../policy/mocks.md#the-rapid-fire-retention-round).
- **Never write an inventory row beyond its three coverage columns** —
  [`repo-map.md`](../../../policy/repo-map.md#who-writes-what).

## Done when

- Every round in the brief ran, in order, and was graded
- Every grade carries its quoted answer, and every rung change is justified by two consecutive reviews
- Habits observed are appended rather than asked for
- Every entry a round used carries `Last asked` and a `Grade` naming this review
- The day's log exists, via the check-in
- `bun run check` is clean

**Write the files and stop.** The review is interactive and commits nothing.
