<!-- leak-check: allow-path — detection and verification both touch the personal half -->

# Detecting sources and verifying claims

What [`policy/claims.md`](../../../../policy/claims.md) means in commands. The
policy says what a marker means; this says how to earn one.

## Detection, once, at the start

Run these before the first question. Report the result in a single line, then
never ask about any of them again in the session.

```bash
gh auth status                    # an authenticated code host
ls intake/                        # a resume or exported profile dropped in
```

Also check whether a calendar server is connected. **Configuration files are
not the answer** — a connected server can be entirely invisible to them. Look
at the tools actually available in the session. If the calendar is reachable,
fill the server identifier into the local settings file from the committed
example.

Report like this, in one line, and move on:

> Code host authenticated as `<handle>`. No resume in `intake/` — drop one
> there or paste it, or skip and everything lands `stated`.

## Enumerating before asking

```bash
gh repo list --limit 100 --json name,visibility,pushedAt,isFork
```

This is what makes the first question of a stage grounded. Bring the list into
the room rather than asking the user to remember what they have built.

**Look for private repositories and forks specifically.** They are where the
real work often is, they are invisible to anyone searching from outside, and a
user listing their projects from memory tends to skip them.

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

## Contradictions

When the resume and a public profile disagree, or either disagrees with the
history, the claim is `contested`. Record both readings with their sources and
**do not resolve it silently** — not toward the more flattering one, not toward
the more recent one. Surface it and let the user decide, because a recruiter
with both tabs open will surface it too.

## The denylist and the canary

`private/denylist.txt` ships with its format and no terms. Fill it as the
profile is written, in the same step:

- Every name, employer, domain, school, city and distinctive figure that lands
  in `profile/` gets a term.
- Short numbers are word-bounded — `re:\b<number>\b`, never a bare figure that
  will fire on ordinary prose.
- Mint **one random token** and write it into a single file under `profile/`,
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
