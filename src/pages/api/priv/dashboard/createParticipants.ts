import type { NextApiRequest, NextApiResponse } from "next";
import { errorHandlerMiddleware } from "utils/back/errorHandlerMiddleware";
import {
	ASSOCIATED_TOKEN_PROGRAM_ID,
	getAssociatedTokenAddress,
} from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { ObjectId } from "mongodb";
import { connection } from "utils/back/connection";
import {
	findDocuments,
	insertDocument,
	insertMultipleDocuments,
	updateDocument,
} from "utils/back/db/crud";
import { bulkValidate } from "utils/formSubmitValidation";
import { getSessionWalletAddress } from "utils/getSessionWalletAddress";
import { checkIfOwnerOrAdmin } from "utils/validation/checkIfOwnerOrAdmin";
import { executeCallByChunks } from "utils/general";
import { delay } from "utils/delay";

async function createParticipants(req) {
	try {
		const address = await getSessionWalletAddress(req);
		const { participants, toBuy, status, collection, itemId } = req.body;

		let validationResponse = bulkValidate({
			participants: participants,
			toBuyAmount: toBuy,
			status,
		});

		if (validationResponse.length > 0) {
			console.log(`invalid collection ${validationResponse[0]}`);
			throw new Error(
				"Failed Validation, please update the fields and try again"
			);
		}

		if (collection !== "airdrops" && collection !== "sales") {
			console.log(`invalid collection ${collection}`);
			throw new Error("invalid collection, please try again later");
		}

		let collectionItemFromDb = await findDocuments(
			`${collection === "sales" ? "tokenSales" : collection}Data`,
			{
				_id: new ObjectId(itemId),
			}
		);

		if (collectionItemFromDb.length != 1) {
			console.log(
				`collection not found ${collectionItemFromDb.length} with the id ${itemId}`
			);
			throw new Error("Couldn't create the users, please try again later");
		}

		let projectRole = await checkIfOwnerOrAdmin(
			collection,
			collectionItemFromDb[0],
			address
		);

		let vaultData = await findDocuments("vaultData", {
			_id: collectionItemFromDb[0].vaultId,
		});

		let tokenData = await findDocuments("tokensData", {
			address: vaultData[0].tokenMint,
		});

		let participantsWithNoDuplicates = [...new Set(participants)];

		let participantsTokenAccounts = [];
		for (const item of participantsWithNoDuplicates) {
			const tokenAccount = await getAssociatedTokenAddress(
				new PublicKey(tokenData[0].address),
				new PublicKey(item),
				false,
				new PublicKey(tokenData[0].info.token_program),
				ASSOCIATED_TOKEN_PROGRAM_ID
			);
			participantsTokenAccounts.push(tokenAccount);
		}

		let checkParticipantTokenAccount = await executeCallByChunks(
			participantsTokenAccounts,
			100,
			async function checkParticipantTokenAccountCallback(ary, retries = 5) {
				try {
					return await connection.getMultipleAccountsInfo(ary);
				} catch (error) {
					if (retries > 0) {
						console.log(`Retrying chunk due to error: ${error.message}`);
						await delay(1000);
						// Recursive call with updated retries count
						return checkParticipantTokenAccountCallback(ary, retries - 1);
					} else {
						throw error; // No more retries left, re-throw the error
					}
				}
			}
		);
		/*let checkParticipantTokenAccount = await connection.getMultipleAccountsInfo(
			participantsTokenAccounts
		);*/

		let finalParticipantsAry = participantsWithNoDuplicates.map(
			(item, index) => {
				return {
					address: item,
					relatedItemId: new ObjectId(itemId),
					status: status,
					rewards: {
						toClaim: 0,
						claimed: 0,
						toBuy: parseFloat(toBuy),
						bought: 0,
						locked: 0,
						toSend: 0,
						sending: 0,
						sent: 0,
					},
					tokenAccount: {
						value: checkParticipantTokenAccount[index] ? true : false,
						address: participantsTokenAccounts[index].toString(),
					},
				};
			}
		);

		let insertedResult = await insertMultipleDocuments(
			`${collection}UserData`,
			finalParticipantsAry
		);

		if (insertedResult?.insertedCount == 0) {
			throw new Error("We couldn't create the users, please try again later");
		}

		let updateUsersQty = await updateDocument(
			`${collection === "sales" ? "tokenSales" : collection}Data`,
			{ _id: collectionItemFromDb[0]._id },
			false,
			{ $inc: { usersQty: finalParticipantsAry.length } }
		);

		return {
			err: false,
			success: "Users created successfully",
		};
	} catch (error) {
		return {
			err: true,
			error: error.message,
		};
	}
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json(await createParticipants(req));
}

export default errorHandlerMiddleware(handler);
