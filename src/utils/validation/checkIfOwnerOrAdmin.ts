import { ObjectId } from "mongodb";
import { findDocuments } from "utils/back/db/crud";

async function checkIfOwnerOrAdmin(collection, collectionItemFromDb, address) {
	if (!collectionItemFromDb) {
		console.log(`denied: no item found on collection ${collection}`);
		throw new Error("We couldn't update the item, please try again later");
	}

	if (collectionItemFromDb.owner == address) {
		return {
			isOwner: true,
			isAdmin: false,
		};
	}

	if (!collectionItemFromDb.teamId) {
		console.log(
			`denied: is not the owner and there's no team assigned ${collection}`
		);
		throw new Error(
			`Sorry, you don't have the permissions to update this item`
		);
	}

	let teamItemFromDb = await findDocuments(`teamsData`, {
		_id: new ObjectId(collectionItemFromDb.teamId),
	});

	if (teamItemFromDb.admins.indexOf(address) == -1) {
		console.log(
			`denied: neither the owner nor the admin of the project ${collection}`
		);
		throw new Error(
			`Sorry, you don't have the permissions to update this item`
		);
	}

	return {
		isOwner: false,
		isAdmin: false,
	};
}

export { checkIfOwnerOrAdmin };
