// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
	Connection,
	clusterApiUrl,
	Keypair,
	VersionedTransaction,
} from "@solana/web3.js";

async function doThis(postData) {
	//console.log(postData.body.userPublicKey);
	let data;
	let response = await fetch("https://quote-api.jup.ag/v6/swap", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			// quoteResponse from /quote api
			quoteResponse: postData.body.quoteResponse,
			// user public key to be used for the swap
			userPublicKey: postData.body.userPublicKey.toString(),
			// auto wrap and unwrap SOL. default is true
			wrapAndUnwrapSol: true,
			// feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
			// feeAccount: "fee_account_public_key"
		}),
	});

	data = await response.json();

	let esto = data.swapTransaction;
	const swapTransactionBuf = Buffer.from(esto, "base64");

	return swapTransactionBuf;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	res.status(200).json(await doThis(req));
}
