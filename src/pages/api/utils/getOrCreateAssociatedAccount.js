import {
	ASSOCIATED_TOKEN_PROGRAM_ID,
	createAssociatedTokenAccountInstruction,
	getAccount,
	getAssociatedTokenAddress,
} from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
import { connection } from "pages/api/utils/connection";

async function getOrCreateAssociatedTokenAccountFunc({
	mintPublicKey,
	ownerPublicKey,
	tokenProgram,
}) {
	let associatedToken = await getAssociatedTokenAddress(
		mintPublicKey, // mint
		ownerPublicKey, // owner
		false, // allow owner off curve
		tokenProgram,
		ASSOCIATED_TOKEN_PROGRAM_ID
	);

	let associatedAcountAddresPubKey = new PublicKey(associatedToken);
	try {
		let account = await getAccount(
			connection,
			associatedAcountAddresPubKey,
			"confirmed",
			tokenProgram
		);
		return { userHasAccount: true, associatedToken: associatedToken };
	} catch (error) {
		if (error == "TokenAccountNotFoundError") {
			const transactionInstruction = createAssociatedTokenAccountInstruction(
				ownerPublicKey,
				associatedToken,
				ownerPublicKey,
				mintPublicKey,
				tokenProgram,
				ASSOCIATED_TOKEN_PROGRAM_ID
			);

			return {
				userHasAccount: false,
				associatedToken: associatedToken,
				instructions: transactionInstruction,
			};
		}
	}
}

export { getOrCreateAssociatedTokenAccountFunc };
