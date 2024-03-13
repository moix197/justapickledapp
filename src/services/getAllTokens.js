async function getAllTokens() {
	let tokensURL = "https://token.jup.ag/all";
	let response = await fetch(tokensURL);
	let data = await response.json();

	let objToLocalStorage = {
		time: new Date(),
		value: data,
	};

	return { value: data };
}

export { getAllTokens };
