import { FC } from "react";
import Link from "next/link";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LogoBg } from "./brand/Logo";

export const AppBar: FC = (props) => {
	return (
		<div>
			{/* NavBar / Header */}
			<div className="navbar pt-1 pb-1 md:pt-2 md-pb-2 flex flex-row shadow-lg text-neutral-content border-b border-fourth">
				<div className="navbar-start">
					<div className=" w-22 h-22 p-2 flex justify-center align-center">
						<LogoBg width={40} height={40}></LogoBg>
					</div>
				</div>

				{/* Nav Links */}
				<div className="hidden md:inline md:navbar-center">
					<div className="flex items-stretch">
						<div className="text-center text-lg font-bold">
							<h1>PICKLE SWAP</h1>
						</div>
					</div>
				</div>

				{/* Wallet & Settings */}
				<div className="navbar-end">
					<WalletMultiButton />
				</div>
			</div>
			{props.children}
		</div>
	);
};
