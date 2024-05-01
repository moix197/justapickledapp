import { WalletDataContext } from "contexts/WalletDataContextProvider";
import { createContext, useContext, useEffect, useState } from "react";
import { getCall } from "services/apiSkeletons/calls";

const DashboardAirdropDataContext = createContext(null);

export default function DashboardAirdropDataContainer({ children }) {
	const [airdrops, setAirdrops] = useState([]);
	const [activeId, setActiveId] = useState(null);
	const [reloadAirdrops, setReloadAirdrops] = useState(false);
	const [selectedAirdrop, setSelectedAirdrop] = useState([]);
	const [userPublicKey] = useContext(WalletDataContext);

	useEffect(() => {
		if (!userPublicKey) return;
		const getItems = async () => {
			getUserAirdrops();
		};
		getItems();
	}, [userPublicKey]);

	useEffect(() => {
		if (activeId) {
			findSelectedAirdrop(activeId);
		}
	}, [airdrops]);

	useEffect(() => {
		const updateAirdrop = async () => {
			await getUserAirdrops();
			setReloadAirdrops(false);
		};
		updateAirdrop();
	}, [reloadAirdrops]);

	async function getUserAirdrops() {
		if (!userPublicKey) return;
		let dbAirdrops = await getCall(
			`/api/airdrop/auth/db/getAirdrops?wallet=${userPublicKey.toString()}`
		);

		setAirdrops(dbAirdrops.result);
	}

	function findSelectedAirdrop(id) {
		let airdrop = airdrops.find((item) => item._id == id);
		setSelectedAirdrop(airdrop);
	}

	return (
		<DashboardAirdropDataContext.Provider
			value={{
				airdrops,
				selectedAirdrop,
				setActiveId,
				getUserAirdrops,
				setReloadAirdrops,
			}}
		>
			{children}
		</DashboardAirdropDataContext.Provider>
	);
}

export { DashboardAirdropDataContainer, DashboardAirdropDataContext };
