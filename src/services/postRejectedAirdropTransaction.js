async function postRejectedAirdropTransaction(address, wallet) {
	try {
		let url = "/api/airdrop/rejected";
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

		return data;
	} catch (error) {
		return {
			type: "error",
			message: `Claiming failed!`,
			description: error?.message,
		};
	}
}

export { postRejectedAirdropTransaction };
