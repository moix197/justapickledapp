function convertDateToMDY(dateString) {
	const date = new Date(dateString);
	const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
	const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
	const day = date.getDate().toString().padStart(2, "0");
	const formattedDate = `${month}/${day}/${year}`;
	return formattedDate;
}

export { convertDateToMDY };
