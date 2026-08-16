<!-- leak-check: allow-path — names the brief, transcript and score paths -->

# The mock loop

Several rounds back to back from a brief prepared in advance, then one review
that scores all of them.

## The brief

Written ahead of the loop, from the week's logs and plan. It fixes the
questions, the round types and the order, so the loop does not open with the
user and the agent negotiating what to do.

Preparing it is a separate sitting from running it. A brief written minutes
before the first round has been shaped by whoever is about to be interviewed,
which is the one influence it exists to exclude.

**The brief is self-contained.** No links out — not into `instance/profile/`, not into
`policy/`, not into the logs, not into the week plan. Everything a round needs
is written into the brief itself, including the claims a deep dive will push on
and the material a question came from.

That is not a style rule. An interviewer that is not this repo — a voice
session, a separate tool, a person given the file — reads only the brief. Every
link out is a thing that interviewer cannot see, and the round quietly loses
whatever was on the other side of it.

It is also the privacy boundary. **The brief is the only thing that ever leaves
the machine**, and only when the user sends it. An external interviewer never
sees the profile, the resume, the logs or the scores, because the brief already
contains everything a round needs and nothing else does.

**A missing brief does not cancel the loop.** The loop falls back to sourcing
questions live per [`mock-sourcing.md`](mock-sourcing.md), and records that it
ran without one. A cancelled loop costs a week; a slightly worse loop costs
very little.

## Running the rounds

Every round follows [`interviewing.md`](interviewing.md) exactly — in role
throughout, one question then silence, at least one push, rubric never
mentioned.

Between rounds: state which round is next and start it. No commentary on the
one that just ended. The user will ask how it went, and the answer is that it
comes in the review.

Rounds run in the brief's order. Reordering to end on a strong one is
optimising the user's mood at the cost of the sample.

## The review

Separate phase, after all rounds. Everything withheld until now:

- Each round's grade per [`grading.md`](grading.md), each with its quoted
  answer, and [the test that grade
  failed](grading.md#a-grade-below-solid-names-the-test-it-failed)
- What a stronger answer would have contained
- The follow-up that was not survived
- Observed habits, appended to `instance/profile/habits.md`
- What to drill, ordered, specific enough to schedule

Written to `instance/performance/YYYY-Www.md`. The review is interactive and **commits
nothing**.

### An answer can be wrong by being too small

A claim made in a round gets checked against its source the same way a written
one does, and **the check can correct in either direction.** Overclaiming is the
familiar failure. Understating is the one that goes unrecorded, because nothing
about it feels like an error: the answer was true, and the round moves on.

It costs what any other weak answer costs. Work described as less deliberate
than it was reads as work that happened by accident, and the source is available
to say otherwise.

So where an answer is thinner than what the deep dive, the repository or the
inventory entry actually supports, that gap is a finding and goes in under what
a stronger answer would have contained. **It is not a grade change** — the
answer given is the answer graded, and an interviewer heard the small version.

### The drill list is ordered

It is read by the planner, which schedules from the top. An unordered list hands
the ranking decision to whoever reads it next, and that decision belongs here,
where the evidence is.

A regression outranks an uncovered topic, per
[`readiness.md`](readiness.md#regression). Beyond that, the ordering is the
review's judgement and the first item is the one that would change the most
rounds.

A review day is still a working day, so the loop ends by handing off to a
check-in, which writes that day's log. The log links the review file rather
than restating the grades.

## The transcript contract

An external interviewer — voice or otherwise — writes
`instance/mocks/YYYY-MM-DD-transcript.md`, which this repo grades from. Required:

| Field | Why |
|---|---|
| `transcript_schema_version` | The format will change; a grader must know which one it is reading |
| Turn-by-turn speech, each turn timestamped | The record being graded |
| Time to first word, per question | Distinguishes thinking from not knowing |
| Pauses beyond a few seconds, marked inline | Where the answer stalled |
| Barge-ins, marked | Interrupting the question is its own signal |
| The question asked, per round | Ties the transcript to an inventory entry |
| Round start, end, and any overrun | Whether the answer fit the window |

**The interviewer never grades.** It conducts and it records. Grading happens
here, against the rubric and the anchors, in a separate pass.

Splitting them is what keeps grades comparable across interviewers, and it
keeps the round clean: a system that is grading while it asks is a system
whose next question is shaped by the grade it has already formed.
