import { insertDocument } from "utils/back/db/crud";

async function createUserRegistry(address) {
	try {
		let dataAry = [];
		let data = {
			wallet: address,
			role: ["user"],
			tokens: [],
		};
		dataAry.push(data);

		let insertItem = await insertDocument("users", data);
		return {
			err: false,
			result: {
				success: insertItem ? true : false,
				itemInserted: dataAry,
			},
		};
	} catch (error) {
		return {
			err: true,
			error: "we couldn't finish the process, please try again later",
		};
	}
}

export default createUserRegistry;
