<!-- leak-check: allow-path — names the inventory directory it builds -->

# Building the inventories

The resource stage produces `instance/profile/resources.md` and one file under
`instance/curriculum/` per source, from [`templates/catalog.md`](../../../../templates/catalog.md).

An inventory exists for one reason: so a round can **name** a question the user
can go and look at afterwards. See
[`policy/mock-sourcing.md`](../../../../policy/mock-sourcing.md#never-invent-a-question-name),
which is the rule this whole stage serves.

## Ask what they already use

Do not open with a recommendation. Most people arrive with resources already in
progress, and replacing them costs weeks of accumulated familiarity for no
gain.

Open with what is already being worked from, then ask what each one is *for* —
which round types it feeds. The gaps fall out of that answer, and only the gaps
are worth a recommendation.

Record the rejections too. A source considered and dropped, with the reason,
stops the same decision being remade every few weeks.

## Acquisition, in order of preference

| Situation | How the inventory gets built |
|---|---|
| A well-known public list | A fetcher ships with the toolkit |
| Any URL with an index page | Fetch it, parse it, have the user confirm the result |
| Neither, but the user has the list | Paste it |
| Nothing enumerable | A stub that grows in use |

Degrade down the table without ceremony. A pasted list of thirty entries is
worth more than a perfect fetcher that does not exist yet.

**Have the user confirm a parsed result.** A parser that silently caught half a
page produces an inventory that looks complete and is not, and every round
sourcing from it inherits the gap.

## Completeness is recorded, not assumed

Every inventory states whether it is complete, partial or a stub, and that
field is read by anything sourcing from it.

**A stub tightens the rule rather than relaxing it.** With a thin catalog, only
a name confirmed to be in the file may be spoken in a round. A small vocabulary
is not a licence to guess — naming a question that does not exist is the worst
failure the system has, because the user goes looking, finds nothing, and stops
trusting every named reference afterwards.

## Paid sources

**Nothing paywalled is copied into this repo, and no fetcher for a paid source
ships with the toolkit.**

What ships is a stub. The user fills it against their own account, and it holds
identifiers and titles only — enough to name a question, never the contents.

The toolkit distributes fetchers, not material. A public list has real data
behind it; a paid one has a subscription behind it, and redistributing what is
on the other side of that is both a terms problem and an unfriendly act toward
a vendor the user is paying.

## Structure

Headings carry no numbers, so renumbering is impossible and anchors keep
working. Where the source groups its entries into sections, tracks or patterns,
mirror that structure with plain headings — a round often wants to draw from
one group rather than the whole list.

Leave the last-worked and grade columns empty. Those are written by the system
as rounds happen, and they are what makes retention sourcing possible later.
