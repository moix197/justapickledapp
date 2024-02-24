import type { NextPage } from "next";
import Head from "next/head";
import { BasicsView } from "../views";

const Basics: NextPage = (props) => {
	return (
		<div>
			<Head>
				<title>Pickle Dapp</title>
				<meta name="description" content="Just a Pickle Dapp" />
			</Head>
			<BasicsView />
		</div>
	);
};

export default Basics;
