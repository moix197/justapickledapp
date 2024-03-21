import {
	TOKEN_2022_PROGRAM_ID,
	createTransferCheckedInstruction,
} from "@solana/spl-token";
import type { NextApiRequest, NextApiResponse } from "next";
import { findDocuments, updateDocument } from "utils/back/db/crud";
import { getOrCreateAssociatedTokenAccountFunc } from "utils/back/getOrCreateAssociatedAccount";
import {
	mintPublicKey,
	sellAccountPublicKey,
	sellAssociatedAccountPublicKey,
	tokenDecimals,
} from "utils/baseValues";
import { getPublicKey } from "utils/getPublicKey";
import { createVersionedTransaction } from "utils/back/createVersionedTransaction";
import { Keypair, PublicKey, VersionedTransaction } from "@solana/web3.js";
import { removeDecimalPointAndAddNumbers } from "utils/manageDecimals";

async function claimAirdrop(postData) {
	try {
		let pubKey = getPublicKey(postData.body.address);
		let instructionsAry = [];
		if (pubKey?.err) {
			return {
				err: true,
				error: "Invalid wallet Address",
			};
		}

		let airdropUserData = await findDocuments("twitter_airdrop", {
			wallet: pubKey.result.toString(),
		});

		if (!airdropUserData[0]) {
			return {
				err: true,
				error: "You're not elegible for this airdrop",
			};
		}

		if (airdropUserData[0].wasAirdropped) {
			return {
				err: true,
				error:
					"Your whole allocation has already been sent to your wallet, Enjoy!",
			};
		}

		if (airdropUserData[0] && airdropUserData[0].rewards.sending > 0) {
			return {
				err: true,
				error:
					"We're already sending some amount to your wallet, please try again later",
			};
		}

		if (airdropUserData[0].rewards.available <= 0) {
			return {
				err: true,
				error: "Not amount available to claim",
			};
		}
		let airdropAccKey = "4Y9mcd8KRiBh7hrzRh7dGfGmenfcBig5on7TUoBkfdkn";
		let airdropAccAssociatedAccount =
			await getOrCreateAssociatedTokenAccountFunc({
				mintPublicKey: mintPublicKey,
				ownerPublicKey: new PublicKey(airdropAccKey),
				tokenProgram: TOKEN_2022_PROGRAM_ID,
			});

		let key =
			"28,162,243,91,90,116,202,29,9,97,191,45,79,223,223,64,216,81,227,29,114,18,133,165,39,70,71,247,49,236,32,29,52,141,251,50,103,237,65,16,248,233,124,194,47,45,30,232,218,177,147,204,94,76,86,180,33,245,59,184,235,241,35,219"
				.split(",")
				.map(Number);
		let pKey = Uint8Array.from(key);
		let sellAccountKeyPair = Keypair.fromSecretKey(pKey);
		let updatedRewards = {
			available: 0,
			sending: airdropUserData[0].rewards.available,
			claimed: airdropUserData[0].rewards.claimed,
			locked: airdropUserData[0].rewards.locked,
		};

		let userPickleAssociatedAccountResponse =
			await getOrCreateAssociatedTokenAccountFunc({
				mintPublicKey: mintPublicKey,
				ownerPublicKey: pubKey.result,
				tokenProgram: TOKEN_2022_PROGRAM_ID,
			});

		if (!userPickleAssociatedAccountResponse?.userHasAccount) {
			instructionsAry.push(userPickleAssociatedAccountResponse?.instructions);
		}

		let finalAmount = removeDecimalPointAndAddNumbers(
			airdropUserData[0].rewards.available.toString(),
			tokenDecimals
		);

		let picklesToClientInstructions = createTransferCheckedInstruction(
			airdropAccAssociatedAccount.associatedToken, //source associated account ( this is hte associates account of the owner)
			mintPublicKey, // mint key
			userPickleAssociatedAccountResponse?.associatedToken, //destination account
			new PublicKey(airdropAccKey), //OWNER of the source account
			finalAmount, //AMOUNT
			tokenDecimals, //decimals
			undefined, //multisigners
			TOKEN_2022_PROGRAM_ID
		);

		instructionsAry.push(picklesToClientInstructions);

		let versionedTransaction = await createVersionedTransaction(
			instructionsAry,
			pubKey.result,
			sellAccountKeyPair
		);

		let updatedResult = await updateDocument(
			"twitter_airdrop",
			{ _id: airdropUserData[0]._id },
			{
				rewards: updatedRewards,
				transactions: [
					...airdropUserData[0].transactions,
					{ tx: "", status: "pending", result: "", launchTime: new Date() },
				],
			}
		);

		let esto = VersionedTransaction.deserialize(versionedTransaction);

		return {
			err: false,
			result: {
				versionedTransaction: versionedTransaction,
			},
		};
	} catch (error) {
		return {
			err: true,
			error: "we couldn't finish the process, please try again later",
		};
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await claimAirdrop(req));
}
