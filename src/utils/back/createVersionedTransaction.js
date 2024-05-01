import {
	ComputeBudgetProgram,
	TransactionMessage,
	VersionedTransaction,
} from "@solana/web3.js";
import { connection } from "utils/back/connection";

async function createVersionedTransaction(instruction, payer, signer) {
	const PRIORITY_RATE = 100000; // MICRO_LAMPORTS
	const COMPUTE_BUDGET_UNIT_LIMIT = ComputeBudgetProgram.setComputeUnitLimit({
		units: 800000,
	});
	const PRIORITY_FEE_IX = ComputeBudgetProgram.setComputeUnitPrice({
		microLamports: PRIORITY_RATE,
	});
	instruction.push(COMPUTE_BUDGET_UNIT_LIMIT);
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
	if (signer) transaction.sign([signer]);

	let serializedTransaction = transaction.serialize();
	let rawTransaction = Buffer.from(serializedTransaction, "base64");

	return rawTransaction;
}

export { createVersionedTransaction };
