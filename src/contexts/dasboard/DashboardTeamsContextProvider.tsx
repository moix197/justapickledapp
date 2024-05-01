import { WalletDataContext } from "contexts/WalletDataContextProvider";
import { createContext, useContext, useEffect, useState } from "react";
import { getCall } from "services/apiSkeletons/calls";

const DashboardTeamsDataContext = createContext(null);

export default function DashboardTeamsDataContainer({ children }) {
	const [teams, setTeams] = useState([]);
	const [activeId, setActiveId] = useState(null);
	const [reloadTeams, setReloadTeams] = useState(false);
	const [selectedTeam, setSelectedTeam] = useState([]);
	const [userPublicKey] = useContext(WalletDataContext);

	useEffect(() => {
		if (!userPublicKey) return;
		const getItems = async () => {
			getUserTeams();
		};
		getItems();
	}, [userPublicKey]);

	useEffect(() => {
		if (activeId) {
			findSelectedTeam(activeId);
		}
	}, [teams, activeId]);

	useEffect(() => {
		if (!reloadTeams) return;
		const updateTeams = async () => {
			await getUserTeams();
			setReloadTeams(false);
		};
		updateTeams();
	}, [reloadTeams]);

	async function getUserTeams() {
		if (!userPublicKey) return;
		let dbTeams = await getCall(
			`/api/services/getTeams?wallet=${userPublicKey.toString()}`
		);

		setTeams(dbTeams.result);
	}

	function findSelectedTeam(id) {
		let vault = teams.find((item) => item._id == id);
		setSelectedTeam(vault);
	}

	return (
		<DashboardTeamsDataContext.Provider
			value={{
				teams,
				selectedTeam,
				setActiveId,
				getUserTeams,
				setReloadTeams,
			}}
		>
			{children}
		</DashboardTeamsDataContext.Provider>
	);
}

export { DashboardTeamsDataContainer, DashboardTeamsDataContext };
