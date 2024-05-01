import { insertDocument, updateDocument } from "utils/back/db/crud";
import { bulkValidate } from "utils/formSubmitValidation";

async function updateSale(id, filteredSaleData) {
	try {
		let validationResponse = bulkValidate({ filteredSaleData });

		if (validationResponse.length > 0) {
			throw new Error(
				"Couldn't validate the sale data, please check the values"
			);
		}

		const data = {
			...filteredSaleData,
		};

		let insertItem = await updateDocument("salesData", data);

		return {
			err: false,
			success: "We've updated the sale",
		};
	} catch (error) {
		return {
			err: true,
			error: error.message,
		};
	}
}

export { updateSale };
