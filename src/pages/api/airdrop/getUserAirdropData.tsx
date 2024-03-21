import type { NextApiRequest, NextApiResponse } from "next";
import { findDocuments } from "utils/back/db/crud";
import { getPublicKey } from "utils/getPublicKey";

async function exDbCreat(req) {
	try {
		let pubKey = getPublicKey(req.query.address);

		if (pubKey?.err) {
			return {
				err: true,
				error: "Invalid wallet Address",
			};
		}

		let userData = await findDocuments("twitter_airdrop", {
			wallet: pubKey.result.toString(),
		});
		let airdropData = await findDocuments("airdrops", {
			name: "twitterAirdrop",
		});

		let data = {
			user: userData,
			airdrop: airdropData,
		};

		return {
			err: false,
			result: data,
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
