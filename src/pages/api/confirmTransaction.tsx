import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "pages/api/utils/connection";

async function confirmTransaction(postData) {
	try {
		let conn = await connection.confirmTransaction(
			postData.body.signature,
			"processed"
		);

		console.log("este es el conn");
		console.log(conn);
		return conn;
	} catch (error) {
		console.log("este es el error al confirmar la transaction");
		console.log(error);
		return {
			value: {
				err: true,
				error:
					"There was an error confirming the transaction, it's unknown if it succeeded or failed, please check the signature",
				txid: error.signature,
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
