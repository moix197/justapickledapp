function checkTimePassed(time) {
	if (!time) return;
	let currentDate = new Date();
	return currentDate - time >= 12 * 60 * 60 * 1000 ? true : false;
}

export { checkTimePassed };
