// leak-check: allow-fixtures — grade references carry dates and week ids

import { describe, expect, test } from "bun:test";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { open } from "./db.ts";
import { checkDb, gradeSourcePath } from "./check-db.ts";

describe("gradeSourcePath", () => {
  test("maps the three kinds (no extension — caller tries .md and .yaml)", () => {
    expect(gradeSourcePath("log 2026-08-12")).toBe("logs/2026-08-12");
    expect(gradeSourcePath("review 2026-W33")).toBe("performance/2026-W33");
    expect(gradeSourcePath("recall 2026-09-21")).toBe("performance/2026-09-21-recall");
  });
  test("rejects a shapeless reference", () => {
    expect(gradeSourcePath("last time")).toBeNull();
  });
});

describe("checkDb", () => {
  let dir: string;
  const setup = () => {
    dir = mkdtempSync(join(tmpdir(), "check-db-"));
    mkdirSync(join(dir, "logs"), { recursive: true });
    mkdirSync(join(dir, "performance"), { recursive: true });
    const db = open(join(dir, "prep.db"));
    db.exec(
      "INSERT INTO source (slug, name, completeness) VALUES ('s', 'S', 'complete')",
    );
    db.exec(
      "INSERT INTO entry (source_slug, section, identifier, title, url, grade, grade_from) " +
        "VALUES ('s', '', 'e1', 'E1', 'https://x', 'shaky', 'log 2026-08-12')",
    );
    return db;
  };
  const teardown = () => rmSync(dir, { recursive: true, force: true });

  test("a grade_from that names a real log passes", () => {
    setup();
    try {
      writeFileSync(join(dir, "logs/2026-08-12.md"), "# log\n");
      expect(checkDb(dir)).toEqual([]);
    } finally {
      teardown();
    }
  });

  test("a grade_from with no such file is flagged", () => {
    setup();
    try {
      expect(checkDb(dir).some((p) => p.message.includes("(missing)"))).toBe(true);
    } finally {
      teardown();
    }
  });

  test("an unparseable grade_from is flagged", () => {
    const db = setup();
    try {
      db.exec("UPDATE entry SET grade_from = 'last week' WHERE identifier = 'e1'");
      expect(checkDb(dir).some((p) => /unparseable/.test(p.message))).toBe(true);
    } finally {
      teardown();
    }
  });
});
