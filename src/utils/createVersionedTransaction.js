import {
	ComputeBudgetProgram,
	TransactionMessage,
	VersionedTransaction,
} from "@solana/web3.js";
import { connection } from "./connection.js";

async function createVersionedTransaction(instruction, payer, signer) {
	const PRIORITY_RATE = 100; // MICRO_LAMPORTS
	const PRIORITY_FEE_IX = ComputeBudgetProgram.setComputeUnitPrice({
		microLamports: PRIORITY_RATE,
	});
	instruction.push(PRIORITY_FEE_IX);

	//let minRent = await connection.getMinimumBalanceForRentExemption(0);
	let blockhash = await connection
		.getLatestBlockhash("confirmed")
		.then((res) => res.blockhash);

	const messageV0 = new TransactionMessage({
		payerKey: payer,
		recentBlockhash: blockhash,
		instructions: instruction,
	}).compileToV0Message();

	const transaction = new VersionedTransaction(messageV0);
	//transaction.sign([payer]);
	if (signer) transaction.sign([signer]);

	console.log(transaction);

	let serializedTransaction = transaction.serialize();
	let rawTransaction = Buffer.from(serializedTransaction, "base64");

	return rawTransaction;
}

export { createVersionedTransaction };
