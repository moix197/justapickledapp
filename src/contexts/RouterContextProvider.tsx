import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { createContext, useState, useEffect } from "react";

const RouterContext = createContext(null);

export default function RouterContainer({ children }) {
	const [originTokenParam, setOriginTokenParam] = useState(null);
	const [destinationTokenParam, setDestinationTokenParam] = useState(null);
	const [amountParam, setAmountParam] = useState(null);
	const [doneOnce, setDoneOnce] = useState(null);
	const newSearchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		if (router.pathname != "/swap") return;
		if (
			newSearchParams.get("originToken") &&
			newSearchParams.get("destinationToken") &&
			newSearchParams.get("amount")
		)
			return;
		router.push({
			pathname: "/swap",
			query: {
				originToken: "So11111111111111111111111111111111111111112",
				destinationToken: "6hQb4SPG9dyMVyaqFeAaMGsnQbcAcNcCtkTm6ED34oC7",
				amount: "1",
			},
		});
	}, []);

	useEffect(() => {
		if (
			!newSearchParams.get("originToken") ||
			!newSearchParams.get("destinationToken") ||
			!newSearchParams.get("amount")
		)
			return;
		if (newSearchParams.get("originToken") !== originTokenParam) {
			setOriginTokenParam(newSearchParams.get("originToken"));
		}

		if (newSearchParams.get("destinationToken") !== destinationTokenParam) {
			setDestinationTokenParam(newSearchParams.get("destinationToken"));
		}

		if (newSearchParams.get("amount") !== amountParam) {
			setAmountParam(newSearchParams.get("amount"));
		}
	}, [newSearchParams]);

	return (
		<RouterContext.Provider
			value={{ originTokenParam, destinationTokenParam, amountParam }}
		>
			{children}
		</RouterContext.Provider>
	);
}

export { RouterContainer, RouterContext };
