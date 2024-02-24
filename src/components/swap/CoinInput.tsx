import { useEffect, useState, useContext } from "react";
import QuickAmountBtns from "./QuickAmountBtns";
import { TokenDataContext } from "contexts/TokenDataContextProvider";
import { BasicButton } from "components/buttons/Basic";
import TokenList from "components/utils/TokenList";
import TokenTextInput from "./TokenTextInput";

const CoinInput = ({
	initialValue,
	handleChange,
	disable = false,
	givenAmount = 0,
	initialAmount = "",
	isLoading = false,
	defaultTokenvalue = null,
	tokenListFirst = false,
	showQuickBtns = false,
	text,
	token,
	setToken,
	showTokenList = () => {},
}) => {
	const { rawTokensData } = useContext(TokenDataContext);
	const [tokensData, setTokensData] = useState([]);
	const [selectedToken, setSelectedToken] = useState({ name: "", symbold: "" });
	const [tokenInputText, setTokenInputText] = useState("");
	const [amount, setAmount] = useState("");

	useEffect(() => {
		handleChange(selectedToken, amount);
	}, [selectedToken]);

	useEffect(() => {
		if (givenAmount) return;
		handleChange(selectedToken, amount);
	}, [amount]);

	useEffect(() => {
		if (rawTokensData.length > 0) {
			setInitialData();
		}
	}, [rawTokensData]);

	async function setInitialData() {
		if (defaultTokenvalue) {
			//filterTokens(defaultTokenvalue, true);
		} else {
			setSelectedToken(rawTokensData[initialValue]);
			setTokenInputText(rawTokensData[initialValue]?.name);
		}
		setTokensData(rawTokensData.slice(0, 25));

		if (initialAmount) {
			setAmount(initialAmount);
		}
	}

	/*function filterTokens(textValue, setName = false) {
		let itemsInList = 0;
		let filteredData = rawTokensData.filter((item, i) => {
			if (itemsInList > 20) return false;
			if (item.address == textValue) {
				itemsInList++;
				return true;
			} else if (
				typeof textValue == "string" &&
				item.symbol.toUpperCase().includes(textValue.toUpperCase())
			) {
				itemsInList++;
				return true;
			}
		});
		if (filteredData[0]) {
			setSelectedToken(filteredData[0]);
		} else {
			setSelectedToken(selectedToken);
		}
		setTokensData(filteredData);
		if (filteredData.length == 1) setTokensData(rawTokensData.slice(0, 25));

		if (setName) setTokenInputText(filteredData[0]?.name);
	}*/

	function formatAndUpdateAmount(value) {
		if (/^[0-9,.]*$/.test(value)) {
			// Remove commas
			const cleanValue = value.replace(/\,/g, "");

			// Split into integer and fractional parts
			const [integerPart, fractionalPart] = cleanValue.split(".");

			// Format the integer part
			const formattedIntegerPart = integerPart.replace(
				/\B(?=(\d{3})+(?!\d))/g,
				","
			);

			// Combine integer and fractional parts with a dot
			const formattedValue =
				fractionalPart !== undefined
					? `${formattedIntegerPart}.${fractionalPart}`
					: formattedIntegerPart;

			// Set the state
			return formattedValue;
		}
	}

	return (
		<div className="w-full flex flex-col md:flex-row">
			<div
				className={`w-full flex flex-col items-end justify-end md:w-4/6 ${
					tokenListFirst ? "md:pl-5" : "md:pr-5"
				}`}
			>
				<div className="w-full text-lg text-center uppercase mb-2">{text}</div>
				<div className="w-full">
					<div>
						<TokenTextInput
							selectedToken={token}
							filterData={{
								value: true,
								data: rawTokensData,
								setFilteredDataFunction: setTokensData,
							}}
							setSelectedTokenAfterFilter={{
								value: true,
								setSelectedFunction: setToken,
							}}
						></TokenTextInput>
						{/*
							<label className="input input-bordered border-fourth flex items-center gap-2 w-full pl-2 pr-2">
								<input
									type="text"
									className="grow bg-primary 4 tracking-wide"
									onChange={(e) => {
										if (isLoading) return;
										setTokenInputText(e.target.value);
										filterTokens(e.target.value);
									}}
									onBlur={(e) => {
										if (isLoading) return;
										setTokenInputText(selectedToken.name);
									}}
									value={tokenInputText ? tokenInputText : ""}
								/>
								<ContractAddress ca={selectedToken?.address}></ContractAddress>
							</label>
								*/}
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
							let esto = formatAndUpdateAmount(e.target.value);
							setAmount(esto);
						}}
						onBlur={(e) => {
							if (!e.target.value || e.target.value == "0") {
								setAmount("1");
							}
						}}
						value={
							givenAmount
								? formatAndUpdateAmount(givenAmount)
								: formatAndUpdateAmount(amount)
						}
						disabled={disable}
					/>
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
								<div className="text-[10px] text-primary ">SELECTED</div>
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
							clickEvent={(element) => {
								if (isLoading) return;
								setSelectedToken(element);
								setTokenInputText(element?.name);
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
