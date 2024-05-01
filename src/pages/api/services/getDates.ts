import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { findDocuments } from "utils/back/db/crud";

async function getDates(req) {
	try {
		let dates = await findDocuments("datesData", {
			_id: new ObjectId(req.query.id),
		});

		return {
			err: false,
			result: dates,
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
	res.status(200).json(await getDates(req));
}
