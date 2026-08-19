<!-- leak-check: allow-path — the decision is about which paths git can see -->

# One line in `.gitignore` is the privacy model

Everything personal lives in `instance/`, a plain folder inside the clone that
git ignores. It is not a repository, it has no remote, and no session pushes any
of it anywhere.

## What it replaced

The repo started with the personal directories **tracked**, sitting beside the
generic ones: `profile/`, `plans/`, `logs/`, `performance/`, `mocks/`,
`stories/`, `deep-dives/`, `curriculum/`, `private/`, each with a `.gitkeep`
explaining itself. Only `intake/` — the resume drop — was ignored, on the
grounds that it held documents the user did not write here.

Publishing was going to be a **copy of six directories into a fresh repo**. That
was the phrase the early `CLAUDE.md` and `README` both used: a copy, not a
scrubbing project, and only true while the left column of the table stayed
clean.

## Why it changed

The copy-out model made privacy a property of a future action, performed
correctly. Every commit in the meantime was a chance to track something
personal, and the only thing standing in the way was a rule someone had to
remember and a checker that had to be run first.

Moving the whole personal half under one ignored path removes the question
rather than answering it. **There is no state of the repo in which a personal
file is tracked**, so nothing has to be remembered at commit time, and there is
no publish step to get right because the public repo is already the repo.

It also removed the remote. A folder with no git in it cannot be pushed by
accident, misconfiguration, or a session that decided to be helpful.

## What it cost, accepted

`instance/` has no history and no undo. The artifacts are append-only by nature
— one file per day, one per week — so reading the new file is the review and a
diff would add nothing. The profile does get edited over time, and that is what
a backup is for; arranging one is the user's own business and the system does
not do it.

## Where the rule lives

- [`policy/repo-map.md`](../../policy/repo-map.md) — the two halves and what is versioned
- [`CLAUDE.md`](../../CLAUDE.md) — the line, and the test for what belongs on which side
- [`templates/instance-README.md`](../../templates/instance-README.md) — what the folder tells its owner

The gitignore keeps whole files apart. Contents are a separate problem, handled
by [the leak checker](02-the-leak-checker-tiers.md).

*In the history:* `0d81003` `362508c` `e1e5232` `b1e65e1` `b9b61ca` `d34f967` `71c4754`
