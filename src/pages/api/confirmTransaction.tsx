import type { NextApiRequest, NextApiResponse } from "next";
import { Connection } from "@solana/web3.js";

async function confirmTransaction(postData) {
	const connection = new Connection(
		"https://withered-orbital-sailboat.solana-mainnet.quiknode.pro/ac33801cbf8e7a422bfc7ecbc7843f202e53fa60/",
		{
			commitment: "confirmed",
			confirmTransactionInitialTimeout: 60000,
		}
	);

	let conn = await connection.confirmTransaction(
		postData.body.signature,
		"processed"
	);

	return conn;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await confirmTransaction(req));
}
