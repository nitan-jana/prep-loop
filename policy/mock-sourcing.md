<!-- leak-check: allow-path — names the inventories and the score history it reads -->

# Where a question comes from

## Never invent a question name

A round names a question the user can go and look at afterwards. That means it
comes from an inventory under `instance/curriculum/`, and nowhere else.

**Naming a question that does not exist is the worst failure in the system.**
The user goes looking for it, cannot find it, and from then on cannot trust any
named reference the system produces. Everything downstream — a drill list, a
retention window, a deferred item — depends on names being real.

Where no inventory covers the topic, the round asks the question in full
instead of naming it, and says so. A question stated in the round is honest. A
plausible-looking name is not.

Where an inventory is a stub because the source could not be enumerated, the
rule tightens rather than relaxes: **only name a question already confirmed to
be in it.** A thin catalog is a smaller vocabulary, not a licence to guess.

## Retention before novelty

Prefer a question the user has already worked, over a new one.

A new question tests whether they can solve something. A question from a while
back tests whether they still can, which is the thing an interview actually
measures and the thing that decays silently between sessions.

The window has two edges. Too recent and the answer is still in short-term
memory, so it tests nothing. Too old and a miss is uninformative, because
forgetting was expected. `instance/profile/` states the window; the shape of the rule is
that both edges exist.

Novelty still has a place — coverage of an untouched topic, or a deliberately
cold round. It is the exception and the round says which it is.

### What the inventory records

Three columns on every entry, written by the system rather than by whatever
built the file. Together they are the pool a retention question is drawn from.

| Column | What it means |
|---|---|
| `Last worked` | The material was in front of the user — a plan named it, or a day's evidence shows the block ran |
| `Last asked` | It was quizzed or asked in a round, and graded |
| `Grade` | The result, and the dated file holding the quoted answer |

**Worked is not asked.** A block names more entries than any one session can
test, so an entry can sit in front of the user for a full window and never be
questioned. With only the first column, that entry is indistinguishable from one
that was asked and answered well, and silence reads as a pass.

The `Grade` cell is an index, not the record. It carries the grade and names the
log or review file holding the quoted answer, which stays authoritative.
[`grading.md`](grading.md#a-grade-without-the-answer-is-not-a-grade) requires
the answer to sit with the grade, and an inventory of grades without answers is
exactly the calibration failure that rule exists to prevent.

### The retention pick

In order. Stop at the first that yields an eligible entry.

1. **Graded below `solid`, past the lower edge.** A regression outranks an
   uncovered topic — [`readiness.md`](readiness.md#regression).
2. **`Last worked` filled, `Last asked` empty.** Studied and never tested.
   Nothing else in the system surfaces it.
3. **Graded `solid`, past the upper edge.** The decay test.

**Difficulty does not rank.** The entries that go untested are the ones that
looked too small to spend a question on, so ranking by difficulty rebuilds the
bias the second row exists to correct.

### Who draws from it

The **review** is the reader. It picks a round type first, per
[below](#choosing-the-round-type), and the pool picks the entry inside that
type.

The **planner** reads the first and third rows when filling a block, so that a
week is not built entirely out of new material.

The **check-in** writes the columns and never reads them. It closes a day it is
still inside, at a distance well within the lower edge, which makes it the wrong
instrument for a retention question —
[`checkin-protocol.md`](checkin-protocol.md#the-quiz).

The second row belongs to the review alone. An entry that was studied and never
tested needs an ask, not another block: scheduling it again re-reads a topic
from the start, which [`readiness.md`](readiness.md#regression) names as the
wrong response to a gap.

## Do not repeat inside the window

A question used in a round is not used again until enough time has passed for
recall to be a real test. Repeating it sooner produces a grade for memory of
the round rather than memory of the material.

**`not retained` is exempt from the lower edge.** The edge exists because a
recent answer is still in short-term memory, so a re-ask grades the round. An
answer that could not be reconstructed left nothing in memory to contaminate,
and an early re-ask still tests the material.

## Choosing the round type

**Weakest first.** Read `instance/performance/` and pick the round type with the worst
recent grades, unless the user asks for something specific — an explicit
request always wins.

**Cold start**: with no scored history, there is nothing to be weakest. Round
robin through the types, or take the user's choice. This is the normal state
for a new user for the first few weeks and is not a gap to be worked around.

**Regression beats absence.** A type that was solid and has slipped outranks a
type that has never been covered. The slipped one is a claim already being made
in interviews.

## Sourcing phase

Which pool a round draws from is a profile fact, because it changes as
preparation matures. Early on, questions come from material already studied, so
a round tests retention. Later they are drawn cold, so a round tests
performance under an unfamiliar problem.

The current phase is recorded in `instance/profile/state.md` along with the point at
which it changes. A round reads it rather than deciding for itself, so that two
rounds in the same week do not disagree about what they are measuring.
