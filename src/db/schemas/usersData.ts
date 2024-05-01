const usersData = {
	name: "usersData",
	required: ["address", "role", "tokens"],
	properties: {
		address: { bsonType: "string" },
		role: {
			bsonType: "array",
			items: {
				type: "string",
				enum: ["admin", "owner", "holder", "user"],
			},
			minItems: 1,
			uniqueItems: false,
		},
		tokens: {
			bsonType: "array",
			items: {
				type: "object",
			},
		},
	},
	index: { address: 1 },
	unique: true,
};

export { usersData };
