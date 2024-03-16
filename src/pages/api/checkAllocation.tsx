import type { NextApiRequest, NextApiResponse } from "next";

const addressAry = [
	"7Hazaq3WU2rt9uiHijRxCdJ27AZ4B1AtAaqC6DAP6jcL",
	"7nfr6DnBQ752F4qACzSjxcjBT8LnUUhhcvEVta34fSTr",
	"Dd5H9YwoPdnfs9U37qiZdALNAARnMaVocx4mbjMrP7WR",
	"2ADtPGp47jsErqoBPqJVgVp4PB6Yf3KKUgHecBpb47Qo",
	"6V67kXZVrwJDk2bFSveFB8Hw66rbiVhdjQPrt5pHvRoe",
	"CxaAjpLQXnjHFeEMaskpKgzwwihwDmvR9Ae7bVy39SBL",
	"9D84QFbhrpkUmXrXT2T7dr3UpyZ7fCkSZKUCEK9fbU8M",
	"CNoJhCekABvc9UPchXb6XidoL5Rdx55h2Uq3pnF1r7Mm",
	"9SZzoAxASoX16DyWYk4xp4QS8WKwrH4QUYTPX8vbEWEX",
	"FectaddSnQKRSWTzV9wMsoWfUVT7mJfkmKFx9KEfpm9c",
	"EeuCnXM3W2AigXYrzT2e17oTyhewJhZxwHWBn1TouZTp",
	"ELpFWLUPaUxvwowHCVvdGwEHChRRYGTnfnDQvB5BbX8z",
	"4XFMbocHdeZrAL7jsufwuUV99D3pyxVhXRac9J8R1vP7",
	"F4ZRnu8DzyydmEWeGp2eLWMr4u4aK9humv9hJnEuT6Wf",
	"9Nf5GhzD4upKwQx5UDtBNM7yUN1DF75rr7vXb4EQKyFV",
	"GqgxjTkYoKksdPhdkoGHnTLUeVvPNvdWvKcTopVQUYhY",
	"6RwiGU36bvqRAsaxeHJBnbdeDuPPwfGHUX3YZYxhyz7u",
	"9xgRBBMLuu1xfmGhZ8CgY5PRzL2k7EZ7CNKEuoVRca2i",
	"5SLq6myxNrUzBP1Emmd6Ky32qXaEfE6RXQjz69pS1aYx",
	"Be1HzkzFSUEmUZ2eKS2vX1Wyy66mAGn3oRn4Knj7vwkD",
	"2HiDHAwZMPQht5NRUUugNwfX3mFVFEFmTm7Aaf7oCZCq",
	"Cse9pHGckPNv1dVcYGmDb8kWUGnmeLy7yf8jehz8neTb",
	"FiftVgKTfqudKV55mv4JEhrP6AXLQMHkyWJha4QuaaFz",
	"2w6zyXRP3vtxQ8GPKeKKWY5oM3WSLY8LvJirMpbn2SGg",
	"F5vA3vgELeHfEngW29MjqpqUrgGYsTutdJhXi6RSLrmZ",
	"2uzXjrtgc9ZEXg6xQQpvn685UxnjDWmivhfK5Zdt2tzq",
	"3STtjyBZS9BXZmL7hgeLn7bFPeSAG6DZJAK9vQy3JgeF",
	"9qUWH434JbNybJ1uZdK4Cfsaa64B5cM7cMPqQSFCcuLH",
	"9ZvMfyCAbN2NgTiSzvNEUG2hBq8NAFa5Q8qkrDSxGx6T",
	"1Mfb1Bmy2oz8WVUdJtg4BXh3oiEYEsq92iKDGCVMNQn",
	"7yVNrv7XGAhVZJjdBcjTQobWka8Yx5Gtt6gtd3WnaerD",
	"D8fug1z3nbqR6V7uMZ48jCGW9SEZVUqqmzANnGPHpi6A",
	"8zTUwGDFAWeUHdkTSC6MADtUiL4nBjQU7wvZDnjjJr5Q",
	"HoNmT2NdWjEmWdKzhaAqVtg1ShrX5ZBEF1rQfpj1v1g7",
	"3LJVYjZvH5MyMMM4YZjYKMM5JEV9HWptz6TeVrAQTxnc",
	"492S7KWpQn44A2UPunWXm7ap2Bz8JXCHR4bZK3AUQS",
	"6Zno8tV8fEN4wZ6yPq4xMmSJTgyya9FqiciST5dYSpcY",
	"3VjNBrN5he7SAerVAXKrEBuEsLm6H9JG46LMxSBmmrbM",
	"6i5c5Sf5Cm9F4otR2kQQ7C8fE3pvGVGorLVEJP2mBEtT",
	"A2EAaqFw5wRdGGXBC3BZLFyEdFXNwUTPcznRWtnWirxD",
	"5r6qZu6hd3G2tquap4qywNF7E4hFNjtKtuwkK4Sa9igC",
	"9qMRVzMUvrpHJNkbxVVjpDfpbNcorGMZQs69ibPxpzu7",
	"7p3kVReDxeGKYc9bXD7fumzf6EF1FZRRAfnoZMevZUfC",
	"G3C1tEqRz3Pox6baC5NL54gGUAidc6n8K6Aki7CbscZm",
	"GE174k3bL3JQqhKVfaHJU7huTSciFyaqyYgC9m9PB2um",
	"4vNHuyVFxGGeWpHDKQzWbrv9nzY9qwsSncgxTv79dX5N",
	"Dx57dhPwKp5EEwh433dH8koer93UiyXmc1wwyYCKm3LF",
	"C1AA4sFADJPZEP3jnkpTjsy8JrqezYdb8qeo8LNf8pLo",
	"5BwQH4vKRRDq3jYbenADuTWWucm1jAXHFE31wzYY7a3b",
	"6waDbcrPYbhsXzFJN8jN5DRCkgeNrCTQ23SZo2y1wEy4",
	"4yii5jGxYSt6pgLiAJWWbfs3UySy4Mj845Jaa94zYDVn",
	"FGWsYN1Se7nm3NgFTJLfF7MLq4gb1wxpSaf4jrBXB5AZ",
	"FUsG6b2frpz2YDS6R4oiRxUjuRkja3fz3F5MW481KmiG",
	"A64uj7A3ZpudUcBTDM1WasN9TaWm65qMaUNfMwhkaaCn",
	"HwUEVNg91nj8eu6FUJtEeFw4xpAdGiWTw8LgmB5B9zF9",
	"8tVUgXrNZFHyE1yNAqgX933cDN4HsHoLjCAaADkrJKUm",
	"27iwLN9fj9xt5UTjfA6YVLkSeu6wCfqNM16A3xKMKRKW",
	"B5kmwMwLfzKLdQboivYXfYx4dqyC1fC7mq7142K7u9AP",
	"8wiHpr2NgHtEyciXfGoDWYA1BtRGokeABVBG97KkAnVa",
	"GkDmUSoKcjMRkPzm78SMn4ibYJPU77jd4hcWbQcMeyVd",
	"2nxJuM5GhgrAb26bDVMEMueUPZUy58RTpcjeYQ7obfKq",
	"AvhaVMtpUfKyZHfXiyWEaspcSgJyGPo3Z7j6qQXW8U8m",
	"9AhjUFEYMHAiUTfUy2hBBrPSLVsZbrJqhWcLFFGVWMfU",
	"9eYstAi554eoENPcj3Lu3m2iz27gzhM5uepJ5T1gNN3t",
	"CsFfKmP2rhzmGM4Eyd9yPdZD1Rjhu8v595gPqB3jSzKv",
	"24agkVfJyqjw5bSVjVbb72HUyZz5T8x6VXKtonDevkfJ",
	"Hs4TFNQ8AHWNQdAKGxnexA8HYgcaaCoPkECqMEonWFVp",
	"6okdyguzvWCZiCsT6R6vomRE57Royd3wYn24n3DFQrro",
	"3o4bHdv8vCPd14tFj1d9BuVVBLGAyDKN6Gt1TmLLZRW8",
	"8xizS5Qzg9GzR6dY3c3WVBuA5nwcuUDViFPz4NbZy7wi",
	"6SizL1L14qpSoi3ghvwR4M4vZCt7y8GRMr7g8qS6ErcC",
	"7MFSiLNC9DcD9wRSa88LSpAyQPFEYn1sKtdZXVsHyzu3",
	"8LfAwqCQp1WwwwCg3a3NQmvh9vyXukmqMWxwHQemUunL",
	"7mbXFfs4J1oXhRNmi1wcyn2nWQED5Us4YvzSLdez1sjK",
	"XDAxkeWcJFiRA1ipJPnKhipui8iLiqKZ3qfLZyZx3Fg",
	"Dh9Sbk9HcBF52LUP37o3N11eTtedVbk2cUYu26fD29m3",
	"DXNUmJDpGyhP8uqQCe2Y83UARMWdF4mZMRAVaXDz2R4E",
	"AZDecYSCitsmPCv9zNfvzQnUwukoKkSr7daJsjJAhJnn",
	"bAGmgLk8omLLZsqQsP4otniqqobYWP3D51Bumqkwaww",
	"zB7mHuesLqyzvJjDbGHNhVhWp6Dw7EuDGw6SmcjjMBo",
	"5gGVfgcBTjqnWAmbUq5fYxjfARZp16tfU1TCojNVQgfq",
	"2qotWBKGDaHDFtrXbvYQniALsXMTfp7MjLUs8BKcuhud",
	"5p1o5SVnVdqAq25TuevkZn3rtGCTc7vdp9Mj1sNcbbWk",
	"3RnduxL26dR4hW4eXsVVSYKfKwM5k56oHgf2QEKYojf3",
	"ArzCwCCykztSzzgP1yS2RAXJmXmDjdm1ZGrti2hXaedW",
	"DAW28FhYJJHcfDoz8wSzHUfTHc5TGXNuKdSocnxJrTgM",
	"86iqfwepR5EnovyiiNP2vPjrQGwMR9RZrL2m8kKTrhb3",
	"H8pq2pWRfN6qSjgqJ53wT9j7c76TSzkGCng55VeKLdng",
	"HvyYiauBB6RcpPT5EhoYQHj5T1dTu2x8GhNJaBeBZsqa",
	"7kAUQBj2YYvWjKPAqqxrxFoA6GTXeeMqGwHe9znougmr",
	"FfA3HVdTFN5mzYW5pNMYe3U6p171aitkrnRrfmzdE3gP",
	"9srLvzQCpdHFw6kSHMSxwpYhJxyGK61g2Wx2ybtHf2dr",
	"H6K6fKmiPc1PmRXZSni6VPPuzqwTx9owZkzVgJ5GbGHP",
	"HeVHCcsUbybaicq4pvHLhSUJjNNnGLTk7WfpD1oXDHtW",
	"FANNwX5DrLnFNryycJMh1itnPF7ipENctS3z6YXt5PPk",
	"CBy4pF1TzUiuxwgvsq7jRqBXxS69UEKAa9MDjo9cQRGS",
	"J5RzYjR4afftQko8BormAa4Cjmn7REvzzEsEPCCnWZm7",
	"7faiMo1LyifaNPj19Pekwa2mSowgj9k6WEvx5ykKwBPg",
];

async function confirmTransaction(req) {
	let addressMatch = { isElegible: false, allocation: "0" };

	console.log(req.query.address);
	for (let i = 0; i < addressAry.length; i++) {
		if (req.query.address == addressAry[i]) {
			console.log("oka");
			addressMatch = { isElegible: true, allocation: "500,000" };
		}
	}

	return addressMatch;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.status(200).json(await confirmTransaction(req));
}
