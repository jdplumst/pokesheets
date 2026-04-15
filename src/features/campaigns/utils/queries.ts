import { queryOptions } from "@tanstack/react-query";
import {
	fetchCampaignByIdHandler,
	fetchCampaignsHandler,
} from "#/features/campaigns/handlers/campaign-handlers";
import { QUERY_KEY, STALE_TIME } from "#/lib/constants";

export const campaignsQueryOptions = queryOptions({
	queryKey: QUERY_KEY.CAMPAIGNS.CAMPAIGNS,
	queryFn: () => fetchCampaignsHandler(),
	staleTime: STALE_TIME.FIFTEEN_MINUTES,
});

export const campaignIdQueryOptions = (campaignId: string) =>
	queryOptions({
		queryKey: QUERY_KEY.CAMPAIGNS.CAMPAIGN_ID(campaignId),
		queryFn: () => fetchCampaignByIdHandler({ data: { campaignId } }),
		staleTime: STALE_TIME.FIFTEEN_MINUTES,
		retry: false,
	});
