import { useSession } from "next-auth/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEffect } from "react";
import { handleSignIn } from "utils/auth/HandleSignIn";

function SigninUsers() {
	const { data: session, status } = useSession();
	const wallet = useWallet();
	const { setVisible: setModalVisible } = useWalletModal();

	useEffect(() => {
		if (wallet.connected && status === "unauthenticated") {
			handleSignIn(wallet, setModalVisible);
		}
	}, []);

	useEffect(() => {
		if (wallet.connected && status === "unauthenticated") {
			setModalVisible(false);
			handleSignIn(wallet, setModalVisible);
		}
	}, [wallet.connected]);

	return <div></div>;
}

export default SigninUsers;
