import React, { useContext, useEffect, useState } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { BasicButton } from "components/buttons/Basic";
import { WalletDataContext } from "contexts/WalletDataContextProvider";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { handleSignIn } from "utils/auth/HandleSignIn";

interface ConnectToLinkBtnProps {
	clickEvent?: () => void;
	text?: string;
	secondBtnTxt?: string;
	href: string;
}

function ConnectToLinkBtn({
	clickEvent = () => {},
	text = "",
	secondBtnTxt = "Go to dashboard",
	href,
}: ConnectToLinkBtnProps) {
	const [userPublicKey] = useContext(WalletDataContext);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [indicationText, setIndicationText] = useState<string>("");
	const [btnText, setBtnText] = useState<string>("");
	const { setVisible: setModalVisible } = useWalletModal();
	const { status } = useSession();
	const wallet = useWallet();

	useEffect(() => {
		if (!wallet.connected && status != "authenticated") {
			setIndicationText("Connect your wallet");
			setBtnText("connect wallet");
		} else if (wallet.connected && status != "authenticated") {
			setIndicationText(
				"Sign the message on your wallet app to access the dashboard"
			);
			setBtnText("sign message");
		}
	}, [status, wallet.connected]);

	function connectWallet() {
		if (!userPublicKey || status != "authenticated") {
			handleSignIn(wallet, setModalVisible);
		}
	}

	return (
		<div>
			<div className="w-full">
				<div className="uppercase text-lg font-bold text-secondary">
					<div>{indicationText}</div>
				</div>
				{status == "authenticated" ? (
					<div
						className="mt-4"
						onClick={() => {
							clickEvent();
						}}
					>
						<Link href={href}>
							<BasicButton className="p-6 pt-6 pb-6 bg-primary hover:bg-primary hover:text-third">
								{secondBtnTxt && secondBtnTxt}
							</BasicButton>
						</Link>
					</div>
				) : (
					<div className="mt-4">
						<div
							onClick={() => {
								connectWallet();
							}}
						>
							<BasicButton
								isLoading={status == "loading"}
								className="bg-primary"
							>
								{btnText}
							</BasicButton>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default ConnectToLinkBtn;
