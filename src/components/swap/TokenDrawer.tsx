import { useEffect, useState, useContext } from "react";
import { TokenDataContext } from "contexts/TokenDataContextProvider";
import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import TokenList from "components/utils/TokenList";
import TokenTextInput from "./TokenTextInput";
import { BasicButton } from "components/buttons/Basic";

const TokenDrawer = ({ isOpen = false, setIsOpen, isLoading = false }) => {
	const {
		rawTokensData,
		originTokenFilteredData,
		setOriginTokenFilteredData,
		destinationTokenFilteredData,
		setDestinationTokenFilteredData,
	} = useContext(TokenDataContext);
	const [filteredTokenData, setFilteredTokenData] = useState([]);
	const {
		originTokenData,
		setOriginTokenData,
		destinationTokenData,
		setDestinationTokenData,
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
			className={`fixed top-0 w-full md:w-80 h-screen flex flex-col justify-end bg-primary md:border-l md:border-third ${
				isOpen ? "left-0" : "left-full"
			}`}
		>
			{/*scrollbar-hide*/}
			<TokenList
				tokenData={filteredTokenData}
				selectedToken={drawerSelectedToken}
				clickEvent={(element) => {
					if (isLoading) return;
					activeInput == 1
						? setOriginTokenData(element)
						: setDestinationTokenData(element);
				}}
			></TokenList>
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

					<div className="divider ">TO</div>

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
				</div>
			</div>
			<div
				className="pl-1 pr-1 pb-1 mt-4"
				onClick={() => {
					setIsOpen(false);
				}}
			>
				<BasicButton>Go back</BasicButton>
			</div>
		</div>
	);
};

export default TokenDrawer;
