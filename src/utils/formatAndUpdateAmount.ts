function addCommasToAmount(value,decimals) {
	if(value == "0") return "0";
	if (/^[0-9,.]*$/.test(value)) {
		// Remove commas
		const cleanValue = value.replace(/\,/g, "");

		// Split into integer and fractional parts
		let [integerPart, fractionalPart] = cleanValue.split(".");

		if(fractionalPart && fractionalPart.length > decimals){
			fractionalPart = fractionalPart.slice(0, decimals);
		}

		// Format the integer part
		const formattedIntegerPart = integerPart.replace(
			/\B(?=(\d{3})+(?!\d))/g,
			","
		);

		// Combine integer and fractional parts with a dot
		const formattedValue =
			fractionalPart !== undefined
				? `${formattedIntegerPart}.${fractionalPart}`
				: formattedIntegerPart;

		// Set the state
		return formattedValue;
	}
}

function removeCommasFromAmount(value) {
	return value.replace(/,/g, "");
}

export { addCommasToAmount, removeCommasFromAmount };
