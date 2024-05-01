import type { NextApiRequest, NextApiResponse } from "next";
import { setupCollection } from "utils/back/db/setupCollection";

let collections = [
	{
		name: "users",
		required: ["wallet", "role", "tokens"],
		properties: {
			wallet: { bsonType: "string" },
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
		unique: "wallet",
	},
];

async function createUsersDb() {
	try {
		let logAry = [];

		for (const element of collections) {
			let setupResult = await setupCollection({
				required: element.required,
				properties: element.properties,
				name: element.name,
				unique: element.unique,
			});

			logAry.push(setupResult);
		}

		return logAry;
	} catch (error) {
		return "we couldn't finish the process, please try again later";
	}
}

export default createUsersDb;
