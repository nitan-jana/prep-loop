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
| Built by | <fetcher / parsed index / pasted / stub> |
| Completeness | <complete / partial / stub> |

**Completeness is load-bearing.** A partial inventory is safe to use and a stub
is safe to use — but only a name confirmed to be *in* the file may be spoken in
a round. A thin catalog is a smaller vocabulary, never a licence to guess.

## Entries

Headings carry no numbers. Once nothing is numbered, renumbering is impossible
and every anchor keeps working.

| Identifier | Title | Topic | Difficulty | Last worked | Grade |
|---|---|---|---|---|---|
| <id or slug> | <title> | <topic> | <as the source labels it> | <date> | |

The last two columns are written by the system, not by the fetcher. They are
what makes retention sourcing possible — see
[`policy/mock-sourcing.md`](../policy/mock-sourcing.md#retention-before-novelty).

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
