import { useContext } from "react";
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
	const { connection } = useConnection();

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
