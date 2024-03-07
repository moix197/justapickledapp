// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
	AddressLookupTableAccount,
	Connection,
	PublicKey,
	TransactionInstruction,
	TransactionMessage,
	VersionedTransaction,
} from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";
import { delay } from "utils/delay";

async function doThis(postData) {
	const connection = new Connection(
		"https://withered-orbital-sailboat.solana-mainnet.quiknode.pro/ac33801cbf8e7a422bfc7ecbc7843f202e53fa60/"
	);
	//console.log(postData.body.userPublicKey);

	/*const instructions = await (
		await fetch("https://quote-api.jup.ag/v6/swap-instructions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				// quoteResponse from /quote api
				quoteResponse: postData.body.quoteResponse,
				userPublicKey: postData.body.userPublicKey.toString(),
			}),
		})
	).json();

	if (instructions.error) {
		throw new Error("Failed to get swap instructions: " + instructions.error);
	}

	const {
		tokenLedgerInstruction, // If you are using `useTokenLedger = true`.
		computeBudgetInstructions, // The necessary instructions to setup the compute budget.
		//setupInstructions, // Setup missing ATA for the users.
		swapInstruction: swapInstructionPayload, // The actual swap instruction.
		cleanupInstruction, // Unwrap the SOL if `wrapAndUnwrapSol = true`.
		addressLookupTableAddresses, // The lookup table addresses that you can use if you are using versioned transaction.
	} = instructions;

	const deserializeInstruction = (instruction) => {
		return new TransactionInstruction({
			programId: new PublicKey(instruction.programId),
			keys: instruction.accounts.map((key) => ({
				pubkey: new PublicKey(key.pubkey),
				isSigner: key.isSigner,
				isWritable: key.isWritable,
			})),
			data: Buffer.from(instruction.data, "base64"),
		});
	};

	const getAddressLookupTableAccounts = async (
		keys: string[]
	): Promise<AddressLookupTableAccount[]> => {
		const addressLookupTableAccountInfos =
			await connection.getMultipleAccountsInfo(
				keys.map((key) => new PublicKey(key))
			);

		return addressLookupTableAccountInfos.reduce((acc, accountInfo, index) => {
			const addressLookupTableAddress = keys[index];
			if (accountInfo) {
				const addressLookupTableAccount = new AddressLookupTableAccount({
					key: new PublicKey(addressLookupTableAddress),
					state: AddressLookupTableAccount.deserialize(accountInfo.data),
				});
				acc.push(addressLookupTableAccount);
			}

			return acc;
		}, new Array<AddressLookupTableAccount>());
	};

	const addressLookupTableAccounts: AddressLookupTableAccount[] = [];

	addressLookupTableAccounts.push(
		...(await getAddressLookupTableAccounts(addressLookupTableAddresses))
	);

	const blockhash = (await connection.getLatestBlockhash()).blockhash;
	const messageV0 = new TransactionMessage({
		payerKey: new PublicKey(postData.body.userPublicKey.toString()),
		recentBlockhash: blockhash,
		instructions: [
			//...setupInstructions.map(deserializeInstruction),
			deserializeInstruction(swapInstructionPayload),
			deserializeInstruction(cleanupInstruction),
		],
	}).compileToV0Message(addressLookupTableAccounts);
	const transaction = new VersionedTransaction(messageV0);
	const serializedTransaction = transaction.serialize();

	const swapTransactionBuf = Buffer.from(serializedTransaction, "base64");*/

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
	res: NextApiResponse
) {
	res.status(200).json(await doThis(req));
}
