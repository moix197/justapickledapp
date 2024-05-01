import { airdropsData } from "db/schemas/airdropsData";
import { airdropsUserData } from "db/schemas/airdropsUserData";
import { teamsData } from "db/schemas/teamsData";
import { datesData } from "db/schemas/datesData";
import { tiersData } from "db/schemas/tiersData";
import { tokenSalesData } from "db/schemas/tokenSalesData";
import transactionsData from "db/schemas/transactionsData";
import { usersData } from "db/schemas/usersData";
import { vaultData } from "db/schemas/vaultData";
import { vestingData } from "db/schemas/vestingData";
import { setupCollection } from "utils/back/db/setupCollection";
import { tokensData } from "db/schemas/tokensData";
import { salesUserData } from "db/schemas/salesUserData";

let collections = [
	airdropsData,
	airdropsUserData,
	teamsData,
	datesData,
	tiersData,
	tokenSalesData,
	transactionsData,
	usersData,
	vestingData,
	vaultData,
	tokensData,
	salesUserData,
];

async function createNewDbCollections() {
	try {
		let finalAry = [];

		for (const element of collections) {
			let result = await setupCollection({
				required: element.required,
				properties: element.properties,
				name: element.name,
				unique: element.unique,
				index: element.index,
				update: false, //NEVER CHANGE UNLESS YOU NEED TO UPDATE AN SCHEMA
			});

			finalAry.push(result);
		}
		return {
			err: false,
			value: finalAry,
		};
	} catch (error) {
		return "we couldn't finish the process, please try again later";
	}
}

export default createNewDbCollections;
