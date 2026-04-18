import { beforeEach, describe, expect, it, vi, } from "vitest";
import assert from "node:assert";
import type { Database } from "#/db";

const db = {} as Database;

vi.mock("#/features/campaigns/repositories/campaign-repository");

import * as campaignRepository from "#/features/campaigns/repositories/campaign-repository";
import {
  createCampaignService,
  deleteCampaignService,
  fetchCampaignByIdService,
  fetchCampaignsService,
} from "#/features/campaigns/services/campaign-service";

const mockedCampaignRepository = vi.mocked(campaignRepository, true);


describe("campaign service", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe("fetch campaigns", () => {
		it("fetches campaigns", async () => {
			mockedCampaignRepository.fetchCampaignsRepository.mockResolvedValue([
				{
					campaign: {
						id: "campaign-1",
						name: "campaign-1-name",
						createdBy: "user-1",
						createdAt: new Date("2025-12-01"),
						updatedAt: new Date("2025-12-01"),
					},
					campaign_member: {
						id: "member-1",
						campaignId: "campaign-1",
						userId: "user-1",
						roleId: "role-1",
						joinedAt: new Date("2025-12-01"),
					},
				},
				{
					campaign: {
						id: "campaign-2",
						name: "campaign-2-name",
						createdBy: "user-2",
						createdAt: new Date("2025-12-01"),
						updatedAt: new Date("2025-12-01"),
					},
					campaign_member: {
						id: "member-1",
						campaignId: "campaign-2",
						userId: "user-1",
						roleId: "role-1",
						joinedAt: new Date(),
					},
				},
			]);

			const result = await fetchCampaignsService(db, "user-1");
			expect(result.ok).toBe(true);
			expect(result.data).toHaveLength(2);
		});
	});

	describe("fetch campaign by id", async () => {
		it("fetches campaign by id", async () => {
			const mockedCampaign = {
				campaign: {
					id: "campaign-1",
					name: "campaign-name",
					createdBy: "user-1",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				campaign_member: null,
			};

			mockedCampaignRepository.fetchCampaignByIdRepository.mockResolvedValue(
				mockedCampaign,
			);

			const result = await fetchCampaignByIdService(db, "user-1", "campaign-1");
			expect(result.ok).toBe(true);
			assert(result.ok);
			expect(result.data).toStrictEqual(mockedCampaign);
		});
	});

	describe("create campaign", async () => {
		it("creates campaign", async () => {
			mockedCampaignRepository.createCampaignRepository.mockResolvedValue({
				id: "campaign-1",
				name: "campaign-name",
				createdAt: new Date("2025-12-01"),
				updatedAt: new Date("2025-12-01"),
				createdBy: "user-1",
			});

			const result = await createCampaignService(db, "user-1", "campaign-name");
			expect(result.data).toStrictEqual({
				id: "campaign-1",
				name: "campaign-name",
				createdAt: new Date("2025-12-01"),
				updatedAt: new Date("2025-12-01"),
				createdBy: "user-1",
			});
		});
	});

	describe("delete campaign", async () => {
		it("deletes campaign", async () => {
			mockedCampaignRepository.deleteCampaignRepository.mockResolvedValue({
				id: "campaign-1",
				name: "campaign-name",
				createdAt: new Date("2025-12-01"),
				updatedAt: new Date("2025-12-01"),
				createdBy: "user-1",
			});

			const result = await deleteCampaignService(db, "user-1", "campaign-1");
			assert(result.ok);
			expect(result.data).toStrictEqual({
				id: "campaign-1",
				name: "campaign-name",
				createdAt: new Date("2025-12-01"),
				updatedAt: new Date("2025-12-01"),
				createdBy: "user-1",
			});
		});

		it("throws error if campaign with campaign does not exist or don't have permission to delete", async () => {
			mockedCampaignRepository.deleteCampaignRepository.mockResolvedValue(null);

			const result = await deleteCampaignService(db, "user-1", "campaign-1");
			assert(!result.ok);
			await expect(result.error).toBe(
				"The campaign you are trying delete either doesn't exist or you don't have permission to delete it",
			);
		});
	});
});