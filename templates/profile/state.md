<!-- leak-check: allow-path — points at the policy files these facts parameterise -->

# State

Every live fact with a date attached, in one place. Anything a session needs to
know about *right now* rather than in general.

This file exists so that a moving fact has exactly one home. A guardrail
copied into three skills is a guardrail that will be right in two of them.

## Now

| Fact | Value | Since |
|---|---|---|
| Preparation started | | <date> |
| Sourcing phase | <from studied material / cold> | <date> |
| Next phase flip | <what changes, and what triggers it> | |
| Track split | <how effort divides across round types> | <date> |

Sourcing phase is read by [`policy/mock-sourcing.md`](../../policy/mock-sourcing.md#sourcing-phase).

## Readiness

One row per round type, per [`policy/readiness.md`](../../policy/readiness.md#the-ladder).

| Round type | Rung | Since | Last review |
|---|---|---|---|
| <type> | <can reconstruct / under time / can defend / cold> | <date> | |

## Paused

Things deliberately not being worked on, and what unpauses them. A paused
thread is not a deferred item — it is not waiting for a free block, it is
waiting for a condition.

| Thread | Unpaused by |
|---|---|
| <what> | <the condition, not a date> |
