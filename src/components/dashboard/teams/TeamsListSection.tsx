import { useContext } from "react";
import { DashboardTeamsDataContext } from "contexts/dasboard/DashboardTeamsContextProvider";
import ListSection from "components/dashboard/ListSection";

function TeamsListSection() {
	const { teams } = useContext(DashboardTeamsDataContext);
	const childrenFields = {
		status: "isActive",
		id: "_id",
		values: [{ key: "name", value: "name" }],
	};
	return (
		<div>
			<ListSection
				name="Team"
				items={teams}
				childrenFields={childrenFields}
				hideStatus={true}
				ctaUrl={"/dashboard/teams/new"}
				childrenUrl={"/dashboard/teams"}
			></ListSection>
		</div>
	);
}

export default TeamsListSection;
