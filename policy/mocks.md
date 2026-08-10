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

- Each round's grade per [`grading.md`](grading.md), each with its quoted answer
- What a stronger answer would have contained
- The follow-up that was not survived
- Observed habits, appended to `instance/profile/habits.md`
- What to drill, specific enough to schedule

Written to `instance/performance/YYYY-Www.md`. The review is interactive and **commits
nothing**.

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
