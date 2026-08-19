<!-- leak-check: allow-path — names the folder the checker guards the boundary against -->

# The leak checker has three tiers and only one blocks

`FAIL` exits non-zero. `WARN` and `CADENCE` are printed for a human to read and
change nothing about the exit code.

## Why the tiers are not all fatal

A file testing these rules has to contain the thing each rule detects.
Meta-text about the rules trips them. Templates address the reader in the second
person because that is who templates are for. Make all of that fatal and the
run goes red on files that are correct — and **a check that cries wolf is one
that gets switched off**, which costs more than the tier was ever worth.

So the tiers are sorted by whether a hit is definitionally wrong:

- **`FAIL`** — a denylist term, a reference into the ignored folder, or a 2020s
  year. Each of these is wrong wherever it appears in the tracked tree.
- **`WARN`** — the second person.
- **`CADENCE`** — a weekday, a clock time, a cron expression, a timezone. Not a
  privacy leak at all: a design smell, one user's routine baked into what is
  meant to be the mechanism.

## The year rule is the non-obvious one

A year is the sneakiest identifier because it survives every other scrub. A line
stating when a rule was decided reads as one person's decision log with every
name already stripped out. So policy states rules without saying when they were
set, and the checker enforces it mechanically.

That rule is why **these decision records carry no dates**. What a decision
replaced and why is durable; when it happened is not, and it is the half that
identifies an install.

## Three refinements it took

**The second person was scoped to `policy/`.** Applied repo-wide it fired on
every template and most of the readme, all of them correct, which is a warning
nobody reads by the third one. The third-person rule belongs to policy and
nowhere else, so the check now runs nowhere else.

**A profile with no denylist beside it became a failure.** A fresh clone has no
denylist and nothing to leak, so term matching being off is correct there. Once
a profile exists, those two facts together are a hole: the half of the check
that knows the user's real names is silent, and the run still reports success.

**`LICENSE` is deliberately outside the scanned roots.** A copyright line is a
name and a year by definition, which is the thing the checker rejects
everywhere else. It is the one tracked file the checker does not read, and the
repo map says so out loud rather than leaving it as an oversight.

## The denylist is filled in the same step as the fact

Term matching is the tier that knows the user's real names, and it is only as
good as the list behind it. Every name, employer, domain, school, city and
distinctive figure that lands in the profile gets a term written **in the same
step**, not in a pass afterwards.

Terms and profile that drift apart are a denylist that passes a leak. A cleanup
pass over a finished profile is exactly the work that gets deferred once and then
never happens, and its absence is invisible: the checker still runs, still
reports success, and now knows nothing about the names it was built to catch.

Terms stay specific enough not to cry wolf, for the same reason the tiers exist
at all — one that fires on ordinary prose gets the check switched off. And
onboarding **confirms the check live**: put a term in a tracked file, run the
check, watch it fail, take it out, watch it pass. A guard nobody has seen fire is
a guard nobody knows the state of.

## The canary is minted per install

One random token, written into a single file under the profile and listed as a
term. It catches a whole personal file being copied into the tracked tree, which
term matching alone would miss.

**A token shipped with the toolkit would be identical for everyone and would
prove nothing.** That is the entire reason it is generated rather than
distributed, and why the denylist template ships with its format and no terms.

A related question is settled in the same spirit and asked **before the first
claim is written**: which repositories, employers, clients, products or projects
the system may not read, count or name at all. Asked once, wider than the
repository list on screen, and honoured on every later enumeration — an excluded
entry is not named anywhere afterwards, including in a note saying something was
excluded. Retracting a name from a profile, a story and a deep dive costs what
retracting a bad number costs, and unlike a bad number it was avoidable by
asking.

## The escape hatches

Three markers, each suppressing exactly one heuristic and never the denylist:
`allow-path` for a file whose job is naming the personal directories,
`allow-cadence` for meta-text about the cadence rule, and `allow-fixtures` for
the tests. A real name in a fixture still fails, because term matching is the
actual privacy boundary and nothing turns it off.

## Where it lives

- [`tools/leak-check.ts`](../../tools/leak-check.ts) — the tiers, in the header comment
- [`policy/README.md`](../../policy/README.md) — why every policy file carries `allow-path`
- [`templates/denylist.txt`](../../templates/denylist.txt) — the format, and why the canary is per install

*In the history:* `77db58f` `e17bdf0` `e1e5232` `0003deb` `73480c7` `45dc052` `97a8900` `b9b61ca` `927c339` `7dcfd31`
