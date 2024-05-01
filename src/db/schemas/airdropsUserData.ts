const airdropsUserData = {
	name: "airdropsUserData",
	required: ["address", "status", "relatedItemId", "rewards", "tokenAccount"],
	properties: {
		address: { bsonType: "string" },
		status: {
			bsonType: "string",
			enum: ["banned", "paused", "readyToClaim", "done"],
		},
		relatedItemId: { bsonType: "string" },
		rewards: {
			bsonType: "object",
			required: ["available", "sending", "claimed", "locked"],
			properties: {
				available: { bsonType: ["double", "int"] },
				sending: { bsonType: ["double", "int"] },
				claimed: { bsonType: ["double", "int"] },
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
	index: { address: 1, relatedItemid: 1 },
	unique: true,
};

export { airdropsUserData };
