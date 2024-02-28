import { useContext, useEffect, useState } from "react";
import { TokenDataContext } from "contexts/TokenDataContextProvider";
import { RouterContext } from "contexts/RouterContextProvider";

const filterDataFromUrl = () => {
	const [originTokenData, setOriginTokenData] = useState({});
	const [destinationTokenData, setDestinationTokenData] = useState({});
	const { rawTokensData } = useContext(TokenDataContext);
	const { originTokenParam, destinationTokenParam } = useContext(RouterContext);

	useEffect(() => {
		let item = rawTokensData?.find(
			(element) => element.address == originTokenParam
		);
		setOriginTokenData(item);
	}, [originTokenParam]);

	useEffect(() => {
		let item = rawTokensData?.find(
			(element) => element.address == destinationTokenParam
		);
		setDestinationTokenData(item);
	}, [destinationTokenParam]);

	useEffect(() => {
		let item = rawTokensData?.find(
			(element) => element.address == originTokenParam
		);
		setOriginTokenData(item);

		item = rawTokensData?.find(
			(element) => element.address == destinationTokenParam
		);
		setDestinationTokenData(item);
	}, [rawTokensData]);

	return {
		originTokenData,
		destinationTokenData,
	};
};

export { filterDataFromUrl };
