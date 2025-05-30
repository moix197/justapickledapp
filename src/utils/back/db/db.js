// utils/db.js

import { MongoClient } from "mongodb";

//const uri = "mongodb://Admin:%4019721562aA@109.123.250.102:27017/"; // MongoDB URI

//const uri = "mongodb://Admin:%4019721562aA@localhost:27017"; // MongoDB URI
//const uri = "mongodb://localhost:27017";

const dbName = "pickle_db"; // Name of your MongoDB database

let client;

async function connectToDatabase() {
	if (!client) {
		client = new MongoClient(process.env.DB_CONN_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		await client.connect();
	}
	return { db: client.db(dbName), client: client };
}

export { connectToDatabase };
