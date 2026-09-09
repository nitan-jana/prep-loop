# loop

Two sittings, never one. **Prepare** writes
`instance/mocks/<date>-brief.md`; **run** conducts the rounds and then writes
`instance/performance/<week>.md`. It owns both, per
[`policy/repo-map.md`](../policy/repo-map.md#who-writes-what).

**The round and the review never overlap.** Inside a round this is an
interviewer and nothing else. A single hint destroys the only uncontaminated
sample the system gets.

## With no argument, show the menu and wait

Check whether a brief exists for the next review, then print this and stop.

```
preploop loop — rounds back to back, scored afterwards.

  prepare  write the brief ahead of the loop      <status>
  run      conduct the rounds, then score them

Run as `/preploop loop <mode>`. Preparing and running are separate sittings on
purpose: a brief written minutes before the first round has been shaped by the
person about to be interviewed.
```

`<status>` is `no brief yet` or `brief ready`, from `instance/mocks/`.

Then one line: `Prepare first — there is no brief for this one`, or `The brief
is ready, /preploop loop run when you are.`

**Never start a round from the bare invocation.** A question seen is a question
spent, and it cannot be asked cold again. An unrecognised argument gets the same
menu and no guess.

## Required reading

The linked file wins; nothing here restates one.

- [`policy/mocks.md`](../policy/mocks.md) — the brief, the rounds, the week round, the review, the transcript contract
- [`policy/interviewing.md`](../policy/interviewing.md) — how every round is conducted
- [`policy/grading.md`](../policy/grading.md) — the three grades, the anchors, the re-grade audit
- [`policy/mock-sourcing.md`](../policy/mock-sourcing.md) — where a question may come from and which round type to pick
- [`policy/readiness.md`](../policy/readiness.md) — what a rung means and what it takes to reach one
- [`policy/artifact-voice.md`](../policy/artifact-voice.md) — how the brief and the review are written

## prepare

Written on a different day from the loop, using
[`templates/round-brief.md`](../templates/round-brief.md).

1. **Pick the round types** — weakest grades first, per
   [`mock-sourcing.md`](../policy/mock-sourcing.md#choosing-the-round-type),
   unless `instance/profile/schedule.md` states a focus set, which overrides it.
2. **Pick one entry inside each type**, going down
   [the retention order](../policy/mock-sourcing.md#the-retention-pick)
   until something is eligible.
3. **Build the week round last**, from `worked_on` inside this week — the
   whole week, including what the check-in already asked, which is a deliberate
   exception to the repeat edge. Take the unasked ones first; that is an
   ordering, not a filter. Size it to what the window has left after the review;
   [`mocks.md`](../policy/mocks.md#the-week-round) has both rules.
4. **Copy every question in full**, with its source and entry identifier. The
   brief carries no links out and must read without this repo.

## run

1. **Announce the shape once** — what kind of round, how long, how many
   questions. Then stop narrating.
2. **Run the rounds in the brief's order.** Between them, say which is next and
   start it. No commentary on the one that just ended.
3. **Review afterwards**, as a separate phase, into
   `instance/performance/<week>.md` from
   [`templates/review.md`](../templates/review.md). Read
   `instance/profile/grading-anchors.md` first.
4. **Append observed habits** as a row under `## Observed` in
   `instance/profile/habits.md` — the columns are in
   [`templates/profile/habits.md`](../templates/profile/habits.md). Found by
   watching rounds, never by asking the user to name their own weaknesses.
5. **Once a month, run the re-grade audit** per
   [`grading.md`](../policy/grading.md#the-re-grade-audit), under a
   `## Calibration` heading. It grades the grader.
6. **Record coverage** — `asked_on` and `grade` on every entry a round used.
7. **Hand off to [`checkin`](checkin.md)**, which writes the day's log.
   A review day is still a working day.

## Forbidden

- **Never write outside `instance/`.**
- **Never break role during a round** to hint, coach, reassure or grade —
  [`interviewing.md`](../policy/interviewing.md#in-role-until-the-round-ends).
- **Never supply the term** the user is groping for —
  [`interviewing.md`](../policy/interviewing.md#one-question-then-wait).
- **Never mention the rubric**, its names or its tests, during a round —
  [`interviewing.md`](../policy/interviewing.md#never-reveal-the-rubric).
- **Never name a question that is not in an inventory** —
  [`mock-sourcing.md`](../policy/mock-sourcing.md#never-invent-a-question-name).
- **Never record a grade without its quoted answer** —
  [`grading.md`](../policy/grading.md#a-grade-without-the-answer-is-not-a-grade).
- **Never put a link, a score or a profile fact into a brief** —
  [`mocks.md`](../policy/mocks.md#the-brief).
- **Never grade while conducting** —
  [`mocks.md`](../policy/mocks.md#the-transcript-contract).
- **Never reorder rounds to end on a strong one** —
  [`mocks.md`](../policy/mocks.md#running-the-rounds).
- **Never hand the week round over as a list**, and never move a rung on it —
  [`mocks.md`](../policy/mocks.md#the-week-round).
- **Never shorten the review to fit the week round.** Drop entries instead —
  [`mocks.md`](../policy/mocks.md#the-week-round).
- **Never narrow the week round's pool to what the check-in missed.** The whole
  week is eligible — [`mocks.md`](../policy/mocks.md#the-week-round).
- **Never write an inventory row beyond its three coverage columns** —
  [`repo-map.md`](../policy/repo-map.md#who-writes-what).

## Done when

- Every round in the brief ran, in order, and was graded
- Every grade carries its quoted answer, and every rung change is justified by two consecutive reviews
- Habits observed are appended rather than asked for
- Every entry a round used carries `asked_on` and a `grade` naming this review
- The day's log exists, via the check-in
- `bun run check` is clean

**Write the files and stop.** The review is interactive and commits nothing.
