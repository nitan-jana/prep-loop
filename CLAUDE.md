<!-- leak-check: allow-path — this file maps the repo and names every directory by design -->

# prep-loop

An interview prep system built on four mechanisms: a plan written ahead of each
week, named work blocks on a rotation, a check-in that quizzes rather than
collects a self-report, and a mock loop scored against a fixed rubric.

How often any of that happens belongs to the user, not to the system. How many
blocks, how long, which days carry which work, when the loop runs, what timezone
— every one of those is read from `profile/`. **Policy describes the mechanism;
profile supplies the parameters.**

## Running the checks

[Bun](https://bun.sh) is the only prerequisite, and the only one there will be.
`tools/` holds **zero dependencies** — Bun's built-ins cover everything, so
there is nothing to install and a clone runs immediately.

```
bun run check        # links, leaks and tests
```

That constraint is load-bearing. The unsupervised routines clone this repo and
must never need an install step before following a runbook, and a leak check
that fails to start is a leak check that gets skipped. If a dependency ever
looks necessary, that is a reason to reconsider the design, not to install it.

## Resolution order

1. `policy/` — how the system works. Generic. The same for every user.
2. `profile/` — who this instance belongs to. Facts, dates, claims, habits.
3. `curriculum/` — inventories of outside material, so a question can be named
   rather than remembered.
4. Skills and runbooks — how a session or a routine is invoked. Nothing else.

**Point, never paraphrase.** A skill or runbook may link a policy file, or
override it with a stated reason. It may not restate it. Two copies of a rule
is one rule and one future bug. If a file appears to contradict something it
links, the linked file wins and the linking file is the defect.

**No section numbers.** Cite a file, or a heading anchor. A relative link is
machine-checkable; a section number is a string only a human can check.
`tools/check-links.sh` fails the build on either problem.

## The line

| Shareable | Personal |
|---|---|
| `policy/` `runbooks/` `.claude/` `templates/` `tools/` `docs/` | `profile/` `curriculum/` `plans/` `logs/` `performance/` `mocks/` `stories/` `deep-dives/` `private/` `intake/` |

Releasing this is a copy of six directories into a fresh repo, not a scrubbing
project — but only while the left column stays clean. `tools/leak-check.sh`
is what keeps it true. Run it before committing anything on the left.

**Nothing personal is hand-written into this repo. It comes from `/onboard`.**
A file that needs a fact about the user reads `profile/`; it never embeds one.
That includes the things that don't look personal: the denylist terms, the
canary token, the calendar server id, cron times and timezones.

The test is not "does this contain a name or a date" — that is only what
leak-check can mechanically catch. The test is **would this be true for a user
who isn't this one.** A six-block day, a weekend loop, a named framework and an
early-morning cron all pass the first test and fail the second.

## Forbidden

- **Never read the previous system's repo.** It exists elsewhere, with its own
  history, and this one was built clean so that what it produces can be compared
  against what that one produced. A system that has read those artifacts will
  reproduce their shape, and the comparison will measure nothing. The comparison
  is one manual sitting at the end of the first full week — not something any
  skill or routine reaches for.
- **Never commit anything under `intake/`.** It holds documents the user did not
  write here — a resume, an exported profile. `.gitignore` covers it; don't
  work around that.
- **Never merge a routine's pull request.** Routines open PRs; a human merges.

## Writing artifacts

Three rules govern anything the user reads daily — week plans, logs, calendar
event descriptions. They are stated in full in `policy/artifact-voice.md`;
the short version:

1. **Minimal.** What to do and the links. No rationale, no restating policy.
2. **Instructions, never completion state.** A plan says what is planned. A log
   says what happened. Nothing gets marked done on a calendar event.
3. **No history — never say what was there before.** Not "moved from an earlier day",
   not "deferred from last week", not "(which didn't happen)". An item that
   slipped is carried forward as a plain instruction. A trail of displacement
   notes turns every artifact into a record of failure, and these get read
   every day.

## Commits

Subject line only, `type: summary`, matching the existing log. No body. No
`Co-Authored-By` trailer.

Interactive skills write files and stop. **The user commits.** Unsupervised
routines branch, commit, and open a PR with `gh pr create` — never merge, and
never modify `policy/`, `runbooks/` or `profile/`.
