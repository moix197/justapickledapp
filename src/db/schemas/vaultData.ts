const vaultData = {
	name: "vaultData",
	required: [
		"owner",
		"name",
		"type",
		"tokenMint",
		"acceptedTokens",
		"accounts",
		"credentials",
		"amount",
		"status",
		"lastUpdated",
	],
	properties: {
		owner: { bsonType: "string" },
		name: { bsonType: "string" },
		status: {
			bsonType: "string",
			enum: ["pre", "locked", "ended"],
		},
		type: { bsonType: "string", enum: ["self", "managed"] },
		//CAMBIAR TOKEN.MINT EN TODOS LADOS POR tokenMint
		tokenMint: { bsonType: "string" },
		//update a "accounts" cuando se crea o edita el vault
		accounts: {
			bsonType: "object",
			required: ["main", "mintAssociated"],
			properties: {
				main: { bsonType: "string" },
				mintAssociated: { bsonType: "string" },
			},
		},
		//setear el acceptedTokens[0] a USDT por ahora y llenar el respectivo associated account
		acceptedTokens: {
			bsonType: "array",
			items: {
				type: "object",
				required: ["name", "address", "associatedAccount"],
				properties: {
					name: { bsonType: "string" },
					address: { bsonType: "string" },
					associatedAccount: { bsonType: "string" },
				},
			},
			minItems: 1,
			uniqueItems: true,
		},
		credentials: {
			bsonType: "object",
		},
		amount: {
			bsonType: "object",
			required: ["initial", "inVault", "left", "sent", "received"],
			properties: {
				initial: { bsonType: ["double", "int"] },
				inVault: { bsonType: ["double", "int"] },
				left: { bsonType: ["double", "int"] },
				sent: { bsonType: ["double", "int"] },
				received: { bsonType: ["double", "int"] },
			},
		},
		lastUpdated: { bsonType: "date" },
	},
	index: false,
	unique: false,
};

export { vaultData };
