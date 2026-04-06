import "dotenv/config";
import { faker } from "@faker-js/faker";
import { RowDataPacket } from "mysql2/promise";
import pool from "../config/db.js";
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
} from "../constants/tasks.js";

type TaskStatus = (typeof TASK_STATUSES)[number];
type TaskPriority = (typeof TASK_PRIORITIES)[number];

const DEFAULT_COUNT = 1000;

function parseCount(): number {
  const fromArg = process.argv.find((a) => /^\d+$/.test(a));
  if (fromArg) return Math.min(5000, Math.max(1, parseInt(fromArg, 10)));
  const fromEnv = process.env.SEED_COUNT;
  if (fromEnv && /^\d+$/.test(fromEnv)) {
    return Math.min(5000, Math.max(1, parseInt(fromEnv, 10)));
  }
  return DEFAULT_COUNT;
}

function maybe<T>(probability: number, fn: () => T): T | null {
  return faker.datatype.boolean({ probability }) ? fn() : null;
}

function randomTitle(): string {
  const pick = faker.helpers.arrayElement([
    () =>
      `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    () => `${faker.company.catchPhrase()} — follow-up`,
    () => `Ship ${faker.commerce.productName()} ${faker.git.branch()}`,
    () => `Fix flaky ${faker.hacker.noun()} in ${faker.system.fileName()}`,
    () => `Design review: ${faker.company.buzzPhrase()}`,
    () => `${faker.hacker.ingverb()} ${faker.database.column()}`,
  ]);
  return pick().slice(0, 255);
}

function randomDescription(): string | null {
  return maybe(0.82, () =>
    faker.helpers.arrayElement([
      () =>
        faker.lorem.paragraph({ min: 1, max: 3 }) +
        (faker.datatype.boolean() ? `\n\nAC:\n- ${faker.lorem.sentences(2)}` : ""),
      () =>
        `**Context**\n${faker.lorem.paragraph()}\n\n**Done when**\n- ${faker.lorem.sentence()}`,
      () => faker.git.commitMessage(),
    ])()
  );
}

function randomAssignee(): string | null {
  return maybe(0.78, () => faker.person.fullName());
}

function randomStatus(): TaskStatus {
  return faker.helpers.weightedArrayElement([
    { weight: 5, value: "todo" },
    { weight: 3, value: "in-progress" },
    { weight: 2, value: "done" },
  ]);
}

function randomPriority(): TaskPriority {
  return faker.helpers.weightedArrayElement([
    { weight: 2, value: "low" },
    { weight: 5, value: "medium" },
    { weight: 3, value: "high" },
  ]);
}

function buildRow(): [string, string, string | null, string | null, string] {
  return [
    randomTitle(),
    randomStatus(),
    randomDescription(),
    randomAssignee(),
    randomPriority(),
  ];
}

async function seed() {
  const count = parseCount();

  const connection = await pool.getConnection();
  let exitCode = 0;
  try {
    await connection.query("TRUNCATE TABLE tasks");
    console.log("Truncated tasks (fresh seed).");

    const rows: ReturnType<typeof buildRow>[] = [];
    for (let i = 0; i < count; i++) rows.push(buildRow());

    const placeholders = rows.map(() => "(?, ?, ?, ?, ?, NOW(), NOW())").join(", ");
    const flat = rows.flat();
    await connection.query(
      `INSERT INTO tasks (title, status, description, assignee, priority, createdAt, updatedAt) VALUES ${placeholders}`,
      flat
    );

    const [statusRows] = await connection.query<RowDataPacket[]>(
      `SELECT status, COUNT(*) AS cnt FROM tasks GROUP BY status ORDER BY status`
    );

    console.log(`Inserted ${count} task(s).`);
    console.log(
      "By status:",
      Object.fromEntries(
        statusRows.map((r) => [
          String(r.status),
          Number(r.cnt),
        ])
      )
    );
  } catch (err) {
    console.error("Seed failed:", err);
    exitCode = 1;
  } finally {
    connection.release();
    await pool.end();
  }
  process.exit(exitCode);
}

seed();
