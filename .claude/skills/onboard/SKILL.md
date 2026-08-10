---
name: onboard
description: Interview a user into a complete profile for this repo, verifying every claim it can against the original source. Use when the repo has no profile yet, when one section needs re-running, or when new evidence has arrived that could upgrade stated claims to verified.
---

<!-- leak-check: allow-path — this skill's entire output is the personal half -->

# onboard

Produces `instance/profile/`. It is the entry point — the first thing anyone touches,
and the only thing that writes a personal fact into this repo.

Two principles. Everything else follows from them.

**Nothing gets written that cannot be defended to an interviewer who opens the
source mid-answer.**

**The first answer to any question is a resume line; the second is the truth.**
So every answer gets pushed on, including the good ones.

## Required reading

Source of truth. Nothing below restates them. If this file appears to
contradict one, the linked file wins and this file is the bug.

- [`policy/claims.md`](../../../policy/claims.md) — markers, verify before writing, the attribution boundary
- [`policy/interviewing.md`](../../../policy/interviewing.md) — one question then wait, push once, never supply the word
- [`policy/story-craft.md`](../../../policy/story-craft.md) — the rejection bar, applied here to every claim
- [`policy/cadence.md`](../../../policy/cadence.md) and [`policy/caps.md`](../../../policy/caps.md) — what the schedule stage is capturing
- [`policy/repo-map.md`](../../../policy/repo-map.md) — where files go, and that this skill writes and stops

## First, the folder

If `instance/` does not exist, create it before anything else, from
[`templates/`](../../../templates/README.md):

- the directories listed in
  [`templates/instance-README.md`](../../../templates/instance-README.md),
  and that file as `instance/README.md`
- `templates/profile/` copied to `instance/profile/`
- `templates/denylist.txt` copied to `instance/private/denylist.txt`

**Do not run `git init` in it, and do not add a remote.** It is a plain folder,
ignored by the repo around it, and that is the whole privacy model. Say so once,
in a line, so the user knows where their data is and that it stays there.

If `instance/` already exists, read `instance/profile/README.md` and resume from
the first stage that is not `done`.

## Then, what is available

Detect it, report it in one line, and never ask again in this session. Details
and commands: [`references/verifying.md`](references/verifying.md).

| Source | Buys |
|---|---|
| Nothing | A pure interview. Every claim lands `stated`. |
| A resume, dropped in `instance/intake/` or pasted | The claims already being made — auditing those is most of the job |
| An authenticated code host | The evidence to audit them against |
| A public profile, pasted as text | A contradiction check against the resume |
| A performance review, offer letter or old job description | Scope and title claims, which a code host cannot show |

A resume plus a code host is the pairing that matters, and it is what this is
for: checking claims already in circulation against what actually happened.

**Name every row, not just the ones that turned up.** The user cannot offer a
source they do not know is accepted, and something sitting in a drawer is worth
more than a better answer to a question nobody asked. Say what was found, what
was not, and what each missing one would have bought.

Say what is *not* wanted, too. A profile export archive is a folder of files
that mostly restate the resume; pasted text gets nearly all of it. Telling the
user that saves them a download and a wait.

**Never block on a missing source.** Say what is missing, say what it costs,
offer the alternative, continue. Plenty of the strongest work is private,
employer-owned, or was never in a repository. `/onboard verify` re-runs
verification later and upgrades claims in place.

**Never write outside `instance/`.** Not policy, not templates, not this file.
The one exception is the local settings file, which takes the calendar server
identifier and nothing else.

## Stages

Resumable. Each writes its files and updates the progress table in
`instance/profile/README.md`. `/onboard <stage>` re-runs one. Full question flow:
[`references/stages.md`](references/stages.md).

| Stage | Writes | After it, the system can |
|---|---|---|
| **spine** | `identity` `attribution` `state` `schedule` | run a day |
| **resources** | `resources`, one inventory per source | name a real question |
| **material** | `story-bank` `tenure-script` `showcase-questions` | run a behavioral or deep-dive round |
| **search** | `projects` `outbound` | run the job-search half |

Start every file from its template in [`templates/profile/`](../../../templates/profile/README.md).
Catalog acquisition has its own tiers: [`references/catalogs.md`](references/catalogs.md).

## Inside every stage

**Enumerate before asking.** Pull the repositories, read the resume, list what
is there — then open with what was found. "Fourteen repositories, four with
commits in the last year, walk me through these three" gets a grounded answer.
"Tell me about your experience" gets a paragraph from the resume.

**One question, then wait.** No lists. A list lets the user answer the easy one
and quietly drop the rest.

**Push once on every answer, minimum.** Pushing only on weak answers teaches
the user to read the push as a verdict.

**Settle attribution before writing any claim about a project.** Whose work,
who else, what phrasing survives the source being opened.

**Verify every number, and record how** — the command verbatim, re-runnable. A
number goes in checked, or it goes in marked `stated`. There is no third state.

**Reject on sight**: improved, streamlined, optimised, scaled, significantly —
with no figure and no mechanism. Do not soften them into better wording. Ask
what the number was, and if there isn't one, the claim is not ready.

**Invert the weak-spot question.** Never "what are the weaknesses" — that
returns something rehearsed. Ask which project the user would steer an
interviewer *away* from, and what they do not want to be asked about. Those
answers are specific, and they fill the "steer away from" half of `projects`.

**Close each stage by testing it.** Ask two questions back from what was just
written, and see whether they answer from memory. A profile the user cannot
defend out loud is aspirational, not true — and the fix is to rewrite the
claim, not to drill it.

## Two files it deliberately does not write

`habits.md` and `grading-anchors.md` are left as their templates, which explain
why in place. Do not ask the user to fill either, and do not offer.

## Done when

- Every stage in `instance/profile/README.md` reads `done`
- Every claim carries a marker, and every `verified` one carries its command
- Every source detected at the start is either used or recorded as unavailable
- `bun run check` is clean, and the denylist has the terms and the canary
- The user can answer two questions from the profile without reading it

Then say what is missing and what would upgrade it. **Write the files and
stop** — the user reads the diff and commits.
