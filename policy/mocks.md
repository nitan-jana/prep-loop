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

### Where the questions come from

The round type is chosen first, weakest first, per
[`mock-sourcing.md`](mock-sourcing.md#choosing-the-round-type). The retention
pool then chooses the entry *inside* that type — it never chooses the type.

**The loop is the pool's only reader.** The planner schedules work and the
check-in records what it tested; neither asks a retention question, and the
reasons are in [`mock-sourcing.md`](mock-sourcing.md#who-draws-from-it).

### The rapid-fire retention round

One round of the loop is drawn from entries with `Last worked` filled and
`Last asked` empty — studied, never tested. This is the only place they surface.

Several of them in the time one deep question would take, because these are the
small entries: a quiz item, a type challenge, the approach to one problem. That
is what makes the round a drain rather than a gesture. A block names more
entries every day than any evening can test, so the untested set grows on its
own and needs somewhere to go.

**Sequential, like any other round.** One question, then silence, per
[`interviewing.md`](interviewing.md#one-question-then-wait). Handing over a list
in one turn lets the user answer the ones they know and drop the rest, which is
the failure this round is most exposed to.

**It creates no readiness rung.** Rungs are per round type and earned across
consecutive reviews — [`readiness.md`](readiness.md#it-is-per-round-type). This
round spans whatever the pool held, so it grades entries and nothing more.

**It runs last and it yields.** Its length is whatever the window has left once
the other rounds and the review have what they need, and **the review is never
compressed to make room for it**. Take fewer entries, or none at all that week.

A loop that ends with a full rapid-fire round and a thin review has traded its
most valuable output for its cheapest. The review is where the grades, the
ordered drill list and the rungs come from; the retention round is coverage of
material already studied, and coverage is the thing this system has least
trouble producing.

This is not the ordering rule bending. [Rounds run in the brief's
order](#running-the-rounds) forbids saving a strong round for last to flatter
the sample. This says what gets cut when the window is short, and the answer is
never the review.

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
- Coverage written back to the inventories — `Last asked` and `Grade` on every
  entry a round used, per
  [`mock-sourcing.md`](mock-sourcing.md#what-the-inventory-records)

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
