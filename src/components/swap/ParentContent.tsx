import { useState, useContext, useEffect } from "react";
import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import { ExecuteSwapTransaction } from "components/swap/ExecuteSwapTransaction";
import { BasicButton } from "components/buttons/Basic";

import CoinInput from "components/swap/CoinInput";
import LoadingScreen from "components/utils/LoadingScreen";
import TokenDrawer from "./TokenDrawer";

function SwapParentContent(props) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const {
		originTokenData,
		setOriginTokenData,
		destinationTokenData,
		setDestinationTokenData,
		destinationTokenAmount,
		setDestinationTokenAmount,
		setOriginTokenAmount,
		isLoadingTransaction,
		isLoadingQuote,
	} = useContext(TransactionDataContext);

	function originCoinChange(tokenData, amount) {
		if (amount == 0) return;
		setOriginTokenData({
			...tokenData,
		});
		setOriginTokenAmount(amount);
	}

	function destinationCoinChange(tokenData) {
		setDestinationTokenData(tokenData);
	}

	function openDrawer() {
		setIsDrawerOpen(true);
	}

	return (
		<div className="h-screen bg-fade bg-no-repeat bg-cover bg-center flex justify-center items-center max-w-90 pl-2 pr-2 md:pl-10 md:pr-10">
			<div className="w-[800px] relative max-w-full flex justify-center h-auto flex flex-col">
				{isLoadingTransaction && (
					<LoadingScreen
						title="Check your wallet"
						description="waiting for transaction"
					></LoadingScreen>
				)}
				<div>
					<CoinInput
						initialValue={0}
						initialAmount="1"
						handleChange={(tokenData, amount) =>
							originCoinChange(tokenData, amount)
						}
						isLoading={isLoadingQuote}
						tokenListFirst={true}
						text="you spend"
						showQuickBtns={true}
						token={originTokenData}
						setToken={setOriginTokenData}
						showTokenList={openDrawer}
					></CoinInput>
				</div>

				<div className="divider pt-2  md:pb-6 md:pt-6"></div>
				<div>
					<CoinInput
						initialValue={1}
						//defaultTokenvalue={"6hQb4SPG9dyMVyaqFeAaMGsnQbcAcNcCtkTm6ED34oC7"}
						handleChange={(valuTokenData) =>
							destinationCoinChange(valuTokenData)
						}
						givenAmount={destinationTokenAmount}
						isLoading={isLoadingQuote}
						text="To get"
						disable
						token={destinationTokenData}
						setToken={setDestinationTokenData}
						showTokenList={openDrawer}
					></CoinInput>
				</div>
				<div className="mt-4">
					<ExecuteSwapTransaction>
						<BasicButton isLoading={isLoadingTransaction || isLoadingQuote}>
							swap
						</BasicButton>
					</ExecuteSwapTransaction>
				</div>
			</div>
			<TokenDrawer
				isOpen={isDrawerOpen}
				setIsOpen={setIsDrawerOpen}
				//selectedToken={selectedToken}
				//setSelectedToken={setSelectedToken}
				//setTokenInputText={setTokenInputText}
				isLoading={false}
			></TokenDrawer>
		</div>
	);
}

export default SwapParentContent;
