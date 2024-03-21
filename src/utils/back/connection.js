import { Connection } from "@solana/web3.js";

const connection = new Connection(
	"https://tiniest-attentive-pine.solana-mainnet.quiknode.pro/4217d53920fbec2c392ebf34f9ee66a8015a3467/",
	{
		commitment: "confirmed",
		confirmTransactionInitialTimeout: 60000,
	}
);
export { connection };
