import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "#/env";

config({ path: ".env" }); // or .env.local

export const db = drizzle({
	connection: {
		url: env.DATABASE_URL,
		authToken: env.DATABASE_AUTH_TOKEN,
	},
});

export type Database = typeof db;
