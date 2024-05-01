import type { NextApiRequest, NextApiResponse } from "next";
import { findDocuments, joinDocuments } from "utils/back/db/crud";
import { validateWalletAddress } from "utils/formTypingValidation";

async function getAllSales(req) {
	try {
		let tokenSales = await joinDocuments("tokenSalesData", [
			{
				$match: {
					isActive: true, // Filter based on the isActive field
				},
			},
			{
				$lookup: {
					from: "vaultData",
					localField: "vaultId",
					foreignField: "_id",
					as: "vaultData",
				},
			},
			{
				$unwind: "$vaultData", // Unwind the array created by the $lookup stage
			},
			{
				$lookup: {
					from: "tokensData",
					localField: "vaultData.tokenMint",
					foreignField: "address",
					as: "tokenData",
				},
			},
		]);
		console.log(tokenSales);

		return {
			err: false,
			result: tokenSales,
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
	res.status(200).json(await getAllSales(req));
}
