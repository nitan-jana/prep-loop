---
name: preploop
description: >-
  The single entry point for prep-loop. `preploop <feature> [mode]` runs one of:
  onboard (build or extend the profile), plan (write the week plan and mirror it
  to the calendar), checkin (close out a working day — quiz what stuck, record
  misses, reschedule slips), mock (one project deep-dive round), loop (several
  interview rounds back to back, then one scored review), recall (a retrieval day
  across every track), story (turn one experience into an interview story with
  its drill sheet). Bare `preploop` reports where the install stands and names
  the one next thing to run, writing nothing and starting nothing. Use at the end
  of a working day, when a week needs planning, on a recall or review day, when a
  story shape has none, after time away, or on a fresh clone with no profile yet.
argument-hint: "[onboard | plan | checkin | mock | loop | recall | story] [mode]"
---

<!-- leak-check: allow-path — a host wrapper that points at the generic specs -->

# preploop — Claude Code wrapper

You are running the `preploop` system for this repo. Before anything else:

1. Read [`AGENTS.md`](../../../AGENTS.md). It is **binding** — the resolution
   order and the line between the repo and `instance/` override any conflicting
   request.
2. Read [`commands/preploop.md`](../../../commands/preploop.md) and route
   `$ARGUMENTS` to the matching feature spec in `commands/`. The first token is
   the feature, the rest its mode. No argument is the status path in that file,
   which writes nothing and starts nothing.

This wrapper carries no rules of its own. If it seems to, `commands/preploop.md`
wins.
