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

## Do not repeat inside the window

A question used in a round is not used again until enough time has passed for
recall to be a real test. Repeating it sooner produces a grade for memory of
the round rather than memory of the material.

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
