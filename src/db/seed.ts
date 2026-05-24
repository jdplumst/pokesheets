import "dotenv/config";

import { eq } from "drizzle-orm";
import { db } from "#/db";
import { user } from "#/db/schema";
import { env } from "#/env";
import { auth } from "#/lib/auth";
import { DEV_USERS } from "#/lib/constants";

async function seed() {
	if (env.NODE_ENV === "production") {
		throw new Error("cannot run the seed script in this environment");
	}

	for (const devUser of DEV_USERS) {
		try {
			await auth.api.signUpEmail({ body: devUser });
			await db
				.update(user)
				.set({ id: devUser.id, emailVerified: true })
				.where(eq(user.email, devUser.email));
		} catch {
			console.log(`${user.name} already exists, skipping`);
		}
	}
}

seed();
