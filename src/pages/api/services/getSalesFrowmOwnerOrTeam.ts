import type { NextApiRequest, NextApiResponse } from "next";
import { findDocuments } from "utils/back/db/crud";
import { validateWalletAddress } from "utils/formTypingValidation";

async function getSalesFrowmOwnerOrTeam(req) {
	try {
		let validationResponse = validateWalletAddress(req.query.wallet);

		if (validationResponse.err) {
			throw new Error("Invalid wallet address");
		}

		let query = {
			$or: [
				{ owner: { $eq: req.query.wallet } },
				{ admins: { $in: [req.query.wallet] } },
			],
		};
		/*{
			owner: req.query.wallet,
		}*/

		let ownerSales = await findDocuments("tokenSalesData", query);

		let teams = await findDocuments("teamsData", {
			admins: { $in: [req.query.wallet] },
		});

		if (teams.length > 0) {
			let tokenSales = await findDocuments("tokenSalesData", {
				teamId: teams[0]._id,
			});

			ownerSales = [...ownerSales, ...tokenSales];
		}

		return {
			err: false,
			result: ownerSales,
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
	res.status(200).json(await getSalesFrowmOwnerOrTeam(req));
}
