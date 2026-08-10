<!-- leak-check: allow-path — names the personal files these are templates for -->

# templates

The blank shape of every file the system produces. Shareable, so a fresh clone
shows what a filled repo looks like before anything has been filled.

| Template | Becomes |
|---|---|
| [`profile/`](profile/README.md) | `profile/`, written by onboarding |
| [`catalog.md`](catalog.md) | `curriculum/<source-slug>.md`, one per resource |

Two of the profile templates are deliberately unfillable at onboarding:
[`profile/habits.md`](profile/habits.md) needs rounds to observe, and
[`profile/grading-anchors.md`](profile/grading-anchors.md) needs real graded
answers. Each says so in place of a shape.

## Conventions

**Angle brackets are placeholders.** `<day>`, `<count>`, `<slug>` — replaced
wholesale, brackets included.

**Every claim carries a marker.** `verified`, `stated` or `contested`, per
[`policy/claims.md`](../policy/claims.md). A template row with no marker column
is a template for something that is not a claim.

**Templates carry no examples.** An example weekday, an example vendor or an
example number is one user's setup shipped to everyone, and it gets left in
place more often than it gets replaced.
