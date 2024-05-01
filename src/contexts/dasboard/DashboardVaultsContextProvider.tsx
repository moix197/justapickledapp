import { WalletDataContext } from "contexts/WalletDataContextProvider";
import { createContext, useContext, useEffect, useState } from "react";
import { getCall } from "services/apiSkeletons/calls";

const DashboardVaultsDataContext = createContext(null);

export default function DashboardVaultsDataContainer({ children }) {
	const [vaults, setVaults] = useState([]);
	const [unlockedVaults, setUnlockedVaults] = useState([]);
	const [activeId, setActiveId] = useState(null);
	const [reloadVaults, setReloadVaults] = useState(false);
	const [selectedVault, setSelectedVault] = useState(null);
	const [userPublicKey] = useContext(WalletDataContext);

	useEffect(() => {
		if (!userPublicKey) return;
		const getItems = async () => {
			getUserVaults();
		};
		getItems();
	}, [userPublicKey]);

	useEffect(() => {
		if (activeId) {
			findSelectedVault(activeId);
		}
	}, [vaults, activeId]);

	useEffect(() => {
		if (!reloadVaults) return;
		const updateVault = async () => {
			await getUserVaults();
			setReloadVaults(false);
		};
		updateVault();
	}, [reloadVaults]);

	async function getUserVaults() {
		if (!userPublicKey) return;
		let dbVaults = await getCall(
			`/api/services/getVaults?wallet=${userPublicKey.toString()}`
		);

		setVaults(dbVaults.result);
		let ulVaults = dbVaults.result.filter((item) => item.status != "locked");
		setUnlockedVaults(ulVaults);
	}

	function findSelectedVault(id) {
		let vault = vaults.find((item) => item._id == id);
		setSelectedVault(vault);
	}

	return (
		<DashboardVaultsDataContext.Provider
			value={{
				vaults,
				unlockedVaults,
				selectedVault,
				setActiveId,
				getUserVaults,
				setReloadVaults,
			}}
		>
			{children}
		</DashboardVaultsDataContext.Provider>
	);
}

export { DashboardVaultsDataContainer, DashboardVaultsDataContext };
