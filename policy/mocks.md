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

**A typed round takes one entry and stops.** It goes down the retention order
until something inside its chosen type is eligible, and asks that. Working the
whole list is the recall session's job — it has a day, and it is not scoped to a
round type — [`recall.md`](recall.md).

[The week round](#the-week-round) is the exception and does not read that order
at all. Its pool is the week just worked.

### The week round

One round of the loop covers **the week just worked**, and only it. Many short
questions rather than one deep one, over the material the loop's own round types
do not reach — a subject with a daily block and no readiness rung is the case
this exists for.

It does not read [the retention order](mock-sourcing.md#the-retention-pick). Its
pool is `worked_on` inside this week, which makes it the one round in the
system scoped by calendar rather than by what has fallen due.

**It is the middle of three distances, and that is its whole justification.**
The check-in asks about a block hours after it ran. A recall day asks at a
remove long enough for forgetting to mean something. Between them sat nothing,
and a week's material with no pass over it goes to a recall day never having
been tested at all.

**The whole week is the pool, including what the check-in already asked.** This
round is a deliberate exception to
[the repeat edge](mock-sourcing.md#do-not-repeat-inside-the-window), which
otherwise puts a recently-asked entry out of reach.

The edge exists to stop a *retention* grade being contaminated by the round that
last asked the question. This round does not measure retention — it is the
second repetition at an expanding interval, and re-asking on the fourth day what
was asked on the first is what an expanding interval *is*. Excluding those
entries would refuse to do the repetition on the grounds that it had been done
once already.

**Unasked first, as a priority rather than a filter.** The round yields its
window, so it rarely reaches the whole week. A block produces far more entries
than an evening's check-in can question, and asking those before re-asking the
handful already covered is the better use of a short window. It is an ordering;
nothing in the week is excluded from it.

One consequence for reading the grades: an entry the check-in asked three days
ago will score higher here than one seen for the first time, because part of
what is being recalled is the earlier answer. That is what a consolidation pass
does, and it is why this round moves no rung. The measurement that is not
contaminated happens on a recall day, past both edges.

**Sequential, like any other round.** One question, then silence, per
[`interviewing.md`](interviewing.md#one-question-then-wait). Handing over a list
in one turn lets the user answer the ones they know and drop the rest.

**It creates no readiness rung.** The material it covers has no tracked round
type — [`readiness.md`](readiness.md#it-is-per-round-type). It grades entries,
writes the coverage columns, and stops there. Those grades are what later place
the entry in the retention order, so a week round is also how material outside
the tracked types ever becomes eligible for a decay test.

**It runs last and it yields.** Its length is whatever the window has left once
the other rounds and the review have what they need, and **the review is never
compressed to make room for it**. Take fewer entries, or none at all that week.

Yielding is affordable here in a way it was not for the round this replaced.
That one was the only drain for the entire untested backlog, so a week it lost
was a week the backlog grew unopposed. This one is a middle pass over material
that a recall day will reach regardless — losing it costs a repetition, not the
only measurement.

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
- Coverage written back to `instance/prep.db` — `asked_on` and `grade` on every
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
