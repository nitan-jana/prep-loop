<!-- leak-check: allow-path — it reads the state of the personal half -->

# preploop

The one command. `preploop <feature> [mode]` hands off to a feature spec in this
directory; **bare `preploop` reads state, prints it, and stops** — it writes
nothing, changes nothing, and starts nothing.

## Dispatch

The first token of the argument string is the feature; the rest is its mode.
Load the matching file and follow it — the linked file wins, nothing here
restates it.

| Feature | Spec | Modes |
|---|---|---|
| `onboard` | [`onboard.md`](onboard.md) | `spine` `resources` `material` `search` `verify` |
| `plan` | [`plan.md`](plan.md) | — |
| `checkin` | [`checkin.md`](checkin.md) | — |
| `mock` | [`mock.md`](mock.md) | — |
| `loop` | [`loop.md`](loop.md) | `prepare` `run` |
| `recall` | [`recall.md`](recall.md) | — |
| `story` | [`story.md`](story.md) | — |

A feature that has modes, given none, prints its own menu and waits — its file
says how, per
[`docs/decisions/19`](../docs/decisions/19-a-bare-invocation-waits.md). An
unrecognised feature gets the status block below and a line naming what was not
recognised. Never guess.

## Bare `preploop` — where you are

No argument: read the state and print it. This path is the one that is safe to
run at any moment, because it cannot change anything.

### What it reads

Three directory listings, plus onboarding progress, which is the one file it
opens. No git, nothing else read.

| Question | Where |
|---|---|
| Does a profile exist, and how far did onboarding get | `instance/profile/README.md` |
| Does this week have a plan | `instance/plans/` |
| Does every working day up to yesterday have a log | `instance/logs/` |
| Is there a brief for the next review | `instance/mocks/` |
| Is a recall day due this cycle | `instance/profile/schedule.md`, against the week |

**Nothing runs this on its own.** No session scans for gaps before doing what it
was opened to do. Evidence is retroactive: a missing log costs nothing by
waiting, and the check-in reconstructs it whenever it next runs. The state is
said out loud in exactly two places, both asked for — here, and in
[`checkin`](checkin.md), which is the only thing that acts on a gap rather than
printing it.

### What it prints

```
prep-loop — where you are.

  profile     <4 stages done, or which are outstanding>
  this week   <planned, or not planned>
  logs        <through which day, or none>
  next review <brief ready, or no brief>
  next recall <which day, or not this cycle>

  /preploop onboard   build or extend the profile
  /preploop plan      write the week and mirror it to the calendar
  /preploop checkin   close out a day
  /preploop mock      a single project deep-dive round
  /preploop loop      rounds back to back, then scored
  /preploop recall    drain the untested backlog, interleaved
  /preploop story     turn one experience into an interview story
```

Then **one line** naming the single next thing, chosen by that state:

| State | The line |
|---|---|
| No profile | `Start with /preploop onboard — nothing else can run without it.` |
| Onboarding unfinished | `Next: /preploop onboard <stage>.` |
| Profile done, week unplanned | `Next: /preploop plan.` |
| Planned, yesterday has no log | `Next: /preploop checkin — it will backfill what it can.` |
| Planned and logged, review has no brief | `Next: /preploop loop prepare.` |
| Nothing outstanding | `Nothing outstanding. Work the blocks.` |

**One line, not a list of everything outstanding.** A status screen that names
five things to do is one that gets closed. The point is to answer "what now"
with something that can be typed immediately.

## Forbidden

- **On the bare path, never start a feature.** Name it and stop. The user types it.
- **On the bare path, never write anything**, including under `instance/`.
- **Never grade, quiz, or comment on the state.** It reports that four days have
  no logs. It does not have a view about that.
