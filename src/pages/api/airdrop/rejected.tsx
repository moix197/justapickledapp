import type { NextApiRequest, NextApiResponse } from "next";
import { findDocuments, updateDocument } from "utils/back/db/crud";
import { getPublicKey } from "utils/getPublicKey";
import { failedAirdropTransaction } from "utils/airdrop/failedAirdropTransaction";

async function exDbCreat(postData) {
	try {
		let pubKey = getPublicKey(postData.body.address);

		if (pubKey?.err) {
			return {
				err: true,
				error: "Invalid wallet Address",
			};
		}

		let updated = await failedAirdropTransaction(pubKey.result.toString());
		return {
			err: false,
			result: updated,
		};
	} catch (error) {
		return {
			err: true,
			error: "We couldn't update the info, please try again later",
		};
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await exDbCreat(req));
}
