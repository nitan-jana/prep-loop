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
| Anything with a URL | Look for a structured index first, see below |
| An index that is in the HTML | Fetch it, parse it, have the user confirm the result |
| An index drawn by scripts | Needs a browser, and usually does not, see below |
| None of that works | The user pastes it, see below |
| Nothing enumerable at all | A stub that grows in use |

Degrade down the table without ceremony. A pasted list of thirty entries is
worth more than a perfect fetcher that does not exist yet.

**Work the chain silently.** Everything above the paste rung costs the user
nothing, so it happens without narration. Do not report each attempt, do not
explain what is being tried next, and do not ask permission to try the next
rung. Watching four fetches fail one at a time is work, even for someone who is
only reading.

Speak twice. Once if the chain reaches a rung that needs them, and once at the
end with what came out. Both in a line.

**When the user is needed, ask for everything at once.** The snippet, where to
run it, and what the output should look like, in a single message. A rung that
turns into four exchanges costs more than the rung above it saved.

**Have the user confirm a parsed result.** A parser that silently caught half a
page produces an inventory that looks complete and is not, and every round
sourcing from it inherits the gap.

## Look for a structured index first

Before parsing any page, check whether the site already publishes its own list.
This is faster than parsing an index however the site is built, and it is the
one path that does not care whether the page renders on the server or in the
browser.

In order, taking the first that carries what is needed:

1. **`robots.txt`.** It usually declares `Sitemap:` lines, including paths that
   are not at the obvious location. One fetch, and it tells you where to go.
2. **The sitemap.** `sitemap.xml`, often a `sitemap_index.xml` pointing at
   several. Static XML served by the origin, so a client-rendered app publishes
   one exactly like any other. Gives every entry URL, sometimes a last-modified
   date.
3. **A feed.** `rss.xml`, `feed.xml`, `atom.xml`. Fewer entries than a sitemap
   as a rule, but carries titles alongside the links rather than only paths.
4. **The data the app itself fetches.** A client-rendered index gets its entries
   from somewhere: a JSON endpoint, or a blob embedded in the shell under a
   well-known global. Fetch the shell as raw text rather than as converted
   markdown, because the conversion is what discards it.

**Fetch raw, not converted.** A markdown conversion is built to keep prose and
drop everything else, which includes the script contents where a client-rendered
page keeps its entries. Pull the bytes with a plain command-line fetch and read
them as text. The page that looked empty usually is not.

That same fetch is what carries a User-Agent header for a refused page, and what
calls a JSON endpoint directly once one is found. It cannot run scripts, so it
is no help for rendering, but rendering is the last resort and this is most of
the path to it.

## Cross-check against the sitemap, whatever built the file

The rungs are ordered by what they carry, not by which one to stop at. A page
payload or a parsed index usually beats a sitemap, because it has titles,
difficulty, lesson counts and access flags where the sitemap has only
addresses. So the sitemap is rarely the thing an inventory is built *from*.

**It is always the thing the inventory is checked against.** Once the entries
exist, diff their addresses against the sitemap and account for anything on one
side and not the other.

This is the only step that catches the failure nothing else can see. A payload
parse that caught six hundred and forty of six hundred and fifty entries looks
finished, reads consistently, and passes every check that works from what it
already has. The missing ten are invisible from the inside. A sitemap is the
outside.

It is one fetch, it runs after the real work rather than instead of it, and it
is the difference between an inventory marked `complete` because it is and one
marked `complete` because nobody counted.

Where the two disagree and the gap cannot be explained, the inventory is
`partial` and says which part.

**A sitemap gives addresses, not metadata.** Titles often have to come from the
slug, and topic and difficulty usually are not there at all. That is a
`partial` inventory, which is a fine thing to have and must be recorded as one.
Filling the metadata is a later pass, or a cheap per-page fetch across the
subset that actually gets used.

For a paid source this changes nothing about what may be stored. A sitemap
lists addresses and names of things behind the paywall, which is exactly what an
inventory is allowed to hold, and nothing on the other side of it is fetched.

## When the fetch is refused

A page that comes back as `403`, a challenge page, or a few hundred bytes of
interstitial saying the browser is being checked has not been rendered wrong.
It has been declined. The
site is filtering on the request, not on what the page is made of, and every
rung below this one is the wrong tool for it.

