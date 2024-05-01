import StatsContainer from "components/utils/StatsContainer";

function GeneralData({ saleData }) {
	const statsData = [
		{
			title: "Claim type",
			value:
				saleData.redeem == "caimableAirdrop"
					? "Claimable airdrop"
					: saleData.redeem,
			desc: "",
		},
		{
			title: "Sale Type",
			value: saleData.target,
			desc: "",
		},
		{
			title: "Users",
			value: saleData.usersQty,
			desc: "",
		},
	];

	return <StatsContainer data={statsData} title="General"></StatsContainer>;
}

export default GeneralData;
