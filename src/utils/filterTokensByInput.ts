function filterTokensByInput(tokensData, textValue, maxItems = 25) {
    let itemsInList = 0;
    let filteredData = tokensData.filter((item, i) => {
        if (itemsInList > maxItems) return false;
        if (item.address == textValue) {
            itemsInList++;
            return true;
        } else if (
            typeof textValue == "string" &&
            item.symbol.toUpperCase().includes(textValue.toUpperCase())
        ) {
            itemsInList++;
            return true;
        }
    });
    return filteredData;
}

export { filterTokensByInput }