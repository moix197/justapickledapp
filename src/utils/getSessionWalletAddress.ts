import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET;

async function getSessionWalletAddress(req) {
	const token = await getToken({ req, secret });
	return token?.sub;
}

export { getSessionWalletAddress };
