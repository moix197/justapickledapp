import type { NextPage } from "next";
import { WalletDataContainer } from "contexts/WalletDataContextProvider";
import ClaimPageContent from "components/airdrop/ClaimPageContent";

const SwapIndex: NextPage = (props) => {
	return (
		<WalletDataContainer>
			<div className="min-h-[calc(100vh-69px)] bg-fade bg-no-repeat bg-cover bg-center flex justify-center items-center max-w-90 pl-2 pr-2 md:pl-10 md:pr-10">
				<div className="w-[500px] text-center">
					<ClaimPageContent></ClaimPageContent>
				</div>
			</div>
		</WalletDataContainer>
	);
};

export default SwapIndex;
