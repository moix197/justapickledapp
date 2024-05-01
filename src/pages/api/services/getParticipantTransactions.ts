import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { findDocuments } from "utils/back/db/crud";

async function getParticipantTransactions(req) {
	try {
		let userTransactions = await findDocuments(
			"transactionsData",
			{
				address: req.query.address,
				"linkedTo.id": new ObjectId(req.query.saleId),
			},
			{ time: -1 }
		);

		return {
			err: false,
			result: userTransactions,
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
	res.status(200).json(await getParticipantTransactions(req));
}
