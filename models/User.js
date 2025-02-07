class User {
	#id;
	#name;
	#age;

	constructor(data) {
		const validFields = ["id", "name", "age"];

		Object.keys(data).forEach((key) => {
			if (!validFields.includes(key)) {
				throw new Error(`Invalid field: ${key}`);
			}
		});

		const { id, name, age } = data;

		if (typeof id !== "number" || id <= 0) {
			throw new Error("ID must be a positive number");
		}
		if (typeof name !== "string" || name.trim() === "") {
			throw new Error("Name must be a non-empty string");
		}
		if (typeof age !== "number" || age < 0) {
			throw new Error("Age must be a non-negative number");
		}

		this.id = id;
		this.name = name;
		this.age = age;
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

	get age() {
		return this.#age;
	}

	set age(value) {
		if (value < 0) {
			console.log("Age cannot be negative");
			return;
		}
		this.#age = value;
	}

	getInfo() {
		return `I am User model`;
	}
}

module.exports = User;
