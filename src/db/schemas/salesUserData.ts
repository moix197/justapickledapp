const salesUserData = {
	name: "salesUserData",
	required: ["address", "status", "relatedItemId", "rewards", "tokenAccount"],
	properties: {
		address: { bsonType: "string" },
		status: {
			bsonType: "string",
			enum: ["banned", "paused", "readyToClaim", "done"],
		},
		relatedItemId: { bsonType: "objectId" },
		rewards: {
			bsonType: "object",
			required: [
				"toClaim",
				"claimed",
				"toBuy",
				"bought",
				"toSend",
				"sending",
				"sent",
				"locked",
			],
			properties: {
				toClaim: { bsonType: ["double", "int"] },
				claimed: { bsonType: ["double", "int"] },
				toBuy: { bsonType: ["double", "int"] },
				bought: { bsonType: ["double", "int"] },
				toSend: { bsonType: ["double", "int"] },
				sending: { bsonType: ["double", "int"] },
				sent: { bsonType: ["double", "int"] },
				locked: { bsonType: ["double", "int"] },
			},
		},
		tokenAccount: {
			bsonType: "object",
			required: ["value", "address"],
			properties: {
				value: { bsonType: "bool" },
				address: { bsonType: "string" },
			},
		},
	},
	index: { address: 1, relatedItemId: 1 },
	unique: true,
};

export { salesUserData };
