<!-- leak-check: allow-path — names the artifact directories the deleted checks listed -->

# Nothing runs on a timer

The first session of a day notices what should already have happened and
recovers the part of it that can still be recovered. There is no scheduler, no
cron, and no unsupervised run.

## What it replaced

The original design had a `runbooks/` directory — one file per scheduled
routine holding its complete logic, so that a cron job could be a six-line
bootstrap pointing at the repo. Three routines were specified in the repo map:
a weekly planner, a daily check-in writing the evidence half of each log, and a
brief writer running ahead of the review. Each would branch, commit and open a
pull request, because nobody was watching and the pull request was the review
surface.

All of it was deleted. The routines became skills the user invokes, and the
scheduler became a check that every session runs first.

## Why

**A remote.** Unsupervised routines have to run somewhere, which means the
personal half has to be reachable from that somewhere. That is directly opposed
to [the folder having no remote at all](01-one-line-is-the-privacy-model.md), and
the privacy model is the more valuable of the two.

**Order of construction.** Every session here is a pure function of files on
disk, which is exactly what a scheduler wraps later. Building the scheduler
first and the sessions inside it is harder and locks in the remote.

**What is actually recoverable.** Evidence is retroactive and recall is not.
Commits carry timestamps, so a day nobody closed out can be reconstructed later.
The quiz cannot — recall measured three days late measures something else — and
neither can a miss reason, which only the user knows and has by then forgotten.
A nightly routine would only ever have written the half that keeps.

## The replacement was itself removed

For a time the scheduler's stand-in was a **catch-up**: three existence checks
run in `CLAUDE.md` at the start of every session, whichever skill was invoked.
It was cut down twice — from reading the profile for the list of working days to
one directory listing opening nothing, then given two rules about speech rather
than work, silence on the happy path and no marker file.

It was deleted anyway. Three things were wrong with it, and none of them were
fixable by cutting it down further.

**The listing could not answer its own question.** Filenames say which days have
logs; only a week plan's day headings say which days were working days. So the
check that was documented as opening nothing had to open a plan every time it
ran, and the reduction that justified putting it on every session's path had
never actually happened.

**Its one autonomous action had no deadline.** Backfilling was allowed to act
alone because leaving it undone was said to lose evidence as history moved
further away. That is the opposite of what this record already established:
evidence is retroactive, commit timestamps do not decay, and a day reconstructed
next week is exactly as complete as one reconstructed the next morning. The half
that cannot be recovered was gone by the following day either way. Nothing was
racing anything.

The action did not survive the move, either. **Nothing backfills unasked now.**
A reconstructed day is a file that looks like a record, written into a folder
with no version control behind it, from commits that may have been made for
something else — and only the user knows whether a quiet day was a working day
at all. It is reported in a line and written on a yes.

**Its other two checks reported things nobody could act on yet.** A missing week
plan is caught by the planning session; a missing brief does not cancel a loop,
which sources live instead. Both fired days before either mattered, in the shape
the user had been trained to skim past.

What replaced it is nothing at all on the session path. Backfilling lives in the
check-in, which is where it already was, and where a gap is acted on rather than
announced. `prep` prints the same state on request, which is the one context
where it was ever worth saying.

The title of this record still holds. Nothing runs on a timer — and now nothing
runs ahead of what was asked, either.

## Where it lives

- [`policy/checkin-protocol.md`](../../policy/checkin-protocol.md#backfilling-a-missed-day) — the only place a gap is acted on, and the bound on how much
- [`.claude/skills/prep/SKILL.md`](../../.claude/skills/prep/SKILL.md) — the same state, printed when asked
- [`README.md`](../../README.md) — optional local scheduling, kept on the roadmap and kept last

*In the history:* `0d81003` `e72e519` `203e757` `9cc18cb` `f2dbdce` `152a49b`
