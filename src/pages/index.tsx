"use client"
import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div className="h-screen">
      <Head>
        <title>Pickle dapp</title>
        <meta
          name="description"
          content="Pickle Swap"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
