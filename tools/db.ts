#!/usr/bin/env bun
// Opens instance/prep.db — the structured half of instance/ — and applies
// tools/schema.sql on a fresh file. `bun:sqlite` is a Bun built-in, so this
// stays a zero-dependency tool like the rest of `tools/`.
//
//   import { open } from "./db.ts";
//   const db = open();               // instance/prep.db, foreign keys on
//
//   bun tools/db.ts --schema         print the DDL that would be applied
//   bun tools/db.ts --reset          drop every row (keep the schema)
//

import { Database } from "bun:sqlite";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const repoRoot = resolve(import.meta.dir, "..");
export const DB_PATH = join(repoRoot, "instance/prep.db");
const SCHEMA_PATH = join(repoRoot, "tools/schema.sql");

export function schemaSql(): string {
  return readFileSync(SCHEMA_PATH, "utf8");
}

/** The tables the schema defines, in an order safe to delete front-to-back. */
export const TABLES = ["entry_tag", "entry", "material", "source"] as const;

export function open(path = DB_PATH): Database {
  const db = new Database(path, { create: true });
  db.exec("PRAGMA foreign_keys = ON");
  const has = db.query("SELECT 1 FROM sqlite_master WHERE type='table' AND name='source'").get();
  if (!has) db.exec(schemaSql());
  return db;
}

/** Empty every table but leave the schema in place. */
export function reset(db: Database): void {
  db.exec("PRAGMA foreign_keys = OFF");
  for (const t of TABLES) db.exec(`DELETE FROM ${t}`);
  db.exec("PRAGMA foreign_keys = ON");
}

if (import.meta.main) {
  const args = Bun.argv.slice(2);
  if (args.includes("--schema")) {
    process.stdout.write(schemaSql());
    process.exit(0);
  }
  const db = open();
  if (args.includes("--reset")) {
    reset(db);
    console.log("db: all rows cleared");
  }
  const counts = TABLES.map((t) => `${t}=${(db.query(`SELECT count(*) n FROM ${t}`).get() as { n: number }).n}`);
  console.log(`db: ${DB_PATH}\n    ${counts.join("  ")}`);
}
