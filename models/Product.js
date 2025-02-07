class Product {
	#id;
	#name;
	#price;

	constructor(id, name, price) {
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
		if (value < 0) {
			console.log("Price cannot be negative");
			return;
		}
		this.#price = value;
	}

	getInfo() {
		return `I am Product model`;
	}
}

module.exports = Product;
