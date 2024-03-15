async function confirmTransaction(signature) {
	try {
		let urlTransaction = "/api/confirmTransaction";
		let confirmedTransaction = await fetch(urlTransaction, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				signature,
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

export { confirmTransaction };
