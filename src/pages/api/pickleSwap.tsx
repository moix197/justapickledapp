// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { NextApiRequest, NextApiResponse } from "next";
import { getOrCreateAssociatedTokenAccountFunc } from "utils/getOrCreateAssociatedAccount";
import {
	mintPublicKey,
	pickleTokenAddress,
	sellAccountPublicKey,
	sellAssociatedAccountPublicKey,
	solTokenAddress,
	tokenDecimals,
} from "utils/baseValues";
import {
	TOKEN_2022_PROGRAM_ID,
	TOKEN_PROGRAM_ID,
	createTransferCheckedInstruction,
} from "@solana/spl-token";
import { createVersionedTransaction } from "utils/createVersionedTransaction";
import { getFinalSwapAmount } from "utils/getFinalSwapAmount";
import { getJupQuote } from "services/getJupQuote";

async function setPickleSwap(postData) {
	let quote = postData.body.quote;

	if (
		quote?.inputMint != solTokenAddress ||
		quote?.outputMint != pickleTokenAddress
	) {
		return;
	}

	let key = process.env.SELL_ACCOUNT_P_KEY.split(",").map(Number);
	let pKey = Uint8Array.from(key);
	let sellAccountKeyPair = Keypair.fromSecretKey(pKey);
	let instructionsAry = [];
	let inAmount = 0;
	let outAmount = 0;
	let ownerPublicKey = new PublicKey(postData.body.userPublicKey);

	let newQuote = await getJupQuote(
		solTokenAddress,
		pickleTokenAddress,
		quote?.inAmount
	);

	if (newQuote?.error) {
		return {
			error: "Couldn't get the quote, please try again",
		};
	}

	inAmount = quote?.inAmount;
	outAmount = getFinalSwapAmount(newQuote?.outAmount);

	let userPickleAssociatedAccountResponse =
		await getOrCreateAssociatedTokenAccountFunc({
			mintPublicKey: mintPublicKey,
			ownerPublicKey: ownerPublicKey,
			tokenProgram: TOKEN_2022_PROGRAM_ID,
		});

	if (!userPickleAssociatedAccountResponse?.userHasAccount) {
		instructionsAry.push(userPickleAssociatedAccountResponse?.instructions);
	}

	let picklesToClientInstructions = createTransferCheckedInstruction(
		sellAssociatedAccountPublicKey, //source associated account
		mintPublicKey, // mint key
		userPickleAssociatedAccountResponse?.associatedToken, //destination account
		sellAccountPublicKey, //OWNER of the source account
		outAmount, //AMOUNT
		tokenDecimals, //decimals
		undefined, //multisigners
		TOKEN_2022_PROGRAM_ID
	);

	let SolsToUsInstructions = SystemProgram.transfer({
		fromPubkey: ownerPublicKey,
		toPubkey: sellAccountPublicKey,
		lamports: inAmount,
	});

	instructionsAry.push(picklesToClientInstructions);
	instructionsAry.push(SolsToUsInstructions);

	let versionedTransaction = await createVersionedTransaction(
		instructionsAry,
		ownerPublicKey,
		sellAccountKeyPair
	);

	return versionedTransaction;
}

export default async function handler(req, res) {
	res.status(200).json(await setPickleSwap(req));
}
