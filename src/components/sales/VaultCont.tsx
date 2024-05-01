import StatsContainer from "components/utils/StatsContainer";
import { convertAmountToWords } from "utils/manageValues";

function VaultCont({ vaultData, saleType }) {
	const statsData = [
		{
			title: "For sale",
			value: convertAmountToWords(vaultData?.amount?.initial),
			desc: "",
		},
		{
			title: /*saleType == "presale" ? "Sold" :*/ "Left",
			value: convertAmountToWords(
				/*saleType == "presale"
					? vaultData?.amount?.received
					: */ vaultData?.amount?.left
			),
			desc: "",
		},
		{
			title: "In vault",
			value: convertAmountToWords(vaultData?.amount?.inVault),
			desc: "",
		},
	];
	return <StatsContainer data={statsData} title="Sale vault"></StatsContainer>;
}

export default VaultCont;
