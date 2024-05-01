import { findDocuments, insertDocument } from "utils/back/db/crud";
import { getTokenData } from "services/getTokenData";

async function createToken(mintAddress) {
	try {
		let documentExists = await findDocuments("tokensData", {
			address: mintAddress,
		});

		if (documentExists[0]) {
			return {
				err: false,
				result: {
					tokenProgram: documentExists[0].info.token_program,
					decimals: documentExists[0].info.decimals,
				},
			};
		}

		let tokenData = await getTokenData(mintAddress);

		const data = {
			address: tokenData.result.id,
			authorities: tokenData.result.authorities,
			metadata: {
				name: tokenData.result.content.metadata.name,
				image: tokenData.result.content.links.image,
				symbol: tokenData.result.content.metadata.symbol,
				description: tokenData.result.content.metadata.description || "",
			},
			info: {
				supply: tokenData.result.token_info.supply,
				decimals: tokenData.result.token_info.decimals,
				token_program: tokenData.result.token_info.token_program,
			},
			ownership: {
				delegated: tokenData.result.ownership.delegated,
				frozen: tokenData.result.ownership.frozen,
				owner: tokenData.result.ownership.owner,
				ownership_model: tokenData.result.ownership.ownership_model,
			},
			lastUpdated: new Date(),
		};

		let insertItem = await insertDocument("tokensData", data);

		return {
			err: false,
			result: {
				id: insertItem?.insertedId,
				tokenProgram: tokenData.result.token_info.token_program,
				decimals: tokenData.result.token_info.decimals,
				data: tokenData,
			},
		};
	} catch (error) {
		return {
			err: true,
			error: error.message,
		};
	}
}

export { createToken };
