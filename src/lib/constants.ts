export const STALE_TIME = {
	FIVE_MINUTES: 5 * 60 * 1000,
	FIFTEEN_MINUTES: 15 * 60 * 1000,
	ONE_HOUR: 60 * 60 * 1000,
} as const;

export const QUERY_KEY = {
	AUTH: ["auth"],
	CAMPAIGNS: {
		CAMPAIGNS: ["campaigns"],
		CAMPAIGN_ID: (campaignId: string) => ["campaigns", campaignId],
	},
};

export const DEV_USERS = [
	{
		id: "dev_user_alice",
		name: "Alice",
		email: "alice@example.com",
		password: "dev-password",
	},
	{
		id: "dev_user_bob",
		name: "Bob",
		email: "bob@example.com",
		password: "dev-password",
	},
];
