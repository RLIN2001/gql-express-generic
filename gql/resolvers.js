const { GraphQLJSON } = require("graphql-type-json");
const path = require("path");
const fs = require("fs");

const modelsDir = path.join(__dirname, "../models");
const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Project = require("../models/Project");
const { mockData } = require("../mockData");

const getEntityClass = (entity) => {
	const modelName = entity;

	if (!modelName) {
		throw new Error(`Entity ${entity} not found.`);
	}

	const modelPath = path.join(modelsDir, `${modelName}.js`);

	if (!fs.existsSync(modelPath)) {
		throw new Error(
			`Could not find model file for ${modelName} at ${modelPath}`
		);
	}

	return require(modelPath);
};

const resolvers = {
	JSON: GraphQLJSON,

	Query: {
		hello: () => "Hello, world!",

		getEntityData: (_, { entity }) => {
			getEntityClass(entity);
			return {
				entity,
				data: mockData[entity],
			};
		},
		getEntityDataById: (_, { entity, id }) => {
			getEntityClass(entity);
			const entityData = mockData[entity].find(
				(item) => item.id.toString() === id.toString()
			);

			if (!entityData) {
				throw new Error(`${entity} with id ${id} not found.`);
			}

			return {
				entity,
				data: entityData,
			};
		},
	},
	Mutation: {
		deleteEntityById: (_, { entity, id }) => {
			getEntityClass(entity);

			const updatedData = mockData[entity].filter((item) => item.id !== id);
			mockData[entity] = updatedData;

			return {
				entity,
				data: updatedData,
			};
		},
		createEntityData: (_, { entity, data }) => {
			const newId =
				mockData[entity].length > 0
					? Math.max(...mockData[entity].map((item) => item.id)) + 1
					: 1;

			const newData = { id: newId, ...data };
			try {
				const EntityClass = getEntityClass(entity);
				const newEntityInstance = new EntityClass(newData);
				mockData[entity].push(newData);
			} catch (error) {
				console.error("Error creating Entity data:", error.message);
				throw new Error("Error creating Entity data:", error.message);
			}

			return {
				entity,
				data: mockData[entity],
			};
		},

		updateEntityData: (_, { entity, id, data }) => {
			/*if (!mockData[entity]) {
				throw new Error(`Entity ${entity} not found.`);
			}*/
			const EntityClass = getEntityClass(entity);

			const entityIndex = mockData[entity].findIndex((item) => item.id === id);
			if (entityIndex === -1) {
				throw new Error(`${entity} with id ${id} not found.`);
			}

			const existingEntity = mockData[entity][entityIndex];

			const updatedEntity = { id, ...existingEntity, ...data };

			try {
				const newEntityInstance = new EntityClass(updatedEntity);
				mockData[entity][entityIndex] = updatedEntity;
			} catch (error) {
				console.error("Error updating Entity data:", error.message);
				throw new Error("Error updating Entity Data:", error.message);
			}

			return {
				entity,
				data: mockData[entity],
			};
		},
	},
};

module.exports = resolvers;
