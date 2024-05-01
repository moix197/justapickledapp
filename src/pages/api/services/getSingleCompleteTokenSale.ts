import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { findDocuments } from "utils/back/db/crud";
import { validateWalletAddress } from "utils/formTypingValidation";

async function getSingleCompleteTokenSale(req) {
	try {
		if (!req.query.id) {
			throw new Error("Wrong id, please try again");
		}

		let query = {
			_id: new ObjectId(req.query.id),
		};

		let saleData = await findDocuments("tokenSalesData", query);
		let datesData = await findDocuments("datesData", {
			_id: new ObjectId(saleData[0].datesId),
		});
		let vestingData = await findDocuments("vestingData", {
			_id: new ObjectId(saleData[0].vestingId),
		});
		let vaultData = await findDocuments("vaultData", {
			_id: new ObjectId(saleData[0].vaultId),
		});

		let tokenData = await findDocuments("tokensData", {
			address: vaultData[0].tokenMint,
		});

		return {
			err: false,
			result: {
				saleData: saleData[0],
				datesData: datesData[0],
				vestingData: vestingData[0],
				vaultData: vaultData[0],
				tokenData: tokenData[0],
			},
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
	res.status(200).json(await getSingleCompleteTokenSale(req));
}
