<!-- leak-check: allow-path — names the inventory directory it is a template for -->

# <Source name>

An inventory of one resource, at `instance/curriculum/<source-slug>.md`. It exists so a
round can **name** a question the user can go and look at afterwards.

That is the whole purpose, and it sets the bar for what belongs here:
identifiers and titles, enough to find the thing. Not solutions, not
explanations, not the contents. See
[`policy/mock-sourcing.md`](../policy/mock-sourcing.md#never-invent-a-question-name).

## Source

| Field | Value |
|---|---|
| Name | <name> |
| Where | <url or description> |
| Access | <free / paid / owned> |
| Covers | <which round types> |
| Built by | <fetcher / sitemap / feed / app data / parsed index / rendered / console / pasted / stub> |
| Completeness | <complete / partial / stub> |
| Cross-checked against | <sitemap, or what was used instead, or nothing> |
| Pulled | <date> |
| Refresh | <how often, or `static` and what would change that> |
| Fastest-moving part | <the section that goes stale first, if any> |

**Completeness is load-bearing.** A partial inventory is safe to use and a stub
is safe to use — but only a name confirmed to be *in* the file may be spoken in
a round. A thin catalog is a smaller vocabulary, never a licence to guess.

**Freshness is the same rule arriving later.** An inventory that has rotted
names questions that no longer exist, which is the failure the whole file is
built to prevent, except harder to spot because the file looks fine. So the
pull date is recorded and the refresh expectation is stated up front rather
than inferred.

Some sources genuinely do not move. Say `static` and say what would change it,
because "no refresh needed" and "nobody has checked" look identical a month
later.

## Known quirks

Per-source facts that stop a wrong name being used. Written down the first time
one is hit, because every one of them is discovered by getting something wrong.

| Quirk | Consequence |
|---|---|
| <what the source does that is not obvious> | <what goes wrong if it is not known> |

The kind of thing that belongs here: identifiers that differ from the ones the
source is known by elsewhere, so a guessed address resolves to nothing; entries
filed under a different grouping than the canonical list uses; gating that
changes more often than the entry list does.

Each one written as an instruction to the next pull, never as an account of a
previous one. See
[`policy/artifact-voice.md`](../policy/artifact-voice.md#does-it-instruct-or-does-it-narrate).

## Entries

Headings carry no numbers. Once nothing is numbered, renumbering is impossible
and every anchor keeps working.

| Identifier | Title | Link | Topic | Difficulty | Last worked | Last asked | Grade |
|---|---|---|---|---|---|---|---|
| <id or slug> | <title> | <url> | <topic> | <as the source labels it> | <date> | <date> | <grade · the file holding the answer> |

**Capture the link per entry, not just for the source.** A block description
carries the task and the link to the material, so an inventory of names without
addresses forces whoever writes that block to go looking, every time. Where the
source has no stable per-entry URL, leave it empty rather than constructing one.

The last three columns are written by the system, not by the fetcher. They are
what makes retention sourcing possible — see
[`policy/mock-sourcing.md`](../policy/mock-sourcing.md#what-the-inventory-records)
for what each one means and which session writes it.

**`Last worked` and `Last asked` are different facts.** The material was in
front of the user; it was questioned and graded. A block names more entries than
one session can test, so the pair with a date and an empty ask is the normal
state of most of the file, and it is the state a retention question is drawn
from. Collapsing them into one column makes a studied entry look like a passed
one.

`Grade` names the log or review file that holds the quoted answer. It is an
index into that file, never a substitute for it —
[`policy/grading.md`](../policy/grading.md#a-grade-without-the-answer-is-not-a-grade).

**A refresh merges these columns forward.** Re-pulling a source rebuilds the
entries; it does not reset what this install did with them. See
[`policy/repo-map.md`](../policy/repo-map.md#who-writes-what).

## Groups

Where the source organises entries into sections, patterns or tracks, mirror
that structure with plain ASCII headings so a round can draw from one group.

### <group name>

<identifiers in this group>

## Paid sources

Nothing paywalled is copied into this repo, and no fetcher for a paid source
ships with the toolkit. What ships is a stub the user fills against their own
account, holding identifiers and titles only.

The toolkit distributes fetchers, never contents. A public list has real data
behind it; a paid one has a subscription behind it, and redistributing what is
on the other side of that is both a terms problem and an unfriendly act toward
a vendor the user is paying.
