import { ObjectId } from "mongodb";
import {
	findDocuments,
	insertDocument,
	updateDocument,
} from "utils/back/db/crud";
import { delay } from "utils/delay";
import { connection } from "utils/back/connection";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { convertNotationToNumber } from "utils/manageDecimals";
import { checkTransactionAgainstVaultAndGetAmount, updateQty } from "./general";

//MISSING CHECKING IF THE USER EXISTS IN THE DB IF NOT CREATE IT

async function confirmUserPurchaseOnDb(
	saleData,
	userData,
	vaultData,
	userAddress,
	txId,
	isSwapTransaction
) {
	let result;
	const blockchainTransData: any = await connection.getParsedTransaction(txId, {
		maxSupportedTransactionVersion: 0,
	});

	/*blockchainTransData?.transaction?.message?.instructions[0]?.parsed?.info
			?.tokenAmount?.uiAmount;*/

	const { transactionAmount: transactionAmount, ...transactionValueObj } =
		checkTransactionAgainstVaultAndGetAmount({
			transactionData: blockchainTransData,
			tokenToCheck: vaultData.acceptedTokens[0].address,
			sourceAddress: userAddress,
			destinationAddress: vaultData.owner,
			isSwapTransaction,
		});

	if (transactionValueObj.err) {
		return transactionValueObj;
	}

	console.log("transactionAmount");
	console.log(transactionAmount);

	const finalAmounts = await calculatePurchaseRelatedAmounts(
		convertNotationToNumber(transactionAmount, 6),
		saleData,
		userData,
		vaultData
	);

	if (userData) {
		result = await addValueToExistingUserInDb(saleData._id, userAddress, {
			"rewards.bought": finalAmounts.bought,
			"rewards.toSend": finalAmounts.toSend,
			"rewards.locked": finalAmounts.locked,
		});
	} else {
		const token = await getTokenDataFromDb(vaultData.tokenMint);

		result = await addSaleUserToDb(
			saleData._id,
			token.result.info.token_program,
			{
				mintTokenAddress: vaultData.tokenMint,
				relatedItemId: new ObjectId(saleData._id),
				address: userAddress,
				bought: finalAmounts.bought,
				toSend: finalAmounts.toSend,
				locked: finalAmounts.locked,
			}
		);
	}

	if (result.err) {
		return result;
	}

	let transactionDb = await createTransactionOnDb({
		userAddress: userAddress,
		saleId: saleData._id,
		amount: finalAmounts.bought,
		tx: txId,
		type: "userToVault",
		linkedToCollection: "tokenSale",
	});

	if (transactionDb.err) {
		return transactionDb;
	}

	let vaultUpdate = await updateVaultValues(vaultData._id, {
		"amount.left": -finalAmounts.removeFromPool,
		"amount.received": finalAmounts.goingToVault,
	});

	if (vaultUpdate.err) {
		return vaultUpdate;
	}

	return {
		err: false,
		error: "",
	};
}

async function createTransactionOnDb({
	userAddress,
	saleId,
	amount,
	tx,
	type,
	linkedToCollection,
}) {
	const data = {
		address: userAddress,
		tx: tx,
		status: "done",
		type: type,
		time: new Date(),
		amount: amount,
		linkedTo: {
			type: linkedToCollection,
			id: new ObjectId(saleId),
		},
	};

	let response = await insertDocument("transactionsData", data);

	if (response.modifiedCount == 0) {
		return {
			err: true,
			error: "Couldn't create the transaction in the DB",
		};
	}

	return {
		err: false,
	};
}

async function calculatePurchaseRelatedAmounts(
	amount,
	saleData,
	userData,
	vaultData
) {
	const vestingData = await getVestingDataFromDb(saleData.vestingId);
	let rewardAmount;
	let amountBought = amount;
	let goingToVault = amount;

	//agregar acá el vault sería
	// amountBought + userData.rewards.bought >  vault.initial - vault
	/*if (amountBought + userData.rewards.bought > userData.rewards.toBuy) {
		amountBought = userData.rewards.toBuy - userData.rewards.bought;
		goingToVault = userData.rewards.toBuy - userData.rewards.bought;
	}*/

	//TO DO: THERE IS A POSSIBLE CASE WHERE IF THE AMOUNT LEFT IS
	//I.E 10 USD and there's 2 10 USD transactions going at the same time
	// one of them is going to be invalidated, so be carefull
	//this is gonna need to be checked by hand now
	// but should have priority when I have the chance
	// ATM you should be able the bought amount and the amount as received
	//in the vault but the user WONT get the rewards
	//this is by design while we have more time to check.
	if (saleData.price.type == "market" && saleData.type == "regular") {
		rewardAmount = (amountBought / 100) * saleData.price.extra;
		goingToVault = 0;
	} else if (saleData.price.type == "market" && saleData.type == "presale") {
		rewardAmount = (amountBought / 100) * (100 + saleData.price.extra);
	} else {
		rewardAmount = amountBought / saleData.price.amount;
	}

	if (userData && userData.rewards.toSend >= userData.rewards.toBuy) {
		rewardAmount = 0;
		amountBought = 0;
		rewardAmount = 0;
	} else if (
		userData &&
		userData.rewards.toSend + rewardAmount > userData.rewards.toBuy
	) {
		rewardAmount = userData.rewards.toBuy - userData.rewards.toSend;
	}

	if (rewardAmount > vaultData.amount.left) {
		rewardAmount = vaultData.amount.left;
	}

	if (vestingData.result.parts <= 0) {
		return {
			bought: amountBought,
			toSend: rewardAmount,
			locked: 0,
			removeFromPool: rewardAmount,
			goingToVault: goingToVault,
		};
	}

	return {
		bought: amountBought,
		toSend: 0,
		locked: rewardAmount,
		removeFromPool: rewardAmount,
		goingToVault: goingToVault,
	};
}

