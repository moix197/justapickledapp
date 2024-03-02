import { VersionedTransaction } from "@solana/web3.js";
import { notify } from "utils/notifications";

async function postSwapTransaction(quote, wallet, connection) {
	try {
		let url = "/api/swap";
		let response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				// quoteResponse from /quote api
				quoteResponse: quote,
				// user public key to be used for the swap
				userPublicKey: wallet.publicKey,
			}),
		});
		let data = await response.json();
		let transaction = VersionedTransaction.deserialize(data.data);
		//let signedTransaction = await wallet.signTransaction(transaction);
		//console.log(signedTransaction);
		//let rawTransaction = transaction;
		let signature = await wallet.sendTransaction(transaction, connection);
		let conn = await connection.confirmTransaction(signature, "processed");

		//let final = signedTransaction.serialize();
		//console.log(final);
		/*let urlTransaction = "/api/sendTransaction";
		let responseTransaction = await fetch(urlTransaction, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				// quoteResponse from /quote api
				signedTransaction: rawTransaction,
				esto: "esteee",
				// user public key to be used for the swap
			}),
		});*/

		if (conn?.value?.err) {
			notify({
				type: "error",
				message: "Failed to Confirm the transaction!",
				description: conn.value.err,
			});
			return { value: "error" };
		}
		notify({
			type: "success",
			message: "Transaction successful!",
			txid: signature,
		});
		return { value: "success", txid: signature };
	} catch (error) {
		console.log("error");
		console.log(error);
		notify({
			type: "error",
			message: `Transaction failed!`,
			description: error?.message,
		});
		return { value: "error" };
	}
}

export { postSwapTransaction };
