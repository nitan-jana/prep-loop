<!-- leak-check: allow-path — names the personal data files these schemas describe -->

# schema

The structured half of `instance/` is a SQLite database — `instance/prep.db`
(bun:sqlite, gitignored). Its shape is [`tools/schema.sql`](../../tools/schema.sql):
`CREATE TABLE` with `CHECK` and `FOREIGN KEY` constraints that hold on every
write, so a bad enum or a dangling reference never lands.
[`tools/check-db.ts`](../../tools/check-db.ts) covers the few things a constraint
cannot reach — SQLite's own `integrity_check`, and a `grade_from` that has to
name a real markdown log or review.

A handful of concepts stay as YAML under `instance/`, because they are
hand-edited between rounds and never queried across installs:
`profile/habits.yaml`, the week plans in `plans/<iso-week>.yaml`, and the grade
record written into a log or review. [`tools/check-data.ts`](../../tools/check-data.ts)
checks those.

**The constraint file is the contract** — [`tools/schema.sql`](../../tools/schema.sql)
for the database, [`tools/check-data.ts`](../../tools/check-data.ts) for the
YAML. If this file disagrees with either, they are right and this file is the
bug. Neither `check:data` nor `check:profile` is part of the blocking `check`: a
gate whose verdict depends on untracked per-install files would pass on a runner
and for every other clone. See
[`docs/decisions/05`](../../docs/decisions/05-machine-checkable-references.md).

## In the database

[`tools/schema.sql`](../../tools/schema.sql) is short and reads straight
through; this is the map, not a second copy.

| Table | One row is | Notable columns |
|---|---|---|
| `source` | one outside resource — a course site, a question bank | `access` (`free` / `freemium` / `paid` / `owned`), `completeness` (`complete` / `partial` / `stub`), plus the capture facts: who pulled it, when, what it was cross-checked against, how fast it moves |
| `entry` | one thing a mock round may name — a question | the source's own `section` and `identifier`, `title`, `url`, free-text `difficulty`, `locked` when it sits behind the source's paywall; the three coverage fields the check-in, loop and recall own — `worked_on`, `asked_on`, `grade` (with `grade_from`) |
| `entry_tag` | one label on one entry | `kind = 'topic'` is a subject; `kind = 'list'` is membership of a curated set |
| `material` | one thing a plan points you to read — a course or playbook, never named in a round | same shape as `entry`, plus `kind` (`course` / `playbook`), `lessons`, `access` (`free` / `pro`). Keeping these out of `entry` is what makes "a round only names a question" a fact of the schema rather than a `WHERE` clause |
| `claim` | one claim in the identity stack, attribution, a deep-dive or a story | `subject_kind` + `subject_ref`, ordered `seq`, `statement`, `marker` (`verified` / `stated` / `contested`), `checked_against`, and `evidence_command` — required when `marker = 'verified'`, enforced by a `CHECK`. Per [`policy/claims.md`](../../policy/claims.md) |
| `readiness` | one round type | `rung` from the four-rung ladder in [`policy/readiness.md`](../../policy/readiness.md), `provisional` (a single review is provisional), `note` |
| `story` / `story_shape` | a story and the question shapes it answers | `slug` with a `status`; every `slug` has a real `instance/stories/<slug>` |

## In YAML

Angle brackets are placeholders. `?` marks an optional field.

### grade

Written into a log or review, per [`policy/grading.md`](../../policy/grading.md).
The database's `entry.grade` / `material.grade` is the pointer form of the same
thing; this is the full record.

| Field | Rule |
|---|---|
| `value` | one of `solid`, `shaky`, `not retained` |
| `legs` | list of `unprompted` / `cost` / `follow-up`; non-empty below `solid`, empty at `solid` |
| `answer` | required — the quoted answer that produced the grade |
| `source` | required — `log <date>` \| `review <iso-week>` \| `recall <date>`, and the file it names must exist |

### habits

`instance/profile/habits.yaml`: `observed` grows, `retired` is kept. Onboarding
does not fill it — it needs rounds to watch. A markdown view, `habits.md`, is
generated from it (`bun tools/render-views.ts`) and carries a
`generated: do not edit` header; the YAML is the source.

### observations

`instance/profile/observations.yaml`: an `observations` list of curation
findings carried until settled — `subject` (a `prep.db` source slug, or
`install`), `noted` (ISO date), `note`, `status` (`open` / `resolved`), and
`resolved_by`, required once `resolved`. Low-volume and hand-written; it stays
YAML rather than a `prep.db` table for the same reason `habits` does.

### week plan

`instance/plans/<iso-week>.yaml`: `week`, optional `focus`, `days` (each `date`
plus `blocks` of `slot` / `track` / `instruction` / `urls`), and `deferred`.
`instruction` is prose. **No field may record what was there before** — no
`was`, `moved_from`, `attempt`, `history`. The schema has no slot for it, which
is how [`docs/decisions/10`](../../docs/decisions/10-no-history.md) stops being a
rule someone has to remember.
