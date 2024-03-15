import { createContext, useEffect, useState, useContext } from "react";
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { WalletDataContext } from "contexts/WalletDataContextProvider";
import { TokenDataContext } from "contexts/TokenDataContextProvider";
import { checkTimePassed } from "utils/checkTimePassed";
import { getParsedTokenAccounts } from "services/getParsedTokenAccounts";

const TokensInAccountContext = createContext(null);

export default function TokensInAccountContainer({ children }) {
	const [walletTokenListRaw, setWalletTokenListRaw] = useState(null);
	const [walletTokenListProcesed, setWalletTokenListProcesed] = useState([]);
	const [isLoadingTokensInWallet, setIsLoadingTokensInWallet] = useState(false);
	const [userPublicKey] = useContext(WalletDataContext);
	const { rawTokensData } = useContext(TokenDataContext);

	useEffect(() => {
		let storage;

		if (!userPublicKey) {
			setWalletTokenListProcesed([]);
			return;
		}

		storage = JSON.parse(
			localStorage.getItem("tokens_in_wallet_" + userPublicKey)
		);

		let checkIfTimePassed = checkTimePassed(storage?.time);

		if (!storage || storage?.value?.length == 0 || checkIfTimePassed) {
			getWalletTokenListRaw();
			return;
		}

		setWalletTokenListProcesed(storage?.value);
	}, [userPublicKey]);

	async function getWalletTokenListRaw() {
		if (!userPublicKey) return;
		setIsLoadingTokensInWallet(true);

		let oldTokenAccounts = await getParsedTokenAccounts(
			userPublicKey,
			TOKEN_PROGRAM_ID
		);
		let newTokenAccounts = await getParsedTokenAccounts(
			userPublicKey,
			TOKEN_2022_PROGRAM_ID
		);

		if (oldTokenAccounts?.value && newTokenAccounts?.value) {
			let newAry = [...oldTokenAccounts?.value, ...newTokenAccounts?.value];
			oldTokenAccounts["value"] = newAry;
		}
		setWalletTokenListRaw(oldTokenAccounts);
		setIsLoadingTokensInWallet(false);
	}

	useEffect(() => {
		if (!walletTokenListRaw || walletTokenListProcesed?.length > 0) return;

		const propertyToCompare = "address";
		const walletTokenListForSet = [];
		const walletTokenListForAmounts = [];

		for (let i = 0; i < walletTokenListRaw?.value?.length; i++) {
			let item = walletTokenListRaw?.value[i];
			if (item.account?.data?.parsed?.info?.tokenAmount.amount > 0) {
				walletTokenListForSet.push(item?.account?.data?.parsed?.info?.mint);
				walletTokenListForAmounts.push({
					address: item?.account?.data?.parsed?.info?.mint,
					...item?.account?.data?.parsed?.info?.tokenAmount,
				});
			}
		}

		const setArray2 = new Set(walletTokenListForSet);
		const filtAry = [];

		for (let i = 0; i < rawTokensData.length; i++) {
			let item = rawTokensData[i];
			if (setArray2.has(item[propertyToCompare])) {
				filtAry.push({
					address: item.address,
					symbol: item.symbol,
					name: item.name,
					logo: item.logoURI,
					...walletTokenListForAmounts.find(
						(element) => element.address == item["address"]
					),
				});
			}
		}

		let objToLocalStorage = {
			time: new Date(),
			value: filtAry,
		};

		localStorage.setItem(
			"tokens_in_wallet_" + userPublicKey,
			JSON.stringify(objToLocalStorage)
		);

		setWalletTokenListProcesed(filtAry);
	}, [walletTokenListRaw]);

	return (
		<TokensInAccountContext.Provider
			value={{
				walletTokenListRaw,
				isLoadingTokensInWallet,
				walletTokenListProcesed,
			}}
		>
			{children}
		</TokensInAccountContext.Provider>
	);
}

export { TokensInAccountContainer, TokensInAccountContext };
