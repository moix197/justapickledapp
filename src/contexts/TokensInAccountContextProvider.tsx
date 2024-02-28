import { createContext, useEffect, useState, useContext } from "react";
import { Connection } from "@solana/web3.js";
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { WalletDataContext } from "contexts/WalletDataContextProvider";
import { TokenDataContext } from "contexts/TokenDataContextProvider";

const TokensInAccountContext = createContext(null);

export default function TokensInAccountContainer({ children }) {
	const [walletTokenListRaw, setWalletTokenListRaw] = useState(null);
	const [walletTokenListProcesed, setWalletTokenListProcesed] = useState([]);
	const [isLoadingTokensInWallet, setIsLoadingTokensInWallet] = useState(false);
	const [userPublicKey] = useContext(WalletDataContext);
	const { rawTokensData } = useContext(TokenDataContext);
	const connection = new Connection(
		"https://withered-orbital-sailboat.solana-mainnet.quiknode.pro/ac33801cbf8e7a422bfc7ecbc7843f202e53fa60/"
	);
	//const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

	useEffect(() => {
		if (userPublicKey) {
			getWalletTokenListRaw();
		} else {
			setWalletTokenListProcesed([]);
		}
	}, [userPublicKey]);

	async function getWalletTokenListRaw() {
		if (!userPublicKey) return;
		setIsLoadingTokensInWallet(true);
		try {
			let response = await connection.getParsedTokenAccountsByOwner(
				userPublicKey,
				{
					programId: TOKEN_PROGRAM_ID,
				}
			);
			setWalletTokenListRaw(response);
		} catch (error) {
			setIsLoadingTokensInWallet(false);
		}
		setIsLoadingTokensInWallet(false);
	}

	useEffect(() => {
		if (!walletTokenListRaw || walletTokenListProcesed.length > 0) return;

		// Assuming array1 and array2 are your two arrays
		const propertyToCompare = "address";

		// Convert the larger array (array2) into a Set for faster lookups
		const setArray2 = new Set(
			walletTokenListRaw.value.map((item, i) => {
				if (item.account?.data?.parsed?.info?.tokenAmount.amount > 0) {
					return item.account?.data?.parsed?.info?.mint;
				}
			})
		);

		// Use filter to check if the property value in each item of array1 is present in setArray2
		const filtAry = rawTokensData.filter((item) =>
			setArray2.has(item[propertyToCompare])
		);

		setWalletTokenListProcesed(filtAry);
		// Now setWalletTokenListProcesed contains only the items from array1 where the 'address' property is present in array2
	}, [walletTokenListRaw]);

	return (
		<TokensInAccountContext.Provider
			value={{
				walletTokenListRaw,
				setWalletTokenListRaw,
				isLoadingTokensInWallet,
				walletTokenListProcesed,
			}}
		>
			{children}
		</TokensInAccountContext.Provider>
	);
}

export { TokensInAccountContainer, TokensInAccountContext };
