async function getTokenData(mintAddress) {
	const response = await fetch(
		"https://mainnet.helius-rpc.com/?api-key=" + process.env.HELIUS_API_KEY,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				jsonrpc: "2.0",
				id: "text",
				method: "getAsset",
				params: {
					id: mintAddress,
				},
			}),
		}
	);
	const data = await response.json();

	if (data.error) {
		throw new Error(
			"Couldn't get the token data, please check the mint address"
		);
	}

	return data;
}

export { getTokenData };
