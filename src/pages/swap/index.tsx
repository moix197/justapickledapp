"use client";
import type { NextPage } from "next";
import SwapBasicSection from "components/swap/SwapBasicSection";
import SwapNewbieSection from "components/swap/SwapNewbieSection";
import { TokensInAccountContainer } from "contexts/TokensInAccountContextProvider";
import { TokenDataContainer } from "contexts/TokenDataContextProvider";
import { TransactionDataContainer } from "contexts/TransactionDataContextProvider";
import { WalletDataContainer } from "contexts/WalletDataContextProvider";
import { RouterContainer } from "contexts/RouterContextProvider";
import { useState } from "react";

const Home: NextPage = (props) => {
	const [showNewbieScreen, setShowNewbieScreen] = useState(false);
	return (
		<RouterContainer>
			<WalletDataContainer>
				<TokenDataContainer>
					<TokensInAccountContainer>
						<TransactionDataContainer>
							{showNewbieScreen ? (
								<SwapNewbieSection></SwapNewbieSection>
							) : (
								<SwapBasicSection
									setScreen={setShowNewbieScreen}
								></SwapBasicSection>
							)}
						</TransactionDataContainer>
					</TokensInAccountContainer>
				</TokenDataContainer>
			</WalletDataContainer>
		</RouterContainer>
	);
};

export default Home;
