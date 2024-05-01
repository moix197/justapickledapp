import { insertDocument } from "utils/back/db/crud";
import { bulkValidate } from "utils/formSubmitValidation";
import { getSessionWalletAddress } from "utils/getSessionWalletAddress";

async function createTeam(name, teamData, req) {
	try {
		let validationResponse = bulkValidate({
			name: name,
			admins: teamData,
		});

		if (validationResponse.length > 0) {
			throw new Error("Couldn't validate the form, please check the values");
		}

		const address = await getSessionWalletAddress(req);

		const data = {
			owner: address,
			name: name,
			admins: teamData,
			linkedTo: [],
		};

		let insertItem = await insertDocument("teamsData", data);

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

export { createTeam };
