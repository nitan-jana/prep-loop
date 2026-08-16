<!-- leak-check: allow-path — this file is the directory map -->

# Repo map

Where everything lives, who writes it, and what is versioned.

## The repo and the folder

Two kinds of thing, kept apart by one line in `.gitignore`.

**The repo** is public and holds no fact about anyone, with one deliberate
exception: `LICENSE` carries a copyright line, which is a name and a year by
definition. It is the only tracked file the leak checker does not read.

| | Holds |
|---|---|
| `policy/` | This directory. The mechanism. |
| `.claude/skills/` | How a session is invoked. Nothing else. |
| `templates/` | The blank shape of everything the system produces. |
| `tools/` | The checkers. |
| `docs/` | How to use it, and anything the policy files assume rather than explain. |
| `.githooks/` | The pre-commit hook, opted into per clone. |
| `.github/` | The workflow that runs the checkers on every push. |
| `LICENSE` `CONTRIBUTING.md` | The terms, and what is asked of a contributor. |

**`instance/`** is a plain folder inside the clone, ignored by git. It is not a
repository, has no remote, and nothing in it is ever pushed anywhere.

| | Holds |
|---|---|
| `instance/profile/` | Facts, claims, habits, cadence. Written by onboarding. |
| `instance/curriculum/` | One inventory per resource in use. |
| `instance/plans/` | What is planned, one file per week. |
| `instance/logs/` | What happened, one file per working day. |
| `instance/performance/` | Scored rounds, one file per review. |
| `instance/mocks/` | Round briefs and transcripts. |
| `instance/stories/` | Interview stories and their drill sheets. |
| `instance/deep-dives/` | Project deep-dive answers. |
| `instance/private/` | The denylist. |
| `instance/intake/` | Documents dropped in from outside. |

**That one line is the privacy model.** Not a convention, not a habit, not a
rule anyone has to remember at commit time. There is no state of this repo in
which a personal file is tracked.

[`tools/leak-check.ts`](../tools/leak-check.ts) covers the other half of the
problem: a tracked file that stays in the repo but quotes something out of the
folder. The gitignore keeps files apart; the checker keeps contents apart.

## Artifact names

Dated artifacts sort correctly and never collide. Week identifiers are ISO
week-numbered.

| Artifact | Path |
|---|---|
| Week plan | `instance/plans/YYYY-Www.md` |
| Daily log | `instance/logs/YYYY-MM-DD.md` |
| Review scores | `instance/performance/YYYY-Www.md` |
| Round brief | `instance/mocks/YYYY-MM-DD-brief.md` |
| Round transcript | `instance/mocks/YYYY-MM-DD-transcript.md` |
| Story | `instance/stories/<slug>.md`, indexed in `instance/profile/story-bank.md` |
| Deep dive | `instance/deep-dives/<project-slug>.md` |
| Resource inventory | `instance/curriculum/<source-slug>.md` |

## Who writes what

The column that matters is the last one. A skill writing outside its row is a
bug, not a judgement call.

| Artifact | Written by | Never written by |
|---|---|---|
| Week plan | `plan` | any other skill |
| Daily log | `checkin` | `mock-loop` |
| Round brief | `mock-loop`, at prep time | `checkin` |
| Round transcript | an external interviewer | everything here |
| Review scores | `mock-loop` | `checkin` |
| Stories and the bank index | `story` | — |
| Deep dives | `mock`, or by hand | — |
| Everything under `instance/profile/` | `onboard` | every other skill |
| Resource inventories | `onboard` | every other skill |
| The denylist | `onboard` | every other skill |
| Calendar, a whole week | `plan` | every other skill except `checkin` |
| Calendar, one reschedule | `checkin` | `mock`, `mock-loop`, `story` |
| `policy/`, `templates/`, skills | the user, deliberately | every skill |
| Nothing at all | `prep` | — |

**`prep` writes nothing, and that is its whole contract.** It reports where the
install stands and names one thing to run. A place to look when the thread has
been lost has to be safe to open without thinking, which it stops being the
moment it can also change something.

**No skill writes its own instructions.** A session that can edit `policy/` or
a skill file is a session whose behaviour cannot be reviewed against anything.
Changes there are made deliberately, by the user, outside a run.

## Commits

**Only the repo is versioned.** `instance/` is a folder, not a repository. The
artifacts in it are append-only by nature — one file per day, one per week — so
reading the new file is the review, and there is nothing a diff would add.

The cost is that a bad edit to `instance/profile/` has no undo. That is what a
backup is for, and a backup is the user's own arrangement.

**No skill commits.** Skills write files and stop. The user reads the working
tree and commits what they want kept, which for `instance/` is nothing, because
none of it is tracked.

Commits to the repo itself carry a **subject line only**, in the form
`type: summary`, matching the existing log. No body — the reasoning belongs in
the file that changed, not restated in a message nobody greps.
