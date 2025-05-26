import BasicForm from "components/utils/forms/BasicForm";
import { useEffect, useState } from "react";
import { TitleLg } from "../Titles";
import { updateCollection } from "services/dashboard/updateCollection";

function UpdateSaleForm({
	saleData,
	collection,
	collectionItemId,
	cb,
	disabled,
}) {
	const [formValues, setFormValues] = useState([]);

	useEffect(() => {
		if (formValues.length > 1) return;
		const fields = [
			{
				name: "name",
				label: "Sale name",
				placeholder: "Enter the name here",
				defaultValue: saleData.name,
				type: "text",
				validation: "name",
				toolTipData:
					"This name will be use by yourself in the future to identify this specific vault, make sure to use a name that highlights the content of the vault",
			},
			{
				name: "type",
				label: "Type of sale",
				defaultValue: { value: saleData.type },
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
				defaultValue: { value: saleData?.target },
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
				defaultValue: { value: saleData.redeem },
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
				toolTipData: `If you go for a fixed price you will be able to decide the exact price of the token used for the sale, if you decide for the market price we will use the price of the token in the market at the moment of the purchse`,
				defaultValue: {
					value: saleData.price.type,
					amount: saleData.price.amount,
					extra: saleData.price.extra,
				},
				type: "radio",
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
		];
		setFormValues(fields);
	}, [saleData]);

	return (
		<div>
			{formValues.length > 0 && (
				<div>
					<TitleLg>general data</TitleLg>
					<BasicForm
						formValues={formValues}
						btnText={"Update"}
						cb={async (item) => {
							let response = await updateCollection(
								item,
								collection,
								collectionItemId
							);
							if (!response.err) {
								cb && cb();
							}
						}}
						disabled={disabled}
					></BasicForm>
				</div>
			)}
		</div>
	);
}

export default UpdateSaleForm;
