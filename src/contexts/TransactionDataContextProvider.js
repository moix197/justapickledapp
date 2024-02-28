import { createContext, useState, useEffect, useRef } from "react";
import { getJupQuote } from "services/getJupQuote";
import {
	removeDecimalPointAndAddNumbers,
	addDecimalPoint,
} from "utils/manageDecimals";
import { filterDataFromUrl } from "hooks/filterDataFromUrlHook";
import { getDestinationTokenAmount } from "hooks/setDestinationAmountFromUrlHook";

const TransactionDataContext = createContext(null);

export default function TransactionDataContainer({ children }) {
	//const [originTokenData, setOriginTokenData] = useState({});
	//const [destinationTokenData, setDestinationTokenData] = useState({});
	const [destinationTokenAmount, setDestinationTokenAmount] = useState("0");
	//const [originTokenAmount, setOriginTokenAmount] = useState("0");
	const [quote, setQuote] = useState("0");
	const [transactionSignature, setTransactionSignature] = useState(null);
	const [isLoadingTransaction, setIsLoadingTransaction] = useState(false);
	const [getNewQuote, setGetNewQuote] = useState(false);
	const [isLoadingQuote, setIsLoadingQuote] = useState(false);
	const amountValueNow = useRef(0);
	const { originTokenData, destinationTokenData } = filterDataFromUrl();
	const { originTokenAmount } = getDestinationTokenAmount();

	const transactionData = {
		originTokenData,
		//setOriginTokenData,
		originTokenAmount,
		//setOriginTokenAmount,
		destinationTokenData,
		//setDestinationTokenData,
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
		getNewQuote,
		setGetNewQuote,
	};

	useEffect(() => {
		if (
			!destinationTokenData ||
			!originTokenData ||
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
				quoteResponse?.outAmount,
				destinationTokenData?.decimals
			);
			setDestinationTokenAmount(resultAmount);
			setQuote(quoteResponse);
			setIsLoadingQuote(false);
		};

		fecthData();
	}, [originTokenData, destinationTokenData, originTokenAmount]);

	useEffect(() => {
		if (!getNewQuote) return;
		setGetNewQuote(false);
		if (
			!destinationTokenData ||
			!originTokenData ||
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
				quoteResponse?.outAmount,
				destinationTokenData?.decimals
			);
			setDestinationTokenAmount(resultAmount);
			setQuote(quoteResponse);
			setIsLoadingQuote(false);
		};

		fecthData();
	}, [getNewQuote]);

	return (
		<TransactionDataContext.Provider value={transactionData}>
			{children}
		</TransactionDataContext.Provider>
	);
}

export { TransactionDataContainer, TransactionDataContext };

//
