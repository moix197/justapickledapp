// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Connection } from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSwapTransactionFromJup } from "services/swap/getSwapTransactionFromJup";

async function swap(postData) {
	try {
		const swapTransactionResult = await getSwapTransactionFromJup(
			postData.body.quoteResponse,
			postData.body.userPublicKey.toString()
		);

		if (swapTransactionResult.err) {
			throw new Error("Couldn't get the transaction, please try again later");
		}

		return {
			err: false,
			result: swapTransactionResult.result,
		};
	} catch (error) {
		return {
			err: true,
			error: error,
		};
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await swap(req));
}
