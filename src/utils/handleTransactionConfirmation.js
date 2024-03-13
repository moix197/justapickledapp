import { connection } from "./connection.js";
import printResult from "./printResult.js";

async function handleTransactionConfirmation(txid, confirmationText) {
	let confirmation = await connection.confirmTransaction(txid, "processed");

	if (!confirmation?.value?.err) {
		printResult(confirmationText, txid);
		return;
	}
	console.log(confirmation.value?.err);
}

export { handleTransactionConfirmation };
