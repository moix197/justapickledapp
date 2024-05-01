import {
	validateWalletAddress,
	validateMultiWalletAddress,
	validateNumbers,
	validatePlainTextNumber,
	validatePlainText,
	validateDate,
	validateDateIsCompleted,
	validateEmptyString,
	validatePrice,
	validateName,
} from "utils/formTypingValidation";
import {
	checkDateIsAfterToday,
	checkSecondDateComesAfter,
	checkTimePassed,
} from "./checkTimePassed";

const validationsPerField = {
	name: [validateEmptyString, validateName],
	launch: [
		validateEmptyString,
		validateDateIsCompleted,
		validateDate,
		validateDateIsAfterToday,
	],
	end: [
		validateEmptyString,
		validateDateIsCompleted,
		validateDate,
		validateEndDate,
		validateDateIsAfterToday,
	],
	admins: [validateMultiWalletAddress],
	walletsAry: [validateMultiWalletAddress],
	redeem: [validateRedemType],
	price: [validatePriceData],
	target: [validateTargetData],
	tiers: [validateEmptyString],
	vault: [validateEmptyString],
	type: [validateSaleType],
	vesting: [validateVesting],
	walletAddress: [validateEmptyString, validateWalletAddress],
	tokenMintAddress: [validateEmptyString, validateWalletAddress],
	initialAmount: [validateEmptyString, validatePrice],
	teamId: [validateEmptyString],
	vaultId: [validateEmptyString],
	amount: [validateEmptyString],
	objectId: [validateEmptyString, checkObjectId],
	availableAmount: [validateEmptyString, validateNumbers],
	toBuyAmount: [validateEmptyString, validatePrice],
	lockedAmount: [validateEmptyString, validatePrice],
	participants: [validateEmptyString, validateMultiWalletAddress],
	status: [validateEmptyString, validateUserStatus],
};

function bulkValidate(itemsObj) {
	let errorsNow = [];
	for (let key in itemsObj) {
		let result = validate(key, itemsObj[key], itemsObj);
		if (result.err) {
			errorsNow.push(result);
		}
	}

	return errorsNow;
}

function validate(key, value, items) {
	let obj = { err: false, name: key, result: [] };

	//let validResult = validationsPerField[key](value);
	for (const itemFunc of validationsPerField[key]) {
		if (!itemFunc) continue;
		let response = itemFunc(value, items);
		if (response.err) {
			obj.err = true;
			obj.result.push(response);
		}
	}

	return obj;
}

function validateSaleType(value) {
	let error = true;
	let airdropValues = ["regular", "presale"];

	if (airdropValues.includes(value.value)) {
		return {
			err: false,
		};
	}

	return {
		err: error,
		message: "Please check the sale type",
	};
}

function validatePriceData(value) {
	let error = true;

	if (value.value == "market") {
		if (
			validateEmptyString(value.extra).err == false &&
			validatePrice(value.extra).err == false
		) {
			return {
				err: false,
			};
		}
	} else if (value.value != "fixed") {
		return {
			err: true,
			message: 'The price value should be "market" or "fixed',
		};
	}

	if (
		validateEmptyString(value.amount).err == false &&
		validatePrice(value.amount).err == false
	) {
		return {
			err: false,
		};
	}

	return {
		err: error,
		message: "Please check your price strategy",
	};
}

function validateTargetData(value) {
	let error = true;

	if (value.value == "private" || value.value == "open") {
		return {
			err: false,
		};
	}

	return {
		err: error,
		message: "Please check your sale target",
	};
}

function validateRedemType(value) {
	let error = true;
	let airdropValues = ["airdrop", "claim", "claimableAirdrop"];

	if (airdropValues.includes(value.value)) {
		return {
			err: false,
		};
	}

	return {
		err: error,
		message: "Please check how your user get the funds",
	};
}

function validateVesting(value, items) {
	if (value.value == false) {
		return {
			err: false,
		};
	}

	if (
		validateEmptyString(value.parts).err ||
		validateNumbers(value.parts).err
	) {
		return {
			err: true,
			message: "Please check the vesting parts",
		};
	}

	if (
		validateEmptyString(value.interval).err ||
		validateNumbers(value.interval).err
	) {
		return {
			err: true,
			message: "Please check the vesting interval",
		};
	}

	if (
		validateEmptyString(value.nextDate).err ||
		validateDate(value.nextDate).err ||
		validateDateIsCompleted(value.nextDate).err ||
		validateDateIsAfterToday(value.nextDate).err
	) {
		return {
			err: true,
			message: "Please check the vesting date",
		};
	}

	return {
		err: false,
		message: "Please check your vesting strategy",
	};
}

function validateEndDate(value, items) {
	let result = checkSecondDateComesAfter(items.launch, value);

	if (!result) {
		return {
			err: true,
			message:
				"The end date cannot be closer than the Launch date, please update and try again",
		};
	}

	return {
		err: false,
	};
}

function validateDateIsAfterToday(value) {
	let result = checkDateIsAfterToday(value);
	if (result) {
		return {
			err: false,
		};
	}

	return {
		err: true,
		message:
			"the date cannot be set prior to today, please update and try again",
	};
}

function validateUserStatus(value) {
	let statusValues = ["banned", "paused", "readyToClaim", "done"];
	if (statusValues.indexOf(value) != -1) {
		return {
			err: false,
		};
	}

	return {
		err: true,
		message: "Invalid status value, please check and try again",
	};
}

function checkObjectId(value) {
	const objectIdPattern = /^[0-9a-fA-F]{24}$/;

	if (!objectIdPattern.test(value)) {
		return {
			err: true,
			message: "Invalid item Id",
		};
	}

	return {
		err: false,
	};
}

export { validate, bulkValidate };
