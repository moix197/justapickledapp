import { TOKEN_2022_PROGRAM_ID, getAccount } from "@solana/spl-token";
import type { NextApiRequest, NextApiResponse } from "next";
import { sellAssociatedAccountPublicKey } from "utils/baseValues";
import { connection } from "utils/connection";

async function confirmTransaction() {
	const startingAmount = 1009354891598656;

	let account = await getAccount(
		connection,
		sellAssociatedAccountPublicKey,
		"confirmed",
		TOKEN_2022_PROGRAM_ID
	);

	return {
		amount: {
			begin: startingAmount,
			left: Number(account.amount),
			sold: startingAmount - Number(account.amount),
		},
	};
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await confirmTransaction());
}
