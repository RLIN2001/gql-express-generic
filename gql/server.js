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
	});

	await server.start();

	app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));
}

module.exports = createGraphQLServer;
