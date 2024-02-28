"use client";
import type { NextPage } from "next";
import ParentContent from "components/swap/ParentContent";
import { TokensInAccountContainer } from "contexts/TokensInAccountContextProvider";
import { TokenDataContainer } from "contexts/TokenDataContextProvider";
import { TransactionDataContainer } from "contexts/TransactionDataContextProvider";
import { WalletDataContainer } from "contexts/WalletDataContextProvider";
import { RouterContainer } from "contexts/RouterContextProvider";

const Home: NextPage = (props) => {
	return (
		<RouterContainer>
			<WalletDataContainer>
				<TokenDataContainer>
					<TokensInAccountContainer>
						<TransactionDataContainer>
							<ParentContent />
						</TransactionDataContainer>
					</TokensInAccountContainer>
				</TokenDataContainer>
			</WalletDataContainer>
		</RouterContainer>
	);
};

export default Home;
