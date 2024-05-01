function checkTimePassed(timeString, hoursPassed = 1) {
	if (!timeString) return;

	// Convert the input UTC date string to a Date object
	let time = new Date(timeString);

	// Get the current date in the same time zone
	let currentDate = new Date();

	// Check if 1 hour has passed
	return currentDate - time >= hoursPassed * 60 * 60 * 1000;
}

function checkSecondDateComesAfter(firstDate, secondDate) {
	let result = new Date(secondDate) > new Date(firstDate);
	return result;
}

function checkDateIsAfterToday(date) {
	const now = new Date();

	const targetDate = new Date(date);

	return targetDate > now;
}

export { checkTimePassed, checkSecondDateComesAfter, checkDateIsAfterToday };
