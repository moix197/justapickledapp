import { addCommasToAmount } from "utils/formatAndUpdateAmount";
import AmountInput from "./forms/AmountInput";
import { useEffect, useState } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

function AmountsDisplay({
	maxAmount = 20000,
	isLoading = false,
	originTokenValuePerUsd = false,
	originToken = {
		symbol: "USDC",
		ca: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
		decimals: 6,
	},
	destinationToken = { symbol: "", decimals: null, ca: "" },
	amount,
	setAmount,
	destinationAmount,
	destinationTokenPrice,
}) {
	const isAmountEnough = true;
	const destinationTokenValuePerUsd = 10;

	return (
		<div className="uppercase mt-4 text-center">
			{!isAmountEnough && (
				<div className="text-red-400 font-bold text-sm mb-4">
					You don't have anough tokens for the amount you inputed
				</div>
			)}
			<div className="mb-6">
				<AmountInput
					isLoading={isLoading}
					setParentAmount={setAmount}
					maxAmount={maxAmount}
				></AmountInput>
			</div>
			<div className="flex justify-evenly mb-6 text-secondary text-cemter">
				<div className="grow flex-1">
					<div className="mb-1">
						<div>you send</div>
					</div>
					<div className="mb-2 font-bold">
						<div className="text-lg md:text-3xl text-red-400 ">
							{amount == "" ? 0 : amount}
						</div>
						<div className="text-xs md:text-md text-red-400">{`${originToken?.symbol}`}</div>
						{originToken?.symbol != "USDC" && (
							<div className="font-normal text-xs mt-1">
								<div>
									1{` ${originToken?.symbol} = ${originTokenValuePerUsd} USDC`}
								</div>
							</div>
						)}
					</div>
				</div>
				<div className="flex">
					<ChevronDoubleRightIcon className="w-8 md:w-16 text-yellow-600"></ChevronDoubleRightIcon>
				</div>
				<div className="grow flex-1">
					<div className="mb-1">
						<div>you get</div>
					</div>
					<div className="font-bold">
						<div className="text-lg md:text-3xl text-third">
							{addCommasToAmount(destinationAmount, destinationToken.decimals)}
						</div>
						<div className="text-xs md:text-md  text-third">{`${destinationToken.symbol}`}</div>
						<div className="font-normal text-xs mt-1">
							{destinationToken.symbol != "USDC" && (
								<div>
									1
									{` ${destinationToken.symbol} = ${destinationTokenPrice} USDC`}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AmountsDisplay;
