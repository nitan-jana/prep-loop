--
-- The resource inventory — every source, its entries and material, and the
-- coverage the check-in / loop / recall record against them. Lives beside the
-- local folder as prep.db (bun:sqlite, gitignored). Everything else stays as
-- files: plans, logs and briefs as markdown; claims, readiness, the story index
-- and observations as prose or small YAML under instance/profile/.
--
-- Conventions, not customisation: dates are TEXT in ISO 8601 (YYYY-MM-DD),
-- booleans are INTEGER 0/1, enums are CHECK constraints. STRICT tables so a
-- string cannot land in an integer column. Foreign keys must be turned on per
-- connection (PRAGMA foreign_keys = ON) — see tools/db.ts.

CREATE TABLE source (
  slug            TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  url             TEXT,
  access          TEXT CHECK (access IN ('free','freemium','paid','owned')),
  covers          TEXT,
  completeness    TEXT NOT NULL CHECK (completeness IN ('complete','partial','stub')),
  quirks          TEXT,                       -- newline-joined prose
  pulled_on       TEXT,                       -- ISO date
  built_by        TEXT,
  cross_checked   TEXT,
  refresh_cadence TEXT,
  fastest_moving  TEXT
) STRICT;

-- Round-sourceable questions. One row = one thing a mock round may name.
CREATE TABLE entry (
  id          INTEGER PRIMARY KEY,
  source_slug TEXT NOT NULL REFERENCES source(slug) ON DELETE CASCADE,
  section     TEXT NOT NULL DEFAULT '',       -- the source's own grouping; '' = ungrouped
  identifier  TEXT NOT NULL,                  -- the source's own id for this item
  title       TEXT NOT NULL,
  url         TEXT NOT NULL,
  difficulty  TEXT,                           -- free label; sources use different scales
  locked      INTEGER NOT NULL DEFAULT 0 CHECK (locked IN (0,1)),   -- behind the source's paywall
  worked_on   TEXT,                           -- coverage: last practised (ISO date)
  asked_on    TEXT,                           -- coverage: last quizzed
  grade       TEXT CHECK (grade IN ('solid','shaky','not retained')),
  grade_from  TEXT,                           -- 'log <date>' / 'review <iso-week>'
  UNIQUE (source_slug, section, identifier)
) STRICT;

CREATE TABLE entry_tag (
  entry_id INTEGER NOT NULL REFERENCES entry(id) ON DELETE CASCADE,
  tag      TEXT NOT NULL,
  kind     TEXT NOT NULL CHECK (kind IN ('topic','list')),   -- 'a11y' is a topic; 'blind75' is a list
  PRIMARY KEY (entry_id, tag)
) STRICT;

-- Courses and playbooks: reading a plan points at, never named in a round —
-- keeping them out of `entry` makes that unforgeable. Still worked and quizzed
-- by the check-in, so the coverage columns match `entry`.
CREATE TABLE material (
  id          INTEGER PRIMARY KEY,
  source_slug TEXT NOT NULL REFERENCES source(slug) ON DELETE CASCADE,
  section     TEXT NOT NULL DEFAULT '',
  identifier  TEXT NOT NULL,
  title       TEXT NOT NULL,
  url         TEXT NOT NULL,
  kind        TEXT NOT NULL CHECK (kind IN ('course','playbook')),
  lessons     INTEGER,                        -- courses only
  access      TEXT CHECK (access IN ('free','pro')),          -- courses only
  worked_on   TEXT,
  asked_on    TEXT,
  grade       TEXT CHECK (grade IN ('solid','shaky','not retained')),
  grade_from  TEXT,
  UNIQUE (source_slug, section, identifier)
) STRICT;

