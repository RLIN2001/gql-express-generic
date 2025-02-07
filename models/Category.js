class Category {
	#id;
	#name;
	#description;

	constructor(id, name, description) {
		this.id = id;
		this.name = name;
		this.description = description;
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

	get description() {
		return this.#description;
	}

	set description(value) {
		this.#description = value;
	}

	getInfo() {
		return `I am Category model`;
	}
}

module.exports = Category;
