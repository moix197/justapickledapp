import { connection } from "utils/back/connection";
import { checkTransactionAgainstVaultAndGetAmount } from "./general";
import {
	addValueToExistingUserInDb,
	createTransactionOnDb,
	updateVaultValues,
} from "./sales";
import { convertNotationToNumber } from "utils/manageDecimals";

async function confirmRewardsSentOnDb({
	vaultData,
	tokenData,
	userData,
	tx,
	saleId,
}) {
	const blockchainTransData: any = await connection.getParsedTransaction(tx, {
		maxSupportedTransactionVersion: 0,
	});

	const { transactionAmount: transactionAmount, ...transactionValueObj } =
		await checkTransactionAgainstVaultAndGetAmount({
			transactionData: blockchainTransData,
			tokenToCheck: vaultData.tokenMint,
			sourceAddress: vaultData.owner,
			destinationAddress: userData.address,
			isSwapTransaction: false,
		});

	if (transactionValueObj.err) {
		throw new Error(transactionValueObj.error);
	}

	const finalAmount = convertNotationToNumber(
		transactionAmount,
		tokenData.info.decimals
	);

	const transactionDb = await createTransactionOnDb({
		userAddress: userData.address,
		saleId: saleId,
		amount: finalAmount,
		tx: tx,
		type: "vaultToUser",
		linkedToCollection: "tokenSale",
	});

	if (transactionDb.err) {
		return transactionDb;
	}

	const updatedUser = await addValueToExistingUserInDb(
		saleId,
		userData.address,
		{
			"rewards.toSend": -finalAmount,
			"rewards.sent": finalAmount,
		}
	);

	if (updatedUser.err) {
		return updatedUser;
	}

	const updatedVault = await updateVaultValues(vaultData._id, {
		"amount.sent": +finalAmount,
	});
	if (updatedVault.err) {
		return updatedVault;
	}

	return {
		err: false,
		result: finalAmount,
	};
}

export { confirmRewardsSentOnDb };
