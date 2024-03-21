import type { NextApiRequest, NextApiResponse } from "next";
import { insertMultipleDocuments } from "utils/back/db/crud";

const airdropAry = [
	{
		name: "twitterAirdrop",
		tokenName: "Pickle",
		breakRewardInParts: 30,
		ownerAddress: "4HxBz8uYLj29Cszf8wna9KrzZfaKNt1M9EGX5fMygeCm",
		tookHoldersSnapshot: false,
		isActive: false,
		partsTimeFrame: 24,
		fullAmount: 510205,
		partAmount: Math.floor(510260 / 30),
		unlockDate: /*new Date(2024, 3, 20, 0)*/ new Date(2023, 3, 18, 0),
		amountPartsReleased: 0,
		participantsQty: 0,
	},
];

async function createAirdropRegistry() {
	try {
		let insertItems = await insertMultipleDocuments(airdropAry, "airdrops");
		return {
			err: false,
			result: {
				success: insertItems ? true : false,
			},
		};
	} catch (error) {
		return {
			err: true,
			error: "we couldn't finish the process, please try again later",
		};
	}
}

export default createAirdropRegistry;
