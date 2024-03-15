async function getJupQuote(
	originTokenAddress,
	destinationTokenAddress,
	quoteAmount,
	swapMode
) {
	//setIsLoading(true);
	try {
		let url = `https://quote-api.jup.ag/v6/quote?inputMint=${originTokenAddress}&outputMint=${destinationTokenAddress}&amount=${quoteAmount}&slippageBps=50&swapMode=${swapMode}`;
		console.log(url);
		let response = await fetch(url);
		let data = await response.json();
		console.log(data);
		return data;
		//setIsLoading(false);
	} catch (error) {
		console.error("Error fetching quote:", error);
		return error;
		//setIsLoading(false);
	}
}

export { getJupQuote };
