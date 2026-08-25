<!-- leak-check: allow-path — names the profile the parameters are read from -->

# Policy describes the mechanism; profile supplies the parameters

The founding split, present in the first version of `CLAUDE.md` and still the
sentence everything else hangs off. How many blocks, how long, which days carry
which work, when the loop runs, what timezone — every one is read from the
profile, so policy stays true for anyone.

## The test that decides which side something belongs on

Not "does this contain a name or a date" — that is only what the leak checker
can mechanically catch. The test is **would this be true for a user who isn't
this one.**

A six-block day, a weekend loop, a named framework and an early-morning session
all pass the first test and fail the second. The cadence tier of the leak
checker exists to surface exactly that class: not a privacy leak, a design
smell.

## The pass that proved the rule was not yet held

Policy was written, reviewed, and still had one user's parameters sitting in it,
each disguised as a fact about the mechanism. They came out later, in one sweep:

| Was in policy | Is now |
|---|---|
| "Roughly eight short lines" for a calendar description | A ceiling in the profile, since it depends on the device it is read on |
| `A · DSA`, `C · System design` as the event title example | Placeholders, with both halves read from the schedule |
| "Roughly a month of rounds" before the anchors fill | A condition — enough rounds to have produced a clear example of each grade |
| The retention window described only in shape | Both edges as profile values, since they depend on how much material is in rotation |
| "Employer-owned code" as the example of unverifiable work | Work owned by someone else, a system shut down, output never under version control |
| "The three sessions" | "The three recurring sessions", because other sessions exist |

Each looked like a description of how the thing works. Each was a number or a
name that belonged to one install, and would have been wrong for the second one.

## Which is why templates carry no examples

Angle brackets are placeholders. An example weekday, an example vendor or an
example number does not appear in one, because **an example is one user's setup
shipped to everyone, and it gets left in place more often than it gets
replaced.** A template is a shape, not a sample.

Two templates are deliberately left unfillable, and the exception proves the same
rule from the other side. `habits.md` needs rounds to observe and
`grading-anchors.md` needs real graded answers, so both stay empty and onboarding
is told not to ask. A weak interview habit cannot be self-reported, and an
invented anchor calibrates the grader against a fiction — in each case the
plausible placeholder would be worse than the blank.

## Why the drift is worth expecting

Every one of those arrived as a helpful concrete detail. Prose about a mechanism
reads better with an example in it, and the example is almost always the author's
own setup. That is the failure mode, and it is why the rule is stated as a test
rather than as a prohibition on names.

## Where it lives

- [`CLAUDE.md`](../../CLAUDE.md) — the principle and the test
- [`policy/README.md`](../../policy/README.md) — no dates, no proper nouns, no cadence
- [`templates/profile/schedule.md`](../../templates/profile/schedule.md) — where the parameters landed
- [`templates/README.md`](../../templates/README.md) — the conventions, and the two files left blank

*In the history:* `0aa6508` `c615b2f` `de76e63` `282ce58` `f7e136f` `7a1933e` `2fb38d6` `ff55d76` `dbf928c`
