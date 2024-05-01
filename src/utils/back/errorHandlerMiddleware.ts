function errorHandlerMiddleware(handler) {
	return async (req, res) => {
		try {
			await handler(req, res);
		} catch (error) {
			console.error("Error:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	};
}

export { errorHandlerMiddleware };
