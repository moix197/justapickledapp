import { useContext } from "react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import { postSwapTransaction } from "services/postSwapTransaction";

function ExecuteSwapTransaction({ children }) {
	const {
		quote,
		setTransactionSignature,
		isLoadingQuote,
		isLoadingTransaction,
		setIsLoadingTransaction,
	} = useContext(TransactionDataContext);
	const wallet = useWallet();
	//const { connection } = useConnection();
	/*const connection = new Connection(
		"https://withered-orbital-sailboat.solana-mainnet.quiknode.pro/ac33801cbf8e7a422bfc7ecbc7843f202e53fa60/"
	);*/
	const connection = new Connection(clusterApiUrl("mainnet-beta"));

	async function fireTransaction() {
		if (isLoadingTransaction || isLoadingQuote) return;
		setIsLoadingTransaction(true);
		let signature = await postSwapTransaction(quote, wallet, connection);
		setIsLoadingTransaction(false);
		setTransactionSignature(signature);
	}

	return <div onClick={fireTransaction}>{children}</div>;
}

export { ExecuteSwapTransaction };
