import { insertDocument } from "utils/back/db/crud";
import { bulkValidate } from "utils/formSubmitValidation";

async function createVesting(vesting) {
	try {
		if (!vesting.value) {
			vesting = { value: false, parts: 0, interval: 0, nextDate: null };
		}

		let validationResponse = bulkValidate({
			vesting: vesting,
		});

		if (validationResponse.length > 0) {
			throw new Error(
				"Couldn't validate the vesting data, please check the values"
			);
		}

		const data = {
			parts: parseInt(vesting.parts),
			interval: parseInt(vesting.interval),
			nextDate: !vesting.value ? null : new Date(vesting.nextDate),
			released: 0,
		};

		let insertItem = await insertDocument("vestingData", data);

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

export { createVesting };
