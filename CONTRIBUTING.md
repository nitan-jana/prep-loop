<!-- leak-check: allow-path — names the ignored folder to explain what the licence does not reach -->

# Contributing

Issues, bug reports and discussion are welcome. So are pull requests, with one
condition below that is worth reading before you spend time on a large one.

## The licence

This project is under **AGPL-3.0**. In practice that means:

- **Using it changes nothing for you.** Clone it, modify it, run it on your own
  machine, keep your changes private. The licence asks nothing of a user.
- **Running a modified version as a network service** obliges you to offer that
  version's source to its users. This is the clause the project is here for.

Your own prep data is not covered by any of this. It lives in `instance/`, it is
never part of the repository, and nothing in a software licence reaches it.

## Contributor licence agreement

**A first-time contributor is asked to sign a CLA before their pull request is
merged.** It assigns joint rights in the contribution to the project maintainer,
alongside the rights you keep in your own work.

The reason, stated plainly: it keeps relicensing possible. A project owned
entirely by one copyright holder can offer itself under different terms later —
a commercial licence for someone who needs one, a more permissive licence if
that turns out to be the better call. Once contributions are held by several
people under AGPL alone, every one of them has to agree to any such change, and
in practice that means it never happens.

This is a common arrangement and it is not a claim on your work. You keep every
right you had in what you wrote.

If you would rather not sign, an issue describing the change is still valuable,
and the change can be written independently.

## Before opening a pull request

```bash
bun run check
```

Links, leaks and tests. CI runs the same command, so a green local run is a
green pull request.

**It does not hold in the other direction.** Term matching reads a denylist that
is ignored by git and never reaches a runner, so that tier is off in CI and can
only pass locally. Green CI means the other checks passed.

To run them automatically before each commit, either `bun install` or `bun run
hooks` — both set `core.hooksPath` to the tracked `.githooks/` directory. There
is no hook manager to install; setting that path is the whole of what one would
do.

Two rules the checks enforce that are easy to trip:

- **Nothing personal in the tracked tree.** No names, no dates, no paths into
  `instance/`. `policy/` is written in the third person about a user who is not
  in the room.
- **Point, never paraphrase.** A rule lives in one file. Anything that needs it
  links to it, rather than restating it in a second place that will drift.

[`policy/README.md`](policy/README.md) has the full house style for policy
files, and [`CLAUDE.md`](CLAUDE.md) has the boundary rules.
