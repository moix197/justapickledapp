"use client";

import WalletContextProvider from "contexts/WalletContextProvider";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import Notifications from "../components/Notification";
import { LayoutContainer } from "contexts/LayoutContextProvider";
import { WalletDataContainer } from "contexts/WalletDataContextProvider";

require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

const App: FC<AppProps> = ({ Component, pageProps }) => {
	const getLayout =
		(Component as { getLayout?: (page: JSX.Element) => JSX.Element })
			?.getLayout ?? ((page) => page);

	return (
		<>
			<Head>
				<title>Pickle Dapp</title>
			</Head>

			<WalletContextProvider>
				<SessionProvider session={pageProps.session} refetchInterval={0}>
					<WalletDataContainer>
						<LayoutContainer>
							<div className="flex flex-col min-h-screen">
								<Notifications />
								{getLayout ? (
									getLayout(<Component {...pageProps} />)
								) : (
									<Component {...pageProps} />
								)}
							</div>
						</LayoutContainer>
					</WalletDataContainer>
				</SessionProvider>
			</WalletContextProvider>
		</>
	);
};

export default App;
