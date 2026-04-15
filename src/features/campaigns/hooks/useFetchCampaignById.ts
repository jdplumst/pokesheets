import { useSuspenseQuery } from "@tanstack/react-query";
import { campaignIdQueryOptions } from "#/features/campaigns/utils/queries";

export const useFetchCampaignById = (campaignId: string) => {
	return useSuspenseQuery(campaignIdQueryOptions(campaignId));
};
