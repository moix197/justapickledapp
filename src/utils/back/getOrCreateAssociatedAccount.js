import {
	ASSOCIATED_TOKEN_PROGRAM_ID,
	createAssociatedTokenAccountInstruction,
	getAccount,
	getAssociatedTokenAddress,
} from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { connection } from "utils/back/connection";
import { checkAndGetPubKey } from "utils/general";

async function getOrCreateAssociatedTokenAccountFunc({
	mintPublicKey,
	ownerPublicKey,
	tokenProgram,
	createAccount = true,
	feePayer = false,
}) {
	let associatedToken;
	let assocciatedAcountAddresPubKey;
	let ownerPubKey =
		typeof ownerPublicKey === "string"
			? new PublicKey(ownerPublicKey)
			: ownerPublicKey;
	let mintPubKey =
		typeof mintPublicKey === "string"
			? new PublicKey(mintPublicKey)
			: mintPublicKey;
	let tokenPro =
		typeof tokenProgram === "string"
			? new PublicKey(tokenProgram)
			: tokenProgram;

	let feePayerPubKey =
		typeof feePayer === "string" ? new PublicKey(feePayer) : feePayer;

	try {
		associatedToken = await getAssociatedTokenAddress(
			mintPubKey, // mint
			ownerPubKey, // owner
			false, // allow owner off curve
			tokenPro,
			ASSOCIATED_TOKEN_PROGRAM_ID
		);

		assocciatedAcountAddresPubKey = new PublicKey(associatedToken);
	} catch (error) {
		return error;
	}

	try {
		let account = await getAccount(
			connection,
			assocciatedAcountAddresPubKey,
			"confirmed",
			tokenPro
		);

		return {
			userHasAccount: true,
			associatedToken: associatedToken,
			account: account,
		};
	} catch (error) {
		if (!createAccount) return error;
		if (error == "TokenAccountNotFoundError") {
			const transactionInstruction =
				await createAssociatedTokenAccountInstructionsFunc(
					feePayerPubKey ? feePayerPubKey : ownerPubKey,
					associatedToken,
					ownerPubKey,
					mintPubKey,
					tokenPro
				);

			return {
				userHasAccount: false,
				associatedToken: associatedToken,
				instructions: transactionInstruction,
			};
		}
	}
}

async function createAssociatedTokenAccountInstructionsFunc(
	feePayer,
	associatedTokenAccount,
	ownerPubKey,
	mintPubKey,
	tokenPro
) {
	const transactionInstruction = createAssociatedTokenAccountInstruction(
		checkAndGetPubKey(feePayer),
		checkAndGetPubKey(associatedTokenAccount),
		checkAndGetPubKey(ownerPubKey),
		checkAndGetPubKey(mintPubKey),
		checkAndGetPubKey(tokenPro),
		ASSOCIATED_TOKEN_PROGRAM_ID
	);

	return transactionInstruction;
}

async function getAssociatedTokenAddressFunc({ mint, owner, tokenPro }) {
	try {
		let ownerPubKey = typeof owner === "string" ? new PublicKey(owner) : owner;
		let mintPubKey = typeof mint === "string" ? new PublicKey(mint) : mint;
		let tokenProgram =
			typeof tokenPro === "string" ? new PublicKey(tokenPro) : tokenPro;

		const associatedToken = await getAssociatedTokenAddress(
			mintPubKey, // mint
			ownerPubKey, // owner
			false, // allow owner off curve
			tokenProgram,
			ASSOCIATED_TOKEN_PROGRAM_ID
		);

		return {
			err: false,
			result: associatedToken,
		};
	} catch (error) {
		return {
			err: true,
			error: error,
		};
	}
}

export {
	getOrCreateAssociatedTokenAccountFunc,
	getAssociatedTokenAddressFunc,
	createAssociatedTokenAccountInstructionsFunc,
};
