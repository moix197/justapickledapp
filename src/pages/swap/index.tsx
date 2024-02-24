import type { NextPage } from "next";
import ParentContent from "components/swap/ParentContent";
import { TokensInAccountContainer } from "contexts/TokensInAccountContextProvider";
import { TokenDataContainer } from "contexts/TokenDataContextProvider";
import { TransactionDataContainer } from "contexts/TransactionDataContextProvider";
import { WalletDataContainer } from "contexts/WalletDataContextProvider";

const Home: NextPage = (props) => {
	return (
		<WalletDataContainer>
			<TokensInAccountContainer>
				<TokenDataContainer>
					<TransactionDataContainer>
						<ParentContent />
					</TransactionDataContainer>
				</TokenDataContainer>
			</TokensInAccountContainer>
		</WalletDataContainer>
	);
};

export default Home;
