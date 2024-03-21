import { PublicKey } from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "utils/back/connection";

async function testGetAccounts(req) {
	try {
		let userPublicKey = new PublicKey(req.query.key);
		let programId = new PublicKey(req.query.program);

		let response = await connection.getParsedTokenAccountsByOwner(
			userPublicKey,
			{
				programId: programId,
			}
		);

		return response;
	} catch (error) {
		console.log(error);
		return error;
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await testGetAccounts(req));
}
