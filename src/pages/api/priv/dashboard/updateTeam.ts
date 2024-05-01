import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { findDocuments, updateDocument } from "utils/back/db/crud";
import { getSessionWalletAddress } from "utils/getSessionWalletAddress";

async function updateTeam(postData) {
	try {
		const address = await getSessionWalletAddress(postData);

		let itemFromDb = findDocuments("teamsData", { _id: postData.id });

		if (itemFromDb[0].owner != address) {
			throw new Error(
				"The team you're trying to assign is not yours, please create or assign a different team"
			);
		}

		let statusUpdateResults = await updateDocument(
			`${postData.body.collection}Data`,
			{ _id: new ObjectId(postData.body.id), owner: address },
			{ isActive: postData.body.status ? false : true }
		);

		if (statusUpdateResults?.modifiedCount == 0) {
			throw new Error("Couldn't update the status");
		}

		return {
			err: false,
			success: "Team updated",
		};
	} catch (error) {
		return {
			err: true,
			error: error.message,
		};
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await updateTeam(req));
}
