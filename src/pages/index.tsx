import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";
import AppBar from "components/AppBar";

const Home: NextPage = (props) => {
	return (
		<div>
			<AppBar />
			<div className="h-screen">
				<Head>
					<title>Pickle dapp</title>
					<meta name="description" content="Pickle Swap" />
				</Head>
				<HomeView />
			</div>
		</div>
	);
};

export default Home;
