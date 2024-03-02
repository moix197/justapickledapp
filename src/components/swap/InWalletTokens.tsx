import { useContext } from "react";
import { TokensInAccountContext } from "contexts/TokensInAccountContextProvider";

const InWalletTokens = ({ clickEvent, title = "", limit = 5 }) => {
	const { walletTokenListProcesed } = useContext(TokensInAccountContext);
	return (
		<div className="w-full flex flex-col items-center sm:items-end">
			{title && walletTokenListProcesed.length > 0 && (
				<div className="text-xs mb-2 mt-2 text-center uppercase text-secondary">
					<div>{title}</div>
				</div>
			)}
			<ul className="w-auto flex justify-center items-start flex-wrap">
				{walletTokenListProcesed &&
					walletTokenListProcesed.map((item, i) => {
						if (i > limit) return;
						return (
							<li
								onClick={() => {
									clickEvent(item);
								}}
								className="pl-2 pr-2 pt-1 pb-1 mb-2 mr-2 bg-fourth border border-fourth rounded-lg text-[11px] uppercase cursor-pointer 
                                hover:shadow-third hover:bg-secondary hover:text-fourth
								md:text-xs
								md:p-2
								"
								key={`quick_btn_${item.symbol}`}
							>
								<div>{item.symbol}</div>
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default InWalletTokens;
