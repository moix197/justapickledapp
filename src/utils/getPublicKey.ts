import { PublicKey } from "@solana/web3.js";

function getPublicKey(address) {
	try {
		return {
			err: false,
			result: new PublicKey(address),
		};
	} catch (error) {
		return {
			err: true,
			error: error,
		};
	}
}

export { getPublicKey };
