"use client";

import WalletContextProvider from "contexts/WalletContextProvider";
import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import { AppBar } from "../components/AppBar";
import Notifications from "../components/Notification";
import { LayoutContainer } from "contexts/LayoutContextProvider";

require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

const App: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<title>Pickle Dapp</title>
			</Head>

			<WalletContextProvider>
				<LayoutContainer>
					<div className="flex flex-col min-h-screen">
						<Notifications />
						<AppBar />
						<Component {...pageProps} />
					</div>
				</LayoutContainer>
			</WalletContextProvider>
		</>
	);
};

export default App;
