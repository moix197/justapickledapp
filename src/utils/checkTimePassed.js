function checkTimePassed(timeString) {
	console.log(timeString);
	if (!timeString) return;

	// Convert the input UTC date string to a Date object
	let time = new Date(timeString);

	// Get the current date in the same time zone
	let currentDate = new Date();

	// Check if 1 hour has passed
	return currentDate - time >= 1 * 60 * 60 * 1000;
}
export { checkTimePassed };
