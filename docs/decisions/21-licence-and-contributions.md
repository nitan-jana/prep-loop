<!-- leak-check: allow-path — names the folder no licence reaches -->

# AGPL, with a contributor licence agreement

The project is licensed under AGPL-3.0. A first-time contributor is asked to
sign a CLA before their pull request is merged.

## What the licence is there for

Using it changes nothing for a user: clone it, modify it, run it on a personal
machine, keep the changes private. The licence asks nothing.

**Running a modified version as a network service** obliges that version's
source to be offered to its users. That clause is the reason the project is
under this licence and not a permissive one, and it is stated in those terms
rather than left to be inferred from the name.

## Why a CLA, said plainly

It keeps relicensing possible. A project owned entirely by one copyright holder
can offer itself under different terms later — a commercial licence for someone
who needs one, or a more permissive licence if that turns out to be the better
call. Once contributions are held by several people under AGPL alone, every one
of them has to agree to any such change, and in practice that means it never
happens.

The reasoning is written into `CONTRIBUTING.md` rather than assumed, along with
the alternative: someone who would rather not sign can still open an issue
describing the change, and the change can be written independently.

## The licence reaches software, never prep data

Prep data is not software and no licence touches it. It lives in the ignored
folder, is never part of the repository, and nothing in a software licence
reaches it. That sentence appears in both the readme and the contributing guide,
because a licence change is exactly the moment someone would reasonably wonder.

## The one file the leak checker does not read

`LICENSE`. A copyright line is a name and a year by definition, which is the
thing the checker rejects everywhere else. It sits outside the scanned roots
with a comment saying why, and the repo map names it as a deliberate exception
rather than leaving it looking like an oversight.

## Where it lives

- [`LICENSE`](../../LICENSE)
- [`CONTRIBUTING.md`](../../CONTRIBUTING.md) — the licence in practice, the CLA, and what the checks enforce
- [`policy/repo-map.md`](../../policy/repo-map.md) — the exception, stated in the map

*In the history:* `891c6b6` `45dc052` `cd892bd`
