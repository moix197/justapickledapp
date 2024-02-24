import { createContext, useState, useEffect, useRef } from "react";
import { debounce } from "utils/debounce";
import { getJupQuote } from "services/getJupQuote";
import {
	removeDecimalPointAndAddNumbers,
	addDecimalPoint,
} from "utils/manageDecimals";

const TransactionDataContext = createContext(null);

export default function TransactionDataContainer({ children }) {
	const [originTokenData, setOriginTokenData] = useState({});
	const [destinationTokenData, setDestinationTokenData] = useState({});
	const [destinationTokenAmount, setDestinationTokenAmount] = useState("0");
	const [originTokenAmount, setOriginTokenAmount] = useState("0");
	useState([]);
	const [quote, setQuote] = useState("0");
	const [transactionSignature, setTransactionSignature] = useState(null);
	const [isLoadingTransaction, setIsLoadingTransaction] = useState(false);
	const [isLoadingQuote, setIsLoadingQuote] = useState(false);
	const amountValueNow = useRef(0);

	const transactionData = {
		originTokenData,
		setOriginTokenData,
		originTokenAmount,
		setOriginTokenAmount,
		destinationTokenData,
		setDestinationTokenData,
		destinationTokenAmount,
		setDestinationTokenAmount,
		quote,
		transactionSignature,
		setTransactionSignature,
		setQuote,
		amountValueNow,
		isLoadingTransaction,
		setIsLoadingTransaction,
		isLoadingQuote,
		setIsLoadingQuote,
	};

	useEffect(() => {
		if (
			Object.entries(destinationTokenData).length == 0 ||
			Object.entries(originTokenData).length == 0
		) {
			return;
		}

		let quoteAmount = removeDecimalPointAndAddNumbers(
			originTokenAmount,
			originTokenData?.decimals
		);
		debounce(amountValueNow, originTokenAmount, 1000, async () => {
			setIsLoadingQuote(true);
			let quoteResponse = await getJupQuote(
				originTokenData?.address,
				destinationTokenData?.address,
				quoteAmount
			);
			let resultAmount = addDecimalPoint(
				quoteResponse?.outAmount,
				destinationTokenData?.decimals
			);
			setDestinationTokenAmount(resultAmount);
			setQuote(quoteResponse);
			setIsLoadingQuote(false);
		});
	}, [originTokenData]);

	useEffect(() => {
		if (
			Object.entries(destinationTokenData).length == 0 ||
			Object.entries(originTokenData).length == 0
		) {
			return;
		}
		const fecthData = async () => {
			let quoteAmount = removeDecimalPointAndAddNumbers(
				originTokenAmount,
				originTokenData?.decimals
			);
			setIsLoadingQuote(true);
			let quoteResponse = await getJupQuote(
				originTokenData?.address,
				destinationTokenData?.address,
				quoteAmount
			);
			let resultAmount = addDecimalPoint(
				quoteResponse.outAmount,
				destinationTokenData?.decimals
			);
			setDestinationTokenAmount(resultAmount);
			setQuote(quoteResponse);
			setIsLoadingQuote(false);
		};

		fecthData();
	}, [destinationTokenData]);

	return (
		<TransactionDataContext.Provider value={transactionData}>
			{children}
		</TransactionDataContext.Provider>
	);
}

export { TransactionDataContainer, TransactionDataContext };

//
