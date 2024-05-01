import StatsContainer from "components/utils/StatsContainer";

function VestingCont({ vestingData }) {
	const statsData = [
		{
			title: "Parts",
			value: vestingData?.parts,
			desc: "",
		},
		{
			title: "Interval",
			value: vestingData?.interval,
			desc: "",
		},
		{
			title: "Released",
			value: vestingData?.released,
			desc: "",
		},
	];
	return <StatsContainer data={statsData} title="Vesting"></StatsContainer>;
}

export default VestingCont;
