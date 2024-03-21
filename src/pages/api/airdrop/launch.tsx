import type { NextApiRequest, NextApiResponse } from "next";
import createAirdropRegistry from "utils/airdrop/createAirdropRegistry";
import createUsersRegistry from "utils/airdrop/createUsersRegistry";
import createAirdropDb from "utils/airdrop/exDbCreat";
import getTokenAccountsForMint from "utils/airdrop/getTokenAccountsForMint";
import setAirdropToActive from "utils/airdrop/setAirdropActive";
import { delay } from "utils/delay";

async function launchAirdrop() {
	try {
		let results = {
			createDb: {},
			createAirdrop: {},
			usersAirdrop: {},
			setActive: {},
			getTokensAcc: {},
		};

		let createDB = await createAirdropDb();
		await delay(1000);
		results.createDb = createDB;

		let createAirdrop = await createAirdropRegistry();
		await delay(1000);
		results.createAirdrop = createAirdrop;

		let usersAirdrop = await createUsersRegistry();
		await delay(1000);
		results.usersAirdrop = usersAirdrop;

		let setActive = await setAirdropToActive();
		await delay(1000);
		results.setActive = setActive;

		let getTokensAcc = await getTokenAccountsForMint();
		await delay(1000);
		results.getTokensAcc = getTokensAcc;

		return {
			err: false,
			result: {
				value: "Airdrop created successfully",
				details: results,
			},
		};
	} catch (error) {
		return {
			err: true,
			error: error,
		};
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await launchAirdrop());
}
