import { useState, useContext, useRef, useEffect } from "react";
import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import { ExecuteSwapTransaction } from "components/swap/ExecuteSwapTransaction";
import { WalletDataContext } from "contexts/WalletDataContextProvider";
import { BasicButton } from "components/buttons/Basic";
import { SwapInputsBtn } from "components/swap/SwapInputsBtn";
import { useRouter } from "next/router";
import { debounce } from "utils/debounce";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import CoinInput from "components/swap/CoinInput";
import LoadingScreen from "components/utils/LoadingScreen";
import TokenDrawer from "./TokenDrawer";
import { removeCommasFromAmount } from "utils/formatAndUpdateAmount";
import { StartSwapBtn } from "./StartSwapBtn";

function SwapBasicSection() {
	const router = useRouter();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const amountValueNow = useRef(0);
	const [userPublicKey] = useContext(WalletDataContext);
	const {
		originTokenData,
		originTokenAmount,
		destinationTokenData,
		destinationTokenAmount,
		isLoadingTransaction,
		isLoadingQuote,
		setGetNewQuote,
	} = useContext(TransactionDataContext);
	const { setVisible: setModalVisible } = useWalletModal();

	function originCoinChange(tokenData, amount) {
		debounce(amountValueNow, amount, 1000, async () => {
			router.query["amount"] = removeCommasFromAmount(amount);
			router.push({
				pathname: "/swap",
				query: router.query,
			});
		});
	}

	function openDrawer() {
		setIsDrawerOpen(true);
	}

	function connectWallet() {
		setModalVisible(true);
	}

	function swapInputs() {}

	return (
		<div className="min-h-[calc(100vh-69px)] bg-fade bg-no-repeat bg-cover bg-center flex justify-center items-center max-w-90 pl-2 pr-2 md:pl-10 md:pr-10">
			<div className="w-[800px] relative max-w-full flex justify-center flex flex-col">
				{isLoadingTransaction && (
					<LoadingScreen
						title="Check your wallet"
						description="waiting for transaction"
					></LoadingScreen>
				)}

				<div>
					<CoinInput
						handleChange={(tokenData, amount) =>
							originCoinChange(tokenData, amount)
						}
						isLoading={isLoadingQuote}
						tokenListFirst={true}
						text="you spend"
						showQuickBtns={userPublicKey ? true : false}
						token={originTokenData}
						urlAmount={originTokenAmount}
						showTokenList={openDrawer}
						showTokensInWallet={true}
						urlParameter="originToken"
					></CoinInput>
				</div>
				<div className="divider pt-2  md:pb-6 md:pt-6">
					<SwapInputsBtn></SwapInputsBtn>
				</div>
				<div>
					<CoinInput
						handleChange={(valuTokenData) => {}}
						givenAmount={destinationTokenAmount}
						isLoading={isLoadingQuote}
						text="To get"
						disable
						token={destinationTokenData}
						showTokenList={openDrawer}
						urlParameter="destinationToken"
						showTokensInWallet={true}
						showRefreshPrice={{ value: true, getNewQuote: setGetNewQuote }}
					></CoinInput>
				</div>
				<StartSwapBtn></StartSwapBtn>
				<div></div>
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

export default SwapBasicSection;
