import type { Database } from "#/db";
import {
	acceptInvitationRepository,
	fetchInvitationByIdRepository,
	fetchInvitationsRepository,
} from "#/features/campaigns/repositories/invitation-repository";
import { INVITATION_STATUS } from "#/features/campaigns/utils/constants";
import { errResult, okResult } from "#/lib/utils";

export async function fetchInvitationsService(db: Database, userId: string) {
	const invitations = await fetchInvitationsRepository(db, userId);
	return okResult(invitations, 200);
}

export async function acceptInvitationService(
	db: Database,
	userId: string,
	campaignInvitationId: string,
) {
	const campaignInvitationData = await fetchInvitationByIdRepository(
		db,
		userId,
		campaignInvitationId,
	);

	if (!campaignInvitationData) {
		return errResult(
			"The invitation you are trying to accept does not exist",
			404,
		);
	}

	if (campaignInvitationData.statusId !== INVITATION_STATUS.PENDING) {
		return errResult("This invitation can no longer be accepted", 409);
	}

	const acceptedInvitation = await acceptInvitationRepository(
		db,
		campaignInvitationId,
	);

	if (!acceptedInvitation) {
		return errResult(
			"Failed to update the invitation status. Please try again.",
			500,
		);
	}

	return okResult(acceptedInvitation, 200);
}
