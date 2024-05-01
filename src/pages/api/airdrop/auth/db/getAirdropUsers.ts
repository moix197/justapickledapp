import type { NextApiRequest, NextApiResponse } from "next";
import { findDocuments } from "utils/back/db/crud";

async function exDbCreat(req) {
	try {
		let ownerAirdrops = await findDocuments(req.query.airdropName, {});
		return {
			err: false,
			result: ownerAirdrops,
		};
	} catch (error) {
		return {
			err: true,
			error: "We couldn't find any info, please try again later",
		};
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await exDbCreat(req));
}
