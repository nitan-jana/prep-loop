# Who writes what, and nobody commits

Every artifact has exactly one owner, listed in a table with a column naming who
must never write it. A session writing outside its row is a bug, not a
judgement call.

## No skill writes its own instructions

A session that can edit `policy/` or a skill file is a session whose behaviour
cannot be reviewed against anything. Changes there are made deliberately, by the
user, outside a run.

This is stated as a flat prohibition — never write outside the ignored folder —
rather than as a rule about intent, because intent is not checkable and a path
is.

## No skill commits

Skills write files and stop. The user reads the working tree and commits what
they want kept.

The original split was subtler: interactive skills wrote files and stopped,
while unsupervised routines branched, committed and opened a pull request,
because the pull request was the review surface for work nobody watched. [When
the routines went](08-no-scheduler.md), so did the second half, and what is left is
the simpler rule.

It costs nothing now, because nothing in the personal folder is tracked. The
review surface for supervised work is the working tree, and a commit would only
skip past it.

## One session that writes nothing at all

`prep` reports where the install stands and names one thing to run. **It writes
nothing, changes nothing, and starts nothing**, and that restriction is its
whole design: somewhere to look when the thread has been lost has to be safe to
run without thinking, which it stops being the moment it can also do work.

The rule held under pressure twice. It takes no arguments, because a menu
listing commands looks like a menu that accepts them — handed one, it says what
to type and stops rather than running it on the user's behalf. And it prints one
line naming a single next thing, not a list of everything outstanding, because a
status screen naming five things is a status screen that gets closed.

## The other prohibition a checker cannot enforce

**Never seed this system from another prep system's artifacts.** A system that
has read them reproduces their shape, and any comparison against them then
measures nothing — which was the point of building this one clean, including the
freedom to conclude it is worse.

It sits beside "never write outside the ignored folder" in the same forbidden
list, and for the same structural reason: no tool can see that a session read
something it should not have, so the rule has to live where every session reads
it rather than in a check.

## An artifact with two owners, split by column

The only exception, and it is explicit. `onboard` owns an inventory's entries —
identifiers, titles, links, everything describing the source. `checkin` and
`mock-loop` own the three coverage columns and touch nothing else in the row,
because [what this install did with an entry](15-worked-is-not-asked.md) is not
something a fetcher can know.

One consequence is written down beside it: **a refresh merges, it never
replaces.** Re-pulling a source rebuilds the entries and must carry the coverage
forward, or it silently erases the history that makes retention sourcing
possible — invisibly, since the file looks correct afterwards.

## Where it lives

- [`policy/repo-map.md`](../../policy/repo-map.md) — the table, and the two rules that fall out of it
- [`commands/preploop.md`](../../commands/preploop.md) — the session that starts nothing
- [`CLAUDE.md`](../../CLAUDE.md) — the prohibition, in the forbidden list

*In the history:* `c615b2f` `e72e519` `3f590b3` `259e4c6` `5c0f354` `afd70f2` `0aa6508` `71c4754`
