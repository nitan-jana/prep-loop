# Decisions

Why this repo is shaped the way it is. One decision per file: what was chosen,
what it replaced where something was actually reversed, and the reason.

These records hold the **reasoning**. The rules themselves live in
[`policy/`](../../policy/README.md), [`CLAUDE.md`](../../CLAUDE.md) and the files
each record links. Nothing here restates a rule, and where one of these files
appears to contradict a linked one, the linked file wins.

A decision earns a file when a choice was made and an alternative lost. Anything
that only describes how something works belongs in the file that governs it.

Every record ends with the commits it was derived from, so the diff is one
`git show` away.

**The numbers are shelf order, not chronology.** They group the records the way
the tables below do, so a directory listing reads in the same order as this page.
Most of these decisions were revised more than once and several span the whole
history, so there is no point in time to sort them by — and the leak checker
would reject the dates that would let anyone try.

## The boundary

| Decision | |
|---|---|
| [One line in `.gitignore` is the privacy model](01-one-line-is-the-privacy-model.md) | The personal half stopped being directories to copy out and became a folder git never sees |
| [The leak checker has three tiers and only one blocks](02-the-leak-checker-tiers.md) | A check that cries wolf is one that gets switched off — plus the denylist and the per-install canary |
| [One file leaves the machine, and only when it is sent](03-what-leaves-the-machine.md) | The round brief is self-contained, so an outside interviewer never reads anything else |

## The tools

| Decision | |
|---|---|
| [Bun, and no runtime dependency ever](04-bun-and-zero-runtime-dependencies.md) | Ported off shell and Python; and why a local hook is not redundant with CI |
| [Every reference is machine-checkable](05-machine-checkable-references.md) | No section numbers, no numbered headings, no link to a file a fresh clone lacks |

## The written system

| Decision | |
|---|---|
| [Policy describes the mechanism; profile supplies the parameters](06-mechanism-and-parameters.md) | The founding split, the sweep that removed the parameters hiding in policy, and why templates carry no examples |
| [Point, never paraphrase](07-point-never-paraphrase.md) | Two copies of a rule is one rule and one future bug |
| [Nothing runs on a timer](08-no-scheduler.md) | Scheduled routines were deleted, and so was the every-session check that replaced them |
| [Who writes what, and nobody commits](09-who-writes-what.md) | A session that can edit the rules it runs under cannot be reviewed against anything |
| [Never say what was there before](10-no-history.md) | And the test deciding which knowledge about the past survives |

## Conducting and grading

| Decision | |
|---|---|
| [The cheap input is always refused](11-the-cheap-input-is-refused.md) | One decision across four sessions: no self-report, no hint, no rehearsed weakness, no favourite story |
| [Three grades, and the failed test named beside them](12-three-grades.md) | Resolution added without adding a fourth grade |
| [Never name a question that does not exist](13-never-invent-a-question-name.md) | The rule that made the inventories the largest piece of work in the system |
| [Every claim carries a marker](14-claims-carry-a-marker.md) | And unverifiable is not the same as unverified |
| [Worked is not asked](15-worked-is-not-asked.md) | Two columns instead of one, and the ordering they made possible |
| [Readiness is evidence, not a feeling](16-readiness-is-evidence.md) | Per round type, two consecutive reviews, and extraction is not defence |
| [A cap binds the plan, not the person](17-caps-and-outbound.md) | And a week is graded on what was sent, never on what came back |

## The sessions

| Decision | |
|---|---|
| [The calendar is the delivery](18-the-calendar-is-the-delivery.md) | Mirrored in the same turn, or neither side is written |
| [A bare invocation prints a menu and waits](19-a-bare-invocation-waits.md) | And one session exists that starts nothing at all |
| [A plan is instructions for sessions that have not happened](20-the-week-plan.md) | A partial week is a plan, and every week names one thing |
| [The drain is a day, not a round](21-the-recall-day.md) | The queue outgrew the round draining it, and interleaving is most of the point |

## The project

| Decision | |
|---|---|
| [AGPL, with a contributor licence agreement](22-licence-and-contributions.md) | And a licence reaches software, never prep data |
| [Local first, and the local version stays complete](23-local-first.md) | Automation is deliberately last |
