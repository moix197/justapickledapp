function filterTokensByInput(tokensData, textValue, maxItems = 25) {
    let filteredData = [];

    const addressMatch = tokensData.find(item => item.address === textValue);
    if (addressMatch) {
        filteredData.push(addressMatch);
    } else {
        let itemsInList = 0;
        for (const item of tokensData) {
            if (itemsInList >= maxItems) break;
            if (
                typeof textValue === "string" &&
                item.symbol.toUpperCase().includes(textValue.toUpperCase())
            ) {
                filteredData.push(item);
                itemsInList++;
            }
        }
    }

    return filteredData;
}

export { filterTokensByInput };
