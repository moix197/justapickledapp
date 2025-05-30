import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LogoBg } from "./brand/Logo";
import SwitchLayoutBtn from "./SwitchLayoutBtn";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { WalletDataContext } from "contexts/WalletDataContextProvider";

function AppBar({ children = null, title = "pickle swap" }) {
	const router = useRouter();
	const { userPublicKey } = useContext(WalletDataContext);

	return (
		<div>
			<div className="navbar  pt-1 pb-1 md:pt-2 md-pb-2 flex flex-row shadow-lg text-neutral-content border-b border-fourth">
				<div className="navbar-start w-4/12 md:w-[50%]">
					<div className=" w-22 h-22 p-2 flex justify-center align-center">
						<LogoBg width={40} height={40}></LogoBg>
					</div>
				</div>

				<div className="hidden md:inline md:navbar-center">
					<div className="flex items-stretch">
						<div className="text-center text-lg font-bold uppercase">
							<h1>{title}</h1>
						</div>
					</div>
				</div>

				<div className="navbar-end w-8/12 md:w-[50%]">
					{router.pathname == "/swap" && <SwitchLayoutBtn></SwitchLayoutBtn>}
					<WalletMultiButton />
				</div>
			</div>
			{children && children}
		</div>
	);
}

export default AppBar;
