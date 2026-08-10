<!-- leak-check: allow-path — policy's job is to say where things live -->

# policy

How the system works, in the abstract. One question per file.

Nothing here is true of one person in particular. Cadence, claims, resources,
thresholds and habits are read from `instance/profile/`. Policy states the mechanism
those parameters feed.

## The files

| File | Answers |
|---|---|
| [`repo-map.md`](repo-map.md) | Where a thing lives, and who may write it |
| [`cadence.md`](cadence.md) | What a week is, and what a block is |
| [`caps.md`](caps.md) | How much a single day is allowed to carry |
| [`claims.md`](claims.md) | What makes a statement about the user safe to write |
| [`artifact-voice.md`](artifact-voice.md) | How anything read daily is written |
| [`calendar.md`](calendar.md) | How the calendar and the repo stay one thing |
| [`grading.md`](grading.md) | What a grade means, and what makes one valid |
| [`interviewing.md`](interviewing.md) | How a round is conducted |
| [`checkin-protocol.md`](checkin-protocol.md) | How a day is closed out |
| [`mock-sourcing.md`](mock-sourcing.md) | Where a question comes from |
| [`mocks.md`](mocks.md) | How a loop runs, and what a transcript must contain |
| [`story-craft.md`](story-craft.md) | What makes an interview story usable |
| [`frameworks.md`](frameworks.md) | How a framework is used, and what it is not for |
| [`readiness.md`](readiness.md) | How the system knows whether it is working |

## Writing a policy file

**One question per file.** A file is the unit of reference — a skill points at
`policy/grading.md` and gets everything about grading. A rule that seems to
belong in two files belongs in one, and the other links it.

**Point, never paraphrase.** Restating a rule creates a second copy that will
drift. Where a file needs a rule that lives elsewhere, it links. Where it
deliberately departs from one, it says so and gives the reason.

**No section numbers.** Cite a file, or a heading anchor within one. A relative
link is machine-checkable; a section number is a string only a human can check.
[`tools/check-links.ts`](../tools/check-links.ts) fails the run on either
problem, and on the section symbol appearing anywhere at all.

**Link only what exists in a fresh clone.** Policy files, tools and docs may be
linked. Anything under a personal directory is named in backticks instead —
`instance/profile/state.md`, not a link to it. Those files do not exist until onboarding
has run, and a link check that cannot pass on a clean clone is a check nobody
runs.

**Headings are the finest addressable unit.** Something needs to be linkable,
give it a heading. Keep link-target headings short and plain: an em dash or a
slash survives the prose and vanishes from the slug, leaving a fragment that
looks right and matches nothing.

**Third person.** Policy addresses whoever is executing it, about a user who is
not in the room. "The candidate", "the interviewer", "the planner" — never the
second person, which reads as instruction to the user and belongs in
`templates/` instead.

**No dates, no proper nouns, no cadence.** Not a year, not a weekday, not a
clock time, not a timezone, not a named vendor or framework. Which of those a
particular user runs on is a profile fact.
[`tools/leak-check.ts`](../tools/leak-check.ts) reports all of it.

## About the allow-path marker

Every file here carries `leak-check: allow-path`, because naming the personal
directories is the point of the directory. The marker suppresses the
directory-name rule and nothing else — a denylist term still fails, and so does
a year, which is what a real artifact filename contains. Naming `instance/logs/` is
policy; naming one log file is a leak, and it stays caught.
