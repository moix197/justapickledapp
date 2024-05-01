import type { NextApiRequest, NextApiResponse } from "next";
import { findDocuments } from "utils/back/db/crud";
import { validateWalletAddress } from "utils/formTypingValidation";

async function exDbCreat(req) {
	try {
		let validationResponse = validateWalletAddress(req.query.wallet);

		if (validationResponse.err) {
			throw new Error("Invalid wallet address");
		}

		/*let query = {
			$or: [
				{ owner: { $eq: req.query.wallet } },
				{ admins: { $in: [req.query.wallet] } },
			],
		};*/

		let ownerVaults = await findDocuments("teamsData", {
			owner: req.query.wallet,
		});

		return {
			err: false,
			result: ownerVaults,
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
	res.status(200).json(await exDbCreat(req));
}
