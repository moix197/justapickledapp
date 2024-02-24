async function getJupQuote(
	originTokenAddress,
	destinationTokenAddress,
	quoteAmount
) {
	//setIsLoading(true);
	try {
		let url = `https://quote-api.jup.ag/v6/quote?inputMint=${originTokenAddress}&outputMint=${destinationTokenAddress}&amount=${quoteAmount}&slippageBps=50`;
		let response = await fetch(url);
		let data = await response.json();
		return data;
		//setIsLoading(false);
	} catch (error) {
		console.error("Error fetching quote:", error);
		//setIsLoading(false);
	}
}

export { getJupQuote };
