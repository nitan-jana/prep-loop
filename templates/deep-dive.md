<!-- leak-check: allow-path — names the personal file it is a template for -->

# Deep dive

One project's deep-dive answers, at `instance/deep-dives/<project-slug>.md`.

A deep-dive round asks why a thing was built the way it was and what that cost.
It opens on the **weakest-evidenced claim**, not the most interesting one, per
[`policy/claims.md`](../policy/claims.md#what-the-markers-are-for-downstream) —
so this file is ordered with the thinnest evidence first.

Every claim carries a marker. The attribution boundary is settled before any of
them is written.

**Everything below the line is the template. Delete this preamble, and
keep the heading that follows it.**

---

# <project name>

| Field | Value |
|---|---|
| Where it lives | <repository or description> |
| The user's part | <precisely which surface, and who else worked on it> |

## Claims

| Claim | Marker | Checked against |
|---|---|---|
| <what is asserted> | <verified / stated / contested> | <the command or query, verbatim> |

## <decision>

**What was chosen.** <the decision>

**What it cost.** <the tradeoff — a mechanism described without its cost is the most common incomplete answer>

**What was rejected.** <the alternative, and why it lost>

**Where it stops working.** <the boundary, and what would break first>

## Drill chain

Answered in writing before being drilled aloud. Each answer invites the next
question, which is how a real deep dive runs.

| Question | Answer |
|---|---|
| <the opening question> | <the answer> |
| <what that answer invites> | <the answer> |
