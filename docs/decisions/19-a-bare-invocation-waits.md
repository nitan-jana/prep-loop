# A bare invocation prints a menu and waits

A session with modes, run with no argument, prints the modes with their current
status and stops. It does not guess which one was meant, and an unrecognised
argument gets the same menu rather than a guess.

## Why waiting is the whole point

**Printing the menu is not doing the work.** An onboarding stage takes half an
hour or more, and starting one because nothing said otherwise is a bad way to
spend somebody's evening.

For the loop the argument is sharper. Rounds are the one thing in the system
that **cannot be undone by stopping**: a question seen is a question spent, and
it cannot be asked cold again. So a bare invocation never starts a round.

The menu also carries the status of each mode, read from files the session was
going to look at anyway — which stage is `done`, whether a brief exists. That
turns the menu from a list of names into an answer.

## Nothing has to be memorised

Type the command, read what comes back, pick. The frontmatter carries an
argument hint so the accepted values appear in the slash menu before the command
is even run, and the printed menu carries them again with state attached.

## And one session that starts nothing at all

`prep` reports where the install stands and names a single next thing to run.
It is the entry point precisely because it cannot do anything: [somewhere to
look when the thread has been lost](09-who-writes-what.md) has to be safe to open
without thinking.

It names one thing, not a list of everything outstanding, because a status
screen naming five things is a status screen that gets closed. And it declines
to run a command handed to it as an argument — saying what to type instead —
because quietly making an exception for a convenient case is how "starts
nothing" stops being true.

## Where it lives

- [`commands/onboard.md`](../../commands/onboard.md) — the four stages, with status
- [`commands/loop.md`](../../commands/loop.md) — prepare and run, and why a bare call never starts a round
- [`docs/getting-started.md`](../getting-started.md) — the ergonomics, stated once for the reader

*In the history:* `d109177` `6f8dfb2` `3f590b3` `259e4c6` `98942b4`
