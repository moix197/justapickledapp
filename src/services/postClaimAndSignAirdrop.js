import { VersionedTransaction } from "@solana/web3.js";
import { postRejectedAirdropTransaction } from "services/postRejectedAirdropTransaction";

async function postClaimAndSignAirdrop(address, wallet, connection) {
	try {
		let url = "/api/airdrop/claim";
		let response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				address: address,
			}),
		});
		let data = await response.json();
		console.log(data);
		if (data.err) {
			return {
				type: "error",
				message: "Claiming failed",
				description: data.error,
			};
		}

		let transaction = VersionedTransaction.deserialize(
			data.result.versionedTransaction.data
		);

		//let signature = await wallet.sendTransaction(transaction, connection);
		console.log(wallet);
		let signature = await wallet.signTransaction(transaction, connection);

		return signature;
	} catch (error) {
		postRejectedAirdropTransaction(address);
		return {
			type: "error",
			message: `Claiming failed!`,
			description: error?.message,
		};
	}
}

export { postClaimAndSignAirdrop };
