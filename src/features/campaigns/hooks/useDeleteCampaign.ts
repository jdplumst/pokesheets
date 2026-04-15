import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { deleteCampaignHandler } from "#/features/campaigns/handlers/campaign-handlers";
import { QUERY_KEY } from "#/lib/constants";

export const useDeleteCampaign = () => {
	const queryClient = useQueryClient();
	const deleteCampaignFn = useServerFn(deleteCampaignHandler);

	return useMutation({
		mutationFn: deleteCampaignFn,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEY.CAMPAIGNS.CAMPAIGNS,
			});
		},
		onError: (error) => {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to delete campaign. Please try again.";
			toast.error("Failed to delete campaign", {
				description: errorMessage,
			});
		},
	});
};
