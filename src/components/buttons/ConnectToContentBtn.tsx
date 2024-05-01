import { useContext } from "react";
import { BasicButton } from "components/buttons/Basic";
import { WalletDataContext } from "contexts/WalletDataContextProvider";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

function ConnectToContentBtn({ children, clickEvent = null, ctaText = null }) {
	const [userPublicKey] = useContext(WalletDataContext);
	const { setVisible: setModalVisible } = useWalletModal();

	function connectWallet() {
		setModalVisible(true);
	}

	return (
		<div className="w-full">
			{userPublicKey ? (
				<div>
					{children}
					<div
						className="mt-4"
						onClick={() => {
							clickEvent && clickEvent(userPublicKey);
						}}
					>
						<BasicButton className="p-6 pt-6 pb-6 bg-primary hover:bg-primary hover:text-third">
							{ctaText}
						</BasicButton>
					</div>
				</div>
			) : (
				<div className="mt-4">
					<div
						onClick={() => {
							connectWallet();
						}}
					>
						<BasicButton>connect wallet</BasicButton>
					</div>
				</div>
			)}
		</div>
	);
}

export default ConnectToContentBtn;
