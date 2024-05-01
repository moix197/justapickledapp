import { useRouter } from "next/router";
import Layout from "components/dashboard/Layout";
import SectionLayout from "components/dashboard/SectionLayout";
import BasicForm from "components/utils/forms/BasicForm";
import { postCall } from "services/apiSkeletons/calls";
import { notify } from "utils/notifications";
import { useContext, useEffect, useState } from "react";
import { DashboardVaultsDataContext } from "contexts/dasboard/DashboardVaultsContextProvider";
import { updateCollection } from "services/dashboard/updateCollection";
import ItemDataSection from "components/dashboard/ItemDataSection";
import ContractAddress from "components/utils/ContractAddress";

function UpdateVaultPage() {
	const router = useRouter();
	const { vaultId } = router.query;
	const { selectedVault, setActiveId, setReloadVaults } = useContext(
		DashboardVaultsDataContext
	);
	const [formValues, setFormValues] = useState([]);
	const [dataItems, setDataItems] = useState([]);

	useEffect(() => {
		setActiveId(vaultId);
	}, [vaultId]);

	useEffect(() => {
		if (!selectedVault) return;
		setFormValues([
			{
				name: "name",
				label: "Vault name",
				defaultValue: selectedVault?.name,
				placeholder: "Enter your vault name here",
				type: "text",
				validation: "name",
				toolTipData:
					"This name will be use by yourself in the future to identify this specific vault, make sure to use a name that highlights the content of the vault",
			},
			{
				name: "initialAmount",
				label: "Initial Amount",
				defaultValue: selectedVault?.amount?.initial,
				placeholder: "Enter initial amount here",
				type: "text",
				validation: "price",
				toolTipData:
					"The total amount of token you want to sale, the tokens must be in your wallet already",
			},
		]);

		setDataItems([
			{
				key: "STATUS",
				value: <div className="uppercase">{selectedVault?.status}</div>,
			},
			{
				key: "Vault Owner",
				value: (
					<ContractAddress ca={selectedVault?.owner} text=" "></ContractAddress>
				),
			},
			{
				key: "Token address",
				value: (
					<ContractAddress
						ca={selectedVault?.tokenMint}
						text=" "
					></ContractAddress>
				),
			},
			{
				key: "Accepted Token",
				value: selectedVault?.acceptedTokens[0].name,
			},
			{
				key: "Accepted Token address",
				value: (
					<ContractAddress
						ca={selectedVault?.acceptedTokens[0].address}
						text=" "
					></ContractAddress>
				),
			},
			{
				key: "Initial Amount",
				value: selectedVault?.amount?.initial,
			},
			{
				key: "In Vault",
				value: selectedVault?.amount?.inVault.toFixed(5),
			},
			{
				key: "Left",
				value: selectedVault?.amount?.left,
			},
			{
				key: "sent",
				value: selectedVault?.amount?.sent.toFixed(5),
			},
			{
				key: "received",
				value: selectedVault?.amount?.received,
			},
		]);
	}, [selectedVault]);

	return (
		<div>
			{dataItems && (
				<div className="mb-4">
					<ItemDataSection items={dataItems} name="Vault"></ItemDataSection>
				</div>
			)}
			{selectedVault?.status != "locked" && (
				<SectionLayout>
					<BasicForm
						formValues={formValues}
						title={"Edit vault"}
						btnText={"Update"}
						cb={async (item) => {
							let response = await updateCollection(item, "vault", vaultId);
							if (!response.err) setReloadVaults(true);
						}}
					></BasicForm>
				</SectionLayout>
			)}
		</div>
	);
}

UpdateVaultPage.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default UpdateVaultPage;
