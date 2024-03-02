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
import TokenTextInput from "./TokenTextInput";
import OriginTokenForm from "./newbie/originTokenForm";
import AmountTokenForm from "./newbie/AmountTokenForm";
import Timeline from "components/swap/newbie/Timeline";

function SwapNewbieSection(props) {
	const router = useRouter();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [activeStage, setActiveStage] = useState(1);
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
	const layouts = [
		<OriginTokenForm
			urlParameter="originToken"
			title="SELECT THE coin you want to swap"
			clickEvent={() => {
				setActiveStage(activeStage + 1);
			}}
		></OriginTokenForm>,
		<OriginTokenForm
			urlParameter="destinationToken"
			title="select the coin you want to get"
			clickEvent={() => {
				setActiveStage(activeStage + 1);
			}}
		></OriginTokenForm>,
		<AmountTokenForm></AmountTokenForm>,
	];

	return (
		<div className="min-h-screen bg-fade bg-no-repeat bg-cover bg-center flex flex-col justify-start items-center max-w-90 pl-2 pr-2 md:pl-10 md:pr-10">
			<div className="w-full flex flex-col justify-center items-center">
				<div className="mt-2 md:mt-8">
					<Timeline
						activeItem={activeStage}
						clickEvent={(item) => {
							setActiveStage(item);
						}}
					></Timeline>
				</div>
			</div>
			<div className="w-[600px] relative max-w-full flex justify-center items-center text-center">
				{layouts[activeStage - 1]}
			</div>
		</div>
	);
}

export default SwapNewbieSection;
