async function confirmAirdropTransaction(signature, key) {
	try {
		let urlTransaction = "/api/airdrop/confirmAirdropTransaction";
		let confirmedTransaction = await fetch(urlTransaction, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				signature,
				key,
			}),
		});
		let data = await confirmedTransaction.json();

		return data;
	} catch (error) {
		return {
			error,
		};
	}
}

export { confirmAirdropTransaction };
