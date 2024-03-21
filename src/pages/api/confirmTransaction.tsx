import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "utils/back/connection";

async function confirmTransaction(postData) {
	try {
		let conn = await connection.confirmTransaction(
			postData.body.signature,
			"processed"
		);

		return conn;
	} catch (error) {
		return {
			value: {
				err: true,
				error:
					"There was an error confirming the transaction, it's unknown if it succeeded or failed, please check the signature",
				txid: error?.signature,
			},
		};
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await confirmTransaction(req));
}
