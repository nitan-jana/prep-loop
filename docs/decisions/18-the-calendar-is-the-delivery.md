# The calendar is the delivery

The user works off the calendar, not off the repo. A plan change that is not on
the calendar has not happened as far as the user is concerned.

## Mirror in the same turn, or write neither

Every change to a week plan is written to the calendar in the same turn that
changes the file. Not queued, not left for the next session, not described to
the user as something to do by hand.

**This is the rule most likely to be quietly skipped**, because the file edit
feels like the work and the calendar call feels like bookkeeping. It is the
reverse: the file is the record, the calendar is the delivery.

If the calendar is unreachable, the plan change is not written either. A repo
and a calendar that disagree are worse than neither being updated, because the
user has no way to tell which one is stale. The planner therefore checks
reachability **first**, before reading anything, since discovering it after the
file is written means discovering it too late.

## The step most often left half-done

A reschedule where a session names a free window, tells the user it has been
moved, and never calls anything. Naming the slot is not the work — both the
calendar policy and the check-in say so in their own words, because it is the
failure that survives being written down once.

## A move is an update, never a delete plus a create

Recreating an event loses its identity, and a user looking at a familiar entry
that suddenly has a new one in its place cannot tell whether anything else
changed. Deletion is for cancellation only, and it prompts — deliberately, and
that prompt should not become routine.

The permission ordering is the same decision expressed in configuration: reads
auto-approved, the two writes the system needs allowed, deletion always asking.

## The server identifier is per install

Which is why the calendar rules cannot live in the committed settings file. They
live in the local one, from a committed example, filled in during onboarding —
and onboarding finds the server by looking at the tools available in the
session, **not** by reading configuration files, because a connected server can
be entirely invisible to them.

## A link is a label, not an address

Added once real blocks were being written. A description is HTML, not markdown
and not plain text: markdown renders nowhere on a calendar, so its punctuation
reaches the reader exactly as typed.

A pasted address spends most of the length ceiling on characters nobody reads. A
block naming five entries becomes five lines of URL and one line of instruction
— the ceiling broken by the links alone. So the address goes behind the entry's
own title, copied from the inventory alongside it. Shortening that title into
something more readable renames an entry the inventory has already named, which
is [the sourcing rule](13-never-invent-a-question-name.md) broken by paraphrase
rather than by invention.

## Where it lives

- [`policy/calendar.md`](../../policy/calendar.md) — the contract, tool per operation, and link form
- [`policy/artifact-voice.md`](../../policy/artifact-voice.md) — the description ceiling
- [`.claude/skills/plan/references/the-week-grid.md`](../../.claude/skills/plan/references/the-week-grid.md) — confirming the mirror rather than describing it

*In the history:* `68c25ed` `cc91701` `9d58d1b` `282ce58` `32a1252`
