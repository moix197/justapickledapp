async function getAllTokens() {
	let tokensURL = "https://token.jup.ag/all";
	let response = await fetch(tokensURL);
	let data = await response.json();
	return data;
}

export { getAllTokens };
