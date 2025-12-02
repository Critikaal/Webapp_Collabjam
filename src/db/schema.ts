// src/db/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// Fra før (feedback-tabellen) – behold denne hvis du har den
export const feedback = sqliteTable("feedback", {
  id: text("id").primaryKey().notNull(),
  type: text("type", { length: 32 }).notNull(),
  message: text("message").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// 🔹 NY: profiles-tabell
export const profiles = sqliteTable("profiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  displayName: text("display_name").notNull(),
  role: text("role"),
  avatarKey: text("avatar_key").notNull(), // f.eks. "pfp1", "pfp2", "pfp3"
});

export type Feedback = typeof feedback.$inferSelect;
export type Profile = typeof profiles.$inferSelect;