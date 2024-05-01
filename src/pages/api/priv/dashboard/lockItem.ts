import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { getVaultDataFromNetwork } from "services/db/vaults";
import {
	findDocuments,
	updateDocumentWithTransaction,
} from "utils/back/db/crud";
import { getSessionWalletAddress } from "utils/getSessionWalletAddress";

async function lockItem(postData) {
	try {
		const address = await getSessionWalletAddress(postData);
		const { collection, id } = postData.body;
		const possibleCollectionValues = ["sales", "airdrops", "staking"];

		if (possibleCollectionValues.indexOf(collection) == -1) {
			throw new Error("Wrong collection, please check and try again later");
		}

		const collectionName = `${
			collection == "sales" ? "tokenSales" : collection
		}Data`;

		let saleDbDocument = await findDocuments(collectionName, {
			_id: new ObjectId(id),
			owner: address,
		});

		if (saleDbDocument.length == 0) {
			throw new Error("Couldn't update, please try again later");
		}

		let vaultDbDocument = await findDocuments("vaultData", {
			_id: new ObjectId(saleDbDocument[0].vaultId),
			owner: address,
		});

		let tokenDbDocument = await findDocuments("tokensData", {
			address: vaultDbDocument[0].tokenMint,
		});

		let vaultNetworkData = await getVaultDataFromNetwork(
			tokenDbDocument[0].address,
			address,
			tokenDbDocument[0].info.token_program,
			tokenDbDocument[0].info.decimals
		);

		if (
			vaultDbDocument[0].amount.initial - vaultDbDocument[0].amount.sent >
			vaultNetworkData.mintAmountLeft
		) {
			throw new Error(
				"You can't lock the sale because the amount of tokens in the vault are not enough to cover the initial sale amount"
			);
		}

		let collectionItemData = {
			collection: collectionName,
			filter: { _id: new ObjectId(id), owner: address },
			update: { status: "locked" },
		};

		let vaultData = {
			collection: "vaultData",
			filter: { _id: new ObjectId(saleDbDocument[0].vaultId), owner: address },
			update: { status: "locked" },
		};

		let updatedDoc = await updateDocumentWithTransaction([
			vaultData,
			collectionItemData,
		]);

		if (updatedDoc.err) {
			throw new Error(updatedDoc.error);
		}

		return {
			err: false,
			success: "Team updated",
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
	res.status(200).json(await lockItem(req));
}
