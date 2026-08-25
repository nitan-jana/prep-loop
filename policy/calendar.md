<!-- leak-check: allow-path — names where the per-install calendar settings live -->

# The calendar contract

The user works off the calendar, not off the repo. A plan change that is not on
the calendar has not happened as far as the user is concerned.

## Mirror in the same turn

**Every change to a week plan is written to the calendar in the same turn that
changes the file.** Not queued, not left for the next session, not described to
the user as something to do by hand.

This is the single rule most likely to be quietly skipped, because the file
edit feels like the work and the calendar call feels like bookkeeping. It is
the reverse: the file is the record, the calendar is the delivery.

If the calendar tools are unavailable in the session, **do not write the plan
change either.** Say the calendar is unreachable and stop. A repo and a
calendar that disagree are worse than neither being updated, because the user
has no way to tell which one is stale.

## One event per block

One block, one event, for the whole window. Never several events inside a
block, never one event covering two blocks.

The title is the block label and the subject, separated by a middle dot:
`<label> · <subject>`. Both come from `instance/profile/schedule.md`, the label
stable across the week and the subject moving inside it. Stable label first, so
the week reads as a rotation at a glance rather than as unrelated sessions.

The description follows [`artifact-voice.md`](artifact-voice.md) in full — all
three rules, and the
[length ceiling](artifact-voice.md#a-description-has-a-ceiling) in particular.
Nothing on an event ever records that the block happened.

### A link is a label, not an address

A link in a description is short text with the address behind it.

```text
<a href="<url>"><entry title></a>   a link, reading as the title alone
[<entry title>](<url>)             those characters, brackets and address alike
```

A pasted address spends most of the ceiling on characters nobody reads. A block
naming five entries becomes five lines of URL and one line of instruction, which
is the ceiling broken by the links alone.

**The description is HTML, not markdown, and not plain text.** `<a href>` is a
link, `<ul>` and `<li>` carry a set of them, `<br>` ends a line otherwise, and
nothing else is worth using. Markdown renders nowhere on a calendar, so the
second line above reaches the reader exactly as written — the long form, with
punctuation added.

**One entry sits inside the instruction; two or more become a list.** A block
naming one thing reads as a sentence with the title linked in it. A block naming
several puts each on its own `<li>`, so the count is legible before any of them
is read and no line wraps into the next. Where an entry needs a note of its own
— which part of it, what to skip — the note sits in that `<li>` rather than in a
sentence above that has to name the entry a second time to attach it.

Two things follow from it being HTML:

- **A newline is not a line break.** Outside a list, lines are separated with
  `<br>`.
- **`&` and `<` inside a label are escaped**, as `&amp;` and `&lt;`. Backticks
  and asterisks in an inventory title are markdown and are dropped, not carried
  across.

The label is the entry's own title, copied from `instance/curriculum/` alongside
the address it sits beside. Shortening it into something more readable renames
an entry the inventory has already named, which is
[`mock-sourcing.md`](mock-sourcing.md#never-invent-a-question-name) broken by a
paraphrase rather than by an invention. Where a block names no entry, it has no
link either and the description is plain text.

## Tool per operation

| Operation | Tool |
|---|---|
| Find what is already scheduled | `list_events` |
| Find one event by name | `search_events` |
| Read one event in full | `get_event` |
| Confirm which calendar is being written | `list_calendars` |
| Pick a free window for a reschedule | `suggest_time` |
| Add a block | `create_event` |
| Move, retime or re-describe a block | `update_event` |
| Remove a block that is cancelled outright | `delete_event` |

**A moved block is an update, never a delete plus a create.** Recreating it
loses the event identity, and a user looking at a familiar entry that suddenly
has a new one in its place cannot tell whether anything else changed.

**`delete_event` is for cancellation only** — the block is not happening at all
and is not being rescheduled. It prompts before running, deliberately, and that
prompt should not be routine.

## Who may write

Set out in full in [`repo-map.md`](repo-map.md#who-writes-what). The short form:
the planning routine writes the week; the check-in moves exactly one block when
it reschedules a miss. No other skill touches the calendar.

The reschedule is the operation most often left half-done — a session names a
free slot, tells the user it has been moved, and never calls anything. Naming
the slot is not the work. **Call `create_event` or `update_event`, then confirm
in one line.**

## Per-install settings

The calendar server identifier differs for every install, so it is not
committed. It lives in the local settings file, from the example that ships
with the repo, and onboarding fills it in.

Reads are auto-approved, writes are allowed, deletion prompts. That ordering is
deliberate and should not be flattened for convenience.
