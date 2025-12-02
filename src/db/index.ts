// src/db/index.ts
import { drizzle } from "drizzle-orm/d1";
import { env } from "cloudflare:workers";
import * as schema from "./schema";

// db-instansen som brukes i hele appen
export const db = drizzle(env.DB, { schema });

// Re-eksporter tabeller og typer for enkel import
export * from "./schema";