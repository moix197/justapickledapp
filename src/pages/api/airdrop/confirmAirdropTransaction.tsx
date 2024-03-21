import type { NextApiRequest, NextApiResponse } from "next";
import { failedAirdropTransaction } from "utils/airdrop/failedAirdropTransaction";
import { connection } from "utils/back/connection";
import { findDocuments, updateDocument } from "utils/back/db/crud";
import { getPublicKey } from "utils/getPublicKey";

async function confirmAirdropTransaction(postData) {
	try {
		let pubKey = getPublicKey(postData.body.key);
		if (pubKey?.err) {
			return {
				err: true,
				error: "Invalid wallet Address",
			};
		}
		console.log("startingConfirmation");
		let conn = await connection.confirmTransaction(
			postData.body.signature,
			"processed"
		);

		if (conn?.value?.err) {
			await failedAirdropTransaction(pubKey.result);
			return {
				err: true,
				error: "couldn't confirm the transaction, please try again",
			};
		}

		let airdropUserData = await findDocuments("twitter_airdrop", {
			wallet: pubKey.result.toString(),
		});

		let updatedRewards = {
			available: airdropUserData[0].rewards.available,
			sending: 0,
			claimed:
				airdropUserData[0].rewards.claimed + airdropUserData[0].rewards.sending,
			locked: airdropUserData[0].rewards.locked,
		};

		let updatedResult = updateDocument(
			"twitter_airdrop",
			{ _id: airdropUserData[0]._id },
			{
				rewards: updatedRewards,
				transactions: [
					...airdropUserData[0].transactions.slice(0, -1),
					{
						tx: "",
						status: "done",
						result: "accepted",
						launchTime:
							airdropUserData[0].transactions[
								airdropUserData[0].transactions.length - 1
							].launchTime,
					},
				],
			}
		);

		return {
			err: false,
			...conn,
		};
	} catch (error) {
		await failedAirdropTransaction(postData.body.key);
		return {
			err: true,
			error:
				"There was an error confirming the transaction, it's unknown if it succeeded or failed, please check the signature",
			txid: error.signature,
		};
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await confirmAirdropTransaction(req));
}
