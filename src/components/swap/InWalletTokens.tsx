import { useContext } from "react";
import { TokensInAccountContext } from "contexts/TokensInAccountContextProvider";

const InWalletTokens = ({ clickEvent }) => {
	const { walletTokenListProcesed } = useContext(TokensInAccountContext);
	return (
		<div className="w-full flex text-secondary  justify-end items-center">
			<ul className="w-full flex justify-start items-start">
				{walletTokenListProcesed &&
					walletTokenListProcesed.map((item, i) => {
						if (i > 5) return;
						return (
							<li
								onClick={() => {
									clickEvent(item);
								}}
								className="pl-2 pr-2 pt-1 pb-1 mb-2 mr-2 bg-fourth border border-fourth rounded-lg text-[11px]  uppercase cursor-pointer 
                                hover:shadow-third hover:bg-secondary hover:text-fourth
								md:text-xs
								md:p-2
								"
								key={`quick_btn_${item.symbol}`}
							>
								{item.symbol}
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default InWalletTokens;
