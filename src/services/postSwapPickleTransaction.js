import { VersionedTransaction } from "@solana/web3.js";
import { confirmTransaction } from "services/confirmTransaction";

async function postSwapPickleTransaction(quote, wallet, connection) {
	try {
		let url = "/api/pickleSwap";
		let response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userPublicKey: wallet.publicKey,
				quote: quote,
			}),
		});

		if (data?.error)
			return {
				type: "error",
				message: "Transaction Failed!",
				description: data.error,
			};
		console.log(response);
		let data = await response.json();
		console.log(data);
		let transaction = VersionedTransaction.deserialize(data.data);
		let signature = await wallet.sendTransaction(transaction, connection);
		let dataConfirmed = await confirmTransaction(signature);

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
		console.log(error);
		return {
			type: "error",
			message: `Transaction failed!`,
			description: error?.message,
		};
	}
}

export { postSwapPickleTransaction };
