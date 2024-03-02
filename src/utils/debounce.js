/*function debounce(valueWhenChecked, valueNow, delay, cb){
    let interval;
    valueWhenChecked.current = valueNow;
    clearInterval(interval);
    interval = setTimeout(function () {
        if (valueNow == valueWhenChecked.current) {
            cb();
        }
    }, delay);
}*/

function debounce(valueWhenChecked, valueNow, delay = 300, cb) {
	debounce.timeoutId = clearTimeout(debounce.timeoutId);

	valueWhenChecked.current = valueNow;

	debounce.timeoutId = setTimeout(function () {
		if (valueNow == "") return;
		if (valueNow == valueWhenChecked.current) {
			cb();
		}
	}, delay);
}

export { debounce };
