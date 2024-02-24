import { createContext, useEffect, useState, useContext } from "react";
import { Connection } from "@solana/web3.js";
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { WalletDataContext } from "contexts/WalletDataContextProvider";

const TokensInAccountContext = createContext(null);

export default function TokensInAccountContainer({ children }) {
	const [walletTokenList, setWalletTokenList] = useState(null);
	const [isLoadingTokensInWallet, setIsLoadingTokensInWallet] = useState(false);
	const [userPublicKey] = useContext(WalletDataContext);
	const connection = new Connection(
		"https://withered-orbital-sailboat.solana-mainnet.quiknode.pro/ac33801cbf8e7a422bfc7ecbc7843f202e53fa60/"
	);
	//const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

	useEffect(() => {
		if (userPublicKey) {
			getWalletTokenList();
		}
	}, [userPublicKey]);

	async function getWalletTokenList() {
		if (!userPublicKey) return;
		setIsLoadingTokensInWallet(true);
		try {
			let response = await connection.getParsedTokenAccountsByOwner(
				userPublicKey,
				{
					programId: TOKEN_PROGRAM_ID,
				}
			);
			setWalletTokenList(response);
		} catch (error) {
			setIsLoadingTokensInWallet(false);
		}
		setIsLoadingTokensInWallet(false);
	}

	return (
		<TokensInAccountContext.Provider
			value={{ walletTokenList, setWalletTokenList, isLoadingTokensInWallet }}
		>
			{children}
		</TokensInAccountContext.Provider>
	);
}

export { TokensInAccountContainer, TokensInAccountContext };
