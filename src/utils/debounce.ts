function debounce(valueWhenChecked, valueNow, delay, cb){
    let interval;
    valueWhenChecked.current = valueNow;
    clearInterval(interval);
    interval = setTimeout(function () {
        if (valueNow == valueWhenChecked.current) {
            cb();
        }
    }, delay);
}

export { debounce };
