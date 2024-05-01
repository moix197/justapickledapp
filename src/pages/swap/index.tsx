"use client";
import type { NextPage } from "next";

import { TokensInAccountContainer } from "contexts/TokensInAccountContextProvider";
import { TokenDataContainer } from "contexts/TokenDataContextProvider";
import { TransactionDataContainer } from "contexts/TransactionDataContextProvider";
import { RouterContainer } from "contexts/RouterContextProvider";
import InitialSwapScreen from "components/swap/InitialSwapScreen";
import AppBar from "components/AppBar";

const SwapIndex: NextPage = (props) => {
	return (
		<div>
			<AppBar />
			<RouterContainer>
				<TokenDataContainer>
					<TokensInAccountContainer>
						<TransactionDataContainer>
							<InitialSwapScreen></InitialSwapScreen>
						</TransactionDataContainer>
					</TokensInAccountContainer>
				</TokenDataContainer>
			</RouterContainer>
		</div>
	);
};

export default SwapIndex;