Retry once with a real browser User-Agent. A plain command-line fetch announces
itself as one, and a good number of sites serve the full page to anything that
looks like a browser and nothing to anything that does not. One header, one
retry, and the page arrives complete.

**Try this before the sitemap and before any snippet.** A refusal and a
script-rendered shell are easy to confuse — both come back short and without
entries — and the fixes have nothing to do with each other. Check the status
code first: a `200` that is empty is a rendering problem, and anything else is
this one.

If it is still refused after that, stop. Do not work through header
combinations trying to get past a filter that is choosing not to serve. Go to
the paste ladder, where the user's own browser is already logged in and already
allowed.

## When the page is drawn by scripts

A plain fetch of a client-rendered index returns a shell: a root element, a few
script tags, and none of the entries. **Recognise that in one look and stop
parsing.** It is not a parse waiting for a better selector, and retrying
variations of the same fetch spends the session for nothing.

Stop parsing, but do not give up. Almost every such page is reachable by the
structured index above, because the sitemap is static however the page renders,
and because the entries the app is about to draw are usually sitting in the
shell already. Exhaust that before concluding the source cannot be enumerated.

Only when none of it works does rendering matter, and rendering needs a real
browser. The toolkit ships none and installs none, so this rung exists only
where the session already has browser automation attached.

**Look at the tools available in the session to find out. Do not ask, and do
not check configuration.** A connected server can be entirely invisible to
config files, and the user often does not know what is attached. This is the
same check the detection step makes for the calendar, and it is wrong the same
way if it is made by asking.

If a browser is there, render the page and parse the result.

**If it is not, do not offer to install one.** Onboarding meets this once or
twice, the paste ladder below settles it in about a minute, and browser
automation is a large install to propose to someone in the middle of doing
something else. Trading a minute of pasting for a few hundred megabytes and a
detour is a bad deal at that moment, and it is not this skill's business to put
software on a machine.

Instead, record it. Note in the inventory's quirks table that the source needed
rendering, so the next refresh knows before it starts. A user who hits that note
on several sources over a few months has a real reason to attach a browser, and
by then it is their decision made with evidence rather than a prompt interrupting
a stage.

**With no browser, go straight to paste.** They already have the page open, and
a copied list arrives faster than any further work on the fetch. Say which
source it was and why, once, then move on.

## What paste means

Not one thing. Three, and the difference between them is whether the inventory
comes out with addresses or only names.

**A page has no sitemap more often than it seems** — client-side routing with
nothing generated ahead of time is common, and then there is no static list to
find. That is the case this ladder exists for.

1. **A snippet the user runs in their browser console.** This is the good one.
   Their browser has already rendered the page, which makes it the renderer that
   was missing, and the DOM has both the titles and the addresses. Hand them a
   short expression that collects the entry links into JSON, and have them paste
   the output back.
2. **The page markup.** Copying the element that holds the list keeps the
   addresses, at the cost of a lot of noise to parse through.
3. **The visible text.** Titles only. Every address is lost, so the inventory is
   `partial` and says so, and links get filled later from the entries that
   actually get used.

Prefer the first. It is the only one that survives client rendering, returns
exactly the two fields that matter, and takes the user about as long as
selecting the page by hand.

**Write the snippet out plainly and keep it short enough to read.** Anything
pasted into a browser console runs with the user's session, and telling someone
to run code they cannot read is a habit worth not teaching, whoever wrote it.
Show what it collects, say it sends nothing anywhere, and let them look at it
before it runs.

Then confirm the result, per the rule above. A snippet that matched the wrong
anchors produces a tidy list of navigation links, which looks more convincing
than a half-parsed page and is just as wrong.

The failure to avoid is recording the shell. An inventory built from a page that
never rendered has entries missing, or worse, a handful of navigation links that
look like entries. Mark completeness honestly, and when in doubt call it a stub.

## Links, not just names

**Capture the per-entry address wherever the source exposes one.** An inventory
of names alone means every session that schedules a block has to go and find the
thing again, and a calendar description that should carry the task and its link
ends up carrying half of that.

This is worth a second pass over any inventory already built without them.

Where a source has no stable per-entry address, leave the field empty rather
than assembling one that looks right and resolves to nothing. That fails the
same way an invented question name does, and it is harder to notice.

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
