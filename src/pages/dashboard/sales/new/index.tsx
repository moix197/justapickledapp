import Layout from "components/dashboard/Layout";
import SectionLayout from "components/dashboard/SectionLayout";
import BasicForm from "components/utils/forms/BasicForm";
import { DashboardSalesDataContext } from "contexts/dasboard/DashboardSalesContextProvider";
import { DashboardVaultsDataContext } from "contexts/dasboard/DashboardVaultsContextProvider";
import { useContext } from "react";
import { postCall } from "services/apiSkeletons/calls";
import { notify } from "utils/notifications";

function VaultNewPage() {
	const { unlockedVaults } = useContext(DashboardVaultsDataContext);
	const { setReloadSales } = useContext(DashboardSalesDataContext);

	const formValues = [
		{
			name: "name",
			label: "Sale name",
			placeholder: "Enter the name here",
			type: "text",
			validation: "name",
			toolTipData:
				"This name will be use by yourself in the future to identify this specific vault, make sure to use a name that highlights the content of the vault",
		},
		{
			name: "launch",
			label: "Sale launch date",
			placeholder: "MM/DD/YY",
			validation: "date",
			type: "text",
			toolTipData:
				"Sale launch date, make sure to add the correct one, use the format MM/DD/YY, all sales will be launched at 00:00 EST",
		},
		{
			name: "end",
			label: "Sale end date",
			placeholder: "MM/DD/YY",
			validation: "date",
			type: "text",
			toolTipData:
				"Sale end date, make sure to add the correct one, use the format MM/DD/YY, all sales will end at 00:00 EST",
		},
		{
			name: "vault",
			label: "Vault",
			placeholder: "Select vault",
			validation: "date",
			defaultValue: "default",
			options: unlockedVaults,
			type: "select",
			toolTipData:
				"Select the vault you want to associate with this sale, the vault defines the token and the amounts of it that will be used for this sale",
		},
		{
			name: "type",
			label: "Type of sale",
			defaultValue: { value: "regular" },
			type: "radio",
			toolTipData:
				"If your token is already fully distributed choose a regular sale, otherwise you can go for a pre sale",
			options: [
				{ value: "regular", name: "Regular" },
				{ value: "presale", name: "Pre-sale" },
			],
		},
		{
			name: "target",
			label: "Sale target",
			defaultValue: { value: "private" },
			type: "radio",
			toolTipData: `If you want a private sale you will be able to add the participants later, if you want everyone to be able to participate select "open to all"`,
			options: [
				{ value: "private", name: "Private" },
				{ value: "open", name: "Open to all" },
			],
		},
		{
			name: "redeem",
			label: "How should users get their funds?",
			defaultValue: { value: "airdrop" },
			type: "radio",
			toolTipData:
				"You will be responsible for airdropping the tokens to the participants after they purchase it",
			options: [
				{ value: "airdrop", name: "Airdrop" },
				/*{ value: "claim", name: "Claim" },
				{ value: "claimableAirdrop", name: "Claimable Airdrop" },*/
			],
		},
		{
			name: "price",
			label: "Price strategy",
			defaultValue: { value: "market", amount: "", extra: "" },
			type: "radio",
			toolTipData: `If you go for a fixed price you will be able to decide the exact price of the token used for the sale, if you decide for the market price we will use the price of the token in the market at the moment of the purchse`,
			options: [
				{ value: "market", name: "Market" },
				{ value: "fixed", name: "Fixed" },
			],
			children: [
				{
					launchValue: "fixed",
					values: [
						{
							name: "amount",
							label: "Price amount",
							placeholder: "Enter your price here",
							type: "text",
							validation: "price",
							toolTipData:
								"This will be the final amount at which all users will buy the token (MUST BE IN USDT)",
						},
					],
				},
				{
					launchValue: "market",
					values: [
						{
							name: "extra",
							label: "TokenBack %",
							placeholder: "Enter your token back % amount here",
							type: "text",
							validation: "price",
							toolTipData: `Percentage of the total sale that will be given as a bonus, i.e you set "10" as the value, then if the user buy 100 tokens he'll get 10 tokens back`,
						},
					],
				},
			],
		},

		{
			name: "vesting",
			label: "Want to use vesting?",
			type: "toggle",
			toolTipData:
				"If you activate the vesting strategy the users will not get the rewards right away but instead they'll get them at the dates an intervals you input",
			defaultValue: {
				value: false,
				parts: "",
				interval: "",
				nextDate: "",
			},
			children: {
				launchValue: true,
				values: [
					{
						name: "parts",
						label: "Vesting Parts",
						placeholder: "Vesting parts amount",
						validation: "number",
						type: "text",
						toolTipData: "how many parts should we break the reward amount in?",
					},
					{
						name: "interval",
						label: "Vesting Interval",
						placeholder: "Interval in hours",
						validation: "number",
						type: "text",
						toolTipData: "Time difference between each part unlocks (in hours)",
					},
					{
						name: "nextDate",
						label: "Vesting first claim date",
						placeholder: "MM/DD/YY",
						validation: "date",
						type: "text",
						toolTipData:
							"This will define the cliff time, it sets the date fort the first part of the prize to be unlocked, the time for the unlock will be at 00:00 EST",
					},
				],
			},
		},
	];

	async function createSale(formItem) {
		let response = await postCall("/api/priv/dashboard/createSale", formItem);

		let notifyMessage = response.err
			? { type: "error", message: "ERROR", description: response.error }
			: { type: "success", message: "Success", description: response.message };
		notify(notifyMessage);

		return response;
	}

	return (
		<SectionLayout>
			<BasicForm
				formValues={formValues}
				title={"create your new token sale"}
				btnText={"create new token sale"}
				cb={async (item) => {
					let result = await createSale(item);
					if (!result?.err) setReloadSales(true);
				}}
			></BasicForm>
		</SectionLayout>
	);
}

VaultNewPage.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

export default VaultNewPage;