async function addValueToExistingUserInDb(itemId, address, updateData) {
	let response = await updateDocument(
		"salesUserData",
		{
			relatedItemId: new ObjectId(itemId),
			address: address,
		},
		false,
		{
			$set: { "tokenAccount.value": true },
			$inc: updateData,
		}
	);

	if (!response || response?.modifiedCount == 0) {
		return {
			err: true,
			error:
				"Something went wrong while processing the transaction, please try again later or contact our support for more information",
		};
	}
	return response;
}

async function addSaleUserToDb(
	saleId,
	tokenProgram,
	{
		mintTokenAddress,
		relatedItemId,
		address,
		toClaim = 0,
		claimed = 0,
		toBuy = 0,
		bought = 0,
		locked = 0,
		toSend = 0,
		sending = 0,
		sent = 0,
	}
) {
	const tokenAccount = await getAssociatedTokenAddress(
		new PublicKey(mintTokenAddress),
		new PublicKey(address),
		false,
		new PublicKey(tokenProgram)
	);

	//const userHasTokenAccount = await connection.getAccountInfo(tokenAccount);

	let userData = createSaleParticipantData({
		relatedItemId,
		address,
		toClaim,
		claimed,
		toBuy,
		bought,
		locked,
		toSend,
		sending,
		sent,
		hasTokenAccount: true,
		tokenAccountAddress: tokenAccount,
	});

	let response = await insertDocument("salesUserData", userData);

	if (response.insertedId) {
		await updateQty("tokenSales", saleId, 1);
	}

	return response;
}

function createSaleParticipantData({
	address,
	relatedItemId,
	status = "readyToClaim",
	toClaim = 0,
	claimed = 0,
	toBuy = 0,
	bought = 0,
	toSend = 0,
	sending = 0,
	sent = 0,
	locked = 0,
	hasTokenAccount,
	tokenAccountAddress,
}) {
	return {
		address: address,
		relatedItemId: new ObjectId(relatedItemId),
		status: status,
		rewards: {
			toClaim: toClaim,
			claimed: claimed,
			toBuy: toBuy,
			bought: bought,
			toSend: toSend,
			sending: sending,
			sent: sent,
			locked: locked,
		},
		tokenAccount: {
			value: hasTokenAccount,
			address:
				typeof tokenAccountAddress === "string"
					? tokenAccountAddress
					: tokenAccountAddress.toString(),
		},
	};
}

async function getUserFromDb(address, relatedItemId) {
	let user = await findDocuments("salesUserData", {
		address: address,
		relatedItemId: new ObjectId(relatedItemId),
	});

	return {
		err: false,
		result: user[0],
	};
}

async function getUsersWithRewardsFromDb(relatedItemId) {
	let users = await findDocuments("salesUserData", {
		relatedItemId: new ObjectId(relatedItemId),
		"rewards.toSend": { $gt: 0 },
		"tokenAccount.value": true,
	});

	return {
		err: false,
		result: users,
	};
}

async function getVaultDataFromDb(vaultId) {
	let vault = await findDocuments("vaultData", { _id: new ObjectId(vaultId) });

	return {
		err: false,
		result: vault[0],
	};
}

async function getSaleDataFromDb(SaleId) {
	let vault = await findDocuments("tokenSalesData", {
		_id: new ObjectId(SaleId),
	});

	return {
		err: false,
		result: vault[0],
	};
}

async function getTokenDataFromDb(tokenAddress) {
	let token = await findDocuments("tokensData", { address: tokenAddress });

	return {
		err: false,
		result: token[0],
	};
}

async function getVestingDataFromDb(vestingId) {
	let vesting = await findDocuments("vestingData", {
		_id: new ObjectId(vestingId),
	});

	return {
		err: false,
		result: vesting[0],
	};
}

async function updateVaultValues(vaultId, data) {
	let updateDoc = await updateDocument(`vaultData`, { _id: vaultId }, false, {
		$inc: data,
	});

	if (updateDoc.modifiedCount == 0) {
		console.log(
			`IMPORTANT: vaultData not updated VaultId:${vaultId}, data:${data}`
		);
		return {
			err: true,
			error: "We couldn't update the vaultData",
		};
	}

	return {
		err: false,
		result: updateDoc,
	};
}

export {
	confirmUserPurchaseOnDb,
	createTransactionOnDb,
	addValueToExistingUserInDb,
	addSaleUserToDb,
	updateVaultValues,
	getVaultDataFromDb,
	getTokenDataFromDb,
	getSaleDataFromDb,
	getUserFromDb,
	getUsersWithRewardsFromDb,
};
