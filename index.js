const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const bodyParser = require("body-parser");

const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
	Query: {
		hello: () => "Ciao dal server GraphQL!",
	},
};

async function startServer() {
	const app = express();

	const server = new ApolloServer({
		typeDefs,
		resolvers,
	});

	await server.start();

	app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));

	app.listen(4000, () => {
		console.log("Server in ascolto su http://localhost:4000/graphql");
	});
}

startServer();
