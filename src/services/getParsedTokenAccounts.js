async function getParsedTokenAccounts(userPublicKey, tokenProgram, connection) {
	try {
		let response = await connection.getParsedTokenAccountsByOwner(
			userPublicKey,
			{
				programId: tokenProgram,
			}
		);
		return response;
	} catch (error) {
		console.log(error);
		return false;
	}
}

export { getParsedTokenAccounts };
