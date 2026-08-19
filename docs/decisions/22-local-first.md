# Local first, and the local version stays complete

Everything runs on one machine, out of one clone, with nothing installed. A
hosted tier is on the roadmap; anything it adds is added capability, **never a
piece carved out of what is here.**

## Why the order is this way round

**Automation is deliberately last.** Every session is a pure function of files on
disk, which is exactly what a scheduler wraps later. Building it the other way
around is harder, and it would have forced the personal half onto a remote —
undoing [the privacy model](01-one-line-is-the-privacy-model.md) before the system
was even proven.

The same argument applies to voice rounds: they belong in a separate project,
with only the round brief leaving the machine and the grading staying on it,
which is possible only because [the brief is already
self-contained](03-what-leaves-the-machine.md).

## The commitment written beside the roadmap

If the local version ever stops being complete on its own, the reason for
building it this way has gone. That sentence is in the readme under the hosted
tier, where it constrains the thing it sits under.

## What the readme is and is not for

The readme carried a build order and a status section through most of the
project — which stage was done, which sessions had never executed, how many
tests there were. All of that was internal bookkeeping written for one reader,
and it was cut once the system had run a full week.

What replaced it leads with what the thing does and what it refuses to do, then
a roadmap. **Nothing that goes stale between commits belongs on the front
page**, because a stale status line is worse than no status line: it is a claim,
and it is wrong.

## Where it lives

- [`README.md`](../../README.md) — what it does, private by design, and the roadmap
- [`docs/getting-started.md`](../getting-started.md) — the walkthrough from clone to running

*In the history:* `51dfc8b` `3ce9aee` `bab4cf9` `71c4754` `854f522` `6006c9a` `be37836` `f58f0f4`
