async function confirmTransaction(signature) {
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
	return confirmedTransaction.json();
}

export { confirmTransaction };
