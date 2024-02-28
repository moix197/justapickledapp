import { useContext, useEffect, useState } from "react";
import { RouterContext } from "contexts/RouterContextProvider";

const getDestinationTokenAmount = () => {
	const [originTokenAmount, setOriginTokenAmount] = useState("");
	const { amountParam } = useContext(RouterContext);

	useEffect(() => {
		setOriginTokenAmount(amountParam);
	}, []);

	useEffect(() => {
		setOriginTokenAmount(amountParam);
	}, [amountParam]);

	return {
		originTokenAmount,
	};
};

export { getDestinationTokenAmount };
