import { useEffect, useState, useContext, useRef } from "react";
import { useRouter } from "next/router";
import QuickAmountBtns from "components/swap/QuickAmountBtns";
import {
	addCommasToAmount,
	removeCommasFromAmount,
} from "utils/formatAndUpdateAmount";
import { RefreshPriceBtn } from "components/swap/RefreshPriceBtn";
import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import { debounce } from "utils/debounce";

const TokenAmountInput = ({
	urlParameter = false,
	showRefreshPrice = { value: false },
	showQuickBtns = false,
}) => {
	const router = useRouter();
	const [token, setToken] = useState({});
	const [inputAmount, setInputAmount] = useState("");
	const {
		originTokenData,
		originTokenAmount,
		destinationTokenData,
		destinationTokenAmount,
		destinationTokenValuePerUsd,
		originTokenValuePerUsd,
		isLoadingQuote,
	} = useContext(TransactionDataContext);
	const amountValueNow = useRef(0);

	useEffect(() => {
		if (urlParameter == "originToken") {
			setToken({
				...originTokenData,
				amount: originTokenAmount,
				valuePerUsd: originTokenValuePerUsd,
			});
		} else {
			setToken({
				...destinationTokenData,
				amount: destinationTokenAmount,
				valuePerUsd: destinationTokenValuePerUsd,
			});
		}

		setInputAmount(originTokenAmount);
	}, []);

	useEffect(() => {
		let amount = inputAmount;

		if (urlParameter == "destinationToken") {
			amount = parseFloat(inputAmount) / originTokenValuePerUsd;
			//amount = amount.toString();
		}

		originCoinValueChange(amount);
	}, [inputAmount]);

	useEffect(() => {
		console.log(
			`tokenValue: ${getTokenValueByUrlParam()} ---- inputAmount ${inputAmount}`
		);
		if (getTokenValueByUrlParam() == inputAmount) return;
		setInputAmount(addCommasToAmount(getTokenValueByUrlParam()));
	}, [getTokenValueByUrlParam()]);

	function getTokenValueByUrlParam() {
		return urlParameter == "originToken"
			? originTokenAmount
			: destinationTokenAmount;
	}

	function originCoinValueChange(amount) {
		if (!amount) return;
		debounce(amountValueNow, amount, 1000, async () => {
			router.query["amount"] = removeCommasFromAmount(amount);
			router.push({
				pathname: "/swap",
				query: router.query,
			});
		});
	}

	function destinationCoinValueChange(amount) {
		debounce(amountValueNow, amount, 1000, async () => {
			router.query["amount"] = removeCommasFromAmount(amount);
			router.push({
				pathname: "/swap",
				query: router.query,
			});
		});
	}

	return (
		<label className="input input-bordered border-fourth flex items-center gap-2 w-full overflow-hidden mt-2 pl-2 pr-2">
			{isLoadingQuote && (
				<span className="loading loading-ring loading-md text-third"></span>
			)}
			<input
				type="text"
				placeholder="AMOUNT"
				className={`grow bg-primary 4 text-xl ${
					isLoadingQuote && "opacity-0"
				} text-secondary`}
				onChange={(e) => {
					if (!/^[0-9,.]*$/.test(e.target.value)) return;
					if (isLoadingQuote) return;
					let amountWithCommas = addCommasToAmount(
						e.target.value,
						token?.decimals
					);
					setInputAmount(amountWithCommas);
				}}
				onBlur={(e) => {
					if (!e.target.value || e.target.value == "0") {
						setInputAmount("1");
					}
				}}
				value={inputAmount}
				//disabled={disable}
			/>
			<div className="flex grow justify-end">
				{showRefreshPrice?.value == true && <RefreshPriceBtn></RefreshPriceBtn>}
				{showQuickBtns && (
					<QuickAmountBtns
						selectedToken={token}
						setAmount={setInputAmount}
						isLoading={isLoadingQuote}
					/>
				)}
			</div>
		</label>
	);
};

export { TokenAmountInput };
