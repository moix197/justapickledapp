import { WalletDataContext } from "contexts/WalletDataContextProvider";
import { createContext, useContext, useEffect, useState } from "react";
import { getCall } from "services/apiSkeletons/calls";
import { useRouter } from "next/router";

const DashboardSalesDataContext = createContext(null);

export default function DashboardSalesDataContainer({ children }) {
	const router = useRouter();
	const { salesId } = router.query;
	const [sales, setSales] = useState([]);
	const [users, setUsers] = useState([]);
	const [selectedUserId, setSelectedUserId] = useState([]);
	const [selectedUsersListId, setSelectedUsersListId] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [usersList, setUsersList] = useState([]);
	const [activeId, setActiveId] = useState(null);
	const [reloadSales, setReloadSales] = useState(false);
	const [selectedSale, setSelectedSale] = useState(null);
	const [userPublicKey] = useContext(WalletDataContext);

	useEffect(() => {
		if (!userPublicKey) return;
		const getItems = async () => {
			getUserSales();
		};
		getItems();
	}, [userPublicKey]);

	useEffect(() => {
		if (selectedSale?._id == salesId) return;
		findSelectedSale(activeId);
	}, [activeId]);

	useEffect(() => {
		if (sales?.length == 0 || !salesId) return;
		setActiveId(salesId);
	}, [sales, salesId]);

	useEffect(() => {
		if (sales?.length == 0 || !salesId || !activeId) return;
		findSelectedSale(activeId);
	}, [sales]);

	useEffect(() => {
		if (!reloadSales) return;
		const updateVault = async () => {
			await getUserSales();
			setReloadSales(false);
		};
		updateVault();
	}, [reloadSales]);

	async function getUserSales() {
		if (!userPublicKey) return;
		let dbSales = await getCall(
			`/api/services/getSalesFrowmOwnerOrTeam?wallet=${userPublicKey.toString()}`
		);

		setSales(dbSales.result);
	}

	function findSelectedSale(id) {
		let sale = sales.find((item) => item._id == id);
		setSelectedSale(sale);
	}

	return (
		<DashboardSalesDataContext.Provider
			value={{
				sales,
				activeId,
				selectedSale,
				setActiveId,
				getUserSales,
				setReloadSales,
				selectedUser,
				setSelectedUser,
				selectedUserId,
				setSelectedUserId,
				usersList,
				setUsersList,
				selectedUsersListId,
				setSelectedUsersListId,
			}}
		>
			{children}
		</DashboardSalesDataContext.Provider>
	);
}

export { DashboardSalesDataContainer, DashboardSalesDataContext };
