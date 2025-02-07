const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");
const bodyParser = require("body-parser");
const createGraphQLServer = require("./gql/server");

async function startServer() {
	const app = express();

	await createGraphQLServer(app);

	app.get("/", (req, res) => {
		res.send("Starts Api!");
	});

	app.listen(3000, () => {
		console.log("Server listen on http://localhost:3000");
	});
}

startServer();
