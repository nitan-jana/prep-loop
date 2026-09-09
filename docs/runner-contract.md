<!-- leak-check: allow-path — names the folders a runtime is scoped to -->

# Runner contract

What a runtime other than Claude Code has to provide for
[`commands/`](../commands/README.md) to run. The command files name no runtime;
this is the seam between them and one.

## What it must supply

**A preamble slot.** [`AGENTS.md`](../AGENTS.md), loaded ahead of every session,
in full, before any command file. It carries the resolution order and the line
between the repo and the folder — a session that has not read it cannot be
trusted to stay on the right side of that line.

**Named command invocation.** One command, `preploop`, taking `<feature>
[mode]`. [`commands/preploop.md`](../commands/preploop.md) is the spec: its
dispatch table routes the first token to a sibling `commands/<feature>.md`, and
no argument is the status path. A feature invoked with no mode prints its menu
and waits; it never guesses which was meant, per
[`docs/decisions/19`](decisions/19-a-bare-invocation-waits.md). Four host
wrappers ship with the repo (Claude Code, Codex CLI / `.agents`, Cursor, Gemini
CLI — see [`commands/README.md`](../commands/README.md#how-a-runtime-reaches-these));
each is a ~12-line pointer at `AGENTS.md` then `commands/preploop.md`. Another
runtime adds one the same way.

**Filesystem read and write, scoped to the clone.** Every command reads
`policy/`, `commands/`, `templates/` and `instance/`, and writes only under
`instance/`. Nothing reaches outside the clone. `instance/` is not
version-controlled and the runtime must not make it so.

**A shell.** `gh` for code-host history, `date` for the working week, and
`bun run check` / `bun tools/*` for the checks. No network beyond `gh` and the
fetches an onboarding pull makes.

**A calendar capability.** Six operations, named generically in
[`policy/calendar.md`](../policy/calendar.md#tool-per-operation): `list_events`,
`search_events`, `list_calendars`, `create_event`, `update_event`,
`delete_event`. How they bind to a real calendar, and how those tools are
approved, is the runtime's own setup and stays out of the tracked tree. A
runtime with no calendar runs every command except the mirror step in `plan` and
the reschedule in `checkin`.

## What it must not do

- Run anything on a timer, or scan for gaps before doing what it was asked —
  [`docs/decisions/08`](decisions/08-no-scheduler.md).
- Let a session write outside `instance/`, or commit anything —
  [`policy/repo-map.md`](../policy/repo-map.md#who-writes-what).
- Carry any fact about the user in its own configuration. Those come from
  `instance/profile/`, read at runtime.
