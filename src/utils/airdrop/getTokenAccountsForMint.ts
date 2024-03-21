import { TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { findDocuments, updateDocument } from "utils/back/db/crud";
import { getOrCreateAssociatedTokenAccountFunc } from "utils/back/getOrCreateAssociatedAccount";
import { picklePublicKey } from "utils/baseValues";
import { getPublicKey } from "utils/getPublicKey";
import { delay } from "utils/delay";

async function getTokenAccountsForMint() {
	try {
		let airdropUsers = await findDocuments("twitter_airdrop", {});
		let airdrop = await findDocuments("airdrops", { name: "twitterAirdrop" });

		if (!airdrop[0]?.isActive || airdrop[0]?.tookHoldersSnapshot) {
			return {
				err: true,
				error:
					"we cannot perform this action at the moment, please try again alter",
			};
		}

		let resultsAry = [];
		for (const item of airdropUsers) {
			await delay(100);
			if (!item?.isValidWalletAddress) continue;

			let pubKey = getPublicKey(item.wallet);

			let account = await getOrCreateAssociatedTokenAccountFunc({
				mintPublicKey: picklePublicKey,
				ownerPublicKey: pubKey?.result,
				tokenProgram: TOKEN_2022_PROGRAM_ID,
				createAccount: false,
			});

			if (account?.userHasAccount) {
				updateDocument(
					"twitter_airdrop",
					{ _id: item._id },
					{
						tokenAccount: {
							value: true,
							address: account?.associatedToken?.toString(),
						},
						wasAirdropped: true,
						rewards:{
							sending: 0,
							available: 0,
							locked: 0,
							claimed: 510205,
						}
					}
				);
				resultsAry.push(account);
			}
		}

		await updateDocument(
			"airdrops",
			{ name: "twitterAirdrop" },
			{ tookHoldersSnapshot: true }
		);

		return {
			err: false,
			result: { updatedItemsQty: resultsAry.length, updatedItems: resultsAry },
		};
	} catch (error) {
		return {
			err: true,
			error: "we couldn't finish the process, please try again later",
		};
	}
}

export default getTokenAccountsForMint;