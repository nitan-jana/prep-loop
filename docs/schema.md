# The database

`instance/prep.db` (bun:sqlite, gitignored) holds the resource inventory —
sources, their entries and material, and the coverage the check-in, loop and
recall record against them. Nothing else is in it.

Its shape is [`tools/schema.sql`](../tools/schema.sql): `CREATE TABLE` with
`CHECK` and `FOREIGN KEY` constraints that hold on every write, so a bad enum or
a dangling reference never lands. [`tools/check-db.ts`](../tools/check-db.ts)
covers the two things a constraint cannot reach — SQLite's own `integrity_check`,
and a `grade_from` that must name a real markdown log or review. `bun run
check:db` runs it. It is not part of the blocking `check`, because a gate whose
verdict depends on an untracked per-install file would pass on a runner and for
every other clone — see
[`docs/decisions/05`](decisions/05-machine-checkable-references.md).

## Opening it

`open()` from [`tools/db.ts`](../tools/db.ts) is the way in — it resolves the
path, applies the schema to a fresh file, and turns foreign keys on, which
SQLite requires per connection and will otherwise leave off:

```
import { open } from "./db.ts";
const db = open();
const rows = db.query("SELECT identifier, title, url FROM entry WHERE source_slug = ?").all(slug);
```

A runtime other than Bun brings its own client and does the same three things —
[`runner-contract.md`](runner-contract.md#what-it-must-supply). The constraints
live in the file, not in the caller, so any client that can write at all writes
safely.

## The tables

[`tools/schema.sql`](../tools/schema.sql) reads straight through; this is the
map, not a second copy.

| Table | One row is | Notable columns |
|---|---|---|
| `source` | one outside resource — a course site, a question bank | `access` (`free` / `freemium` / `paid` / `owned`), `completeness` (`complete` / `partial` / `stub`), plus the capture facts: who pulled it, when, what it was cross-checked against, how fast it moves |
| `entry` | one thing a mock round may name — a question | the source's own `section` and `identifier`, `title`, `url`, free-text `difficulty`, `locked` when it sits behind the source's paywall; the three coverage fields the check-in, loop and recall own — `worked_on`, `asked_on`, `grade` (with `grade_from`) |
| `entry_tag` | one label on one entry | `kind = 'topic'` is a subject; `kind = 'list'` is membership of a curated set |
| `material` | one thing a plan points you to read — a course or playbook, never named in a round | same shape as `entry`, plus `kind` (`course` / `playbook`), `lessons`, `access` (`free` / `pro`). Keeping these out of `entry` is what makes "a round only names a question" a fact of the schema rather than a `WHERE` clause |

## Everything else stays a file

Claims, readiness, the story index, habits and observations are low-volume and
hand-written, so they stay as prose or small files under `instance/profile/` —
not worth a table, not worth a validator. `habits.md` is plain markdown the
review appends to; `observations.yaml`, `schedule.yaml` and `outbound.yaml` are
short structured files kept by hand. They are YAML rather than `prep.db` tables
because nothing generates or refreshes them — a table earns its place when a
fetcher writes it, and a hand-edited row in a database is a row nobody can read
in a diff.

A grade written into a log or review, per
[`policy/grading.md`](../policy/grading.md), carries `value` (`solid` / `shaky`
/ `not retained`), the quoted `answer`, and a `source` — `log <date>` /
`review <iso-week>` / `recall <date>` — whose file must exist. `check-db`
verifies that last part against every `entry.grade_from` and `material.grade_from`.
