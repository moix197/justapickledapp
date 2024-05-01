import { PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccountFunc } from "utils/back/getOrCreateAssociatedAccount";

async function getVaultDataFromNetwork(
	mintAddress,
	ownerAddress,
	tokenProgram,
	decimals
) {
	let result = await getOrCreateAssociatedTokenAccountFunc({
		mintPublicKey: new PublicKey(mintAddress),
		ownerPublicKey: new PublicKey(ownerAddress),
		tokenProgram: new PublicKey(tokenProgram),
		createAccount: false,
	});

	return {
		result: result,
		mintAmountLeft: Number(result.account.amount) / Math.pow(10, decimals),
	};
}

export { getVaultDataFromNetwork };
