import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { ClaimAirdropBtn } from "components/airdrop/ClaimAirdropBtn";
import { WalletDataContext } from "contexts/WalletDataContextProvider";
import { postClaimAndSignAirdrop } from "services/postClaimAndSignAirdrop";
import { postSendAndConfirmTransaction } from "services/postSendAndConfirmTransaction";
import { notify } from "utils/notifications";
import PickleLoadingAniamtion from "components/utils/PickleLoadingAnimation";
import { connection } from "utils/connection";

interface UserAirdropData {
	wasAirdropped: boolean;
	rewards: {
		available: number;
		locked: number;
		claimed: number;
	};
	isValidWalletAddress: boolean;
}

interface AirdropData {
	fullAmount: number;
	partAmount: number;
}

function ClaimPageContent() {
	const [userPublicKey] = useContext(WalletDataContext);
	const [userAirdropData, setUserAirdropData] = useState<UserAirdropData>({
		wasAirdropped: false,
		rewards: { available: 0, locked: 0, claimed: 0 },
		isValidWalletAddress: false,
	});
	const [airdropData, setAirdropData] = useState<AirdropData>({
		fullAmount: 0,
		partAmount: 0,
	});
	const [isLoadingTransaction, setIsLoadingTransaction] = useState(false);
	const wallet = useWallet();

	useEffect(() => {
		getUserAirdropData();
	}, [userPublicKey]);

	async function getUserAirdropData() {
		if (!userPublicKey) return;
		let url = "/api/airdrop/getUserAirdropData?address=" + userPublicKey;
		let response = await fetch(url);
		let data = await response.json();
		setUserAirdropData(data?.result?.user[0]);
		setAirdropData(data?.result?.airdrop[0]);
	}

	async function claimAllocation() {
		setIsLoadingTransaction(true);
		let signedTransaction = await postClaimAndSignAirdrop(
			userPublicKey,
			wallet,
			connection
		);

		if (signedTransaction?.type === "error") {
			setIsLoadingTransaction(false);
			notify({ ...signedTransaction });
			return;
		}

		let result = await postSendAndConfirmTransaction(
			signedTransaction,
			userPublicKey
		);

		setIsLoadingTransaction(false);
		if (!result?.err && !result?.value?.err && !result.error) {
			notify({
				type: "success",
				message: `Transaction successful!`,
				description: "check your wallet and enjoy your new $Pickle!",
				txid: result?.txid,
			});
			return;
		}

		notify({
			type: "error",
			message: `Transaction couldn't be confirmed`,
			description: "Transaction unsuccessful, please try again",
			txid: result?.txid,
		});
		getUserAirdropData();
	}

	return (
		<div className="relative">
			{isLoadingTransaction && (
				<div className="absolute top-0 left-0 w-full h-full z-40">
					<div className="w-full h-full absolute top-0 height-0 bg-primary opacity-80"></div>
					<PickleLoadingAniamtion
						width={150}
						height={150}
						title="Transaction in progress"
						description="Accept the transaction on your wallet and wait for it to be confirmed on chain"
					/>
				</div>
			)}
			<div>
				<div className="mb-6 uppercase tracking-wide">
					{userAirdropData?.isValidWalletAddress && (
						<div className="text-2xl text-yellow-600 font-bold mb-4">
							<div>
								The time has come to get some{" "}
								<span className="text-third">green</span>
							</div>
						</div>
					)}

					{userAirdropData?.wasAirdropped ? (
						<div>
							you had enough $Pickle available at the time of the airdrop so
							we've already sent the full allocation to your wallet, no need to
							claim.
						</div>
					) : userAirdropData?.isValidWalletAddress ? (
						<div>
							<div>
								You have an allocation of:
								<span className="text-third text-lg font-bold">{` ${airdropData?.fullAmount} $Pickle`}</span>
							</div>
							<div>
								Claimable daily:
								<span className="text-third  text-lg font-bold">
									{` ${airdropData?.partAmount}`}
								</span>
							</div>
							<div className="mt-4">
								<div>
									Available to claim now:
									<span className="text-third  text-lg font-bold">
										{` ${userAirdropData?.rewards?.available} $Pickle`}
									</span>
								</div>
								<div>
									Locked:
									<span className="text-third  text-lg font-bold">
										{` ${userAirdropData?.rewards?.locked} $Pickle`}
									</span>
								</div>
								<div>
									Claimed:
									<span className="text-third  text-lg font-bold">
										{` ${userAirdropData?.rewards?.claimed} $Pickle`}
									</span>
								</div>
							</div>
							<div className="text-[11px] text-red-400">
								<div>
									We had in mind the token 2% tax when assigning the
									allocations.
								</div>
							</div>
						</div>
					) : !userPublicKey ? (
						<div>Connect your wallet</div>
					) : (
						<div>
							<div className="text-red-400 text-lg uppercase font-bold">
								<div>Sorry, you do not have a $pickle allocation</div>
							</div>
							<div>
								make sure that you
								{` `}
								<Link
									className="text-third hover:opacity-50"
									href="https://twitter.com/_justapickle"
									target="_blank"
								>
									follow us on X
								</Link>{" "}
								and{" "}
								<Link
									className="text-third hover:opacity-50"
									href="https://twitter.com/_justapickle"
									target="_blank"
								>
									are part of our discord
								</Link>{" "}
								to be up to date for future airdrops
							</div>
						</div>
					)}
				</div>
				<ClaimAirdropBtn
					clickEvent={() => {
						claimAllocation();
					}}
				/>
			</div>
		</div>
	);
}

export default ClaimPageContent;
