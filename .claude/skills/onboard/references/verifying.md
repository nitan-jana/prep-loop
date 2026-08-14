<!-- leak-check: allow-path — detection and verification both touch the personal half -->

# Detecting sources and verifying claims

What [`policy/claims.md`](../../../../policy/claims.md) means in commands. The
policy says what a marker means; this says how to earn one.

## Detection, once, at the start

Run these before the first question. Report the result in a single line, then
never ask about any of them again in the session.

```bash
gh auth status                    # an authenticated code host
ls instance/intake/               # a resume or exported profile dropped in
```

Also check whether a calendar server is connected. **Configuration files are
not the answer** — a connected server can be entirely invisible to them. Look
at the tools actually available in the session. If the calendar is reachable,
fill the server identifier into the local settings file from the committed
example.

Report every accepted source and its status, not only the ones that turned up.
A user cannot offer something they do not know is wanted:

> Code host authenticated as `<handle>`. No resume in `instance/intake/`, drop
> one there or paste it. Also useful if they exist: a public profile pasted as
> text, for a contradiction check, and a performance review or old job
> description, for scope and title claims the commit history cannot show. Any
> of these can be skipped, and skipping means those claims land `stated`.

Do not ask for a profile export archive. It is a manual download, arrives as a
folder of files, and mostly restates the resume. Pasted text gets nearly all of
it, and saying so saves the user the round trip.

## Enumerating before asking

```bash
gh repo list --limit 100 --json name,visibility,pushedAt,isFork
```

This is what makes the first question of a stage grounded. Bring the list into
the room rather than asking the user to remember what they have built.

**Look for private repositories and forks specifically.** They are where the
real work often is, they are invisible to anyone searching from outside, and a
user listing their projects from memory tends to skip them.

## Ask what is out of bounds, before writing anything

Show the list, then ask what must not be read or recorded, and why.

**Ask wider than the list.** Repositories are what is on screen, but the same
constraint covers an employer's name, a client's name, a product that was never
announced, and a project with no repository at all. Asking only about the rows
in front of the user gets an answer only about those rows.

One question, covering all of it, once.

This is not the same question as which project to steer an interviewer away
from, which comes later and is about what to volunteer in a room. This one is
about what the system is allowed to put on disk at all. Employer-owned code
under an agreement, a client repository, someone else's work sitting in a fork:
for those, even the name in a file is a problem, and the folder being local does
not change that.

**Ask once, before the first claim is written.** Retracting a repository name
from a profile, a story and a deep dive costs the same as retracting a bad
number, and this one was avoidable by asking.

Record the answer in `instance/profile/attribution.md` under its exclusions
table, and honour it on every later enumeration. An excluded repository is not
listed, not counted, and not named — including in a note explaining that
something was excluded.

## Counting contributions

```bash
gh api repos/<owner>/<name>/commits --paginate \
  -q '[.[] | select(.commit.author.name == "<name>")] | length'
```

Two gotchas, both of which produce a confidently wrong zero:

**Filter on `.commit.author.name`, not `.author.login`.** The login is the
linked account and is null far more often than expected — old commits, a
changed handle, an email that was never added to the account.

**Commit search does not reach private repositories.** A search that returns
nothing is not evidence that nothing is there. Go through the repository
endpoint per repo instead.

A changed handle is worth asking about directly. History written under an old
one still counts and will not turn up under the current one.

## Recording a verification

The command goes into the file **verbatim and re-runnable**, next to the claim.

| Claim | Value | Marker | Checked against |
|---|---|---|---|
| Commits on `<repo>` | `<count>` | `verified` | `gh api repos/<owner>/<name>/commits --paginate -q '...'` |

A note reading "checked against the repository" is not evidence. It asserts
that someone once checked, which is the thing being claimed in the first place.

**Anything that cannot be checked is marked `stated` and moves on.** That is a
normal outcome, not a gap to apologise for.

Cannot, though, not merely has not — the obstacle goes in the source column, and
"cannot" is not the right word for a public changelog nobody opened. See
[unverifiable is not unverified](../../../../policy/claims.md#unverifiable-is-not-unverified).

## Contradictions

When the resume and a public profile disagree, or either disagrees with the
history, the claim is `contested`. Record both readings with their sources and
**do not resolve it silently** — not toward the more flattering one, not toward
the more recent one. Surface it and let the user decide, because a recruiter
with both tabs open will surface it too.

## The denylist and the canary

`instance/private/denylist.txt` starts with its format and no terms. Fill it as
the profile is written, in the same step:

- Every name, employer, domain, school, city and distinctive figure that lands
  in `instance/profile/` gets a term.
- Short numbers are word-bounded — `re:\b<number>\b`, never a bare figure that
  will fire on ordinary prose.
- Mint **one random token** and write it into a single file under `instance/profile/`,
  and add it as a term. It catches a whole file being copied into the shareable
  half, which term matching alone would miss.

The token is generated per install. One shipped with the toolkit would be
identical for everyone and would prove nothing.

**Terms and profile drift apart into a denylist that passes a leak.** Adding
the term in the same step as the fact is what keeps them together.

Then confirm the check is live: put a term into a shareable file, run
`bun run check:leaks`, watch it fail, take it out, watch it pass.

## Re-running later

`/onboard verify` re-runs verification once a missing source arrives. It
rewrites `stated` to `verified` in place and attaches the command.

It never upgrades a marker without recording the evidence, and it never
downgrades one quietly — evidence contradicting a `verified` claim makes it
`contested`, with the original command left in the file so the disagreement can
be read.
