import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { updateDocument } from "utils/back/db/crud";
import { getSessionWalletAddress } from "utils/getSessionWalletAddress";

async function updateStatus(postData) {
	try {
		const possibleActiveValues = ["airdrops", "tokenSales"];
		if (
			!postData?.body?.collection ||
			possibleActiveValues.indexOf(postData.body.collection) == -1
		) {
			throw new Error("Invalid values, please try again later");
		}

		const address = await getSessionWalletAddress(postData);

		let statusUpdateResults = await updateDocument(
			`${postData.body.collection}Data`,
			{ _id: new ObjectId(postData.body.id), owner: address, status: "locked" },
			{ isActive: postData.body.status ? false : true }
		);

		if (statusUpdateResults?.modifiedCount == 0) {
			throw new Error("Your sale must be locked before it can be activated");
		}

		return {
			err: false,
			success: "Status updated",
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
	res.status(200).json(await updateStatus(req));
}
