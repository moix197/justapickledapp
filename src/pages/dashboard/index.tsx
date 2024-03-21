import type { NextPage } from "next";
import { WalletDataContainer } from "contexts/WalletDataContextProvider";
import ClaimPageContent from "components/airdrop/ClaimPageContent";
import { useWallet } from "@solana/wallet-adapter-react";
import { BasicButton } from "components/buttons/Basic";

const SwapIndex: NextPage = (props) => {
	const wallet = useWallet();

	async function doThis() {
		/*console.log(wallet);
		let msg = "lkklklm Confirm you're the owner of the website saasdsas";
		const msgUint8 = new TextEncoder().encode(msg);
		let esto = await wallet.signMessage(msgUint8);
		console.log(esto);*/
	}

	return (
		<WalletDataContainer>
			<div className="min-h-[calc(100vh-69px)] bg-fade bg-no-repeat bg-cover bg-center flex justify-center items-center max-w-90 pl-2 pr-2 md:pl-10 md:pr-10">
				<div className="w-[500px] text-center">
					<div
						onClick={() => {
							doThis();
						}}
					>
						<BasicButton>Esto</BasicButton>
					</div>
				</div>
			</div>
		</WalletDataContainer>
	);
};

export default SwapIndex;
