class Product {
	#id;
	#name;
	#price;

	constructor(data) {
		const validFields = ["id", "name", "price"];

		Object.keys(data).forEach((key) => {
			if (!validFields.includes(key)) {
				throw new Error(`Invalid field: ${key}`);
			}
		});

		const { id, name, price } = data;

		if (typeof id !== "number" || id <= 0) {
			throw new Error("ID must be a positive number");
		}
		if (typeof name !== "string" || name.trim() === "") {
			throw new Error("Name must be a non-empty string");
		}
		if (typeof price !== "number" || price <= 0) {
			throw new Error("Price must be a positive number");
		}

		this.id = id;
		this.name = name;
		this.price = price;
	}

	get id() {
		return this.#id;
	}

	set id(value) {
		this.#id = value;
	}

	get name() {
		return this.#name;
	}

	set name(value) {
		this.#name = value;
	}

	get price() {
		return this.#price;
	}

	set price(value) {
		if (value <= 0) {
			console.log("Price must be a positive number");
			return;
		}
		this.#price = value;
	}

	getInfo() {
		return `I am Product model`;
	}
}

module.exports = Product;
