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
			<div className="md:hero-content flex flex-col">
				<h1 className="text-center text-5xl md:font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
					Pickle Swap
				</h1>

				<div className="text-center">
					<RequestAirdrop />
					{wallet.publicKey && <p>Public Key: {wallet.publicKey.toBase58()}</p>}
					{wallet && <p>SOL Balance: {(balance || 0).toLocaleString()}</p>}
					<SendTransaction />
				</div>
			</div>
		</div>
	);
};
