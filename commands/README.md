# commands

One file per feature. Each is the full spec for a session: what it reads, what
it writes, and where it stops. Generic — the same for every user, like
[`policy/`](../policy/README.md).

| Command | Writes | Run as |
|---|---|---|
| [`onboard.md`](onboard.md) | `instance/profile/`, and the `source` / `entry` rows in `prep.db` | `/preploop onboard [spine \| resources \| material \| search \| verify]` |
| [`plan.md`](plan.md) | `instance/plans/<week>.md`, and the same week on the calendar | `/preploop plan` |
| [`checkin.md`](checkin.md) | `instance/logs/<date>.md`, and at most one calendar reschedule | `/preploop checkin` |
| [`mock.md`](mock.md) | `instance/deep-dives/<project>.md` | `/preploop mock` |
| [`loop.md`](loop.md) | `instance/mocks/<date>-brief.md`, then `instance/performance/<week>.md` | `/preploop loop [prepare \| run]` |
| [`recall.md`](recall.md) | `instance/performance/<date>-recall.md` | `/preploop recall` |
| [`story.md`](story.md) | `instance/stories/<slug>.md`, and the bank index | `/preploop story` |
| [`preploop.md`](preploop.md) | nothing — reports state, names the next thing | `/preploop` |

[`preploop.md`](preploop.md) is the router: it holds the dispatch table for the
rows above, and the bare-`/preploop` status behaviour. It is generic like the
rest.

## How a runtime reaches these

Each host gets a thin wrapper that reads [`AGENTS.md`](../AGENTS.md) then points
at [`preploop.md`](preploop.md) — no rules of its own, and they ship with the
repo:

| Wrapper | Host |
|---|---|
| [`.claude/skills/preploop/SKILL.md`](../.claude/skills/preploop/SKILL.md) | Claude Code — `/preploop …` |
| [`.agents/skills/preploop/SKILL.md`](../.agents/skills/preploop/SKILL.md) | Codex CLI, and the cross-tool `.agents/skills/` standard |
| [`.cursor/skills/preploop/SKILL.md`](../.cursor/skills/preploop/SKILL.md) | Cursor — a mirror of the `.agents/` one |
| [`.gemini/commands/preploop.toml`](../.gemini/commands/preploop.toml) + [`GEMINI.md`](../GEMINI.md) | Gemini CLI — `/preploop …` |

To add another CLI, give it a wrapper that reads `AGENTS.md` then `preploop.md`;
everything else is shared. [`docs/runner-contract.md`](../docs/runner-contract.md)
states what the runtime itself must provide. Nothing in this directory names a
runtime.

## Conventions

Same as [`policy/`](../policy/README.md): point, never paraphrase; cite a file
or a heading anchor, never a section number; angle brackets are placeholders.
A command may link a policy file or override it with a stated reason — it may
not restate it.
