function addDecimalPoint(number, decimals) {
	// Add the decimal point to the string with the specified decimals
	if (!number) return;
	let amount;
	let integerString = number?.slice(0, decimals - decimals * 2);
	let decimalString = number?.slice(decimals - decimals * 2, -1);

	if (number?.length > decimals) {
		amount = `${integerString}.${decimalString}`;
	} else {
		amount = `0.${number?.padStart(decimals, "0")}`;
	}

	return amount;
}

function removeDecimalPointAndAddNumbers(number, decimals) {
	// Remove decimals by removing the decimal point from the string
	if (!number) return;
	let amount;
	number = number.replaceAll(",", "");
	if (number?.includes(".")) {
		amount = number.split(".");
		amount[1] = amount[1].padEnd(decimals, "0");
		amount = amount[0] == "0" ? amount[1] : amount.join("");
	} else {
		amount = number?.padEnd(number.length + decimals, "0");
	}
	return amount;
}

function addDecimalPointToNumber(number, decimals) {
	return Number(number) / Math.pow(10, decimals);
}

function convertNotationToNumber(value, decimals) {
	return Number(value.toFixed(decimals));
}

export {
	addDecimalPoint,
	removeDecimalPointAndAddNumbers,
	addDecimalPointToNumber,
	convertNotationToNumber,
};
