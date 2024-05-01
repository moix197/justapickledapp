import { createContext, useState, useEffect, useRef, useContext } from "react";
import { getJupQuote } from "services/getJupQuote";
import {
	removeDecimalPointAndAddNumbers,
	addDecimalPoint,
} from "utils/manageDecimals";
import { RouterContext } from "contexts/RouterContextProvider";
import { filterDataFromUrl } from "hooks/filterDataFromUrlHook";
import { getDestinationTokenAmount } from "hooks/setDestinationAmountFromUrlHook";
import { delay } from "utils/delay";
import { getTokenPrice } from "services/getTokenPrice";
import { notify } from "utils/notifications";

const TransactionDataContext = createContext(null);

export default function TransactionDataContainer({ children }) {
	//const [originTokenData, setOriginTokenData] = useState({});
	//const [destinationTokenData, setDestinationTokenData] = useState({});
	const { amountParam } = useContext(RouterContext);
	const usdcAddress = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
	const [usdcValue, setUsdcValue] = useState("0");
	const [originTokenValuePerUsd, setOriginTokenValuePerUsd] = useState("0");
	const [destinationTokenValuePerUsd, setDestinationTokenValuePerUsd] =
		useState("0");
	const [originTokenAmount, setOriginTokenAmount] = useState("0");
	const [destinationTokenAmount, setDestinationTokenAmount] = useState("0");
	const [quote, setQuote] = useState("0");
	const [transactionSignature, setTransactionSignature] = useState(null);
	const [isLoadingTransaction, setIsLoadingTransaction] = useState(false);
	const [getNewQuote, setGetNewQuote] = useState(false);
	const [isTransactionSigned, setIsTransactionSigned] = useState(false);
	const [isLoadingQuote, setIsLoadingQuote] = useState(false);
	const [isLoadingUsdcQuote, setIsLoadingUsdcQuote] = useState(false);
	const [swapMode, setSwapMode] = useState("ExactIn");

	const amountValueNow = useRef(0);
	const { originTokenData, destinationTokenData } = filterDataFromUrl();
	//const { originTokenAmount } = getDestinationTokenAmount();

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
		isTransactionSigned,
		setIsTransactionSigned,
		isLoadingUsdcQuote,
		setIsLoadingUsdcQuote,
		getNewQuote,
		setGetNewQuote,
		destinationTokenValuePerUsd,
		originTokenValuePerUsd,
		swapMode,
		setSwapMode,
	};

	useEffect(() => {
		fetchData();
	}, [originTokenData, destinationTokenData /*, originTokenAmount*/]);

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

	useEffect(() => {
		swapMode == "ExactIn"
			? setOriginTokenAmount(amountParam)
			: setDestinationTokenAmount(amountParam);
	}, [amountParam]);

	useEffect(() => {
		fetchData();
	}, [swapMode == "ExactIn" ? originTokenAmount : destinationTokenAmount]);

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
			swapMode == "ExactIn" ? originTokenAmount : destinationTokenAmount,
			swapMode == "ExactIn"
				? originTokenData?.decimals
				: destinationTokenData?.decimals
		);

		setIsLoadingQuote(true);
		let quoteResponse = await getJupQuote(
			originTokenData?.address,
			destinationTokenData?.address,
			quoteAmount,
			swapMode
		);

		if (quoteResponse?.error) {
			if (quoteResponse?.error == "Could not find any route") {
				setSwapMode("ExactIn");
				notify({
					type: "error",
					message: "Error getting the quote",
					description: quoteResponse?.error + ", please try again",
				});
				return;
			}

			await delay(1000);
			fetchData();
			return;
		}

		let resultAmount = addDecimalPoint(
			swapMode == "ExactIn"
				? quoteResponse?.outAmount
				: quoteResponse?.inAmount,
			swapMode == "ExactIn"
				? destinationTokenData?.decimals
				: originTokenData?.decimals
		);

		swapMode == "ExactIn"
			? setDestinationTokenAmount(resultAmount)
			: setOriginTokenAmount(resultAmount);

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
