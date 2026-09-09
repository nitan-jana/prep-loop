<!-- leak-check: allow-path — names the folder the brief is the one exception to -->

# One file leaves the machine, and only when it is sent

The round brief is self-contained: no links out, into the profile, into policy,
into the logs, or into the week plan. Everything a round needs is written into
the brief itself.

## Why it is self-contained

The first reason is functional. An interviewer that is **not this repo** — a
voice session, a separate tool, a person handed the file — reads only the brief.
Every link out is something that interviewer cannot see, and the round quietly
loses whatever was on the other side of it, with nothing on the page to say so.

The second reason arrived later and is the stronger one. **The brief is the
privacy boundary.** It is the only artifact that ever leaves the machine, and
only when the user sends it. Because it already contains everything a round
needs, nothing else has to travel: an external interviewer never sees the
profile, the resume, the logs or the scores.

Self-containment stopped being a convenience for the reader and became the
mechanism that makes an outside interviewer safe.

## What it rules out of the brief

No scores, no readiness rungs, no resume, no profile facts beyond the claims the
round is meant to press. A brief that carries them has moved the boundary
without anyone deciding to.

## Two neighbours held to the same line

**Nothing paywalled is copied into this repo, and no fetcher for a paid source
ships with it.** What ships is a stub the user fills against their own account,
holding identifiers and titles only — enough to name a question, never the
contents. The toolkit distributes fetchers, not material: a public list has real
data behind it, a paid one has a subscription behind it, and redistributing what
is on the other side of that is both a terms problem and an unfriendly act
toward a vendor the user is paying.

**A grading pass is separate from conducting.** The external interviewer
conducts and records; grading happens here, against the rubric and the anchors.
That keeps grades comparable across interviewers, and it is why the transcript
contract specifies a format rather than a verdict.

## Where it lives

- [`policy/mocks.md`](../../policy/mocks.md) — the brief, and the transcript contract
- [`templates/round-brief.md`](../../templates/round-brief.md) — the shape, with the boundary stated in its preamble
- [`.claude/skills/onboard/references/catalogs.md`](../../.claude/skills/onboard/references/catalogs.md) — what an inventory of a paid source may hold

*In the history:* `6f7a57c` `e72e519` `2fb38d6` `7a1933e` `1904e9c`
