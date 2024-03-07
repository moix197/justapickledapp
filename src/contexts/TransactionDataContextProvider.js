import { createContext, useState, useEffect, useRef } from "react";
import { getJupQuote } from "services/getJupQuote";
import {
	removeDecimalPointAndAddNumbers,
	addDecimalPoint,
} from "utils/manageDecimals";
import { filterDataFromUrl } from "hooks/filterDataFromUrlHook";
import { getDestinationTokenAmount } from "hooks/setDestinationAmountFromUrlHook";
import { delay } from "utils/delay";
import {
	addCommasToAmount,
	removeCommasFromAmount,
} from "utils/formatAndUpdateAmount";
import { getTokenPrice } from "services/getTokenPrice";
import { notify } from "utils/notifications";

const TransactionDataContext = createContext(null);

export default function TransactionDataContainer({ children }) {
	//const [originTokenData, setOriginTokenData] = useState({});
	//const [destinationTokenData, setDestinationTokenData] = useState({});
	const usdcAddress = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
	const [destinationTokenAmount, setDestinationTokenAmount] = useState("0");
	const [usdcValue, setUsdcValue] = useState("0");
	const [originTokenValuePerUsd, setOriginTokenValuePerUsd] = useState("0");
	const [destinationTokenValuePerUsd, setDestinationTokenValuePerUsd] =
		useState("0");
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
		destinationTokenValuePerUsd,
		originTokenValuePerUsd,
	};

	useEffect(() => {
		fetchData();
	}, [originTokenData, destinationTokenData, originTokenAmount]);

	useEffect(() => {
		if (!getNewQuote) return;
		setGetNewQuote(false);

		fetchData();
	}, [getNewQuote]);

	useEffect(() => {
		setUsdcValue(originTokenValuePerUsd * parseFloat(originTokenAmount));
	}, [originTokenValuePerUsd, originTokenAmount]);

	useEffect(() => {
		getTokenValuePerUsd(originTokenData, setOriginTokenValuePerUsd);
	}, [originTokenData]);

	useEffect(() => {
		getTokenValuePerUsd(destinationTokenData, setDestinationTokenValuePerUsd);
	}, [destinationTokenData]);

	useEffect(() => {
		if (!transactionSignature) return;

		notify(transactionSignature);
		setTransactionSignature(null);
	}, [transactionSignature]);

	async function getTokenValuePerUsd(tokenData, setDestinationFunc) {
		if (!tokenData || tokenData?.address == usdcAddress) {
			setDestinationFunc(null);
			return;
		}

		let tokenPrice = await getTokenPrice(tokenData?.address);
		setDestinationFunc(tokenPrice?.data[tokenData?.address]?.price);
	}

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

	return (
		<TransactionDataContext.Provider value={transactionData}>
			{children}
		</TransactionDataContext.Provider>
	);
}

export { TransactionDataContainer, TransactionDataContext };

//
