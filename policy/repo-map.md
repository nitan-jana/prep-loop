<!-- leak-check: allow-path — this file is the directory map -->

# Repo map

Where everything lives, who writes it, and how it gets committed.

## The two halves

| Shareable | Holds |
|---|---|
| `policy/` | This directory. The mechanism. |
| `runbooks/` | One file per scheduled routine, holding its complete logic. |
| `.claude/skills/` | How a session is invoked. Nothing else. |
| `templates/` | Blank profile files, blank artifacts, the catalog format. |
| `tools/` | The checkers. |
| `docs/` | Architecture, writing a runbook, the calendar contract. |

| Personal | Holds |
|---|---|
| `profile/` | Facts, claims, habits, cadence. Written by onboarding. |
| `curriculum/` | One inventory per resource in use. |
| `plans/` | What is planned, one file per week. |
| `logs/` | What happened, one file per working day. |
| `performance/` | Scored rounds, one file per review. |
| `mocks/` | Round briefs and transcripts. |
| `stories/` | Interview stories and their drill sheets. |
| `deep-dives/` | Project deep-dive answers. |
| `private/` | The denylist. |
| `intake/` | Documents dropped in from outside. Gitignored. |

The left column carries no personal data at any point, which is what makes
publishing a copy rather than a scrubbing project. See
[`CLAUDE.md`](../CLAUDE.md) for the rule and
[`tools/leak-check.ts`](../tools/leak-check.ts) for the enforcement.

## Artifact names

Dated artifacts sort correctly and collide never. Week identifiers are ISO
week-numbered.

| Artifact | Path |
|---|---|
| Week plan | `plans/YYYY-Www.md` |
| Daily log | `logs/YYYY-MM-DD.md` |
| Review scores | `performance/YYYY-Www.md` |
| Round brief | `mocks/YYYY-MM-DD-brief.md` |
| Round transcript | `mocks/YYYY-MM-DD-transcript.md` |
| Story | `stories/<slug>.md`, indexed in `profile/story-bank.md` |
| Deep dive | `deep-dives/<project-slug>.md` |
| Resource inventory | `curriculum/<source-slug>.md` |

## Who writes what

The column that matters is the last one. An actor writing outside its row is a
bug, not a judgement call.

| Artifact | Written by | Mode | Never written by |
|---|---|---|---|
| Week plan | `weekly-planner` runbook | unsupervised, opens a PR | any skill, unprompted |
| Daily log, evidence half | `daily-checkin` runbook | unsupervised, opens a PR | — |
| Daily log, quiz half | `checkin` skill | interactive, no commit | `mock-loop` |
| Round brief | `review-brief` runbook | unsupervised, opens a PR | `mock-loop` |
| Round transcript | the voice interviewer | external | everything in this repo |
| Review scores | `mock-loop` skill | interactive, no commit | `checkin` |
| Stories and the bank index | `story` skill | interactive, no commit | — |
| Deep dives | `mock` skill, or by hand | interactive, no commit | any routine |
| Everything under `profile/` | `onboard` skill | interactive, no commit | every routine |
| Resource inventories | `onboard` skill | interactive, no commit | every routine |
| The denylist | `onboard` skill | interactive, no commit | every routine |
| Calendar, a whole week | `weekly-planner` runbook | unsupervised | every skill except `checkin` |
| Calendar, one reschedule | `checkin` skill | interactive | `mock`, `mock-loop`, `story` |
| `policy/`, `runbooks/`, skills | the user, deliberately | interactive | every routine |

Two rules fall out of that table and are worth stating on their own:

**A routine never writes `policy/`, `runbooks/` or `profile/`.** Those are the
inputs it runs on. A routine that can edit its own specification is a routine
whose behaviour cannot be reviewed.

**No skill commits.** Interactive skills write files and stop; the user reads
the diff and commits. The review surface for supervised work is the working
tree, so a commit would only skip past it.

## Commits and branches

**Subject line only**, in the form `type: summary`, matching the existing log.
No body — the reasoning belongs in the file that changed, not restated in a
message nobody greps. No co-author trailer.

**Unsupervised routines branch, commit and open a pull request.** They never
merge and never push to the default branch. The branch name follows the
artifact it produces — a week plan lands on a branch named for that week. An
existing branch for the same artifact is reused and force-pushed rather than
given a suffixed twin.

The split is about who reviews the diff. A person is present for a skill, so a
plain file write is reviewable before it becomes a commit. Nobody is watching a
scheduled run, so the pull request is the review surface, and its body carries
the summary so the page reads without opening the diff.
