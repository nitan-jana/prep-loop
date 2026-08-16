<!-- leak-check: allow-path — names the personal file it is a template for -->

# Daily log

A day's log, at `instance/logs/<date>.md`. Written by the check-in and by
nothing else.

`status` is `complete` when a check-in ran, or `evidence-only` when the day was
reconstructed afterwards. See
[`policy/cadence.md`](../policy/cadence.md#every-working-day-gets-a-log) for
what each one means to the planner — `evidence-only` means **unknown**, never
missed.

**Everything below the line is the template. Delete this preamble, and keep the
heading that follows it.**

---

# <date>

status: <complete / evidence-only>

## Evidence

Fact, with the source attached. A timestamp places work in a block; it never
proves a block was empty.

| Block | What ran | Source |
|---|---|---|
| <label> | <what the evidence shows> | <commit, file, or the user's stated reason> |

## Quiz

Graded per [`policy/grading.md`](../policy/grading.md). **Every grade carries
the quoted answer that produced it**, in the user's own words.

On an `evidence-only` log this section is present and explicitly empty. Recall
measured late measures something else.

| Question | Answer, quoted | Grade | Failed |
|---|---|---|---|
| <the named thing that was asked> | "<what the user said>" | <solid / shaky / not retained> | <unprompted / the cost / the follow-up — omitted on `solid`> |

## Misses

The reason, **verbatim**, in the user's words. No category, no comment on
whether it was avoidable.

| Block | Reason |
|---|---|
| <label> | "<what the user said>" |

## Rescheduled

Written to the calendar in this same turn, not just named here.

| What | Moved to |
|---|---|
| <the block or task> | <the new window> |
