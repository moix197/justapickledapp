import Layout from "components/dashboard/Layout";
import SectionLayout from "components/dashboard/SectionLayout";
import BasicForm from "components/utils/forms/BasicForm";
import { DashboardVaultsDataContext } from "contexts/dasboard/DashboardVaultsContextProvider";
import { useContext } from "react";
import { postCall } from "services/apiSkeletons/calls";
import { notify } from "utils/notifications";

function VaultNewPage() {
	const { vaults } = useContext(DashboardVaultsDataContext);

	const formValues = [
		{
			name: "name",
			label: "Name",
			placeholder: "Name of the new team here",
			defaultValue: "",
			validation: "name",
			type: "text",
		},
		{
			name: "admins",
			label: "Admins",
			placeholder: "Paste the wallet address here",
			defaultValue: [],
			validation: "wallet",
			type: "multiValue",
		},
	];

	async function createSale(formItem) {
		let response = await postCall("/api/priv/dashboard/createTeam", formItem);

		let notifyMessage = response.err
			? { type: "error", message: "ERROR", description: response.error }
			: { type: "success", message: "Success", description: response.message };
		notify(notifyMessage);
	}

	return (
		<div className="mb-14">
			<SectionLayout>
				<BasicForm
					formValues={formValues}
					title={"create your new team"}
					btnText={"create new team"}
					cb={(item) => {
						createSale(item);
					}}
				></BasicForm>
			</SectionLayout>
		</div>
	);
}

VaultNewPage.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default VaultNewPage;
