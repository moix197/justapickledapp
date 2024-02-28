import { useEffect, useState, useContext } from "react";
import { TokenDataContext } from "contexts/TokenDataContextProvider";
import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import TokenList from "components/utils/TokenList";
import TokenTextInput from "./TokenTextInput";
import { useRouter } from "next/router";
import { addCommasToAmount } from "utils/formatAndUpdateAmount";
import { setUrlFromInput } from "utils/setUrlFromInput";

const TokenDrawer = ({ isOpen = false, setIsOpen, isLoading = false }) => {
	const router = useRouter();
	const { rawTokensData } = useContext(TokenDataContext);
	const [filteredTokenData, setFilteredTokenData] = useState([]);
	const {
		originTokenData,
		originTokenAmount,
		destinationTokenData,
		destinationTokenAmount,
	} = useContext(TransactionDataContext);
	const [activeInput, setActiveInput] = useState(1);
	const [drawerSelectedToken, setDrawerSelectedToken] = useState(1);

	useEffect(() => {
		setFilteredTokenData(rawTokensData);
	}, [rawTokensData]);

	function resetTokenData() {
		if (filteredTokenData.length == rawTokensData.length) return;
		setFilteredTokenData(rawTokensData);
	}

	return (
		<div
			className={`absolute w-full h-screen top-0 left-0 ${
				!isOpen && "pointer-events-none"
			}`}
		>
			<div
				onClick={() => {
					setIsOpen(false);
				}}
				className={`absolute w-full h-screen top-0 left-0 bg-primary transition-opacity ${
					!isOpen ? "opacity-0" : "opacity-50"
				}`}
			></div>
			<div
				className={`fixed top-0 w-full md:w-80 h-screen flex flex-col justify-start bg-primary left-full transition-transform md:border-l md:border-third ${
					isOpen && "-translate-x-full"
				}`}
			>
				<div className="pb-2 pl-1 pr-1">
					<div className="text-[11px] mb-2 mt-2 text-center uppercase">
						<div>write into the inputs to filter the tokens</div>
					</div>
					<div>
						<div className="mb-2">
							<TokenTextInput
								focusEvent={() => {
									resetTokenData();
									setActiveInput(1);
									setDrawerSelectedToken(originTokenData);
								}}
								selectedToken={originTokenData}
								filterData={{
									value: true,
									data: rawTokensData,
									setFilteredDataFunction: setFilteredTokenData,
								}}
							></TokenTextInput>
						</div>

						<div className="divider">TO</div>

						<div>
							<TokenTextInput
								selectedToken={destinationTokenData}
								focusEvent={() => {
									resetTokenData();
									setActiveInput(2);
									setDrawerSelectedToken(destinationTokenData);
								}}
								filterData={{
									value: true,
									data: rawTokensData,
									setFilteredDataFunction: setFilteredTokenData,
								}}
							></TokenTextInput>
						</div>
						<div>
							<div className="text-center text-xs pt-2">
								{`You're swapping ${addCommasToAmount(originTokenAmount)} ${
									originTokenData?.name
								} FOR ${addCommasToAmount(destinationTokenAmount)} ${
									destinationTokenData?.name
								}`}
							</div>
						</div>
					</div>
				</div>
				<TokenList
					tokenData={filteredTokenData}
					selectedToken={drawerSelectedToken}
					clickEvent={(item) => {
						if (isLoading) return;
						if (activeInput == 1) {
							setUrlFromInput("originToken", item, router);
						} else {
							setUrlFromInput("destinationToken", item, router);
						}
					}}
				></TokenList>

				<div
					className={`hover:shadow-third flex justify-center items-center cursor-pointer bg-third border 
					border-primary rounded-full absolute bottom-2 right-2 w-14 h-14 z-20  ${
						isOpen && "md:right-[330px] transition-all"
					}`}
					onClick={() => {
						setIsOpen(false);
					}}
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
							d="M6 18 18 6M6 6l12 12"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default TokenDrawer;
