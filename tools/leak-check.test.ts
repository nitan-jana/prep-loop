// leak-check: allow-fixtures — a test for these rules must contain what each rule detects
import { describe, expect, test } from "bun:test";
import { type Denylist, type Finding, parseDenylist, scanText } from "./leak-check.ts";

const EMPTY: Denylist = { terms: [], patterns: [] };
const scan = (body: string, deny: Denylist = EMPTY): Finding[] => scanText("f.md", body, deny);
const msgs = (f: Finding[], tier: Finding["tier"]) => f.filter((x) => x.tier === tier).map((x) => x.message);

describe("parseDenylist", () => {
  test("skips comments and blanks, keeps terms, compiles re: lines", () => {
    const d = parseDenylist(["# a comment", "", "Acme", "re:\\b147\\b", "  Spaced  "].join("\n"));
    expect(d.terms).toEqual(["Acme", "Spaced"]);
    expect(d.patterns).toHaveLength(1);
    expect(d.patterns[0]!.test("count 147 here")).toBe(true);
    expect(d.patterns[0]!.test("count 1470 here")).toBe(false);
  });
});

describe("FAIL — the tier that blocks", () => {
  test("a denylist term, case-insensitively", () => {
    const f = scan("built at ACME last year", { terms: ["Acme"], patterns: [] as RegExp[] });
    expect(msgs(f, "FAIL")).toContain("denylist term 'Acme'");
  });

  test("the canary, which is how a whole-file copy is caught", () => {
    const deny: Denylist = { terms: ["XX-CANARY-1234"], patterns: [] };
    const f = scan("Who this instance belongs to.\n\nCanary: XX-CANARY-1234\n", deny);
    expect(msgs(f, "FAIL")).toContain("denylist term 'XX-CANARY-1234'");
  });

  test("a 2020s year anywhere in the line", () => {
    expect(msgs(scan("set on 6 Aug 2026 after review"), "FAIL")).toContain("dated — 2026");
  });

  test("but not a year outside the range", () => {
    expect(msgs(scan("the 1999 standard"), "FAIL")).toHaveLength(0);
  });

  test("a reference into the local folder", () => {
    expect(msgs(scan("read instance/profile/state.md first"), "FAIL")).toContain("personal path 'instance/'");
  });

  test("and a stale reference that dropped the prefix", () => {
    expect(msgs(scan("read profile/state.md first"), "FAIL")).toContain("personal path 'profile/'");
  });

  test("unless the file marks itself as naming paths by design", () => {
    const f = scan("leak-check: allow-path\n\nread instance/profile/state.md first");
    expect(msgs(f, "FAIL")).toHaveLength(0);
  });

  test("a bare directory word is not a path", () => {
    expect(msgs(scan("the profile is written by onboarding"), "FAIL")).toHaveLength(0);
  });
});

describe("WARN — reported, does not block", () => {
  test("second person, under policy/", () => {
    const f = scanText("policy/thing.md", "drop your resume here", EMPTY);
    expect(msgs(f, "WARN")).toEqual(["second person"]);
    expect(msgs(f, "FAIL")).toHaveLength(0);
  });

  test("not outside policy/, where addressing the reader is correct", () => {
    for (const p of ["templates/story.md", "README.md", "docs/getting-started.md"]) {
      expect(msgs(scanText(p, "drop your resume here", EMPTY), "WARN")).toHaveLength(0);
    }
  });
});

describe("CADENCE — one user's routine baked into the mechanism", () => {
  test("a weekday", () => {
    expect(msgs(scan("the loop runs Saturday"), "CADENCE")).toContain("weekday — 'Saturday'");
  });

  test("a clock time", () => {
    expect(msgs(scan("blocks start at 08:00"), "CADENCE")).toContain("clock time — '08:00'");
  });

  test("a cron expression in frontmatter", () => {
    expect(msgs(scan('schedule: "27 7 * * 1"'), "CADENCE")).toContain("cron expression — 'schedule: \"2'");
  });

  test("a timezone", () => {
    expect(msgs(scan("timezone: Asia/Kolkata"), "CADENCE")).toContain("timezone — 'Asia/Kolkata'");
  });

  test("a line can opt out, so meta-text about the rule does not trip it", () => {
    expect(msgs(scan("never say Saturday here <!-- leak-check: allow-cadence -->"), "CADENCE")).toHaveLength(0);
  });

  test("a file-level marker silences the whole file", () => {
    const f = scan("leak-check: allow-cadence\n\nthe loop runs Saturday at 10:00");
    expect(msgs(f, "CADENCE")).toHaveLength(0);
  });

  test("cadence never blocks", () => {
    expect(msgs(scan("Saturday at 10:00 in Asia/Kolkata"), "FAIL")).toHaveLength(0);
  });
});

describe("line numbers", () => {
  test("point at the offending line", () => {
    const f = scan(["clean", "clean", "set on 6 Aug 2026"].join("\n"));
    expect(f.find((x) => x.tier === "FAIL")!.line).toBe(3);
  });
});
