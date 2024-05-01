import { SigninMessage } from "utils/auth/SignInMessage";
import { getCsrfToken, signIn } from "next-auth/react";
import bs58 from "bs58";

async function handleSignIn(wallet, setModalVisible) {
	try {
		if (!wallet.connected) {
			setModalVisible(true);
		}

		const csrf = await getCsrfToken();
		if (!wallet.publicKey || !csrf || !wallet.signMessage) return;

		const message = new SigninMessage({
			domain: window.location.host,
			publicKey: wallet.publicKey?.toBase58(),
			statement: `Sign this message to sign in to the app.`,
			nonce: csrf,
		});

		const data = new TextEncoder().encode(message.prepare());
		const signature = await wallet.signMessage(data);
		const serializedSignature = bs58.encode(signature);

		signIn("credentials", {
			message: JSON.stringify(message),
			redirect: false,
			signature: serializedSignature,
		});
	} catch (error) {
		console.log(error);
	}
}

export { handleSignIn };
