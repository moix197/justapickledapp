import type { NextApiRequest, NextApiResponse } from "next";
import { findDocuments, updateDocument } from "utils/back/db/crud";
import { checkTimePassed } from "utils/checkTimePassed";

async function createUsersRegistry() {
	try {
		let updatedItems = [];
		let airdropUsers = await findDocuments("twitter_airdrop", {});
		let airdropData = await findDocuments("airdrops", {
			name: "twitterAirdrop",
		});

		let timepassed = checkTimePassed(airdropData[0].unlockDate, 24);

		if (
			!timepassed ||
			!airdropData[0].isActive ||
			airdropData[0].amountPartsReleased >= airdropData[0].breakRewardInParts
		) {
			return {
				err: true,
				error: "We cannot perform this action now, please try again later",
			};
		}

		if (
			airdropData[0].amountPartsReleased >= airdropData[0].breakRewardInParts
		) {
			return {
				err: true,
				error: "Max Amount for the airdrop reached, aborting...",
			};
		}

		updateDocument(
			"airdrops",
			{ _id: airdropData[0]._id },
			{
				unlockDate: new Date(),
				amountPartsReleased: airdropData[0].amountPartsReleased + 1,
			}
		);
		for (const item of airdropUsers) {
			let updatedRewards =
				item.rewards.locked > 0
					? {
							available: item.rewards.available + airdropData[0].partAmount,
							sending: item.rewards.sending,
							claimed: item.rewards.claimed,
							locked: item.rewards.locked - airdropData[0].partAmount,
					  }
					: item.rewards;
			let updatedResult = updateDocument(
				"twitter_airdrop",
				{ _id: item._id },
				{ rewards: updatedRewards }
			);

			updatedItems.push(updatedResult);
		}

		return {
			err: false,
			result: {
				updatedItemsQty: updatedItems.length,
			},
		};
	} catch (error) {
		return {
			err: true,
			error: "we couldn't finish the process, please try again later",
		};
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await createUsersRegistry());
}
