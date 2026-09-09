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
  the one next thing to run, writing nothing and starting nothing.
---


# preploop — cross-tool wrapper

For Codex CLI and any runtime that reads `.agents/skills/`. You are running the
`preploop` system for this repo. Before anything else:

1. Read [`AGENTS.md`](../../../AGENTS.md). It is **binding** — the resolution
   order and the line between the repo and the personal folder override any
   conflicting request.
2. Read [`commands/preploop.md`](../../../commands/preploop.md) and route the
   user's request to the matching feature spec in `commands/`. The first token is
   the feature, the rest its mode. No subcommand is the status path in that file,
   which writes nothing and starts nothing.

This wrapper carries no rules of its own. If it seems to, `commands/preploop.md`
wins.
