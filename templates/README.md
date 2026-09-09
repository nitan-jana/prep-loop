# templates

The blank shape of everything the system produces. Tracked, so a fresh clone
shows what a filled install looks like before anything has been filled.

| Template | Becomes |
|---|---|
| [`instance-README.md`](instance-README.md) | `instance/README.md` |
| [`profile/`](profile/README.md) | `instance/profile/`, written by onboarding |
| [`week-plan.md`](week-plan.md) | `instance/plans/<week>.md`, one per week |
| [`daily-log.md`](daily-log.md) | `instance/logs/<date>.md`, one per working day |
| [`round-brief.md`](round-brief.md) | `instance/mocks/<date>-brief.md`, one per loop |
| [`review.md`](review.md) | `instance/performance/<week>.md`, one per review |
| [`recall.md`](recall.md) | `instance/performance/<date>-recall.md`, one per recall day |
| [`story.md`](story.md) | `instance/stories/<slug>.md`, one per story |
| [`deep-dive.md`](deep-dive.md) | `instance/deep-dives/<project-slug>.md`, one per project |
| [`denylist.txt`](denylist.txt) | `instance/private/denylist.txt` |

Two of the profile templates are deliberately unfillable at onboarding:
[`profile/habits.md`](profile/habits.md) needs rounds to observe, and
[`profile/grading-anchors.md`](profile/grading-anchors.md) needs real graded
answers. Each says so in place of a shape.

The resource inventory is not here: it is structured data, not a markdown
artifact. It lives at `instance/prep.db`; its shape is
[`tools/schema.sql`](../tools/schema.sql), mapped in
[`docs/schema.md`](../docs/schema.md).

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

**A `.yaml` beside a `.md` is one file in two halves.** The yaml holds every
value a session reads. The markdown holds why each is what it is, and repeats
none of them — a number written in both is a number that will be right in one.
Reference a yaml key in backticks, never as a link anchor: a `#fragment` on a
non-markdown target is silently skipped by
[`tools/check-links.ts`](../tools/check-links.ts) and verifies nothing.
