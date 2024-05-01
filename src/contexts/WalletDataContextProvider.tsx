"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { createContext, useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const WalletDataContext = createContext(null);

export default function WalletDataContainer({ children }) {
	const { data: session, status } = useSession();
	const [userPublicKey, setuserPublicKey] = useState(null);
	const { publicKey } = useWallet();
	const wallet = useWallet();
	const router = useRouter();

	useEffect(() => {
		setuserPublicKey(publicKey);
	}, [publicKey]);

	useEffect(() => {
		if (!wallet.connected && status === "authenticated") {
			const logOut = async () => {
				const data = await signOut({ redirect: false, callbackUrl: "/login" });
				router.route.split("/")[1] == "dashboard" && router.push(data.url);
			};
			logOut();
		}
	}, [wallet.connected]);

	useEffect(() => {
		if (
			status === "authenticated" &&
			session?.user?.name != publicKey?.toString()
		) {
			const logOut = async () => {
				const data = await signOut({ redirect: false, callbackUrl: "/login" });
				router.route.split("/")[1] == "dashboard" && router.push(data.url);
			};
			logOut();
		}
	}, [wallet]);

	return (
		<WalletDataContext.Provider value={[userPublicKey]}>
			{children}
		</WalletDataContext.Provider>
	);
}

export { WalletDataContainer, WalletDataContext };
