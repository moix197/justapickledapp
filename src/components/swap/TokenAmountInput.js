import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import { RefreshPriceBtn } from "components/swap/RefreshPriceBtn";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { debounce } from "utils/debounce";
import { addCommasToAmount } from "utils/formatAndUpdateAmount";
import { removeCommasFromAmount } from "utils/formatAndUpdateAmount";

function TokenAmountInput({
	tokenType = "originToken",
	disabled = false,
	showRefreshPrice = false,
	showQuickBtns = false,
}) {
	const [amount, setAmount] = useState("0");
	const [token, setToken] = useState("0");
	const {
		originTokenData,
		originTokenAmount,
		destinationTokenData,
		destinationTokenAmount,
		isLoadingTransaction,
		isLoadingQuote,
	} = useContext(TransactionDataContext);
	const router = useRouter();
	const amountValueNow = useRef(0);

	useEffect(() => {
		setToken(
			tokenType == "originToken" ? originTokenAmount : destinationTokenAmount
		);
	}, []);

	useEffect(() => {
		originCoinChange();
	}, [amount]);

	useEffect(() => {
		let finalAmount = addCommasToAmount(token);
		setAmount(finalAmount);
	}, [token]);

	function originCoinChange(amount) {
		debounce(amountValueNow, amount, 1000, async () => {
			router.query["amount"] = removeCommasFromAmount(amount);
			router.push({
				pathname: "/swap",
				query: router.query,
			});
		});
	}

	return (
		<label className="input input-bordered border-fourth flex items-end gap-2 w-full overflow-hidden mt-2 pl-2 pr-2">
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
					setAmount(amountWithCommas);
				}}
				onBlur={(e) => {
					if (!e.target.value || e.target.value == "0") {
						setAmount("1");
					}
				}}
				value={amount}
				disabled={disabled}
			/>
			<div className="grow">
				{showRefreshPrice?.value == true && <RefreshPriceBtn></RefreshPriceBtn>}
				{showQuickBtns && (
					<QuickAmountBtns
						selectedToken={token}
						setAmount={setAmount}
						isLoading={isLoadingQuote}
					/>
				)}
			</div>
		</label>
	);
}

export { TokenAmountInput };
