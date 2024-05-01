import { useContext } from "react";
import BasicForm from "../forms/BasicForm";
import { TitleLg } from "components/dashboard/Titles";
import { updateCollection } from "services/dashboard/updateCollection";
import { DashboardSalesDataContext } from "contexts/dasboard/DashboardSalesContextProvider";
import { DashboardVaultsDataContext } from "contexts/dasboard/DashboardVaultsContextProvider";

function UpdateVaultDropdown({
	vaultId,
	collection,
	collectionItemId,
	disabled,
}) {
	const { setReloadSales } = useContext(DashboardSalesDataContext);
	const { vaults, unlockedVaults } = useContext(DashboardVaultsDataContext);

	const fields = [
		{
			name: "vaultId",
			label: "Vault",
			placeholder: "Select a vault",
			defaultValue: vaultId,
			options: disabled ? vaults : unlockedVaults,
			type: "select",
			toolTipData:
				"Select the vault you want to associate with this sale, the vault defines the token and the amounts of it that will be used for this sale",
		},
	];

	return (
		<div>
			{fields.length > 0 && (
				<div>
					<TitleLg>Vault data</TitleLg>
					{unlockedVaults && (
						<BasicForm
							formValues={fields}
							btnText={"Update vault"}
							cb={async (item) => {
								let result = await updateCollection(
									item,
									collection,
									collectionItemId
								);
								if (!result.err) {
									setReloadSales(true);
								}
							}}
							disabled={disabled}
						></BasicForm>
					)}
				</div>
			)}
		</div>
	);
}

export default UpdateVaultDropdown;
