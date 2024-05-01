import { postCall } from "services/apiSkeletons/calls";

async function getSwapTransactionFromJup(quote, address) {
	try {
		const response = await postCall("https://quote-api.jup.ag/v6/swap", {
			quoteResponse: quote,
			userPublicKey: address,
			wrapAndUnwrapSol: true,
		});

		let transaction = response.swapTransaction;
		const swapTransactionBuf = Buffer.from(transaction, "base64");

		return {
			err: false,
			result: swapTransactionBuf,
		};
	} catch (error) {
		return {
			err: true,
			error: error,
		};
	}
}

export { getSwapTransactionFromJup };
