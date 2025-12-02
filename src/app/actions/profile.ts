"use server";

import { db, profiles } from "../../db";
import { sql } from "drizzle-orm";

async function seedProfilesIfEmpty() {
  const existing = await db.select().from(profiles).limit(1);
  if (existing.length > 0) return;

  await db.insert(profiles).values([
    { displayName: "Oskar", role: "Frontend • Collabjam", avatarKey: "pfp1" },
    { displayName: "Linus", role: "Backend • Collabjam", avatarKey: "pfp2" },
    { displayName: "Guest", role: "Game Jam Fan", avatarKey: "pfp3" },
  ]);
}

export async function getRandomProfile() {
  await seedProfilesIfEmpty();

  const rows = await db
    .select()
    .from(profiles)
    .orderBy(sql`RANDOM()`)
    .limit(1);

  return rows[0];
}