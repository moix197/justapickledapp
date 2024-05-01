import { ObjectId } from "mongodb";
import { findDocuments } from "utils/back/db/crud";

async function checkifVaultIsLocked(id, address) {
	try {
		let vaultFromDb = await findDocuments("vaultData", {
			_id: new ObjectId(id),
			owner: address,
		});

		if (vaultFromDb.length == 0) {
			throw new Error("Couldn't assign the vault, please try again later");
		} else if (vaultFromDb[0].status == "locked") {
			throw new Error(
				"The vault you're trying to use is associated to a locked item, please select a different one and try again"
			);
		}

		return {
			err: false,
		};
	} catch (error) {
		return {
			err: true,
			error: error,
		};
	}
}

export { checkifVaultIsLocked };
