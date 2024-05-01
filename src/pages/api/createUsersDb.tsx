import type { NextApiRequest, NextApiResponse } from "next";
import createUsersDb from "utils/db/users/createDb";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

async function createDb(req, res) {
	try {
		const token = await getToken({ req, secret });

		if (!token || !token.sub)
			return res.send({
				error: "User wallet not authenticated",
			});

		let usersResult = createUsersDb();

		return usersResult;
	} catch (error) {
		return {
			err: true,
			error:
				"There was an issue creating the DB, they may already exists, please try again later",
		};
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await createDb(req, res));
}
