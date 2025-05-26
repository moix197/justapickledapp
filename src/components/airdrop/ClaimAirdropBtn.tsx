import React, { useContext } from "react";
import { BasicButton } from "components/buttons/Basic";
import { WalletDataContext } from "contexts/WalletDataContextProvider";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

interface ClaimAirdropBtnProps {
	clickEvent?: (key: string) => void;
	disable?: boolean;
}

function ClaimAirdropBtn({
	clickEvent = (key: string) => {},
	disable = false,
}: ClaimAirdropBtnProps) {
	const [userPublicKey] = useContext(WalletDataContext);

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
						if (disable) return;
						clickEvent(userPublicKey);
					}}
				>
					<BasicButton className="p-6 pt-6 pb-6 bg-primary hover:bg-primary hover:text-third">
						claim allocation
					</BasicButton>
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

export { ClaimAirdropBtn };
