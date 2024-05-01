async function getCall(url, params = null) {
	let queryString = "";

	if (params) {
		queryString = new URLSearchParams(params).toString();
		queryString = `?${queryString}`;
	}
	try {
		let response = await fetch(url + queryString);
		let data = await response.json();
		return data;
	} catch (error) {
		return {
			err: true,
			error: "We couldn't proceed the call to the api",
		};
	}
}

async function postCall(url, content) {
	try {
		let response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(content),
		});

		let data = await response.json();
		return data;
	} catch (error) {
		return {
			err: true,
			error: "We couldn't complete the call to the api",
		};
	}
}

export { getCall, postCall };
