import z from "zod";

export const fetchCampaignByIdSchema = z.object({
	campaignId: z.string(),
});

export const createCampaignSchema = z.object({
	campaignName: z
		.string()
		.min(1, "Campaign name is required")
		.max(100, "Campaign name must be less than 100 characters"),
});

export const deleteCampaignSchema = z.object({
	campaignId: z.string(),
});

export const createCampaignInvitationSchema = z.object({
	campaignId: z.string(),
	invitedUserId: z.string(),
});

export const acceptInvitationSchema = z.object({
	invitationId: z.string(),
});
