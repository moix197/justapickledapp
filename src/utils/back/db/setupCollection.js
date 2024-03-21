import { connectToDatabase } from "utils/back/db/db";

async function setupCollection({ required, properties, name, unique = null }) {
	const db = await connectToDatabase();
	// Check if the collection already exists
	const collections = await db.collections();
	const collectionExists = collections.some(
		(collection) => collection.collectionName === name
	);

	if (!collectionExists) {
		// Define collection schema and validation options
		const collectionOptions = {
			validator: {
				$jsonSchema: {
					bsonType: "object",
					required,
					properties,
				},
			},
		};

		// Create the collection with schema validation enabled
		await db.createCollection(name, collectionOptions);
		if (unique) {
			await db.collection(name).createIndex({ wallet: 1 }, { unique: true });
		}
	}
}

export { setupCollection };
