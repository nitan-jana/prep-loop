// leak-check: allow-fixtures — a test for these rules must contain what each rule detects
import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { check, headingAnchors, slugify } from "./check-links.ts";

let dir: string;
const write = (name: string, body: string) => Bun.write(join(dir, name), body);

beforeAll(async () => {
  dir = mkdtempSync(join(tmpdir(), "check-links-"));
  await write(
    "target.md",
    ["# Target", "", "## Mock question sourcing — retention before novelty", "", "## Plain heading", "", "## Plain heading", ""].join("\n"),
  );
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

describe("slugify", () => {
  test("lowercases and hyphenates", () => {
    expect(slugify("Plain Heading")).toBe("plain-heading");
  });

  // The trap worth a test: an em dash is dropped but its surrounding spaces
  // both become hyphens, so the real anchor has a double hyphen in it.
  test("an em dash leaves a double hyphen", () => {
    expect(slugify("Mock question sourcing — retention before novelty")).toBe(
      "mock-question-sourcing--retention-before-novelty",
    );
  });

  test("strips inline markup rather than encoding it", () => {
    expect(slugify("`code` and **bold**")).toBe("code-and-bold");
  });

  test("drops punctuation but keeps digits", () => {
    expect(slugify("Arrays & hashing (9)")).toBe("arrays--hashing-9");
  });
});

describe("headingAnchors", () => {
  test("suffixes repeated headings the way GitHub does", () => {
    const a = headingAnchors("## Dup\n\n## Dup\n\n## Dup\n");
    expect([...a].sort()).toEqual(["dup", "dup-1", "dup-2"]);
  });

  test("ignores headings inside fenced code", () => {
    expect(headingAnchors("```\n# Not a heading\n```\n# Real\n").has("not-a-heading")).toBe(false);
  });
});

describe("check", () => {
  test("passes a file whose links all resolve", async () => {
    await write(
      "good.md",
      [
        "# Good",
        "- [file](target.md)",
        "- [em dash](target.md#mock-question-sourcing--retention-before-novelty)",
        "- [plain](target.md#plain-heading)",
        "- [repeat](target.md#plain-heading-1)",
        "- [external](https://example.com/x#frag)",
      ].join("\n"),
    );
    const { problems, checked } = await check([join(dir, "good.md")]);
    expect(problems).toEqual([]);
    expect(checked).toBe(4); // the external link is not counted
  });

  test("catches a missing file", async () => {
    await write("missing-file.md", "[nope](nope.md)\n");
    const { problems } = await check([join(dir, "missing-file.md")]);
    expect(problems).toHaveLength(1);
    expect(problems[0]!.message).toContain("broken link");
  });

  test("catches a fragment with no matching heading", async () => {
    await write("missing-anchor.md", "[bad](target.md#no-such-heading)\n");
    const { problems } = await check([join(dir, "missing-anchor.md")]);
    expect(problems).toHaveLength(1);
    expect(problems[0]!.message).toContain("no such heading");
  });

  test("catches the section symbol", async () => {
    await write("section.md", "see prep-plan.md §7 for the rule\n");
    const { problems } = await check([join(dir, "section.md")]);
    expect(problems).toHaveLength(1);
    expect(problems[0]!.message).toContain("section symbol");
  });

  test("ignores links inside fenced code but still flags a section symbol there", async () => {
    await write("fenced.md", ["```", "[not a link](does-not-exist.md)", "§1", "```"].join("\n"));
    const { problems, checked } = await check([join(dir, "fenced.md")]);
    expect(checked).toBe(0);
    expect(problems).toHaveLength(1);
    expect(problems[0]!.message).toContain("section symbol");
  });

  test("does not treat an image as a link", async () => {
    await write("image.md", "![alt](does-not-exist.png)\n");
    const { problems, checked } = await check([join(dir, "image.md")]);
    expect(checked).toBe(0);
    expect(problems).toEqual([]);
  });

  test("reports the line number the problem is on", async () => {
    await write("lineno.md", ["# One", "", "", "[bad](nope.md)"].join("\n"));
    const { problems } = await check([join(dir, "lineno.md")]);
    expect(problems[0]!.line).toBe(4);
  });
});
