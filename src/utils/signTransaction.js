function signTransaction(transaction, signer) {
	return transaction.sign([signer]);
}

export { signTransaction };
