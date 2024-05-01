const teamsData = {
	name: "teamsData",
	required: ["name", "owner", "admins", "linkedTo"],
	properties: {
		name: { bsonType: "string" },
		owner: { bsonType: "string" },
		admins: {
			bsonType: "array",
			items: {
				type: "string",
			},
			uniqueItems: true,
		},
		linkedTo: {
			bsonType: "array",
			items: {
				type: "object",
				required: ["type", "id"],
				properties: {
					type: { bsonType: "string", enum: ["sale", "airdrop", "staking"] },
					id: {
						anyOf: [
							{ bsonType: "objectId" },
							{ type: "null" }, // Allow null value
						],
					},
				},
			},
		},
	},
	index: false,
	unique: false,
};

export { teamsData };
