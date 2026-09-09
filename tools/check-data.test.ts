// leak-check: allow-fixtures — every case here contains the shape a rule detects

import { describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Checker, checkData, conceptFor, validateGrade, validateHabits, validateObservations, validateWeekPlan } from "./check-data.ts";

const run = (fn: (c: Checker) => void) => {
  const c = new Checker("f.yaml");
  fn(c);
  return c.problems.map((p) => `${p.path}: ${p.message}`);
};

describe("validateGrade", () => {
  test("solid with no legs passes", () => {
    expect(run((c) => validateGrade(c, { value: "solid", answer: "a", source: "log 2026-01-01" }, "g"))).toEqual([]);
  });
  test("shaky must name a failed leg", () => {
    expect(run((c) => validateGrade(c, { value: "shaky", answer: "a", source: "review 2026-W01" }, "g"))).toContain(
      "g.legs: a grade below 'solid' names the test it failed",
    );
  });
  test("solid may not name a failed leg", () => {
    expect(run((c) => validateGrade(c, { value: "solid", legs: ["cost"], answer: "a", source: "log 2026-01-01" }, "g"))).toContain(
      "g.legs: 'solid' fails no test",
    );
  });
  test("an unknown leg fails", () => {
    const p = run((c) => validateGrade(c, { value: "shaky", legs: ["speed"], answer: "a", source: "log 2026-01-01" }, "g"));
    expect(p.some((s) => s.startsWith("g.legs[0]:"))).toBe(true);
  });
  test("the answer is mandatory", () => {
    expect(run((c) => validateGrade(c, { value: "not retained", legs: ["unprompted"], source: "log 2026-01-01" }, "g"))).toContain(
      "g.answer: required non-empty string",
    );
  });
});

describe("validateHabits", () => {
  test("an observed row needs a first_seen date", () => {
    expect(run((c) => validateHabits(c, { observed: [{ habit: "goes quiet", costs: "loses the room" }] }))).toContain(
      "observed[0].first_seen: date as YYYY-MM-DD",
    );
  });
  test("a well-formed file passes", () => {
    expect(
      run((c) =>
        validateHabits(c, {
          observed: [{ habit: "goes quiet", first_seen: "2026-01-01", seen_since: "2026-02-01", costs: "loses the room" }],
          retired: [{ habit: "rambles", stopped_appearing: "2026-03-01" }],
        }),
      ),
    ).toEqual([]);
  });
});

describe("validateObservations", () => {
  const good = { subject: "a-source", noted: "2026-09-08", note: "block A may not be running", status: "open" };
  test("a well-formed open observation passes", () => {
    expect(run((c) => validateObservations(c, { observations: [good] }))).toEqual([]);
  });
  test("noted must be an ISO date", () => {
    expect(run((c) => validateObservations(c, { observations: [{ ...good, noted: "yesterday" }] }))).toContain(
      "observations[0].noted: date as YYYY-MM-DD",
    );
  });
  test("an unknown status fails", () => {
    const p = run((c) => validateObservations(c, { observations: [{ ...good, status: "pending" }] }));
    expect(p.some((s) => s.startsWith("observations[0].status:"))).toBe(true);
  });
  test("a resolved observation must name what settled it", () => {
    expect(run((c) => validateObservations(c, { observations: [{ ...good, status: "resolved" }] }))).toContain(
      "observations[0].resolved_by: a resolved observation names what settled it",
    );
  });
});

describe("validateWeekPlan", () => {
  const good = {
    week: "2026-W10",
    days: [{ date: "2026-03-02", blocks: [{ slot: "A", track: "JS coding", instruction: "Build useToggle", urls: ["https://x"] }] }],
    deferred: [{ instruction: "Read the thing" }],
  };
  test("a clean plan passes", () => {
    expect(run((c) => validateWeekPlan(c, good))).toEqual([]);
  });
  test("a history-shaped field on a block is refused", () => {
    const bad = structuredClone(good);
    (bad.days[0]!.blocks[0] as Record<string, unknown>).moved_from = "Tuesday";
    const p = run((c) => validateWeekPlan(c, bad));
    expect(p.some((s) => s.includes("what was there before"))).toBe(true);
  });
  test("a non-ISO week fails", () => {
    expect(run((c) => validateWeekPlan(c, { ...good, week: "week 10" }))).toContain("week: an ISO week as YYYY-Www");
  });
  test("a bare URL that is not http(s) fails", () => {
    const bad = structuredClone(good);
    bad.days[0]!.blocks[0]!.urls = ["example.org/x"];
    const p = run((c) => validateWeekPlan(c, bad));
    expect(p.some((s) => s.startsWith("days[0].blocks[0].urls[0]:"))).toBe(true);
  });
});

describe("conceptFor", () => {
  test("routes the YAML concepts that are left", () => {
    expect(conceptFor("profile/habits.yaml")).toBe("habits");
    expect(conceptFor("profile/observations.yaml")).toBe("observations");
    expect(conceptFor("plans/2026-W10.yaml")).toBe("week-plan");
  });
  test("curriculum moved to the database — not a YAML concept", () => {
    expect(conceptFor("curriculum/src.yaml")).toBeNull();
    expect(conceptFor("profile/identity.yaml")).toBeNull();
  });
});

describe("checkData end to end", () => {
  let dir: string;
  const setup = () => (dir = mkdtempSync(join(tmpdir(), "check-data-")));
  const teardown = () => rmSync(dir, { recursive: true, force: true });

  test("an empty instance/ is clean", async () => {
    setup();
    try {
      const { problems, checked } = await checkData(dir);
      expect(problems).toEqual([]);
      expect(checked).toBe(0);
    } finally {
      teardown();
    }
  });

  test("a malformed habits.yaml is reported", async () => {
    setup();
    try {
      await Bun.write(join(dir, "profile/habits.yaml"), "observed:\n  - habit: goes quiet\n"); // no first_seen
      const { problems, checked } = await checkData(dir);
      expect(checked).toBe(1);
      expect(problems.some((p) => p.path === "observed[0].first_seen")).toBe(true);
    } finally {
      teardown();
    }
  });
});
