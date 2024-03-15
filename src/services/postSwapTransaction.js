import { VersionedTransaction } from "@solana/web3.js";
import { confirmTransaction } from "services/confirmTransaction";

async function postSwapTransaction(
	quote,
	wallet,
	connection,
	setTransactionSigned
) {
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
		setTransactionSigned(true);
		let dataConfirmed = await confirmTransaction(signature);

		console.log("data confirmation");
		console.log(dataConfirmed);

		if (dataConfirmed?.value?.err) {
			return {
				type: "error",
				message: "Failed to confirm the transaction",
				description: dataConfirmed?.value?.error,
			};
		}

		return {
			type: "success",
			message: "Transaction successful!",
			txid: signature,
		};
	} catch (error) {
		console.log("error");
		console.log(error);

		return {
			type: "error",
			message: `Transaction failed!`,
			description: error?.message,
		};
	}
}

export { postSwapTransaction };
