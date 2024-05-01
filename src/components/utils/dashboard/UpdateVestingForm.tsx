import { useEffect, useState } from "react";
import BasicForm from "../forms/BasicForm";
import { TitleLg } from "components/dashboard/Titles";
import { getCall } from "services/apiSkeletons/calls";
import { convertDateToMDY } from "utils/convertDateToMDY";
import { updateCollection } from "services/dashboard/updateCollection";

function UpdateVestingForm({
	vestingId,
	collection,
	collectionItemId,
	disabled,
}) {
	const [vesting, setVesting] = useState(null);

	const fields = [
		{
			name: "vesting",
			label: "Want to use vesting?",
			type: "toggle",
			toolTipData:
				"If you activate the vesting strategy the users will not get the rewards right away but instead they'll get them at the dates an intervals you input",

			defaultValue: {
				value: vesting?.nextDate ? true : false,
				parts: vesting ? vesting.parts : "",
				interval: vesting ? vesting.interval : "",
				nextDate: vesting ? convertDateToMDY(vesting.nextDate) : "",
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

	useEffect(() => {
		if (!vestingId) return;
		let getDates = async () => {
			let result = await getCall(`/api/services/getVesting?id=${vestingId}`);
			setVesting(result.result[0]);
		};
		getDates();
	}, [vestingId]);

	return (
		<div>
			{fields.length > 0 && (
				<div>
					<TitleLg>Vesting strategy</TitleLg>
					<BasicForm
						formValues={fields}
						disabled={disabled}
						btnText={"Update vesting strategy"}
						cb={(item) => {
							updateCollection(item, collection, collectionItemId, "vesting");
							//createSale(item);
						}}
					></BasicForm>
				</div>
			)}
		</div>
	);
}

export default UpdateVestingForm;
