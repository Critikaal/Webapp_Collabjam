// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    // Lokal fil som Studio kobler til (IKKE D1)
    url: "file:./local-dev.db",
  },
});