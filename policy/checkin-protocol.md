<!-- leak-check: allow-path — names the log it writes and the profile it reads -->

# The check-in

Closes out a working day. Three parts, in this order: evidence, quiz,
reschedule.

## It quizzes; it does not collect a report

**Never ask "how did the day go" or "what did you get through".** A
self-report is the least reliable input available, and the system exists partly
to replace it. Asking someone what they retained returns what they remember
remembering.

The check-in establishes what happened from evidence, then tests what stuck by
asking about it. What the user believes about the day appears in exactly one
place: a miss reason, in their own words, because that is the one thing only
they know.

## Evidence first, before any question

Gather before asking. Opening with a question the evidence could have answered
teaches the user that the answers are not checked.

What counts as evidence: commits in whatever repositories the user's practice
lands in, files that appeared under `instance/stories/` or
`instance/deep-dives/`, and the timestamps on all of it against the block
windows.

Timestamps place work in a block. They do not prove a block was empty — a
reading block leaves no commits, and inferring a miss from silence is how a log
becomes a record of failure that is also wrong.

Write the evidence half as fact, with the source attached. Every marked block
traces to a timestamp or to a reason the user gave.

## The quiz

Pull from what the day's blocks actually covered, per the evidence. Then:

**Name a specific thing.** Not "what did the reading cover" but a named
question, a named mechanism, a named decision. A vague prompt gets a vague
answer that cannot be graded.

**Ask for reconstruction, not recognition.** "Walk through the approach" beats
"do you remember the approach". Recognition survives a day and fails an
interview, so testing for it measures nothing worth knowing.

**Grade it** per [`grading.md`](grading.md), with the quoted answer, in the log.

**Push once** per [`interviewing.md`](interviewing.md#push-once-at-minimum).
The check-in is a short round and the same rules apply — no hints, no supplying
the term, no revealing the rubric.

Keep it to a few items. A check-in that becomes a full round eats the evening
and then gets skipped, and a skipped check-in costs more than a shallow one.

## Misses

Ask for the reason. Record it **verbatim**, in the user's words.

Do not editorialize, do not summarise it into a category, do not add a note
about whether it was avoidable, and do not compare it to a previous miss.
[`artifact-voice.md`](artifact-voice.md#no-history) forbids the comparison and
the verbatim rule handles the rest: the planner needs the actual reason to
place the block better, and a reason rewritten into "low energy" has lost the
part that would have helped.

A miss is not a moral event. The system's response to one is a reschedule and
possibly a schedule change, never a comment.

## Reschedule

For anything missed that is still worth doing:

1. Find a free window with `suggest_time`.
2. **Actually write the calendar** — `create_event` or `update_event`, per
   [`calendar.md`](calendar.md).
3. Confirm in one line.

Naming the slot is not the reschedule. This is the step most often left
half-done, and a plan that says a block moved while the calendar still shows
the old one is worse than not moving it.

If it is not worth doing, it goes to the week plan's `## Deferred` list as a
plain instruction, or it is dropped. Both are fine. Rescheduling everything
guarantees an overloaded tomorrow.

## Backfilling a missed day

Before anything else, check whether earlier working days are missing a log. For
each one, reconstruct what can still be recovered from commit timestamps and
file history, write it, and mark it `status: evidence-only`.

**Leave the quiz section present and explicitly empty.** Do not quiz on a day
that has passed — recall measured late measures something else — and do not ask
for a miss reason nobody remembers accurately. An honest partial log is the
whole point of the status.

**Never fabricate the missing half.** `evidence-only` means unknown, and the
planner reads it as unknown. A backfilled log that guesses at what happened is
worse than no log, because it looks like a record.

## What it writes

Today's log, complete. Any earlier day's log, evidence-only. Nothing else.

It writes files and stops — no commit, per
[`repo-map.md`](repo-map.md#commits). Nothing under `instance/` is tracked in
any case.
