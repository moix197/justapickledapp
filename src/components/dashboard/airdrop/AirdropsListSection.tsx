import { useContext } from "react";
import { DashboardAirdropDataContext } from "contexts/dasboard/DashboardAirdropContextProvider";
import ListSection from "components/dashboard/ListSection";

function AirdropsListSection() {
	const { airdrops } = useContext(DashboardAirdropDataContext);
	const childrenFields = {
		status: "isActive",
		id: "_id",
		values: [
			{ key: "name", value: "name" },
			{ key: "Token", value: "tokenName" },
			{ key: "Users", value: "participantsQty" },
		],
	};
	return (
		<div>
			<ListSection
				name="Airdrop"
				items={airdrops}
				childrenFields={childrenFields}
				ctaUrl={"/dashboard/airdrops/new"}
				childrenUrl={"/dashboard/airdrops"}
			></ListSection>
		</div>
	);
}

export default AirdropsListSection;
