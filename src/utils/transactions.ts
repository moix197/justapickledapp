import { PublicKey, VersionedTransaction } from "@solana/web3.js";
import { connection } from "utils/back/connection";
import { getPublicKey } from "./getPublicKey";
import { toBuffer } from "./toBuffer";
import {
	TOKEN_PROGRAM_ID,
	createTransferCheckedInstruction,
	getAssociatedTokenAddress,
} from "@solana/spl-token";
import {
	createAssociatedTokenAccountInstructionsFunc,
	getAssociatedTokenAddressFunc,
	getOrCreateAssociatedTokenAccountFunc,
} from "./back/getOrCreateAssociatedAccount";
import { mintPublicKey } from "./baseValues";
import { createVersionedTransaction } from "./back/createVersionedTransaction";
import { publicKey } from "@coral-xyz/borsh";
import { removeDecimalPointAndAddNumbers } from "./manageDecimals";

async function deserializeAndSignTransaction(
	transactionData,
	wallet,
	connection
) {
	try {
		let transaction = VersionedTransaction.deserialize(transactionData);
		let signature = await wallet.signTransaction(transaction, connection);

		return signature;
	} catch (error) {
		return {
			err: true,
			error: error.message,
		};
	}
}

async function sendAndConfirmTransactionToNetwork(transaction) {
	const valuesArray: Array<number> = Object.values(transaction);
	let buffTransaction = toBuffer(valuesArray);

	const signature = await connection.sendRawTransaction(buffTransaction);

	await confirmTransaction(signature);

	return signature;
}

async function confirmTransaction(signature) {
	let response = await connection.confirmTransaction(signature, "processed");

	if (response?.value?.err) {
		throw new Error("couldn't confirm the transaction, please try again later");
	}
	return response;
}

async function createSalePurchaseTransaction(
	saleData,
	userWalletAddress,
	vaultData,
	amount,
	tokenData
) {
	const instructionsAry = [];
	/*let userAssociatedAccount = await getAssociatedTokenAddressFunc({
		mint: vaultData.acceptedTokens[0].address,
		owner: userWalletAddress,
		tokenPro: TOKEN_PROGRAM_ID,
	});*/

	let userSaleTokenAccount = await getOrCreateAssociatedTokenAccountFunc({
		mintPublicKey: vaultData.tokenMint,
		ownerPublicKey: userWalletAddress,
		tokenProgram: tokenData.info.token_program,
	});

	let userPaymentTokenAccount = await getOrCreateAssociatedTokenAccountFunc({
		mintPublicKey: vaultData.acceptedTokens[0].address,
		ownerPublicKey: userWalletAddress,
		tokenProgram: TOKEN_PROGRAM_ID,
	});

	if (userPaymentTokenAccount.err) {
		throw new Error("Couldn't get your UDST associated account");
	}

	const transferInstructions = createTransferCheckedInstruction(
		userPaymentTokenAccount.associatedToken, //user associated account,
		new PublicKey(vaultData.acceptedTokens[0].address), //mint address of the token to transfer
		new PublicKey(vaultData.acceptedTokens[0].associatedAccount), //vault associated account to USDT or selected acceptedToken
		new PublicKey(userWalletAddress), //owner of the source account
		removeDecimalPointAndAddNumbers(amount.toString(), 6), //amount of USDT to send to vault
		6, //usdt token decimals
		undefined,
		TOKEN_PROGRAM_ID // USDT token Program
	);

	if (!userSaleTokenAccount?.userHasAccount) {
		instructionsAry.push(userSaleTokenAccount?.instructions);
	}

	instructionsAry.push(transferInstructions);

	let versionedTransaction = await createVersionedTransaction(
		instructionsAry,
		new PublicKey(userWalletAddress)
	);

	return versionedTransaction;
}

async function createRewardsVersionedTransactionInstructions(
	vaultData,
	tokenData,
	userData
) {
	let instructionsAry = [];

	if (!userData.tokenAccount.value) {
		let createAssociatedAccountInstruction =
			await createAssociatedTokenAccountInstructionsFunc(
				vaultData.owner,
				userData.tokenAccount.address,
				userData.address,
				vaultData.tokenMint,
				tokenData.info.token_program
			);

		instructionsAry.push(createAssociatedAccountInstruction);
	}
	/*let userAssociatedAccountResponse =
		await getOrCreateAssociatedTokenAccountFunc({
			mintPublicKey: tokenData.address,
			ownerPublicKey: userData.address,
			tokenProgram: new PublicKey(tokenData.info.token_program),
			feePayer: vaultData.owner,
		});

	if (userAssociatedAccountResponse.err) {
		throw new Error("Couldn't get your associated account");
	}

	if (!userAssociatedAccountResponse?.userHasAccount) {
		instructionsAry.push(userAssociatedAccountResponse?.instructions);
	}

	const userAssociatedTokenAccount =
		userAssociatedAccountResponse.associatedToken;*/

	const transferInstructions = createTransferCheckedInstruction(
		new PublicKey(vaultData.accounts.mintAssociated), //source (assotiacted account)
		new PublicKey(tokenData.address), //mint address
		new PublicKey(userData.tokenAccount.address), //userAssociatedTokenAccount, //destination (associated account),
		new PublicKey(vaultData.owner), //owner of the source account
		removeDecimalPointAndAddNumbers(
			userData.rewards.toSend.toString(),
			tokenData.info.decimals
		), //amount of USDT to send to vault
		tokenData.info.decimals, //usdt token decimals
		undefined,
		new PublicKey(tokenData.info.token_program) // USDT token Program
	);

	instructionsAry.push(transferInstructions);

	return instructionsAry;
}

async function createRewardsSendTransaction(vaultData, tokenData, userData) {
	const instructionsAry = await createRewardsVersionedTransactionInstructions(
		vaultData,
		tokenData,
		userData
	);

	let versionedTransaction = await createVersionedTransaction(
		instructionsAry,
		new PublicKey(vaultData.owner)
	);

	return versionedTransaction;
}

export {
	deserializeAndSignTransaction,
	sendAndConfirmTransactionToNetwork,
	createSalePurchaseTransaction,
	createRewardsSendTransaction,
	createRewardsVersionedTransactionInstructions,
};
