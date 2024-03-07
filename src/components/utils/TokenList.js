import { useEffect, useState } from "react";
import ContractAddress from "components/utils/ContractAddress";

const TokenList = ({
	tokenData = [],
	clickEvent = ({}) => {},
	selectedToken = {},
}) => {
	const [dataContent, setDataContent] = useState([]);
	const [scrolledPage, setScrolledPage] = useState(1);
	const [scroll, setScroll] = useState(0);

	useEffect(() => {
		if (tokenData.length > 25) {
			setDataContent(tokenData.slice(0, 25));
			return;
		}
		setDataContent(tokenData);
	}, [tokenData]);

	useEffect(() => {
		setDataContent(tokenData.slice(0, 25 * scrolledPage));
	}, [scrolledPage]);

	function handleScroll(e) {
		const { scrollTop, scrollHeight, clientHeight } = e.target;
		let loadWhen = scrollTop + clientHeight + 100;

		setScroll(scrollTop);

		if (loadWhen >= scrollHeight) {
			setScrolledPage(scrolledPage + 1);
		}
	}

	return (
		<div
			onScroll={handleScroll}
			className="w-full overflow-y-scroll scrollbar-hide h-full"
		>
			<ul>
				{dataContent.map((element, i) => (
					<li
						key={`token_${i}`}
						className={`${
							element?.name == selectedToken?.name && "hidden"
						} p-3 border-b border-gray-900 hover:border-third cursor-pointer hover:bg-third hover:text-gray-900 flex items-center justify-between relative hover:shadow hover:shadow-third`}
						onClick={() => {
							clickEvent(element);
						}}
					>
						<div className="flex justify-center items-center">
							<div>
								<img
									src={element?.logoURI}
									alt={`${element?.symbol}_icon`}
									className="w-8 object-contain object-center rounded-full"
								></img>
							</div>
							<div className="ml-2 font-bold text-secondary">
								{element?.symbol}
							</div>
						</div>
						<div>
							<ContractAddress
								ca={element?.address}
								text=" "
								disabled
							></ContractAddress>
						</div>
					</li>
				))}
			</ul>
			<div
				className={`absolute top-[calc(100%-16px)]
				text-secondary left-0 text-center w-full bg-gray-800 p-[1px] text-[10px] uppercase ${
					scroll > 1 && "hidden"
				}`}
			>
				scroll to see more
			</div>
		</div>
	);
};

export default TokenList;
