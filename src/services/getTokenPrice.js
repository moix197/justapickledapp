async function getTokenPrice(tokenAddress) {
	//setIsLoading(true);
	if (!tokenAddress) return;
	try {
		let url = `https://price.jup.ag/v4/price?ids=${tokenAddress}`;
		let response = await fetch(url);
		let data = await response.json();
		return data;
		//setIsLoading(false);
	} catch (error) {
		console.error("Error fetching quote:", error);
		//setIsLoading(false);
	}
}

export { getTokenPrice };
