const tokenSalesData = {
	name: "tokenSalesData",
	required: [
		"owner",
		"name",
		"status",
		"isActive",
		"usersQty",
		"type",
		"target",
		"redeem",
		"price",
		"vestingId",
		"datesId",
		"vaultId",
		"teamId",
	],
	properties: {
		owner: { bsonType: "string" },
		name: { bsonType: "string" },
		isActive: { bsonType: "bool" },
		usersQty: { bsonType: "number" },
		status: { bsonType: "string", enum: ["pre", "locked", "ended"] },
		type: { bsonType: "string", enum: ["regular", "presale"] },
		target: { bsonType: "string", enum: ["private", "open"] },
		redeem: {
			bsonType: "string",
			//"airdrop" When ppl get the token dropped to their wallets
			//"claim" they have to come and claim
			//"claimable airdrop" they come, sign a messsage to "claim" later they get airdropped
			enum: ["airdrop", "claim", "claimableAirdrop"],
		},
		price: {
			bsonType: "object",
			required: ["type"],
			properties: {
				type: { bsonType: "string", enum: ["market", "fixed"] },
				extra: { bsonType: ["double", "int"] },
				amount: { bsonType: ["double", "int"] },
			},
		},
		vestingId: { bsonType: "objectId" },
		datesId: { bsonType: "objectId" },
		vaultId: { bsonType: "objectId" },
		teamId: {
			anyOf: [
				{ bsonType: "objectId" },
				{ type: "null" }, // Allow null value
			],
		},
	},
	index: false,
	unique: false,
};

export { tokenSalesData };
