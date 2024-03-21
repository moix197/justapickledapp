import type { NextApiRequest, NextApiResponse } from "next";
import { findDocuments, updateDocument } from "utils/back/db/crud";

async function setAirdropToActive() {
	try {
		let airdropData = await findDocuments("airdrops", {
			name: "twitterAirdrop",
		});

		if (airdropData[0].isActive) {
			return {
				err: true,
				error: "Airdrop is already active",
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
			{ name: "twitterAirdrop" },
			{
				isActive: true,
			}
		);

		return {
			err: false,
			result: {
				value: "Airdrop is now active",
			},
		};
	} catch (error) {
		return {
			err: true,
			error: "we couldn't finish the process, please try again later",
		};
	}
}

export default setAirdropToActive;
