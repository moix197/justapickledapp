import type { NextApiRequest, NextApiResponse } from "next";
import { createTeam } from "utils/dashboard/db/createTeam";

async function createVault(req) {
	try {
		const { admins, name } = req.body;

		let teamResponse = await createTeam(name, admins, req);

		if (teamResponse.err) {
			throw new Error(teamResponse.error);
		}

		return {
			err: false,
			message: "Team created successfully",
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
	res.status(200).json(await createVault(req));
}
