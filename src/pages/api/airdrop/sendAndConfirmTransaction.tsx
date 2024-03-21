import type { NextApiRequest, NextApiResponse } from "next";
import { connection } from "utils/back/connection";
import { failedAirdropTransaction } from "utils/airdrop/failedAirdropTransaction";
import { getPublicKey } from "utils/getPublicKey";
import { confirmAirdropTransaction } from "utils/airdrop/confirmAirdropTransaction";
import { VersionedTransaction } from "@solana/web3.js";
import { serialize, deserialize } from "borsh";

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
		//console.log("transaction here");
		//console.log(transaction.signatures[1]);

		//console.log(transaction);
		//let esto = VersionedTransaction.serialize(transaction);

		/*let trans = convertSignature(transaction);

		function convertSignature(item) {
			return Object.values(item).map((value: string) => value);
		}*/

		//let ary = new Uint8Array(trans);
		console.log("traaaaans");
		console.log(transaction);
		/*transaction.signatures[1] = convertSignature(transaction.signatures[1]);
		transaction.signatures[0] = convertSignature(transaction.signatures[0]);

		transaction.signatures[0] = new Uint8Array(transaction.signatures[0]);
		transaction.signatures[1] = new Uint8Array(transaction.signatures[1]);

		function convertSignature(item) {
			return Object.values(item).map((value: string) => value);
		}*/

		const buffTransaction = Buffer.from(serialize("array", transaction));
		console.log(buffTransaction);

		const signature = await connection.sendRawTransaction(buffTransaction, {
			skipPreflight: true,
			maxRetries: 2,
		});

		console.log("my signature");
		console.log(signature);

		let confirmedTransaction = await confirmAirdropTransaction(
			signature,
			pubKey.result.toString()
		);
		console.log("confirmedTrans");
		console.log(confirmedTransaction);

		if (confirmedTransaction?.err == true) {
			return {
				err: true,
				error: "We couldn't confirm the transaction, please try again later",
			};
		}
		//let updated = failedAirdropTransaction(pubKey.result);

		return confirmedTransaction;
	} catch (error) {
		console.log(error);
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
