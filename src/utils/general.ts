import { PublicKey } from "@solana/web3.js";
import { connection } from "utils/back/connection";

function performUserRewardsSecurityCheck(userData) {
	if (!userData) {
		throw new Error("We couldn't get the user");
	} else if (userData.rewards.bought == 0) {
		throw new Error("The user does not have any purchase registered");
	} else if (userData.rewards.toSend <= 0) {
		throw new Error("The user does not have any rewards left");
	}
}

function performVaultRewardsSecurityCheck(vaultData) {
	if (!vaultData) {
		throw new Error("We couldn't get the vault");
	} else if (vaultData.amount.sent >= vaultData.amount.initial) {
		throw new Error(
			"You've already sent the whole amount you selected for this sale"
		);
	}
}

async function getAccountsInfo(accounts) {
	try {
		if (accounts.length <= 100) {
			return await connection.getMultipleAccountsInfo(accounts);
		}
	} catch (error) {
		return {
			err: true,
			error: error.message,
		};
	}
}

async function executeCallByChunks(ary, itemsPerChunk, cb) {
	try {
		// Check if accounts array length is less than or equal to 100
		if (ary.length <= itemsPerChunk) {
			// If it's less than or equal to itemsPerChunk, make a single call
			return await cb(ary);
		} else {
			// If it's greater than itemsPerChunk, divide the array into chunks of itemsPerChunk
			const chunks = [];
			for (let i = 0; i < ary.length; i += itemsPerChunk) {
				chunks.push(ary.slice(i, i + itemsPerChunk));
			}

			// Make separate calls for each chunk and merge the results
			const results = [];
			for (const chunk of chunks) {
				const chunkResult = await cb(chunk);
				results.push(...chunkResult);
			}
			return results;
		}
	} catch (error) {
		return {
			err: true,
			error: error.message,
		};
	}
}

function checkAndGetPubKey(value) {
	return typeof value === "string" ? new PublicKey(value) : value;
}

export {
	performUserRewardsSecurityCheck,
	performVaultRewardsSecurityCheck,
	executeCallByChunks,
	checkAndGetPubKey,
};
