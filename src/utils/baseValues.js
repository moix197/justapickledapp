import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

const mintPublicKey = mintPublicKeyFunc();
const sellAccountPublicKey = sellAccountPublicKeyFunc();
const sellAssociatedAccountPublicKey =
	await sellAssociatedAccountPublicKeyFunc();
const tokenDecimals = 7;
const solPublicKey = new PublicKey(
	"So11111111111111111111111111111111111111112"
);
const solAssociatedAccountPublicKey = solAssociatedAccountPublicKeyFunc();
const solTokenAddress = "So11111111111111111111111111111111111111112";
const pickleTokenAddress = "6hQb4SPG9dyMVyaqFeAaMGsnQbcAcNcCtkTm6ED34oC7";
const picklePublicKey = new PublicKey(
	"6hQb4SPG9dyMVyaqFeAaMGsnQbcAcNcCtkTm6ED34oC7"
);

function mintPublicKeyFunc() {
	return new PublicKey("6hQb4SPG9dyMVyaqFeAaMGsnQbcAcNcCtkTm6ED34oC7");
}

function sellAccountPublicKeyFunc() {
	return new PublicKey("EJRZKLFaTavc8PouhLEj7HZvGpdtBNhsU7urGfUdPiAG");
}

async function sellAssociatedAccountPublicKeyFunc() {
	return new PublicKey("DDUxSg56rU7Tkw7zZSHrEN86FQ8ijUU4coPynZfxRtCa");
}

function solAssociatedAccountPublicKeyFunc() {
	return getAssociatedTokenAddressSync(
		solPublicKey, // mint
		sellAccountPublicKey, // owner
		false // allow owner off curve
	);
}

export {
	mintPublicKey,
	sellAccountPublicKey,
	sellAssociatedAccountPublicKey,
	tokenDecimals,
	solPublicKey,
	solAssociatedAccountPublicKey,
	solTokenAddress,
	pickleTokenAddress,
	picklePublicKey,
};
