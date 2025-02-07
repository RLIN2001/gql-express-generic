const User = require("./models/User");
const Product = require("./models/Product");
const Category = require("./models/Category");
const Project = require("./models/Project");

let mockData = {
	User: [
		{ id: 1, name: "John Doe", age: 30 },
		{ id: 2, name: "Jane Smith", age: 25 },
	],
	Product: [
		{ id: 1, name: "Laptop", price: 1200 },
		{ id: 2, name: "Smartphone", price: 800 },
	],
	Category: [
		{ id: 1, name: "Electronics", description: "Devices and gadgets" },
		{ id: 2, name: "Furniture", description: "Home and office furniture" },
	],
	Project: [
		{ id: 1, name: "Project Alpha", description: "Develop a new mobile app" },
		{ id: 2, name: "Project Beta", description: "Redesign the website" },
	],
};

module.exports = { mockData };
