import StatsContainer from "components/utils/StatsContainer";
import { addDecimalPointToNumber } from "utils/manageDecimals";
import { convertAmountToWords } from "utils/manageValues";

function TokenData({ tokenData }) {
	const statsData = [
		{
			title: "Ticker",
			value: tokenData?.metadata?.symbol,
			desc: "",
		},
		{
			title: "Total Supply",
			value: getTotalSupply(),
			desc: "",
		},
		{
			title: "mintable",
			value: tokenData?.ownership?.owner == "" ? "No" : "yes",
			desc: "",
		},
	];

	function getTotalSupply() {
		let supplyWithDecimals = addDecimalPointToNumber(
			tokenData?.info?.supply,
			tokenData?.info?.decimals
		);
		return convertAmountToWords(supplyWithDecimals);
	}

	return <StatsContainer data={statsData} title="Token"></StatsContainer>;
}

export default TokenData;
