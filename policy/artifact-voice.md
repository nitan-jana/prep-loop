<!-- leak-check: allow-path — names the artifacts the rules govern -->

# Artifact voice

Three rules for anything the user reads as part of the routine: week plans,
daily logs, calendar event descriptions, round briefs, review write-ups.

They apply because these are read every day. A rule that would be pedantic in a
document read once is load-bearing in one read three hundred times.

## Minimal

**What to do, the links, and anything deferred. Nothing else.**

No rationale. No "why this matters". No restating policy — a plan that explains
the caps is a plan competing with `policy/caps.md` and eventually contradicting
it. The reasoning is in this repo and the user can ask for it in a session.

Roughly eight short lines is the ceiling for a calendar description. A wall of
text in a calendar entry does not get read, which makes a thorough description
strictly worse than a terse one.

Concretely, a block description is: the task, the link to the material, and
what to skip. If it needs more than that, the block was mis-scoped.

## Instructions, never completion state

**A plan says what is planned. A log says what happened.** They are different
files because they are different claims, and merging them produces a document
that is wrong in one half whichever way it is read.

Nothing gets marked done on a calendar event. Not a tick, not a strikethrough,
not a "(done)". The calendar carries instructions for a session; whether the
session happened is a fact about the past and lives in the day's log.

The same split governs the week plan: it is not annotated as the week
progresses. What actually happened accumulates in the logs.

## No history

**Never say what was there before.**

Not "moved from an earlier day". Not "displaced by the deep dive". Not
"deferred from last week". Not "(which did not happen)". Not a `Was` column in
a deferred table. Not "third attempt at this one".

A block says what to do in that session, full stop. A deferred item is a plain
instruction with no account of how it got there. This holds for calendar
descriptions, week plans, logs and briefs alike.

The reason it is a hard rule rather than a style preference: a trail of
displacement notes turns every artifact into a record of what the user failed
to do, and these get read every day. The information is not even useful — the
planner can see the slip from the logs, and the user gains nothing from being
reminded of it at the top of the thing they are about to work on.

**The log is the one place the past belongs**, and even there it is recorded as
what happened, not as a comparison against what was intended.

## What this rules out, concretely

| Not this | This |
|---|---|
| `Deferred from the previous week — attempt 2` | `Finish the traversal set` |
| `Moved here after the design block ran over` | `Design: the rate limiter question` |
| `~~Blocked C~~ done` | nothing on the event; the log records it |
| `This block matters because recall decays fastest early` | `Redo the three problems from the earlier set` |
| `See policy/caps.md — one large item a day` | the item, already within the cap |
