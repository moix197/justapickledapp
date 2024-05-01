import { useContext } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import { postSwapTransaction } from "services/postSwapTransaction";
import { postSwapPickleTransaction } from "services/postSwapPickleTransaction";
import AmountAlert from "./AmountAlert";
import { connection } from "utils/connection";

function ExecuteSwapTransaction({ children }) {
	const {
		quote,
		setTransactionSignature,
		isLoadingQuote,
		isLoadingTransaction,
		setIsLoadingTransaction,
		setIsTransactionSigned,
		originTokenData,
		destinationTokenData,
	} = useContext(TransactionDataContext);
	const wallet = useWallet();

	function checkIfIsPickleSwap() {
		if (
			originTokenData.address ==
				"So11111111111111111111111111111111111111112" &&
			destinationTokenData.address ==
				"6hQb4SPG9dyMVyaqFeAaMGsnQbcAcNcCtkTm6ED34oC7"
		) {
			return true;
		}
		return false;
	}

	async function fireTransaction() {
		if (isLoadingTransaction || isLoadingQuote) return;
		setIsLoadingTransaction(true);
		setIsTransactionSigned(false);
		let signature = checkIfIsPickleSwap()
			? await postSwapPickleTransaction(
					quote,
					wallet,
					connection,
					setIsTransactionSigned
			  )
			: await postSwapTransaction(
					quote,
					wallet,
					connection,
					setIsTransactionSigned
			  );
		setIsLoadingTransaction(false);
		setTransactionSignature(signature);
	}

	return (
		<div onClick={fireTransaction}>
			<AmountAlert important={true}></AmountAlert>
			{children}
		</div>
	);
}

export { ExecuteSwapTransaction };
