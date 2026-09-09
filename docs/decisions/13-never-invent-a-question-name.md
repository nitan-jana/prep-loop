<!-- leak-check: allow-path — names the inventories a question is drawn from -->

# Never name a question that does not exist

A round names a question the user can go and look at afterwards. That means it
comes from an inventory, and nowhere else.

## Why it is the worst failure in the system

The user goes looking, cannot find it, and from then on cannot trust **any**
named reference the system produces. Everything downstream — a drill list, a
retention window, a deferred item, a calendar block — depends on names being
real.

Where no inventory covers the topic, the round asks the question in full instead
of naming it, and says so. A question stated in the round is honest; a
plausible-looking name is not.

**A thin catalog tightens the rule rather than relaxing it.** With a stub, only a
name confirmed to be in the file may be spoken. A small vocabulary is not a
licence to guess — which is the opposite of the instinct, and why it is written
down.

## The consequence nobody planned for

This one rule is why building the inventories turned out to be the largest piece
of work in the system. A round that may only speak real names needs a real list
of them, per source, before it can run at all — so onboarding grew a whole
acquisition ladder, and the catalog template grew fields for completeness,
freshness and per-source quirks.

The ladder itself is procedure and lives in the skill. Three decisions inside it
are not:

**Cross-check against the sitemap, whatever built the file.** A parse that caught
six hundred and forty of six hundred and fifty entries looks finished, reads
consistently, and passes every check working from what it already has. The
missing ten are invisible from the inside; a sitemap is the outside. One fetch,
after the real work rather than instead of it, and it is the difference between
`complete` because it is and `complete` because nobody counted.

**Capture the link per entry, and leave it empty when there is none.** Without
links, every session scheduling a block goes and finds the thing again. But an
address assembled from a pattern because it looks right fails exactly the way an
invented name does, and is harder to notice.

**Record freshness, not just completeness.** An inventory that has rotted names
questions that no longer exist — the same failure arriving later, and harder to
spot because the file looks fine. Sources that genuinely do not move say `static`
and say what would change that, because "no refresh needed" and "nobody has
checked" look identical a month on.

## Where it lives

- [`policy/mock-sourcing.md`](../../policy/mock-sourcing.md) — the rule, and where a question may come from
- [`.claude/skills/onboard/references/catalogs.md`](../../.claude/skills/onboard/references/catalogs.md) — the acquisition ladder, completeness, freshness, quirks, links
- [`tools/schema.sql`](../../tools/schema.sql) — the shape those fields take in `prep.db`

*In the history:* `6f7a57c` `7a1933e` `927c339` `a281ab5` `2210af9` `31ec445` `9d58d1b`
