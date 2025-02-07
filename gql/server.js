const { makeExecutableSchema } = require("@graphql-tools/schema");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const authMiddleware = require("../middlewares/auth");
const cors = require("cors");
const bodyParser = require("body-parser");

const createGraphQLServer = async (app) => {
	const schema = makeExecutableSchema({
		typeDefs,
		resolvers,
	});

	const schemaWithMiddleware = authMiddleware(schema);

	const server = new ApolloServer({
		schema: schemaWithMiddleware,
		context: ({ req }) => ({ req }),
	});

	await server.start();
	app.use(
		"/graphql",
		cors({
			origin: "*",
		}),
		bodyParser.json(),
		expressMiddleware(server, {
			context: async ({ req, res }) => ({ req, res }),
		})
	);
};

module.exports = createGraphQLServer;
