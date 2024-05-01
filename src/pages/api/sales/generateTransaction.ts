import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSwapTransactionFromJup } from "services/swap/getSwapTransactionFromJup";
import { findDocuments } from "utils/back/db/crud";
import { performSaleUserSecurityChecks } from "utils/sales/performSaleUserSecurityChecks";
import { errorHandlerMiddleware } from "utils/back/errorHandlerMiddleware";
import {
	getTokenDataFromDb,
	getUserFromDb,
	getVaultDataFromDb,
} from "services/db/sales";
import { createSalePurchaseTransaction } from "utils/transactions";

async function generateTransaction(req) {
	try {
		const { saleId, amount, quote, address } = req.body;

		const dbSale = await findDocuments("tokenSalesData", {
			_id: new ObjectId(saleId),
		});
		const userFromDb = await getUserFromDb(address, dbSale[0]._id);
		const vaultFromDb = await getVaultDataFromDb(dbSale[0].vaultId);
		const tokenFromDb = await getTokenDataFromDb(vaultFromDb.result.tokenMint);

		await performSaleUserSecurityChecks(
			userFromDb.result,
			dbSale[0],
			amount,
			vaultFromDb.result
		);

		if (dbSale[0].type == "regular" && dbSale[0].price.type == "market") {
			const response = await getSwapTransactionFromJup(quote, address);

			if (response?.err) {
				throw new Error(
					"We couldn't proceed the transaction, please try again later"
				);
			}

			return response;
		} else if (
			(dbSale[0].type == "presale" || dbSale[0].type == "regular") &&
			dbSale[0].price.type == "fixed"
		) {
			let response = await createSalePurchaseTransaction(
				dbSale[0],
				address,
				vaultFromDb.result,
				amount,
				tokenFromDb.result
			);

			return {
				err: false,
				result: response,
			};
		}

		throw new Error(
			"We couldn't generate the transaction, please try again later"
		);
	} catch (error) {
		return {
			err: true,
			error: error.message,
		};
	}
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json(await generateTransaction(req));
}

export default errorHandlerMiddleware(handler);
