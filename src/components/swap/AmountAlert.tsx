import { useContext, useEffect, useState } from "react";
import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import { useRouter } from "next/router";
import { setUrlFromInput } from "utils/setUrlFromInput";
import {
	ExclamationCircleIcon,
	XCircleIcon,
	XIcon,
} from "@heroicons/react/outline";
import { getFinalSwapAmount } from "utils/getFinalSwapAmount";
import { addCommasToAmount } from "utils/formatAndUpdateAmount";
import LoadingCont from "components/utils/LoadingCont";

const AmountAlert = ({ important = false }) => {
	const {
		originTokenData,
		destinationTokenData,
		destinationTokenAmount,
		isLoadingQuote,
	} = useContext(TransactionDataContext);
	const solAddress = "So11111111111111111111111111111111111111112";
	const pickleAddress = "6hQb4SPG9dyMVyaqFeAaMGsnQbcAcNcCtkTm6ED34oC7";

	function getAmount() {
		let amount = getFinalSwapAmount(destinationTokenAmount, true) || 0;
		return addCommasToAmount(amount.toString(), 7);
	}

	function hasBonus() {
		return (
			originTokenData?.address == solAddress &&
			destinationTokenData?.address == pickleAddress
		);
	}

	return (
		hasBonus() && (
			<div className="w-full flex flex-col justify-center items-center text-center text-xs text-secondary mb-4 uppercase tracking-wide">
				<div className="flex justify-center items-center flex-wrap">
					plus 12% bonus{" "}
					<LoadingCont isLoading={isLoadingQuote}>
						<span className="text-yellow-600 text-lg font-bold ml-2">{`${getAmount()} $Pickle`}</span>
					</LoadingCont>
				</div>
				{important && (
					<div className="text-center w-96 max-w-full text-[9px] text-red-400 tracking-wider uppercase">
						important: solana charges a 0.00216 fee for creating a new token
						account so if you never had $PICKLE before you'll see that amount
						reflected in the transaction
					</div>
				)}
			</div>
		)
	);
};

export default AmountAlert;
