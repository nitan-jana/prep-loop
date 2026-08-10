<!-- leak-check: allow-path — becomes the local folder's own README -->

# instance

Everything in this folder is personal and none of it is tracked.

The repo around it ignores this path entirely. There is no git here, no remote,
and no step in any session that pushes any of it anywhere. That is deliberate:
the profile holds claims about an employer, a resume, a record of a job search
in progress, and transcripts of answering questions badly. None of that should
be recoverable from a public repo, so none of it is in one.

| Directory | Holds |
|---|---|
| `profile/` | Who this install belongs to. Facts, claims, habits, cadence. |
| `curriculum/` | One inventory per resource in use. |
| `plans/` | What is planned, one file per week. |
| `logs/` | What happened, one file per working day. |
| `performance/` | Scored rounds, one file per review. |
| `mocks/` | Round briefs and transcripts. |
| `stories/` | Interview stories and their drill sheets. |
| `deep-dives/` | Project deep-dive answers. |
| `private/` | The denylist, read by the leak checker. |
| `intake/` | Documents dropped in from outside, such as a resume. |

## Two things worth knowing

**There is no undo.** The artifacts are append-only, so nothing is lost by not
versioning them, but the profile does get edited over time. A backup is worth
arranging, and arranging it is not something the system does.

**One file leaves this folder, and only when it is sent.** A round brief is
self-contained by design so that an interviewer which is not this repo can read
it without reaching back in here. Nothing else is ever shared, and nothing at
all is shared automatically.
