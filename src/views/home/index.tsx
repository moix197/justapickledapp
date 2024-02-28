// Next, React
import { FC, useEffect, useState } from "react";
import Link from "next/link";

// Wallet
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

// Components
import { RequestAirdrop } from "../../components/RequestAirdrop";
import { SendTransaction } from "../../components/SendTransaction";

// Store
import useUserSOLBalanceStore from "../../stores/useUserSOLBalanceStore";

export const HomeView: FC = ({}) => {
	const wallet = useWallet();
	const { connection } = useConnection();

	const balance = useUserSOLBalanceStore((s) => s.balance);
	const { getUserSOLBalance } = useUserSOLBalanceStore();

	useEffect(() => {
		if (wallet.publicKey) {
			console.log(wallet.publicKey.toBase58());
			getUserSOLBalance(wallet.publicKey, connection);
		}
	}, [wallet.publicKey, connection, getUserSOLBalance]);

	return (
		<div className="md:hero mx-auto p-4 w-full h-full flex justify-center items-center">
			<Link href="/swap">
				<div className="bg-fourth p-8 font-bold rounded-lg cursor-pointer transition-transform hover:scale-105 hover:shadow-third">
					GO TO SWAP
				</div>
			</Link>
		</div>
	);
};
