<!-- leak-check: allow-path — names the personal files these are templates for -->

# templates

The blank shape of everything the system produces. Tracked, so a fresh clone
shows what a filled install looks like before anything has been filled.

| Template | Becomes |
|---|---|
| [`instance-README.md`](instance-README.md) | `instance/README.md` |
| [`profile/`](profile/README.md) | `instance/profile/`, written by onboarding |
| [`catalog.md`](catalog.md) | `instance/curriculum/<source-slug>.md`, one per resource |
| [`denylist.txt`](denylist.txt) | `instance/private/denylist.txt` |

Two of the profile templates are deliberately unfillable at onboarding:
[`profile/habits.md`](profile/habits.md) needs rounds to observe, and
[`profile/grading-anchors.md`](profile/grading-anchors.md) needs real graded
answers. Each says so in place of a shape.

## The scaffold

Onboarding creates `instance/` and the directories under it, then copies
`profile/` and `denylist.txt` into place. The folder is not a git repository and
does not become one.

`profile/` sits one level down rather than under an `instance/` mirror so that
its relative links resolve from both places. A template linking `../../policy/`
is correct at `templates/profile/` and still correct at `instance/profile/`.

## Conventions

**Angle brackets are placeholders.** `<day>`, `<count>`, `<slug>` — replaced
wholesale, brackets included.

**Every claim carries a marker.** `verified`, `stated` or `contested`, per
[`policy/claims.md`](../policy/claims.md). A template row with no marker column
is a template for something that is not a claim.

**Templates carry no examples.** An example weekday, an example vendor or an
example number is one user's setup shipped to everyone, and it gets left in
place more often than it gets replaced.
