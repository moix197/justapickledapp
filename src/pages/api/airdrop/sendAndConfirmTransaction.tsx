import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "utils/back/connection";
import { failedAirdropTransaction } from "utils/airdrop/failedAirdropTransaction";
import { getPublicKey } from "utils/getPublicKey";
import { confirmAirdropTransaction } from "utils/airdrop/confirmAirdropTransaction";
import { toBuffer } from "utils/toBuffer";

async function sendAndConfirmTransaction(postData) {
	try {
		let transaction = postData.body.transaction;
		let pubKey = getPublicKey(postData.body.address);

		if (pubKey?.err) {
			return {
				err: true,
				error: "Invalid wallet Address",
			};
		}

		const valuesArray: Array<number> = Object.values(transaction);
		let buffTransaction = toBuffer(valuesArray);

		const signature = await connection.sendRawTransaction(buffTransaction, {
			skipPreflight: true,
			maxRetries: 2,
		});

		let confirmedTransaction = await confirmAirdropTransaction(
			signature,
			pubKey.result.toString()
		);
		console.log("confirmedTrans");
		console.log(confirmedTransaction);

		if (confirmedTransaction?.err == true) {
			return {
				...confirmedTransaction,
			};
		}
		//let updated = failedAirdropTransaction(pubKey.result);

		return confirmedTransaction;
	} catch (error) {
		let pubKey = getPublicKey(postData.body.address);
		let updated = failedAirdropTransaction(pubKey.result.toString());

		return {
			err: true,
			error: "There was an error with the transaction, please try again later",
		};
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await sendAndConfirmTransaction(req));
}
