import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { errorHandlerMiddleware } from "utils/back/errorHandlerMiddleware";
import { findDocuments, updateDocument } from "utils/back/db/crud";
import { getSessionWalletAddress } from "utils/getSessionWalletAddress";
import { checkIfOwnerOrAdmin } from "utils/validation/checkIfOwnerOrAdmin";
import { checkIfValidCollectionNameAndFields } from "utils/validation/checkIfValidCollectionNameAndFields";
import { checkifVaultIsLocked } from "utils/dashboard/db/checkIfVaultIsLocked";

async function updateTeam(postData) {
	try {
		let projectRole;
		const address = await getSessionWalletAddress(postData);
		let { collection, itemId, newValues, collectionToUpdate, updateId } =
			postData.body;

		//1. CHECK IF COLLECTION HAS PARENT

		//2. GET RELATED ITEM FROM THE DATABASE
		let collectionItemFromDb = await findDocuments(`${collection}Data`, {
			_id: new ObjectId(itemId),
		});

		//3. CHECK THAT COLLECTION EXISTS
		if (!collectionItemFromDb || collectionItemFromDb.length != 1) {
			throw new Error("Couldn't update, please try again later");
		}

		//4.CHECK THAT THE FIELDS THAT THE FRONT END PASSED ARE VALID
		// AND CAN BE UPDATED AT THIS STAGE
		// TAKES CARE OF CHECKING IF THE STATUS IS PRE- ACTIVE OR ENDED
		let dbId;

		if (!collectionToUpdate) {
			collectionToUpdate = collection;
			dbId = new ObjectId(itemId);
		} else if (collectionToUpdate) {
			dbId = collectionItemFromDb[0][`${collectionToUpdate}Id`];
		}

		const { collectionFields } = checkIfValidCollectionNameAndFields(
			collectionToUpdate,
			collectionItemFromDb[0].status ? collectionItemFromDb[0].status : "ended", //change to "check"
			newValues
		);

		//5. CHECK IF USER IS OWNER OR ADMIN

		if (collectionFields["vaultId"]) {
			let response = await checkifVaultIsLocked(
				collectionFields["vaultId"],
				address
			);
			if (response.err) {
				throw new Error(response.error);
			}
		}

		projectRole = await checkIfOwnerOrAdmin(
			collection,
			collectionItemFromDb[0],
			address
		);

		let updatedField = await updateDocument(
			`${collectionToUpdate}Data`,
			{ _id: dbId },
			{ ...collectionFields }
		);

		if (updatedField?.modifiedCount == 0) {
			throw new Error("We couldn't update the fields, please try again later");
		}

		//6. NOW THAT WE KNOW THAT THE USER IS ADMIN/OWNER, THE FIELDS PASSED
		//ARE FINE AND THE ITEM EXISTS WE CAN UPDATE IT.
		/*
			COMPARO EL NOMBRE DEL FIELD CON UNA LISTA Y SI HAY ALGUN ITEM
			QUE AMERITE EL ESTADO PRE, FILTRO LOS ITEMS DE LA DB POR ESE VALOR
			TAMBIEN
		*/

		return {
			err: false,
			success: `${collectionToUpdate} Updated`,
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
