const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

async function createGraphQLServer(app) {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: async ({ req, res }) => {
			return { req, res };
		},
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
}

module.exports = createGraphQLServer;
