const airdropsData = {
	name: "airdropsData",
	required: [
		"name",
		"status",
		"isActive",
		"usersQty",
		"type",
		"redeem",
		"datesId",
		"vestingId",
		"vaultId",
		"teamId",
	],
	properties: {
		name: { bsonType: "string" },
		status: { bsonType: "string", enum: ["pre", "locked", "ended"] },
		isActive: { bsonType: "bool" },
		usersQty: { bsonType: "number" },
		redeem: {
			bsonType: "string",
			enum: ["airdrop", "claim", "claimableAidrop"],
		},
		datesId: { bsonType: "objectId" },
		vestingId: { bsonType: "objectId" },
		vaultId: { bsonType: "objectId" },
		teamId: { bsonType: "objectId" },
	},
	index: false,
	unique: false,
};

export { airdropsData };
