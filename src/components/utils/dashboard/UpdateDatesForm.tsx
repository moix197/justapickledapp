import { useEffect, useState } from "react";
import BasicForm from "../forms/BasicForm";
import { TitleLg } from "components/dashboard/Titles";
import { getCall } from "services/apiSkeletons/calls";
import { convertDateToMDY } from "utils/convertDateToMDY";
import { updateCollection } from "services/dashboard/updateCollection";

function UpdateDatesForm({ datesId, collection, collectionItemId, disabled }) {
	const [dates, setDates] = useState(null);

	const fields = [
		{
			name: "launch",
			label: "Launch date",
			placeholder: "MM/DD/YY",
			validation: "date",
			defaultValue: convertDateToMDY(dates?.launch),
			type: "text",
			toolTipData:
				"Sale launch date, make sure to add the correct one, use the format MM/DD/YY, all sales will be launched at 00:00 EST",
		},
		{
			name: "end",
			label: "End date",
			placeholder: "MM/DD/YY",
			validation: "date",
			defaultValue: convertDateToMDY(dates?.end),
			type: "text",
			toolTipData:
				"Sale end date, make sure to add the correct one, use the format MM/DD/YY, all sales will end at 00:00 EST",
		},
	];

	useEffect(() => {
		if (!datesId) return;
		let getDates = async () => {
			let result = await getCall(`/api/services/getDates?id=${datesId}`);
			setDates(result.result[0]);
		};
		getDates();
	}, [datesId]);

	return (
		<div>
			{fields.length > 0 && (
				<div>
					<TitleLg>Dates data</TitleLg>
					<BasicForm
						formValues={fields}
						btnText={"Update dates"}
						cb={(item) => {
							updateCollection(item, collection, collectionItemId, "dates");
							//createSale(item);
						}}
						disabled={disabled}
					></BasicForm>
				</div>
			)}
		</div>
	);
}

export default UpdateDatesForm;
