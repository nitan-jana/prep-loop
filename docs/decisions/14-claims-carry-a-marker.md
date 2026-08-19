<!-- leak-check: allow-path — names the profile every claim is written into -->

# Every claim carries a marker

`verified` with the command that proved it, `stated` with the obstacle that
stopped it, or `contested` with both readings. **No claim is unlabelled** — and
that covers every line of a story and every sentence of a deep dive, not just the
profile.

## Why unlabelled is the dangerous state

An unmarked claim reads as verified to whoever comes back to the file later,
including the user. That is how an unverified number gets treated as a fact.

For the same reason `verified` carries its command **verbatim and re-runnable**.
A marker without the check attached is a claim asserting that someone once
checked, which is not evidence — and "checked against the repository" is that
claim, not a source.

## Verify before writing, not after

A number goes in checked, or it goes in marked `stated`. There is no third state
where it is written now and confirmed later.

One unverified number, written once, gets copied into a resume line, a story, a
deep dive and an outbound message — and the copies do not know about each other.
**Checking at the point of writing costs a minute; retraction costs an afternoon
and an interview.** The rule is deliberately mechanical, catching the error class
rather than one remembered correction.

## The split that came later: unverifiable is not unverified

Both land on `stated`, and collapsing them is how a checkable claim sits
unchecked for months behind a marker that read as settled.

**Unverifiable** — no access, and no effort changes that. The marker is the final
answer and nothing further is owed.

**Unverified** — checkable by anyone willing to look, and nobody has. Every claim
about a public dependency belongs here: what a library supported at the time,
what shipped in which release.

The second is the dangerous one, and the marker is not why. A claim about a
private system can only be **doubted**. A claim about a public library can be
**contradicted**, mid-answer, by someone who has read its changelog — and a
candidate wrong about a dependency they chose is worse off than one vague about a
number nobody can check. It is also the cheap kind to settle, which is what makes
leaving it the bad trade.

So a `stated` claim whose source names no obstacle is unfinished work.

## The markers are not bookkeeping

They change behaviour downstream, which is the argument for the whole scheme. A
round pushes harder on a `stated` claim, a deep dive opens on the
weakest-evidenced one rather than the most interesting one, a story with an
unverified number does not enter the bank, and an outbound artifact — the only
thing here that reaches an audience before anyone reads it back — leads with a
claim that is `verified` or `stated` with its obstacle named.

`contested` earns its place separately: it falls out free the moment there are
two sources, and it is the marker most likely to save an interview. A recruiter
with a resume and a public profile both open has already found it. So it is never
resolved by picking the more flattering source, nor the more recent one.

## The attribution boundary

Before any claim about a project: whose work it was, who else was involved, and
**what phrasing survives someone opening the source mid-answer.**

That last test is the operative one, and it is not about modesty. A claim that
cannot survive the source being opened is a claim that will be opened. Shared
work is described as shared, and the user's part described precisely — which is
nearly always more impressive than the vague version it replaces.

## Where it lives

- [`policy/claims.md`](../../policy/claims.md) — the markers, the two kinds of `stated`, the boundary
- [`.claude/skills/onboard/references/verifying.md`](../../.claude/skills/onboard/references/verifying.md) — how a marker is earned, in commands

*In the history:* `9e1c038` `db9c5c8` `927c339` `80b5ff8` `282ce58`
