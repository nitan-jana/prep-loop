---
name: prep
description: Show where this install stands and what to run next. Use when unsure what to do, after time away, or on a fresh clone with nothing set up yet.
disable-model-invocation: true
---

<!-- leak-check: allow-path — it reads the state of the personal half -->

# prep

The entry point. It reads state and prints it. **It writes nothing, changes
nothing, and starts nothing.**

That restriction is the whole design. Somewhere to look when you have lost the
thread has to be safe to run without thinking, which means it cannot be a thing
that also does work. Every other skill in here takes over a session; this one
answers a question and gets out of the way.

## Required reading

Source of truth. Nothing below restates them; if this file appears to
contradict one, the linked file wins and this file is the bug.

- [`policy/catch-up.md`](../../../policy/catch-up.md) — the same checks, run for a different reason
- [`policy/repo-map.md`](../../../policy/repo-map.md) — where each artifact lives

## What it reads

The same listing as the catch-up, plus onboarding progress, which is the one
file this opens. No git, nothing else read.

| Question | Where |
|---|---|
| Does a profile exist, and how far did onboarding get | `instance/profile/README.md` |
| Does this week have a plan | `instance/plans/` |
| Does every working day up to yesterday have a log | `instance/logs/` |
| Is there a brief for the next review | `instance/mocks/` |

**The catch-up already ran** at the start of this session, as it does at the
start of every session. This is not a second pass and does not repeat its work.
The catch-up acts on what is missing and otherwise stays quiet; this is the
place that says the state out loud, because being asked is the difference.

## What it prints

```
prep-loop — where you are.

  profile     <4 stages, or which are outstanding>
  this week   <planned, or not planned>
  logs        <through which day, or none>
  next review <brief ready, or no brief>

  /onboard    build or extend the profile
  /plan       write the week and mirror it to the calendar
  /checkin    close out a day
  /mock       a single project deep-dive round
  /mock-loop  rounds back to back, then scored
  /story      turn one experience into an interview story
```

Then **one line** naming the single next thing, chosen by that state:

| State | The line |
|---|---|
| No profile | `Start with /onboard — nothing else can run without it.` |
| Onboarding unfinished | `Next: /onboard <stage>.` |
| Profile done, week unplanned | `Next: /plan.` |
| Planned, yesterday has no log | `Next: /checkin — it will backfill what it can.` |
| Planned and logged, review has no brief | `Next: /mock-loop prepare.` |
| Nothing outstanding | `Nothing outstanding. Work the blocks.` |

**One line, not a list of everything outstanding.** A status screen that names
five things to do is a status screen that gets closed. The point is to answer
"what now" with something that can be typed immediately.

## It takes no arguments

There are no subcommands. The menu lists commands to type, not modes to pass.

Someone who has just read that menu will try `/prep plan` anyway, because a
menu that lists things looks like a menu that accepts them. When an argument
arrives and it names one of the six, say what to type instead and stop:

> `plan` is its own command. Run `/plan`.

Do not run it on their behalf. The distinction being protected is that this
skill starts nothing, and quietly making an exception for a convenient case is
how that stops being true.

Anything else gets the status block and a line saying the argument was not
recognised.

## Forbidden

- **Never start another skill.** Name it and stop. The user types it.
- **Never write anything**, including under `instance/`. This is the one skill
  in here that is safe to run at any moment precisely because it cannot change
  anything, and that is worth more than any convenience gained by relaxing it.
- **Never grade, quiz, or comment on the state.** It reports that four days have
  no logs. It does not have a view about that.
