import Layout from "components/dashboard/Layout";
import { DashboardSalesDataContext } from "contexts/dasboard/DashboardSalesContextProvider";
import { useContext, useEffect } from "react";
import { getCall } from "services/apiSkeletons/calls";
import ListSection from "components/dashboard/ListSection";
import { TitleXl } from "components/dashboard/Titles";
import { BasicButton } from "components/buttons/Basic";
import Link from "next/link";
import GenerateRewardsTransactionBtn from "components/dashboard/sale/GenerateRewardsTransactionBtn";

function SaleUsersListPage() {
	const {
		activeId,
		selectedSale,
		usersList,
		setUsersList,
		setSelectedUser,
		selectedUsersListId,
		setSelectedUsersListId,
	} = useContext(DashboardSalesDataContext);

	useEffect(() => {
		if (selectedUsersListId == activeId || !activeId) return;
		setSelectedUsersListId(activeId);
		getData();
	}, [activeId]);

	async function getData() {
		let users = await getCall(`/api/services/getUsers`, {
			relatedItemId: activeId,
			collection: "sales",
		});
		setUsersList(users.result);
	}

	const childrenFields = {
		status: "isActive",
		id: "_id",
		values: [
			{ key: "address", value: "address" },
			{ key: "Bought", value: "rewards.bought" },
			{ key: "To Send", value: "rewards.toSend" },
			{ key: "claimed", value: "rewards.claimed" },
		],
	};

	return (
		<div>
			<div className="mb-4">
				<div className="mb-8">
					<TitleXl>{selectedSale?.name} Users</TitleXl>
				</div>
				<div className="flex justify-end">
					<div className=" mr-4">
						<Link href={`/dashboard/sales/users/add/${activeId}`}>
							<BasicButton>add New Users</BasicButton>
						</Link>
					</div>
					<div className="">
						<GenerateRewardsTransactionBtn
							reloadUsers={getData}
							saleId={selectedSale?._id}
						></GenerateRewardsTransactionBtn>
					</div>
				</div>
			</div>
			<ListSection
				items={usersList}
				childrenFields={childrenFields}
				childrenUrl={`/dashboard/sales/users/manage`}
				hideStatus={true}
				cb={(item) => {
					setSelectedUser(item);
				}}
			></ListSection>
		</div>
	);
}

SaleUsersListPage.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default SaleUsersListPage;
