import { useContext, useEffect } from "react";
import { TokensInAccountContext } from "contexts/TokensInAccountContextProvider";
import { useRouter } from "next/router";

const QuickAmountBtns = ({ selectedToken, setAmount, isLoading = false }) => {
	const { walletTokenListRaw } = useContext(TokensInAccountContext);
	const router = useRouter();

	function fireMax(amount) {
		if (isLoading) return;
		//setAmount(amount);
		router.query["amount"] = amount.toString();
		router.push({
			pathname: "/swap",
			query: router.query,
		});
	}

	function fireHalf(amount) {
		if (isLoading) return;
		let half = amount / 2;
		router.query["amount"] = half.toString();
		router.push({
			pathname: "/swap",
			query: router.query,
		});
	}

	return (
		<div className="w-full flex text-secondary  justify-end items-center">
			{walletTokenListRaw &&
				walletTokenListRaw?.value.map((item) => {
					if (
						selectedToken?.address == item?.account?.data?.parsed?.info?.mint
					) {
						return (
							<div className="flex">
								<div
									onClick={() => {
										fireMax(
											item?.account?.data?.parsed?.info?.tokenAmount
												?.uiAmountString
										);
									}}
									className="bg-primary border border-third pl-2 pr-2 rounded-lg mr-2 text-[11px] cursor-pointer hover:shadow-third hover:text-gray-900 hover:bg-third"
								>
									<div>MAX</div>
								</div>
								<div
									onClick={() => {
										fireHalf(
											item?.account?.data?.parsed?.info?.tokenAmount?.uiAmount
										);
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
