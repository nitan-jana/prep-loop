<!-- leak-check: allow-path — names the story files and the bank index -->

# Story craft

What makes an experience usable as an interview answer, and what gets rejected.

## One situation, one decision, one outcome

A story is a single decision the user made, the constraint that made it hard,
and what changed as a result.

Two decisions is two stories, and telling them together produces an answer that
never lands on either. A story with no decision in it is a description of a
project, which answers a different question and fails the one that was asked.

The outcome carries a number or a mechanism. Preferably both — what changed,
and how the change was caused.

## The rejection bar

**Reject on sight**: improved, streamlined, optimised, enhanced, scaled,
significantly — used with no number and no mechanism behind it.

These are not weak wording to be tightened later. They are the places where the
story does not yet exist, and writing them down hides that. Push for what the
number was, or what specifically was different afterwards, and if neither can
be produced, the story is not ready and does not go in the bank.

The same bar applies to a claim made in passing inside an otherwise good story.

## What was rejected

**Every story says what alternative was considered and dropped, and why.**

This is the part most often missing and the part an interviewer reaches for
first, because it is the difference between someone who made a decision and
someone who implemented the only thing they knew. An answer that presents the
chosen approach as obvious invites exactly the follow-up it cannot survive.

If nothing was considered, that is the honest answer and the story says so.
Inventing a rejected alternative is worse than not having one, since the
follow-up will ask why it lost.

## The attribution boundary

Before any claim is written, settle three things: whose work it was, who else
was involved, and what phrasing survives someone opening the repository or the
release notes mid-answer.

Everything in [`claims.md`](claims.md) applies to a story exactly as it applies
to `profile/` — the markers, the check-before-writing rule, and the test that a
claim has to survive the source being opened mid-answer.

## The drill sheet

**Every story ends with the follow-ups an interviewer would actually ask, and
the answers.** A story without one is half-finished.

Aim at the weak points on purpose: the unverified number, the part where the
user's contribution shades into someone else's, the alternative that was
rejected, the thing that would have broken at ten times the load. The
follow-ups the story invites are the ones to write down, not the comfortable
ones.

The drill sheet is what makes the story survive contact. The narrative is
rehearsed once; the follow-ups are where it either holds or does not.

## Length and the bank

A story is short enough to tell in a couple of minutes. Longer than that and
the interviewer interrupts, which means the ending — the outcome — is the part
that gets cut.

`stories/<slug>.md` holds the story and its drill sheet. `profile/story-bank.md`
indexes them, with what each one is for.

**The index is updated in the same turn the story is written.** A story bank
that has drifted out of date is one nobody consults, and then the stories
themselves stop being reachable.
