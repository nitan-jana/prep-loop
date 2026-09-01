<!-- leak-check: allow-path — names the folder every session writes into -->

# Using it

What a clone looks like from empty to running.

## Setup

```bash
git clone <this repo>
cd prep-loop
git config core.hooksPath .githooks    # optional, runs the checks before a commit
```

Then open Claude Code in the directory and run `/prep`, which reports where the
install stands and names the one thing to run next. On a fresh clone that is
`/onboard`.

`/prep` is safe at any moment. It reads state and prints it, and it is the only
session here that writes nothing and starts nothing.

**A session that has modes prints them when run bare, and waits.** `/onboard`
and `/mock-loop` both do this rather than guessing which mode was meant. So
nothing here has to be memorised: type the command, read what comes back, pick.

There is nothing to install. [Bun](https://bun.sh) is needed only to run the
checks, and the checks are for people editing the toolkit rather than using it.

## Onboarding

`/onboard` creates `instance/`, the folder holding everything about the person
using it, and interviews them into a profile. Four stages, each a sitting of its
own, resumable across sessions.

Run it bare to see the four with their status and which is next. `/onboard
<stage>` runs or re-runs one.

| Stage | Produces | After it, the system can |
|---|---|---|
| `spine` | Identity, attribution, state, schedule | Plan and run a day |
| `resources` | The resource list, one inventory per source | Name a real question |
| `material` | Story bank, tenure script, showcase questions | Run a behavioural or deep-dive round |
| `search` | Projects, outbound | Run the job-search half |

Bring a resume and an authenticated code host if there are any. Every claim the
system cannot check against a source is marked `stated` rather than assumed, so
starting with nothing works and loses nothing permanently.

The spine stage is enough to begin. The rest can follow across the first week.

`/onboard verify` re-runs verification later, when a source that was missing
turns up. It upgrades `stated` claims to `verified` in place and attaches the
command that proved each one, so starting with nothing is not a dead end.

## A week

`/plan` writes the week and mirrors every block to the calendar in the same
turn. It places anything deferred from last week before it adds anything new,
and it will not exceed the caps in the profile.

Run it before the week starts. Run it mid-week and it plans what is left, since
a block whose window has passed cannot be instructed.

## A day

Work the blocks. The calendar carries what to do and the link; the plan file
carries the same thing in one place.

`/checkin` closes the day. It gathers evidence first, then quizzes what the
day covered rather than asking how it went, records any miss in the user's own
words, and reschedules what slipped. It also backfills earlier days that have no
log — but only if you ask. It names the days with no record and waits, because a
reconstructed day is a file that looks like a record and cannot be undone.

Nothing runs on a timer, nothing scans for gaps ahead of what you asked for, and
nothing reconstructs a day you did not ask it to. Waiting costs nothing: commit
timestamps do not decay, and the half that cannot be reconstructed was gone by
the following morning either way.

Coming back after time away, open with `/prep`. It says what is missing and
names one thing, rather than leaving you to work out where you stopped.

## A review

`/mock-loop` runs several rounds back to back from a brief prepared ahead, then
scores them all in one review afterwards. The rounds and the scoring never
overlap: nothing is graded, hinted at or coached during a round, because that is
the only uncontaminated sample of what can be produced alone.

Two sittings, and it will not merge them. `/mock-loop prepare` writes the brief
ahead of the day; `/mock-loop run` conducts the rounds and scores them. A brief
written minutes before the first round has been shaped by the person about to be
interviewed, which is the one influence it exists to exclude.

The last round of the loop covers the week just worked — many short questions
instead of one deep one, over whatever the other rounds do not reach. It is
sized to what the window has left, so a short review takes fewer of them or
none.

`/mock` runs a single deep-dive round on its own, opening on whichever claim has
the least evidence behind it.

`/story` turns one experience into a usable story with the follow-ups an
interviewer would actually ask, and indexes it.

## A recall day

Every block puts more material in front of you than the check-in closing that
day can ask about, so the studied-but-never-tested pile grows on its own. On a
cycle, whole working days go to draining it.

This is the third of three distances, and the only one far enough out for
forgetting to mean anything. The check-in asks about a block hours after it ran;
the loop's last round asks about the week days later; a recall day asks weeks
later.

`/recall` asks many short questions instead of a few deep ones, drawn oldest
first from everything past its edge, and it never runs two from the same track
in a row. Grouping them would let the second question of a kind answer itself,
and an interview never tells you what is coming next. Expect it to score lower
than a day spent on one subject — that is the measurement working.

A recall day writes its own scored record and no daily log. How often it comes
round, and which days it takes, are in your profile like everything else.

## Where things live

Everything personal is in `instance/`, which is ignored by git and has no
remote. Nothing in it is ever pushed anywhere, and no session sends it
anywhere.

Everything else is the toolkit and holds no fact about anyone. See
[`policy/repo-map.md`](../policy/repo-map.md) for the full map, and
[`policy/README.md`](../policy/README.md) for how the system works.

**No session commits.** Skills write files and stop, so the working tree is
always reviewable before anything is kept. `instance/` is not tracked at all, so
there is nothing there to keep.

## Changing how it behaves

Edit `policy/`. The skills are thin and point at it; the rules about grading,
round conduct, caps and artifact voice all live in one file each and are not
restated anywhere.

Anything specific to one person belongs in `instance/profile/` instead, and the
checks fail if it lands on the other side.
