// src/app/actions/feedback.ts
"use server";

import { nanoid } from "nanoid";
import { db, feedback, type Feedback } from "../../db";
import { desc } from "drizzle-orm";

/**
 * Lagrer en ny feedbackrad basert på FormData fra skjemaet.
 */
export async function createFeedback(formData: FormData) {
  const type = (formData.get("type") as string) ?? "other";
  const message = (formData.get("message") as string) ?? "";

  if (!message.trim()) {
    // Ingenting å lagre
    return;
  }

  await db.insert(feedback).values({
    id: nanoid(),
    type,
    message,
    // createdAt får default av DB
  });
}

/**
 * Returnerer de siste ~20 feedback-radene, nyeste først.
 */
export async function listFeedback(): Promise<Feedback[]> {
  const rows = await db
    .select()
    .from(feedback)
    .orderBy(desc(feedback.createdAt))
    .limit(20);

  return rows;
}