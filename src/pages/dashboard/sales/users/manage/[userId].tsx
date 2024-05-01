import { useRouter } from "next/router";
import Layout from "components/dashboard/Layout";
import { DashboardSalesDataContext } from "contexts/dasboard/DashboardSalesContextProvider";
import { useContext, useEffect, useState } from "react";
import { BasicButton } from "components/buttons/Basic";
import SectionLayout from "components/dashboard/SectionLayout";
import { TitleLg } from "components/dashboard/Titles";
import { bulkValidate } from "utils/formSubmitValidation";
import { notify } from "utils/notifications";
import BasicForm from "components/utils/forms/BasicForm";
import { getCall, postCall } from "services/apiSkeletons/calls";
import { updateCollection } from "services/dashboard/updateCollection";
import ListSection from "components/dashboard/ListSection";
import ItemDataSection from "components/dashboard/ItemDataSection";
import ContractAddress from "components/utils/ContractAddress";
import GenerateRewardsTransactionBtn from "components/dashboard/sale/GenerateRewardsTransactionBtn";

function ManageUsers() {
	const router = useRouter();
	const { userId } = router.query;
	const { selectedUser, setSelectedUser, setSelectedUserId } = useContext(
		DashboardSalesDataContext
	);

	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		if ((!userId && !selectedUser) || selectedUser?._id == userId) return;
		getParticipantData();
	}, [userId]);

	useEffect(() => {
		if (!selectedUser) return;
		getParticipantTransactions();
	}, [selectedUser]);

	async function getParticipantData() {
		let response = await getCall(`/api/services/getUsers`, {
			_id: userId,
			collection: "sales",
		});
		setSelectedUser(response.result[0]);
	}

	async function updateParticipantData(item) {
		let response = await postCall("/api/priv/dashboard/updateParticipants", {
			collection: "sales",
			itemId: userId,
			newValues: item,
		});

		notify({
			type: response.err ? "error" : "success",
			message: response.err ? "Error" : "Success",
			description: response.err ? response.error : "User updated successfully",
		});

		return response;
	}

	async function getParticipantTransactions() {
		let response = await getCall("/api/services/getParticipantTransactions", {
			address: selectedUser?.address,
			saleId: selectedUser?.relatedItemId,
		});

		setTransactions(response.result);
	}

	const formValues = [
		{
			name: "toBuyAmount",
			label: "available Amount to buy for this user",
			placeholder: "Enter the amount here",
			defaultValue: selectedUser?.rewards?.toBuy,
			type: "text",
			validation: "name",
			toolTipData:
				"This is the max amount that the users below will be able to buy from your sale",
		},
		{
			name: "status",
			label: "status",
			placeholder: "Select a status",
			defaultValue: selectedUser?.status,
			toolTipData: `The only status that will allow users to make a purchase is the "ready" one, the "banned", "paused" and "done" statuses will prevent the users from purchasing so make sure you assign the status you need,`,
			options: [
				{ name: "banned", _id: "banned" },
				{ name: "paused", _id: "paused" },
				{ name: "ready", _id: "readyToClaim" },
				{ name: "done", _id: "done" },
			],
			type: "select",
		},
	];

	const childrenFields = {
		status: "isActive",
		id: "tx",
		hideStatus: true,
		values: [
			{ key: "txid", value: "tx" },
			{ key: "type", value: "type" },
			{ key: "amount", value: "amount" },
			{ key: "status", value: "status" },
		],
	};

	const items = [
		{
			key: "address",
			value: (
				<ContractAddress ca={selectedUser?.address} text=" "></ContractAddress>
			),
		},
		{
			key: "Bought",
			value: selectedUser?.rewards.bought,
		},
		{
			key: "Allocation",
			value: selectedUser?.rewards.toBuy,
		},
		{
			key: "Rewards",
			value: selectedUser?.rewards.toSend,
		},
		{
			key: "sent",
			value: selectedUser?.rewards.sent,
		},
		{
			key: "locked",
			value: selectedUser?.rewards.locked,
		},
	];

	return (
		<div>
			<div className="grid grid-cols-5 gap-4 mb-4">
				<div className="col-span-3">
					<ItemDataSection name="User" items={items}></ItemDataSection>
				</div>
				<div className="col-span-2">
					<SectionLayout>
						<div className="mb-4">
							<TitleLg>Rewards</TitleLg>
						</div>
						{selectedUser?.rewards.toSend > -1 ? (
							<GenerateRewardsTransactionBtn
								user={selectedUser}
							></GenerateRewardsTransactionBtn>
						) : (
							<div className="text-lg uppercase text-third">
								<div>No pending rewards</div>
							</div>
						)}
					</SectionLayout>
				</div>
				<div className="col-span-5">
					<SectionLayout>
						<BasicForm
							formValues={formValues}
							title="update user data"
							btnText="Update user data"
							cb={async (item) => {
								let response = await updateParticipantData(item);
								if (!response.err) {
									getParticipantData();
								}
							}}
						></BasicForm>
					</SectionLayout>
				</div>
				{transactions?.length > 0 && (
					<div className="col-span-5">
						<SectionLayout>
							<ListSection
								name={`Transactions Data`}
								items={transactions}
								childrenFields={childrenFields}
								hideStatus={true}
								childrenUrl="https://solana.fm/tx"
								childrenCtaTarget="_blank"
								childrenCtaText="Check"
							></ListSection>
						</SectionLayout>
					</div>
				)}
			</div>
		</div>
	);
}

ManageUsers.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default ManageUsers;
