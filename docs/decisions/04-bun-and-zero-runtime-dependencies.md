# Bun, and no runtime dependency ever

`tools/` uses Bun's built-ins alone. The checks run straight from a clone with
nothing installed.

## What it replaced

Both checkers were first written as shell scripts wrapping a heredoc of Python.
They worked. They were replaced wholesale by TypeScript running on Bun, and the
shell versions were deleted in the same sitting rather than kept around.

The port bought two things the shell version could not have:

**Tests.** The Python lived inside a heredoc, so nothing could import a function
out of it. The interesting logic is exactly the kind that needs a test — the
GitHub anchor slug where an em dash vanishes but both its spaces become hyphens,
the duplicate-heading suffixes, the fenced-code handling, the word-bounded
denylist pattern. All of that is now asserted rather than assumed.

**One runtime instead of two.** A shell script that shells out to Python has two
prerequisites and two ways to be missing.

## Why the zero-dependency rule is load-bearing

A check that fails to start is a check that gets skipped. That is the whole
argument, and it survived the change of reason behind it.

Originally the rule existed because unsupervised routines were going to clone
the repo and had to follow a runbook without an install step. [Those routines
were deleted](08-no-scheduler.md), and the rule stayed — because the same sentence
holds for anyone cloning this to look at it, and for CI, where the workflow runs
the checks *before* it installs anything precisely so that the rule staying true
is itself tested on every push.

## The checks run in three places

`bun run check` by hand, a pre-commit hook, and a workflow on every push. All
three run the same command, and the zero-dependency rule is what lets the
workflow run them *before* it installs anything — so the rule staying true is
itself tested on every push.

The hook is not redundant with CI. **Term matching is off in CI by
construction**: the denylist is ignored by git, so it never reaches a runner, and
the half of the check that knows the user's real names is silent there. For that
one tier the local hook is the only check that exists, which is worth saying
wherever the hook is mentioned — green CI otherwise reads as green everything,
when it means the other checks passed.

Git hooks live outside the tracked tree, so one cannot arrive with a clone.
Setting `core.hooksPath` to the tracked directory is the whole of what a hook
manager would do, which is why there is not one here. The hook exits cleanly when
Bun is absent rather than blocking, and runs in well under a second — **a slow
hook is a hook that gets bypassed**, and a bypassed hook is worse than none
because it is still believed in.

## `devDependencies` are a different thing

Type definitions and the compiler, used by an editor and by `typecheck`, never
on any execution path. Those are fine, and the distinction is written down
because it would otherwise read as a violation of the rule sitting above it in
the same file.

A **runtime** dependency is not fine: if one ever looks necessary, that is a
reason to reconsider the design rather than to install it.

## Where it lives

- [`CLAUDE.md`](../../CLAUDE.md) — the rule, and the devDependency exception
- [`tools/check-links.test.ts`](../../tools/check-links.test.ts) — the traps worth a test
- [`.github/workflows/check.yml`](../../.github/workflows/check.yml) — checks first, install second
- [`.githooks/pre-commit`](../../.githooks/pre-commit) — the tier CI cannot check, in its header

*In the history:* `d5da51e` `77db58f` `4facbb2` `e17bdf0` `278683b` `65f8d7d` `ae56f80` `d64b46a` `a8e74b0` `6a80971` `8ce34aa` `5dfbd79` `c71c4c7` `d76c527`
