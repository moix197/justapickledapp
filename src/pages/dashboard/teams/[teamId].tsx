import { useRouter } from "next/router";
import Layout from "components/dashboard/Layout";
import SectionLayout from "components/dashboard/SectionLayout";
import BasicForm from "components/utils/forms/BasicForm";
import { useContext, useEffect, useState } from "react";
import { DashboardTeamsDataContext } from "contexts/dasboard/DashboardTeamsContextProvider";
import { updateCollection } from "services/dashboard/updateCollection";

function UpdateVaultPage() {
	const router = useRouter();
	const { teamId } = router.query;
	const { selectedTeam, setActiveId, setReloadTeams } = useContext(
		DashboardTeamsDataContext
	);
	const [formValues, setFormValues] = useState([]);

	useEffect(() => {
		setActiveId(teamId);
	}, [teamId]);

	useEffect(() => {
		setFormValues([
			{
				name: "name",
				label: "Name",
				placeholder: "Name of the team here",
				defaultValue: selectedTeam?.name,
				validation: "name",
				type: "text",
			},
			{
				name: "admins",
				label: "Admins",
				placeholder: "Paste the wallet address here",
				defaultValue: selectedTeam?.admins,
				validation: "wallet",
				type: "multiValue",
			},
		]);
	}, [selectedTeam]);

	return (
		<SectionLayout>
			{selectedTeam && (
				<BasicForm
					formValues={formValues}
					title={"Edit team"}
					btnText={"Update"}
					cb={async (item) => {
						let response = await updateCollection(item, "teams", teamId);
						if (!response.err) setReloadTeams(true);
					}}
				></BasicForm>
			)}
		</SectionLayout>
	);
}

UpdateVaultPage.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default UpdateVaultPage;
