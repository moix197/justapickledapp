import Layout from "components/dashboard/Layout";
import ListSection from "components/dashboard/ListSection";
import { useContext } from "react";
import { WalletDataContext } from "contexts/WalletDataContextProvider";
import { DashboardVaultsDataContext } from "contexts/dasboard/DashboardVaultsContextProvider";

function Vaults() {
	const { vaults } = useContext(DashboardVaultsDataContext);
	const [userPublicKey] = useContext(WalletDataContext);

	const childrenFields = {
		id: "_id",
		values: [
			{ key: "name", value: "name" },
			{ key: "Initial Amount", value: "amount.initial" },
			{ key: "Left Amount", value: "amount.left" },
		],
	};

	return (
		<div>
			<ListSection
				name="Vault"
				items={vaults}
				ctaUrl={"/dashboard/vaults/new"}
				childrenUrl={"/dashboard/vaults"}
				hideStatus={true}
				childrenFields={childrenFields}
				toolTipContent={"Create or Manage your vaults from this screen"}
			></ListSection>
		</div>
	);
}

Vaults.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default Vaults;
