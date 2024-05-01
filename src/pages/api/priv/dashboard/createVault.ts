import type { NextApiRequest, NextApiResponse } from "next";
import { insertDocument } from "utils/back/db/crud";
import { bulkValidate } from "utils/formSubmitValidation";
import { getSessionWalletAddress } from "utils/getSessionWalletAddress";
import { createToken } from "utils/dashboard/db/createToken";
import { getOrCreateAssociatedTokenAccountFunc } from "utils/back/getOrCreateAssociatedAccount";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

async function createVault(req) {
	try {
		const address = await getSessionWalletAddress(req);
		let validationResponse = bulkValidate({
			name: req.body.name,
			tokenMintAddress: req.body.tokenMintAddress,
			walletAddress: address,
			initialAmount: req.body.initialAmount,
		});

		if (validationResponse.length > 0) {
			throw new Error("Couldn't validate the form, please check the values");
		}

		let vaultTokenData = await createToken(req.body.tokenMintAddress);

		if (vaultTokenData.err) {
			throw new Error(
				"Couldn't create the token, please check the mint address and try again later"
			);
		}

		let accountInfo = await getOrCreateAssociatedTokenAccountFunc({
			mintPublicKey: new PublicKey(req.body.tokenMintAddress),
			ownerPublicKey: new PublicKey(address),
			tokenProgram: new PublicKey(vaultTokenData.result.tokenProgram),
			createAccount: false,
		});

		let vaultAcceptedTokenAssociatedInfo =
			await getOrCreateAssociatedTokenAccountFunc({
				mintPublicKey: new PublicKey(
					"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
				),
				ownerPublicKey: new PublicKey(address),
				tokenProgram: TOKEN_PROGRAM_ID,
				createAccount: false,
			});

		if (!accountInfo?.account || !vaultAcceptedTokenAssociatedInfo?.account) {
			throw new Error(
				"We couldn't get the associated token account between the Token mint address and the vault wallet address"
			);
		}

		const data = {
			owner: address,
			name: req.body.name,
			type: "self",
			tokenMint: req.body.tokenMintAddress,
			accounts: {
				main: address,
				mintAssociated: accountInfo.account.address.toString(),
			},
			acceptedTokens: [
				{
					name: "USDT",
					address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
					associatedAccount:
						vaultAcceptedTokenAssociatedInfo.account.address.toString(),
				},
			],
			credentials: {},
			amount: {
				initial: parseFloat(req.body.initialAmount),
				inVault:
					Number(accountInfo.account.amount) /
					Math.pow(10, vaultTokenData.result.decimals), //Math.pow(10,vaultTokenData.result.tokenProgram),
				left: parseFloat(req.body.initialAmount),
				sent: 0,
				received: 0,
			},
			status: "pre",
			lastUpdated: new Date(),
		};

		let insertItem = await insertDocument("vaultData", data);

		return {
			err: false,
			message: "Vault created successfully",
			data: vaultTokenData,
		};
	} catch (error) {
		return {
			err: true,
			error: error.message,
		};
	}
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await createVault(req));
}
