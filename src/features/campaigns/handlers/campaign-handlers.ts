import { createServerFn } from "@tanstack/react-start";
import { db } from "#/db";
import { authMiddleware } from "#/features/auth/handlers/auth-middleware";
import {
	createCampaignService,
	deleteCampaignService,
	fetchCampaignByIdService,
	fetchCampaignsService,
} from "#/features/campaigns/services/campaign-service";
import {
	createCampaignSchema,
	deleteCampaignSchema,
	fetchCampaignByIdSchema,
} from "#/features/campaigns/utils/schemas";
import { AppError } from "#/lib/utils";

export const fetchCampaignsHandler = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		const { session } = context;

		const res = await fetchCampaignsService(db, session.user.id);
		if (!res.ok) throw new AppError();
		return res.data;
	});

export const fetchCampaignByIdHandler = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.inputValidator(fetchCampaignByIdSchema)
	.handler(async ({ data, context }) => {
		const { session } = context;
		const { campaignId } = data;

		const res = await fetchCampaignByIdService(db, session.user.id, campaignId);
		if (!res.ok) throw new AppError();
		return res.data;
	});

export const createCampaignHandler = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator(createCampaignSchema)
	.handler(async ({ data, context }) => {
		const { session } = context;
		const { campaignName } = data;

		const res = await createCampaignService(db, session.user.id, campaignName);
		if (!res.ok) throw new AppError();
		return res.data;
	});

export const deleteCampaignHandler = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.inputValidator(deleteCampaignSchema)
	.handler(async ({ data, context }) => {
		const { session } = context;
		const { campaignId } = data;

		const res = await deleteCampaignService(db, session.user.id, campaignId);
		if (!res.ok) throw new AppError();
		return res.data;
	});
