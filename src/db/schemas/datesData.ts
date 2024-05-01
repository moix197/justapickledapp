const datesData = {
	name: "datesData",
	required: ["created", "launch"],
	properties: {
		created: { bsonType: "date" },
		lastUpdated: { bsonType: "date" },
		launch: { bsonType: "date" },
		end: { bsonType: "date" },
	},
	index: false,
	unique: false,
};
export { datesData };
