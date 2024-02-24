import { useEffect, useState, useContext } from "react";
import ContractAddress from "components/utils/ContractAddress";

const TokenList = ({
	tokenData = [],
	clickEvent = () => {},
	selectedToken = {},
}) => {
	const [dataContent, setDataContent] = useState([]);
	const [scrolledPage, setScrolledPage] = useState(1);

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
		console.log(scrollTop + " ---- " + scrollHeight + " ---- " + clientHeight);
		let loadWhen = scrollTop + clientHeight + 100;
		if (loadWhen >= scrollHeight) {
			setScrolledPage(scrolledPage + 1);
		}
	}

	return (
		<div
			onScroll={handleScroll}
			className="w-full overflow-y-scroll scrollbar-hide"
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
							<div className="ml-2 font-bold">{element?.symbol}</div>
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
		</div>
	);
};

export default TokenList;
