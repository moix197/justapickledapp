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
		let signature = await wallet.sendTransaction(transaction, connection);
		let latestBlockHash = await connection.getLatestBlockhash();
		console.log("signature: ");
		console.log(signature);
		console.log("________________________");

		console.log("latestBlockHash: ");
		console.log(latestBlockHash);
		console.log("________________________");
		let conn = await connection.confirmTransaction(signature, "processed");
		console.log("conn: ");
		console.log(conn);
		console.log("________________________");

		if (conn?.value?.err) {
			notify({
				type: "error",
				message: "Failed to Confirm the transaction!",
				description: conn.value.err,
			});
			return;
		}
		notify({
			type: "success",
			message: "Transaction successful!",
			txid: signature,
		});
	} catch (error) {
		console.log("error");
		console.log(error);
		notify({
			type: "error",
			message: `Transaction failed!`,
			description: error?.message,
		});
		return;
	}
}

export { postSwapTransaction };
