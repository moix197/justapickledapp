import type { NextApiRequest, NextApiResponse } from "next";
import { errorHandlerMiddleware } from "utils/back/errorHandlerMiddleware";
import {
	getSaleDataFromDb,
	getTokenDataFromDb,
	getUserFromDb,
	getVaultDataFromDb,
	getVestingDataFromDb,
} from "services/db/sales";
import { getSessionWalletAddress } from "utils/getSessionWalletAddress";
import { checkIfOwnerOrAdmin } from "utils/validation/checkIfOwnerOrAdmin";
import {
	createRewardsSendTransaction,
	createVestingTransaction,
} from "utils/transactions";
import { bulkValidate } from "utils/formSubmitValidation";
import {
	performUserRewardsSecurityCheck,
	performVaultRewardsSecurityCheck,
} from "utils/general";

async function generateRewardsTransaction(req) {
	try {
		const address = await getSessionWalletAddress(req);
		const { saleId, userAddress } = req.query;

		/*const validation = bulkValidate({
			objectId: saleId,
			walletAddress: userAddress,
		});

		if (validation.length > 0) {
			throw new Error(validation[0].result[0].message);
		}
		*/
		let saleData = await getSaleDataFromDb(saleId);

		//checkIfOwnerOrAdmin("tokenSales", saleData.result, address);

		let vaultData = await getVaultDataFromDb(saleData.result.vaultId);
		let vestingData = await getVestingDataFromDb(saleData.result.vestingId);
		let tokenData = await getTokenDataFromDb(vaultData.result.tokenMint);
		let userData = await getUserFromDb(userAddress, saleId);

		performUserRewardsSecurityCheck(userData.result);
		performVaultRewardsSecurityCheck(vaultData.result);

		/*let transaction = await createRewardsSendTransaction(
			vaultData.result,
			tokenData.result,
			userData.result
		);*/

		let transaction = await createVestingTransaction(
			vestingData.result,
			tokenData.result,
			userData.result,
			vaultData.result
		);

		return {
			err: false,
			result: {
				transaction: transaction,
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
