import { connection } from "pages/api/utils/connection";
import { createVersionedTransaction } from "pages/api/utils/createVersionedTransaction.js";
import { delay } from "utils/delay.js";
import { handleTransactionConfirmation } from "utils/handleTransactionConfirmation.js";

async function createAndSendTransaction(
	{ instructions, payer, signer = false },
	message
) {
	await executeTransaction(async () => {
		let transaction = await createVersionedTransaction(
			instructions,
			payer,
			signer
		);

		const txid = await connection.sendRawTransaction(
			transaction /*, {
			skipPreflight: true,
			maxRetries: 2,
		}*/
		);
		await handleTransactionConfirmation(txid, message);
	});
}

async function executeTransaction(cb) {
	try {
		let result = await cb();
		return result;
	} catch (error) {
		console.log("no pudimos");
		console.log(error);
		await delay(10000);
		return await executeTransaction(async () => {
			await cb();
		});
	}
}

export { createAndSendTransaction };
