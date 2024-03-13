
function setUrlFromInput(urlParameter, item, router) {
    if (
        urlParameter == "originToken" &&
        router.query["destinationToken"] == item?.address
    ) {
        router.query["destinationToken"] = router.query["originToken"];
        router.query[urlParameter] = item?.address;
    }else if(
        urlParameter == "destinationToken" &&
        router.query["originToken"] == item?.address
    ){
        router.query["originToken"] = router.query["destinationToken"];
        router.query[urlParameter] = item?.address;
    }
    router.query[urlParameter] = item?.address;
    router.push({
        pathname: "/swap",
        query: router.query,
    });
    return ;
}

export { setUrlFromInput };