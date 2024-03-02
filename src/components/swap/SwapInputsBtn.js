import { useContext } from "react";
import { TransactionDataContext } from "contexts/TransactionDataContextProvider";
import { useRouter } from "next/router";

function SwapInputsBtn(props) {
	const router = useRouter();
	const { destinationTokenAmount } = useContext(TransactionDataContext);

	function swapInputs() {
		let destinationToken = router.query["destinationToken"];
		router.query["destinationToken"] = router.query["originToken"];
		router.query["originToken"] = destinationToken;
		router.query["amount"] = destinationTokenAmount;

		if (!destinationTokenAmount) return;
		router.push({
			pathname: "/swap",
			query: router.query,
		});
	}

	return (
		<div
			onClick={() => {
				swapInputs();
			}}
			className="cursor-pointer text-third transition-all hover:scale-150"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-6 h-6"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
				/>
			</svg>
		</div>
	);
}

export { SwapInputsBtn };
