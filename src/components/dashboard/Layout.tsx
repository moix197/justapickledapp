import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import AppBar from "components/dashboard/Appbar";
import { WalletDataContainer } from "contexts/WalletDataContextProvider";
import DashboardVaultsDataContainer from "contexts/dasboard/DashboardVaultsContextProvider";
import DashboardTeamsDataContainer from "contexts/dasboard/DashboardTeamsContextProvider";
import { useState } from "react";
import DashboardSalesDataContainer from "contexts/dasboard/DashboardSalesContextProvider";

function Layout({ children }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<WalletDataContainer>
			<DashboardVaultsDataContainer>
				<DashboardTeamsDataContainer>
					<DashboardSalesDataContainer>
						<div className="min-h-[100vh] bg-gradient-to-bl flex from-slate-900 via-slate-900 to-thirdDark ">
							<AppBar shareValue={setIsOpen}></AppBar>
							<div className="absolute top-4 right-4">
								<WalletMultiButton></WalletMultiButton>
							</div>
							<div
								className={`w-full md:w-[calc(100%-63px)] transition-all flex justify-center mt-20 text-center md:ml-[63px!important] md:w-[calc(100%-63px)] pl-8 pr-8 `}
							>
								<div className="w-[1200px]">{children}</div>
							</div>
						</div>
					</DashboardSalesDataContainer>
				</DashboardTeamsDataContainer>
			</DashboardVaultsDataContainer>
		</WalletDataContainer>
	);
}

export default Layout;
