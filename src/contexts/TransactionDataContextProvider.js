import { createContext, useState, useEffect, useRef } from "react";
import { getJupQuote } from "services/getJupQuote";
import {
	removeDecimalPointAndAddNumbers,
	addDecimalPoint,
} from "utils/manageDecimals";
import { filterDataFromUrl } from "hooks/filterDataFromUrlHook";
import { getDestinationTokenAmount } from "hooks/setDestinationAmountFromUrlHook";
import { delay } from "utils/delay";
import { addCommasToAmount } from "utils/formatAndUpdateAmount";

const TransactionDataContext = createContext(null);

export default function TransactionDataContainer({ children }) {
	//const [originTokenData, setOriginTokenData] = useState({});
	//const [destinationTokenData, setDestinationTokenData] = useState({});
	const [destinationTokenAmount, setDestinationTokenAmount] = useState("0");
	const [usdcValue, setUsdcValue] = useState("0");
	//const [originTokenAmount, setOriginTokenAmount] = useState("0");
	const [quote, setQuote] = useState("0");
	const [transactionSignature, setTransactionSignature] = useState(null);
	const [isLoadingTransaction, setIsLoadingTransaction] = useState(false);
	const [getNewQuote, setGetNewQuote] = useState(false);
	const [isLoadingQuote, setIsLoadingQuote] = useState(false);
	const [isLoadingUsdcQuote, setIsLoadingUsdcQuote] = useState(false);

	const amountValueNow = useRef(0);
	const { originTokenData, destinationTokenData } = filterDataFromUrl();
	const { originTokenAmount } = getDestinationTokenAmount();

	const transactionData = {
		originTokenData,
		//setOriginTokenData,
		originTokenAmount,
		//setOriginTokenAmount,
		destinationTokenData,
		usdcValue,
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
		isLoadingUsdcQuote,
		setIsLoadingUsdcQuote,
		getNewQuote,
		setGetNewQuote,
	};

	useEffect(() => {
		fetchData();
		fetchUsdcValue();
	}, [originTokenData, destinationTokenData, originTokenAmount]);

	useEffect(() => {
		if (!getNewQuote) return;
		setGetNewQuote(false);

		fetchData();
		fetchUsdcValue();
	}, [getNewQuote]);

	async function fetchData() {
		if (
			!destinationTokenData ||
			!originTokenData ||
			!originTokenAmount ||
			Object.entries(destinationTokenData).length == 0 ||
			Object.entries(originTokenData).length == 0
		) {
			return;
		}

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

		if (quoteResponse?.error) {
			await delay(1000);
			fetchData();
			return;
		}

		let resultAmount = addDecimalPoint(
			quoteResponse?.outAmount,
			destinationTokenData?.decimals
		);
		setDestinationTokenAmount(resultAmount);
		setQuote(quoteResponse);
		setIsLoadingQuote(false);
	}

	async function fetchUsdcValue() {
		if (!originTokenAmount || !originTokenData) return;
		setIsLoadingUsdcQuote(true);
		let quoteAmount = removeDecimalPointAndAddNumbers(
			originTokenAmount,
			originTokenData?.decimals
		);

		let quoteResponse = await getJupQuote(
			originTokenData?.address,
			"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
			quoteAmount
		);

		let resultAmount = addDecimalPoint(quoteResponse?.outAmount, 6);
		setIsLoadingUsdcQuote(false);
		setUsdcValue(addCommasToAmount(resultAmount));
	}

	return (
		<TransactionDataContext.Provider value={transactionData}>
			{children}
		</TransactionDataContext.Provider>
	);
}

export { TransactionDataContainer, TransactionDataContext };

//
