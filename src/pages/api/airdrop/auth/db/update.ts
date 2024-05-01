import type { NextApiRequest, NextApiResponse } from "next";
import { updateDocument } from "utils/back/db/crud";
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

async function update(postData) {
	try {
		const token = await getToken({ req: postData, secret });

		if (!token || !token.sub)
			return {
				err: true,
				error: "Unauthenticated",
			};

		let tokenVal =
			postData.body.name == "airdrops"
				? { ownerAddress: token.sub }
				: { wallet: token.sub };

		let ownerAirdrops = await updateDocument(
			postData.body.name,
			{ ...postData.body.filter, ...tokenVal },
			{ ...postData.body.update }
		);

		return {
			err: false,
			result: ownerAirdrops,
		};
	} catch (error) {
		return {
			err: true,
			error: "We couldn't find any info, please try again later",
		};
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await update(req));
}
