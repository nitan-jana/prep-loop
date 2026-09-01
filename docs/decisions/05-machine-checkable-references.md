<!-- leak-check: allow-path — names the ignored folder to explain what may not be linked -->

# Every reference is machine-checkable

A file link or a heading anchor, never a section number. The link checker fails
the run on a dead link, a fragment matching no heading, and the section symbol
appearing anywhere at all.

## Why numbers lost

A relative link is checkable by a program. A section number is a string only a
human can check, and it is wrong the moment anything above it is inserted or
removed — silently, with the citation still looking correct.

The same argument runs through the rest of the repo:

**Inventory headings carry no numbers.** Once nothing is numbered, renumbering
is impossible and every anchor keeps working.

**Headings are the finest addressable unit.** Something that needs to be
linkable gets a heading. Link-target headings stay short and plain, because an
em dash or a slash survives the prose and vanishes from the slug, leaving a
fragment that looks right and matches nothing — which is why the slug function
has a test for exactly that case.

## The rule that keeps the checker runnable on a clean clone

**Only what exists in a fresh clone may be linked.** Policy files, tools, docs
and templates are linkable. Anything under the ignored folder is named in
backticks instead — a path, not a link.

Those files do not exist until onboarding has run, so linking them would make
the check fail on every clean clone, and **a link check that cannot pass on a
clean clone is a check nobody runs**.

## Why this matters more here than in most repos

The whole system is prose pointing at other prose. [Nothing is
restated](07-point-never-paraphrase.md), so a rule is only reachable through the
link that names it. A broken link is not a cosmetic defect in that design — it
is a rule that has silently stopped applying.

## The local folder is a second question, not a second tier

Links from a profile into `policy/` rot when a heading is renamed, and nothing
caught it. Two had: one at a renamed heading, one at an anchor naming a block
its subject had moved out of. Renaming a policy heading is what breaks them, so
the damage is caused in the tracked half and lands in the untracked one.

The obvious fix — scan `instance/` as part of the run — was tried and reverted
twice over, first blocking and then reporting. Both were wrong, for the same
reason stated two different ways.

**A blocking check has to mean the same thing everywhere.** `bun run check` is
what the pre-commit hook runs and what CI runs. CI has no `instance/`, and no
two installs have the same one, so a commit that failed locally would pass on
the runner and pass for everybody else. A gate whose verdict depends on
untracked personal files is not a gate. It would also put a typo in a curriculum
row between the user and a commit to the repo, which inverts what is public and
what is private.

**A non-blocking report inside a blocking run gets ignored.** That was the
second attempt: print the rot, stay green. It is the tiering
[the leak checker uses](02-the-leak-checker-tiers.md) and it works there, where
the reported tiers describe the tracked files the run is already about. Here it
would have added a line about a different subject to a command asking a
different question — noise attached to the one output that has to stay worth
reading.

So the scan lives behind its own name. `check:profile` points the same checker
at `instance/`, exits non-zero like any check, and is run when the question is
actually being asked — after a session that renamed a heading. The default run
went back to the tracked repo, which is the only thing it can honestly speak
for.

## Where it lives

- [`tools/check-links.ts`](../../tools/check-links.ts) — the three failures, and the two ways it is run, in its header
- [`policy/README.md`](../../policy/README.md) — the house style for writing a policy file
- [`CLAUDE.md`](../../CLAUDE.md) — the rule, stated where every session reads it

*In the history:* `d5da51e` `4facbb2` `de76e63` `7a1933e` `64bdc77`
