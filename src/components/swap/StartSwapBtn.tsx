import { useContext } from "react";
import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import { ExecuteSwapTransaction } from "./ExecuteSwapTransaction";
import { BasicButton } from "components/buttons/Basic";
import { WalletDataContext } from "contexts/WalletDataContextProvider";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

function StartSwapBtn({ clickEvent = () => {} }) {
	const [userPublicKey] = useContext(WalletDataContext);
	const { isLoadingTransaction, isLoadingQuote } = useContext(
		TransactionDataContext
	);
	const { setVisible: setModalVisible } = useWalletModal();

	function connectWallet() {
		setModalVisible(true);
	}
	return (
		<div className="w-full">
			{userPublicKey ? (
				<div
					className="mt-4"
					onClick={() => {
						clickEvent();
					}}
				>
					<ExecuteSwapTransaction>
						<BasicButton
							className="p-6 pt-6 pb-6 bg-primary hover:bg-primary hover:text-third"
							isLoading={isLoadingTransaction || isLoadingQuote}
						>
							confirm and swap
						</BasicButton>
					</ExecuteSwapTransaction>
				</div>
			) : (
				<div className="mt-4">
					<div
						onClick={() => {
							connectWallet();
						}}
					>
						<div className="bg-primary text-third border border-third text-center p-6 rounded-lg uppercase font-bold cursor-pointer hover:shadow-third">
							connect wallet
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export { StartSwapBtn };
