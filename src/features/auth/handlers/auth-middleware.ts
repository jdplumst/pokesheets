import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from "#/lib/auth";
import { AppError } from "#/lib/utils";

export const authMiddleware = createMiddleware({ type: "function" }).server(
	async ({ next }) => {
		const request = getRequest();
		const session = await auth.api.getSession({ headers: request.headers });

		if (!session) {
			throw new AppError("Unauthorized");
		}

		return next({ context: { session } });
	},
);
