import { useEffect, useState, useContext } from "react";
import { TokenDataContext } from "contexts/TokenDataContextProvider";
import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import TokenList from "components/utils/TokenList";
import TokenTextInput from "components/swap/TokenTextInput";
import { useRouter } from "next/router";
import { setUrlFromInput } from "utils/setUrlFromInput";
import ConfirmationModal from "components/swap/newbie/ConfirmationModal";
import InWalletTokens from "../InWalletTokens";
import ContractAddress from "components/utils/ContractAddress";
import Link from "next/link";
import { GlobeAltIcon } from "@heroicons/react/outline";
import { TokensInAccountContext } from "contexts/TokensInAccountContextProvider";

const ModalTokenData = ({
	tokenData = null,
	isTokenSafe = false,
	isTokenInWallet = false,
	isToken2022 = false,
}) => {
	return (
		<div>
			<div className="mb-6 text-secondary">
				<div className="flex justify-center items-center flex-col tracking-wider mb-2">
					<div className="mb-2">
						<div>You have selected</div>
					</div>
					<div
						className={`flex justify-center w-20 mb-2 rounded-full overflow-hidden ${
							isTokenSafe ? "shadow-third" : "shadow-red"
						}`}
					>
						<img className="w-full" src={tokenData?.logoURI}></img>
					</div>
					<span
						className={`font-bold text-lg ${
							isTokenSafe ? "text-third" : "text-red-400"
						}`}
					>
						{tokenData?.name} ({tokenData?.symbol})
					</span>
				</div>
				<div className="mb-6">
					<div className="mb-1">
						<ContractAddress
							text="Contract:"
							ca={tokenData?.address}
						></ContractAddress>
					</div>
					<div className="mb-2">
						<Link
							href={`https://solscan.io/token/${tokenData?.address}`}
							target="_blank"
						>
							<div className="flex justify-center hover:opacity-50">
								Ver en solscan
								<GlobeAltIcon className="w-4 text-third ml-1"></GlobeAltIcon>
							</div>
						</Link>
					</div>
					<div className="text-secondary text-xs uppercase flex flex-col tracking-wider">
						{isTokenSafe ? (
							<span className="text-xs text-third mb-1">
								This token seems to be safe to buy
							</span>
						) : (
							<span className="text-red-400 mb-1">
								be carefull while swapping this token, it could be unsafe
							</span>
						)}
						{isTokenInWallet && (
							<span className="text-yellow-600 mb-1">
								This token is already in your wallet
							</span>
						)}
						{isToken2022 && (
							<span className="text-yellow-600">
								This token uses the token extensions contract
							</span>
						)}
					</div>
				</div>

				<div className="text-sm uppercase mb-4">
					<span className="text-third font-bold">IMPORTANT:</span>
					<div>
						make sure that the contract matches the one of the token that you
						want to swap
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalTokenData;
