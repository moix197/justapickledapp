import { bulkValidate } from "utils/formSubmitValidation";
import { updatableFieldsByType } from "./updatableFieldsByType";
import { ObjectId } from "mongodb";

function checkIfValidCollectionNameAndFields(
	collectionName,
	collectionStatus,
	formFields
) {
	let secureFields = updatableFieldsByType;

	if (!secureFields[collectionName] || !formFields) {
		console.log(`Wrong collection name  ${collectionName}`);
		throw new Error(
			"Couldn't update, please check the collection and try again later"
		);
	}

	let objToValidate = {};

	//checking that each field is valid

	for (const key in formFields) {
		if (secureFields[collectionName][collectionStatus].indexOf(key) == -1) {
			console.log(`Wrong field name: ${key}`);
			throw new Error(
				"Couldn't update, please check the fields and try again later"
			);
		}
		let validationKey = secureFields[collectionName]["values"][key].validation;
		objToValidate[validationKey] = formFields[key];

		//updating the id string to be an object id

		if (key.substring(key.length - 2).toUpperCase() == "ID") {
			formFields[key] = new ObjectId(formFields[key]);
		} else if (key == "redeem" || key == "type") {
			formFields[key] = formFields[key].value;
		} else if (key == "price") {
			formFields[key] = {
				type: formFields[key].value,
				amount: parseInt(formFields[key].amount),
			};
		} else if (key == "target") {
			formFields[key] = formFields[key].value;
		} else if (key == "vesting") {
			formFields = formFields[key].value
				? {
						parts: parseInt(formFields[key].parts),
						interval: parseInt(formFields[key].interval),
						nextDate: new Date(formFields[key].nextDate),
				  }
				: {
						parts: 0,
						interval: 0,
						nextDate: null,
				  };
			break;
		} else if (key == "launch" || key == "end") {
			formFields[key] = new Date(formFields[key]);
		} else if (collectionName == "vault" && key == "initialAmount") {
			let value = parseFloat(formFields[key]);
			formFields[key] = value;
			/*formFields["amount"] = {
				initial: value,
				inVault: 0,
				left: value,
				sent: 0,
				received: 0,
			};*/
			formFields["amount.initial"] = value;
			formFields["amount.left"] = value;
			delete formFields[key];
		}
	}

	let validationResponse = bulkValidate(objToValidate);

	if (validationResponse[0]?.err) {
		console.log("denied validation on update");
		throw new Error("Validation failed, please check the values and try again");
	}

	return { err: false, collectionFields: formFields };
}

export { checkIfValidCollectionNameAndFields };
