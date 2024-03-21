import type { NextApiRequest, NextApiResponse } from "next";
import { setupCollection } from "utils/back/db/setupCollection";

let collections = [
	{
		name: "airdrops",
		required: [
			"name",
			"tokenName",
			"ownerAddress",
			"tookHoldersSnapshot",
			"isActive",
			"breakRewardInParts",
			"fullAmount",
			"unlockDate",
			"amountPartsReleased",
			"participantsQty",
		],
		properties: {
			name: { bsonType: "string" },
			tokenName: { bsonType: "string" },
			ownerAddress: { bsonType: "string" },
			tookHoldersSnapshot: { bsonType: "bool" },
			isActive: { bsonType: "bool" },
			breakRewardInParts: { bsonType: "number" },
			partsTimeFrame: { bsonType: "number" },
			fullAmount: { bsonType: "number" },
			partAmount: { bsonType: "number" },
			lockDate: { bsonType: "date" },
			unlockDate: { bsonType: "date" },
			amountPartsReleased: { bsonType: "number" },
			participantsQty: { bsonType: "number" },
		},
		unique: "name",
	},
	{
		name: "twitter_airdrop",
		required: [
			"wallet",
			"airdropName",
			"rewards",
			"isValidWalletAddress",
			"transactions",
		],
		properties: {
			wallet: { bsonType: "string" },
			airdropName: { bsonType: "string" },
			wasAirdropped: { bsonType: "bool" },
			rewards: {
				bsonType: "object",
				properties: {
					available: { bsonType: "number" },
					sending: { bsonType: "number" },
					claimed: { bsonType: "number" },
					locked: { bsonType: "number" },
				},
			},
			tokenAccount: {
				bsonType: "object",
				properties: {
					value: { bsonType: "bool" },
					address: { bsonType: "string" },
				},
			},
			isValidWalletAddress: { bsonType: "bool" },
			transactions: { bsonType: "array" },
		},
		unique: "wallet",
	},
];

async function createAirdropDb() {
	try {
		for (const element of collections) {
			await setupCollection({
				required: element.required,
				properties: element.properties,
				name: element.name,
				unique: element.unique,
			});
		}
		return "all good";
	} catch (error) {
		return "we couldn't finish the process, please try again later";
	}
}

export default createAirdropDb;
