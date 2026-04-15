import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "#/db";
import * as schema from "#/db/schema";
import { env } from "#/env";

export const auth = betterAuth({
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: "sqlite", schema }),
	socialProviders: {
		discord: {
			clientId: env.DISCORD_CLIENT_ID,
			clientSecret: env.DISCORD_CLIENT_SECRET,
		},
	},
	plugins: [tanstackStartCookies()],
});
