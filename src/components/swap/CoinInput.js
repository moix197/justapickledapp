import { useEffect, useState, useContext } from "react";
import QuickAmountBtns from "./QuickAmountBtns";
import { TokenDataContext } from "contexts/TokenDataContextProvider";
import { BasicButton } from "components/buttons/Basic";
import TokenList from "components/utils/TokenList";
import TokenTextInput from "./TokenTextInput";
import { useRouter } from "next/router";
import { addCommasToAmount } from "utils/formatAndUpdateAmount";
import InWalletTokens from "./InWalletTokens";
import { setUrlFromInput } from "utils/setUrlFromInput";
import { RefreshPriceBtn } from "./RefreshPriceBtn";
import { TokenAmountInput } from "components/swap/inputs/tokenAmountInput";

const CoinInput = ({
	handleChange,
	disable = false,
	givenAmount = "0",
	isLoading = false,
	tokenListFirst = false,
	showQuickBtns = false,
	text,
	token,
	urlAmount = false,
	showRefreshPrice = { value: false, getNewQuote: () => {} },
	urlParameter,
	showTokensInWallet = false,
	usdcValue = false,
	tokenValuePerUsdc = false,
	showTokenList = () => {},
}) => {
	const router = useRouter();
	const { rawTokensData } = useContext(TokenDataContext);
	const [tokensData, setTokensData] = useState([]);
	const [filteredTokenData, setFilteredTokenData] = useState([]);
	const [selectedToken, setSelectedToken] = useState({ name: "", symbol: "" });
	const [amount, setAmount] = useState("0");

	useEffect(() => {
		let finalAmount = givenAmount
			? addCommasToAmount(givenAmount, token?.decimals)
			: addCommasToAmount(amount, token?.decimals);
		setAmount(finalAmount);
	}, [givenAmount]);

	useEffect(() => {
		handleChange(selectedToken, amount);
	}, [amount]);

	useEffect(() => {
		if (rawTokensData.length > 0) {
			setInitialData();
			setFilteredTokenData(rawTokensData);
		}
	}, [rawTokensData]);

	useEffect(() => {
		if (!urlAmount) return;
		let finalAmount = addCommasToAmount(urlAmount, token?.decimals);
		setAmount(finalAmount);
	}, [urlAmount]);

	async function setInitialData() {
		setTokensData(rawTokensData.slice(0, 25));
	}

	return (
		<div className="w-full flex flex-col md:flex-row">
			<div
				className={`w-full flex flex-col items-end justify-end md:w-4/6 ${
					tokenListFirst ? "md:pl-5" : "md:pr-5"
				}`}
			>
				<div className="w-full text-lg text-center uppercase mb-2 text-secondary">
					{text}
				</div>
				{showTokensInWallet && (
					<InWalletTokens
						clickEvent={(item) => {
							if (isLoading) return;
							setUrlFromInput(urlParameter, item, router);
						}}
					></InWalletTokens>
				)}

				{tokenValuePerUsdc && (
					<div className="text-xs mb-2 w-full flex justify-center md:justify-end text-secondary">
						<div>1 {`${token?.symbol} = ${tokenValuePerUsdc}`} USDC</div>
					</div>
				)}
				<div className="w-full">
					<div>
						<TokenTextInput
							selectedToken={token}
							filterData={{
								value: true,
								data: rawTokensData,
								setFilteredDataFunction: setTokensData,
								setFilteredDataFunction: setFilteredTokenData,
							}}
							setSelectedTokenAfterFilter={{
								value: true,
								//setSelectedFunction: setToken,
								setSelectedFunction: (item) => {
									setUrlFromInput(urlParameter, item, router);
								},
							}}
						></TokenTextInput>
					</div>
				</div>
				{/*<TokenAmountInput urlParameter={urlParameter}></TokenAmountInput>
				 */}
				<label className="input input-bordered border-fourth flex items-center gap-2 w-full overflow-hidden mt-2 pl-2 pr-2">
					{isLoading && (
						<span className="loading loading-ring loading-md text-third"></span>
					)}
					<input
						type="text"
						placeholder="AMOUNT"
						className={`grow bg-primary 4 text-xl ${
							isLoading && "opacity-0"
						} text-secondary`}
						onChange={(e) => {
							if (!/^[0-9,.]*$/.test(e.target.value)) return;
							if (isLoading) return;
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
						disabled={disable}
					/>
					<div className="flex grow justify-end">
						{showRefreshPrice?.value == true && (
							<RefreshPriceBtn></RefreshPriceBtn>
						)}
						{showQuickBtns && (
							<QuickAmountBtns
								selectedToken={token}
								setAmount={setAmount}
								isLoading={isLoading}
							/>
						)}
					</div>
				</label>
			</div>
			<div
				className={`w-full md:w-2/6 flex w-full relative flex-col justify-end relative order-last flex mt-2 md:mt-0 ${
					tokenListFirst && "md:order-first"
				}`}
			>
				<div className="relative  w-full">
					<div className="w-full flex grow text-md font-bold  relative mb-0 md:mb-2">
						<div className="w-6/12 bg-fourth p-2 flex justify-center items-center mr-2 rounded-lg">
							<div className="pr-2 ">
								<img
									className="w-7 object-contain object-center rounded-full"
									src={token?.logoURI}
								></img>
							</div>
							<div className="flex justify-center items-start flex-col">
								<div className="text-secondary">{token?.symbol}</div>
								<div className="text-[10px] text-gray-400 text-bold ">
									SELECTED
								</div>
							</div>
						</div>
						<div className="w-6/12">
							<div onClick={() => showTokenList(true)}>
								<BasicButton className="text-sm">see token list</BasicButton>
							</div>
						</div>
					</div>
					<div className="h-[106px] md:flex relative  hidden md:block">
						<TokenList
							tokenData={filteredTokenData}
							selectedToken={token}
							clickEvent={(item) => {
								if (isLoading) return;
								setUrlFromInput(urlParameter, item, router);
							}}
						></TokenList>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CoinInput;
