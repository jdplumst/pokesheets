import { createServerFn } from "@tanstack/react-start";
import { db } from "#/db";
import { authMiddleware } from "#/features/auth/handlers/auth-middleware";
import { createCampaignInvitationService } from "#/features/campaigns/services/campaign-invitation-service";
import { createCampaignInvitationSchema } from "#/features/campaigns/utils/schemas";

export const createCampaignInvitationHandler = createServerFn({
	method: "POST",
})
	.middleware([authMiddleware])
	.inputValidator(createCampaignInvitationSchema)
	.handler(async ({ data, context }) => {
		const { session } = context;
		const { campaignId, invitedUserId } = data;

		const res = await createCampaignInvitationService(
			db,
			session.user.id,
			campaignId,
			invitedUserId,
		);

		return res;
	});
