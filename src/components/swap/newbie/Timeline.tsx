import { useState, useContext, useRef, useEffect } from "react";
import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import { ExecuteSwapTransaction } from "components/swap/ExecuteSwapTransaction";
import { WalletDataContext } from "contexts/WalletDataContextProvider";
import { BasicButton } from "components/buttons/Basic";
import { SwapInputsBtn } from "components/swap/SwapInputsBtn";
import { useRouter } from "next/router";
import { debounce } from "utils/debounce";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import CoinInput from "components/swap/CoinInput";
import LoadingScreen from "components/utils/LoadingScreen";

function Timeline({ activeItem = null, clickEvent = (item) => {} }) {
	const router = useRouter();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [activeStage, setActiveStage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const amountValueNow = useRef(0);
	const [userPublicKey] = useContext(WalletDataContext);
	const {
		originTokenData,
		originTokenAmount,
		destinationTokenData,
		destinationTokenAmount,
		isLoadingTransaction,
		isLoadingQuote,
		setGetNewQuote,
	} = useContext(TransactionDataContext);

	return (
		<div className="tracking-wide mb-4">
			<div className="w-full flex justify-center">
				<div className="text-center max-w-xs text-xs mb-2 uppercase">
					<div>
						interact with the timeline to visit the different transaction stages
					</div>
				</div>
			</div>
			<ul className="timeline">
				<li className="-mr-10 sm:mr-0">
					<div
						className={`min-w-[125px] text-center timeline-start timeline-box  uppercase text-xs sm:text-sm text-red-400 cursor-pointer ${
							activeItem == 1 && "border border-third shadow-third"
						}`}
						onClick={() => {
							if (originTokenData) {
								clickEvent(1);
							}
						}}
					>
						<div>
							<div className="font-bold">
								<span className="text-xs font-normal">send</span>{" "}
								{originTokenData?.symbol}
							</div>
						</div>
					</div>
					<div
						className="timeline-middle cursor-pointer"
						onClick={() => {
							if (originTokenData) {
								clickEvent(1);
							}
						}}
					>
						<div>
							<div
								className={`w-10 rounded-full overflow-hidden ${
									activeItem == 1 && "border border-third shadow-third"
								}`}
							>
								<img src={originTokenData?.logoURI}></img>
							</div>
						</div>
					</div>
					<hr className={`hidden sm:block ${activeItem > 1 && "bg-third"}`} />
				</li>
				<li className="">
					<hr className={`${activeItem > 1 && "bg-third"}`} />
					<div className="timeline-middle cursor-pointer">
						<div>
							<div
								className={`w-10 rounded-full overflow-hidden ${
									activeItem == 2 && "border border-third shadow-third"
								}`}
								onClick={() => {
									if (destinationTokenData) {
										clickEvent(2);
									}
								}}
							>
								<img src={destinationTokenData?.logoURI}></img>
							</div>
						</div>
					</div>
					<div
						className={`min-w-[125px] text-center timeline-end timeline-box  uppercase text-xs sm:text-sm text-third cursor-pointer ${
							activeItem == 2 && "border border-third shadow-third"
						}`}
						onClick={() => {
							if (destinationTokenData) {
								clickEvent(2);
							}
						}}
					>
						<div>
							<div className="font-bold">
								<span className="text-xs font-normal">get</span>{" "}
								{destinationTokenData?.symbol}
							</div>
						</div>
					</div>
					<hr className={`${activeItem > 2 && "bg-third"}`} />
				</li>
				<li className="-ml-10 sm:ml-0 ">
					<hr className={`hidden sm:block ${activeItem > 2 && "bg-third"}`} />
					<div
						className={`timeline-start timeline-box font-bold text-xs sm:text-sm text-yellow-500 cursor-pointer ${
							activeItem == 3 && "border border-third shadow-third"
						}`}
						onClick={() => {
							if (destinationTokenAmount) {
								clickEvent(3);
							}
						}}
					>
						<span className="text-xs font-normal">SET</span> AMOUNT
					</div>
					<div
						className={`timeline-middle cursor-pointer ${
							activeItem == 3 && "text-third"
						}`}
						onClick={() => {
							if (destinationTokenAmount) {
								clickEvent(3);
							}
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="w-10 h-10"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				</li>
			</ul>
		</div>
	);
}

export default Timeline;
