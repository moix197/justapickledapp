import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { findDocuments } from "utils/back/db/crud";

async function getVesting(req) {
	try {
		let vesting = await findDocuments("vestingData", {
			_id: new ObjectId(req.query.id),
		});
		return {
			err: false,
			result: vesting,
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
	res.status(200).json(await getVesting(req));
}
