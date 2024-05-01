import { useContext, useEffect, useState } from "react";
import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import { useRouter } from "next/router";
import { setUrlFromInput } from "utils/setUrlFromInput";
import {
	ExclamationCircleIcon,
	XCircleIcon,
} from "@heroicons/react/24/outline";

const NotiAlert = () => {
	const [isVisible, setIsVisible] = useState(true);
	const { isLoadingQuote } = useContext(TransactionDataContext);
	const router = useRouter();
	const solAddress = "So11111111111111111111111111111111111111112";
	const pickleAddress = "6hQb4SPG9dyMVyaqFeAaMGsnQbcAcNcCtkTm6ED34oC7";

	function goSwapPickle() {
		if (isLoadingQuote) return;
		setUrlFromInput("originToken", { address: solAddress }, router);
		setUrlFromInput(
			"destinationToken",
			{
				address: pickleAddress,
			},
			router
		);
		setIsVisible(false);
	}
	return (
		<div
			role="alert"
			onClick={() => {
				goSwapPickle();
			}}
			className={`alert mt-4 flex relative bg-gray-900 shadow-lg border border-third cursor-pointer hover:opacity-80 mb-6 ${
				!isVisible && "hidden"
			}`}
		>
			<ExclamationCircleIcon className="stroke-third shrink-0 w-10 h-10 text-third"></ExclamationCircleIcon>

			<div className="tracking-wide text-left">
				<div className="font-bold uppercase">
					<h3>Get 12% extra $PICKLE</h3>
				</div>
				<div className="text-xs">
					In swaps from $SOL to $Pickle{" "}
					<span className="text-[10px] text-yellow-600 block md:inline-block">
						Only available for the first 100,000,000 $Pickle swapped
					</span>
				</div>
			</div>
			<div className="absolute top-2 right-2">
				<XCircleIcon
					onClick={() => setIsVisible(false)}
					className="text-red-500 w-5 h-5"
				></XCircleIcon>
			</div>
		</div>
	);
};

export default NotiAlert;
