class Project {
	#id;
	#name;
	#description;

	constructor(data) {
		const validFields = ["id", "name", "description"];

		Object.keys(data).forEach((key) => {
			if (!validFields.includes(key)) {
				throw new Error(`Invalid field: ${key}`);
			}
		});

		const { id, name, description } = data;

		if (typeof id !== "number" || id <= 0) {
			throw new Error("ID must be a positive number");
		}
		if (typeof name !== "string" || name.trim() === "") {
			throw new Error("Name must be a non-empty string");
		}
		if (typeof description !== "string" || description.trim() === "") {
			throw new Error("Description must be a non-empty string");
		}

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
		return `I am Project model`;
	}
}

module.exports = Project;
