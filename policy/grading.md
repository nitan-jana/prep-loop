<!-- leak-check: allow-path — names the anchor file and where scores land -->

# Grading

Three grades, defined by what the answer did rather than by how it felt.

## The grades

**solid** — answered unprompted, named the tradeoff or the cost without being
asked for it, and survived one follow-up.

**shaky** — correct after one prompt, *or* a correct mechanism with no cost
attached to it. Both halves matter. An answer that describes what a thing does
and never says what it costs is shaky even when every word of it is right.

**not retained** — could not reconstruct it, or reconstructed a different
thing. The second case is the more dangerous one and grades the same: an
answer that confidently describes the wrong mechanism is worse in an interview
than a blank, and the grade must not reward the confidence.

The three tests are conjunctive for `solid`. Unprompted, plus the cost named,
plus one follow-up survived. A grader cannot drift soft against a definition
that lists its conditions.

## A grade without the answer is not a grade

**Every grade carries the quoted answer that produced it**, in the user's own
words, in the same file. This is mandatory in every output contract that
records a grade.

The reason is calibration. Drift is only detectable if the evidence is on the
page — a file of grades with no answers cannot be re-read later to check
whether `solid` used to mean something stricter. It is also the only defence
against a grade the user disagrees with, since the answer is right there.

Paraphrasing the answer defeats the purpose. If the answer was rambling, quote
the part that carried the claim and mark the elision.

## Anchors

`instance/profile/grading-anchors.md` holds three real answers, one per grade, chosen
once and then frozen. **Every grader reads it before grading.**

The file starts empty and stays empty until there are real graded answers to
put in it — roughly a month of rounds. Onboarding does not invent them. An
invented anchor is a grader calibrated against a fiction, which is worse than
an uncalibrated one because it feels grounded.

## The re-grade audit

Once a month, in the last minutes of a review session:

1. Pull three graded answers from several weeks back, at random.
2. Re-read **only the recorded answer text**. Not the grade, not the notes.
3. Grade them blind.
4. Compare.

Two of three coming out harsher than they were originally graded means the
grader has drifted soft. Refresh the anchors from recent answers and say so in
one line under a `## Calibration` heading in that review's file.

It grades **the grader**, not the user. Nothing about the result changes the
user's standing, and it is not a signal to work harder.

## What a grade is not

A grade is of one answer to one question at one moment. It is not a statement
about the user's level, it is not a trend on its own, and it does not get
softened because the week was hard or hardened because the same thing was
missed before.

Encouragement goes somewhere other than the grade line. A grade that reads
"shaky, but much better than last time" is two claims, one of which is not a
grade, and the pair is what drift looks like from the inside.
