function getFinalSwapAmount(amount, reduceTaxes) {
	let taxesAmount = reduceTaxes ? 109.76 : 112;
	let finalAmount = (parseFloat(amount) / 100) * taxesAmount;

	finalAmount = finalAmount.toString();

	if (finalAmount.includes(".")) {
		finalAmount = finalAmount.split(".")[0];
	}

	return parseFloat(finalAmount);
}

export { getFinalSwapAmount };
