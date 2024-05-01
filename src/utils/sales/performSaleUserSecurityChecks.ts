import { throws } from "assert";
import { ObjectId } from "mongodb";
import { findDocuments } from "utils/back/db/crud";

async function performSaleUserSecurityChecks(
	userFromDb,
	saleData,
	amount,
	vaultData
) {
	if (
		(saleData.target == "private" && !userFromDb) ||
		(userFromDb && userFromDb.status != "readyToClaim")
	) {
		throw new Error(
			"it seems like you can't take part on this sale, please try a different one"
		);
	}

	if (saleData.status != "locked") {
		throw new Error("this sale is not active");
	}

	if (
		saleData.target == "private" &&
		userFromDb.rewards.toSend >= userFromDb.rewards.toBuy
	) {
		throw new Error("You can't buy more of this sale");
	}

	if (vaultData.amount.left <= 0) {
		throw new Error("There's no more tokens left in the sale");
	}

	/*if (
		saleData.target == "private" &&
		amount > userFromDb.rewards.toBuy - userFromDb.rewards.bought
	) {
		throw new Error(
			`You can buy a max of ${
				userFromDb.rewards.toBuy - userFromDb.rewards.bought
			} tokens`
		);
	}*/
}

export { performSaleUserSecurityChecks };
