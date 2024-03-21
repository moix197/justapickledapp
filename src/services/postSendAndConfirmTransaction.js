async function postSendAndConfirmTransaction(transaction, userPublicKey) {
	try {
		let url = "/api/airdrop/sendAndConfirmTransaction";
		let response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				transaction: transaction.serialize(),
				address: userPublicKey.toString(),
			}),
		});
		let data = await response.json();
		console.log("data");
		console.log(data);
		return data;
	} catch (error) {
		return {
			type: "error",
			message: `Claiming failed!`,
			description: error?.message,
		};
	}
}

export { postSendAndConfirmTransaction };
