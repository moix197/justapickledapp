import { createContext, useState, useEffect } from "react";
import { getAllTokens } from "services/getAllTokens";

const TokenDataContext = createContext(null);

export default function TokenDataContainer({ children }) {
	const [rawTokensData, setTokensRawData] = useState([]);
	const [originTokenFilteredData, setOriginTokenFilteredData] = useState([]);
	const [destinationTokenFilteredData, setDestinationTokenFilteredData] =
		useState([]);
	const tokenData = {
		rawTokensData,
		setTokensRawData,
		originTokenFilteredData,
		setOriginTokenFilteredData,
		destinationTokenFilteredData,
		setDestinationTokenFilteredData,
	};

	useEffect(() => {
		const fetchData = async () => {
			let tokensData = await getAllTokens();
			setTokensRawData(tokensData);
		};
		fetchData(); // Call the fetchData function here
	}, []);

	return (
		<TokenDataContext.Provider value={tokenData}>
			{children}
		</TokenDataContext.Provider>
	);
}

export { TokenDataContainer, TokenDataContext };
