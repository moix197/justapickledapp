import { connectToDatabase } from "utils/back/db/db";

async function setupCollection({
	required,
	properties,
	name,
	index = null,
	unique = null,
	update = false,
}) {
	try {
		const { db } = await connectToDatabase();
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
			if (index) {
				await db.collection(name).createIndex(index, { unique: unique });
			}
			return {
				err: false,
				message: `Collection ${name} created successfully DB`,
			};
		}

		if (collectionExists && update) {
			db.command({
				collMod: name,
				validator: {
					$jsonSchema: {
						bsonType: "object",
						required,
						properties,
					},
				},
				validationAction: "error", // or "warn" to allow existing data that doesn't match the new schema
			});

			return {
				err: false,
				message: `Collection ${name} updated successfully DB`,
			};
		}

		return {
			err: true,
			message: `Collection ${name} already exists in the DB`,
		};
	} catch (error) {
		return {
			err: true,
			message: `Collection ${name} already exists in the DB`,
			def: error,
		};
	}
}

export { setupCollection };
