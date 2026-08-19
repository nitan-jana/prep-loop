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

## Where it lives

- [`tools/check-links.ts`](../../tools/check-links.ts) — the three failures, in its header
- [`policy/README.md`](../../policy/README.md) — the house style for writing a policy file
- [`CLAUDE.md`](../../CLAUDE.md) — the rule, stated where every session reads it

*In the history:* `d5da51e` `4facbb2` `de76e63` `7a1933e` `64bdc77`
