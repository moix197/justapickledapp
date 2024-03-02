import { useContext, useEffect } from "react";
import { TokensInAccountContext } from "contexts/TokensInAccountContextProvider";
import { useRouter } from "next/router";

const QuickAmountBtns = ({ selectedToken, isLoading = false }) => {
	const { walletTokenListProcesed } = useContext(TokensInAccountContext);
	const router = useRouter();

	function fireMax(amount) {
		if (isLoading) return;
		router.query["amount"] = amount.toString();
		router.push({
			pathname: "/swap",
			query: router.query,
		});
	}

	function fireHalf(amount) {
		if (isLoading) return;
		let half = amount / 2;
		let stringToCheckAry = half.toString().split(".");

		if (
			stringToCheckAry[1] &&
			stringToCheckAry[1].length > selectedToken.decimals
		) {
			stringToCheckAry[1] = stringToCheckAry[1].slice(
				0,
				selectedToken.decimals
			);
			half = parseFloat(stringToCheckAry.join("."));
		}

		router.query["amount"] = half.toString();
		router.push({
			pathname: "/swap",
			query: router.query,
		});
	}

	return (
		<div className="flex text-secondary  justify-end items-center md:max-w-[100px]">
			{walletTokenListProcesed.length > 0 &&
				walletTokenListProcesed?.map((item) => {
					{
						item.address;
					}
					if (selectedToken?.address == item?.address) {
						return (
							<div
								className="flex"
								key={`quick_amount_btn_${selectedToken?.address}`}
							>
								<div
									onClick={() => {
										fireMax(item?.uiAmountString);
									}}
									className="bg-primary border border-third pl-2 pr-2 rounded-lg mr-2 text-[11px] cursor-pointer hover:shadow-third hover:text-gray-900 hover:bg-third"
								>
									<div>MAX</div>
								</div>
								<div
									onClick={() => {
										fireHalf(item?.uiAmount);
									}}
									className="bg-primary border border-third pl-2 pr-2 rounded-lg text-[11px] cursor-pointer hover:shadow-third hover:text-gray-900 hover:bg-third"
								>
									<div>HALF</div>
								</div>
							</div>
						);
					}
				})}
		</div>
	);
};

export default QuickAmountBtns;
