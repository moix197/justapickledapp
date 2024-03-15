import { useWallet } from "@solana/wallet-adapter-react";
import { createContext, useState, useEffect } from "react";

const WalletDataContext = createContext(null);

export default function WalletDataContainer({ children }) {
	const [userPublicKey, setuserPublicKey] = useState(null);
	const { publicKey } = useWallet();
	const { wallet } = useWallet();

	useEffect(() => {
		console.log(wallet);
		setuserPublicKey(publicKey);
	}, [publicKey]);

	return (
		<WalletDataContext.Provider value={[userPublicKey]}>
			{children}
		</WalletDataContext.Provider>
	);
}

export { WalletDataContainer, WalletDataContext };
