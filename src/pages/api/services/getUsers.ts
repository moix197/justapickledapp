import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { findDocuments } from "utils/back/db/crud";

async function getUsers(req) {
	try {
		const { _id, address, relatedItemId, collection } = req.query;
		let filterObj = {};
		const filterValues = ["_id", "address", "relatedItemId"];

		for (const item of filterValues) {
			if (!req.query[item]) continue;
			filterObj[item] =
				item == "address" ? req.query[item] : new ObjectId(req.query[item]);
		}

		const users = await findDocuments(`${collection}UserData`, filterObj);

		return {
			err: false,
			result: users,
		};
	} catch (error) {
		return {
			err: true,
			error: error.message,
		};
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await getUsers(req));
}
