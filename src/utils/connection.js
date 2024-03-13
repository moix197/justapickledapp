import { Connection, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(
	"https://withered-orbital-sailboat.solana-mainnet.quiknode.pro/ac33801cbf8e7a422bfc7ecbc7843f202e53fa60/",
	{
		commitment: "confirmed",
		confirmTransactionInitialTimeout: 60000,
	}
);
export { connection };
