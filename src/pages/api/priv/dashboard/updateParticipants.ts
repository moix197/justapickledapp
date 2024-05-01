import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { errorHandlerMiddleware } from "utils/back/errorHandlerMiddleware";
import { findDocuments, updateDocument } from "utils/back/db/crud";
import { getSessionWalletAddress } from "utils/getSessionWalletAddress";
import { checkIfOwnerOrAdmin } from "utils/validation/checkIfOwnerOrAdmin";
import { checkIfValidCollectionNameAndFields } from "utils/validation/checkIfValidCollectionNameAndFields";
import { bulkValidate } from "utils/formSubmitValidation";

async function updateTeam(postData) {
	try {
		let projectRole;
		const possibleCollections = ["sales", "airdrops", "staking"];
		const address = await getSessionWalletAddress(postData);
		let { collection, itemId, newValues } = postData.body;

		const newValuesObj = {
			toBuyAmount: newValues.toBuyAmount,
			status: newValues.status,
		};

		if (possibleCollections.indexOf(collection) == -1) {
			console.log(`wrong collection, ${collection}UserData`);
			throw new Error("Wrong collection, please try again later");
		}

		let validation = bulkValidate(newValuesObj);

		if (validation.length > 1) {
			throw new Error("Couldn't validate the fields, please try again later");
		}

		let participantItemFromDb = await findDocuments(`${collection}UserData`, {
			_id: new ObjectId(itemId),
		});

		if (!participantItemFromDb || participantItemFromDb.length != 1) {
			throw new Error("Couldn't update, please try again later");
		}

		const collectionItemFromDb = await findDocuments(
			`${collection == "sales" ? "tokenSales" : collection}Data`,
			{
				_id: participantItemFromDb[0].relatedItemId,
			}
		);

		projectRole = await checkIfOwnerOrAdmin(
			collection == "sales" ? "tokenSales" : collection,
			collectionItemFromDb[0],
			address
		);

		const data = {
			status: newValues.status,
			"rewards.toBuy": parseFloat(newValues.toBuyAmount),
		};

		let updatedField = await updateDocument(
			`${collection}UserData`,
			{ _id: new ObjectId(itemId) },
			data
		);

		if (updatedField?.modifiedCount == 0) {
			throw new Error("We couldn't update the fields, please try again later");
		}

		return {
			err: false,
		};
	} catch (error) {
		return {
			err: true,
			error: error.message,
		};
	}
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json(await updateTeam(req));
}

export default errorHandlerMiddleware(handler);
