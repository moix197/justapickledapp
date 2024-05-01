const tokensData = {
	name: "tokensData",
	required: [
		"address",
		"authorities",
		"metadata",
		"info",
		"ownership",
		"lastUpdated",
	],
	properties: {
		address: { bsonType: "string" },
		authorities: { bsonType: "array" },
		metadata: {
			bsonType: "object",
			required: ["name", "image", "symbol", "description"],
			properties: {
				name: { bsonType: "string" },
				image: { bsonType: "string" },
				symbol: { bsonType: "string" },
				description: { bsonType: "string" },
			},
		},
		info: {
			bsonType: "object",
			required: ["supply", "decimals", "token_program"],
			properties: {
				supply: { bsonType: ["double", "int"] },
				decimals: { bsonType: "number" },
				token_program: { bsonType: "string" },
			},
		},
		ownership: {
			bsonType: "object",
			required: ["delegated", "frozen", "owner", "ownership_model"],
			properties: {
				delegated: { bsonType: "bool" },
				frozen: { bsonType: "bool" },
				owner: { bsonType: "string" },
				ownership_model: { bsonType: "string" },
			},
		},
		lastUpdated: { bsonType: "date" },
	},
	index: { address: 1 },
	unique: true,
};

export { tokensData };
