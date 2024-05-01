import Layout from "components/dashboard/Layout";
import SectionLayout from "components/dashboard/SectionLayout";
import BasicForm from "components/utils/forms/BasicForm";
import { DashboardVaultsDataContext } from "contexts/dasboard/DashboardVaultsContextProvider";
import { useContext } from "react";
import { postCall } from "services/apiSkeletons/calls";
import { notify } from "utils/notifications";

function VaultNewPage() {
	const { setReloadVaults } = useContext(DashboardVaultsDataContext);
	const formValues = [
		{
			name: "name",
			label: "Vault name",
			placeholder: "Enter your vault name here",
			type: "text",
			validation: "name",
			toolTipData:
				"This name will be use by yourself in the future to identify this specific vault, make sure to use a name that highlights the content of the vault",
		},
		{
			name: "tokenMintAddress",
			label: "Token Address",
			placeholder: "Paste address here",
			type: "text",
			validation: "wallet",
			toolTipData: "Make sure that you enter the correct token address",
		},
		{
			name: "initialAmount",
			label: "Initial Amount",
			placeholder: "Enter initial amount here",
			type: "text",
			validation: "price",
			toolTipData:
				"The total amount of token you want to sale, the tokens must be in your wallet already",
		},
	];

	async function createVault(formItem) {
		let response = await postCall("/api/priv/dashboard/createVault", formItem);
		let notifyMessage = response.err
			? { type: "error", message: "ERROR", description: response.error }
			: { type: "success", message: "Success", description: response.message };
		notify(notifyMessage);
		return response;
	}

	return (
		<SectionLayout>
			<BasicForm
				importantText="the vault address will be set to the connected wallet and we will check that the funds are there before allowing you to lock the sale/vault, please make sure that you create your vault with the wallet that hold the funds"
				formValues={formValues}
				title={"create your new vault"}
				btnText={"create new vault"}
				cb={async (item) => {
					let newVault = await createVault(item);
					if (!newVault.err) {
						setReloadVaults(true);
					}
				}}
			></BasicForm>
		</SectionLayout>
	);
}

VaultNewPage.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default VaultNewPage;
