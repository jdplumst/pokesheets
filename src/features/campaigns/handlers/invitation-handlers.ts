import { createServerFn } from "@tanstack/react-start";
import { db } from "#/db";
import { authMiddleware } from "#/features/auth/handlers/auth-middleware";
import {
	acceptInvitationService,
	fetchInvitationsService,
} from "#/features/campaigns/services/invitation-service";
import { acceptInvitationSchema } from "#/features/campaigns/utils/schemas";

export const fetchInvitationsHandler = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		const { session } = context;

		const res = await fetchInvitationsService(db, session.user.id);
		return res;
	});

export const acceptInvitationHandler = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.inputValidator(acceptInvitationSchema)
	.handler(async ({ data, context }) => {
		const { session } = context;
		const { invitationId } = data;

		const res = await acceptInvitationService(
			db,
			session.user.id,
			invitationId,
		);
		return res;
	});
