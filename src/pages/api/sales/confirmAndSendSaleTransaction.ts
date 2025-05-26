import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import {
	getUserFromDb,
	getVaultDataFromDb,
	confirmUserPurchaseOnDb,
} from "services/db/sales";
import { findDocuments } from "utils/back/db/crud";
import { performSaleUserSecurityChecks } from "utils/sales/performSaleUserSecurityChecks";
import { sendAndConfirmTransactionToNetwork } from "utils/transactions";
import { errorHandlerMiddleware } from "utils/back/errorHandlerMiddleware";
import { VersionedTransaction } from "@solana/web3.js";
import { toBuffer } from "utils/toBuffer";

//MISSING TO CHECK THE AMOUNT WITH THE TRANSACTION IN CASE IT'S A JUP TRANSACTION
async function confirmAndSendSaleTransaction(req) {
	try {
		const { transaction, saleId, address, amount } = req.body;

		const dbSale = await findDocuments("tokenSalesData", {
			_id: new ObjectId(saleId),
		});
		const userFromDb = await getUserFromDb(address, dbSale[0]._id);
		const vaultFromDb = await getVaultDataFromDb(dbSale[0].vaultId);

		await performSaleUserSecurityChecks(
			userFromDb.result,
			dbSale[0],
			amount,
			vaultFromDb.result
		);
		const txId = await sendAndConfirmTransactionToNetwork(transaction);

		let isTransactionToSwap;

		if (dbSale[0].type == "regular" && dbSale[0].price.type == "market") {
			isTransactionToSwap = true;
		}

		let confirmedTransaction = await confirmUserPurchaseOnDb(
			dbSale[0],
			userFromDb.result,
			vaultFromDb.result,
			address,
			txId,
			//"5sgY6UHA62d2LMd94McvNKzi2HAq8RohabpcoHsnDGnBYpUNoDwpryTVRXFC9f3eJxUJouWAKGNVh7JPLF8gkWe5",
			isTransactionToSwap
		);

		if (confirmedTransaction.err) {
			throw new Error(confirmedTransaction.error);
		}

		return {
			err: false,
			message: "We've registered your purchase successfully",
			data: confirmedTransaction,
		};
	} catch (error) {
		return {
			err: true,
			error: error.message,
		};
	}
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json(await confirmAndSendSaleTransaction(req));
}

export default errorHandlerMiddleware(handler);
