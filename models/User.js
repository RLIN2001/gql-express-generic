class User {
	#id;
	#name;
	#age;

	constructor(id, name, age) {
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
