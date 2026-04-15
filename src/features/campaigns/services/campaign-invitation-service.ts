import type { Database } from "#/db";
import { fetchUserById } from "#/features/auth/repositories/user-repository";
import { createCampaignInvitationRepository } from "#/features/campaigns/repositories/campaign-invitation-repository";
import { fetchCampaignMemberRepository } from "#/features/campaigns/repositories/campaign-member-repository";
import { fetchCampaignByIdRepository } from "#/features/campaigns/repositories/campaign-repository";
import { errResult, okResult } from "#/lib/utils";

export async function createCampaignInvitationService(
	db: Database,
	userId: string,
	campaignId: string,
	invitedUserId: string,
) {
	const campaignData = await fetchCampaignByIdRepository(
		db,
		userId,
		campaignId,
	);

	if (!campaignData || campaignData.campaign.createdBy !== userId) {
		return errResult(
			"The campaign either does not exist or you are not authorized to create an invitation for the campaign",
			422,
		);
	}

	const invitedUserData = await fetchUserById(db, userId);

	if (!invitedUserData) {
		return errResult("The user you are trying to invite does not exist", 404);
	}

	const campaignMemberData = await fetchCampaignMemberRepository(
		db,
		invitedUserId,
		campaignId,
	);

	if (campaignMemberData) {
		return errResult(
			"The user you are trying to invite is already a member of the campaign",
			409,
		);
	}

	const campaignInvitationData = await createCampaignInvitationRepository(
		db,
		userId,
		campaignId,
		invitedUserId,
	);
	return okResult(campaignInvitationData, 200);
}
