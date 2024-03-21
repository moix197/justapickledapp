import { connectToDatabase } from "utils/back/db/db";

// Existing imports and connectToDatabase function...

async function insertDocument(collectionName, document) {
	const db = await connectToDatabase();
	const collection = db.collection(collectionName);
	const result = await collection.insertOne(document);
	return result;
}

async function insertMultipleDocuments(givenItemsAry, collectionName) {
	let resultsAry = [];
	for (const item of givenItemsAry) {
		let result = await insertDocument(collectionName, item);
		resultsAry.push(result);
	}

	return resultsAry;
}

async function findDocuments(collectionName, query) {
	const db = await connectToDatabase();
	const collection = db.collection(collectionName);
	const documents = await collection.find(query).toArray();
	return documents;
}

async function updateDocument(collectionName, filter, update) {
	try {
		const db = await connectToDatabase();
		const collection = db.collection(collectionName);
		const result = await collection.updateOne(filter, { $set: update });
		return result;
	} catch (error) {
		console.log(error);
	}
}

async function deleteDocument(collectionName, filter) {
	const db = await connectToDatabase();
	const collection = db.collection(collectionName);
	const result = await collection.deleteOne(filter);
	return result;
}

export {
	insertDocument,
	insertMultipleDocuments,
	findDocuments,
	updateDocument,
	deleteDocument,
};
