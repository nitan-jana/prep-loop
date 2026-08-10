<!-- leak-check: allow-path — the onboarding progress tracker -->

# profile

Who this instance belongs to. Everything the rest of the repo reads about the
user, and the only place any of it is written down.

Every claim here carries a marker per [`policy/claims.md`](../../policy/claims.md).

## Onboarding progress

Onboarding is resumable. This table is how it knows where it stopped.

| Stage | File | Status |
|---|---|---|
| Spine | [`identity.md`](identity.md) | not started |
| Spine | [`attribution.md`](attribution.md) | not started |
| Spine | [`state.md`](state.md) | not started |
| Spine | [`schedule.md`](schedule.md) | not started |
| Resources | [`resources.md`](resources.md) | not started |
| Resources | one inventory per source | not started |
| Material | [`story-bank.md`](story-bank.md) | not started |
| Material | [`tenure-script.md`](tenure-script.md) | not started |
| Material | [`showcase-questions.md`](showcase-questions.md) | not started |
| Search | [`projects.md`](projects.md) | not started |
| Search | [`outbound.md`](outbound.md) | not started |
| Deferred | [`habits.md`](habits.md) | fills from rounds |
| Deferred | [`grading-anchors.md`](grading-anchors.md) | fills from graded answers |

Status is one of `not started`, `in progress`, `done`.

## Capabilities

What was available when the profile was built. Re-running verification once a
missing one arrives upgrades `stated` claims in place.

| Source | Available | Notes |
|---|---|---|
| Code host, authenticated | <yes/no> | |
| Resume | <yes/no> | |
| Public profile text | <yes/no> | |
| Calendar | <yes/no> | |
