import type { NextApiRequest, NextApiResponse } from "next";
import { setupCollection } from "utils/back/db/setupCollection";

const tiersData = {
	name: "tiersData",
	required: ["name", "percentage"],
	properties: {
		name: { bsonType: "string" },
		percentage: { bsonType: "number" },
	},
	unique: "wallet",
};

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
			claimedAmount: { bsonType: "number" },
			lockDate: { bsonType: "date" },
			unlockDate: { bsonType: "date" },
			amountPartsReleased: { bsonType: "number" },
			participantsQty: { bsonType: "number" },
		},
		unique: "name",
	},
	/*{
		name: "authorities",
		required: ["owner"],
		properties: {
			owner: { bsonType: "string" },
			admins: {
				bsonType: "array",
				items: {
					type: "string",
				},
				uniqueItems: true,
			},
		},
	},*/
	/*	{
		name: "tokenSales",
		required: [
			"authorities",
			"token",
			"type",
			"amount",
			"price",
			"perks",
			"created",
		],
		properties: {
			token: {
				bsonType: "object",
				required: ["name", "mint"],
				properties: {
					name: { bsonType: "string" },
					mint: { bsonType: "string" },
				},
			},
			type: {
				bsonType: "object",
				required: ["value"],
				properties: {
					value: { bsonType: "string", enum: ["selfhosted", "delegated"] }, //"selfhosted"
				},
			},
			amount: {
				bsonType: "object",
				required: ["forSale", "inVault", "left", "sold"],
				properties: {
					forSale: { bsonType: "number" },
					inVault: { bsonType: "number" },
					left: { bsonType: "number" },
					sold: { bsonType: "number" },
				},
			},
			price: {
				bsonType: "object",
				required: ["type"],
				properties: {
					type: { bsonType: "string", enum: ["fixed", "market"] },
					value: { bsonType: "number" },
				},
			},
			perks: {
				bsonType: "object",
				required: ["extra"],
				properties: {
					extra: { bsonType: "number" },
					others: {
						bsonType: "array",
						items: {
							type: "string",
						},
					},
				},
			},
			dates: {
				bsonType: "object",
				required: ["created", "launch"],
				properties: {
					created: { bsonType: "date" },
					lastUpdated: { bsonType: "date" },
					launch: { bsonType: "date" },
					end: { bsonType: "date" },
				},
			},
		},
	},*/
];

async function createAirdropDb() {
	try {
		let finalAry = [];

		for (const element of collections) {
			let result = await setupCollection({
				required: element.required,
				properties: element.properties,
				name: element.name,
				unique: element.unique,
				update: false,
			});

			finalAry.push(result);
		}
		return {
			err: false,
			value: finalAry,
		};
	} catch (error) {
		return "we couldn't finish the process, please try again later";
	}
}

export default createAirdropDb;
