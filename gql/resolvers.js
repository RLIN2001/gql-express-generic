const { GraphQLJSON } = require("graphql-type-json");
const path = require("path");
const fs = require("fs");

const modelsDir = path.join(__dirname, "../models");
const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Project = require("../models/Project");
const { mockData } = require("../mockData");

const resolvers = {
	JSON: GraphQLJSON,

	Query: {
		hello: () => "Hello, world!",

		getEntityData: (_, { entity }) => {
			const modelPath = path.join(modelsDir, `${entity}.js`);
			if (!fs.existsSync(modelPath)) {
				throw new Error("Could not find model " + modelPath);
				/*return {
					entity,
					data: { message: "Unknown entity" },
				};*/
			}

			return {
				entity,
				data: mockData[entity],
			};
		},
		getEntityDataById: (_, { entity, id }) => {
			if (!mockData[entity]) {
				throw new Error(`Entity ${entity} not found.`);
			}

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
			if (!mockData[entity]) {
				throw new Error(`Entity ${entity} not found.`);
			}

			const updatedData = mockData[entity].filter((item) => item.id !== id);
			mockData[entity] = updatedData;

			return {
				entity,
				data: updatedData,
			};
		},
		createEntityData: (_, { entity, data }) => {
			if (!mockData[entity]) {
				throw new Error(`Entity ${entity} not found.`);
			}

			const newId =
				mockData[entity].length > 0
					? Math.max(...mockData[entity].map((item) => item.id)) + 1
					: 1;

			const newData = { id: newId, ...data };

			mockData[entity].push(newData);

			return {
				entity,
				data: mockData[entity],
			};
		},

		updateEntityData: (_, { entity, id, data }) => {
			if (!mockData[entity]) {
				throw new Error(`Entity ${entity} not found.`);
			}

			const entityIndex = mockData[entity].findIndex((item) => item.id === id);
			if (entityIndex === -1) {
				throw new Error(`${entity} with id ${id} not found.`);
			}

			const existingEntity = mockData[entity][entityIndex];

			const updatedEntity = { id, ...existingEntity, ...data };

			mockData[entity][entityIndex] = updatedEntity;

			return {
				entity,
				data: mockData[entity],
			};
		},
	},
};

module.exports = resolvers;
