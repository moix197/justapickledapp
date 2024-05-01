const vestingData = {
	name: "vestingData",
	required: ["parts", "interval", "nextDate", "released"],
	properties: {
		parts: { bsonType: "number" },
		interval: { bsonType: "number" },
		nextDate: {
			anyOf: [
				{ bsonType: "date" },
				{ type: "null" }, // Allow null value
			],
		},
		released: { bsonType: ["double", "int"] },
	},
	index: false,
	unique: false,
};

export { vestingData };
