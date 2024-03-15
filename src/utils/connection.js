import { Connection } from "@solana/web3.js";

const connection = new Connection(
	"https://withered-orbital-sailboat.secure.quiknode.pro",
	{
		commitment: "confirmed",
		confirmTransactionInitialTimeout: 30000,
	}
);
export { connection };
