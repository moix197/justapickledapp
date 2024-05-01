async function getParsedTokenAccounts(userPublicKey, tokenProgram) {
	try {
		let url = `/api/getTokenAccounts?key=${userPublicKey.toString()}&program=${tokenProgram}`;
		let response = await fetch(url);
		return response.json();
	} catch (error) {
		return false;
	}
}

export { getParsedTokenAccounts };
