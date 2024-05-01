import type { NextApiRequest, NextApiResponse } from "next";
import { errorHandlerMiddleware } from "utils/back/errorHandlerMiddleware";
import {
	getSaleDataFromDb,
	getTokenDataFromDb,
	getUserFromDb,
	getUsersWithRewardsFromDb,
	getVaultDataFromDb,
} from "services/db/sales";
import { getSessionWalletAddress } from "utils/getSessionWalletAddress";
import { checkIfOwnerOrAdmin } from "utils/validation/checkIfOwnerOrAdmin";
import {
	createRewardsSendTransaction,
	createRewardsVersionedTransactionInstructions,
} from "utils/transactions";
import { bulkValidate } from "utils/formSubmitValidation";
import {
	performUserRewardsSecurityCheck,
	performVaultRewardsSecurityCheck,
} from "utils/general";
import { createVersionedTransaction } from "utils/back/createVersionedTransaction";
import { PublicKey } from "@solana/web3.js";

async function generateRewardsTransaction(req) {
	try {
		const address = await getSessionWalletAddress(req);
		const { saleId } = req.query;

		const validation = bulkValidate({
			objectId: saleId,
		});

		if (validation.length > 0) {
			throw new Error(validation[0].result[0].message);
		}

		let saleData = await getSaleDataFromDb(saleId);

		checkIfOwnerOrAdmin("tokenSales", saleData.result, address);

		let vaultData = await getVaultDataFromDb(saleData.result.vaultId);
		let tokenData = await getTokenDataFromDb(vaultData.result.tokenMint);
		let usersData = await getUsersWithRewardsFromDb(saleData.result._id);
		let newAry = [];

		if (usersData.result.length == 0) {
			throw new Error("There's no rewards to be released");
		}

		const loopMaxIndex =
			usersData.result.length < 19 ? usersData.result.length : 19;

		const usersAddress = [];

		for (let index = 0; index < loopMaxIndex; index++) {
			const instructionsAry =
				await createRewardsVersionedTransactionInstructions(
					vaultData.result,
					tokenData.result,
					usersData.result[index]
				);

			usersAddress.push(usersData.result[index].address);
			newAry = [...newAry, ...instructionsAry];
		}

		/*for (const item of usersData.result) {
			const instructionsAry =
				await createRewardsVersionedTransactionInstructions(
					vaultData.result,
					tokenData.result,
					item
				);
			newAry = [...newAry, ...instructionsAry];
		}*/

		//let esteAry = newAry.slice(0, 19);
		const versionedTransaction = await createVersionedTransaction(
			[...newAry],
			new PublicKey(vaultData.result.owner)
		);
		//performUserRewardsSecurityCheck(userData.result);
		//performVaultRewardsSecurityCheck(vaultData.result);

		/*let transaction = await createRewardsSendTransaction(
			vaultData.result,
			tokenData.result,
			userData.result
		);*/

		return {
			err: false,
			result: {
				transaction: versionedTransaction,
				users: usersAddress,
			},
		};
	} catch (error) {
		return {
			err: true,
			error: error.message,
		};
	}
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json(await generateRewardsTransaction(req));
}

export default errorHandlerMiddleware(handler);
