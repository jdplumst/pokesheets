import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { createCampaignHandler } from "#/features/campaigns/handlers/campaign-handlers";
import { QUERY_KEY } from "#/lib/constants";

interface UseCreateCampaignOptions {
	closeDialog: () => void;
}

export const useCreateCampaign = ({
	closeDialog,
}: UseCreateCampaignOptions) => {
	const queryClient = useQueryClient();
	const createCampaignFn = useServerFn(createCampaignHandler);

	return useMutation({
		mutationFn: createCampaignFn,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEY.CAMPAIGNS.CAMPAIGNS,
			});
			closeDialog();
		},
		onError: (error) => {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to create campaign. Please try again.";
			toast.error("Failed to create campaign", {
				description: errorMessage,
			});
		},
	});
};
