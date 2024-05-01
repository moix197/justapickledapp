function convertAmountToWords(amount) {
	if (amount >= 1000000000) {
		return Math.floor(amount / 1000000000) + "B";
	}

	if (amount >= 100000000) {
		return Math.floor(amount / 1000000) + "M";
	}

	if (amount >= 1000000) {
		return (amount / 1000000).toFixed(2) + "M";
	}

	if (amount >= 1000) {
		return (amount / 1000).toFixed(amount % 1000 !== 0 ? 2 : 0) + "k";
	}

	if (amount > 0) {
		return Number(amount).toFixed();
	}

	return amount;
}

export { convertAmountToWords };
