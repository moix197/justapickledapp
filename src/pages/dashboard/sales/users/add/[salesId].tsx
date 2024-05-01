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
import { postCall } from "services/apiSkeletons/calls";

function AddUsers() {
	const router = useRouter();
	const { salesId } = router.query;
	const { selectedSale, setActiveId } = useContext(DashboardSalesDataContext);
	const [value, setValue] = useState("");

	useEffect(() => {
		setActiveId(salesId);
	}, [salesId]);

	async function createParticipants(item) {
		let result = await postCall("/api/priv/dashboard/createParticipants", {
			toBuy: item.toBuyAmount,
			participants: item.participants,
			status: item.status,
			collection: "sales",
			itemId: salesId,
		});

		notify({
			type: result?.err ? "error" : "success",
			message: result?.err ? "Error" : "Success",
			description: result?.err
				? result?.error
				: "Users has been added successfully",
		});

		return result;
	}

	const formValues = [
		{
			name: "toBuyAmount",
			label: "available Amount to buy per User",
			placeholder: "Enter the amount here",
			type: "text",
			validation: "name",
			toolTipData:
				"This is the max amount that the users below will be able to buy from your sale",
		},
		{
			name: "status",
			label: "status",
			placeholder: "Select a status",
			defaultValue: "default",
			toolTipData: `The only status that will allow users to make a purchase is the "ready" one, the "banned", "paused" and "done" statuses will prevent the users from purchasing so make sure you assign the status you need,`,
			options: [
				{ name: "banned", _id: "banned" },
				{ name: "paused", _id: "paused" },
				{ name: "ready", _id: "readyToClaim" },
				{ name: "done", _id: "done" },
			],
			type: "select",
		},
		{
			name: "participants",
			label: "Participants",
			placeholder: "Add wallet addresses here",
			validation: "insertedValue",
			type: "textarea",
			toolTipData:
				"Enter the wallet address you want to assign an status/amount to, you can just separate them by commas or just copy paste the column with your address form an excel sheet",
		},
	];
	return (
		<SectionLayout>
			<div>
				<BasicForm
					formValues={formValues}
					title="Add users to your sale"
					btnText="add users"
					cb={async (item) => {
						let result = await createParticipants(item);
					}}
				></BasicForm>
			</div>
		</SectionLayout>
	);
}

AddUsers.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default AddUsers;
