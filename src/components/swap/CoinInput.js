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

const CoinInput = ({
	handleChange,
	disable = false,
	givenAmount = 0,
	isLoading = false,
	tokenListFirst = false,
	showQuickBtns = false,
	text,
	token,
	urlAmount = false,
	showRefreshPrice = { value: false, getNewQuote: () => {} },
	urlParameter,
	showTokensInWallet = false,
	showTokenList = () => {},
}) => {
	const router = useRouter();
	const { rawTokensData } = useContext(TokenDataContext);
	const [tokensData, setTokensData] = useState([]);
	const [selectedToken, setSelectedToken] = useState({ name: "", symbol: "" });
	const [tokenInputText, setTokenInputText] = useState("");
	const [amount, setAmount] = useState("");

	useEffect(() => {
		handleChange(selectedToken, amount);
	}, [selectedToken]);

	useEffect(() => {
		handleChange(selectedToken, amount);
	}, [amount]);

	useEffect(() => {
		if (rawTokensData.length > 0) {
			setInitialData();
		}
	}, [rawTokensData]);

	useEffect(() => {
		setAmount(urlAmount);
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
				<div className="w-full text-lg text-center uppercase mb-2">{text}</div>
				{showTokensInWallet && (
					<InWalletTokens
						clickEvent={(item) => {
							if (isLoading) return;
							setUrlFromInput(urlParameter, item, router);
						}}
					></InWalletTokens>
				)}
				<div className="w-full">
					<div>
						<TokenTextInput
							selectedToken={token}
							filterData={{
								value: true,
								data: rawTokensData,
								setFilteredDataFunction: setTokensData,
								//setFilteredDataFunction: () => {},
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
				<label className="input input-bordered border-fourth flex items-center gap-2 w-full overflow-hidden mt-2 pl-2 pr-2">
					{isLoading && (
						<span className="loading loading-ring loading-md text-third"></span>
					)}
					<input
						type="text"
						placeholder="AMOUNT"
						className={`grow bg-primary 4 text-xl ${isLoading && "opacity-0"}`}
						onChange={(e) => {
							if (!/^[0-9,.]*$/.test(e.target.value)) return;
							if (isLoading) return;
							let amountWithCommas = addCommasToAmount(e.target.value);
							setAmount(amountWithCommas);
						}}
						onBlur={(e) => {
							if (!e.target.value || e.target.value == "0") {
								setAmount("1");
							}
						}}
						value={
							givenAmount
								? addCommasToAmount(givenAmount)
								: addCommasToAmount(amount)
						}
						disabled={disable}
					/>
					{showRefreshPrice?.value == true && (
						<div
							onClick={() => {
								showRefreshPrice.getNewQuote(true);
							}}
							className="cursor-pointer text-third hover:animate-spin "
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
								/>
							</svg>
						</div>
					)}
					{showQuickBtns && (
						<QuickAmountBtns
							selectedToken={token}
							setAmount={setAmount}
							isLoading={isLoading}
						/>
					)}
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
								<div>{token?.symbol}</div>
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
							tokenData={tokensData}
							selectedToken={token}
							clickEvent={(item) => {
								if (isLoading) return;
								setUrlFromInput(urlParameter, item, router);
							}}
						></TokenList>
					</div>
				</div>
				<div className="hidden md:block top-full left-0 text-center w-full bg-gray-800 p-1 text-[11px] uppercase">
					scroll to see more
				</div>
			</div>
		</div>
	);
};

export default CoinInput;
