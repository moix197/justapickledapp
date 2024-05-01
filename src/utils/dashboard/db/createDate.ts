import { insertDocument } from "utils/back/db/crud";
import { bulkValidate } from "utils/formSubmitValidation";

async function createDate(dateData) {
	try {
		let validationResponse = bulkValidate({
			launch: dateData.launch,
			end: dateData.end,
		});

		if (validationResponse.length > 0) {
			throw new Error(
				"Couldn't validate the date data, please check the values"
			);
		}

		const data = {
			created: new Date(),
			lastUpdated: new Date(),
			launch: new Date(dateData.launch),
			end: new Date(dateData.end),
		};

		let insertItem = await insertDocument("datesData", data);

		return {
			err: false,
			result: {
				id: insertItem?.insertedId,
			},
		};
	} catch (error) {
		return {
			err: true,
			error: error.message,
		};
	}
}

export { createDate };
