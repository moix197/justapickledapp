const transactionsData = {
	name: "transactionsData",
	required: ["address", "tx", "status", "time", "amount", "type", "linkedTo"],
	properties: {
		address: { bsonType: "string" },
		tx: { bsonType: "string" },
		status: { bsonType: "string" },
		time: { bsonType: "date" },
		amount: { bsonType: ["double", "int"] },
		type: {
			bsonType: "string",
			enum: ["in", "out", "userToVault", "vaultToUser"],
		},
		linkedTo: {
			bsonType: "object",
			properties: {
				type: {
					bsonType: "string",
					enum: ["tokenSale", "airdrop", "swap"],
				},
				id: { bsonType: "objectId" },
			},
		},
	},
	index: { address: 1, "linkedTo.id": 1 },
	unique: false,
};

export default transactionsData;
