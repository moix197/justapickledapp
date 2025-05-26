import type { NextApiRequest, NextApiResponse } from "next";
import {
	getUserFromDb,
	getVaultDataFromDb,
	getSaleDataFromDb,
	getTokenDataFromDb,
} from "services/db/sales";
import { sendAndConfirmTransactionToNetwork } from "utils/transactions";
import { errorHandlerMiddleware } from "utils/back/errorHandlerMiddleware";
import { confirmRewardsSentOnDb } from "services/db/rewards";
import { bulkValidate } from "utils/formSubmitValidation";

//MISSING TO CHECK THE AMOUNT WITH THE TRANSACTION IN CASE IT'S A JUP TRANSACTION
async function sendRewardsTransaction(req) {
	try {
		const { transaction, saleId, address } = req.body;

		const validation = bulkValidate({
			objectId: saleId,
			walletsAry: address,
		});

		if (validation.length > 0) {
			throw new Error(validation[0].result[0].message);
		}

		const txId = await sendAndConfirmTransactionToNetwork(transaction);
		const saleData = await getSaleDataFromDb(saleId);
		const vaultData = await getVaultDataFromDb(saleData.result.vaultId);
		const tokenData = await getTokenDataFromDb(vaultData.result.tokenMint);

		/*
			TO DO ASAP: ATM THIS IS JUST LOOPING OVER THE "SINGLE RELEASE" FEATURE,
			THERE'S NEED TO OPTIMIZE THIS AS FOR EXAMPLE WEN CAN AVOID RUNING
			EACH USER SEPARATELY TROUGH THE TRANSACTION AMOUNTS ARRAY, SAME FOR
			INSERTING IN THE DB, WE'RE INSERTING ONE BY ONE INSTEAD OF BULK INSERT
			SORRY, THERE'S NO TIME NOW TO OPTIMIZE THIS BUT IT'S PARAMOUNT TO DO
			IT ASAP.

			it is also pending that instead of getting the addreses from the front end
			we can only check the transaction and update the values that match the addreses
			in our DB ----- to check
		*/
		let errorsAry = [];

		for (const item of address) {
			try {
				const userData = await getUserFromDb(item, saleData.result._id);
				const confirmedDbTransaction = await confirmRewardsSentOnDb({
					vaultData: vaultData.result,
					tokenData: tokenData.result,
					userData: userData.result,
					//tx: "4DZ5PjyJLVnPkUN5gg3SPRNHsiVuANMgvJHZgGNTQN57RuaYYKqzsGqfb6q7YdMvUgYrm2r1MphhLm5g2JQ8tKm4",
					tx: txId,
					saleId: saleData.result._id,
				});
			} catch (error) {
				errorsAry.push(error.message);
			}
		}

		if (errorsAry.length > 0) {
			throw new Error(
				`We found some erros while performing the operation, please check: ${errorsAry.join(
					" - "
				)}`
			);
		}

		return {
			err: false,
			message: "Rewards sent successfully",
			//data: txId,
		};
	} catch (error) {
		return {
			err: true,
			error: error.message,
		};
	}
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json(await sendRewardsTransaction(req));
}

export default errorHandlerMiddleware(handler);
