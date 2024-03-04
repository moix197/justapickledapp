"use client";
import type { NextPage } from "next";

import { TokensInAccountContainer } from "contexts/TokensInAccountContextProvider";
import { TokenDataContainer } from "contexts/TokenDataContextProvider";
import { TransactionDataContainer } from "contexts/TransactionDataContextProvider";
import { WalletDataContainer } from "contexts/WalletDataContextProvider";
import { RouterContainer } from "contexts/RouterContextProvider";
import InitialSwapScreen from "components/swap/InitialSwapScreen";

const Home: NextPage = (props) => {
	return (
		<RouterContainer>
			<WalletDataContainer>
				<TokenDataContainer>
					<TokensInAccountContainer>
						<TransactionDataContainer>
							<InitialSwapScreen></InitialSwapScreen>
						</TransactionDataContainer>
					</TokensInAccountContainer>
				</TokenDataContainer>
			</WalletDataContainer>
		</RouterContainer>
	);
};

export default Home;
