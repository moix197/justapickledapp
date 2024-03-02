import type { NextApiRequest, NextApiResponse } from "next";
import { Connection } from "@solana/web3.js";

async function doThis(postData) {
	console.log("comenzamos");
	const connection = new Connection(
		"https://withered-orbital-sailboat.solana-mainnet.quiknode.pro/ac33801cbf8e7a422bfc7ecbc7843f202e53fa60/"
	);
	/*let buff = Buffer.from(
		JSON.stringify(postData.body.signedTransaction),
		"base64"
	);*/

	//console.log(postData.body.signedTransaction.serialize());

	//let buff = postData.body.signedTransaction;
	//let buff = new Uint8Array(postData.body.signedTransaction);
	let esto = await connection.sendEncodedTransaction(
		JSON.stringify(postData.body.signedTransaction)
	);

	return esto;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await doThis(req));
}
