const tiersData = {
	name: "tiersData",
	required: ["name", "percentage"],
	properties: {
		name: { bsonType: "string" },
		percentage: { bsonType: ["double", "int"] },
	},
	index: false,
	unique: false,
};

export { tiersData };
