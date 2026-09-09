-- leak-check: allow-path — it names the local database and its folder
--
-- The structured half of the local folder. Lives beside it as prep.db
-- (bun:sqlite, gitignored). The narrative half — plans, logs, briefs,
-- deep-dive and story prose — stays as markdown files.
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

-- One shape reused across the identity stack, attribution, deep-dives, stories.
CREATE TABLE claim (
  id               INTEGER PRIMARY KEY,
  subject_kind     TEXT NOT NULL CHECK (subject_kind IN ('stack','project','deep-dive','story')),
  subject_ref      TEXT NOT NULL,             -- tech name / project slug / story slug
  seq              INTEGER,
  statement        TEXT NOT NULL,
  marker           TEXT NOT NULL CHECK (marker IN ('verified','stated','contested')),
  checked_against  TEXT NOT NULL,
  evidence_command TEXT,
  CHECK (marker != 'verified' OR evidence_command IS NOT NULL)
) STRICT;

CREATE TABLE readiness (
  round       TEXT PRIMARY KEY,
  rung        TEXT NOT NULL CHECK (rung IN (
                'can reconstruct','can reconstruct under time','can defend','can do it cold')),
  provisional INTEGER NOT NULL CHECK (provisional IN (0,1)),
  note        TEXT
) STRICT;

CREATE TABLE story (
  slug   TEXT PRIMARY KEY,
  status TEXT
) STRICT;

CREATE TABLE story_shape (
  story_slug TEXT NOT NULL REFERENCES story(slug) ON DELETE CASCADE,
  shape      TEXT NOT NULL,
  PRIMARY KEY (story_slug, shape)
) STRICT;
