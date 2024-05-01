import { throws } from "assert";
import { connectToDatabase } from "utils/back/db/db";

// Existing imports and connectToDatabase function...

async function insertDocument(collectionName, document) {
	const { db } = await connectToDatabase();
	const collection = db.collection(collectionName);

	const result = await collection.insertOne(document);
	return result;
}

async function insertMultipleDocuments(collectionName, givenItemsAry) {
	const { db } = await connectToDatabase();
	const collection = db.collection(collectionName);

	const result = await collection.insertMany(givenItemsAry);
	return result;
}

async function findDocuments(collectionName, query, sort = {}) {
	const { db } = await connectToDatabase();
	const collection = db.collection(collectionName);
	const documents = await collection.find(query).sort(sort).toArray();
	return documents;
}

async function joinDocuments(collectionName, pipeline) {
	const { db } = await connectToDatabase();
	const collection = db.collection(collectionName);
	const documents = await collection.aggregate(pipeline).toArray();
	return documents;
}

async function updateDocument(
	collectionName,
	filter,
	update,
	customUpdateField = null,
	session = null,
	database = null
) {
	let updateField = { $set: update };
	let db = database;
	if (customUpdateField) {
		updateField = customUpdateField;
	}

	if (!database) {
		let conn = await connectToDatabase();
		db = conn.db;
	}

	const collection = db.collection(collectionName);
	const result = await collection.updateOne(filter, updateField, { session });
	return result;
}

async function updateDocumentWithTransaction(values) {
	const { client, db } = await connectToDatabase();
	const session = client.startSession();
	try {
		session.startTransaction({
			readConcern: { level: "snapshot" },
			writeConcern: { w: "majority" },
		});

		let resultAry = [];
		for (const item of values) {
			let result = await updateDocument(
				item.collection,
				item.filter,
				item.update,
				null,
				session,
				db
			);

			if (!result || result.modifiedCount == 0) {
				throw new Error("We couldn't update the fields");
			}
			resultAry.push(result);
		}

		await session.commitTransaction();
		session.endSession();
		return {
			err: false,
		};
	} catch (error) {
		await session.abortTransaction();
		session.endSession();

		return {
			err: true,
			error: error,
		};
	}
}

async function deleteDocument(collectionName, filter) {
	const { db, client } = await connectToDatabase();
	const collection = db.collection(collectionName);
	const result = await collection.deleteOne(filter);
	await client.close();
	return result;
}

export {
	insertDocument,
	insertMultipleDocuments,
	findDocuments,
	joinDocuments,
	updateDocument,
	deleteDocument,
	updateDocumentWithTransaction,
};
