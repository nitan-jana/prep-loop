<!-- leak-check: allow-path — names the profile files claims are written into -->

# Claims

What makes a statement about the user safe to write down, and what every
statement carries with it.

A claim is anything asserted about the user that an interviewer could
challenge: a number, a scope, a role, a date range, an outcome. Everything in
`instance/profile/` is a claim. So is every line of a story and every sentence of a deep
dive.

## Every claim carries a marker

**`verified`** — checked against the original source, with the command or the
query that proved it recorded alongside. The record is the point: a marker
without the check attached is a claim asserting that someone once checked,
which is not evidence.

**`stated`** — nothing has checked it, and the source names why. Not a lesser
claim and not a problem: plenty of the strongest work is private, owned by
someone else, or was never in a repository at all.

The reason is not decoration. A quote from the session that produced a claim is
the claim restating itself, and a source column holding only that has recorded
provenance for the wording while recording nothing about the truth of it. See
[unverifiable is not unverified](#unverifiable-is-not-unverified).

**`contested`** — two sources disagree. Both readings are recorded, and neither
is quietly picked.

**No claim is unlabelled.** An unmarked claim reads as verified to whoever
comes back to the file later, including the user. That is how an unverified
number gets treated as a fact.

## Verify before writing, not after

A number goes into a file **after** it has been checked, or it goes in marked
`stated`. There is no third option where it is written now and confirmed later.

The failure this prevents: one unverified number, written once, gets copied
into a resume line, a story, a deep dive and an outbound message. Retracting it
means finding every copy, and the copies do not know about each other.
Checking at the point of writing costs a minute; retraction costs an afternoon
and an interview.

**Any claim containing a number is checked before it lands.** Counts,
durations, percentages, team sizes, load figures. The rule is mechanical on
purpose — it catches the error class rather than one remembered correction.

## Unverifiable is not unverified

Both land on `stated`, and collapsing them is how a checkable claim sits
unchecked for months behind a marker that read as settled.

**Unverifiable** — no access, and no amount of effort changes that. Work owned
by someone else, a system since shut down, output that was never under version
control, a decision made in a conversation nobody logged, anything under an
agreement that forbids showing it. The marker is the final answer, the source
says which obstacle it hit, and nothing further is owed.

**Unverified** — checkable by anyone willing to go and look, and nobody has.
Every claim about a public dependency belongs here: what a library supported at
the time, what shipped in which release, which options it offered. So does
anything sitting in a repository that can still be opened.

The second kind is the dangerous one, and the marker is not why. A claim about a
private system can only be doubted. A claim about a public library can be
**contradicted**, mid-answer, by someone who has read its changelog — and a
candidate wrong about a dependency they chose is in a worse position than one
vague about a number nobody can check. It is also the cheap kind to settle,
which is what makes leaving it the bad trade.

So: **a `stated` claim whose source names no obstacle is unfinished work.**
Either the obstacle gets written down, or the check gets run.

## `contested` is the valuable one

It falls out for free the moment there are two sources, and it is the marker
that most often saves an interview.

A resume says one thing and a public profile says another. A recruiter has both
open. The candidate who knows which is which, and why, is in a different
position from the one finding out during the call.

So a contested claim is not resolved by picking the more flattering source, and
not resolved by picking the more recent one. Both are recorded with where each
came from, and the resolution is a decision the user makes explicitly.

## What the markers are for downstream

They are not bookkeeping. They change how the system behaves:

- **A round pushes harder on a `stated` claim** than on a `verified` one, per
  [`interviewing.md`](interviewing.md#push-once-at-minimum). That is where a
  candidate gets caught, so that is where practice is worth most.
- **A deep-dive round opens on the weakest-evidenced claim**, not the most
  interesting one.
- **A story with an unverified number in it does not enter the bank**, per
  [`story-craft.md`](story-craft.md#the-rejection-bar).

## Upgrading

A `stated` claim becomes `verified` when evidence arrives — access to a
repository, a released artifact, an old thread. The upgrade is an explicit
step that rewrites the marker and attaches the command, and it says nothing
about the claim having been doubted.

**Never silently.** A marker that changes without the evidence being recorded
is worse than the original `stated`, because it now looks checked.

Downgrades happen too. Evidence that contradicts a `verified` claim makes it
`contested` at minimum, and the original command stays in the file so the
disagreement can be read.

## The attribution boundary

Before a claim about a project is written, three things are settled: whose work
it was, who else was involved, and what phrasing survives someone opening the
repository or the release notes mid-answer.

That last test is the operative one. It is not about modesty — it is that a
claim which cannot survive the source being opened is a claim that will be
opened. Shared work is described as shared, and the user's part in it is
described precisely, which is nearly always more impressive than the vague
version it replaces.
